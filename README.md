# GatherPress Magic Menu

**Contributors:**      carstenbach & WordPress Telex  
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


## Chances for improvement

### Performance & Caching

[ ] Cache Invalidation Granularity: Currently, changing any event clears ALL taxonomy caches. Consider invalidating only the specific taxonomy caches that are actually affected by the changed event.

[ ] Transient Cleanup: Add a cleanup mechanism for orphaned transients when taxonomies are deleted or unregistered from gatherpress_event.

[ ] Query Optimization: The count_events_for_term() method loops through all events for each term. Consider using a single WP_Query with taxonomy parameters to get counts more efficiently._

### User Experience

[ ] Block Preview: Add a more realistic preview in the editor that shows actual term names (not just placeholders) when a taxonomy is selected, so editors can see what will render.

[ ] Empty State Messaging: When no upcoming events exist, consider showing an admin notice in the editor explaining why the link will be disabled.

[ ] Taxonomy Validation: Add validation to check if the selected taxonomy still exists/is still registered with gatherpress_event and show a warning if not.

[ ] Block Variation: Create a block variation for each common GatherPress taxonomy (Topics, Venues) with pre-configured settings for easier setup._

### Accessibility

[ ] ARIA Labels: The disabled link could use a more descriptive aria-label explaining why it's disabled (e.g., "No upcoming events available").

[ ] Screen Reader Text: Add visually hidden text for screen readers explaining the event count context.

### Code Quality

[ ] Type Safety: While PHPStan compatibility was added, consider adding more specific PHPDoc @var annotations for complex array structures.

[ ] Error Handling: Add more graceful error handling for edge cases like corrupted transient data or WP_Error returns from WordPress functions.

[ ] Separation of Concerns: The renderer class is quite large (500+ lines). Consider extracting cache management, block creation, and HTML manipulation into separate helper classes.

### Features

[ ] Date Range Filtering: Add options to filter by custom date ranges (e.g., "Next 30 days", "This month") instead of just "upcoming".

[ ] Term Ordering: Add options for custom term ordering (alphabetical, by event count, by term order).

[ ] Exclude Terms: Add ability to exclude specific terms from the submenu.

[ ] Maximum Terms: Add option to limit the number of terms shown (with a "View All" link if needed).

[ ] Hierarchical Terms: If taxonomies support hierarchical terms, add support for nested submenus.

### Integration

[ ] GatherPress Hooks: Consider integrating with GatherPress-specific hooks if available, rather than relying only on core WordPress hooks.

[ ] REST API Endpoint: Create a custom REST endpoint to expose event counts, allowing for dynamic updates without page reload.

[ ] Block Patterns: Create pre-configured block patterns showing common navigation setups using this block.

### Testing & Documentation

[ ] Unit Tests: Add unit tests for the renderer class methods, especially caching logic and count calculations.

[ ] Inline Code Examples: Add more code examples in the README showing advanced customization through filters/hooks.

[ ] Developer Hooks: Expose filter hooks for developers to modify queries, cache keys, or output before rendering.
