# Confiança e segurança e pacotes em evolução

A Trust & Safety ajuda você a inspecionar um pacote antes que ele saia da SourceShelf ou fique disponível para outro aplicativo local. É um relatório consultivo, não uma garantia de que o conteúdo seja seguro.

![Resumo de Confiança e Segurança para o pacote de demonstração sintética](../../../assets/images/trust-and-safety.png)

## O que o SourceShelf verifica

O relatório inclui verificações para:

- Fontes legíveis e indisponíveis;
- Referências de pacotes salvos não resolvidas;
- Tamanho da saída e contagem de imagens arquivadas;
- nomeação, colisão e estrutura de pacote;
- Checksums de arquivos de origem e embalados;
- Datas de modificação;
- Capturas da web mais antigas do que a política de estaleamento aplicável;
- Ativos inválidos e referências de links;
- Provável sobreposição de instruções, divulgação de mensagens do sistema, uso de ferramentas, credenciais ou linguagem de exfiltramento.

O detector de risco é intencionalmente conservador. As descobertas mostram uma categoria, linha Markdown e um breve trecho. Exemplos dentro de código cercado recebem gravidade reduzida ou suprimida quando possível.

## Conteúdo de referência não confiável

O material capturado e convertido é classificado como `untrusted_reference`. Documentos de contexto gerados e MCP As leituras incluem um aviso visível. A SourceShelf preserva o corpo original para que você possa revisá-lo; ela não remove instruções ou descreve o material como higienizado.

## Pronto, avisos e erros

- **pronto** Significa que os controles estruturais compartilhados foram aprovados e nenhum problema consultivo precisa ser revisado.
- **Avisos** Permita a exportação ou compartilhamento após você revisar o relatório.
- **Erros com fontes legíveis** Ainda pode permitir uma continuação explícita "com problemas".
- **Sem fontes legíveis** Bloqueia a exportação ou compartilhamento porque não há nada útil para entregar.

A validação de exportação estrutural permanece autoritária. Se a validação do pacote falhar, o SourceShelf não escreve um resultado inválido.

## falta de renovação

As capturas da web usam uma idade padrão global de 90 dias. Uma receita de captura pode herdar esse valor, escolher um número positivo de dias ou desativar a estaleza baseada na idade para suas capturas.

As conversões de arquivos são comparadas por meio de datas de modificação e hashes de conteúdo, não por um limite de idade arbitrário. A SourceShelf nunca recupera um URL Para decidir se uma página da web mudou.

## Atualizar e comparar

Após uma exportação bem-sucedida, o SourceShelf armazena uma linha de base para aquele pacote salvo. selecionar **Atualizar e comparar** Para classificar o estado local atual:

![Um novo pacote salvo antes de sua primeira linha de base de exportação](../../../assets/images/refresh-and-compare.png)

- **novo** — no pacote atual, mas ausente da linha de base;
- **Mudado** — o conteúdo semântico ou os metadados de proveniência rastreados diferem;
- **desaparecido** — referenciado, mas atualmente ilegível ou indisponível;
- **inalterado** — os hashes de metadados de conteúdo e rastreados correspondem;
- **Removido** — presente no momento da exportação, mas não mais no pacote salvo.

As alterações de ordem são relatadas separadamente. A folha de detalhes mostra as datas atuais e da última exportação, além de hashes encurtados. O conteúdo correspondente e os hashes de metadados são classificados como inalterados.

Pacotes sem título não têm linhas de base persistentes. Salve o pacote primeiro. Acancelamento ou um erro de exportação não atualiza a linha de base; se a exportação for bem-sucedida, mas a persistência da linha de base falhar, o SourceShelf relata o erro de rastreamento em vez de reivindicar que o pacote esteja atualizado.

## Quando os relatórios ficam desatualizados

Mudanças na adesão, pedido, pacote ativo, estado de origem, política de receita e linha de base inviabilizam os resultados anteriores de Confiança e Segurança ou comparação. Execute a verificação novamente antes de confiar neles.
