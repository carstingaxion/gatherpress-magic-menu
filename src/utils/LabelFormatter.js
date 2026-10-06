/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Utility class for formatting labels with event counts.
 *
 * Responsibilities:
 * - Format labels with BEM-style count elements
 * - Handle i18n for count display
 * - Apply block style classes to count elements
 *
 * @since 0.1.0
 */
export class LabelFormatter {
	/**
	 * Formats a label with event count.
	 *
	 * @since 0.1.0
	 * @param {string} label     The base label.
	 * @param {string} className The block className (for style variant).
	 * @param {string} position  Count position, 'after' or 'before' the label.
	 * @return {string} HTML string with formatted count.
	 */
	static formatWithCount( label, className, position = 'after' ) {
		const isBefore = 'before' === position;
		const countSpan = sprintf(
			'<span class="gatherpress-magic-menu__count%1$s %2$s">n</span>',
			isBefore ? ' gatherpress-magic-menu__count--before' : '',
			className || ''
		);

		if ( isBefore ) {
			return sprintf(
				/* translators: 1: label text, 2: event count HTML. The count is placed before the label. */
				__( '%2$s %1$s', 'gatherpress-magic-menu' ),
				label,
				countSpan
			);
		}

		return sprintf(
			/* translators: 1: label text, 2: event count HTML */
			__( '%1$s %2$s', 'gatherpress-magic-menu' ),
			label,
			countSpan
		);
	}
}
