# Modelo de Cálculos - Analisador de Investimentos

## 1. Variáveis e Unidades
*   **Investimento Inicial ($I_0$)**: Valor monetário (R$). Representa o desembolso principal no instante zero.
*   **Horizonte de Tempo ($n$)**: Número inteiro (períodos). Pode ser definido em meses ou anos, mas deve possuir a mesma unidade da taxa de desconto.
*   **Taxa de Desconto ($i$)**: Taxa percentual (%) fornecida pelo usuário, convertida internamente para fração decimal (ex: 10% = 0,10) para uso nas fórmulas. Exige a mesma periodicidade dos fluxos.
*   **Fluxo de Caixa ($F_k$)**: Valor monetário (R$). Representa as entradas ou saídas de caixa previstas para cada período $k$.
*   **Valor Presente ($VP$)**: Valor monetário (R$). O valor financeiro atual de um fluxo que ocorrerá no futuro, descontado pela taxa de atratividade.
*   **Valor Futuro ($VF$)**: Valor monetário (R$). O valor financeiro consolidado ao final do período.
*   **Valor Presente Líquido ($VPL$)**: Valor monetário (R$). A soma algébrica dos valores presentes de todos os fluxos de caixa do projeto (entradas e saídas), evidenciando se há agregação de valor financeiro.

## 2. Fórmulas Matemáticas
*   **Fator de Desconto**: $(1 + i)^n$
*   **Valor Presente de um Fluxo no período k**: $VP_k = \frac{F_k}{(1 + i)^k}$
*   **Valor Presente Líquido (VPL)**: 
    $VPL = \sum_{k=0}^{n} \left[ \frac{F_k}{(1 + i)^k} \right]$
    Desmembrando o investimento inicial (que não sofre desconto temporal pois $k=0$):
    $VPL = -I_0 + \sum_{k=1}^{n} \left[ \frac{F_k}{(1 + i)^k} \right]$

## 3. Convenções de Sinais
*   **Desembolsos / Custos (Saídas de Caixa)**: Tratados com sinal negativo (-). O investimento inicial e eventuais custos operacionais superiores à receita em um período devem compor o cálculo subtraindo do VPL.
*   **Recebimentos / Benefícios (Entradas de Caixa)**: Tratados com sinal positivo (+). Ganhos com a nova funcionalidade.
*   **Critério de Decisão (VPL)**:
    *   $VPL > 0$: O projeto gera valor; compensa financeiramente.
    *   $VPL = 0$: O projeto empata em rentabilidade com a taxa exigida.
    *   $VPL < 0$: O projeto destrói valor nas premissas atuais.

## 4. Tratamento do Mês Zero (Instante Zero)
*   O mês/período zero ($k = 0$) é considerado o "hoje".
*   Matematicamente, o fator de desconto é $(1 + i)^0 = 1$. Logo, qualquer valor inserido no mês zero não sofre desvalorização ao ser trazido a valor presente ($VP_0 = F_0$).
*   Na nossa aplicação, será garantido que o desembolso do Investimento Inicial seja inserido e tratado como ocorrendo integralmente no instante zero (sem desconto temporal).

## 5. Limites de Validade
*   O cálculo exige que a taxa de desconto seja matematicamente $> -1$ (não permitiremos -100%, pois causaria divisão por zero). Taxas negativas são teoricamente possíveis, mas muito atípicas.
*   O sistema assume que os fluxos ocorrem integralmente ao **final** de cada período (convenção de mercado).
*   Trataremos os valores nulos ou vazios como zero, e caso o VPL resulte em "NaN" (devido a inputs corrompidos), o sistema deve interceptar o erro e alertar o usuário.

---

## 6. Desenvolvimento do Caso Passo a Passo

### Dados do Caso
*   **Valores Fornecidos (Inputs explícitos do usuário):**
    *   Investimento Inicial ($C_0$): R$ 25.000,00 (Ocorre no período 0, portanto fluxo $F_0 = -25.000,00$)
    *   Recebimento Futuro ($VF$): R$ 45.000,00 (Ocorre no período 5, portanto fluxo $F_5 = +45.000,00$)
    *   Taxa de desconto ($i$): 10% ao ano
    *   Horizonte de Tempo ($n$): 5 anos
*   **Valores Estimados (Premissas inferidas da modelagem):**
    *   Como não foram informados valores intermediários, estimamos os fluxos de caixa para os anos 1, 2, 3 e 4 como **R$ 0,00**.
*   **Valores Calculados (Outputs gerados pelo sistema):**
    *   Valor Presente (VP) do Recebimento Futuro
    *   Valor Presente Líquido (VPL)

### Cálculo Passo a Passo
**Passo 1: Tratamento da taxa e fluxos**
Converter taxa para base decimal: $i = \frac{10}{100} = 0,10$.

**Passo 2: Descontar os fluxos futuros para o momento presente**
Como os anos 1 a 4 possuem fluxo zero, o único VP necessário é o do recebimento do ano 5.
$VP_5 = \frac{VF}{(1 + i)^n} = \frac{45.000}{(1 + 0,10)^5}$
$VP_5 = \frac{45.000}{1,10^5}$
$VP_5 = \frac{45.000}{1,61051}$
$VP_5 = 27.941,4595...$

Arredondando conforme padrão monetário (duas casas decimais): **VP do benefício = R$ 27.941,46**

**Passo 3: Somar ao Investimento Inicial para achar o VPL**
Utilizando a convenção de sinais onde desembolso é negativo:
$VPL = F_0 + VP_5$
$VPL = -25.000,00 + 27.941,46$
**VPL = 2.941,46**

### Comparação e Veredito
*   **Resultado Calculado Independente Pela Equipe:** R$ 2.941,46
*   **Resultado Calculado Pelo Modelo Matemático:** R$ 2.941,46
*   **Conclusão:** Os resultados são perfeitamente idênticos. Não há nenhuma divergência de sinais, fórmulas, conversão de taxas ou regras de negócio. O modelo matemático está maduro e completamente apto para a etapa de codificação.
