<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'telex/block-gatherpress-magic-menu',
		'version' => '0.1.0',
		'title' => 'GatherPress Magic Menu',
		'category' => 'widgets',
		'icon' => 'calendar-alt',
		'description' => 'A navigation link that dynamically links to the GatherPress events archive',
		'keywords' => array(
			'navigation',
			'gatherpress',
			'events',
			'menu',
			'link'
		),
		'parent' => array(
			'core/navigation'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'gatherpressTaxonomy' => array(
				'type' => 'string',
				'default' => ''
			),
			'showEventCount' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showTermEventCount' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'usesContext' => array(
			'textColor',
			'customTextColor',
			'backgroundColor',
			'customBackgroundColor',
			'overlayTextColor',
			'customOverlayTextColor',
			'overlayBackgroundColor',
			'customOverlayBackgroundColor',
			'fontSize',
			'customFontSize',
			'showSubmenuIcon',
			'openSubmenusOnClick',
			'style'
		),
		'example' => array(
			'attributes' => array(
				'label' => 'View All Events'
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'badge',
				'label' => 'Badge'
			),
			array(
				'name' => 'starburst',
				'label' => 'Starburst'
			)
		),
		'supports' => array(
			'html' => false,
			'reusable' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => false,
					'padding' => false
				)
			)
		),
		'textdomain' => 'gatherpress-magic-menu',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
