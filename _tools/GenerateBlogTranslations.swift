import Foundation
import Translation

private struct BlogLocale {
    let code: String
    let translationCode: String
}

private let blogLocales = [
    BlogLocale(code: "fr", translationCode: "fr"),
    BlogLocale(code: "es-419", translationCode: "es-419"),
    BlogLocale(code: "pt-BR", translationCode: "pt-BR"),
    BlogLocale(code: "ja", translationCode: "ja"),
]

private let protectedTerms = [
    "Open Knowledge Format",
    "Markdown Context Pack",
    "AI Reference Pack",
    "OKF v0.2 Bundle ZIP",
    "ChatGPT",
    "SourceShelf",
    "Markdown",
    "llms.txt",
    "Gemini",
    "Claude",
    "Finder",
    "Safari",
    "YAML",
    "OKF",
]

private struct LinkToken {
    let placeholder: String
    let label: String
    let destination: String
}

private struct TranslatableLine {
    let index: Int
    let prefix: String
    let protectedText: String
    let links: [LinkToken]
    let imageDestination: String?
}

@main
@available(macOS 26.4, *)
private struct GenerateBlogTranslations {
    static func main() async throws {
        guard CommandLine.arguments.count == 2 else {
            fputs("Usage: GenerateBlogTranslations <site-root>\n", stderr)
            exit(64)
        }

        let root = URL(fileURLWithPath: CommandLine.arguments[1], isDirectory: true).standardizedFileURL
        let blogRoot = root.appendingPathComponent("_blog", isDirectory: true)
        let sourceURL = blogRoot.appendingPathComponent("what-is-open-knowledge-format-okf.md")
        let source = try String(contentsOf: sourceURL, encoding: .utf8)

        for locale in blogLocales {
            let translated = try await translate(markdown: source, to: locale)
            let outputDirectory = blogRoot
                .appendingPathComponent("locales", isDirectory: true)
                .appendingPathComponent(locale.code, isDirectory: true)
            try FileManager.default.createDirectory(at: outputDirectory, withIntermediateDirectories: true)
            let outputURL = outputDirectory.appendingPathComponent(sourceURL.lastPathComponent)
            try translated.write(to: outputURL, atomically: true, encoding: .utf8)
            print("\(locale.code): wrote \(outputURL.path)")
        }
    }

    private static func translate(markdown: String, to locale: BlogLocale) async throws -> String {
        let sourceLines = markdown.replacingOccurrences(of: "\r\n", with: "\n").split(separator: "\n", omittingEmptySubsequences: false).map(String.init)
        var lines = sourceLines
        var translatable: [TranslatableLine] = []
        var insideFence = false

        for (index, line) in sourceLines.enumerated() {
            if line.hasPrefix("```") {
                insideFence.toggle()
                continue
            }
            if insideFence || line.isEmpty { continue }

            if let image = imageParts(line) {
                let prepared = protect(image.alt, lineIndex: index)
                translatable.append(TranslatableLine(
                    index: index,
                    prefix: "",
                    protectedText: prepared.text,
                    links: prepared.links,
                    imageDestination: image.destination
                ))
                continue
            }

            let parts = lineParts(line)
            let prepared = protect(parts.text, lineIndex: index)
            translatable.append(TranslatableLine(
                index: index,
                prefix: parts.prefix,
                protectedText: prepared.text,
                links: prepared.links,
                imageDestination: nil
            ))
        }

        let session = TranslationSession(
            installedSource: Locale.Language(identifier: "en"),
            target: Locale.Language(identifier: locale.translationCode),
            preferredStrategy: .highFidelity
        )

        var requests: [TranslationSession.Request] = []
        for line in translatable {
            requests.append(TranslationSession.Request(
                sourceText: line.protectedText,
                clientIdentifier: "line:\(line.index)"
            ))
            for (linkIndex, link) in line.links.enumerated() {
                requests.append(TranslationSession.Request(
                    sourceText: protectTerms(in: link.label),
                    clientIdentifier: "link:\(line.index):\(linkIndex)"
                ))
            }
        }

        var responses: [String: String] = [:]
        for batchStart in stride(from: 0, to: requests.count, by: 100) {
            let batchEnd = min(batchStart + 100, requests.count)
            for try await response in session.translate(batch: Array(requests[batchStart..<batchEnd])) {
                if let identifier = response.clientIdentifier {
                    responses[identifier] = response.targetText
                }
            }
            print("\(locale.code): translated \(batchEnd)/\(requests.count) blog segments")
            fflush(stdout)
        }

        for line in translatable {
            var output = responses["line:\(line.index)"] ?? line.protectedText
            for (linkIndex, link) in line.links.enumerated() {
                let translatedLabel = restoreTerms(in: responses["link:\(line.index):\(linkIndex)"] ?? link.label)
                output = replacePlaceholder(link.placeholder, in: output, with: "[\(translatedLabel)](\(link.destination))")
            }
            output = restoreTerms(in: output)
            if locale.code != "ja" {
                output = normalizeLatinSpacing(in: output)
            }

            if let destination = line.imageDestination {
                let localizedDestination = destination.replacingOccurrences(of: "/assets/home/en/", with: "/assets/home/\(locale.code)/")
                lines[line.index] = "![\(output)](\(localizedDestination))"
            } else {
                lines[line.index] = line.prefix + output
            }
        }

        return lines.joined(separator: "\n")
    }

    private static func lineParts(_ line: String) -> (prefix: String, text: String) {
        let patterns = [#"^(#{1,6}\s+)(.*)$"#, #"^([-*+]\s+)(.*)$"#, #"^(\d+\.\s+)(.*)$"#, #"^(>\s?)(.*)$"#]
        for pattern in patterns {
            guard let expression = try? NSRegularExpression(pattern: pattern),
                  let match = expression.firstMatch(in: line, range: NSRange(line.startIndex..<line.endIndex, in: line)),
                  let prefixRange = Range(match.range(at: 1), in: line),
                  let textRange = Range(match.range(at: 2), in: line) else { continue }
            return (String(line[prefixRange]), String(line[textRange]))
        }
        return ("", line)
    }

    private static func imageParts(_ line: String) -> (alt: String, destination: String)? {
        guard let expression = try? NSRegularExpression(pattern: #"^!\[([^\]]+)\]\(([^)]+)\)$"#),
              let match = expression.firstMatch(in: line, range: NSRange(line.startIndex..<line.endIndex, in: line)),
              let altRange = Range(match.range(at: 1), in: line),
              let destinationRange = Range(match.range(at: 2), in: line) else { return nil }
        return (String(line[altRange]), String(line[destinationRange]))
    }

    private static func protect(_ source: String, lineIndex: Int) -> (text: String, links: [LinkToken]) {
        var output = source
        var links: [LinkToken] = []
        if let expression = try? NSRegularExpression(pattern: #"\[([^\]]+)\]\(([^)]+)\)"#) {
            let matches = expression.matches(in: output, range: NSRange(output.startIndex..<output.endIndex, in: output)).reversed()
            for match in matches {
                guard let fullRange = Range(match.range(at: 0), in: output),
                      let labelRange = Range(match.range(at: 1), in: output),
                      let destinationRange = Range(match.range(at: 2), in: output) else { continue }
                let placeholder = "ZXQLINK\(lineIndex)X\(links.count)ZXQ"
                links.append(LinkToken(
                    placeholder: placeholder,
                    label: String(output[labelRange]),
                    destination: String(output[destinationRange])
                ))
                output.replaceSubrange(fullRange, with: placeholder)
            }
            links.reverse()
        }

        if let expression = try? NSRegularExpression(pattern: #"`[^`]+`"#) {
            let matches = expression.matches(in: output, range: NSRange(output.startIndex..<output.endIndex, in: output)).reversed()
            for (tokenIndex, match) in matches.enumerated() {
                guard let range = Range(match.range, in: output) else { continue }
                let token = String(output[range])
                output.replaceSubrange(range, with: "ZXQCODE\(lineIndex)X\(tokenIndex)ZXQ\(token)ZXQENDCODEZXQ")
            }
        }

        return (protectTerms(in: output), links)
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
            output = replacePlaceholder("ZXQTERM\(index)ZXQ", in: output, with: term)
        }
        output = output.replacingOccurrences(
            of: #"ZXQCODE\d+X\d+ZXQ(`[^`]+`)ZXQENDCODEZXQ"#,
            with: "$1",
            options: .regularExpression
        )
        return output
    }

    private static func normalizeLatinSpacing(in source: String) -> String {
        var output = source
        for term in protectedTerms {
            let escaped = NSRegularExpression.escapedPattern(for: term)
            output = output.replacingOccurrences(
                of: #"([\p{L}\p{N}])("# + escaped + #")"#,
                with: "$1 $2",
                options: .regularExpression
            )
            output = output.replacingOccurrences(
                of: #"("# + escaped + #")([\p{L}\p{N}])"#,
                with: "$1 $2",
                options: .regularExpression
            )
        }
        output = output.replacingOccurrences(of: #"\)([\p{L}\p{N}])"#, with: ") $1", options: .regularExpression)
        output = output.replacingOccurrences(of: #"([\p{L}\p{N}])\["#, with: "$1 [", options: .regularExpression)
        return output
    }

    private static func replacePlaceholder(_ placeholder: String, in source: String, with replacement: String) -> String {
        let flexible = NSRegularExpression.escapedPattern(for: placeholder)
            .replacingOccurrences(of: "ZXQ", with: #"ZXQ\s*"#)
        guard let expression = try? NSRegularExpression(pattern: flexible, options: [.caseInsensitive]) else {
            return source.replacingOccurrences(of: placeholder, with: replacement)
        }
        let range = NSRange(source.startIndex..<source.endIndex, in: source)
        return expression.stringByReplacingMatches(in: source, range: range, withTemplate: NSRegularExpression.escapedTemplate(for: replacement))
    }
}
