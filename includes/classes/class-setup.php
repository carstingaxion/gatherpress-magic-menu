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
		add_filter( 'hooked_block_types', array( $this, 'hook_block_into_navigation' ), 10, 3 );
		// Load on every plugin load.
		Cache::get_instance();
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
}
