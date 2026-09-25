// calculos.js - Núcleo puro de cálculos matemáticos

/**
 * Calcula o Valor Presente Líquido (VPL)
 * @param {number} taxa - Taxa de desconto em decimal (ex: 0.10 para 10%)
 * @param {number} investimentoInicial - Valor positivo que representa o desembolso no instante 0
 * @param {number[]} fluxos - Array contendo os fluxos de caixa a partir do período 1
 * @returns {number} O VPL calculado
 */
function calcularVPL(taxa, investimentoInicial, fluxos) {
    // 1. Tratamento de Valores Ausentes e Entradas Inválidas
    if (taxa === undefined || taxa === null || isNaN(Number(taxa)) || taxa === "") {
        throw new Error("Taxa inválida ou ausente.");
    }
    if (investimentoInicial === undefined || investimentoInicial === null || isNaN(Number(investimentoInicial)) || investimentoInicial === "") {
        throw new Error("Investimento inicial inválido ou ausente.");
    }
    if (!Array.isArray(fluxos)) {
        throw new Error("Fluxos de caixa devem ser um array (lista).");
    }

    const t = Number(taxa);
    const inv = Number(investimentoInicial);

    // 2. Tratamento de Divisão por Zero e Situações Sem Solução (Matemática)
    if (t <= -1) {
        throw new Error("A taxa não pode ser menor ou igual a -1 (-100%), pois resulta em divisão por zero ou expoente complexo em finanças reais.");
    }
    
    // 3. Lógica central do cálculo
    // Assegura que o investimento inicial seja subtraído (saída de caixa)
    let vpl = -Math.abs(inv); 
    
    for (let k = 0; k < fluxos.length; k++) {
        let fluxoAtual = fluxos[k];
        
        // Trata fluxos ausentes, mal formatados ou texto vazio no array como R$ 0,00
        if (fluxoAtual === undefined || fluxoAtual === null || isNaN(Number(fluxoAtual)) || fluxoAtual === "") {
            fluxoAtual = 0;
        } else {
            fluxoAtual = Number(fluxoAtual);
        }

        const periodo = k + 1;
        vpl += fluxoAtual / Math.pow(1 + t, periodo);
    }
    
    return vpl;
}

// Suporte para uso no Node.js e navegador
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcularVPL };
}
