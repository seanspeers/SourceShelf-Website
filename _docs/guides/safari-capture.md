# Capture from Safari

The SourceShelf Safari extension saves the current page, main content, a selection, a selected page area, or a basket of research highlights as local Markdown.

## Enable the Safari extension

1. Launch SourceShelf.
2. Open **Safari > Settings > Extensions**.
3. Enable the SourceShelf extension.

## Capture modes

- **Use Recipe Default** follows the selected recipe’s content mode.
- **Save Entire Page as Markdown** keeps the broad page body.
- **Save Main Content as Markdown** focuses on the primary article or document.
- **Save Selection as Markdown** uses the current Safari text selection.
- **Select Area as Markdown** lets you choose a page region.
- **Save Highlights as Markdown** combines the ordered highlight basket and optional short note.

Explicit popup actions override the recipe’s default for that capture.

## Capture recipes

Open **SourceShelf > Settings > Capture** to create, duplicate, reorder, or delete recipes. A recipe can define:

- filename and relative-folder templates;
- custom YAML fields;
- default content mode;
- image and link behavior;
- review-before-save behavior;
- a staleness policy;
- ordered exact-host and wildcard domain rules.

Exact hosts are more specific than leading wildcards such as `*.example.com`. If several rules are equally specific, their saved order decides the match.

The built-in **Standard** recipe mirrors quick-save behavior and is the fallback when settings are missing, invalid, or refer to a deleted recipe.

## Templates and YAML

Templates can use `{title}`, `{domain}`, `{date}`, `{time}`, `{captured_at}`, `{mode}`, `{recipe}`, `{url}`, and `{note}`. SourceShelf sanitizes every folder component, rejects absolute paths and `..`, and keeps the destination beneath the authorized output folder.

Custom YAML keys must be unique and valid. SourceShelf protects its provenance keys, including `title`, `url`, `domain`, `captured_at`, `source`, and `created_by`.

## One-step keyboard capture

In **Settings > Capture**, choose a recipe for the Safari quick-capture shortcut. Then open Safari’s extension keyboard-shortcut settings and assign a key combination to SourceShelf’s quick-capture command.

When invoked, SourceShelf chooses the recipe using this order:

1. the most-specific domain rule for the active page;
2. the configured shortcut recipe;
3. the Standard fallback recipe.

Simple page, main-content, or compatible selection recipes can save immediately without opening the popup. A recipe that requires review or an interactive workflow, such as area selection or highlight collection, opens the extension instead.

## Research highlights

Select text on a page, open SourceShelf, and choose **Add Current Selection**. Repeat to build an ordered basket. You can remove or reorder excerpts and add a short note before saving them together as a `.highlights` capture.

The basket is scoped to the browser tab and URL. It is cleared only after the native handoff is accepted or navigation makes it obsolete.

## Review before save

A review-enabled recipe queues a local review sheet in SourceShelf. You can edit the relative destination, filename, custom YAML, note, and Markdown body, then switch between Preview and Markdown Source. Provenance stays read-only.

Review drafts survive app relaunch. Saving reparses the edited Markdown and copies only referenced staged images. Canceling removes the draft and its staged assets.

## Troubleshooting recipes

If a new recipe does not appear in Safari:

1. Confirm the SourceShelf extension is enabled in Safari.
2. Open SourceShelf once so it can publish the current recipes.
3. Close and reopen the extension popup; a Safari restart should not normally be necessary.
4. If the menu is empty, open **Capture Settings** from the popup and confirm at least Standard or a custom recipe exists.
