/**
 * Frontend JavaScript for GatherPress Magic Menu block.
 *
 * Handles click prevention for disabled navigation links
 * when there are no upcoming events.
 *
 * Uses BEM class naming: .gatherpress-magic-menu--disabled
 *
 * @package
 */

( function () {
	'use strict';

	/**
	 * Prevents navigation when clicking on disabled links.
	 *
	 * @param {Event} event The click event.
	 */
	function handleDisabledClick( event ) {
		const link = event.currentTarget;

		if ( link.getAttribute( 'aria-disabled' ) === 'true' ) {
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	}

	/**
	 * Initialize event listeners for disabled links.
	 * Uses BEM modifier class: .gatherpress-magic-menu--disabled
	 */
	function init() {
		// Find all navigation links with aria-disabled="true" within disabled blocks.
		const disabledLinks = document.querySelectorAll(
			'.gatherpress-magic-menu--disabled a[aria-disabled="true"]'
		);

		// Attach click handlers to prevent navigation.
		disabledLinks.forEach( function ( link ) {
			link.addEventListener( 'click', handleDisabledClick, true );
		} );
	}

	// Initialize when DOM is ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
