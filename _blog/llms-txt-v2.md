# llms.txt v2: A Better Way for AI to Discover Website Knowledge

AI-readable website knowledge is becoming easier to discover.

The `llms.txt` proposal has reached version 2, updating the emerging convention for helping AI assistants and agents find useful, machine-friendly content on websites. If the format is new to you, start with our [introduction to llms.txt](what-is-llms-txt.md).

The original proposal introduced a simple idea: give a website a small Markdown index that explains what the site contains and points AI systems toward its most useful resources.

Version 2 keeps that simplicity, but addresses one of the biggest practical problems with the original proposal:

**How does an AI agent know that an `llms.txt` file—or a clean Markdown version of a page—even exists?**

The answer is better discovery.

And SourceShelf 1.0.2 already supports the new `llms.txt` v2 workflow, making it possible to discover, preview, select, import, organize, and preserve AI-friendly website knowledge directly from Safari.

## Why llms.txt needed a version 2

When `llms.txt` was first proposed in 2024, AI agents routinely reading websites was still largely an expectation about where the web was heading.

That changed quickly.

AI coding assistants now consult documentation while working. Search-enabled assistants retrieve web pages to answer questions. Agents increasingly need to locate specific information within websites rather than simply display those sites to a person.

The [official llms.txt v2 change log](https://llmstxt.org/changes.html) notes that thousands of sites now publish an `llms.txt` file, documentation platforms generate them automatically, and major AI providers publish them for their own developer documentation.

Version 2 reflects what was learned from that adoption.

It does not reinvent the basic format or make version 1 stop working. Instead, it makes `llms.txt` easier to discover and clarifies how agents should use it.

## 1. Websites can explicitly advertise their llms.txt

The most important addition in v2 is discoverability.

Previously, a tool that wanted to find an `llms.txt` file often had to try a predictable location such as:

```text
/llms.txt
```

That conventional URL remains useful, but trying a known location is not the same as the website explicitly declaring a relationship.

Version 2 recommends using the standard HTML relationship:

```html
<link rel="describedby" href="/llms.txt">
```

A website can use this to tell compatible software:

**This is the llms.txt file that describes this page.**

The same information can be provided through an HTTP `Link` header, which means websites, documentation systems, CDNs, and other infrastructure can expose the relationship without modifying the visible page.

Instead of requiring an AI tool to probe a website for special files, the website can declare its AI-readable knowledge directly.

## 2. Pages can advertise a clean Markdown version

`llms.txt` is useful as an index, but the detailed information usually lives in the pages it references.

The problem is that normal web pages contain much more than their primary content.

Navigation, menus, scripts, styling, cookie controls, advertising, interactive components, and other interface elements all make sense in a browser. They are not necessarily the best representation for an AI system trying to understand the underlying information.

Version 2 therefore formalizes another discovery relationship:

```html
<link
  rel="alternate"
  type="text/markdown"
  href="/docs/example.md">
```

This tells compatible software that the page has a Markdown representation available.

An AI agent can therefore encounter a normal web page while also discovering a cleaner, more concise representation of the same information.

That can mean less extraction, less irrelevant material, and fewer tokens spent reconstructing content that the publisher has already made available in a machine-friendly form.

![A side-by-side diagram contrasts trying the conventional /llms.txt location with a page explicitly declaring its describedby index and alternate Markdown representation.](/assets/blog/en/llms-txt-v2-discovery.svg)

## 3. Markdown URLs are more flexible

The original proposal suggested producing Markdown versions of pages by appending `.md` to the existing URL.

For example:

```text
guide.html
guide.html.md
```

In practice, some publishing systems instead replace the original extension:

```text
guide.html
guide.md
```

Version 2 recognizes both approaches.

This might look like a minor compatibility change, but it reflects an important principle behind the updated proposal: `llms.txt` is adapting to conventions that developers and publishing systems already use rather than forcing every site into one URL structure.

## 4. llms.txt can describe part of a website

Another particularly useful clarification is **path scoping**.

An `llms.txt` file does not need to describe an entire domain. For example:

```text
/llms.txt
/docs/llms.txt
/api/llms.txt
```

can describe different parts of the same site.

An `llms.txt` file applies to pages below its own path, and when more than one index could apply, the most specific one takes precedence.

That means:

```text
/docs/llms.txt
```

can describe the documentation section without needing to represent the rest of the website.

This is useful for large organizations, documentation platforms, hosted projects, universities, software products, and any site where different areas contain distinct collections of knowledge.

It also makes discovery more precise. An AI agent reading API documentation does not necessarily need the marketing pages, company news, careers section, and everything else published on the same domain.

A scoped `llms.txt` can guide it toward the knowledge that is actually relevant.

![A site tree shows a root llms.txt for the broader site, plus more specific llms.txt files inside the docs and API paths.](/assets/blog/en/llms-txt-v2-path-scoping.svg)

## 5. Agents are expected to retrieve what they need

Version 2 also clarifies an important misconception about `llms.txt`.

The goal is not necessarily to concatenate an entire website and feed it into an AI model.

Instead, the `llms.txt` file acts as a map.

An agent can read or search the relatively small index, determine which resources are relevant to the current task, and then retrieve those resources as needed.

Conceptually, the workflow becomes:

```text
Question
   ↓
llms.txt
   ↓
Find relevant sources
   ↓
Retrieve only those sources
   ↓
Use them as context
```

This is a much more scalable model than treating every available document as context for every question.

It also resembles the way good research works: start with an organized collection, identify the relevant sources, then examine those sources in detail.

## 6. “Optional” is a convention, not a processing rule

Earlier versions of the proposal gave the `## Optional` section a special role when expanding an `llms.txt` collection into model context.

Version 2 removes that mechanical meaning.

An Optional section can still identify secondary material that an agent might skip when a smaller collection is preferable, but agents are no longer expected to treat it as a special processing instruction.

That makes the format simpler.

The index describes and organizes knowledge. The agent decides which knowledge is relevant to the task.

## llms.txt is part of a broader AI-readable web

These changes are arriving as the web begins adapting more deliberately to AI agents.

Chrome’s experimental Agentic Browsing work in Lighthouse, for example, now includes [an llms.txt discoverability audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt).

That does not make `llms.txt` a universal web standard, nor does publishing one guarantee that every AI system will use it.

It does show that AI-readable content is moving beyond an interesting experiment.

Website creators are increasingly considering not only how information appears to people and search engines, but also how software agents can reliably discover and understand it.

`llms.txt` offers a deliberately simple approach to that problem.

## SourceShelf 1.0.2 supports llms.txt v2

SourceShelf treats `llms.txt` as more than a file to view.

Version 1.0.2 expands the workflow into Safari, allowing a compatible website’s `llms.txt` collection to become the starting point for a local research Pack. The [SourceShelf llms.txt guide](/docs/guides/llms-txt/) documents the complete discovery order, selection workflow, safeguards, and provenance that the app preserves.

When SourceShelf discovers an available collection, you can preview what the site provides, choose the sources you actually want, and import that selection into SourceShelf.

![Safari displays a synthetic research website while the real SourceShelf extension previews a discovered llms.txt collection for import.](/assets/blog/en/llms-txt-v2-safari-discovery.webp)

This is an important distinction.

A website might expose dozens—or eventually hundreds—of resources through `llms.txt`. Your research project may need only five.

SourceShelf lets the site’s index help with discovery without requiring the entire collection to become part of your working context.

![The SourceShelf collection review uses the shipping extension interface with twelve realistic resources and only six selected for import.](/assets/blog/en/llms-txt-v2-source-selection.webp)

## From website collection to local research Pack

A typical workflow can look like this:

1. Visit a website in Safari.
2. Open the SourceShelf extension.
3. Discover the site’s available `llms.txt` collection.
4. Preview the resources it exposes.
5. Select the sources relevant to your research.
6. Import them into a new or existing SourceShelf Pack.
7. Review and organize the resulting collection locally.
8. Export or share the Pack using the format appropriate for your AI workflow.

Once imported, those sources are no longer just a collection of browser tabs.

They become part of an organized research project that can preserve source order, metadata, provenance, archived assets, and other information needed to move the research between workflows.

![The actual SourceShelf three-column interface shows a finished synthetic research Pack with llms.txt resources, other documents, and website-import provenance.](/assets/blog/en/llms-txt-v2-sourceshelf-pack.webp)

## llms.txt and local-first research

There is an important difference between **discovering** information and **owning your research collection**.

`llms.txt` helps with the first problem.

It gives publishers a way to describe useful knowledge and helps compatible software find it.

SourceShelf addresses the second.

It lets you choose which sources matter, preserve them as a research Pack, combine them with your own PDFs, documents, notes, scans, and other material, and then decide how that collection should be used.

The website remains the publisher.

The `llms.txt` file remains the guide.

Your SourceShelf Pack becomes your research collection.

## One collection, multiple AI workflows

An `llms.txt` import does not have to remain an `llms.txt` collection forever.

Once the relevant knowledge is organized in SourceShelf, the same Pack can participate in different workflows.

You might preserve it as a portable research archive, export Markdown for another application, create an [AI-oriented reference package](/local-ai-reference-packs/), or expose a selected Pack to a compatible AI client through SourceShelf’s local, read-only MCP integration.

That separation between **collecting knowledge** and **choosing an AI tool** is intentional.

Useful research should not become permanently tied to whichever AI product happened to help collect it.

Markdown, provenance, portable packages, and open interfaces provide a way to keep the research useful even as AI tools change.

## What llms.txt v2 does not do

It is equally important to understand what the proposal does not claim to solve.

`llms.txt` is not a replacement for `robots.txt`.

It is not a replacement for a sitemap.

It does not guarantee that an AI provider will index a website.

It does not grant an AI system permission to access otherwise restricted content.

And it does not automatically make information trustworthy simply because it is written in Markdown.

Its purpose is much narrower:

**help an AI system discover and navigate useful website knowledge more deliberately.**

That simplicity is part of what makes the format interesting.

## A small change with a bigger implication

The most significant part of `llms.txt` v2 may not be any individual syntax change.

It is the change in assumption behind the proposal.

In 2024, the question was whether AI systems might regularly need websites presented in a more usable form.

In 2026, agents reading documentation, searching websites, writing software, gathering research, and answering questions from online sources are already normal.

The question is increasingly becoming:

**How should websites make their knowledge discoverable to them?**

Version 2 provides a better answer than version 1.

A small Markdown index can describe the important knowledge.

Standard web relationships can make that index discoverable.

Clean Markdown can provide agent-friendly versions of individual pages.

Path scoping can keep large sites organized.

And agents can retrieve only the information relevant to the task at hand.

With SourceShelf 1.0.2, that same structure can also become the beginning of a private, portable research workflow—starting on the web and continuing on your own devices.

The AI-readable web is still evolving.

But with `llms.txt` v2, it is becoming much easier to find.
