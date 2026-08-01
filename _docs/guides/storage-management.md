# Manage SourceShelf Storage

SourceShelf keeps Library sources until you decide to remove them. There is no age-based or 500-source limit, so older research, starred sources, and saved-pack members do not silently disappear.

Use **SourceShelf > Settings > General > Review Storage…** to see what SourceShelf is using and choose what, if anything, to remove.

## Understand the storage summary

The summary inventories SourceShelf-managed and SourceShelf-generated data, including:

- generated Markdown in the output folder;
- image folders created beside generated Markdown;
- managed Library copies and archived images;
- semantic caches used for previews, chunking, and comparison;
- Local AI Access snapshots;
- Safari capture review drafts and staging data.

The summary does not treat original imported documents as SourceShelf storage. Source files such as the PDF, Word document, or spreadsheet you converted are never cleanup targets.

Select **Refresh** after converting, capturing, exporting, or removing data if you want to recalculate the totals while the window is open.

## Run Safe Cleanup

**Safe Cleanup** removes only internal data that is orphaned, obsolete, expired, or no longer authorized:

- managed copies that no longer belong to a Library source;
- semantic caches that no longer match their Markdown;
- expired Safari staging data that is not part of an active capture or review;
- revoked MCP snapshots and abandoned MCP staging data.

It does not remove generated Markdown, current Library entries, active review drafts, published MCP shares, or original imported documents.

SourceShelf shows the estimated number of files and reclaimable space before the cleanup. Select **Clean Up…**, review the confirmation, and continue only when you are ready.

## Remove generated source data

The **Generated Source Data** list is for deliberate source-by-source removal. Each row shows the source title, estimated size, and any protection applied to it.

1. Select individual sources, or choose **Select Unprotected**.
2. Review the selection count and estimated size.
3. Select **Move Selected to Trash…**.
4. Read the confirmation and choose **Move to Trash**.

For each selected source, SourceShelf:

- moves its generated Markdown and adjacent generated image folder to the macOS Trash;
- removes its private managed Library copy;
- removes the corresponding Library entry.

Original imported files are never selected or deleted. Generated output moved to Trash remains recoverable until the Trash is emptied, but internal managed data and the Library record are removed. If you restore a Markdown file later, import it again to create a new Library entry.

## Protected sources

Starred sources and sources referenced by saved packs are locked by default. Their rows explain why they are protected.

If you intentionally want to remove them, enable **Allow selecting starred or saved-pack sources**, select the sources, and confirm the removal. Removing a saved-pack source does not silently rewrite the pack: it leaves an unavailable placeholder that you can later restore or remove from the pack.

Protection prevents accidental selection in the storage window; it is not a backup. Keep separate backups of important source material and exported packs.

## Library removal versus storage cleanup

These commands serve different purposes:

- **Remove from Library** removes the Library record but leaves generated Markdown in the output folder.
- **Safe Cleanup** removes only orphaned or regenerable internal data.
- **Move Selected to Trash…** removes the selected Library record and its SourceShelf-generated output together.

For routine maintenance, start with Safe Cleanup. Use generated-source removal only when you no longer want those converted or captured results in SourceShelf.

## A practical maintenance routine

There is no required schedule. When storage use becomes noticeable:

1. Open **Review Storage…** and refresh the inventory.
2. Run Safe Cleanup.
3. Sort out sources you no longer need in Library.
4. Review unprotected generated source data and move only confirmed items to Trash.
5. Empty the macOS Trash later, after you are certain nothing needs to be restored.

For more detail about storage boundaries, see [Privacy and Security](../reference/privacy-and-security.md).
