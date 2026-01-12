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

			return array(
				// Overlay colors for submenu dropdowns.
				'overlayTextColor'             => isset( $context['overlayTextColor'] ) && is_string( $context['overlayTextColor'] ) ? $context['overlayTextColor'] : '',
				'customOverlayTextColor'       => isset( $context['customOverlayTextColor'] ) && is_string( $context['customOverlayTextColor'] ) ? $context['customOverlayTextColor'] : '',
				'overlayBackgroundColor'       => isset( $context['overlayBackgroundColor'] ) && is_string( $context['overlayBackgroundColor'] ) ? $context['overlayBackgroundColor'] : '',
				'customOverlayBackgroundColor' => isset( $context['customOverlayBackgroundColor'] ) && is_string( $context['customOverlayBackgroundColor'] ) ? $context['customOverlayBackgroundColor'] : '',

				// Submenu icon visibility and interaction.
				'showSubmenuIcon'              => isset( $context['showSubmenuIcon'] ) ? (bool) $context['showSubmenuIcon'] : true,
				'openSubmenusOnClick'          => isset( $context['openSubmenusOnClick'] ) ? (bool) $context['openSubmenusOnClick'] : false,

				// Complete style object from parent navigation.
				'style'                        => isset( $context['style'] ) && is_array( $context['style'] ) ? $context['style'] : array(),

				// Font size from parent navigation.
				'fontSize'                     => isset( $context['fontSize'] ) && is_string( $context['fontSize'] ) ? $context['fontSize'] : '',
				'customFontSize'               => isset( $context['customFontSize'] ) && is_string( $context['customFontSize'] ) ? $context['customFontSize'] : '',
			);
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
		 * @return array<string, mixed>|false The parsed link block or false on failure.
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

			return ( ! empty( $link_blocks ) && isset( $link_blocks[0] ) && is_array( $link_blocks[0] ) )
				? $link_blocks[0]
				: false;
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
		 * @return array<string, mixed>|false The parsed submenu block or false on failure.
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

			return ( ! empty( $submenu_blocks ) && isset( $submenu_blocks[0] ) && is_array( $submenu_blocks[0] ) )
				? $submenu_blocks[0]
				: false;
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
				if ( ! is_array( $term_info ) || ! isset( $term_info['term_id'], $term_info['name'], $term_info['count'] ) ) {
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
				if ( ! isset( $attrs['style'] ) ) {
					$attrs['style'] = array();
				}
				if ( ! isset( $attrs['style']['typography'] ) ) {
					$attrs['style']['typography'] = array();
				}
				$attrs['style']['typography']['fontSize'] = $nav_context['customFontSize'];
			}

			if ( $use_overlay ) {
				$attrs = $this->apply_overlay_colors_to_attributes( $attrs, $nav_context );
			}

			return $attrs;
		}

		/**
		 * Applies overlay colors to attributes.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attrs       Block attributes.
		 * @param array<string, mixed> $nav_context Navigation context.
		 * @return array<string, mixed> Modified attributes.
		 */
		private function apply_overlay_colors_to_attributes( array $attrs, array $nav_context ): array {
			if ( ! empty( $nav_context['overlayTextColor'] ) && is_string( $nav_context['overlayTextColor'] ) ) {
				$attrs['textColor'] = $nav_context['overlayTextColor'];
			}
			if ( ! empty( $nav_context['customOverlayTextColor'] ) && is_string( $nav_context['customOverlayTextColor'] ) ) {
				if ( ! isset( $attrs['style'] ) ) {
					$attrs['style'] = array();
				}
				if ( ! isset( $attrs['style']['color'] ) ) {
					$attrs['style']['color'] = array();
				}
				$attrs['style']['color']['text'] = $nav_context['customOverlayTextColor'];
			}
			if ( ! empty( $nav_context['overlayBackgroundColor'] ) && is_string( $nav_context['overlayBackgroundColor'] ) ) {
				$attrs['backgroundColor'] = $nav_context['overlayBackgroundColor'];
			}
			if ( ! empty( $nav_context['customOverlayBackgroundColor'] ) && is_string( $nav_context['customOverlayBackgroundColor'] ) ) {
				if ( ! isset( $attrs['style'] ) ) {
					$attrs['style'] = array();
				}
				if ( ! isset( $attrs['style']['color'] ) ) {
					$attrs['style']['color'] = array();
				}
				$attrs['style']['color']['background'] = $nav_context['customOverlayBackgroundColor'];
			}

			return $attrs;
		}
	}
}
