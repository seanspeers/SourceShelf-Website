import Foundation
import Translation

private struct LandingLocale {
    let code: String
    let translationCode: String
    let nativeName: String
}

private let landingLocales = [
    LandingLocale(code: "fr", translationCode: "fr", nativeName: "Français"),
    LandingLocale(code: "es-419", translationCode: "es-419", nativeName: "Español (Latinoamérica)"),
    LandingLocale(code: "pt-BR", translationCode: "pt-BR", nativeName: "Português (Brasil)"),
    LandingLocale(code: "ja", translationCode: "ja", nativeName: "日本語"),
]

private let protectedTerms = [
    "Model Context Protocol",
    "read_pack_resource",
    "search_pack",
    "SourceShelf",
    "Markdown",
    "llms.txt",
    "MCP",
    "RAG",
    "OKF",
]

private let preservedKeys: Set<String> = [
    "id",
    "route",
    "campaignKey",
    "layout",
    "kind",
    "image",
    "previewImage",
    "video",
    "poster",
    "captions",
    "page",
    "related",
    "code",
]

private struct TranslatableValue {
    let path: [AnyHashable]
    let source: String
}

@main
@available(macOS 26.4, *)
private struct GenerateLandingPageTranslations {
    static func main() async throws {
        guard CommandLine.arguments.count == 2 else {
            fputs("Usage: GenerateLandingPageTranslations <site-root>\n", stderr)
            exit(64)
        }

        let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true).standardizedFileURL
        let contentRoot = root.appendingPathComponent("_site/landing-pages", isDirectory: true)
        let englishURL = contentRoot.appendingPathComponent("en.json")
        let data = try Data(contentsOf: englishURL)
        let english = try JSONSerialization.jsonObject(with: data)
        let values = collectTranslatableValues(from: english)

        for locale in landingLocales {
            let translated = try await translate(values, to: locale)
            var document = english
            for (index, value) in values.enumerated() {
                document = replacingValue(in: document, at: value.path, with: translated[index])
            }
            if var rootDocument = document as? [String: Any] {
                rootDocument["code"] = locale.code
                rootDocument["nativeName"] = locale.nativeName
                document = rootDocument
            }
            try writeJSON(document, to: contentRoot.appendingPathComponent("\(locale.code).json"))
        }
    }

    private static func collectTranslatableValues(from value: Any, path: [AnyHashable] = []) -> [TranslatableValue] {
        if let dictionary = value as? [String: Any] {
            return dictionary.keys.sorted().flatMap { key -> [TranslatableValue] in
                guard !preservedKeys.contains(key), let child = dictionary[key] else { return [] }
                return collectTranslatableValues(from: child, path: path + [key])
            }
        }
        if let array = value as? [Any] {
            return array.enumerated().flatMap { index, child in
                collectTranslatableValues(from: child, path: path + [index])
            }
        }
        if let string = value as? String, !string.isEmpty {
            return [TranslatableValue(path: path, source: string)]
        }
        return []
    }

    private static func translate(_ values: [TranslatableValue], to locale: LandingLocale) async throws -> [String] {
        let session = TranslationSession(
            installedSource: Locale.Language(identifier: "en"),
            target: Locale.Language(identifier: locale.translationCode),
            preferredStrategy: .highFidelity
        )
        let protected = values.map { protectTerms(in: $0.source) }
        let requests = protected.enumerated().map { index, source in
            TranslationSession.Request(sourceText: source, clientIdentifier: String(index))
        }
        var translatedByIndex: [Int: String] = [:]

        for batchStart in stride(from: 0, to: requests.count, by: 100) {
            let batchEnd = min(batchStart + 100, requests.count)
            for try await response in session.translate(batch: Array(requests[batchStart..<batchEnd])) {
                guard let identifier = response.clientIdentifier, let index = Int(identifier) else {
                    throw NSError(domain: "SourceShelfLandingLocalization", code: 1, userInfo: [
                        NSLocalizedDescriptionKey: "A translation response was missing its source identifier.",
                    ])
                }
                translatedByIndex[index] = restoreTerms(in: response.targetText)
            }
            print("\(locale.code): translated \(batchEnd)/\(requests.count) landing-page strings")
            fflush(stdout)
        }

        return values.indices.map { translatedByIndex[$0] ?? values[$0].source }
    }

    private static func protectTerms(in source: String) -> String {
        var output = source
        for (index, term) in protectedTerms.enumerated() {
            output = output.replacingOccurrences(of: term, with: "ZXQTERM\(index)ZXQ")
        }
        return output
    }

    private static func restoreTerms(in source: String) -> String {
        var output = source
        for (index, term) in protectedTerms.enumerated() {
            output = output.replacingOccurrences(of: "ZXQTERM\(index)ZXQ", with: term)
            output = output.replacingOccurrences(of: "ZXQ TERM \(index) ZXQ", with: term)
        }
        return output
    }

    private static func replacingValue(in value: Any, at path: [AnyHashable], with replacement: String) -> Any {
        guard let head = path.first else { return replacement }
        let tail = Array(path.dropFirst())
        if let key = head as? String, var dictionary = value as? [String: Any] {
            if let child = dictionary[key] {
                dictionary[key] = replacingValue(in: child, at: tail, with: replacement)
            }
            return dictionary
        }
        if let index = head as? Int, var array = value as? [Any], array.indices.contains(index) {
            array[index] = replacingValue(in: array[index], at: tail, with: replacement)
            return array
        }
        return value
    }

    private static func writeJSON(_ value: Any, to url: URL) throws {
        let data = try JSONSerialization.data(withJSONObject: value, options: [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes])
        var output = data
        output.append(0x0A)
        try output.write(to: url, options: .atomic)
    }
}
