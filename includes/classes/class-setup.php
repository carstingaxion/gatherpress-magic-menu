<?php
/**
 * Class for block registration and cache deletion
 *
 * @package GatherPressMagicMenu
 */

namespace GatherPress_Magic_Menu;

use GatherPress\Core;
/**
 * Main plugin Singleton.
 *
 * This class handles block registration and cache deletion.
 *
 * @since 0.1.0
 */
class Setup {

	use Core\Traits\Singleton;

	/**
	 * Constructor.
	 *
	 * Private constructor to prevent direct instantiation.
	 * Initializes hooks and filters.
	 *
	 * @since 0.1.0
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'transition_post_status', array( $this, 'clear_cache_on_status_change' ), 10, 3 );
		add_action( 'set_object_terms', array( $this, 'clear_cache_on_terms_change' ), 10, 6 );
		add_filter( 'hooked_block_types', array( $this, 'hook_block_into_navigation' ), 10, 4 );
		register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
	}

	/**
	 * Registers the block type.
	 *
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it also registers all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @since 0.1.0
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 * @return void
	 */
	public function register_block(): void {
		register_block_type( GATHERPRESS_MAGIC_MENU_CORE_PATH . '/build/' );
	}

	/**
	 * Hooks the GatherPress Magic Menu block into navigation blocks.
	 *
	 * Uses the Block Hooks API to automatically insert the block
	 * at the end of navigation menus.
	 *
	 * @since 0.1.0
	 * @param array<int, string> $hooked_blocks An array of block types hooked to the anchor block.
	 * @param string             $position      The relative position of the hooked blocks.
	 * @param string|null        $anchor_block  The anchor block type.
	 * @return array<int, string> Modified array of hooked blocks.
	 */
	public function hook_block_into_navigation( array $hooked_blocks, string $position, ?string $anchor_block ): array {
		// Only hook into core/navigation blocks.
		if ( 'core/navigation' !== $anchor_block ) {
			return $hooked_blocks;
		}

		// Only add at the 'last_child' position (end of navigation menu).
		if ( 'last_child' !== $position ) {
			return $hooked_blocks;
		}

		// Add our block to the hooked blocks array.
		$hooked_blocks[] = 'gatherpress/magic-menu';

		return $hooked_blocks;
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
	private function clear_all_caches(): void {
		global $wpdb;

		// Clear upcoming events cache.
		delete_transient( 'gatherpress_magic_menu_upcoming_events' );

		// Clear all taxonomy-specific term caches.
		$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( '_transient_gatherpress_magic_menu_terms_' ) . '%'
			)
		);

		// Also clear timeout transients.
		$wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( '_transient_timeout_gatherpress_magic_menu_' ) . '%'
			)
		);
	}

	/**
	 * Plugin deactivation cleanup.
	 *
	 * Removes all cached transients when the plugin is deactivated
	 * to ensure a clean state.
	 *
	 * @since 0.1.0
	 * @return void
	 */
	public function deactivate(): void {
		$this->clear_all_caches();
	}
}
