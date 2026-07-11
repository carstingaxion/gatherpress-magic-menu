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
	 * Block name.
	 *
	 * @var string
	 */
	private const BLOCK_NAME = 'gatherpress/magic-menu';

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
		add_action( 'init', array( $this, 'register_block_styles' ), 20 );
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

		// Register block styles.
		// $this->register_block_styles();
	}

	/**
	 * Register block style variations.
	 *
	 * Registers multiple visual styles for the magic menu block.
	 *
	 * @return void
	 */
	public function register_block_styles(): void {
		$styles = array(
			array(
				'name'       => 'default',
				'label'      => __( 'Default', 'gatherpress-magic-menu' ),
				'is_default' => true,
			),
			array(
				'name'  => 'badge',
				'label' => __( 'Badge', 'gatherpress-magic-menu' ),
				'style_handle' => 'gatherpress-magic-menu-badge',
			),
			array(
				'name'  => 'starburst',
				'label' => __( 'Starburst', 'gatherpress-magic-menu' ),
				'style_handle' => 'gatherpress-magic-menu-starburst',
			),
		);

		foreach ( $styles as $style ) {

			if ( isset( $style['style_handle'] ) ) {
				// $result = wp_register_style(
				$result = wp_enqueue_style(
					$style['style_handle'],
					plugins_url(
						'build/' . $style['name'] . '.css',
						// GATHERPRESS_MAGIC_MENU_CORE_PATH
						dirname( dirname( __FILE__ ) )
					),
					'gatherpress-magic-menu-style'
				);
				// do_action('qm/debug', plugins_url(
				// 		'build/' . $style['name'] . '.css',
				// 		// GATHERPRESS_MAGIC_MENU_CORE_PATH
				// 		dirname( dirname( __FILE__ ) )
				// 	) );
			}

			register_block_style(
				self::BLOCK_NAME,
				// 'core/navigation-link',
				$style
			);
		}
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
		$hooked_blocks[] = self::BLOCK_NAME;

		return $hooked_blocks;
	}
}
