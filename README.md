# Analisador de Investimentos (Opção 1)

Projeto acadêmico para a disciplina de Engenharia Econômica. O objetivo é auxiliar engenheiros de software na tomada de decisão (desenvolver agora ou adiar), baseando-se no Valor Presente Líquido (VPL).

## 🛠 Tecnologias e Dependências
- **Interface e Lógica:** HTML, CSS e JavaScript puro (Vanilla JS).
- **Testes:** NodeJS (apenas para ambiente de desenvolvimento/validação).
- **Nenhuma dependência externa/NPM** é necessária para rodar a aplicação. Todos os arquivos são autocontidos.

## 🚀 Como Instalar e Executar (Interface Visual)
O projeto roda perfeitamente em modo local (File-System), dispensando a instalação de servidores web.
1. Abra a pasta principal do projeto.
2. Dê um duplo clique no arquivo `index.html`.
3. O navegador padrão irá abrir a aplicação pronta para uso.

## 🧪 Como Rodar os Testes (Núcleo Matemático)
Existe uma bateria de testes automatizados que valida a correção matemática da regra de VPL.
1. Instale o [Node.js](https://nodejs.org/).
2. Abra o terminal na raiz do projeto.
3. Rode:
   ```bash
   node testes/calculos.test.js
   ```
   A saída indicará `[PASSOU]` ou `[FALHOU]` para cada caso, incluindo tratamento de divisão por zero e taxa ausente.

## 🚧 Limitações do Modelo
1. **Periodicidade:** Apenas números inteiros são aceitos como período. Não é possível lançar um fluxo no "mês 1.5".
2. **Precisão Monentária:** Foi aplicada uma função de tolerância (0.01 centavo) nos testes devido às imprecisões do sistema de ponto flutuante do JavaScript em cálculos complexos exponenciais.
3. **Custo Fixo vs Atraso:** O cenário de "adiar" é simulado mudando manualmente o investimento inicial de R$ no mês zero para um período posterior nas grades de fluxo (preenchendo negativo), pois a matemática em si desconhece a lógica semântica de "adiar".

## 📖 Exemplo de Uso Prático
1. Abra o `index.html`.
2. Clique em **"Carregar Exemplo de Teste"**.
3. O cenário da "Opção 3 do PDF" (Inv=25k, Ganho=45k no final) será preenchido.
4. Clique em **"Calcular e Comparar"**.
5. Em seguida, utilize os botões **"+ Otimista"** ou **"- Pessimista"** no topo da página para ver o VPL se alterando dinamicamente na tabela e no gráfico (Análise de Sensibilidade). Você pode ainda exportar esses cenários para JSON no final da tela.
