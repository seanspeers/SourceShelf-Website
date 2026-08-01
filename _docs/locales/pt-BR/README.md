# Guia do usuário do SourceShelf

O SourceShelf transforma arquivos e pesquisas na web em Markdown local, pacotes de contexto ordenados, exportações portáteis e acesso opcional somente leitura para aplicativos locais de IA. Este guia é escrito para o SourceShelf 1.0.1.

## Comece aqui

- [Comece](getting-started.md) — converta seus primeiros arquivos, crie um pacote e escolha uma exportação.
- [Captura do Safari](guides/safari-capture.md) — páginas, conteúdo principal, seleções, destaques, receitas, resenha e atalhos de teclado.
- [Navegue pela Biblioteca](guides/library-and-inspector.md) — pesquisa, filtros, status da fonte, ações e pré-visualizações.
- [Construa e gerencie pacotes](guides/build-and-manage-packs.md) — pacotes salvos, pedidos, rascunhos, Confiança e Segurança e Atualizar e Comparar.
- [Escolha um formato de exportação](guides/export-formats.md) — Pacote de Referência de IA, OKF, Markdown, `llms.txt`, e fluxos de trabalho do área de transferência.
- [Gerenciar armazenamento](guides/storage-management.md) — revise o uso local, limpe dados obsoletos com segurança e remova deliberadamente as fontes geradas.

## Acesso local de IA (MCP)

- [Visão geral do acesso local à IA](mcp/local-ai-access.md)
- [LM Studio](mcp/lm-studio.md)
- [Ollama](mcp/ollama.md)
- [Codex](mcp/codex.md)
- [Claude Code](mcp/claude-code.md)
- [OpenCode](mcp/opencode.md)
- [MCP solução de problemas](mcp/troubleshooting.md)

## Mais guias

- [Converter arquivos e pastas](guides/convert-files.md)
- [Confiança e Segurança e pacotes de vida](guides/trust-safety-and-refresh.md)
- [Importar e exportar llms.txt](guides/llms-txt.md)
- [Referência de configurações](reference/settings.md)
- [Formatos suportados](reference/supported-formats.md)
- [Privacidade e segurança](reference/privacy-and-security.md)
- [glossário](reference/glossary.md)

## Um modelo mental útil

A SourceShelf mantém quatro trabalhos separados:

1. **Converter ou capturar** Cria uma fonte local de Markdown.
2. **biblioteca** Ajuda você a encontrar, inspecionar e manter fontes.
3. **Pacotes** organizar fontes selecionadas em uma ordem deliberada.
4. **Exportar ou acessar IA local** Entregue aquele pacote para outro fluxo de trabalho.

O SourceShelf executa esses trabalhos localmente. Ele não carrega conteúdo remoto durante a conversão de arquivos, `llms.txt` Importação, exportação, comparação ou MCP Leia.

As capturas de tela da documentação usam o corpus de demonstração sintético do SourceShelf. Os caminhos locais e os valores de autorização MCP foram removidos.
