<?php
/**
 * Class that orchestrates the rendering process.
 *
 * @package GatherPressMagicMenu
 */

namespace GatherPress_Magic_Menu;

use GatherPress\Core;

if ( ! class_exists( 'Renderer' ) ) {
	/**
	 * Singleton class that orchestrates the rendering process.
	 *
	 * Responsibilities:
	 * - Extract and validate block attributes
	 * - Coordinate between cache, builder, formatter, and processor
	 * - Determine rendering strategy (simple link vs submenu)
	 * - Render fallback HTML when needed
	 *
	 * @since 0.1.0
	 */
	class Renderer {

		use Core\Traits\Singleton;

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
		 * @param \WP_Block            $block      Block instance.
		 * @return string The rendered block HTML.
		 */
		public function render( array $attributes, string $content, \WP_Block $block ): string {
			$cache     = Cache::get_instance();
			$formatter = Label_Formatter::get_instance();
			$builder   = Block_Builder::get_instance();
			$processor = HTML_Processor::get_instance();

			$label              = $this->get_label( $attributes, $formatter );
			$taxonomy_slug      = $this->get_taxonomy_slug( $attributes );
			$show_count         = $this->get_show_event_count( $attributes );
			$show_term_count    = $this->get_show_term_event_count( $attributes );
			$archive_url        = $this->get_events_archive_url();
			$wrapper_attributes = get_block_wrapper_attributes();

			$upcoming_event_ids = $cache->get_upcoming_events();
			$total_count        = count( $upcoming_event_ids );

			if ( empty( $upcoming_event_ids ) ) {
				return $this->render_simple_link( $label, $archive_url, true, 0, $show_count, $wrapper_attributes, $block, $formatter, $builder, $processor );
			}

			if ( empty( $taxonomy_slug ) ) {
				return $this->render_simple_link( $label, $archive_url, false, $total_count, $show_count, $wrapper_attributes, $block, $formatter, $builder, $processor );
			}

			$terms_data = $cache->get_terms_with_event_counts( $taxonomy_slug, $upcoming_event_ids );

			if ( empty( $terms_data ) ) {
				return $this->render_simple_link( $label, $archive_url, false, $total_count, $show_count, $wrapper_attributes, $block, $formatter, $builder, $processor );
			}

			return $this->render_submenu( $label, $archive_url, $terms_data, $taxonomy_slug, $total_count, $show_count, $show_term_count, $wrapper_attributes, $block, $formatter, $builder, $processor );
		}

		/**
		 * Extracts the label from attributes with fallback.
		 *
		 * @since 0.1.0
		 * @param array<string, mixed> $attributes Block attributes.
		 * @param Label_Formatter      $formatter  Label formatter instance.
		 * @return string The label text.
		 */
		private function get_label( array $attributes, Label_Formatter $formatter ): string {
			if ( isset( $attributes['label'] ) && is_string( $attributes['label'] ) && ! empty( $attributes['label'] ) ) {
				return $attributes['label'];
			}

			return $formatter->get_fallback_label();
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

		/**
		 * Renders a simple navigation link pointing to the archive.
		 *
		 * This is used as a fallback when no taxonomy is selected or
		 * when no terms with upcoming events are found.
		 * Leverages core's navigation-link rendering for consistency.
		 *
		 * @since 0.1.0
		 * @param string          $label               The link label.
		 * @param string          $archive_url         The archive URL.
		 * @param bool            $is_disabled         Whether the link should be disabled.
		 * @param int             $event_count         The event count.
		 * @param bool            $show_count          Whether to show event count.
		 * @param string          $wrapper_attributes  Wrapper attributes from get_block_wrapper_attributes().
		 * @param \WP_Block       $block               Block instance.
		 * @param Label_Formatter $formatter          Formatter instance.
		 * @param Block_Builder   $builder            Builder instance.
		 * @param HTML_Processor  $processor          Processor instance.
		 * @return string The rendered HTML.
		 */
		private function render_simple_link( string $label, string $archive_url, bool $is_disabled, int $event_count, bool $show_count, string $wrapper_attributes, \WP_Block $block, Label_Formatter $formatter, Block_Builder $builder, HTML_Processor $processor ): string {
			$formatted_label = $formatter->format_label_with_count( $label, $event_count, $show_count );
			$nav_context     = $builder->get_navigation_context( $block );
			$link_block      = $builder->create_link_block( $formatted_label, $archive_url, $nav_context );

			if ( ! is_array( $link_block ) ) {
				return $this->render_fallback_html( $formatted_label, $archive_url, $is_disabled, $wrapper_attributes );
			}

			// Create a WP_Block instance to properly inherit context.
			$link_wp_block = new \WP_Block( $link_block, array( 'postId' => get_the_ID() ) );

			// Inherit parent navigation context.
			$link_wp_block->context = array_merge( $block->context, $link_wp_block->context );

			// Render using core's rendering system.
			$rendered = $link_wp_block->render();

			if ( $is_disabled ) {
				$rendered = $processor->add_disabled_attributes( $rendered );
			}

			return $processor->apply_wrapper_attributes( $rendered, $wrapper_attributes );
		}

		/**
		 * Renders a navigation submenu with term links.
		 *
		 * Uses core's render_block_core_navigation_submenu approach by leveraging
		 * the block rendering system with proper context inheritance.
		 *
		 * @since 0.1.0
		 * @param string                           $label              The submenu label.
		 * @param string                           $archive_url        The archive URL.
		 * @param array<int, array<string, mixed>> $terms_data               Array of term data with 'term_id', 'name', and 'count'.
		 * @param string                           $taxonomy_slug      The taxonomy slug.
		 * @param int                              $total_count        Total count of upcoming events.
		 * @param bool                             $show_count         Whether to show event count for main archive.
		 * @param bool                             $show_term_count    Whether to show event count for term links.
		 * @param string                           $wrapper_attributes Wrapper attributes from get_block_wrapper_attributes().
		 * @param \WP_Block                        $block              Block instance.
		 * @param Label_Formatter                  $formatter          Formatter instance.
		 * @param Block_Builder                    $builder            Builder instance.
		 * @param HTML_Processor                   $processor          Processor instance.
		 * @return string The rendered HTML.
		 */
		private function render_submenu( string $label, string $archive_url, array $terms_data, string $taxonomy_slug, int $total_count, bool $show_count, bool $show_term_count, string $wrapper_attributes, \WP_Block $block, Label_Formatter $formatter, Block_Builder $builder, HTML_Processor $processor ): string {
			$formatted_label = $formatter->format_label_with_count( $label, $total_count, $show_count );
			$nav_context     = $builder->get_navigation_context( $block );
			$submenu_block   = $builder->create_submenu_block( $formatted_label, $archive_url, $nav_context );

			if ( ! is_array( $submenu_block ) ) {
				return $this->render_simple_link( $label, $archive_url, false, $total_count, $show_count, $wrapper_attributes, $block, $formatter, $builder, $processor );
			}

			// Ensure innerBlocks array exists.
			if ( ! isset( $submenu_block['innerBlocks'] ) ) {
				$submenu_block['innerBlocks'] = array();
			}

			// Add term links.
			$submenu_block = $builder->add_term_links_to_submenu( $submenu_block, $terms_data, $taxonomy_slug, $show_term_count, $nav_context );

			// Create a WP_Block instance to properly inherit context.
			$submenu_wp_block = new \WP_Block( $submenu_block, array( 'postId' => get_the_ID() ) );

			// Inherit parent navigation context.
			$submenu_wp_block->context = array_merge( $block->context, $submenu_wp_block->context );

			// Apply core's color support to the submenu attributes (for the container).
			$rendered = $submenu_wp_block->render();

			// Apply container colors to the <ul> element.
			if ( ! empty( $submenu_container_attributes ) ) {
				$rendered = $processor->apply_container_attributes_to_ul( $rendered, $submenu_container_attributes );
			}

			$interaction_classes = $processor->get_submenu_interaction_classes( $nav_context );
			if ( ! empty( $interaction_classes ) ) {
				$rendered = $processor->apply_interaction_classes_to_li( $rendered, $interaction_classes );
			}

			return $processor->apply_wrapper_attributes( $rendered, $wrapper_attributes );
		}

		/**
		 * Renders fallback HTML when block parsing fails.
		 *
		 * @since 0.1.0
		 * @param string $label               The link label (may contain HTML).
		 * @param string $archive_url         The archive URL.
		 * @param bool   $is_disabled         Whether the link should be disabled.
		 * @param string $wrapper_attributes  Wrapper attributes from get_block_wrapper_attributes().
		 * @return string The rendered HTML.
		 */
		private function render_fallback_html( string $label, string $archive_url, bool $is_disabled, string $wrapper_attributes = '' ): string {
			$disabled_attr  = $is_disabled ? ' aria-disabled="true"' : '';
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
	}
}
