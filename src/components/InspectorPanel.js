/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

/**
 * Settings panel component for the block inspector.
 *
 * Responsibilities:
 * - Render taxonomy selector
 * - Render event count toggles
 * - Handle attribute updates
 * - Show/hide controls based on context
 *
 * @since 0.1.0
 * @param {Object}   props                            Component props.
 * @param {string}   props.gatherpressTaxonomy        Selected taxonomy slug.
 * @param {boolean}  props.showEventCount             Show event count flag.
 * @param {boolean}  props.showTermEventCount         Show term event count flag.
 * @param {Array}    props.taxonomyOptions            Available taxonomy options.
 * @param {Function} props.onChangeTaxonomy           Taxonomy change handler.
 * @param {Function} props.onChangeShowEventCount     Event count toggle handler.
 * @param {Function} props.onChangeShowTermEventCount Term count toggle handler.
 * @return {JSX.Element} The inspector panel component.
 */
export function InspectorPanel( {
	gatherpressTaxonomy,
	showEventCount,
	showTermEventCount,
	taxonomyOptions,
	onChangeTaxonomy,
	onChangeShowEventCount,
	onChangeShowTermEventCount,
} ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Magic Settings' ) } initialOpen={ true }>
				<SelectControl
					label={ __(
						'Select Taxonomy for Submenu',
						'gatherpress-magic-menu'
					) }
					value={ gatherpressTaxonomy }
					options={ taxonomyOptions }
					onChange={ onChangeTaxonomy }
					help={ __(
						'Select a taxonomy to show its terms, of upcoming events only, as an auto-generated submenu. Or leave as "None" to not create a submenu.',
						'gatherpress-magic-menu'
					) }
				/>
				<ToggleControl
					label={ __( 'Show Event Count', 'gatherpress-magic-menu' ) }
					checked={ showEventCount }
					onChange={ onChangeShowEventCount }
					help={ __(
						'Display the number of upcoming events next to the main archive label.',
						'gatherpress-magic-menu'
					) }
				/>
				{ gatherpressTaxonomy && (
					<ToggleControl
						label={ __(
							'Show Term Event Count',
							'gatherpress-magic-menu'
						) }
						checked={ showTermEventCount }
						onChange={ onChangeShowTermEventCount }
						help={ __(
							'Display the number of upcoming events next to each term link.',
							'gatherpress-magic-menu'
						) }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
