/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { sprintf } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Custom hook to extract and process navigation context from parent blocks.
 *
 * Responsibilities:
 * - Extract color values (text, background, overlay)
 * - Extract typography settings
 * - Extract navigation-specific flags (showSubmenuIcon, etc.)
 * - Build inline styles from context
 * - Build CSS class names from context
 *
 * @since 0.1.0
 * @param {Object} context Block context from parent navigation.
 * @return {Object} Processed navigation context with styles and classes.
 */
export function useNavigationContext( context ) {
	const {
		textColor,
		customTextColor,
		backgroundColor,
		customBackgroundColor,
		overlayTextColor,
		customOverlayTextColor,
		overlayBackgroundColor,
		customOverlayBackgroundColor,
		showSubmenuIcon,
	} = context;

	/**
	 * Build inline styles for the main link.
	 * Only apply main link colors (not overlay colors).
	 */
	const linkStyles = useMemo( () => {
		const styles = {};

		if ( customTextColor ) {
			styles.color = customTextColor;
		}

		if ( customBackgroundColor ) {
			styles.backgroundColor = customBackgroundColor;
		}

		if ( Object.keys( styles ).length > 0 ) {
			return styles;
		}
		return undefined;
	}, [ customTextColor, customBackgroundColor ] );

	/**
	 * Build overlay styles for submenu preview.
	 * These apply to term links in the submenu.
	 */
	const overlayStyles = useMemo( () => {
		const styles = {};

		if ( customOverlayTextColor ) {
			styles.color = customOverlayTextColor;
		}

		if ( customOverlayBackgroundColor ) {
			styles.backgroundColor = customOverlayBackgroundColor;
		}

		if ( Object.keys( styles ).length > 0 ) {
			return styles;
		}
		return undefined;
	}, [ customOverlayTextColor, customOverlayBackgroundColor ] );

	/**
	 * Build class names from navigation context.
	 */
	const linkClasses = useMemo( () => {
		const classes = [ 'wp-block-navigation-item__content' ];

		if ( textColor ) {
			classes.push( sprintf( 'has-%s-color', textColor ) );
			classes.push( 'has-text-color' );
		}

		if ( backgroundColor ) {
			classes.push(
				sprintf( 'has-%s-background-color', backgroundColor )
			);
			classes.push( 'has-background' );
		}

		return classes.join( ' ' );
	}, [ textColor, backgroundColor ] );

	/**
	 * Build overlay class names for submenu preview.
	 */
	const overlayClasses = useMemo( () => {
		const classes = [ 'wp-block-navigation-item__content' ];

		if ( overlayTextColor ) {
			classes.push( sprintf( 'has-%s-color', overlayTextColor ) );
			classes.push( 'has-text-color' );
		}

		if ( overlayBackgroundColor ) {
			classes.push(
				sprintf( 'has-%s-background-color', overlayBackgroundColor )
			);
			classes.push( 'has-background' );
		}

		return classes.join( ' ' );
	}, [ overlayTextColor, overlayBackgroundColor ] );

	return {
		linkStyles,
		overlayStyles,
		linkClasses,
		overlayClasses,
		showSubmenuIcon,
	};
}
