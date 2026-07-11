/**
 * External Dependencies
 */
const path = require( 'path' );

/**
 * WordPress Dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		badge: path.resolve( process.cwd(), 'src', 'badge.scss' ),
	},
};
