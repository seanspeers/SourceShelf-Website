# Build and Manage Packs

A pack is an ordered selection of Library sources. Saved packs are SourceShelf’s durable collections and the unit used for export, comparison, and Local AI Access.

## The Packs workspace

The left column is a compact Library browser. The middle column is the ordered pack. At larger window widths, the inspector appears as a third column; at compact widths it opens in a sheet.

![A saved pack built from synthetic demo sources](../assets/images/pack-builder.png)

Use the header to select a saved pack, start a new one, save changes, save under a different name, rename, or delete it.

## Add and order sources

- Select the plus or minus control beside a source to change membership.
- **Add Matching** adds readable sources matching the current browser filters.
- **Add All Exportable** adds all readable Library sources.
- **Add Since Last Export** adds sources created after the current pack’s most recent successful export.
- Drag sources to reorder them, or use **Move Up** and **Move Down** for keyboard-accessible ordering.

Exporters and MCP snapshots receive sources in the displayed order.

## Drafts and explicit saving

Pack changes are drafts until you select **Save** or **Save Changes**. SourceShelf restores the active pack, ordering, and unsaved draft metadata after relaunch, but the draft snapshot never contains Markdown content.

If you switch packs or start a new pack while the current draft is dirty, SourceShelf offers:

- **Save** to persist the current changes and continue;
- **Discard** to return to the saved membership and continue;
- **Cancel** to stay on the current draft.

A failed save leaves the draft dirty and cancels the requested switch.

## Save As, rename, and delete

**Save As** creates another saved pack. If its normalized name collides with an existing pack, SourceShelf asks before replacing anything.

Renaming changes the saved-pack name used for pack titles and manifest collection metadata. Deleting a saved pack does not delete Library entries or Markdown files. If you delete the active pack, its contents detach into an untitled dirty draft.

## Missing references

Saved references are retained when a Library item or Markdown file becomes unavailable. The placeholder can still be reordered or removed. Trust & Safety reports the unresolved reference as an error, while allowing export when at least one other source is readable.

## Packs become “living” after export

A successful export records a local baseline containing order, hashes, dates, and the export format. **Refresh & Compare** compares the present local Library state with that baseline. It never revisits a web URL.

See [Trust & Safety and living packs](trust-safety-and-refresh.md) for the comparison meanings.
