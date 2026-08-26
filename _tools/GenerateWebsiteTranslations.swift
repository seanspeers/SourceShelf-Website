import Foundation
import Translation

private struct WebsiteLocale {
    let code: String
    let translationCode: String
    let nativeName: String
}

private let websiteLocales = [
    WebsiteLocale(code: "fr", translationCode: "fr", nativeName: "Français"),
    WebsiteLocale(code: "es-419", translationCode: "es-419", nativeName: "Español (Latinoamérica)"),
    WebsiteLocale(code: "pt-BR", translationCode: "pt-BR", nativeName: "Português (Brasil)"),
    WebsiteLocale(code: "ja", translationCode: "ja", nativeName: "日本語"),
]

private let sharedStrings = [
    "Skip to content",
    "Main navigation",
    "Home",
    "Blog",
    "Privacy",
    "Documentation",
    "Support",
    "Download",
    "Download SourceShelf on the App Store",
    "Toggle dark mode",
    "Switch to light mode",
    "Switch to dark mode",
    "Language",
    "Select language",
    "Documentation Home",
    "Getting Started",
    "Mac Guides",
    "iPhone & iPad",
    "Local AI Access",
    "Reference",
    "Breadcrumb",
    "On this page",
    "Previous",
    "Next",
    "Documentation pages",
    "Browse documentation",
    "Mobile documentation navigation",
    "Documentation sidebar",
    "Documentation navigation",
    "Mobile table of contents",
    "Table of contents",
    "Page contents",
    "SourceShelf Documentation",
    "SourceShelf processes theme and language preferences locally in your browser. These preferences are not used for tracking and are never sent to SourceShelf.",
]

@main
@available(macOS 26.4, *)
private struct GenerateWebsiteTranslations {
    static func main() async throws {
        guard CommandLine.arguments.count == 2 else {
            fputs("Usage: GenerateWebsiteTranslations <site-root>\n", stderr)
            exit(64)
        }

        let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true).standardizedFileURL
        let templateRoot = root.appendingPathComponent("_site/templates", isDirectory: true)
        let outputRoot = root.appendingPathComponent("_site/locales", isDirectory: true)
        let templateNames = ["index.html", "privacy.html", "support.html"]
        var strings = Set(sharedStrings)

        for name in templateNames {
            let source = try String(contentsOf: templateRoot.appendingPathComponent(name), encoding: .utf8)
            extractWebsiteStrings(from: source).forEach { strings.insert($0) }
        }

        strings.remove("SourceShelf")
        strings.remove("support@sourceshelf.app")
        let orderedStrings = strings.sorted()
        try FileManager.default.createDirectory(at: outputRoot, withIntermediateDirectories: true)

        let english = localeDocument(
            code: "en",
            nativeName: "English",
            translations: Dictionary(uniqueKeysWithValues: orderedStrings.map { ($0, $0) })
        )
        try writeJSON(english, to: outputRoot.appendingPathComponent("en.json"))

        for locale in websiteLocales {
            let session = TranslationSession(
                installedSource: Locale.Language(identifier: "en"),
                target: Locale.Language(identifier: locale.translationCode),
                preferredStrategy: .highFidelity
            )
            let requests = orderedStrings.enumerated().map { index, value in
                TranslationSession.Request(sourceText: value, clientIdentifier: String(index))
            }
            var translatedByIndex: [Int: String] = [:]

            for batchStart in stride(from: 0, to: requests.count, by: 100) {
                let batchEnd = min(batchStart + 100, requests.count)
                for try await response in session.translate(batch: Array(requests[batchStart..<batchEnd])) {
                    guard let identifier = response.clientIdentifier, let index = Int(identifier) else {
                        throw NSError(domain: "SourceShelfWebsiteLocalization", code: 1, userInfo: [
                            NSLocalizedDescriptionKey: "A translation response was missing its source identifier.",
                        ])
                    }
                    translatedByIndex[index] = response.targetText
                }
                print("\(locale.code): translated \(batchEnd)/\(requests.count) website strings")
                fflush(stdout)
            }

            let translations = Dictionary(uniqueKeysWithValues: orderedStrings.enumerated().map { index, source in
                (source, translatedByIndex[index] ?? source)
            })
            let document = localeDocument(code: locale.code, nativeName: locale.nativeName, translations: translations)
            try writeJSON(document, to: outputRoot.appendingPathComponent("\(locale.code).json"))
        }
    }

    private static func extractWebsiteStrings(from html: String) -> [String] {
        var values = Set<String>()
        let searchRanges: [String] = [
            firstMatch(#"<main\b[\s\S]*?</main>"#, in: html) ?? "",
            firstMatch(#"<head\b[\s\S]*?</head>"#, in: html) ?? "",
        ]

        if let body = searchRanges.first {
            captureValues(#">([^<]+)<"#, in: body).forEach { addCandidate($0, to: &values) }
            captureValues(#"\b(?:aria-label|alt|title)=\"([^\"]+)\""#, in: body).forEach { addCandidate($0, to: &values) }
        }

        if searchRanges.count > 1 {
            captureValues(#"<title>([^<]+)</title>"#, in: searchRanges[1]).forEach { addCandidate($0, to: &values) }
            captureValues(#"<meta\s+(?:name|property)=\"(?:description|og:title|og:description|twitter:title|twitter:description)\"\s+content=\"([^\"]+)\""#, in: searchRanges[1]).forEach { addCandidate($0, to: &values) }
        }

        return Array(values)
    }

    private static func addCandidate(_ candidate: String, to values: inout Set<String>) {
        let value = candidate.replacingOccurrences(of: #"\s+"#, with: " ", options: .regularExpression)
            .trimmingCharacters(in: .whitespacesAndNewlines)
        guard value.range(of: #"[A-Za-z]"#, options: .regularExpression) != nil,
              value.range(of: #"^https?://"#, options: .regularExpression) == nil else { return }
        values.insert(value)
    }

    private static func captureValues(_ pattern: String, in source: String) -> [String] {
        guard let expression = try? NSRegularExpression(pattern: pattern) else { return [] }
        return expression.matches(in: source, range: NSRange(source.startIndex..<source.endIndex, in: source)).compactMap { match in
            guard match.numberOfRanges > 1, let range = Range(match.range(at: 1), in: source) else { return nil }
            return String(source[range])
        }
    }

    private static func firstMatch(_ pattern: String, in source: String) -> String? {
        guard let expression = try? NSRegularExpression(pattern: pattern),
              let match = expression.firstMatch(in: source, range: NSRange(source.startIndex..<source.endIndex, in: source)),
              let range = Range(match.range, in: source) else { return nil }
        return String(source[range])
    }

    private static func localeDocument(code: String, nativeName: String, translations: [String: String]) -> [String: Any] {
        [
            "code": code,
            "nativeName": nativeName,
            "translations": translations,
        ]
    }

    private static func writeJSON(_ value: [String: Any], to url: URL) throws {
        let data = try JSONSerialization.data(withJSONObject: value, options: [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes])
        var output = data
        output.append(0x0A)
        try output.write(to: url, options: .atomic)
    }
}
