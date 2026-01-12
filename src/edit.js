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
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { sprintf } from '@wordpress/i18n';

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
 * @param {Object}   props                                Component props.
 * @param {Object}   props.attributes                     Block attributes.
 * @param {string}   props.attributes.label               The label text for the navigation link.
 * @param {string}   props.attributes.gatherpressTaxonomy The selected taxonomy slug.
 * @param {boolean}  props.attributes.showEventCount      Whether to show event count.
 * @param {boolean}  props.attributes.showTermEventCount  Whether to show event count for term links.
 * @param {Object}   props.context                        Block context from parent blocks.
 * @param {string}   props.className                      The block's className (includes block style).
 * @param {Function} props.setAttributes                  Function to update block attributes.
 * @return {Element} Element to render.
 */
export default function Edit( {
	attributes,
	context,
	setAttributes,
	className,
} ) {
	const { label, gatherpressTaxonomy, showEventCount, showTermEventCount } =
		attributes;

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
		overlayTextColor,
		customOverlayTextColor,
		overlayBackgroundColor,
		customOverlayBackgroundColor,
		showSubmenuIcon,
	} = context;

	/**
	 * Fetch taxonomies registered with the gatherpress_event post type.
	 */
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

		if ( Object.keys( styles ).length > 0 ) {
			return styles;
		}
		return undefined;
	}, [ customTextColor, customBackgroundColor ] );

	/**
	 * Build overlay styles for submenu preview.
	 * These are the styles that would apply to term links in the submenu.
	 */
	const overlayStyles = useMemo( () => {
		const styles = {};

		// Apply overlay text color from context
		if ( customOverlayTextColor ) {
			styles.color = customOverlayTextColor;
		}

		// Apply overlay background color from context
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

		// Add text color class if present
		if ( textColor ) {
			classes.push( sprintf( 'has-%s-color', textColor ) );
			classes.push( 'has-text-color' );
		}

		// Add background color class if present
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

		// Add overlay text color class if present
		if ( overlayTextColor ) {
			classes.push( sprintf( 'has-%s-color', overlayTextColor ) );
			classes.push( 'has-text-color' );
		}

		// Add overlay background color class if present
		if ( overlayBackgroundColor ) {
			classes.push(
				sprintf( 'has-%s-background-color', overlayBackgroundColor )
			);
			classes.push( 'has-background' );
		}

		return classes.join( ' ' );
	}, [ overlayTextColor, overlayBackgroundColor ] );

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
		taxonomyOptions.push( ...mappedTaxonomies );
	}

	const blockProps = useBlockProps( {
		className: gatherpressTaxonomy
			? 'wp-block-navigation-item wp-block-navigation-submenu has-child open-on-hover-click'
			: 'wp-block-navigation-item wp-block-navigation-link',
	} );

	/**
	 * Build the event count element with proper i18n using sprintf.
	 * Allows translators to control the position of count and label.
	 */
	let labelWithCount = getEffectiveLabel();
	if ( showEventCount ) {
		const countSpan =
			'<span class="gatherpress-magic-menu__count">n</span>';

		// Translatable format string that allows repositioning count and label
		labelWithCount = sprintf(
			/* translators: 1: label text, 2: event count HTML */
			__( '%1$s %2$s', 'gatherpress-magic-menu' ),
			getEffectiveLabel(),
			countSpan
		);
	}

	/**
	 * Renders the placeholder submenu when a taxonomy is selected.
	 */
	const renderSubmenuPlaceholder = () => {
		if ( ! gatherpressTaxonomy ) {
			return null;
		}

		// Example term names for placeholder
		const exampleTerms = [
			__( 'Example Term 1', 'gatherpress-magic-menu' ),
			__( 'Example Term 2', 'gatherpress-magic-menu' ),
		];

		return (
			<ul className="wp-block-navigation__submenu-container">
				{ exampleTerms.map( ( termName, index ) => {
					let termLabelContent = termName;

					if ( showTermEventCount ) {
						// Build term label with count using sprintf for i18n
						const termCountSpan = sprintf(
							'<span class="gatherpress-magic-menu__count %s">n</span>',
							className || ''
						);

						termLabelContent = sprintf(
							/* translators: 1: term name, 2: event count HTML */
							__( '%1$s %2$s', 'gatherpress-magic-menu' ),
							termName,
							termCountSpan
						);
					}

					return (
						<li
							key={ index }
							className="wp-block-navigation-item wp-block-navigation-link"
						>
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
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'GatherPress Settings',
						'gatherpress-magic-menu'
					) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __(
							'Filter by Taxonomy',
							'gatherpress-magic-menu'
						) }
						value={ gatherpressTaxonomy }
						options={ taxonomyOptions }
						onChange={ onChangeTaxonomy }
						help={ __(
							'Select a taxonomy to filter events, or leave as "All Events" for the main archive.',
							'gatherpress-magic-menu'
						) }
					/>
					<ToggleControl
						label={ __(
							'Show Event Count',
							'gatherpress-magic-menu'
						) }
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
						value={ getEffectiveLabel() }
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
						<span
							className={ sprintf(
								'gatherpress-magic-menu__count %s',
								className || ''
							) }
							dangerouslySetInnerHTML={ {
								__html: 'n',
							} }
						/>
					) }
					{ gatherpressTaxonomy && showSubmenuIcon && (
						<span
							className="wp-block-navigation__submenu-icon"
							aria-hidden="true"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								role="img"
								aria-hidden="true"
								focusable="false"
							>
								<path
									d="M1.50002 4L6.00002 8L10.5 4"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
								/>
							</svg>
						</span>
					) }
				</a>
				{ renderSubmenuPlaceholder() }
			</li>
		</>
	);
}
