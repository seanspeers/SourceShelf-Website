# Usar o SourceShelf com o Ollama

Ollama Executa o modelo local. Um MCP-agente capaz—como Codex, Claude Code, ou OpenCode— hospeda a conexão SourceShelf e fornece suas ferramentas para esse modelo.

OllamaChamada de ferramenta de suporte de bate-papo nativo e API, mas Ollama Não é por si só a SourceShelf MCP Cliente. O teste mais simples é, portanto:

```text
SourceShelf MCP helper → Codex / Claude Code / OpenCode → Ollama model
```

Última verificação: 01-08-2026.

## Configuração recomendada: Ollama com Codex

1. Crie a partilha SourceShelf e copie seu comando.
2. Adicione-o a Codex Usando [o Codex guia](codex.md).
3. lançamento Codex através Ollama:

```sh
ollama launch codex
```

1. Escolha um modelo instalado com uma janela de contexto suficientemente grande e chamadas de ferramentas confiáveis.
1. pol Codex, correr `/mcp` E confirme que o servidor SourceShelf e suas duas ferramentas estão presentes.
1. Pergunte:

> Pesquise o pacote SourceShelf para tendências de passageiros de transporte público, leia o melhor resultado e cite o recurso. URI.

Ollama Recomenda pelo menos uma janela de contexto de 64K para agentes de codificação. O fluxo de trabalho de pesquisa primeiro da SourceShelf reduz o contexto desnecessário, mas o próprio agente ainda pode precisar de espaço para definições de ferramentas e resultados.

## Ollama com OpenCode

1. Configurar SourceShelf em OpenCode Usando [o OpenCode guia](opencode.md).
2. Inicie o agente local através de Ollama:

```sh
ollama launch opencode
```

Ollama Diz que funde profundamente a configuração de lançamento temporária com uma existente OpenCode Configuração, então seu SourceShelf MCP A entrada permanece disponível.

## Ollama com Claude Code

1. Configure SourceShelf usando [o Claude Code guia](claude-code.md).
2. Lançamento:

```sh
ollama launch claude
```

Então use `/mcp` pol Claude Code Para confirmar o servidor.

## Modo manual de modelo local no Codex

Se o seu Codex A configuração já aponta para Ollama, você também pode começar com:

```sh
codex --oss
```

o MCP A configuração permanece em Codex; `--oss` Escolha o provedor de modelo de código aberto local. Se você manter vários provedores locais, use um nomeado Codex Perfil em vez disso.

## Escolhendo um modelo

Procure um modelo cujo Ollama A página ou documentação menciona explicitamente a chamada de ferramentas/funções. Modelos menores se beneficiam de prompts diretos, como:

> chamada `search_pack` Primeiro. uso `read_pack_resource` Somente no resultado superior. Não adivinhe e não leia o pacote inteiro.

Se o modelo escrever repetidamente uma chamada hipotética de ferramenta como texto, a conexão do host pode estar funcionando enquanto o comportamento de chamada de ferramenta do modelo não está. Confirme com um modelo mais capaz de ferramentas antes de depurar o SourceShelf.

## Avancado: construa sua própria ponte

Um aplicativo usando OllamaA API de bate-papo pode definir funções e executá-las, mas também deve implementar um MCP Cliente ou traduza essas funções para o SourceShelf MCP Chamadas. O SourceShelf não fornece intencionalmente um endpoint de rede. Para testes normais, um host de agente existente é muito mais simples e seguro.

Referências oficiais: [Ollama Chamada de ferramenta](https://docs.ollama.com/capabilities/tool-calling), [Ollama lançamento](https://docs.ollama.com/cli), [Ollama com Codex](https://docs.ollama.com/integrations/codex), [Ollama com OpenCode](https://docs.ollama.com/integrations/opencode), [Ollama com Claude Code](https://docs.ollama.com/integrations/claude-code).
