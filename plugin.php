<?php
/**
 * Plugin Name:       GatherPress Magic Menu
 * Description:       A navigation block that creates a dynamic GatherPress menu, with taxonomy-based submenus and upcoming event counters.
 * Version:           0.1.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Requires Plugins:  gatherpress
 * Author:            carstenbach & WordPress Telex
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-magic-menu
 *
 * @package GatherPressMagicMenu
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit; // @codeCoverageIgnore

// Constants.
define( 'GATHERPRESS_MAGIC_MENU_VERSION', current( get_file_data( __FILE__, array( 'Version' ), 'plugin' ) ) );
define( 'GATHERPRESS_MAGIC_MENU_CORE_PATH', __DIR__ );

/**
 * Adds the GatherPress\Cache_Invalidation_Hooks namespace to the autoloader.
 *
 * This function hooks into the 'gatherpress_autoloader' filter and adds the
 * GatherPress\Cache_Invalidation_Hooks namespace to the list of namespaces with its core path.
 *
 * @param array<string, string> $namespaces An associative array of namespaces and their paths.
 * @return array<string, string> Modified array of namespaces and their paths.
 */
function gatherpress_magic_menu_autoloader( array $namespaces ): array {
	$namespaces['GatherPress_Magic_Menu'] = GATHERPRESS_MAGIC_MENU_CORE_PATH;

	return $namespaces;
}
add_filter( 'gatherpress_autoloader', 'gatherpress_magic_menu_autoloader' );

/**
 * Initializes the setup.
 *
 * This function hooks into the 'plugins_loaded' action to ensure that
 * the instances are created once all plugins are loaded,
 * only if the GatherPress plugin is active.
 *
 * @return void
 */
function gatherpress_magic_menu_setup(): void {
	if ( defined( 'GATHERPRESS_VERSION' ) ) {
		GatherPress_Magic_Menu\Setup::get_instance();
	}
}
add_action( 'plugins_loaded', 'gatherpress_magic_menu_setup' );

/**
 * Plugin deactivation cleanup.
 *
 * Removes all cached transients when the plugin is deactivated.
 *
 * @since 0.1.0
 * @return void
 */
function gatherpress_magic_menu_deactivate(): void {
	\GatherPress_Magic_Menu\Cache::get_instance()->clear_all_caches();
}
register_deactivation_hook( __FILE__, 'gatherpress_magic_menu_deactivate' );
