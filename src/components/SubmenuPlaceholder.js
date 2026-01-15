/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { __ } from '@wordpress/i18n';

/**
 * ============================================================================
 * IMPORTS
 * Internal dependencies
 * ============================================================================
 */
import { LabelFormatter } from '../utils/LabelFormatter';

/**
 * Placeholder submenu component for editor preview.
 *
 * Responsibilities:
 * - Render example term links
 * - Apply overlay styles from navigation context
 * - Show/hide event counts based on settings
 * - Apply block style classes to count elements
 *
 * @since 0.1.0
 * @param {Object}  props                    Component props.
 * @param {boolean} props.showTermEventCount Show term event count flag.
 * @param {string}  props.overlayClasses     CSS classes for overlay styling.
 * @param {Object}  props.overlayStyles      Inline styles for overlay.
 * @param {string}  props.className          Block className (for style variant).
 * @return {JSX.Element|null} The submenu placeholder or null.
 */
export function SubmenuPlaceholder( {
	showTermEventCount,
	overlayClasses,
	overlayStyles,
	className,
} ) {
	const exampleTerms = [
		__( 'Example Term 1', 'gatherpress-magic-menu' ),
		__( 'Sample Term 2', 'gatherpress-magic-menu' ),
	];

	return (
		<ul className="wp-block-navigation__submenu-container">
			{ exampleTerms.map( ( termName, index ) => {
				let termLabelContent;

				if ( showTermEventCount ) {
					termLabelContent = LabelFormatter.formatWithCount(
						termName,
						className
					);
				} else {
					termLabelContent = termName;
				}

				return (
					<li
						key={ index }
						className="wp-block-navigation-item wp-block-navigation-link"
					>
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a
							className={ overlayClasses }
							style={ overlayStyles }
							href="#"
						>
							<span
								className="wp-block-navigation-item__label"
								dangerouslySetInnerHTML={ {
									__html: termLabelContent,
								} }
							/>
						</a>
					</li>
				);
			} ) }
		</ul>
	);
}
