// app.js - Lógica da Interface Visual

const inputTaxa = document.getElementById('taxa');
const inputHorizonte = document.getElementById('horizonte');
const inputInvA = document.getElementById('invA');
const inputInvB = document.getElementById('invB');
const containerFluxosA = document.getElementById('fluxosA-container');
const containerFluxosB = document.getElementById('fluxosB-container');
const msgErro = document.getElementById('msgErro');
const painelResultados = document.getElementById('resultados');
const tabelaFluxos = document.getElementById('tabelaFluxos');

let ultimoResultadoContexto = null; // Guardar estado para exportar JSON

const formatarReais = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

function gerarCamposFluxo() {
    const horizonte = parseInt(inputHorizonte.value) || 0;
    
    const criarCampos = (container, prefixo) => {
        const valoresSalvos = [];
        container.querySelectorAll('input').forEach(input => valoresSalvos.push(input.value));
        
        container.innerHTML = '';
        for (let i = 1; i <= horizonte; i++) {
            const div = document.createElement('div');
            div.className = 'form-group fluxo-item';
            const valorAntigo = valoresSalvos[i-1] || '0';
            div.innerHTML = `<label>Período ${i}:</label><input type="number" id="fluxo_${prefixo}_${i}" step="0.01" value="${valorAntigo}">`;
            container.appendChild(div);
        }
    };

    criarCampos(containerFluxosA, 'A');
    criarCampos(containerFluxosB, 'B');
}

inputHorizonte.addEventListener('change', gerarCamposFluxo);
gerarCamposFluxo();

function mostrarErro(mensagem) {
    msgErro.textContent = mensagem;
    msgErro.style.display = 'block';
    painelResultados.style.display = 'none';
    window.scrollTo(0, 0);
}

function esconderErro() {
    msgErro.style.display = 'none';
}

function obterFluxos(prefixo, horizonte) {
    const fluxos = [];
    for (let i = 1; i <= horizonte; i++) {
        const val = document.getElementById(`fluxo_${prefixo}_${i}`).value;
        fluxos.push(val ? Number(val) : 0);
    }
    return fluxos;
}

// Botões de Cenários (Aplica multiplicador nas entradas positivas de todas as alternativas)
function aplicarCenario(multiplicador) {
    const horizonte = parseInt(inputHorizonte.value) || 0;
    ['A', 'B'].forEach(prefixo => {
        for (let i = 1; i <= horizonte; i++) {
            const el = document.getElementById(`fluxo_${prefixo}_${i}`);
            let val = Number(el.value);
            if (val > 0) {
                el.value = (val * multiplicador).toFixed(2);
            }
        }
    });
    // Força o cálculo automaticamente após aplicar o cenário
    document.getElementById('btnCalcular').click();
}

document.getElementById('btnCenarioOtimista').addEventListener('click', () => aplicarCenario(1.20));
document.getElementById('btnCenarioPessimista').addEventListener('click', () => aplicarCenario(0.80));

// Carregar Dados de Exemplo
document.getElementById('btnCarregarExemplo').addEventListener('click', () => {
    inputTaxa.value = dadosExemplo.taxa;
    inputHorizonte.value = dadosExemplo.horizonte;
    gerarCamposFluxo();
    
    inputInvA.value = dadosExemplo.alternativaA.investimento;
    dadosExemplo.alternativaA.fluxos.forEach((val, index) => {
        const field = document.getElementById(`fluxo_A_${index+1}`);
        if(field) field.value = val;
    });

    inputInvB.value = dadosExemplo.alternativaB.investimento;
    dadosExemplo.alternativaB.fluxos.forEach((val, index) => {
        const field = document.getElementById(`fluxo_B_${index+1}`);
        if(field) field.value = val;
    });
    
    esconderErro();
    painelResultados.style.display = 'none';
});

// Calcula VP específico de um fluxo (para exibir na tabela)
function descontarVP(fluxo, taxa, periodo) {
    return fluxo / Math.pow(1 + taxa, periodo);
}

document.getElementById('btnCalcular').addEventListener('click', () => {
    esconderErro();
    
    const taxaStr = inputTaxa.value;
    const invAStr = inputInvA.value;
    const invBStr = inputInvB.value;
    const horizonte = parseInt(inputHorizonte.value) || 0;

    if (!taxaStr) return mostrarErro("Por favor, preencha a Taxa de Desconto.");
    if (!invAStr || !invBStr) return mostrarErro("Preencha o Investimento Inicial das Alternativas.");
    if (horizonte < 1) return mostrarErro("O horizonte de tempo deve ser de pelo menos 1 período.");

    const taxaDecimal = Number(taxaStr) / 100;
    const fluxosA = obterFluxos('A', horizonte);
    const fluxosB = obterFluxos('B', horizonte);

    try {
        const vplA = calcularVPL(taxaDecimal, invAStr, fluxosA);
        const vplB = calcularVPL(taxaDecimal, invBStr, fluxosB);

        document.getElementById('vplA').textContent = formatarReais(vplA);
        document.getElementById('vplB').textContent = formatarReais(vplB);

        const divRecomendacao = document.getElementById('recomendacao');
        divRecomendacao.className = 'recomendacao'; 

        if (vplA < 0 && vplB < 0) {
            divRecomendacao.classList.add('alerta');
            divRecomendacao.innerHTML = "<strong>Alerta:</strong> Nenhuma supera a taxa de referência! Ambas apresentam VPL negativo nas premissas atuais.";
        } else if (vplA > vplB) {
            divRecomendacao.innerHTML = "<strong>Recomendação:</strong> A <span style='color:#2980b9'>Alternativa A (Desenvolver Agora)</span> é a mais vantajosa economicamente.";
        } else if (vplB > vplA) {
            divRecomendacao.innerHTML = "<strong>Recomendação:</strong> A <span style='color:#2980b9'>Alternativa B (Adiar)</span> é a mais vantajosa economicamente.";
        } else {
            divRecomendacao.innerHTML = "<strong>Recomendação:</strong> Empate. Ambas geram o mesmo retorno financeiro.";
        }

        const maxVpl = Math.max(Math.abs(vplA), Math.abs(vplB), 1);
        
        const barraA = document.getElementById('barraA');
        const txtBarraA = document.getElementById('valorBarraA');
        barraA.style.width = Math.max(5, (Math.abs(vplA) / maxVpl) * 100) + '%';
        barraA.className = vplA < 0 ? 'barra barra-a negativa' : 'barra barra-a';
        txtBarraA.textContent = formatarReais(vplA);

        const barraB = document.getElementById('barraB');
        const txtBarraB = document.getElementById('valorBarraB');
        barraB.style.width = Math.max(5, (Math.abs(vplB) / maxVpl) * 100) + '%';
        barraB.className = vplB < 0 ? 'barra barra-b negativa' : 'barra barra-b';
        txtBarraB.textContent = formatarReais(vplB);

        // Renderiza Tabela (REQ06)
        let tabelaHTML = `<tr><th>Mês</th><th>Alt A (Nominal)</th><th>Alt A (Descontado VP)</th><th>Alt B (Nominal)</th><th>Alt B (Descontado VP)</th></tr>`;
        tabelaHTML += `<tr>
            <td style="text-align:center">0</td>
            <td>${formatarReais(-Number(invAStr))}</td>
            <td>${formatarReais(-Number(invAStr))}</td>
            <td>${formatarReais(-Number(invBStr))}</td>
            <td>${formatarReais(-Number(invBStr))}</td>
        </tr>`;

        for (let i = 1; i <= horizonte; i++) {
            let descA = descontarVP(fluxosA[i-1], taxaDecimal, i);
            let descB = descontarVP(fluxosB[i-1], taxaDecimal, i);
            tabelaHTML += `<tr>
                <td style="text-align:center">${i}</td>
                <td>${formatarReais(fluxosA[i-1])}</td>
                <td style="color:#27ae60">${formatarReais(descA)}</td>
                <td>${formatarReais(fluxosB[i-1])}</td>
                <td style="color:#27ae60">${formatarReais(descB)}</td>
            </tr>`;
        }
        tabelaFluxos.innerHTML = tabelaHTML;

        painelResultados.style.display = 'block';
        painelResultados.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Salvar estado em memória para exportação JSON
        ultimoResultadoContexto = {
            premissas: { taxa_desconto_percentual: Number(taxaStr), horizonte_periodos: horizonte },
            alternativaA: { investimento_inicial: Number(invAStr), fluxos_nominais: fluxosA, vpl_calculado: vplA },
            alternativaB: { investimento_inicial: Number(invBStr), fluxos_nominais: fluxosB, vpl_calculado: vplB }
        };

    } catch (e) {
        mostrarErro("Erro no cálculo: " + e.message);
    }
});

// Exportar JSON (REQ07)
document.getElementById('btnExportar').addEventListener('click', () => {
    if (!ultimoResultadoContexto) {
        alert("Calcule os resultados primeiro antes de exportar.");
        return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ultimoResultadoContexto, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resultados_vpl_investimentos.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
});
