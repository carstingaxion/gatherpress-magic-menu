/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Custom hook to get all post types that GatherPress treats as events.
 *
 * Responsibilities:
 * - Query all post types
 * - Keep the ones with 'gatherpress-event-date' support
 * - Fall back to gatherpress_event for GatherPress versions without the support
 *
 * @since 0.1.0
 * @return {Array} Array of post type objects.
 */
export function useEventPostTypes() {
	return useSelect( ( select ) => {
		const { getPostTypes, getPostType } = select( coreStore );
		const postTypes = getPostTypes( { per_page: -1 } ) || [];

		const eventPostTypes = postTypes.filter(
			( postType ) => postType.supports?.[ 'gatherpress-event-date' ]
		);

		if ( eventPostTypes.length ) {
			return eventPostTypes;
		}

		// Older GatherPress versions do not declare the support yet.
		const legacyPostType = getPostType( 'gatherpress_event' );
		return legacyPostType ? [ legacyPostType ] : [];
	}, [] );
}
