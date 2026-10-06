/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * ============================================================================
 * IMPORTS
 * Internal dependencies
 * ============================================================================
 */
import { useEventPostTypes } from './useEventPostTypes';

/**
 * Custom hook to get the plural label for the primary event post type.
 *
 * Responsibilities:
 * - Pick the primary event post type (gatherpress_event first)
 * - Extract plural label
 * - Provide fallback if not available
 *
 * @since 0.1.0
 * @return {string} The post type plural label or fallback.
 */
export function usePostTypeLabel() {
	const eventPostTypes = useEventPostTypes();
	const postType =
		eventPostTypes.find(
			( eventPostType ) => eventPostType.slug === 'gatherpress_event'
		) || eventPostTypes[ 0 ];

	const fallbackLabel = useMemo( () => {
		if ( postType && postType.labels && postType.labels.name ) {
			return postType.labels.name;
		}
		return __( 'Events', 'gatherpress-magic-menu' );
	}, [ postType ] );

	return fallbackLabel;
}
