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
 * Custom hook to fetch taxonomies registered with gatherpress_event.
 *
 * Responsibilities:
 * - Query all taxonomies
 * - Filter to only gatherpress_event taxonomies
 * - Format as options for SelectControl
 *
 * @since 0.1.0
 * @return {Array} Array of taxonomy options for SelectControl.
 */
export function useTaxonomies() {
	const taxonomies = useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];

		// Filter to only include taxonomies associated with gatherpress_event
		return allTaxonomies.filter( ( taxonomy ) => {
			return (
				taxonomy.types && taxonomy.types.includes( 'gatherpress_event' )
			);
		} );
	}, [] );

	const taxonomyOptions = useMemo( () => {
		const options = [
			{ label: __( 'None', 'gatherpress-magic-menu' ), value: '' },
		];

		if ( taxonomies ) {
			const mappedTaxonomies = taxonomies.map( ( taxonomy ) => {
				let taxonomyLabel = taxonomy.slug;
				if ( taxonomy.name ) {
					taxonomyLabel = taxonomy.name;
				}
				return {
					label: taxonomyLabel,
					value: taxonomy.slug,
				};
			} );
			options.push( ...mappedTaxonomies );
		}

		return options;
	}, [ taxonomies ] );

	return taxonomyOptions;
}
