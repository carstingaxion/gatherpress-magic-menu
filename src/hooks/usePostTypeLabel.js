/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';

/**
 * Custom hook to get the plural label for gatherpress_event post type.
 *
 * Responsibilities:
 * - Fetch post type object
 * - Extract plural label
 * - Provide fallback if not available
 *
 * @since 0.1.0
 * @return {string} The post type plural label or fallback.
 */
export function usePostTypeLabel() {
	const postType = useSelect( ( select ) => {
		const { getPostType } = select( coreStore );
		return getPostType( 'gatherpress_event' );
	}, [] );

	const fallbackLabel = useMemo( () => {
		if ( postType && postType.labels && postType.labels.name ) {
			return postType.labels.name;
		}
		return __( 'Events', 'gatherpress-magic-menu' );
	}, [ postType ] );

	return fallbackLabel;
}
