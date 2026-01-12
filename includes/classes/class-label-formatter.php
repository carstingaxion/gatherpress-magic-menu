<?php
/**
 * Class for formatting labels with event counts.
 *
 * @package GatherPressMagicMenu
 */

namespace GatherPress_Magic_Menu;

use GatherPress\Core;

if ( ! class_exists( 'Label_Formatter' ) ) {
	/**
	 * Singleton class for formatting labels with event counts.
	 *
	 * Responsibilities:
	 * - Format labels with BEM-style count elements
	 * - Handle i18n for count display
	 * - Get fallback labels from post type
	 *
	 * @since 0.1.0
	 */
	class Label_Formatter {

		use Core\Traits\Singleton;

		/**
		 * Private constructor to prevent direct instantiation.
		 *
		 * @since 0.1.0
		 */
		private function __construct() {}

		/**
		 * Gets the fallback label from the post type.
		 *
		 * @since 0.1.0
		 * @return string The fallback label from post type plural label.
		 */
		public function get_fallback_label(): string {
			$post_type_object = get_post_type_object( 'gatherpress_event' );

			if ( $post_type_object && isset( $post_type_object->labels->name ) ) {
				return $post_type_object->labels->name;
			}

			return __( 'Events', 'gatherpress-magic-menu' );
		}

		/**
		 * Formats a label with event count using BEM element class.
		 *
		 * Uses .gatherpress-magic-menu__count as the BEM element class.
		 * Makes the count translatable using WordPress's sprintf and translation functions.
		 * Allows translators to control the position of the count relative to the label.
		 *
		 * @since 0.1.0
		 * @param string $label      The base label.
		 * @param int    $count      The event count.
		 * @param bool   $show_count Whether to show the count.
		 * @return string The formatted label HTML.
		 */
		public function format_label_with_count( string $label, int $count, bool $show_count ): string {
			if ( ! $show_count ) {
				return esc_html( $label );
			}

			$count_html = sprintf(
				'<span class="gatherpress-magic-menu__count">%d</span>',
				(int) $count
			);

			// Translatable format string that allows repositioning count and label.
			return sprintf(
				/* translators: 1: label text, 2: event count HTML */
				__( '%1$s %2$s', 'gatherpress-magic-menu' ),
				esc_html( $label ),
				$count_html
			);
		}
	}
}
