<?php
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

namespace GatherPress_Magic_Menu;

defined( 'ABSPATH' ) || exit;

/**
 * Extract and sanitize block attributes.
 *
 * @var array{
 *   label?: string,
 *   gatherpressTaxonomy?: string,
 *   showEventCount?: bool,
 *   showTermEventCount?: bool,
 * } $attributes
 * @var string $content
 * @var \WP_Block $block
 */
$gatherpress_magic_menu_renderer = Renderer::get_instance();
echo $gatherpress_magic_menu_renderer->render( $attributes, $content, $block ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
