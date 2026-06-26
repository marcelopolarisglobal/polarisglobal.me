// indicators.js — funções puras de cálculo para valuation BTC
// Sem efeitos colaterais, sem acesso ao DOM, sem dependências externas.

const GENESIS_MS = Date.UTC(2009, 0, 3); // bloco gênesis: 2009-01-03 UTC

// ── SMA ──────────────────────────────────────────────────────────────────────
// closes: Float[] — série de preços de fechamento
// window: Int     — número de períodos
// Retorna Float[] alinhado à direita; posições sem janela completa são null.
function sma(closes, window) {
    const result = new Array(closes.length).fill(null);
    let sum = 0;
    for (let i = 0; i < closes.length; i++) {
        sum += closes[i];
        if (i >= window) sum -= closes[i - window];
        if (i >= window - 1) result[i] = sum / window;
    }
    return result;
}

// ── Power Law Fit ─────────────────────────────────────────────────────────────
// series: [[timestamp_ms, price], ...] — série histórica diária
// Retorna { a, n } onde price ≈ a × (dias_desde_gênesis)^n
// Ajuste por OLS em espaço log-log: ln(price) = ln(a) + n × ln(dias)
function powerLawFit(series) {
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, count = 0;
    for (const [ts, price] of series) {
        const days = (ts - GENESIS_MS) / 86_400_000;
        if (days <= 0 || price <= 0) continue;
        const lx  = Math.log(days);
        const ly  = Math.log(price);
        sumX  += lx;
        sumY  += ly;
        sumXY += lx * ly;
        sumX2 += lx * lx;
        count++;
    }
    if (count < 2) return { a: 1, n: 1 };
    const n         = (count * sumXY - sumX * sumY) / (count * sumX2 - sumX * sumX);
    const intercept = (sumY - n * sumX) / count;
    return { a: Math.exp(intercept), n };
}

// ── Power Law Fair Value ──────────────────────────────────────────────────────
// Calcula o "preço justo" do modelo de regressão para um dado timestamp.
function powerLawFairValue(timestamp_ms, a, n) {
    const days = (timestamp_ms - GENESIS_MS) / 86_400_000;
    if (days <= 0) return null;
    return a * Math.pow(days, n);
}

// ── Rainbow Bands ─────────────────────────────────────────────────────────────
// 9 faixas com multiplicadores 1.3^(4-e) para e = 0..8, exatamente como
// blockchaincenter.net/bitcoin-rainbow-chart — cada faixa é 1.3× a anterior.
// Ordem de e=0 (topo/caro) a e=8 (fundo/barato).
const RAINBOW_MULTIPLIERS = [
    Math.pow(1.3,  4),   // 2.856× — Território de bolha máxima
    Math.pow(1.3,  3),   // 2.197× — Vender. Sério, VENDER!
    Math.pow(1.3,  2),   // 1.690× — FOMO se intensificando
    Math.pow(1.3,  1),   // 1.300× — Isso é uma bolha?
    Math.pow(1.3,  0),   // 1.000× — Segurar!
    Math.pow(1.3, -1),   // 0.769× — Ainda barato
    Math.pow(1.3, -2),   // 0.592× — Acumular
    Math.pow(1.3, -3),   // 0.455× — Comprar!
    Math.pow(1.3, -4),   // 0.350× — Queima de estoque
];
// Cores das 9 faixas: de cima (caro) para baixo (barato), refletindo o rainbow original
const RAINBOW_COLORS = [
    'rgba(156,  39,  80, 0.55)',  // darkest red — Max Bubble
    'rgba(220,  53,  30, 0.55)',  // red
    'rgba(245, 124,   0, 0.55)',  // orange
    'rgba(253, 196,  12, 0.55)',  // yellow
    'rgba(139, 195,  74, 0.55)',  // yellow-green — Hold
    'rgba( 76, 175,  80, 0.55)',  // green
    'rgba(  0, 150, 136, 0.55)',  // teal
    'rgba( 33, 150, 243, 0.55)',  // blue
    'rgba( 25,  77, 152, 0.55)',  // deep blue — Fire Sale
];
const RAINBOW_LABELS = [
    'Território de bolha máxima',
    'Vender. Sério, VENDER!',
    'FOMO se intensificando',
    'Isso é uma bolha?',
    'Segurar!',
    'Ainda barato',
    'Acumular',
    'Comprar!',
    'Queima de estoque',
];

// ── Heatmap Color ─────────────────────────────────────────────────────────────
// pctAboveSma: percentual acima da MM (ex: 50 = 50% acima, 0 = na linha, -20 = abaixo)
// Mapeia [-50, 400] para azul frio → vermelho quente via HSL.
function heatmapColor(pctAboveSma) {
    const clamped = Math.min(Math.max(pctAboveSma, -50), 400);
    const t       = (clamped + 50) / 450; // 0 = frio, 1 = quente
    const hue     = Math.round(220 - t * 220); // 220 (azul) → 0 (vermelho)
    return `hsl(${hue}, 85%, 55%)`;
}

// ── Testes inline (rodar no console: indicators_runTests()) ───────────────────
function indicators_runTests() {
    const ok  = (label, actual, expected, tol = 0.01) => {
        const pass = Math.abs(actual - expected) <= tol;
        console.log((pass ? '✓' : '✗') + ' ' + label + ': got ' + actual.toFixed(4) + ', expected ~' + expected);
    };

    // sma: série [1,2,3,4,5], janela 3 → MM3 = [null, null, 2, 3, 4]
    const s = sma([1, 2, 3, 4, 5], 3);
    ok('sma[2]', s[2], 2);
    ok('sma[3]', s[3], 3);
    ok('sma[4]', s[4], 4);
    console.assert(s[0] === null, 'sma[0] deve ser null');
    console.assert(s[1] === null, 'sma[1] deve ser null');

    // powerLawFit: com série perfeita price = 1e-8 * days^5.8, deve recuperar n ≈ 5.8
    const genesis = GENESIS_MS;
    const mockSeries = [];
    for (let d = 1000; d <= 5000; d += 100) {
        const ts    = genesis + d * 86_400_000;
        const price = 1e-10 * Math.pow(d, 5.8);
        mockSeries.push([ts, price]);
    }
    const fit = powerLawFit(mockSeries);
    ok('powerLaw n', fit.n, 5.8, 0.01);

    // heatmapColor: extremos
    console.log('heatmapColor(0):', heatmapColor(0));
    console.log('heatmapColor(400):', heatmapColor(400));
    console.log('heatmapColor(-50):', heatmapColor(-50));

    console.log('Todos os testes concluídos.');
}
