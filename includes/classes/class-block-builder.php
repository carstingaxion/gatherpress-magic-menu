<?php
/**
 * Class for building block structures for rendering.
 *
 * @package GatherPressMagicMenu
 */

namespace GatherPress_Magic_Menu;

use GatherPress\Core;

if ( ! class_exists( 'Block_Builder' ) ) {
	/**
	 * Singleton class for building block structures for rendering.
	 *
	 * Responsibilities:
	 * - Create navigation-link blocks
	 * - Create navigation-submenu blocks
	 * - Apply navigation context (colors, styles, etc.)
	 * - Add term links to submenus
	 *
	 * @since 0.1.0
	 */
	class Block_Builder {

		use Core\Traits\Singleton;

		/**
		 * Private constructor to prevent direct instantiation.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {}

		/**
		 * Extracts context values needed for rendering.
		 *
		 * Consolidates all context extraction in one place for better maintainability.
		 * Includes overlay colors, submenu icon visibility, and inherited styles.
		 *
		 * @since 0.1.0
		 * @param \WP_Block $block Block instance.
		 * @return array<string, mixed> Array with all context values.
		 */
		public function get_navigation_context( \WP_Block $block ): array {
			$context = $block->context;

			return [
				'showSubmenuIcon'              => $context['showSubmenuIcon'] ?? true,
				'openSubmenusOnClick'          => $context['openSubmenusOnClick'] ?? false,
				'overlayTextColor'             => $context['overlayTextColor'] ?? null,
				'overlayBackgroundColor'       => $context['overlayBackgroundColor'] ?? null,
				'customOverlayTextColor'       => $context['customOverlayTextColor'] ?? null,
				'customOverlayBackgroundColor' => $context['customOverlayBackgroundColor'] ?? null,
			];
		}

		/**
		 * Creates a navigation link block structure.
		 *
		 * Mimics core/navigation-link structure to ensure compatibility
		 * with theme.json styles and core rendering functions.
		 *
		 * @since 0.1.0
		 * @param string               $label        The link label (may contain HTML).
		 * @param string               $archive_url  The archive URL.
		 * @param array<string, mixed> $nav_context  Navigation context including colors and styles.
		 * @return array|false The parsed link block or false on failure.
		 * @phpstan-return array{
		 *   blockName?: string,
		 *   attrs?: array<string, mixed>,
		 *   innerBlocks?: array<int, array<string, mixed>>,
		 *   innerHTML?: string,
		 *   innerContent?: array<int, string|null>,
		 * }|false
		 */
		public function create_link_block( string $label, string $archive_url, array $nav_context ) {
			$link_attrs = array(
				'label' => $label,
				'url'   => $archive_url,
				'kind'  => 'post-type-archive',
				'type'  => 'gatherpress_event',
			);

			$link_attrs = $this->apply_context_to_attributes( $link_attrs, $nav_context, false );

			$link_content = sprintf(
				'<!-- wp:navigation-link %s /-->',
				wp_json_encode( $link_attrs )
			);

			$link_blocks = parse_blocks( $link_content );

			if ( empty( $link_blocks ) ) {
				return false;
			}

			/**
			 * Type safety first
			 * 
			 * @var array{
			 *   blockName: string,
			 *   attrs: array<string, mixed>,
			 *   innerBlocks: array<int, array<string, mixed>>,
			 *   innerHTML: string,
			 *   innerContent: array<int, string|null>,
			 * } $link_block
			 */
			$link_block = $link_blocks[0];

			return $link_block;
		}

		/**
		 * Creates a submenu block structure with navigation context.
		 *
		 * Mimics core/navigation-submenu structure to ensure compatibility
		 * with theme.json styles and core rendering functions.
		 *
		 * @since 0.1.0
		 * @param string               $label        The submenu label (may contain HTML).
		 * @param string               $archive_url  The archive URL.
		 * @param array<string, mixed> $nav_context  Navigation context including colors, styles, and showSubmenuIcon.
		 * @return array|false The parsed submenu block or false on failure.
		 * @phpstan-return array{
		 *   blockName?: string,
		 *   attrs?: array<string, mixed>,
		 *   innerBlocks?: array<int, array<string, mixed>>,
		 *   innerHTML?: string,
		 *   innerContent?: array<int, string|null>,
		 * }|false
		 */
		public function create_submenu_block( string $label, string $archive_url, array $nav_context ) {
			$submenu_attrs = array(
				'label' => $label,
				'url'   => $archive_url,
				'kind'  => 'post-type-archive',
				'type'  => 'gatherpress_event',
			);

			if ( isset( $nav_context['showSubmenuIcon'] ) && ! $nav_context['showSubmenuIcon'] ) {
				$submenu_attrs['showSubmenuIcon'] = false;
			}

			$submenu_attrs = $this->apply_context_to_attributes( $submenu_attrs, $nav_context, true );

			$submenu_content = sprintf(
				'<!-- wp:navigation-submenu %s --><!-- /wp:navigation-submenu -->',
				wp_json_encode( $submenu_attrs )
			);

			$submenu_blocks = parse_blocks( $submenu_content );

			if ( empty( $submenu_blocks ) ) {
				return false;
			}

			/**
			 * Type safety first
			 * 
			 * @var array{
			 *   blockName: string,
			 *   attrs: array<string, mixed>,
			 *   innerBlocks: array<int, array<string, mixed>>,
			 *   innerHTML: string,
			 *   innerContent: array<int, string|null>,
			 * } $submenu_block
			 */
			$submenu_block = $submenu_blocks[0];

			return $submenu_block;
		}

		/**
		 * Adds term navigation links to a submenu block.
		 *
		 * Uses the minimal cached data (term_id, name, count) to build links.
		 * Properly inherits context values for consistent styling.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed>             $submenu_block  The submenu block structure.
		 * @param array<int, array<string, mixed>> $terms_data     Array of term data with 'term_id', 'name', and 'count'.
		 * @param string                           $taxonomy_slug  The taxonomy slug.
		 * @param bool                             $show_count     Whether to show event count for term links.
		 * @param array<string, mixed>             $nav_context    Navigation context including colors and styles.
		 * @return array<string, mixed> The modified submenu block.
		 */
		public function add_term_links_to_submenu( array $submenu_block, array $terms_data, string $taxonomy_slug, bool $show_count, array $nav_context ): array {
			$formatter = Label_Formatter::get_instance();

			foreach ( $terms_data as $term_info ) {
				if ( ! isset( $term_info['term_id'], $term_info['name'], $term_info['count'] ) ) {
					continue;
				}

				if ( ! is_int( $term_info['term_id'] ) || ! is_string( $term_info['name'] ) || ! is_int( $term_info['count'] ) ) {
					continue;
				}

				$term_link = get_term_link( $term_info['term_id'], $taxonomy_slug );

				if ( is_wp_error( $term_link ) ) {
					continue;
				}

				$term_label = $formatter->format_label_with_count(
					$term_info['name'],
					$term_info['count'],
					$show_count
				);

				$link_attrs = array(
					'label' => $term_label,
					'url'   => $term_link,
					'kind'  => 'taxonomy',
					'type'  => $taxonomy_slug,
				);

				$link_attrs = $this->apply_context_to_attributes( $link_attrs, $nav_context, true );

				/**
				 * Type safety first
				 * 
				 * @var array{
				 *   blockName: string,
				 *   attrs: array<string, mixed>,
				 *   innerBlocks: array<int, array<string, mixed>>,
				 *   innerHTML: string,
				 *   innerContent: array<int, string|null>,
				 * } $submenu_block
				 */
				$submenu_block['innerBlocks'][] = array(
					'blockName'    => 'core/navigation-link',
					'attrs'        => $link_attrs,
					'innerBlocks'  => array(),
					'innerHTML'    => '',
					'innerContent' => array(),
				);
			}

			return $submenu_block;
		}

		/**
		 * Applies navigation context to block attributes.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attrs       Block attributes.
		 * @param array<string, mixed> $nav_context Navigation context.
		 * @param bool                 $use_overlay Whether to use overlay colors.
		 * @return array<string, mixed> Modified attributes.
		 */
		private function apply_context_to_attributes( array $attrs, array $nav_context, bool $use_overlay ): array {
			if ( ! empty( $nav_context['fontSize'] ) && is_string( $nav_context['fontSize'] ) ) {
				$attrs['fontSize'] = $nav_context['fontSize'];
			}

			if ( ! empty( $nav_context['style'] ) && is_array( $nav_context['style'] ) ) {
				$attrs['style'] = $nav_context['style'];
			}

			if ( ! empty( $nav_context['customFontSize'] ) && is_string( $nav_context['customFontSize'] ) ) {
				if ( ! isset( $attrs['style'] ) || ! is_array( $attrs['style'] ) ) {
					$attrs['style'] = array();
				}
				if ( ! isset( $attrs['style']['typography'] ) || ! is_array( $attrs['style']['typography'] ) ) {
					$attrs['style']['typography'] = array();
				}
				$attrs['style']['typography']['fontSize'] = $nav_context['customFontSize'];
			}

			if ( $use_overlay ) {
				$attrs = $this->apply_overlay_context_to_attributes( $attrs, $nav_context );
			}

			return $attrs;
		}

		/**
		 * Mirrors core/navigation-submenu overlay color handling.
		 *
		 * @param array<string, mixed> $attributes Block attributes.
		 * @param array<string, mixed> $context    Parent Navigation block context.
		 * @return array<string, mixed>
		 */
		public function apply_overlay_context_to_attributes(
			array $attributes,
			array $context
		): array {

			// Named colors (theme.json aware).
			if ( isset( $context['overlayTextColor'] ) ) {
				$attributes['textColor'] = $context['overlayTextColor'];
			}

			if ( isset( $context['overlayBackgroundColor'] ) ) {
				$attributes['backgroundColor'] = $context['overlayBackgroundColor'];
			}

			// Custom colors (inline styles).
			if (
				isset( $context['customOverlayTextColor'] ) ||
				isset( $context['customOverlayBackgroundColor'] )
			) {
				$attributes['style']['color'] ??= [];

				if ( isset( $context['customOverlayTextColor'] ) ) {
					$attributes['style']['color']['text'] = $context['customOverlayTextColor'];
				}

				if ( isset( $context['customOverlayBackgroundColor'] ) ) {
					$attributes['style']['color']['background'] = $context['customOverlayBackgroundColor'];
				}
			}

			return $attributes;
		}

		/**
		 * Extracts overlay colors from submenu parent block.
		 *
		 * This mimics core/navigation-submenu's approach: it copies overlay colors
		 * from context into the submenu attributes, then uses wp_apply_colors_support()
		 * to generate the proper CSS classes and inline styles.
		 *
		 * @since 0.1.0
		 * @param \WP_Block $block The submenu block instance.
		 * @return array<string, string> Array with 'class' and 'style' keys for the container.
		 */
		public function extract_overlay_colors_from_parent_block( \WP_Block $block ): array {
			/**
			 * Type safety.
			 *
			 * @var array<string, mixed> $attributes
			 */
			$attributes = $block->attributes;

			$attributes = $this->apply_overlay_context_to_attributes(
				$attributes,
				$block->context
			);

			// Core enables support at runtime.
			$block->block_type->supports['color'] = true;

			$colors = wp_apply_colors_support( $block->block_type, $attributes );

			/**
			 * Type safety.
			 *
			 * @var array{class?: string, style?: string} $colors
			 */
			return [
				'class' => is_string( $colors['class'] ?? null ) ? $colors['class'] : '',
				'style' => is_string( $colors['style'] ?? null ) ? $colors['style'] : '',
			];
		}
	}
}
