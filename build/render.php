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
 * @param WP_Block             $block      Block instance.
 *
 * @see https://developer.wordpress.org/reference/functions/get_post_type_archive_link/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'GatherPress_Magic_Menu_Renderer' ) ) {
	/**
	 * Singleton class for rendering the block.
	 *
	 * @since 0.1.0
	 */
	final class GatherPress_Magic_Menu_Renderer {
		/**
		 * The single instance of the class.
		 *
		 * @since 0.1.0
		 * @var GatherPress_Magic_Menu_Renderer|null
		 */
		private static $instance = null;

		/**
		 * Transient expiry time in seconds (7 days).
		 *
		 * @since 0.1.0
		 * @var int
		 */
		const CACHE_EXPIRY = 604800;

		/**
		 * Main renderer instance.
		 *
		 * Ensures only one instance of the renderer is loaded or can be loaded.
		 *
		 * @since 0.1.0
		 * @return GatherPress_Magic_Menu_Renderer The single instance.
		 */
		public static function instance(): GatherPress_Magic_Menu_Renderer {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Private constructor to prevent direct instantiation.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {}

		/**
		 * Renders the block output.
		 *
		 * Main entry point that orchestrates the rendering logic.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attributes Block attributes.
		 * @param string               $content    Block default content.
		 * @param WP_Block             $block      Block instance.
		 * @return string The rendered block HTML.
		 */
		public function render( array $attributes, string $content, WP_Block $block ): string {
			$label = $this->get_label( $attributes );
			$taxonomy_slug = $this->get_taxonomy_slug( $attributes );
			$show_count = $this->get_show_event_count( $attributes );
			$show_term_count = $this->get_show_term_event_count( $attributes );
			$archive_url = $this->get_events_archive_url();
			$wrapper_attributes = get_block_wrapper_attributes();

			$upcoming_event_ids = $this->get_upcoming_events();
			$total_count = count( $upcoming_event_ids );

			if ( empty( $upcoming_event_ids ) ) {
				return $this->render_simple_link( $label, $archive_url, true, 0, $show_count, $wrapper_attributes, $block );
			}

			if ( empty( $taxonomy_slug ) ) {
				return $this->render_simple_link( $label, $archive_url, false, $total_count, $show_count, $wrapper_attributes, $block );
			}

			$terms_data = $this->get_terms_with_event_counts( $taxonomy_slug, $upcoming_event_ids );

			if ( empty( $terms_data ) ) {
				return $this->render_simple_link( $label, $archive_url, false, $total_count, $show_count, $wrapper_attributes, $block );
			}

			return $this->render_submenu( $label, $archive_url, $terms_data, $taxonomy_slug, $total_count, $show_count, $show_term_count, $wrapper_attributes, $block );
		}

		/**
		 * Gets the fallback label from the post type.
		 *
		 * @since 0.1.0
		 * @return string The fallback label from post type plural label.
		 */
		private function get_fallback_label(): string {
			$post_type_object = get_post_type_object( 'gatherpress_event' );

			if ( $post_type_object && isset( $post_type_object->labels->name ) ) {
				return $post_type_object->labels->name;
			}

			return __( 'Events', 'gatherpress-magic-menu' );
		}

		/**
		 * Extracts the label from attributes with fallback.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attributes Block attributes.
		 * @return string The label text.
		 */
		private function get_label( array $attributes ): string {
			if ( isset( $attributes['label'] ) && is_string( $attributes['label'] ) && ! empty( $attributes['label'] ) ) {
				return $attributes['label'];
			}

			return $this->get_fallback_label();
		}

		/**
		 * Extracts the taxonomy slug from attributes.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attributes Block attributes.
		 * @return string The taxonomy slug.
		 */
		private function get_taxonomy_slug( array $attributes ): string {
			return ( isset( $attributes['gatherpressTaxonomy'] ) && is_string( $attributes['gatherpressTaxonomy'] ) && ! empty( $attributes['gatherpressTaxonomy'] ) )
				? $attributes['gatherpressTaxonomy']
				: '';
		}

		/**
		 * Extracts the show event count setting from attributes.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attributes Block attributes.
		 * @return bool Whether to show event count.
		 */
		private function get_show_event_count( array $attributes ): bool {
			return isset( $attributes['showEventCount'] ) && true === $attributes['showEventCount'];
		}

		/**
		 * Extracts the show term event count setting from attributes.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attributes Block attributes.
		 * @return bool Whether to show term event count.
		 */
		private function get_show_term_event_count( array $attributes ): bool {
			return isset( $attributes['showTermEventCount'] ) && true === $attributes['showTermEventCount'];
		}

		/**
		 * Retrieves all upcoming GatherPress event IDs with caching.
		 *
		 * Stores only the post IDs to minimize transient size.
		 *
		 * @since 0.1.0
		 * @return array<int, int> Array of event post IDs.
		 */
		private function get_upcoming_events(): array {
			$cache_key = 'gatherpress_magic_menu_upcoming_events';
			$cached_events = get_transient( $cache_key );

			if ( is_array( $cached_events ) ) {
				return $cached_events;
			}

			$events = get_posts(
				array(
					'post_type'               => 'gatherpress_event',
					'post_status'             => 'publish',
					'gatherpress_event_query' => 'upcoming',
					'order'                   => 'desc',
					'posts_per_page'          => -1,
					'fields'                  => 'ids',
					'no_found_rows'           => true,
					'update_post_term_cache'  => false,
					'update_menu_item_cache'  => false,
					'suppress_filters'        => false,
				)
			);

			if ( ! is_array( $events ) ) {
				$events = array();
			}

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
		 * @param string        $taxonomy_slug    The taxonomy slug.
		 * @param array<int, int> $upcoming_event_ids Array of event post IDs.
		 * @return array<int, array<string, mixed>> Array of associative arrays with 'term_id', 'name', and 'count' keys.
		 */
		private function get_terms_with_event_counts( string $taxonomy_slug, array $upcoming_event_ids ): array {
			$cache_key = 'gatherpress_magic_menu_terms_' . $taxonomy_slug;
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
				if ( ! $term instanceof WP_Term ) {
					continue;
				}

				$count = $this->count_events_for_term( $term->term_id, $taxonomy_slug, $upcoming_event_ids );
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
		 * @param string        $taxonomy_slug    The taxonomy slug.
		 * @param array<int, int> $upcoming_event_ids Array of event post IDs.
		 * @return array<int, int> Array of term IDs.
		 */
		private function collect_term_ids_from_events( string $taxonomy_slug, array $upcoming_event_ids ): array {
			$term_ids_map = array();

			foreach ( $upcoming_event_ids as $event_id ) {
				$event_terms = wp_get_post_terms( $event_id, $taxonomy_slug, array( 'fields' => 'ids' ) );

				if ( ! is_wp_error( $event_terms ) && is_array( $event_terms ) && ! empty( $event_terms ) ) {
					foreach ( $event_terms as $term_id ) {
						if ( is_int( $term_id ) ) {
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
		 * @param int           $term_id            The term ID.
		 * @param string        $taxonomy_slug      The taxonomy slug.
		 * @param array<int, int> $upcoming_event_ids Array of event post IDs.
		 * @return int The count of events for this term.
		 */
		private function count_events_for_term( int $term_id, string $taxonomy_slug, array $upcoming_event_ids ): int {
			$count = 0;

			foreach ( $upcoming_event_ids as $event_id ) {
				$event_terms = wp_get_post_terms( $event_id, $taxonomy_slug, array( 'fields' => 'ids' ) );

				if ( ! is_wp_error( $event_terms ) && is_array( $event_terms ) && in_array( $term_id, $event_terms, true ) ) {
					$count++;
				}
			}

			return $count;
		}

		/**
		 * Formats a label with event count using BEM element class.
		 *
		 * Uses .gatherpress-magic-menu__count as the BEM element class.
		 *
		 * @since 0.1.0
		 * @param string $label      The base label.
		 * @param int    $count      The event count.
		 * @param bool   $show_count Whether to show the count.
		 * @return string The formatted label HTML.
		 */
		private function format_label_with_count( string $label, int $count, bool $show_count ): string {
			if ( ! $show_count ) {
				return esc_html( $label );
			}

			return sprintf(
				'%s<span class="gatherpress-magic-menu__count">%d</span>',
				esc_html( $label ),
				(int) $count
			);
		}

		/**
		 * Extracts context values needed for rendering.
		 *
		 * Consolidates all context extraction in one place for better maintainability.
		 * Includes overlay colors, submenu icon visibility, and inherited styles.
		 *
		 * @since 0.1.0
		 * @param WP_Block $block Block instance.
		 * @return array<string, mixed> Array with all context values.
		 */
		private function get_navigation_context( WP_Block $block ): array {
			$context = $block->context;

			return array(
				// Overlay colors for submenu dropdowns
				'overlayTextColor'             => isset( $context['overlayTextColor'] ) && is_string( $context['overlayTextColor'] ) ? $context['overlayTextColor'] : '',
				'customOverlayTextColor'       => isset( $context['customOverlayTextColor'] ) && is_string( $context['customOverlayTextColor'] ) ? $context['customOverlayTextColor'] : '',
				'overlayBackgroundColor'       => isset( $context['overlayBackgroundColor'] ) && is_string( $context['overlayBackgroundColor'] ) ? $context['overlayBackgroundColor'] : '',
				'customOverlayBackgroundColor' => isset( $context['customOverlayBackgroundColor'] ) && is_string( $context['customOverlayBackgroundColor'] ) ? $context['customOverlayBackgroundColor'] : '',

				// Submenu icon visibility and interaction
				'showSubmenuIcon'              => isset( $context['showSubmenuIcon'] ) ? (bool) $context['showSubmenuIcon'] : true,
				'openSubmenusOnClick'          => isset( $context['openSubmenusOnClick'] ) ? (bool) $context['openSubmenusOnClick'] : false,

				// Complete style object from parent navigation
				'style'                        => isset( $context['style'] ) && is_array( $context['style'] ) ? $context['style'] : array(),

				// Font size from parent navigation
				'fontSize'                     => isset( $context['fontSize'] ) && is_string( $context['fontSize'] ) ? $context['fontSize'] : '',
				'customFontSize'               => isset( $context['customFontSize'] ) && is_string( $context['customFontSize'] ) ? $context['customFontSize'] : '',
			);
		}

		/**
		 * Builds interaction classes for submenu items.
		 *
		 * Mimics core/navigation-submenu's behavior for controlling
		 * how submenus open (on click vs hover+click).
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $nav_context Navigation context.
		 * @return array<int, string> Array of CSS classes.
		 */
		private function get_submenu_interaction_classes( array $nav_context ): array {
			$show_submenu_indicators = isset( $nav_context['showSubmenuIcon'] ) && $nav_context['showSubmenuIcon'];
			$open_on_click           = isset( $nav_context['openSubmenusOnClick'] ) && $nav_context['openSubmenusOnClick'];
			$open_on_hover_and_click = isset( $nav_context['openSubmenusOnClick'] ) && ! $nav_context['openSubmenusOnClick'] && $show_submenu_indicators;

			$classes = array();

			if ( $open_on_click ) {
				$classes[] = 'open-on-click';
			}

			if ( $open_on_hover_and_click ) {
				$classes[] = 'open-on-hover-click';
			}

			return $classes;
		}

		/**
		 * Renders a navigation submenu with term links.
		 *
		 * Uses core's render_block_core_navigation_submenu approach by leveraging
		 * the block rendering system with proper context inheritance.
		 *
		 * @since 0.1.0
		 * @param string                     $label              The submenu label.
		 * @param string                     $archive_url        The archive URL.
		 * @param array<int, array<string, mixed>> $terms_data         Array of term data with 'term_id', 'name', and 'count'.
		 * @param string                     $taxonomy_slug      The taxonomy slug.
		 * @param int                        $total_count        Total count of upcoming events.
		 * @param bool                       $show_count         Whether to show event count for main archive.
		 * @param bool                       $show_term_count    Whether to show event count for term links.
		 * @param string                     $wrapper_attributes Wrapper attributes from get_block_wrapper_attributes().
		 * @param WP_Block                   $block              Block instance.
		 * @return string The rendered submenu HTML.
		 */
		private function render_submenu( string $label, string $archive_url, array $terms_data, string $taxonomy_slug, int $total_count, bool $show_count, bool $show_term_count, string $wrapper_attributes, WP_Block $block ): string {
			$formatted_label = $this->format_label_with_count( $label, $total_count, $show_count );
			$nav_context = $this->get_navigation_context( $block );
			$submenu_block = $this->create_submenu_block( $formatted_label, $archive_url, $nav_context );

			if ( ! is_array( $submenu_block ) ) {
				return $this->render_simple_link( $label, $archive_url, false, $total_count, $show_count, $wrapper_attributes, $block );
			}

			// Ensure innerBlocks array exists
			if ( ! isset( $submenu_block['innerBlocks'] ) ) {
				$submenu_block['innerBlocks'] = array();
			}

			// Add term links
			$submenu_block = $this->add_term_links_to_submenu( $submenu_block, $terms_data, $taxonomy_slug, $show_term_count, $nav_context );

			// Create a WP_Block instance to properly inherit context
			$submenu_wp_block = new WP_Block( $submenu_block, array( 'postId' => get_the_ID() ) );

			// Inherit parent navigation context
			$submenu_wp_block->context = array_merge( $block->context, $submenu_wp_block->context );

			// Apply core's color support to the submenu attributes (for the container)
			$submenu_container_attributes = $this->apply_overlay_colors_to_container( $submenu_wp_block );

			// Render using core's rendering system
			$rendered = $submenu_wp_block->render();

			// Apply container colors to the <ul> element
			if ( ! empty( $submenu_container_attributes ) ) {
				$rendered = $this->apply_container_attributes_to_ul( $rendered, $submenu_container_attributes );
			}

			// Apply interaction classes to the <li> element
			$interaction_classes = $this->get_submenu_interaction_classes( $nav_context );
			if ( ! empty( $interaction_classes ) ) {
				$rendered = $this->apply_interaction_classes_to_li( $rendered, $interaction_classes );
			}

			return $this->apply_wrapper_attributes( $rendered, $wrapper_attributes );
		}

		/**
		 * Applies interaction classes to the <li> element.
		 *
		 * Adds classes like 'open-on-click' and 'open-on-hover-click' to control
		 * submenu interaction behavior.
		 *
		 * @since 0.1.0
		 * @param string               $html    The rendered HTML.
		 * @param array<int, string>   $classes Array of classes to add.
		 * @return string The modified HTML.
		 */
		private function apply_interaction_classes_to_li( string $html, array $classes ): string {
			if ( empty( $classes ) ) {
				return $html;
			}

			$processor = new WP_HTML_Tag_Processor( $html );

			if ( $processor->next_tag(
				array(
					'tag_name'   => 'li',
					'class_name' => 'wp-block-navigation-item',
				)
			) ) {
				foreach ( $classes as $class ) {
					if ( ! empty( $class ) ) {
						$processor->add_class( $class );
					}
				}
			}

			return $processor->get_updated_html();
		}

		/**
		 * Applies overlay colors to submenu container using core's color support.
		 *
		 * This mimics core/navigation-submenu's approach: it copies overlay colors
		 * from context into the submenu attributes, then uses wp_apply_colors_support()
		 * to generate the proper CSS classes and inline styles.
		 *
		 * @since 0.1.0
		 * @param WP_Block $submenu_block The submenu block instance.
		 * @return array<string, string> Array with 'class' and 'style' keys for the container.
		 */
		private function apply_overlay_colors_to_container( WP_Block $submenu_block ): array {
			$attributes = $submenu_block->attributes;

			// Copy overlay colors from context to attributes (like core does)
			if ( array_key_exists( 'overlayTextColor', $submenu_block->context ) ) {
				$attributes['textColor'] = $submenu_block->context['overlayTextColor'];
			}
			if ( array_key_exists( 'overlayBackgroundColor', $submenu_block->context ) ) {
				$attributes['backgroundColor'] = $submenu_block->context['overlayBackgroundColor'];
			}
			if ( array_key_exists( 'customOverlayTextColor', $submenu_block->context ) ) {
				if ( ! isset( $attributes['style'] ) ) {
					$attributes['style'] = array();
				}
				if ( ! isset( $attributes['style']['color'] ) ) {
					$attributes['style']['color'] = array();
				}
				$attributes['style']['color']['text'] = $submenu_block->context['customOverlayTextColor'];
			}
			if ( array_key_exists( 'customOverlayBackgroundColor', $submenu_block->context ) ) {
				if ( ! isset( $attributes['style'] ) ) {
					$attributes['style'] = array();
				}
				if ( ! isset( $attributes['style']['color'] ) ) {
					$attributes['style']['color'] = array();
				}
				$attributes['style']['color']['background'] = $submenu_block->context['customOverlayBackgroundColor'];
			}

			// Temporarily enable color support to get wp_apply_colors_support to work
			$submenu_block->block_type->supports['color'] = true;
			$colors_support = wp_apply_colors_support( $submenu_block->block_type, $attributes );

			$result = array(
				'class' => '',
				'style' => '',
			);

			if ( array_key_exists( 'class', $colors_support ) ) {
				$result['class'] = $colors_support['class'];
			}

			if ( array_key_exists( 'style', $colors_support ) ) {
				$result['style'] = $colors_support['style'];
			}

			return $result;
		}

		/**
		 * Applies container attributes (class and style) to the <ul> element.
		 *
		 * Uses the HTML Processor API to add the color classes and inline styles
		 * generated by wp_apply_colors_support() to the submenu container.
		 *
		 * @since 0.1.0
		 * @param string               $html                    The rendered HTML.
		 * @param array<string, string> $container_attributes   Array with 'class' and 'style' keys.
		 * @return string The modified HTML.
		 */
		private function apply_container_attributes_to_ul( string $html, array $container_attributes ): string {
			$processor = new WP_HTML_Tag_Processor( $html );

			// Find the <ul> with class wp-block-navigation__submenu-container
			if ( $processor->next_tag(
				array(
					'tag_name'   => 'ul',
					'class_name' => 'wp-block-navigation__submenu-container',
				)
			) ) {
				// Add color classes
				if ( ! empty( $container_attributes['class'] ) ) {
					$classes = explode( ' ', $container_attributes['class'] );
					foreach ( $classes as $class ) {
						if ( ! empty( $class ) ) {
							$processor->add_class( $class );
						}
					}
				}

				// Add or merge inline styles
				if ( ! empty( $container_attributes['style'] ) ) {
					$existing_style = $processor->get_attribute( 'style' );
					$new_style = $existing_style ? $existing_style . '; ' . $container_attributes['style'] : $container_attributes['style'];
					$processor->set_attribute( 'style', $new_style );
				}
			}

			return $processor->get_updated_html();
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
		private function create_submenu_block( string $label, string $archive_url, array $nav_context ) {
			$submenu_attrs = array(
				'label' => $label,
				'url'   => $archive_url,
				'kind'  => 'post-type-archive',
				'type'  => 'gatherpress_event',
			);

			// Add showSubmenuIcon if false (true is default)
			if ( isset( $nav_context['showSubmenuIcon'] ) && ! $nav_context['showSubmenuIcon'] ) {
				$submenu_attrs['showSubmenuIcon'] = false;
			}

			// Add fontSize from context
			if ( ! empty( $nav_context['fontSize'] ) && is_string( $nav_context['fontSize'] ) ) {
				$submenu_attrs['fontSize'] = $nav_context['fontSize'];
			}

			// Add style object from navigation context
			if ( ! empty( $nav_context['style'] ) && is_array( $nav_context['style'] ) ) {
				$submenu_attrs['style'] = $nav_context['style'];
			}

			// Add custom font size to style
			if ( ! empty( $nav_context['customFontSize'] ) && is_string( $nav_context['customFontSize'] ) ) {
				if ( ! isset( $submenu_attrs['style'] ) ) {
					$submenu_attrs['style'] = array();
				}
				if ( ! isset( $submenu_attrs['style']['typography'] ) ) {
					$submenu_attrs['style']['typography'] = array();
				}
				$submenu_attrs['style']['typography']['fontSize'] = $nav_context['customFontSize'];
			}

			// Add overlay color attributes if present (for the submenu link itself)
			if ( ! empty( $nav_context['overlayTextColor'] ) && is_string( $nav_context['overlayTextColor'] ) ) {
				$submenu_attrs['overlayTextColor'] = $nav_context['overlayTextColor'];
			}
			if ( ! empty( $nav_context['customOverlayTextColor'] ) && is_string( $nav_context['customOverlayTextColor'] ) ) {
				if ( ! isset( $submenu_attrs['style'] ) ) {
					$submenu_attrs['style'] = array();
				}
				if ( ! isset( $submenu_attrs['style']['color'] ) ) {
					$submenu_attrs['style']['color'] = array();
				}
				$submenu_attrs['style']['color']['text'] = $nav_context['customOverlayTextColor'];
			}
			if ( ! empty( $nav_context['overlayBackgroundColor'] ) && is_string( $nav_context['overlayBackgroundColor'] ) ) {
				$submenu_attrs['overlayBackgroundColor'] = $nav_context['overlayBackgroundColor'];
			}
			if ( ! empty( $nav_context['customOverlayBackgroundColor'] ) && is_string( $nav_context['customOverlayBackgroundColor'] ) ) {
				if ( ! isset( $submenu_attrs['style'] ) ) {
					$submenu_attrs['style'] = array();
				}
				if ( ! isset( $submenu_attrs['style']['color'] ) ) {
					$submenu_attrs['style']['color'] = array();
				}
				$submenu_attrs['style']['color']['background'] = $nav_context['customOverlayBackgroundColor'];
			}

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
		 * @param array<string, mixed>           $submenu_block  The submenu block structure.
		 * @param array<int, array<string, mixed>> $terms_data     Array of term data with 'term_id', 'name', and 'count'.
		 * @param string                         $taxonomy_slug  The taxonomy slug.
		 * @param bool                           $show_count     Whether to show event count for term links.
		 * @param array<string, mixed>           $nav_context    Navigation context including colors and styles.
		 * @return array<string, mixed> The modified submenu block.
		 */
		private function add_term_links_to_submenu( array $submenu_block, array $terms_data, string $taxonomy_slug, bool $show_count, array $nav_context ): array {
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

				$term_label = $this->format_label_with_count(
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

				// Add fontSize from context
				if ( ! empty( $nav_context['fontSize'] ) && is_string( $nav_context['fontSize'] ) ) {
					$link_attrs['fontSize'] = $nav_context['fontSize'];
				}

				// Add style object from navigation context
				if ( ! empty( $nav_context['style'] ) && is_array( $nav_context['style'] ) ) {
					$link_attrs['style'] = $nav_context['style'];
				}

				// Add custom font size to style
				if ( ! empty( $nav_context['customFontSize'] ) && is_string( $nav_context['customFontSize'] ) ) {
					if ( ! isset( $link_attrs['style'] ) ) {
						$link_attrs['style'] = array();
					}
					if ( ! isset( $link_attrs['style']['typography'] ) ) {
						$link_attrs['style']['typography'] = array();
					}
					$link_attrs['style']['typography']['fontSize'] = $nav_context['customFontSize'];
				}

				// Add overlay colors to child links (these affect the submenu items)
				if ( ! empty( $nav_context['overlayTextColor'] ) && is_string( $nav_context['overlayTextColor'] ) ) {
					$link_attrs['textColor'] = $nav_context['overlayTextColor'];
				}
				if ( ! empty( $nav_context['customOverlayTextColor'] ) && is_string( $nav_context['customOverlayTextColor'] ) ) {
					if ( ! isset( $link_attrs['style'] ) ) {
						$link_attrs['style'] = array();
					}
					if ( ! isset( $link_attrs['style']['color'] ) ) {
						$link_attrs['style']['color'] = array();
					}
					$link_attrs['style']['color']['text'] = $nav_context['customOverlayTextColor'];
				}
				if ( ! empty( $nav_context['overlayBackgroundColor'] ) && is_string( $nav_context['overlayBackgroundColor'] ) ) {
					$link_attrs['backgroundColor'] = $nav_context['overlayBackgroundColor'];
				}
				if ( ! empty( $nav_context['customOverlayBackgroundColor'] ) && is_string( $nav_context['customOverlayBackgroundColor'] ) ) {
					if ( ! isset( $link_attrs['style'] ) ) {
						$link_attrs['style'] = array();
					}
					if ( ! isset( $link_attrs['style']['color'] ) ) {
						$link_attrs['style']['color'] = array();
					}
					$link_attrs['style']['color']['background'] = $nav_context['customOverlayBackgroundColor'];
				}

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
		 * Renders a simple navigation link pointing to the archive.
		 *
		 * This is used as a fallback when no taxonomy is selected or
		 * when no terms with upcoming events are found.
		 * Leverages core's navigation-link rendering for consistency.
		 *
		 * @since 0.1.0
		 * @param string   $label               The link label.
		 * @param string   $archive_url         The archive URL.
		 * @param bool     $is_disabled         Whether the link should be disabled.
		 * @param int      $event_count         The event count.
		 * @param bool     $show_count          Whether to show event count.
		 * @param string   $wrapper_attributes  Wrapper attributes from get_block_wrapper_attributes().
		 * @param WP_Block $block               Block instance.
		 * @return string The rendered navigation link HTML.
		 */
		private function render_simple_link( string $label, string $archive_url, bool $is_disabled = false, int $event_count = 0, bool $show_count = false, string $wrapper_attributes = '', WP_Block $block = null ): string {
			$formatted_label = $this->format_label_with_count( $label, $event_count, $show_count );
			$nav_context = $this->get_navigation_context( $block );
			$link_block = $this->create_link_block( $formatted_label, $archive_url, $nav_context );

			if ( ! is_array( $link_block ) ) {
				return $this->render_fallback_html( $formatted_label, $archive_url, $is_disabled, $wrapper_attributes );
			}

			// Create a WP_Block instance to properly inherit context
			$link_wp_block = new WP_Block( $link_block, array( 'postId' => get_the_ID() ) );

			// Inherit parent navigation context
			$link_wp_block->context = array_merge( $block->context, $link_wp_block->context );

			// Render using core's rendering system
			$rendered = $link_wp_block->render();

			if ( $is_disabled ) {
				$rendered = $this->add_disabled_attributes( $rendered );
			}

			return $this->apply_wrapper_attributes( $rendered, $wrapper_attributes );
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
		private function create_link_block( string $label, string $archive_url, array $nav_context ) {
			$link_attrs = array(
				'label' => $label,
				'url'   => $archive_url,
				'kind'  => 'post-type-archive',
				'type'  => 'gatherpress_event',
			);

			// Add fontSize from context
			if ( ! empty( $nav_context['fontSize'] ) && is_string( $nav_context['fontSize'] ) ) {
				$link_attrs['fontSize'] = $nav_context['fontSize'];
			}

			// Add style object from navigation context
			if ( ! empty( $nav_context['style'] ) && is_array( $nav_context['style'] ) ) {
				$link_attrs['style'] = $nav_context['style'];
			}

			// Add custom font size to style
			if ( ! empty( $nav_context['customFontSize'] ) && is_string( $nav_context['customFontSize'] ) ) {
				if ( ! isset( $link_attrs['style'] ) ) {
					$link_attrs['style'] = array();
				}
				if ( ! isset( $link_attrs['style']['typography'] ) ) {
					$link_attrs['style']['typography'] = array();
				}
				$link_attrs['style']['typography']['fontSize'] = $nav_context['customFontSize'];
			}

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
		 * Applies wrapper attributes to the rendered HTML.
		 *
		 * Uses the HTML Processor API to merge wrapper attributes
		 * (including theme.json styles and block style classes) into
		 * the rendered output.
		 *
		 * @since 0.1.0
		 * @param string $html                The rendered HTML.
		 * @param string $wrapper_attributes  Wrapper attributes from get_block_wrapper_attributes().
		 * @return string The modified HTML with wrapper attributes applied.
		 */
		private function apply_wrapper_attributes( string $html, string $wrapper_attributes ): string {
			if ( empty( $wrapper_attributes ) ) {
				return $html;
			}

			$processor = new WP_HTML_Tag_Processor( $html );

			if ( $processor->next_tag( array( 'tag_name' => 'li' ) ) ) {
				// Parse wrapper attributes to extract class and style.
				preg_match( '/class="([^"]*)"/', $wrapper_attributes, $class_matches );
				preg_match( '/style="([^"]*)"/', $wrapper_attributes, $style_matches );

				if ( ! empty( $class_matches[1] ) ) {
					$wrapper_classes = explode( ' ', $class_matches[1] );
					foreach ( $wrapper_classes as $class ) {
						if ( ! empty( $class ) ) {
							$processor->add_class( $class );
						}
					}
				}

				if ( ! empty( $style_matches[1] ) ) {
					$existing_style = $processor->get_attribute( 'style' );
					$new_style = $existing_style ? $existing_style . '; ' . $style_matches[1] : $style_matches[1];
					$processor->set_attribute( 'style', $new_style );
				}
			}

			return $processor->get_updated_html();
		}

		/**
		 * Renders fallback HTML when block parsing fails.
		 *
		 * Uses BEM modifier class .gatherpress-magic-menu--disabled
		 *
		 * @since 0.1.0
		 * @param string $label               The link label (may contain HTML).
		 * @param string $archive_url         The archive URL.
		 * @param bool   $is_disabled         Whether the link should be disabled.
		 * @param string $wrapper_attributes  Wrapper attributes from get_block_wrapper_attributes().
		 * @return string The rendered HTML.
		 */
		private function render_fallback_html( string $label, string $archive_url, bool $is_disabled, string $wrapper_attributes = '' ): string {
			$disabled_attr = $is_disabled ? ' aria-disabled="true"' : '';
			$disabled_class = $is_disabled ? ' gatherpress-magic-menu--disabled' : '';

			return sprintf(
				'<li %s class="wp-block-navigation-item wp-block-navigation-link%s"><a class="wp-block-navigation-item__content" href="%s"%s>%s</a></li>',
				$wrapper_attributes,
				esc_attr( $disabled_class ),
				esc_url( $archive_url ),
				$disabled_attr,
				$label
			);
		}

		/**
		 * Adds disabled attributes to the rendered HTML using the HTML Processor API.
		 *
		 * Uses BEM modifier class .gatherpress-magic-menu--disabled
		 *
		 * @since 0.1.0
		 * @param string $html The rendered HTML.
		 * @return string The modified HTML with aria-disabled and class added.
		 */
		private function add_disabled_attributes( string $html ): string {
			$html = $this->add_aria_disabled_to_link( $html );
			$html = $this->add_disabled_class_to_list_item( $html );

			return $html;
		}

		/**
		 * Adds aria-disabled attribute to the anchor tag.
		 *
		 * @since 0.1.0
		 * @param string $html The rendered HTML.
		 * @return string The modified HTML.
		 */
		private function add_aria_disabled_to_link( string $html ): string {
			$processor = new WP_HTML_Tag_Processor( $html );

			if ( $processor->next_tag(
				array(
					'tag_name'   => 'a',
					'class_name' => 'wp-block-navigation-item__content',
				)
			) ) {
				$processor->set_attribute( 'aria-disabled', 'true' );
			}

			return $processor->get_updated_html();
		}

		/**
		 * Adds disabled BEM modifier class to the list item.
		 *
		 * Uses .gatherpress-magic-menu--disabled as the BEM modifier.
		 *
		 * @since 0.1.0
		 * @param string $html The rendered HTML.
		 * @return string The modified HTML.
		 */
		private function add_disabled_class_to_list_item( string $html ): string {
			$processor = new WP_HTML_Tag_Processor( $html );

			if ( $processor->next_tag(
				array(
					'tag_name'   => 'li',
					'class_name' => 'wp-block-navigation-item',
				)
			) ) {
				$processor->add_class( 'gatherpress-magic-menu--disabled' );
			}

			return $processor->get_updated_html();
		}

		/**
		 * Gets the archive URL for GatherPress events.
		 *
		 * Attempts to get the archive link for the gatherpress_event post type.
		 * Falls back to home URL if the post type doesn't exist.
		 *
		 * @since 0.1.0
		 * @return string The archive URL.
		 */
		private function get_events_archive_url(): string {
			$post_type = 'gatherpress_event';

			if ( post_type_exists( $post_type ) ) {
				$archive_url = get_post_type_archive_link( $post_type );

				if ( is_string( $archive_url ) ) {
					return $archive_url;
				}
			}

			return home_url( '/#gatherpress-events' );
		}
	}
}

// Initialize the renderer singleton.
$renderer = GatherPress_Magic_Menu_Renderer::instance();

// Render and output the block.
echo $renderer->render( $attributes, $content, $block );