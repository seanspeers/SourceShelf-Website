# Trust & Safety and Living Packs

Trust & Safety helps you inspect a pack before it leaves SourceShelf or becomes available to another local application. It is an advisory report, not a guarantee that content is safe.

![Trust & Safety summary for the synthetic demo pack](../assets/images/trust-and-safety.png)

## What SourceShelf checks

The report includes checks for:

- readable and unavailable sources;
- unresolved saved-pack references;
- output size and archived-image counts;
- naming, collision, and package structure;
- source and packaged-file checksums;
- modification dates;
- web captures older than the applicable staleness policy;
- invalid asset and link references;
- likely instruction override, system-prompt disclosure, tool-use, credential, or exfiltration language.

The risk detector is intentionally conservative. Findings show a category, Markdown line, and short excerpt. Examples inside fenced code receive reduced or suppressed severity where possible.

## Untrusted reference content

Captured and converted material is classified as `untrusted_reference`. Generated context documents and MCP reads include a visible notice. SourceShelf preserves the original body so you can review it; it does not remove instructions or describe the material as sanitized.

## Ready, warnings, and errors

- **Ready** means the shared structural checks passed and no advisory issue needs review.
- **Warnings** permit export or sharing after you review the report.
- **Errors with readable sources** may still permit an explicit “with issues” continuation.
- **No readable sources** blocks export or sharing because there is nothing useful to deliver.

Structural exporter validation remains authoritative. If package validation fails, SourceShelf does not write an invalid result.

## Staleness

Web captures use a global default age of 90 days. A capture recipe can inherit that value, choose a positive number of days, or disable age-based staleness for its captures.

File conversions are compared through modification dates and content hashes, not an arbitrary age threshold. SourceShelf never fetches a URL to decide whether a web page changed.

## Refresh & Compare

After a successful export, SourceShelf stores a baseline for that saved pack. Select **Refresh & Compare** to classify current local state:

![A new saved pack before its first export baseline](../assets/images/refresh-and-compare.png)

- **New** — in the current pack but absent from the baseline;
- **Changed** — semantic content or tracked provenance metadata differs;
- **Missing** — referenced but currently unreadable or unavailable;
- **Unchanged** — content and tracked metadata hashes match;
- **Removed** — present at export time but no longer in the saved pack.

Ordering changes are reported separately. The detail sheet shows current and last-exported dates plus shortened hashes. Matching content and metadata hashes are classified as unchanged.

Untitled packs do not have persistent baselines. Save the pack first. Cancellation or an export failure does not update the baseline; if the export succeeds but baseline persistence fails, SourceShelf reports that tracking failure instead of claiming the pack is current.

## When reports become stale

Membership, ordering, active-pack, source-state, recipe-policy, and baseline changes invalidate earlier Trust & Safety or comparison results. Run the check again before relying on it.
