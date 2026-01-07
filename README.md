# GatherPress Magic Menu

**Contributors:**      WordPress Telex  
**Tags:**              block, navigation, gatherpress, events, taxonomy  
**Tested up to:**      6.8  
**Stable tag:**        0.1.0  
**License:**           GPLv2 or later  
**License URI:**       https://www.gnu.org/licenses/gpl-2.0.html  

A navigation block that creates dynamic menus for GatherPress events, with support for taxonomy filtering and event counts.  

## Description

The GatherPress Magic Menu block adds a navigation item to your site's navigation that links to your events archive. It can optionally create submenus based on GatherPress taxonomies (Topics, Venues, or custom taxonomies), with each term becoming a submenu item.

The block integrates with WordPress's native Navigation block and inherits its styling. It includes performance optimizations through transient caching and automatic cache invalidation when events are published, unpublished, or their taxonomy terms change.

**Core Features:**

* Links to the GatherPress events post type archive
* Optional taxonomy-based submenus (one level deep)
* Display upcoming event counts next to labels
* Three visual styles for event count display (default, badge, starburst)
* Automatic cache management (7-day expiry, invalidated on event changes)
* Prevents navigation to archive when no upcoming events exist
* Works only inside Navigation blocks (parent: core/navigation)

**Event Counting:**

* Main archive link can show total upcoming events count
* Submenu term links can show per-term upcoming events count
* Event counts are calculated and cached for performance
* Counts update automatically when event status or terms change

**Caching Behavior:**

* Upcoming events query results cached for 7 days
* Taxonomy term data cached separately per taxonomy
* Caches cleared when:
  - Event post status changes to/from 'publish'
  - Terms are assigned to or removed from events

## Usage Examples

<details>
<summary>Example 1: Simple Events Link</summary>

Add the block to your navigation with no taxonomy selected. This creates a single link to your events archive with an optional event count.

Settings:
- Filter by Taxonomy: All Events
- Show Event Count: Enabled

Result: "Events (12)" linking to your events archive
</details>

<details>
<summary>Example 2: Events by Topic</summary>

Create a submenu organized by GatherPress Topics taxonomy.

Settings:
- Filter by Taxonomy: Topics
- Show Event Count: Enabled (shows total for main link)
- Show Term Event Count: Enabled (shows count per topic)

Result:
- Events (12)
  - Code Review (3)
  - Social Meetup (5)
  - Workshop (4)
</details>

<details>
<summary>Example 3: Events by Venue</summary>

Create a submenu organized by GatherPress Venues taxonomy without counts.

Settings:
- Filter by Taxonomy: Venues  
- Show Event Count: Disabled
- Show Term Event Count: Disabled

Result:
- Events
  - Community Center
  - Downtown Library
  - Online
</details>

<details>
<summary>Example 4: Styled Event Counts</summary>

Use block styles to visually emphasize event counts.

Settings:
- Filter by Taxonomy: Topics
- Show Event Count: Enabled
- Block Style: Badge (or Starburst)

The "badge" style displays the count as a small notification indicator, while "starburst" uses a more prominent circular design.
</details>

## Frequently Asked Questions

### Does this require GatherPress?

The block is designed for GatherPress event post types. It will function without GatherPress but won't display any events or taxonomies.

### What happens when there are no upcoming events?

The link to the events archive is displayed with aria-disabled="true" and styled to indicate it's disabled. JavaScript prevents clicks on the link.

### Can I customize which taxonomies appear?

The block shows all taxonomies registered with the gatherpress_event post type. You select one taxonomy per block instance in the block settings.

### How deep do submenus go?

Submenus are one level deep. Each term in the selected taxonomy becomes a submenu item. Nested term hierarchies are flattened.

### What defines an "upcoming event"?

The block uses GatherPress's built-in 'upcoming' event query parameter, which respects GatherPress's event date logic.

### Can I use multiple instances?

Yes. You can add multiple GatherPress Magic Menu blocks to the same or different navigation menus, each configured differently.

### How often do event counts update?

Caches expire after 7 days but are automatically cleared when:
- An event is published or unpublished  
- Terms are added to or removed from events

### Can I clear the cache manually?

The cache clears automatically. To force a refresh, temporarily unpublish and republish an event.

## Installation

1. Upload plugin files to `/wp-content/plugins/gatherpress-magic-menu/` or install via WordPress plugins screen
2. Activate the plugin
3. Open the Site Editor or a page/post in the block editor
4. Add or edit a Navigation block
5. Inside the Navigation block, add "GatherPress Magic Menu"
6. Configure the block settings in the sidebar

## Changelog

### 0.1.0
* Initial release
* Navigation link to GatherPress events archive
* Optional taxonomy-based submenus
* Event count display for archive and term links
* Three block styles: default, badge, starburst
* Transient caching with automatic invalidation
* Disabled state when no upcoming events
* Integration with WordPress Navigation block

## Technical Notes

**Performance Optimizations:**

* Minimal transient data structure (stores only IDs, names, and counts)
* Separate caches for events query and each taxonomy
* Cache invalidation hooks on post status and term changes
* HTML Processor API for attribute manipulation

**Block Structure:**

* Parent block: core/navigation
* Renders as: core/navigation-link or core/navigation-submenu
* Inherits navigation block styling