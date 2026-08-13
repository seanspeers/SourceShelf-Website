# Capture from Safari on iPhone and iPad

The SourceShelf Safari extension captures authorized web research and hands it to the local SourceShelf library. Safari—not SourceShelf—controls which websites the extension can access.

## Enable the extension

You can open SourceShelf **Settings > Safari Extension** and use **Enable Safari Extension…** when the direct settings link is available. Manual setup is:

1. Open the system **Settings** app.
2. On iOS or iPadOS 18 and later, choose **Apps > Safari > Extensions**. On iOS or iPadOS 17, choose **Safari > Extensions**.
3. Select SourceShelf and turn on **Allow Extension**.
4. Choose the website access you want Safari to allow.

Settings in Safari remain the source of truth for normal and Private Browsing profiles.

## Website-access prompts

Safari may show its website-access prompt as soon as you tap the SourceShelf toolbar extension. This is expected system behavior; SourceShelf cannot suppress or replace the prompt. Grant the access required for the page you want to capture.

For a multi-site `llms.txt` collection or several tabs, the review can mark some sources **Access needed**. On iPhone and iPad, open each listed website, allow SourceShelf in Safari, then reopen the review to refresh it. If Safari repeatedly asks or the page remains unavailable, review SourceShelf’s website access in Safari settings instead of repeatedly pressing the popup action.

## Capture a page

Open a normal HTTP(S) page, tap Safari’s extensions control, and choose SourceShelf. The popup can save the page, its main content, selected text, a selected area, or an ordered set of research highlights. Interactive actions require a compatible page and, for selection-based capture, an actual selection.

Single-page capture saves into **All Research**. SourceShelf archives eligible referenced images within its normal limits so the saved result can be read offline.

## Capture the current Safari window

Choose **Research > Capture Current Window**. SourceShelf reviews the tabs Safari reports for the window where the extension was opened. Select the useful tabs, choose a new or existing pack, and begin capture.

Unsupported or inaccessible pages remain visible but cannot be selected. SourceShelf preserves the selected Safari order, continues when an individual page fails, and does not create an empty pack when every selected page fails. The exact tabs available are determined by Safari and can vary with window, Tab Group, permission, and operating-system state.

## Import a website llms.txt collection

On a website, choose **Research > Import via llms.txt**. SourceShelf looks for an applicable index using declared discovery links and progressively broader `llms.txt` paths up to the site root. It previews the ordered sections and listed resources; it does not crawl unrelated page links.

Select the resources you want and choose one new or existing pack. The `llms.txt` index is saved first, followed by successful selected resources in listed order. A failed resource does not discard successful siblings.

## Completion and recovery

The extension stages bounded local handoffs for the containing app. SourceShelf processes them when the app launches or becomes active. If a completed capture does not appear immediately, open SourceShelf and allow it to finish importing the queued handoff.

Canceling remote work stops outstanding extension requests and removes temporary staging where possible. Already accepted local work may finish. SourceShelf never turns the native iPhone or iPad app into a background crawler.
