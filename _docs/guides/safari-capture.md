# Capture from Safari

The SourceShelf Safari extension saves the current page, main content, a selection, a selected page area, or a basket of research highlights as local Markdown.

It can also acquire several tabs from the current Safari window into one new or existing research pack. Website bytes are fetched and rendered in the extension process; the native app receives only bounded, locally staged capture payloads and never acts as a general-purpose web client.

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

## Capture the current window

Open SourceShelf in Safari, choose **Research > Capture Current Window**, and review the tabs Safari reports for the window where you invoked the extension. Unsupported pages such as Safari settings, extension pages, local files, and other non-HTTP(S) URLs remain visible but cannot be selected.

Select the useful tabs, choose one destination, then start the capture. The destination can be a locale-aware new pack such as `Safari Research — Aug 11, 2026` or a recently used existing pack. SourceShelf keeps the selected tab order, continues past individual failures, creates no empty pack when everything fails, and gives every saved item a fresh local identity.

The quick single-page actions are unchanged. Batch capture uses the same readability, Markdown rendering, recipe, staged-image, history, and output-folder pipeline rather than maintaining a second converter.

## Website access and security

Safari controls website access for the extension and may show its permission prompt as soon as you click the SourceShelf toolbar button. The timing and wording of that system prompt belong to Safari. If you deny access, enable it later in Safari’s extension settings and reopen SourceShelf.

For batch work, SourceShelf asks Safari only for the HTTP(S) origins needed by the selected tabs or `llms.txt` resources. It does not declare permanent access to every website. The review screen distinguishes available, access-needed, and unsupported sources before acquisition starts.

Remote bytes and images are acquired by the Safari extension under Safari’s website-permission model. Redirects are revalidated, unsafe schemes are rejected, and staged files cross the existing App Group/native-messaging boundary. The native app has no outbound-network entitlement and does not use `URLSession` for Safari acquisition.

## Limits, cancellation, and failures

Acquisition uses at most three concurrent sources. A response may be at most 8 MiB, the operation may stage at most 256 MiB, each source may archive at most 100 images, redirects stop after five hops, and a request times out after 20 seconds. A bounded review shows at most 1,000 `llms.txt` entries and discovery probes at most 12 candidates.

You can cancel while remote work is in progress. SourceShelf aborts outstanding requests, removes temporary staged data, and preserves only work already accepted for local processing. Individual permission, timeout, redirect, HTTP, parse, extraction, and size failures do not discard successful siblings.

## Safari tab groups and browser limitations

Current-window capture uses the public WebExtensions query `tabs.query({ currentWindow: true })`. Safari’s public WebExtensions API does not expose a documented Tab Group identifier or membership query, so SourceShelf does not label this feature “Capture Tab Group” or claim it can distinguish the active group from other tabs Safari exposes for that window.

The exact set is therefore Safari-defined and can vary with Safari releases and window state. Pages Safari does not allow an extension to read remain unavailable. HTTP `Link` headers and manual redirect responses are also subject to the headers Safari exposes to extensions. A signed extension should be used to verify those cases against the Safari versions you ship.

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
5. If Safari keeps asking for website access or the popup cannot read the page, review SourceShelf under **Safari > Settings > Extensions** and grant access for that website before trying again.
