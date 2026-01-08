/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block.json"
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"gatherpress/magic-menu","version":"0.1.0","title":"GatherPress Magic Menu","category":"widgets","icon":"calendar-alt","description":"A navigation link that dynamically links to the GatherPress events archive","keywords":["navigation","gatherpress","events","menu","link"],"parent":["core/navigation"],"attributes":{"label":{"type":"string","default":""},"gatherpressTaxonomy":{"type":"string","default":""},"showEventCount":{"type":"boolean","default":false},"showTermEventCount":{"type":"boolean","default":false}},"usesContext":["textColor","customTextColor","backgroundColor","customBackgroundColor","overlayTextColor","customOverlayTextColor","overlayBackgroundColor","customOverlayBackgroundColor","fontSize","customFontSize","showSubmenuIcon","openSubmenusOnClick","style"],"example":{"attributes":{"label":"View All Events"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"badge","label":"Badge"},{"name":"starburst","label":"Starburst"}],"supports":{"html":false,"reusable":true,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"spacing":{"margin":true,"padding":true,"__experimentalDefaultControls":{"margin":false,"padding":false}}},"textdomain":"gatherpress-magic-menu","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */







/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


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

function Edit({
  attributes,
  context,
  setAttributes,
  className
}) {
  const {
    label,
    gatherpressTaxonomy,
    showEventCount,
    showTermEventCount
  } = attributes;

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
    showSubmenuIcon
  } = context;

  /**
   * Fetch taxonomies registered with the gatherpress_event post type.
   */
  const taxonomies = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const {
      getTaxonomies
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store);
    const allTaxonomies = getTaxonomies({
      per_page: -1
    }) || [];

    // Filter to only include taxonomies associated with gatherpress_event
    return allTaxonomies.filter(taxonomy => {
      return taxonomy.types && taxonomy.types.includes('gatherpress_event');
    });
  }, []);

  /**
   * Fetch the gatherpress_event post type to get its plural label.
   */
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const {
      getPostType
    } = select(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_4__.store);
    return getPostType('gatherpress_event');
  }, []);

  /**
   * Get the fallback label from post type plural label.
   */
  const getFallbackLabel = () => {
    if (postType && postType.labels && postType.labels.name) {
      return postType.labels.name;
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Events', 'gatherpress-magic-menu');
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
  const linkStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => {
    const styles = {};

    // Apply text color from context
    if (customTextColor) {
      styles.color = customTextColor;
    }

    // Apply background color from context
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
   * These are the styles that would apply to term links in the submenu.
   */
  const overlayStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => {
    const styles = {};

    // Apply overlay text color from context
    if (customOverlayTextColor) {
      styles.color = customOverlayTextColor;
    }

    // Apply overlay background color from context
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
  const linkClasses = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => {
    const classes = ['wp-block-navigation-item__content'];

    // Add text color class if present
    if (textColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-color', textColor));
      classes.push('has-text-color');
    }

    // Add background color class if present
    if (backgroundColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-background-color', backgroundColor));
      classes.push('has-background');
    }
    return classes.join(' ');
  }, [textColor, backgroundColor]);

  /**
   * Build overlay class names for submenu preview.
   */
  const overlayClasses = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => {
    const classes = ['wp-block-navigation-item__content'];

    // Add overlay text color class if present
    if (overlayTextColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-color', overlayTextColor));
      classes.push('has-text-color');
    }

    // Add overlay background color class if present
    if (overlayBackgroundColor) {
      classes.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('has-%s-background-color', overlayBackgroundColor));
      classes.push('has-background');
    }
    return classes.join(' ');
  }, [overlayTextColor, overlayBackgroundColor]);

  /**
   * Handles changes to the label text.
   *
   * @param {string} newLabel The new label text.
   * @return {void}
   */
  const onChangeLabel = newLabel => {
    setAttributes({
      label: newLabel
    });
  };

  /**
   * Handles changes to the taxonomy selection.
   *
   * @param {string} newTaxonomy The selected taxonomy slug.
   * @return {void}
   */
  const onChangeTaxonomy = newTaxonomy => {
    setAttributes({
      gatherpressTaxonomy: newTaxonomy
    });
  };

  /**
   * Handles changes to the event count toggle.
   *
   * @param {boolean} newValue The new toggle value.
   * @return {void}
   */
  const onChangeShowEventCount = newValue => {
    setAttributes({
      showEventCount: newValue
    });
  };

  /**
   * Handles changes to the term event count toggle.
   *
   * @param {boolean} newValue The new toggle value.
   * @return {void}
   */
  const onChangeShowTermEventCount = newValue => {
    setAttributes({
      showTermEventCount: newValue
    });
  };

  /**
   * Prepare taxonomy options for the SelectControl.
   */
  const taxonomyOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('All Events', 'gatherpress-magic-menu'),
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
    taxonomyOptions.push(...mappedTaxonomies);
  }
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: gatherpressTaxonomy ? 'wp-block-navigation-item wp-block-navigation-submenu has-child open-on-hover-click' : 'wp-block-navigation-item wp-block-navigation-link'
  });

  /**
   * Build the event count element with proper i18n using sprintf.
   * Allows translators to control the position of count and label.
   */
  let labelWithCount = getEffectiveLabel();
  if (showEventCount) {
    const countSpan = '<span class="gatherpress-magic-menu__count">n</span>';

    // Translatable format string that allows repositioning count and label
    labelWithCount = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: 1: label text, 2: event count HTML */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('%1$s %2$s', 'gatherpress-magic-menu'), getEffectiveLabel(), countSpan);
  }

  /**
   * Renders the placeholder submenu when a taxonomy is selected.
   */
  const renderSubmenuPlaceholder = () => {
    if (!gatherpressTaxonomy) {
      return null;
    }

    // Example term names for placeholder
    const exampleTerms = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Example Term 1', 'gatherpress-magic-menu'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Example Term 2', 'gatherpress-magic-menu')];
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("ul", {
      className: "wp-block-navigation__submenu-container",
      children: exampleTerms.map((termName, index) => {
        let termLabelContent = termName;
        if (showTermEventCount) {
          // Build term label with count using sprintf for i18n
          const termCountSpan = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('<span class="gatherpress-magic-menu__count %s">n</span>', className || '');
          termLabelContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: 1: term name, 2: event count HTML */
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('%1$s %2$s', 'gatherpress-magic-menu'), termName, termCountSpan);
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("li", {
          className: "wp-block-navigation-item wp-block-navigation-link",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("a", {
            className: overlayClasses,
            style: overlayStyles,
            href: "#",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
              className: "wp-block-navigation-item__label",
              dangerouslySetInnerHTML: {
                __html: termLabelContent
              }
            })
          })
        }, index);
      })
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('GatherPress Settings', 'gatherpress-magic-menu'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Filter by Taxonomy', 'gatherpress-magic-menu'),
          value: gatherpressTaxonomy,
          options: taxonomyOptions,
          onChange: onChangeTaxonomy,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select a taxonomy to filter events, or leave as "All Events" for the main archive.', 'gatherpress-magic-menu')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Event Count', 'gatherpress-magic-menu'),
          checked: showEventCount,
          onChange: onChangeShowEventCount,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display the number of upcoming events next to the main archive label.', 'gatherpress-magic-menu')
        }), gatherpressTaxonomy && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show Term Event Count', 'gatherpress-magic-menu'),
          checked: showTermEventCount,
          onChange: onChangeShowTermEventCount,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Display the number of upcoming events next to each term link.', 'gatherpress-magic-menu')
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("li", {
      ...blockProps,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("a", {
        className: linkClasses,
        style: linkStyles,
        href: "#gatherpress-events-archive",
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Link to GatherPress Events Archive', 'gatherpress-magic-menu'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
          identifier: "label",
          className: "wp-block-navigation-item__label",
          value: getEffectiveLabel(),
          onChange: onChangeLabel,
          placeholder: getFallbackLabel(),
          withoutInteractiveFormatting: true,
          allowedFormats: ['core/bold', 'core/italic', 'core/image', 'core/strikethrough'],
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Navigation link text', 'gatherpress-magic-menu')
        }), showEventCount && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
          className: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)('gatherpress-magic-menu__count %s', className || ''),
          dangerouslySetInnerHTML: {
            __html: 'n'
          }
        }), gatherpressTaxonomy && showSubmenuIcon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("span", {
          className: "wp-block-navigation__submenu-icon",
          "aria-hidden": "true",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            fill: "none",
            role: "img",
            "aria-hidden": "true",
            focusable: "false",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
              d: "M1.50002 4L6.00002 8L10.5 4",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5"
            })
          })
        })]
      }), renderSubmenuPlaceholder()]
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
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'gatherpress-magic-menu/add-taxonomy-attribute', (settings, name) => {
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