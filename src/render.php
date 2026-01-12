<?php

namespace GatherPress_Magic_Menu;

/**
 * Render callback for the GatherPress Magic Menu block.
 *
 * This file is responsible for generating the frontend HTML output
 * for the block, creating a navigation submenu that contains links
 * to each term in the selected GatherPress taxonomy.
 *
 * Uses BEM naming convention:
 * - Block: .gatherpress-magic-menu
 * - Element: .gatherpress-magic-menu__count
 * - Modifier: .gatherpress-magic-menu--disabled
 *
 * @package GatherPressMagicMenu
 * @since 0.1.0
 *
 * @param array<string, mixed> $attributes Block attributes.
 * @param string               $content    Block default content.
 * @param \WP_Block             $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$renderer = Renderer::get_instance();
echo $renderer->render( $attributes, $content, $block );
