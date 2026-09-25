# Analisador de Investimentos

## 🎯 Objetivo
Aplicação web construída para a disciplina de Engenharia Econômica com o objetivo de apoiar a tomada de decisão de um profissional de engenharia de software: **Desenvolver uma funcionalidade agora ou adiar sua entrega**. A ferramenta compara o desembolso inicial e os benefícios futuros de duas alternativas utilizando o cálculo do **Valor Presente Líquido (VPL)**.

## 👥 Integrantes da Equipe
*   Alexandre Santos
*   José Mauro
*   Pedro Queiroz

## 🛠 Tecnologia
- **Interface e Lógica:** HTML5, CSS3 e JavaScript puro (Vanilla JS).
- **Testes de Cálculo:** NodeJS (apenas para ambiente de desenvolvimento/validação matemática no terminal).
- O projeto não utiliza frameworks externos ou dependências na interface. Todos os arquivos são autocontidos e rodam localmente no navegador.

## 🚀 Instruções de Execução (Interface)
O projeto roda perfeitamente em modo local (File-System), dispensando a instalação de servidores web.
1. Baixe ou clone este repositório para o seu computador.
2. Abra a pasta principal do projeto.
3. Dê um duplo clique no arquivo `index.html`.
4. O navegador padrão irá abrir a aplicação pronta para uso.

## 🧪 Instruções de Testes (Núcleo Matemático)
Existe uma bateria de testes automatizados que valida a correção matemática isoladamente.
1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. Abra o terminal (Prompt de Comando/PowerShell) na raiz do projeto.
3. Execute o comando:
   ```bash
   node testes/calculos.test.js
   ```
A saída indicará o sucesso `[PASSOU]` dos casos normais e extremos (tratamento de divisão por zero, erros de digitação e validações de arrays).

## 📋 Dados de Exemplo
A aplicação vem com um botão **"Carregar Exemplo de Teste"** que preenche automaticamente a tela com:
*   **Premissas Gerais:** Taxa de Desconto de 10% ao período; Horizonte de 5 períodos.
*   **Alternativa A (Desenvolver Agora):** Investimento de R$ 25.000,00 no Mês 0 e fluxo único de R$ 45.000,00 no Mês 5. (Resultado Esperado: VPL = R$ 2.941,46)
*   **Alternativa B (Adiar):** Dados extraídos do material didático (Investimento Mês 0: R$ 10.000, Fluxo Mês 3: R$ 15.000).

## 📈 Descrição dos Indicadores
*   **Valor Presente (VP):** É o valor de um montante futuro trazido para a data presente, aplicando a taxa de desconto.
*   **Valor Presente Líquido (VPL):** É o indicador central de decisão. Ele soma todos os Valores Presentes das receitas e subtrai os Valores Presentes dos custos (incluindo o investimento inicial).
    *   **VPL > 0:** O projeto cria valor financeiro.
    *   **VPL < 0:** O projeto destrói valor nas premissas atuais.
    *   **Critério de Decisão:** Entre duas opções, opta-se por aquela que retornar o **maior VPL**. Se ambos forem negativos, a ferramenta alerta sobre a inviabilidade.

## 🚧 Limitações
1. **Periodicidade:** Apenas números inteiros são aceitos como período (meses, anos). Não é possível lançar um fluxo fracionado (ex: "mês 1.5"). Ambas as alternativas precisam respeitar o horizonte global de tempo.
2. **Precisão Monetária:** Foi aplicada uma margem de tolerância (0.01 centavo) nos testes de backend para mitigar imprecisões do sistema de ponto flutuante padrão da linguagem JavaScript em cálculos exponenciais.
3. **Semântica do Atraso:** O cenário de "adiar funcionalidade" exige que o usuário lance o custo inicial atrasado diretamente como um "fluxo de caixa negativo" no mês desejado, pois o algoritmo matemático por baixo não compreende o conceito estratégico de "adiar", enxergando apenas a matriz de pagamentos no tempo.
