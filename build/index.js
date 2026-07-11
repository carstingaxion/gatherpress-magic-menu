/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gatherpress/magic-menu","version":"0.1.0","title":"GatherPress Magic Menu","category":"gatherpress","icon":"calendar-alt","description":"A navigation block that creates a dynamic GatherPress menu, with taxonomy-based submenus and upcoming event counters.","keywords":["navigation","gatherpress","events","menu","link"],"parent":["core/navigation"],"attributes":{"label":{"type":"string"},"gatherpressTaxonomy":{"type":"string","default":""},"showEventCount":{"type":"boolean","default":false},"showTermEventCount":{"type":"boolean","default":false}},"usesContext":["textColor","customTextColor","backgroundColor","customBackgroundColor","overlayTextColor","customOverlayTextColor","overlayBackgroundColor","customOverlayBackgroundColor","fontSize","customFontSize","showSubmenuIcon","openSubmenusOnClick","style"],"example":{"attributes":{"label":"Events"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"badge","label":"Badge"},{"name":"starburst","label":"Starburst"}],"supports":{"html":false,"reusable":true,"color":{"text":false,"background":false,"link":false},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"spacing":{"margin":true,"padding":true,"__experimentalDefaultControls":{"margin":false,"padding":false}}},"textdomain":"gatherpress-magic-menu","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ },

/***/ "./src/components/InspectorPanel.js"
/*!******************************************!*\
  !*** ./src/components/InspectorPanel.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InspectorPanel: () => (/* binding */ InspectorPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */




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

function InspectorPanel({
  gatherpressTaxonomy,
  showEventCount,
  showTermEventCount,
  taxonomyOptions,
  onChangeTaxonomy,
  onChangeShowEventCount,
  onChangeShowTermEventCount
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Magic Settings'),
      initialOpen: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select Taxonomy for Submenu', 'gatherpress-magic-menu'),
        value: gatherpressTaxonomy,
        options: taxonomyOptions,
        onChange: onChangeTaxonomy,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a taxonomy to show its terms, of upcoming events only, as an auto-generated submenu. Or leave as "None" to not create a submenu.', 'gatherpress-magic-menu')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Event Count', 'gatherpress-magic-menu'),
        checked: showEventCount,
        onChange: onChangeShowEventCount,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display the number of upcoming events next to the main archive label.', 'gatherpress-magic-menu')
      }), gatherpressTaxonomy && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Term Event Count', 'gatherpress-magic-menu'),
        checked: showTermEventCount,
        onChange: onChangeShowTermEventCount,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display the number of upcoming events next to each term link.', 'gatherpress-magic-menu')
      })]
    })
  });
}

/***/ },

/***/ "./src/components/NavigationLink.js"
/*!******************************************!*\
  !*** ./src/components/NavigationLink.js ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationLink: () => (/* binding */ NavigationLink)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */



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

function NavigationLink({
  effectiveLabel,
  fallbackLabel,
  showEventCount,
  hasSubmenu,
  showSubmenuIcon,
  linkClasses,
  linkStyles,
  onChangeLabel,
  className
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
    className: linkClasses,
    style: linkStyles,
    href: "#gatherpress-events-archive",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link to GatherPress Events Archive', 'gatherpress-magic-menu'),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
      identifier: "label",
      className: "wp-block-navigation-item__label",
      value: effectiveLabel,
      onChange: onChangeLabel,
      placeholder: fallbackLabel,
      withoutInteractiveFormatting: true,
      allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/strikethrough'],
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Navigation link text', 'gatherpress-magic-menu')
    }), showEventCount && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      className: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('gatherpress-magic-menu__count %s', className || ''),
      dangerouslySetInnerHTML: {
        __html: 'n'
      }
    }), hasSubmenu && showSubmenuIcon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
      className: "wp-block-navigation__submenu-icon",
      "aria-hidden": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
        fill: "none",
        role: "img",
        "aria-hidden": "true",
        focusable: "false",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
          d: "M1.50002 4L6.00002 8L10.5 4",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5"
        })
      })
    })]
  });
}

/***/ },

/***/ "./src/components/SubmenuPlaceholder.js"
/*!**********************************************!*\
  !*** ./src/components/SubmenuPlaceholder.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubmenuPlaceholder: () => (/* binding */ SubmenuPlaceholder)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_LabelFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/LabelFormatter */ "./src/utils/LabelFormatter.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */


/**
 * ============================================================================
 * IMPORTS
 * Internal dependencies
 * ============================================================================
 */


/**
 * Placeholder submenu component for editor preview.
 *
 * Responsibilities:
 * - Render example term links
 * - Apply overlay styles from navigation context
 * - Show/hide event counts based on settings
 * - Apply block style classes to count elements
 *
 * @since 0.1.0
 * @param {Object}  props                    Component props.
 * @param {boolean} props.showTermEventCount Show term event count flag.
 * @param {string}  props.overlayClasses     CSS classes for overlay styling.
 * @param {Object}  props.overlayStyles      Inline styles for overlay.
 * @param {string}  props.className          Block className (for style variant).
 * @return {JSX.Element|null} The submenu placeholder or null.
 */

function SubmenuPlaceholder({
  showTermEventCount,
  overlayClasses,
  overlayStyles,
  className
}) {
  const exampleTerms = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Example Term 1', 'gatherpress-magic-menu'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sample Term 2', 'gatherpress-magic-menu')];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
    className: "wp-block-navigation__submenu-container",
    children: exampleTerms.map((termName, index) => {
      let termLabelContent;
      if (showTermEventCount) {
        termLabelContent = _utils_LabelFormatter__WEBPACK_IMPORTED_MODULE_1__.LabelFormatter.formatWithCount(termName, className);
      } else {
        termLabelContent = termName;
      }
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
        className: "wp-block-navigation-item wp-block-navigation-link",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
          className: overlayClasses,
          style: overlayStyles,
          href: "#",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
            className: "wp-block-navigation-item__label",
            dangerouslySetInnerHTML: {
              __html: termLabelContent
            }
          })
        })
      }, index);
    })
  });
}

/***/ },

/***/ "./src/edit.js"
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _hooks_useNavigationContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks/useNavigationContext */ "./src/hooks/useNavigationContext.js");
/* harmony import */ var _hooks_useTaxonomies__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks/useTaxonomies */ "./src/hooks/useTaxonomies.js");
/* harmony import */ var _hooks_usePostTypeLabel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/usePostTypeLabel */ "./src/hooks/usePostTypeLabel.js");
/* harmony import */ var _components_InspectorPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/InspectorPanel */ "./src/components/InspectorPanel.js");
/* harmony import */ var _components_SubmenuPlaceholder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/SubmenuPlaceholder */ "./src/components/SubmenuPlaceholder.js");
/* harmony import */ var _components_NavigationLink__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/NavigationLink */ "./src/components/NavigationLink.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
/**
 * Editor component for the GatherPress Magic Menu block.
 *
 * @package
 * @since 0.1.0
 */

if (typeof window === 'undefined') {
  throw new Error('This file should only be loaded in a browser environment');
}

/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */




/**
 * ============================================================================
 * IMPORTS
 * Internal dependencies
 * ============================================================================
 */








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

function Edit({
  attributes,
  context,
  setAttributes,
  clientId,
  className
}) {
  const {
    label,
    gatherpressTaxonomy,
    showEventCount,
    showTermEventCount
  } = attributes;

  /**
   * Extract navigation context and styling.
   */
  const {
    linkStyles,
    overlayStyles,
    linkClasses,
    overlayClasses,
    showSubmenuIcon
  } = (0,_hooks_useNavigationContext__WEBPACK_IMPORTED_MODULE_4__.useNavigationContext)(context);

  /**
   * Fetch taxonomies for selector.
   */
  const taxonomyOptions = (0,_hooks_useTaxonomies__WEBPACK_IMPORTED_MODULE_5__.useTaxonomies)();

  /**
   * Get fallback label from post type.
   */
  const fallbackLabel = (0,_hooks_usePostTypeLabel__WEBPACK_IMPORTED_MODULE_6__.usePostTypeLabel)();

  /**
   * Get the effective label (user-provided or fallback).
   */
  const effectiveLabel = label || fallbackLabel;

  /**
   * Determine if block has submenu.
   */
  const hasSubmenu = Boolean(gatherpressTaxonomy);

  /**
   * Handle label changes.
   * Only save the label if it differs from the fallback.
   * This allows i18n to work properly when the label is not explicitly set.
   */
  const onChangeLabel = newLabel => {
    let labelToSave = newLabel;
    if (newLabel === fallbackLabel) {
      labelToSave = undefined;
    }
    if (!newLabel || newLabel.trim() === '') {
      labelToSave = undefined;
    }
    setAttributes({
      label: labelToSave
    });
  };
  const onChangeTaxonomy = newTaxonomy => {
    setAttributes({
      gatherpressTaxonomy: newTaxonomy
    });
  };
  const onChangeShowEventCount = newValue => {
    setAttributes({
      showEventCount: newValue
    });
  };
  const onChangeShowTermEventCount = newValue => {
    setAttributes({
      showTermEventCount: newValue
    });
  };

  /**
   * Build block wrapper props.
   */
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: hasSubmenu ? 'wp-block-navigation-item wp-block-navigation-submenu has-child open-on-hover-click' : 'wp-block-navigation-item wp-block-navigation-link'
  });

  /**
   * Update block name with link text.
   * Use a ref to track the previous label to prevent unnecessary updates.
   */
  const {
    updateBlockAttributes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/block-editor');
  const previousLabelRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(effectiveLabel);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!effectiveLabel || !clientId) {
      return;
    }
    if (previousLabelRef.current !== effectiveLabel) {
      previousLabelRef.current = effectiveLabel;
      updateBlockAttributes(clientId, {
        metadata: {
          name: effectiveLabel
        }
      });
    }
  }, [effectiveLabel, clientId, updateBlockAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_InspectorPanel__WEBPACK_IMPORTED_MODULE_7__.InspectorPanel, {
      gatherpressTaxonomy: gatherpressTaxonomy,
      showEventCount: showEventCount,
      showTermEventCount: showTermEventCount,
      taxonomyOptions: taxonomyOptions,
      onChangeTaxonomy: onChangeTaxonomy,
      onChangeShowEventCount: onChangeShowEventCount,
      onChangeShowTermEventCount: onChangeShowTermEventCount
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("li", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_NavigationLink__WEBPACK_IMPORTED_MODULE_9__.NavigationLink, {
        effectiveLabel: effectiveLabel,
        fallbackLabel: fallbackLabel,
        showEventCount: showEventCount,
        hasSubmenu: hasSubmenu,
        showSubmenuIcon: showSubmenuIcon,
        linkClasses: linkClasses,
        linkStyles: linkStyles,
        onChangeLabel: onChangeLabel,
        className: className
      }), hasSubmenu && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx)(_components_SubmenuPlaceholder__WEBPACK_IMPORTED_MODULE_8__.SubmenuPlaceholder, {
        showTermEventCount: showTermEventCount,
        overlayClasses: overlayClasses,
        overlayStyles: overlayStyles,
        className: className
      })]
    })]
  });
}

/***/ },

/***/ "./src/editor.scss"
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/hooks/useNavigationContext.js"
/*!*******************************************!*\
  !*** ./src/hooks/useNavigationContext.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useNavigationContext: () => (/* binding */ useNavigationContext)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */



/**
 * Custom hook to extract and process navigation context from parent blocks.
 *
 * Responsibilities:
 * - Extract color values (text, background, overlay)
 * - Extract typography settings
 * - Extract navigation-specific flags (showSubmenuIcon, etc.)
 * - Build inline styles from context
 * - Build CSS class names from context
 *
 * @since 0.1.0
 * @param {Object} context Block context from parent navigation.
 * @return {Object} Processed navigation context with styles and classes.
 */
function useNavigationContext(context) {
  const {
    textColor,
    customTextColor,
    backgroundColor,
    customBackgroundColor,
    overlayTextColor,
    customOverlayTextColor,
    overlayBackgroundColor,
    customOverlayBackgroundColor,
    showSubmenuIcon
  } = context;

  /**
   * Build inline styles for the main link.
   * Only apply main link colors (not overlay colors).
   */
  const linkStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const styles = {};
    if (customTextColor) {
      styles.color = customTextColor;
    }
    if (customBackgroundColor) {
      styles.backgroundColor = customBackgroundColor;
    }
    if (Object.keys(styles).length > 0) {
      return styles;
    }
    return undefined;
  }, [customTextColor, customBackgroundColor]);

  /**
   * Build overlay styles for submenu preview.
   * These apply to term links in the submenu.
   */
  const overlayStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const styles = {};
    if (customOverlayTextColor) {
      styles.color = customOverlayTextColor;
    }
    if (customOverlayBackgroundColor) {
      styles.backgroundColor = customOverlayBackgroundColor;
    }
    if (Object.keys(styles).length > 0) {
      return styles;
    }
    return undefined;
  }, [customOverlayTextColor, customOverlayBackgroundColor]);

  /**
   * Build class names from navigation context.
   */
  const linkClasses = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const classes = ['wp-block-navigation-item__content'];
    if (textColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-color', textColor));
      classes.push('has-text-color');
    }
    if (backgroundColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-background-color', backgroundColor));
      classes.push('has-background');
    }
    return classes.join(' ');
  }, [textColor, backgroundColor]);

  /**
   * Build overlay class names for submenu preview.
   */
  const overlayClasses = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const classes = ['wp-block-navigation-item__content'];
    if (overlayTextColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-color', overlayTextColor));
      classes.push('has-text-color');
    }
    if (overlayBackgroundColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-background-color', overlayBackgroundColor));
      classes.push('has-background');
    }
    return classes.join(' ');
  }, [overlayTextColor, overlayBackgroundColor]);
  return {
    linkStyles,
    overlayStyles,
    linkClasses,
    overlayClasses,
    showSubmenuIcon
  };
}

/***/ },

/***/ "./src/hooks/usePostTypeLabel.js"
/*!***************************************!*\
  !*** ./src/hooks/usePostTypeLabel.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePostTypeLabel: () => (/* binding */ usePostTypeLabel)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */





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
function usePostTypeLabel() {
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const {
      getPostType
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.store);
    return getPostType('gatherpress_event');
  }, []);
  const fallbackLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    if (postType && postType.labels && postType.labels.name) {
      return postType.labels.name;
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Events', 'gatherpress-magic-menu');
  }, [postType]);
  return fallbackLabel;
}

/***/ },

/***/ "./src/hooks/useTaxonomies.js"
/*!************************************!*\
  !*** ./src/hooks/useTaxonomies.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useTaxonomies: () => (/* binding */ useTaxonomies)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */





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
function useTaxonomies() {
  const taxonomies = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const {
      getTaxonomies
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.store);
    const allTaxonomies = getTaxonomies({
      per_page: -1
    }) || [];

    // Filter to only include taxonomies associated with gatherpress_event
    return allTaxonomies.filter(taxonomy => {
      return taxonomy.types && taxonomy.types.includes('gatherpress_event');
    });
  }, []);
  const taxonomyOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    const options = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'gatherpress-magic-menu'),
      value: ''
    }];
    if (taxonomies) {
      const mappedTaxonomies = taxonomies.map(taxonomy => {
        let taxonomyLabel = taxonomy.slug;
        if (taxonomy.name) {
          taxonomyLabel = taxonomy.name;
        }
        return {
          label: taxonomyLabel,
          value: taxonomy.slug
        };
      });
      options.push(...mappedTaxonomies);
    }
    return options;
  }, [taxonomies]);
  return taxonomyOptions;
}

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Make the Magic Menu Block available to Navigation blocks.
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'gatherpress-magic-menu/allow-in-core-navigation', (settings, name) => {
  var _settings$allowedBloc;
  if (name !== 'core/navigation') {
    return settings;
  }
  return {
    ...settings,
    allowedBlocks: [...((_settings$allowedBloc = settings.allowedBlocks) !== null && _settings$allowedBloc !== void 0 ? _settings$allowedBloc : []), 'gatherpress-magic-menu']
  };
});

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/style.scss"
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/utils/LabelFormatter.js"
/*!*************************************!*\
  !*** ./src/utils/LabelFormatter.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LabelFormatter: () => (/* binding */ LabelFormatter)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * ============================================================================
 * IMPORTS
 * WordPress dependencies
 * ============================================================================
 */


/**
 * Utility class for formatting labels with event counts.
 *
 * Responsibilities:
 * - Format labels with BEM-style count elements
 * - Handle i18n for count display
 * - Apply block style classes to count elements
 *
 * @since 0.1.0
 */
class LabelFormatter {
  /**
   * Formats a label with event count.
   *
   * @since 0.1.0
   * @param {string} label     The base label.
   * @param {string} className The block className (for style variant).
   * @return {string} HTML string with formatted count.
   */
  static formatWithCount(label, className) {
    const countSpan = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('<span class="gatherpress-magic-menu__count %s">n</span>', className || '');
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: 1: label text, 2: event count HTML */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('%1$s %2$s', 'gatherpress-magic-menu'), label, countSpan);
  }
}

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/core-data"
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["coreData"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkblock_gatherpress_magic_menu"] = globalThis["webpackChunkblock_gatherpress_magic_menu"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map