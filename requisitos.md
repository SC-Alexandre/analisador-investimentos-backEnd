# Requisitos e Critérios de Aceitação - Analisador de Investimentos (Opção 1)

## Funcionalidades Obrigatórias

### REQ01 - Dados de Exemplo
O sistema deve permitir carregar um conjunto de dados de exemplo (teste de referência) automaticamente para facilitar o teste inicial.
* **Critério de Aceitação:** 
  * **Entrada:** Nenhuma prévia.
  * **Ação:** O usuário clica no botão "Carregar Exemplo de Teste".
  * **Resultado Observável:** O formulário é preenchido com R$ 10.000 no instante zero e recebimento de R$ 15.000 ao final do ano 3, a 8% ao ano.

### REQ02 - Formulário de Entradas
O sistema deve conter um formulário para inserir os parâmetros gerais e os fluxos de pelo menos duas alternativas (Desenvolver Agora vs. Adiar).
* **Critério de Aceitação:**
  * **Entrada:** Usuário digita taxa de desconto, horizonte de tempo, investimento inicial, mês de lançamento e fluxo de caixa de cada período.
  * **Ação:** O usuário clica em "Calcular".
  * **Resultado Observável:** Os dados são enviados para o núcleo de cálculo e a tela é preparada para exibir os resultados sem recarregar a página.

### REQ03 - Cálculos (VP e VPL)
O sistema deve calcular o Valor Presente (VP) de cada fluxo e o Valor Presente Líquido (VPL) de cada alternativa.
* **Critério de Aceitação:**
  * **Entrada:** Investimento de R$ 10.000 no instante 0, fluxo positivo de R$ 15.000 no período 3 e taxa de 8% ao período.
  * **Ação:** O sistema executa o cálculo de VPL.
  * **Resultado Observável:** O sistema calcula e disponibiliza internamente o VP do recebimento como R$ 11.907,48 e o VPL da alternativa como R$ 1.907,48.

### REQ04 - Comparação e Recomendação
O sistema deve comparar os VPLs das alternativas e recomendar a decisão mais vantajosa economicamente.
* **Critério de Aceitação 1 (Caso normal):**
  * **Entrada:** Alternativa A com VPL de R$ 1.907,48 e Alternativa B com VPL de R$ 500,00.
  * **Ação:** O sistema exibe os resultados.
  * **Resultado Observável:** Uma mensagem indica que a Alternativa A é a recomendada pelo maior VPL.
* **Critério de Aceitação 2 (Caso de inviabilidade):**
  * **Entrada:** Alternativa A com VPL -R$ 1.000 e Alternativa B com VPL -R$ 500.
  * **Ação:** O sistema exibe os resultados.
  * **Resultado Observável:** Uma mensagem alerta que nenhuma alternativa supera a taxa de referência (VPL < 0) e não obriga a escolha de um projeto.

### REQ05 - Mensagens de Erro
O sistema deve validar os campos obrigatórios e não permitir o cálculo com dados em branco ou inconsistentes.
* **Critério de Aceitação:**
  * **Entrada:** Campo "Taxa de desconto" deixado em branco e o usuário tenta calcular.
  * **Ação:** O usuário clica em "Calcular".
  * **Resultado Observável:** O cálculo não é realizado e uma mensagem de erro vermelha aparece ("Por favor, preencha a taxa de desconto").

### REQ06 - Visualização em Gráfico e Tabela
O sistema deve mostrar a evolução dos fluxos descontados ao longo do tempo (Tabela) e um gráfico comparativo de acumulado.
* **Critério de Aceitação:**
  * **Entrada:** VPLs e fluxos calculados com sucesso.
  * **Ação:** A tela de resultados é renderizada.
  * **Resultado Observável:** Uma tabela exibe o fluxo nominal e descontado por período, e um gráfico de barras ou linhas exibe a comparação temporal entre as alternativas.

### REQ07 - Exportação de Resultados
O sistema deve permitir a exportação dos dados (entradas e resultados) para auditoria.
* **Critério de Aceitação:**
  * **Entrada:** Resultados calculados em tela.
  * **Ação:** O usuário clica no botão "Exportar para JSON" (ou CSV).
  * **Resultado Observável:** O navegador faz o download de um arquivo contendo as premissas inseridas e os VPLs resultantes.

---

## Extensões Opcionais

### EXT01 - Análise de Sensibilidade (Cenários)
O sistema pode permitir a configuração rápida de três cenários (Otimista, Base, Pessimista) variando receitas ou custos.
* **Critério de Aceitação:**
  * **Entrada:** Botão "Aplicar Cenário Pessimista (-10% receita)".
  * **Ação:** O usuário clica no botão.
  * **Resultado Observável:** O VPL é recalculado automaticamente reduzindo as entradas em 10% e o novo resultado/recomendação é exibido.

### EXT02 - Salvamento Local (Local Storage)
O sistema pode manter as premissas salvas no navegador para evitar redigitação em caso de fechamento acidental da aba.
* **Critério de Aceitação:**
  * **Entrada:** O usuário preenche dados, fecha a aba e reabre a aplicação.
  * **Ação:** A página é carregada.
  * **Resultado Observável:** Os dados previamente preenchidos permanecem nos campos do formulário.
