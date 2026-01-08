<?php
/**
 * Plugin Name:       GatherPress Magic Menu
 * Description:       A specialized navigation link block that dynamically links to the GatherPress events archive with customizable label.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            carstenbach & WordPress Telex
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-magic-menu
 *
 * @package GatherPressMagicMenu
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main plugin class implementing Singleton pattern.
 *
 * This class handles block registration and ensures only one instance
 * of the plugin is running at any given time.
 *
 * @since 0.1.0
 */
final class GatherPress_Magic_Menu {
	/**
	 * The single instance of the class.
	 *
	 * @since 0.1.0
	 * @var GatherPress_Magic_Menu|null
	 */
	private static $instance = null;

	/**
	 * Plugin version.
	 *
	 * @since 0.1.0
	 * @var string
	 */
	const VERSION = '0.1.0';

	/**
	 * Transient expiry time in seconds (7 days).
	 *
	 * @since 0.1.0
	 * @var int
	 */
	const CACHE_EXPIRY = WEEK_IN_SECONDS;

	/**
	 * Main plugin instance.
	 *
	 * Ensures only one instance of the plugin is loaded or can be loaded.
	 *
	 * @since 0.1.0
	 * @return GatherPress_Magic_Menu The single instance.
	 */
	public static function instance(): GatherPress_Magic_Menu {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

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
	}

	/**
	 * Prevent cloning of the instance.
	 *
	 * @since 0.1.0
	 * @return void
	 */
	private function __clone() {}

	/**
	 * Prevent unserializing of the instance.
	 *
	 * @since 0.1.0
	 * @throws Exception When attempting to unserialize.
	 * @return void
	 */
	public function __wakeup(): void {
		throw new \Exception( 'Cannot unserialize singleton' );
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
		register_block_type( __DIR__ . '/build/' );
	}

	/**
	 * Hooks the GatherPress Magic Menu block into navigation blocks.
	 *
	 * Uses the Block Hooks API to automatically insert the block
	 * at the end of navigation menus.
	 *
	 * @since 0.1.0
	 * @param array<int, string>          $hooked_blocks An array of block types hooked to the anchor block.
	 * @param string                      $position      The relative position of the hooked blocks.
	 * @param string|null                 $anchor_block  The anchor block type.
	 * @param WP_Block_Template|array<string, mixed> $context       The block template, template part, or pattern context.
	 * @return array<int, string> Modified array of hooked blocks.
	 */
	public function hook_block_into_navigation( array $hooked_blocks, string $position, ?string $anchor_block, $context ): array {
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
	 * @param string  $new_status New post status.
	 * @param string  $old_status Old post status.
	 * @param WP_Post $post       Post object.
	 * @return void
	 */
	public function clear_cache_on_status_change( string $new_status, string $old_status, WP_Post $post ): void {
		// Only clear cache if this is a gatherpress_event post.
		if ( 'gatherpress_event' !== $post->post_type ) {
			return;
		}

		// Only clear cache if status changed from or to 'publish'.
		if ( 'publish' !== $new_status && 'publish' !== $old_status ) {
			return;
		}

		// Clear upcoming events cache.
		delete_transient( 'gatherpress_magic_menu_upcoming_events' );

		// Clear all taxonomy-specific term caches.
		global $wpdb;
		$wpdb->query(
			$wpdb->prepare(
				"DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
				$wpdb->esc_like( '_transient_gatherpress_magic_menu_terms_' ) . '%'
			)
		);
	}

	/**
	 * Clears taxonomy-specific caches when terms are assigned to an event.
	 *
	 * Triggers when terms are set on a post (added, updated, or removed).
	 * Only processes gatherpress_event posts and taxonomies registered with that post type.
	 *
	 * @since 0.1.0
	 * @param int                 $object_id  Object ID.
	 * @param array<int, int|string> $terms      An array of object term IDs or slugs.
	 * @param array<int, int>     $tt_ids     An array of term taxonomy IDs.
	 * @param string              $taxonomy   Taxonomy slug.
	 * @param bool                $append     Whether to append new terms to the old terms.
	 * @param array<int, int>     $old_tt_ids Old array of term taxonomy IDs.
	 * @return void
	 */
	public function clear_cache_on_terms_change( int $object_id, array $terms, array $tt_ids, string $taxonomy, bool $append, array $old_tt_ids ): void {
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
}

/**
 * Initialize the plugin.
 *
 * @since 0.1.0
 * @return GatherPress_Magic_Menu The plugin instance.
 */
function gatherpress_magic_menu(): GatherPress_Magic_Menu {
	return GatherPress_Magic_Menu::instance();
}

// Kickoff the plugin.
gatherpress_magic_menu();