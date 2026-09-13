# Siri AI Meets SourceShelf in iOS 27 and macOS 27

iOS 27 and macOS 27 bring two changes that matter for SourceShelf users: a stronger model inside **Ask This Pack**, and a broader system architecture for discovering research through **Siri AI**.

In our macOS 27 testing, Ask This Pack produced more complete answers, followed instructions more closely, and handled citations more reliably with the same SourceShelf retrieval code and prompts.

At the system level, Apple’s new Siri AI architecture gives apps a supported route to make their content discoverable through Spotlight and App Intents. For SourceShelf, that creates a path from intentionally organized research to systemwide discovery.

These are complementary capabilities. **Ask This Pack focuses on a Pack you choose. Siri AI can discover app content made available to Apple’s system index.** The Siri workflow described here is an integration opportunity, rather than a claim that every SourceShelf Pack is already available to Siri.

## Ask This Pack gets a better brain

SourceShelf’s Ask This Pack feature separates retrieval from generation.

When you ask a question, SourceShelf searches the selected Pack, builds a bounded set of relevant evidence, and asks Apple’s on-device Foundation Model to answer from that material. The model does not need to know your research in advance: SourceShelf supplies the sources it needs.

That architecture allows improvements to Apple’s system model to benefit SourceShelf without replacing its retrieval engine or moving your research to another AI service.

Apple’s [Foundation Models updates](https://developer.apple.com/documentation/updates/foundationmodels) confirm that iOS 27, iPadOS 27, macOS 27, and visionOS 27 include an updated on-device `SystemLanguageModel`, with better instruction following and results in complex scenarios. Apple advises developers to retest their prompts after the operating-system upgrade because the underlying model changes.

We did.

## The same SourceShelf build, better answers

We reran our ten-question **Japan Adventure** Ask This Pack benchmark on macOS 27. The SourceShelf application code, Pack, questions, retrieval architecture, and prompts were unchanged. The operating-system upgrade brought Apple’s updated Foundation Model, alongside other system changes.

The run passed **all 10 retrieval, grounding, and citation checks**. That is a pass rate for this specific benchmark, not a claim that every answer was exhaustive or error-free.

All nine questions supported by the Pack produced answers with valid citations. The deliberately unsupported question about Hokkaido correctly abstained at the retrieval stage, without invoking Apple’s model.

Several previously difficult answers improved substantially:

- The itinerary included all ten days.
- The Hakone answer preserved every stage of the journey and both weather contingencies.
- Temple recommendations included concrete priorities and timing.
- Answers about lodging, rail travel, budgeting, food, and conflicting sources were accurate and useful.

There were still omissions. An exhaustive reservation checklist missed one luggage-measurement item and repeated a dietary-note item. A food answer overlooked an optional Day 6 recommendation. Citations and source inspection remain useful even when the overall answer is good.

### Performance on macOS 27

| Metric | macOS 27 result |
| --- | ---: |
| Average retrieval | 0.506 s |
| Average time to first text | 1.127 s |
| Median generation | 5.541 s |
| Average generation | 7.565 s |

The two most exhaustive questions, covering the complete itinerary and reservation checklist, each took roughly 15 seconds to generate. That extra time produced substantially more complete answers.

These are SourceShelf’s internal test results. This is not a controlled macOS 26 versus macOS 27 comparison: we can no longer rerun the earlier operating system on the same machine, and an OS upgrade can change more than the model. The results are consistent with Apple’s documented model improvements, but do not isolate their contribution from every other system change.

The practical observation is still useful: **the same SourceShelf evidence pipeline produced substantially better answers on macOS 27.** You can see the underlying research workflow in our [Japan trip planning example](/examples/japan-trip-ai-planner/).

## Hybrid retrieval still matters

One result highlighted why SourceShelf combines semantic and lexical retrieval.

For a question about conflicting information, Core Spotlight rejected the semantic-search branch as unsafe. SourceShelf’s lexical path still found the correct evidence, and the final answer remained accurate.

Semantic retrieval finds related ideas even when the wording differs. Lexical retrieval helps with exact names, dates, phrases, and identifiers, and provides another route when semantic search fails. In this run, having both paths kept one rejected search from becoming a failed answer.

Apple’s WWDC26 session, [LLM search using Core Spotlight](https://developer.apple.com/videos/play/wwdc2026/246/), demonstrates connecting indexed content to the Foundation Models framework through tool calling. It also explains how metadata and retrieval design affect the quality of grounded responses.

A stronger model helps with the final answer. Retrieval still determines which evidence it receives.

## Siri AI changes what Spotlight means

The second change happens outside Ask This Pack.

Apple’s [introduction to Siri AI](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) describes a rebuilt assistant that combines language models with personal context, onscreen awareness, and system capabilities including Spotlight and App Toolbox. Personal context can extend to third-party apps when developers integrate with Spotlight.

Apps can represent their content as **App Entities** and contribute it to Spotlight’s semantic index. Apple Intelligence can then find that content when someone describes what they need, even when the wording does not match the title exactly. Apple documents this in [Apple Intelligence and Siri AI](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai) and [Making app entities available in Spotlight](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight).

That creates a natural connection with SourceShelf’s structured research collections.

## From a Pack to Siri’s personal context

SourceShelf turns PDFs, webpages, scans, notes, presentations, spreadsheets, and other research into focused Packs. A Pack can also be exported as an **Open Knowledge Format (OKF) v0.2 bundle**, containing readable Markdown and structured information about its sources.

Our [guide to Open Knowledge Format](what-is-open-knowledge-format-okf.md) explains how Markdown, metadata, provenance, and an index keep that knowledge portable. The [OKF specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) describes the format itself.

Apple’s architecture provides another possible use for that same organized knowledge.

![A SourceShelf Pack branches to Ask This Pack for local answers, an OKF bundle for portable export, and a potential Siri AI integration through App Entities and Spotlight. The Siri branch requires app integration.](/assets/blog/en/siri-ai-knowledge-paths.svg)

The diagram shows a conceptual integration path. **Siri does not need to become an OKF parser, and exporting a ZIP does not automatically add it to Siri’s personal context.**

Instead, SourceShelf can use its knowledge of the Pack and its OKF-compatible structure to represent useful content as App Entities. With the appropriate Spotlight and App Intents integration, those entities can become discoverable by the system. An OKF export and a Spotlight index are separate outputs from the underlying collection; exporting an OKF file is not a prerequisite for indexing app content.

Apple’s [WWDC26 iOS guide](https://developer.apple.com/wwdc26/guides/ios/) explains that entity schemas contribute app content to the semantic index, where Siri can surface it with attribution to the originating app.

**The knowledge stays portable. The index is another way to use it.**

## Focused answers and systemwide discovery

Ask This Pack and Siri AI serve different needs.

With **Ask This Pack**, you choose the collection. SourceShelf retrieves evidence from that Pack and returns grounded answers with citations. When the Pack lacks sufficient evidence, SourceShelf can abstain rather than broaden the search to unrelated information.

For example:

> What does my Japan Pack say I need to reserve before arriving in Hakone?

With **Siri AI**, appropriately indexed SourceShelf content could be found from a system-level request, without first opening a Pack or remembering a document’s exact title.

The distinction is focused reasoning versus systemwide discovery. A Pack remains the collection you organize; Siri offers a potential way to find the content made available to it.

## Local-first, with precise privacy boundaries

Ask This Pack uses Apple’s on-device Foundation Model on supported devices. SourceShelf retrieves evidence locally and does not send a Pack to a SourceShelf server.

Spotlight is also an on-device system capability. Apple describes Siri AI’s system orchestrator using Spotlight and App Toolbox locally, while Siri’s language-model processing can run on device or through Private Cloud Compute. These execution boundaries differ from Ask This Pack’s on-device workflow. See Apple’s [Siri AI architecture announcement](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/) for that distinction.

Making content discoverable to Siri should therefore not be described as a guarantee that every Siri request stays on the device. It also does not require turning SourceShelf into a cloud knowledge service: the Library, converted Markdown, Pack structure, exports, and SourceShelf retrieval pipeline remain under the user’s control.

## Why open knowledge becomes more valuable

Operating-system AI is changing quickly. That makes portable knowledge more useful.

An OKF-compatible SourceShelf Pack preserves readable Markdown, metadata, provenance, relationships between sources, and an index of the collection. SourceShelf can use it with Ask This Pack, export it to another compatible tool, or use its structured content as the basis for a system integration.

The durable part is the research you collected and organized. A new model should improve how you use that knowledge without forcing you to rebuild it.

Apple’s Foundation Model can change. Siri can change. Your research does not have to.

## Availability and what to expect

Apple’s [September announcement](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/) says Siri AI begins rolling out with iOS 27 **as a beta on September 14, 2026**, for supported devices set to English. For macOS 27 features and compatibility, see Apple’s [macOS overview](https://www.apple.com/os/macos/).

Apple Intelligence requires supported hardware, including Apple silicon Macs and qualifying iPhones such as iPhone 15 Pro and later supported models. Feature availability varies by device, language, and region; check Apple’s [Apple Intelligence availability information](https://www.apple.com/apple-intelligence/) for your device.

For Ask This Pack, upgrading a supported device with Apple Intelligence enabled provides access to the updated on-device system model. Our benchmark results here are from macOS 27; they are not separate iPhone measurements or a guarantee of identical performance on every device.

The Siri discovery path also depends on SourceShelf exposing suitable content through Apple’s integration APIs. The operating-system upgrade alone does not make every Pack available to Siri.

## One Pack, several ways to use it

SourceShelf started with a simple idea: research should remain useful after you save it.

A focused Pack can be something you read, something Ask This Pack reasons over privately, something you export as an open OKF bundle, and something another compatible tool can search. Siri AI’s semantic indexing architecture creates an additional route for discovering selected app content.

The AI layer can keep improving while the underlying collection stays open, structured, local, and reusable.

## Official sources

- [Foundation Models updates — Apple Developer](https://developer.apple.com/documentation/updates/foundationmodels): the updated on-device model and prompt retesting guidance.
- [Apple introduces Siri AI — Apple Newsroom](https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/): personal context, system architecture, and privacy boundaries.
- [Apple Intelligence and Siri AI — Apple Developer](https://developer.apple.com/documentation/appintents/apple-intelligence-and-siri-ai): how app content and actions connect to Apple Intelligence.
- [Making app entities available in Spotlight — Apple Developer](https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight): indexing entities for system discovery.
- [LLM search using Core Spotlight — WWDC26](https://developer.apple.com/videos/play/wwdc2026/246/): retrieval, tool calling, and metadata quality.
- [WWDC26 iOS guide — Apple Developer](https://developer.apple.com/wwdc26/guides/ios/): entity schemas and attribution to the originating app.
- [September iPhone announcement — Apple Newsroom](https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/): Siri AI’s September 14 beta rollout.
