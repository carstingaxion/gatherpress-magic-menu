<?php
/**
 * Class for caching and retrieving GatherPress event data.
 *
 * @package GatherPressMagicMenu
 */

namespace GatherPress_Magic_Menu;

use GatherPress\Core;

if ( ! class_exists( 'Cache' ) ) {
	/**
	 * Singleton class for caching and retrieving GatherPress event data.
	 *
	 * Responsibilities:
	 * - Query upcoming events with caching
	 * - Query taxonomy terms with event counts
	 * - Manage transient cache keys and expiry
	 *
	 * @since 0.1.0
	 */
	class Cache {

		use Core\Traits\Singleton;

		/**
		 * Transient expiry time in seconds (7 days).
		 *
		 * @since 0.1.0
		 * @var int
		 */
		const CACHE_EXPIRY = WEEK_IN_SECONDS;

		/**
		 * Private constructor to prevent direct instantiation.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {
			add_action( 'transition_post_status', array( $this, 'clear_cache_on_status_change' ), 10, 3 );
			add_action( 'set_object_terms', array( $this, 'clear_cache_on_terms_change' ), 10, 4 );
		}

		/**
		 * Retrieves all upcoming GatherPress event IDs with caching.
		 *
		 * @since 0.1.0
		 * @return array<int, int> Array of event post IDs.
		 */
		public function get_upcoming_events(): array {
			$cache_key     = 'gatherpress_magic_menu_upcoming_events';
			$cached_events = get_transient( $cache_key );

			if ( is_array( $cached_events ) ) {
				return $cached_events;
			}

			$events = new \WP_Query(
				array(
					'post_type'               => 'gatherpress_event',
					'post_status'             => 'publish',
					'gatherpress_event_query' => 'upcoming',
					'order'                   => 'desc',
					'posts_per_page'          => -1,
					'fields'                  => 'ids',
					'no_found_rows'           => true,
					'update_post_term_cache'  => false,
				)
			);
			$events = ! empty( $events->posts ) ? $events->posts : array();

			set_transient( $cache_key, $events, self::CACHE_EXPIRY );

			return $events;
		}

		/**
		 * Gets terms with event counts for a taxonomy.
		 *
		 * Optimized to store only essential data:
		 * - term_id: For retrieving the full term object when needed
		 * - name: For display
		 * - count: Pre-calculated event count
		 *
		 * @since 0.1.0
		 * @param string          $taxonomy_slug    The taxonomy slug.
		 * @param array<int, int> $upcoming_event_ids Array of event post IDs.
		 * @return array<int, array<string, mixed>> Array of associative arrays with 'term_id', 'name', and 'count' keys.
		 */
		public function get_terms_with_event_counts( string $taxonomy_slug, array $upcoming_event_ids ): array {
			$cache_key    = 'gatherpress_magic_menu_terms_' . $taxonomy_slug;
			$cached_terms = get_transient( $cache_key );

			if ( is_array( $cached_terms ) ) {
				return $cached_terms;
			}

			$term_ids = $this->collect_term_ids_from_events( $taxonomy_slug, $upcoming_event_ids );

			if ( empty( $term_ids ) ) {
				$empty_array = array();
				set_transient( $cache_key, $empty_array, self::CACHE_EXPIRY );
				return $empty_array;
			}

			$terms = get_terms(
				array(
					'taxonomy'   => $taxonomy_slug,
					'include'    => $term_ids,
					'hide_empty' => false,
					'orderby'    => 'name',
					'order'      => 'ASC',
				)
			);

			if ( is_wp_error( $terms ) || empty( $terms ) || ! is_array( $terms ) ) {
				$empty_array = array();
				set_transient( $cache_key, $empty_array, self::CACHE_EXPIRY );
				return $empty_array;
			}

			// Build minimal data structure with pre-calculated counts.
			$terms_data = array();
			foreach ( $terms as $term ) {
				// if ( ! $term instanceof \WP_Term ) {
				// 	continue;
				// }

				$count        = $this->count_events_for_term( $term->term_id, $taxonomy_slug, $upcoming_event_ids );
				$terms_data[] = array(
					'term_id' => $term->term_id,
					'name'    => $term->name,
					'count'   => $count,
				);
			}

			set_transient( $cache_key, $terms_data, self::CACHE_EXPIRY );

			return $terms_data;
		}

		/**
		 * Collects unique term IDs from events.
		 *
		 * @since 0.1.0
		 * @param string          $taxonomy_slug    The taxonomy slug.
		 * @param array<int, int> $upcoming_event_ids Array of event post IDs.
		 * @return array<int, int> Array of term IDs.
		 */
		private function collect_term_ids_from_events( string $taxonomy_slug, array $upcoming_event_ids ): array {
			$term_ids_map = array();

			foreach ( $upcoming_event_ids as $event_id ) {
				$event_terms = wp_get_post_terms( $event_id, $taxonomy_slug, array( 'fields' => 'ids' ) );

				if ( ! is_wp_error( $event_terms ) && ! empty( $event_terms ) ) {
					foreach ( $event_terms as $term_id ) {
						if ( $term_id > 0 ) {
							$term_ids_map[ $term_id ] = true;
						}
					}
				}
			}

			return array_keys( $term_ids_map );
		}

		/**
		 * Counts events for a specific term.
		 *
		 * @since 0.1.0
		 * @param int             $term_id            The term ID.
		 * @param string          $taxonomy_slug      The taxonomy slug.
		 * @param array<int, int> $upcoming_event_ids Array of event post IDs.
		 * @return int The count of events for this term.
		 */
		private function count_events_for_term( int $term_id, string $taxonomy_slug, array $upcoming_event_ids ): int {
			$count = 0;

			foreach ( $upcoming_event_ids as $event_id ) {
				$event_terms = wp_get_post_terms( $event_id, $taxonomy_slug, array( 'fields' => 'ids' ) );

				if ( ! is_wp_error( $event_terms ) && in_array( $term_id, $event_terms, true ) ) {
					++$count;
				}
			}

			return $count;
		}
	
		/**
		 * Clears all caches when an event post status changes.
		 *
		 * Triggers when a post transitions from or to 'publish' status.
		 * Clears both upcoming events cache and all taxonomy-specific term caches.
		 *
		 * @since 0.1.0
		 * @param string   $new_status New post status.
		 * @param string   $old_status Old post status.
		 * @param \WP_Post $post       Post object.
		 * @return void
		 */
		public function clear_cache_on_status_change( string $new_status, string $old_status, \WP_Post $post ): void {
			// Only clear cache if this is a gatherpress_event post.
			if ( 'gatherpress_event' !== $post->post_type ) {
				return;
			}
	
			// Only clear cache if status changed from or to 'publish'.
			if ( 'publish' !== $new_status && 'publish' !== $old_status ) {
				return;
			}
	
			$this->clear_all_caches();
		}
	
		/**
		 * Clears taxonomy-specific caches when terms are assigned to an event.
		 *
		 * Triggers when terms are set on a post (added, updated, or removed).
		 * Only processes gatherpress_event posts and taxonomies registered with that post type.
		 *
		 * @since 0.1.0
		 * @param int                    $object_id  Object ID.
		 * @param array<int, int|string> $terms      An array of object term IDs or slugs.
		 * @param array<int, int>        $tt_ids     An array of term taxonomy IDs.
		 * @param string                 $taxonomy   Taxonomy slug.
		 * @return void
		 */
		public function clear_cache_on_terms_change( int $object_id, array $terms, array $tt_ids, string $taxonomy ): void {
			// Only process if this is a gatherpress_event post.
			if ( 'gatherpress_event' !== get_post_type( $object_id ) ) {
				return;
			}
	
			// Verify the taxonomy is registered with gatherpress_event.
			$taxonomy_object = get_taxonomy( $taxonomy );
			if ( ! $taxonomy_object || ! in_array( 'gatherpress_event', (array) $taxonomy_object->object_type, true ) ) {
				return;
			}
	
			// Clear the taxonomy-specific term cache.
			delete_transient( 'gatherpress_magic_menu_terms_' . $taxonomy );
		}
	
		/**
		 * Clears all plugin caches.
		 *
		 * Removes both the upcoming events cache and all taxonomy-specific term caches.
		 * Used during deactivation and when significant event changes occur.
		 *
		 * @since 0.1.0
		 * @return void
		 */
		public function clear_all_caches(): void {
			/**
			 * @var \wpdb  $wpdb WordPress database abstraction object.
			 */
			global $wpdb;
	
			// Prepare the LIKE patterns for deletion.
			$transient_pattern = $wpdb->esc_like( '_transient_gatherpress_magic_menu_' ) . '%';
			$timeout_pattern   = $wpdb->esc_like( '_transient_timeout_gatherpress_magic_menu_' ) . '%';
	
			// Prepare SQL statement.
			$table = $wpdb->options;
			$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
				$wpdb->prepare(
					"DELETE FROM {$table} WHERE option_name LIKE %s OR option_name LIKE %s",
					$transient_pattern,
					$timeout_pattern
				)
			);
		}
	}
}
