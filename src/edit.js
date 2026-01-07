/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {string}   props.attributes.label The label text for the navigation link.
 * @param {string}   props.attributes.gatherpressTaxonomy The selected taxonomy slug.
 * @param {boolean}  props.attributes.showEventCount Whether to show event count.
 * @param {boolean}  props.attributes.showTermEventCount Whether to show event count for term links.
 * @param {Object}   props.context       Block context from parent blocks.
 * @param {string}   props.className     The block's className (includes block style).
 * @param {Function} props.setAttributes Function to update block attributes.
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, context, setAttributes, className } ) {
	const { label, gatherpressTaxonomy, showEventCount, showTermEventCount } = attributes;

	/**
	 * Extract colors from navigation context.
	 * Main link uses textColor/backgroundColor
	 * Overlay colors are for submenu dropdowns (not applicable to main link)
	 */
	const {
		textColor,
		customTextColor,
		backgroundColor,
		customBackgroundColor,
	} = context;

	/**
	 * Fetch taxonomies registered with the gatherpress_event post type.
	 */
	const taxonomies = useSelect( ( select ) => {
		const { getTaxonomies } = select( coreStore );
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		
		// Filter to only include taxonomies associated with gatherpress_event
		return allTaxonomies.filter( ( taxonomy ) => {
			return taxonomy.types && taxonomy.types.includes( 'gatherpress_event' );
		} );
	}, [] );

	/**
	 * Fetch the gatherpress_event post type to get its plural label.
	 */
	const postType = useSelect( ( select ) => {
		const { getPostType } = select( coreStore );
		return getPostType( 'gatherpress_event' );
	}, [] );

	/**
	 * Get the fallback label from post type plural label.
	 */
	const getFallbackLabel = () => {
		if ( postType && postType.labels && postType.labels.name ) {
			return postType.labels.name;
		}
		return __( 'Events', 'gatherpress-magic-menu' );
	};

	/**
	 * Get the effective label (user-provided or fallback).
	 */
	const getEffectiveLabel = () => {
		return label || getFallbackLabel();
	};

	/**
	 * Build inline styles from navigation context colors.
	 * Only apply main link colors (not overlay colors).
	 */
	const linkStyles = useMemo( () => {
		const styles = {};

		// Apply text color from context
		if ( customTextColor ) {
			styles.color = customTextColor;
		}

		// Apply background color from context
		if ( customBackgroundColor ) {
			styles.backgroundColor = customBackgroundColor;
		}

		return Object.keys( styles ).length > 0 ? styles : undefined;
	}, [ customTextColor, customBackgroundColor ] );

	/**
	 * Build class names from navigation context.
	 */
	const linkClasses = useMemo( () => {
		const classes = [ 'wp-block-navigation-item__content' ];

		// Add text color class if present
		if ( textColor ) {
			classes.push( `has-${ textColor }-color` );
			classes.push( 'has-text-color' );
		}

		// Add background color class if present
		if ( backgroundColor ) {
			classes.push( `has-${ backgroundColor }-background-color` );
			classes.push( 'has-background' );
		}

		return classes.join( ' ' );
	}, [ textColor, backgroundColor ] );

	/**
	 * Handles changes to the label text.
	 *
	 * @param {string} newLabel The new label text.
	 * @return {void}
	 */
	const onChangeLabel = ( newLabel ) => {
		setAttributes( { label: newLabel } );
	};

	/**
	 * Handles changes to the taxonomy selection.
	 *
	 * @param {string} newTaxonomy The selected taxonomy slug.
	 * @return {void}
	 */
	const onChangeTaxonomy = ( newTaxonomy ) => {
		setAttributes( { gatherpressTaxonomy: newTaxonomy } );
	};

	/**
	 * Handles changes to the event count toggle.
	 *
	 * @param {boolean} newValue The new toggle value.
	 * @return {void}
	 */
	const onChangeShowEventCount = ( newValue ) => {
		setAttributes( { showEventCount: newValue } );
	};

	/**
	 * Handles changes to the term event count toggle.
	 *
	 * @param {boolean} newValue The new toggle value.
	 * @return {void}
	 */
	const onChangeShowTermEventCount = ( newValue ) => {
		setAttributes( { showTermEventCount: newValue } );
	};

	/**
	 * Prepare taxonomy options for the SelectControl.
	 */
	const taxonomyOptions = [
		{ label: __( 'All Events', 'gatherpress-magic-menu' ), value: '' },
		...( taxonomies || [] ).map( ( taxonomy ) => ( {
			label: taxonomy.name || taxonomy.slug,
			value: taxonomy.slug,
		} ) ),
	];

	/**
	 * Build the display label with optional count.
	 */
	const buildDisplayLabel = () => {
		let displayLabel = getEffectiveLabel();

		if ( showEventCount ) {
			displayLabel += ' ';
		}

		return displayLabel;
	};

	const blockProps = useBlockProps( {
		className: 'wp-block-navigation-item wp-block-navigation-link',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'GatherPress Settings', 'gatherpress-magic-menu' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Filter by Taxonomy', 'gatherpress-magic-menu' ) }
						value={ gatherpressTaxonomy }
						options={ taxonomyOptions }
						onChange={ onChangeTaxonomy }
						help={ __(
							'Select a taxonomy to filter events, or leave as "All Events" for the main archive.',
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
							label={ __( 'Show Term Event Count', 'gatherpress-magic-menu' ) }
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
			<li { ...blockProps }>
				<a
					className={ linkClasses }
					style={ linkStyles }
					href="#gatherpress-events-archive"
					aria-label={ __(
						'Link to GatherPress Events Archive',
						'gatherpress-magic-menu'
					) }
				>
					<RichText
						identifier="label"
						className="wp-block-navigation-item__label"
						value={ buildDisplayLabel() }
						onChange={ onChangeLabel }
						placeholder={ getFallbackLabel() }
						withoutInteractiveFormatting
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						] }
						aria-label={ __(
							'Navigation link text',
							'gatherpress-magic-menu'
						) }
					/>
					{ showEventCount && (
						<span className={ `gatherpress-magic-menu__count ${ className || '' }` }>
							n
						</span>
					) }
				</a>
			</li>
		</>
	);
}