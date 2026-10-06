/**
 * Frontend script module for GatherPress Magic Menu block.
 *
 * Blocks navigation on disabled links when there are no upcoming events.
 * The server adds the directives to the link, so this only runs for
 * disabled menu items.
 *
 * @package
 */

/**
 * WordPress dependencies
 */
import { store, withSyncEvent } from '@wordpress/interactivity';

store( 'gatherpress/magic-menu', {
	actions: {
		/**
		 * Prevents navigation when a disabled link is clicked or activated by keyboard.
		 *
		 * @param {Event} event The click event.
		 */
		preventNavigation: withSyncEvent( ( event ) => {
			event.preventDefault();
		} ),
	},
} );
