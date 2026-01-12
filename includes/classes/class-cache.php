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
		private function __construct() {}

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
	}
}
