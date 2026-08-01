# Usar o SourceShelf com o LM Studio

LM Studio Pode executar um modelo local e agir como o MCP Anfitrião que inicia o assistente do SourceShelf. Use um modelo com suporte confiável para chamadas de ferramentas; o modelo precisa escolher `search_pack` e `read_pack_resource` Durante a conversa.

Última verificação: 01-08-2026.

## Requisitos

- Uma corrente LM Studio Lançamento com MCP Suporte (LM Studio Documentos MCP Suporte a partir de 0.3.17).
- Um modelo baixado e carregado que suporta o uso de ferramentas.
- Uma partilha atual do SourceShelf criada através de **Pacotes > Mais > Acesso Local à IA...**.

## Instale a conexão SourceShelf

1. No SourceShelf, abra o pacote **Acesso local de IA** Folha.
2. selecionar **cópia MCP configuração**.
3. pol LM Studio, abra o **programa** Tábua.
4. selecionar **instalar**, então **Editar mcp.json**.
5. Cole ou mescle o copiado `mcpServers` Entrada. Não remova outros servidores que você deseja manter.
6. Salve o arquivo e ative a integração SourceShelf.

O resultado tem essa forma:

```json
{
  "mcpServers": {
    "sourceshelf-municipal-research": {
      "command": "/Applications/SourceShelf.app/Contents/MacOS/SourceShelfMCPServer",
      "args": ["--share", "<share-id>"]
    }
  }
}
```

Use o comando exato e compartilhe o ID copiado pelo SourceShelf. Não substitua manualmente um caminho de aplicativo ou auxiliar.

## Teste as ferramentas

Carregue um modelo local compatível com ferramentas e comece com uma solicitação estreita e explícita:

> Use as ferramentas SourceShelf para pesquisar o pacote compartilhado por alvos de copa de árvore. Leia o recurso que melhor combina, resuma os alvos e cite o recurso SourceShelf. URI. Não responda com conhecimentos gerais.

Para um modelo menor, faça a sequência explícita:

> Primeira chamada `search_pack` Com a consulta `tree canopy targets` E um limite de 5. Então ligue `read_pack_resource` Para o melhor resultado. Baseie a resposta apenas no texto retornado.

Você deve ver uma chamada de pesquisa seguida por uma ou mais leituras limitadas. Se o modelo descrever as ferramentas em vez de chamá-las, experimente um modelo com suporte mais forte para chamadas de função ou mantenha a formulação procedural.

## LM Studio Como um servidor API local

LM Studio Também pode ser configurado MCP Servidores disponíveis para um agente orientado por API. atual LM Studio A documentação requer configuração do servidor e configurações de autorização antes que os clientes API possam invocar servidores de `mcp.json`. Esta é uma rota avançada; o bate-papo integrado é o teste funcional mais simples.

## comum LM Studio Erros

### "O processo do plugin foi encerrado inesperadamente com o código 1"

O assistente não conseguiu iniciar ou validar a partilha. Recopie a configuração depois de mover ou atualizar o SourceShelf, confirme que a partilha está ativada e confirme que o pacote ainda mostra uma captura de tela atual.

### "Método desconhecido: ferramentas/lista"

O cliente atingiu um auxiliar apenas de recursos ou mais antigo. Instale a versão atual do SourceShelf, copie a configuração novamente e reinicie a integração. O SourceShelf atual expõe ambos `search_pack` e `read_pack_resource`.

### A janela de contexto preenche-se rapidamente

Peça ao modelo para pesquisar primeiro e ler apenas um ou dois resultados. A ferramenta de leitura em páginas do SourceShelf existe especificamente para evitar carregar todos os recursos no prompt.

Referências oficiais: [LM Studio MCP Servidores](https://lmstudio.ai/docs/app/mcp), [LM Studio MCP Uso de API](https://lmstudio.ai/docs/developer/core/mcp), [LM Studio Configurações do servidor](https://lmstudio.ai/docs/developer/core/server/settings).
