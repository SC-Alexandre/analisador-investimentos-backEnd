// dados_exemplo.js
// Armazena premissas de teste para fácil carregamento
const dadosExemplo = {
    taxa: 10,
    horizonte: 5,
    alternativaA: { // Baseado no Passo 3
        investimento: 25000,
        fluxos: [0, 0, 0, 0, 45000]
    },
    alternativaB: { // Referência PDF
        investimento: 10000,
        fluxos: [0, 0, 15000, 0, 0] // 0 extras para completar horizonte
    }
};
