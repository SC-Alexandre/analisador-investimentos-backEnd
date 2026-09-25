// calculos.test.js
const { calcularVPL } = require('../js/calculos');

console.log("=== INICIANDO TESTES DO NÚCLEO DE CÁLCULO ===");

// Utilitário para testes normais
function runTest(name, expected, actual, tolerance = 0.01) {
    const diff = Math.abs(expected - actual);
    if (diff <= tolerance) {
        console.log(`[PASSOU] ${name} (Obtido: ${actual.toFixed(2)})`);
    } else {
        console.error(`[FALHOU] ${name} (Esperado: ${expected}, Obtido: ${actual})`);
        process.exitCode = 1;
    }
}

// Utilitário para testes de exceção/erros
function runErrorTest(name, funcToRun) {
    try {
        funcToRun();
        console.error(`[FALHOU] ${name} (Esperava um erro, mas a função continuou)`);
        process.exitCode = 1;
    } catch (e) {
        console.log(`[PASSOU] ${name} (Erro capturado: "${e.message}")`);
    }
}

console.log("\n-- 1. Casos Normais e Referências --");
runTest("Caso Passo 3 (Inv=25k, F[ano 5]=45k, i=10%)", 2941.46, calcularVPL(0.10, 25000, [0, 0, 0, 0, 45000]));
runTest("Referência PDF (Inv=10k, F[ano 3]=15k, i=8%)", 1907.48, calcularVPL(0.08, 10000, [0, 0, 15000]));
runTest("Projeto com VPL Negativo (Inv=20k, F[ano 1]=5k, i=5%)", -15238.10, calcularVPL(0.05, 20000, [5000]));

console.log("\n-- 2. Valores Ausentes e Entradas Inválidas --");
runErrorTest("Taxa ausente ou null", () => calcularVPL(null, 10000, []));
runErrorTest("Investimento inválido (Texto não numérico)", () => calcularVPL(0.1, "ABC", []));
runErrorTest("Fluxos passados como String (não como Array)", () => calcularVPL(0.1, 10000, "15000"));
runTest("Correção automática de Array com espaços vazios/strings", 1907.48, calcularVPL("0.08", "10000", ["", null, "15000"]));

console.log("\n-- 3. Divisão por Zero e Situações Sem Solução --");
runErrorTest("Taxa -100% (Causa Divisão por Zero no denominador)", () => calcularVPL(-1, 10000, [5000]));
runErrorTest("Taxa < -100% (Matematicamente inválido em finanças)", () => calcularVPL(-1.5, 10000, [5000]));

console.log("\n=== TESTES CONCLUÍDOS ===");
