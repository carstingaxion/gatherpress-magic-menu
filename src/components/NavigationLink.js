/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */
import { __, sprintf } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Main navigation link component.
 *
 * Responsibilities:
 * - Render editable label (RichText)
 * - Show event count when enabled
 * - Show submenu icon when needed
 * - Apply navigation context styles
 * - Apply block style classes to count elements
 *
 * @since 0.1.0
 * @param {Object}   props                 Component props.
 * @param {string}   props.effectiveLabel  The current label (user or fallback).
 * @param {string}   props.fallbackLabel   The fallback label from post type.
 * @param {boolean}  props.showEventCount  Show event count flag.
 * @param {boolean}  props.hasSubmenu      Whether block has submenu.
 * @param {boolean}  props.showSubmenuIcon Show submenu icon flag.
 * @param {string}   props.linkClasses     CSS classes for link.
 * @param {Object}   props.linkStyles      Inline styles for link.
 * @param {Function} props.onChangeLabel   Label change handler.
 * @param {string}   props.className       Block className (for style variant).
 * @return {JSX.Element} The navigation link component.
 */
export function NavigationLink( {
	effectiveLabel,
	fallbackLabel,
	showEventCount,
	hasSubmenu,
	showSubmenuIcon,
	linkClasses,
	linkStyles,
	onChangeLabel,
	className,
} ) {
	return (
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
				value={ effectiveLabel }
				onChange={ onChangeLabel }
				placeholder={ fallbackLabel }
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
			{ hasSubmenu && showSubmenuIcon && (
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
	);
}
