/**
 * Editor component for the GatherPress Magic Menu block.
 *
 * @package
 * @since 0.1.0
 */

if ( typeof window === 'undefined' ) {
	throw new Error(
		'This file should only be loaded in a browser environment'
	);
}

/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

/**
 * ============================================================================
 * IMPORTS
 * Internal dependencies
 * ============================================================================
 */
import './editor.scss';

import { useNavigationContext } from './hooks/useNavigationContext';
import { useTaxonomies } from './hooks/useTaxonomies';
import { usePostTypeLabel } from './hooks/usePostTypeLabel';

import { InspectorPanel } from './components/InspectorPanel';
import { SubmenuPlaceholder } from './components/SubmenuPlaceholder';
import { NavigationLink } from './components/NavigationLink';

/**
 * Main edit component that orchestrates all sub-components.
 *
 * Responsibilities:
 * - Coordinate between all hooks and components
 * - Manage block attributes
 * - Determine block structure (link vs submenu)
 * - Apply block wrapper props
 *
 * @since 0.1.0
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to update block attributes.
 * @param {string}   props.clientId      Block client ID.
 * @param {Object}   props.context       Context from parent blocks.
 * @param {string}   props.className     The block's className.
 * @return {JSX.Element} Element to render.
 */
export default function Edit( {
	attributes,
	context,
	setAttributes,
	clientId,
	className,
} ) {
	const { label, gatherpressTaxonomy, showEventCount, showTermEventCount } =
		attributes;

	/**
	 * Extract navigation context and styling.
	 */
	const {
		linkStyles,
		overlayStyles,
		linkClasses,
		overlayClasses,
		showSubmenuIcon,
	} = useNavigationContext( context );

	/**
	 * Fetch taxonomies for selector.
	 */
	const taxonomyOptions = useTaxonomies();

	/**
	 * Get fallback label from post type.
	 */
	const fallbackLabel = usePostTypeLabel();

	/**
	 * Get the effective label (user-provided or fallback).
	 */
	const effectiveLabel = label || fallbackLabel;

	/**
	 * Determine if block has submenu.
	 */
	const hasSubmenu = Boolean( gatherpressTaxonomy );

	/**
	 * Handle label changes.
	 * Only save the label if it differs from the fallback.
	 * This allows i18n to work properly when the label is not explicitly set.
	 */
	const onChangeLabel = ( newLabel ) => {
		let labelToSave = newLabel;

		if ( newLabel === fallbackLabel ) {
			labelToSave = undefined;
		}

		if ( ! newLabel || newLabel.trim() === '' ) {
			labelToSave = undefined;
		}

		setAttributes( { label: labelToSave } );
	};

	const onChangeTaxonomy = ( newTaxonomy ) => {
		setAttributes( { gatherpressTaxonomy: newTaxonomy } );
	};

	const onChangeShowEventCount = ( newValue ) => {
		setAttributes( { showEventCount: newValue } );
	};

	const onChangeShowTermEventCount = ( newValue ) => {
		setAttributes( { showTermEventCount: newValue } );
	};

	/**
	 * Build block wrapper props.
	 */
	const blockProps = useBlockProps( {
		className: hasSubmenu
			? 'wp-block-navigation-item wp-block-navigation-submenu has-child open-on-hover-click'
			: 'wp-block-navigation-item wp-block-navigation-link',
	} );

	/**
	 * Update block name with link text.
	 * Use a ref to track the previous label to prevent unnecessary updates.
	 */
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const previousLabelRef = useRef( effectiveLabel );
	useEffect( () => {
		if ( ! effectiveLabel || ! clientId ) {
			return;
		}

		if ( previousLabelRef.current !== effectiveLabel ) {
			previousLabelRef.current = effectiveLabel;
			updateBlockAttributes( clientId, {
				metadata: {
					name: effectiveLabel,
				},
			} );
		}
	}, [ effectiveLabel, clientId, updateBlockAttributes ] );

	return (
		<>
			<InspectorPanel
				gatherpressTaxonomy={ gatherpressTaxonomy }
				showEventCount={ showEventCount }
				showTermEventCount={ showTermEventCount }
				taxonomyOptions={ taxonomyOptions }
				onChangeTaxonomy={ onChangeTaxonomy }
				onChangeShowEventCount={ onChangeShowEventCount }
				onChangeShowTermEventCount={ onChangeShowTermEventCount }
			/>
			<li { ...blockProps }>
				<NavigationLink
					effectiveLabel={ effectiveLabel }
					fallbackLabel={ fallbackLabel }
					showEventCount={ showEventCount }
					hasSubmenu={ hasSubmenu }
					showSubmenuIcon={ showSubmenuIcon }
					linkClasses={ linkClasses }
					linkStyles={ linkStyles }
					onChangeLabel={ onChangeLabel }
					className={ className }
				/>
				{ hasSubmenu && (
					<SubmenuPlaceholder
						showTermEventCount={ showTermEventCount }
						overlayClasses={ overlayClasses }
						overlayStyles={ overlayStyles }
						className={ className }
					/>
				) }
			</li>
		</>
	);
}
