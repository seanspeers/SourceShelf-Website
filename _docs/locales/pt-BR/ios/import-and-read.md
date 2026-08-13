# Importe e leia documentos no iPhone e iPad

O SourceShelf converte documentos locais compatíveis em Markdown canônico em sua biblioteca privada no dispositivo. Conversão, OCR, indexação e leitura não enviam seus documentos para servidores.

## Importe pelo app Arquivos

Abra o menu **Mais** da barra lateral ou **Ajustes > Importar e Exportar** e escolha **Importar Pesquisa…**. Você pode selecionar vários arquivos compatíveis. O SourceShelf mostra o progresso de tarefas demoradas e oferece **Cancelar** durante uma importação ativa.

As entradas locais compatíveis são:

- PDF;
- JPEG, PNG, HEIC/HEIF, TIFF e outras imagens que os frameworks da Apple consigam decodificar;
- RTF;
- Markdown e texto simples, incluindo um arquivo `llms.txt` independente;
- ZIP do Pacote de Referência de IA, ZIP do Bundle OKF v0.2 e ZIP do Pacote `llms.txt` Portátil.

## Importe pela folha de compartilhamento

No app Arquivos, Fotos, Safari ou outro app, abra **Compartilhar** e escolha SourceShelf para um documento compatível. A extensão de compartilhamento leve copia o arquivo autorizado para uma caixa de entrada local limitada. O app principal do SourceShelf faz a conversão e salva a fonte na biblioteca.

Se o SourceShelf não aparecer, use **Mais** na folha de compartilhamento para ativá-lo, ou salve o arquivo no app Arquivos e use **Importar Pesquisa…**.

## Reconhecimento de PDFs e imagens

Em PDFs, o SourceShelf usa o texto selecionável quando ele é significativo e aplica OCR local do Vision somente às páginas que precisam. A ordem das páginas é preservada. PDFs protegidos por senha, malformados, grandes demais ou incompatíveis falham sem criar uma fonte concluída.

Para uma imagem importada, o SourceShelf mantém os bytes originais no diretório privado de recursos daquela fonte e adiciona o texto reconhecido quando disponível. Assim, a imagem aparece offline e o texto reconhecido participa da pesquisa na Biblioteca. Metadados incorporados na imagem original permanecem locais, a menos que você exporte depois um pacote que contenha esse recurso.

A conversão de RTF preserva parágrafos legíveis, ênfase básica, links seguros, listas simples e anexos de imagem compatíveis. RTFD não é suportado.

## Pesquise e filtre

A pesquisa funciona no conteúdo já indexado na biblioteca local. Selecione **Todas as Pesquisas**, **Favoritos** ou um pacote antes de pesquisar para limitar o contexto. Use Filtrar para limitar as fontes por disponibilidade ou tipo de aquisição e Ordenar para alterar a ordem visível.

## Use o Leitor

O Leitor mostra o título, tipo, data, link seguro do site original quando disponível, procedência, notas de disponibilidade, conteúdo Markdown e imagens arquivadas localmente. O texto pode ser selecionado. Links da web e de e-mail só abrem por uma ação do sistema depois que você toca neles.

O SourceShelf não executa scripts, carrega caminhos arbitrários de arquivos nem busca imagens remotas no Leitor. Uma imagem local indisponível é mostrada como indisponível em vez de ser baixada.

## Limitações atuais

Na versão 1.0.2, iPhone e iPad não importam RTFD, documentos do Office, arquivos HTML locais nem pastas. Use o SourceShelf no Mac para converter DOCX, PPTX, XLSX, HTML ou lotes de pastas e exporte um pacote portátil se quiser levar o resultado ao iPhone ou iPad.
