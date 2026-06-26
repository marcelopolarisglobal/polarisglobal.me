// btc-valuation.js — Gráficos de valuation estrutural de longo prazo
// EXCLUSIVO BTC: portões duplos impedem qualquer renderização para outros ativos.

(function () {

const BINANCE_BASE = 'https://api.binance.com/api/v3';

let _charts   = [];
let _observer = null;
let _rendered = false;

// ── Ponto de entrada público ──────────────────────────────────────────────────

function renderBtcValuation(coin) {
    // PORTÃO 1 — lógica: aborta para qualquer ativo diferente de BTC
    if (!coin || coin.symbol !== 'BTC') {
        const el = document.getElementById('btc-valuation');
        if (el) el.remove(); // PORTÃO 2 — remove do DOM, não só display:none
        _destroyCharts();
        return;
    }
    _rendered = false;
    _ensureSection();
    _setupLazyRender();
}

// ── DOM ───────────────────────────────────────────────────────────────────────

function _ensureSection() {
    if (document.getElementById('btc-valuation')) return;

    const section = document.createElement('section');
    section.id = 'btc-valuation';
    section.innerHTML = `
        <h2 class="section-title">${t('bv_section_title')}</h2>
        <p class="btc-val-intro">${t('bv_intro')}</p>
        <div class="btc-val-loading" id="bv-loading">${t('bv_loading')}</div>
        <div class="btc-val-cards" id="bv-cards" style="display:none">
            ${_cardHtml('picycle',  t('bv_picycle_title'),  t('bv_picycle_legend'),  t('bv_picycle_disc'))}
            ${_cardHtml('powerlaw', t('bv_powerlaw_title'), t('bv_powerlaw_legend'), t('bv_powerlaw_disc'))}
            ${_cardHtml('mm200w',   t('bv_mm200w_title'),   t('bv_mm200w_legend'),   t('bv_mm200w_disc'))}
            ${_cardHtml('mm2a',     t('bv_mm2a_title'),     t('bv_mm2a_legend'),     t('bv_mm2a_disc'))}
        </div>`;

    // Inserir após .main-chart-box, antes dos cards de indicadores avançados
    const anchor = document.querySelector('.main-chart-box');
    anchor.insertAdjacentElement('afterend', section);
}

function _cardHtml(id, title, legend, disclaimer) {
    return `
        <div class="btc-val-card">
            <h3 class="btc-val-title">${title}</h3>
            <p class="btc-val-legend">${legend}</p>
            <div class="btc-val-chart-wrap"><canvas id="bv-chart-${id}"></canvas></div>
            <p class="btc-val-disclaimer">${disclaimer}</p>
        </div>`;
}

// ── Lazy render via IntersectionObserver ──────────────────────────────────────

function _setupLazyRender() {
    if (_observer) _observer.disconnect();
    const section = document.getElementById('btc-valuation');
    if (!section) return;

    _observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !_rendered) {
            _rendered = true;
            _observer.disconnect();
            _loadAndRender();
        }
    }, { threshold: 0.05 });

    _observer.observe(section);
}

// ── Dados ─────────────────────────────────────────────────────────────────────

async function _loadAndRender() {
    try {
        const series = await _buildSeries();
        _destroyCharts();
        document.getElementById('bv-loading').style.display  = 'none';
        document.getElementById('bv-cards').style.display    = '';

        _renderPiCycle(series);
        _renderPowerLaw(series);
        _renderMm200w(series);
        _renderMm2a(series);
    } catch (err) {
        const loading = document.getElementById('bv-loading');
        if (loading) loading.textContent = t('bv_load_error');
        console.error('[btc-valuation]', err);
    }
}

async function _buildSeries() {
    const seed = window.BTC_DAILY_SEED ?? [];

    const liveResp = await fetch(`${BINANCE_BASE}/klines?symbol=BTCUSDT&interval=1d&limit=90`);
    const liveRaw  = await liveResp.json();
    const live     = liveRaw.map(k => [k[0], parseFloat(k[4])]);

    const map = new Map();
    for (const pt of seed) map.set(_dayKey(pt[0]), pt);
    for (const pt of live) map.set(_dayKey(pt[0]), pt);  // ao vivo tem precedência

    return Array.from(map.values()).sort((a, b) => a[0] - b[0]);
}

function _dayKey(ts) {
    return new Date(ts).toISOString().slice(0, 10);
}

// ── Helpers de chart ──────────────────────────────────────────────────────────

function _cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function _fmtPrice(v) {
    if (v == null || !isFinite(v) || v <= 0) return '';
    if (v >= 1e6)  return '$' + (v / 1e6).toFixed(2) + 'M';
    if (v >= 1000) return '$' + (v / 1000).toFixed(1) + 'k';
    if (v >= 1)    return '$' + v.toFixed(2);
    return '$' + v.toFixed(4);
}

function _baseOptions(yMin) {
    const gridColor = 'rgba(255,255,255,0.06)';
    const tickColor = _cssVar('--muted') || '#888';
    const tooltipBg = _cssVar('--card-bg') || '#1a1a2e';
    const textColor  = _cssVar('--text')   || '#e0e0e0';
    const dimColor   = _cssVar('--text-dim') || '#bbb';

    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: {
                labels: { color: tickColor, boxWidth: 10, padding: 10, font: { size: 11 } }
            },
            tooltip: {
                backgroundColor: tooltipBg,
                titleColor: textColor,
                bodyColor: dimColor,
                callbacks: {
                    label: ctx => `${ctx.dataset.label}: ${_fmtPrice(ctx.parsed.y)}`
                }
            }
        },
        scales: {
            x: {
                type: 'category',
                ticks: {
                    color: tickColor,
                    maxTicksLimit: 8,
                    maxRotation: 0,
                    font: { size: 10 },
                },
                grid: { color: gridColor }
            },
            y: {
                type: 'logarithmic',
                position: 'right',
                min: yMin,
                ticks: {
                    color: tickColor,
                    font: { size: 10 },
                    callback: v => _fmtPrice(v),
                },
                grid: { color: gridColor }
            }
        }
    };
}

function _destroyCharts() {
    _charts.forEach(c => { try { c.destroy(); } catch (_) {} });
    _charts = [];
    if (_observer) { _observer.disconnect(); _observer = null; }
}

// ── 1. Pi Cycle Top ───────────────────────────────────────────────────────────

function _renderPiCycle(series) {
    const canvas = document.getElementById('bv-chart-picycle');
    if (!canvas) return;

    const closes  = series.map(p => p[1]);
    const labels  = series.map(p => _dayKey(p[0]));
    const mm111   = sma(closes, 111);
    const mm350   = sma(closes, 350);
    const mm350x2 = mm350.map(v => v !== null ? v * 2 : null);

    const crossings = _findCrossings(mm111, mm350x2);
    const crossLabels = crossings.map(i => labels[i]);
    const crossPrices = crossings.map(i => closes[i]);

    const datasets = [
        {
            label: t('bv_btc_price'),
            data: closes,
            borderColor: '#f7931a',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 1,
        },
        {
            label: t('bv_mm111'),
            data: mm111,
            borderColor: '#42a5f5',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 2,
        },
        {
            label: t('bv_mm350x2'),
            data: mm350x2,
            borderColor: '#ce93d8',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 3,
        },
    ];

    if (crossings.length > 0) {
        datasets.push({
            label: t('bv_crossing'),
            type: 'scatter',
            data: crossLabels.map((x, i) => ({ x, y: crossPrices[i] })),
            backgroundColor: '#ff1744',
            pointStyle: 'triangle',
            pointRadius: 9,
            order: 0,
        });
    }

    const opts = _baseOptions(null);
    opts.plugins.subtitle = {
        display: true,
        text: `${t('bv_picycle_sub')} ${crossings.length}`,
        color: _cssVar('--muted'),
        font: { size: 11 },
        padding: { bottom: 8 },
    };

    const chart = new Chart(canvas, { type: 'line', data: { labels, datasets }, options: opts });
    _charts.push(chart);
}

function _findCrossings(line1, line2) {
    const idx = [];
    for (let i = 1; i < line1.length; i++) {
        if (line1[i] === null || line2[i] === null) continue;
        if (line1[i - 1] === null || line2[i - 1] === null) continue;
        // MM111 cruza acima de 2×MM350 (sinaliza topo)
        if (line1[i - 1] < line2[i - 1] && line1[i] >= line2[i]) idx.push(i);
    }
    return idx;
}

// ── 2. Power Law / Rainbow ────────────────────────────────────────────────────
// Metodologia idêntica ao blockchaincenter.net/bitcoin-rainbow-chart:
// • Regressão OLS em espaço log-log: Price = 10^(n·log10(dias) + b)
// • 9 faixas com multiplicadores 1.3^(4-e) do fair value, e = 0..8

function _renderPowerLaw(series) {
    const canvas = document.getElementById('bv-chart-powerlaw');
    if (!canvas) return;

    const { a, n } = powerLawFit(series);
    const closes = series.map(p => p[1]);
    const labels = series.map(p => _dayKey(p[0]));

    // RAINBOW_MULTIPLIERS está ordenado de maior (topo) para menor (fundo).
    // Chart.js fill '-1' funciona de baixo para cima, então construímos
    // os datasets em ordem REVERSA (fundo → topo).
    const numBands = RAINBOW_MULTIPLIERS.length; // 9

    // Pré-computar fair value e cada limite de faixa
    const boundSeries = Array.from({ length: numBands }, () => []);
    for (const [ts] of series) {
        const fv = powerLawFairValue(ts, a, n);
        for (let i = 0; i < numBands; i++) {
            boundSeries[i].push(fv !== null ? fv * RAINBOW_MULTIPLIERS[i] : null);
        }
    }

    const datasets = [];

    // Datasets de baixo para cima (índice reverso de RAINBOW_MULTIPLIERS)
    for (let rev = 0; rev < numBands; rev++) {
        const i = numBands - 1 - rev; // i=8 (Fire Sale, 0.35×) → i=0 (Max Bubble, 2.856×)
        datasets.push({
            label: t('rainbow_' + i),
            data: boundSeries[i],
            borderWidth: 0,
            borderColor: 'transparent',
            backgroundColor: RAINBOW_COLORS[i],
            // Faixa inferior (Fire Sale) sem fill — demais preenchem até o dataset anterior
            fill: rev === 0 ? false : '-1',
            pointRadius: 0,
            tension: 0,
            order: numBands - rev + 2,
        });
    }

    // Linha de preço sobre todas as faixas
    datasets.push({
        label: t('bv_btc_price'),
        data: closes,
        borderColor: '#000000',
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
        tension: 0,
        order: 1,
    });

    // Fórmula em formato log10 (como exibido no blockchaincenter.net)
    const b_log10 = Math.log10(a);
    const opts = _baseOptions(null);
    opts.plugins.subtitle = {
        display: true,
        text: `Price = 10^(${n.toFixed(2)}·log₁₀(days) + ${b_log10.toFixed(2)}) — Bitstamp+Binance 2011→${t('bv_powerlaw_today')}`,
        color: _cssVar('--muted'),
        font: { size: 11 },
        padding: { bottom: 8 },
    };

    const chart = new Chart(canvas, { type: 'line', data: { labels, datasets }, options: opts });
    _charts.push(chart);
}

// ── 3. MM200 Semanas + Heatmap ────────────────────────────────────────────────

function _renderMm200w(series) {
    const canvas = document.getElementById('bv-chart-mm200w');
    if (!canvas) return;

    const closes  = series.map(p => p[1]);
    const labels  = series.map(p => _dayKey(p[0]));
    const mm1400  = sma(closes, 1400);

    // Cor de cada ponto pelo % acima da MM1400
    const pointColors = closes.map((price, i) => {
        if (mm1400[i] === null) return 'rgba(100,100,100,0.3)';
        const pct = (price / mm1400[i] - 1) * 100;
        return heatmapColor(pct);
    });

    const datasets = [
        {
            label: t('bv_btc_price_heatmap'),
            data: closes,
            segment: {
                borderColor: ctx => pointColors[ctx.p1DataIndex] ?? '#555',
            },
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 1,
        },
        {
            label: t('bv_mm200w_line'),
            data: mm1400,
            borderColor: '#f7931a',
            borderWidth: 2,
            borderDash: [4, 2],
            pointRadius: 0,
            fill: false,
            tension: 0,
            order: 2,
        },
    ];

    const opts = _baseOptions(null);
    opts.plugins.subtitle = {
        display: true,
        text: t('bv_mm200w_sub'),
        color: _cssVar('--muted'),
        font: { size: 11 },
        padding: { bottom: 8 },
    };

    const chart = new Chart(canvas, { type: 'line', data: { labels, datasets }, options: opts });
    _charts.push(chart);
}

// ── 4. Múltiplo da Média de 2 Anos ────────────────────────────────────────────

function _renderMm2a(series) {
    const canvas = document.getElementById('bv-chart-mm2a');
    if (!canvas) return;

    const closes  = series.map(p => p[1]);
    const labels  = series.map(p => _dayKey(p[0]));
    const mm730   = sma(closes, 730);
    const mm730x5 = mm730.map(v => v !== null ? v * 5 : null);

    const datasets = [
        {
            label: t('bv_mm730x5'),
            data: mm730x5,
            borderColor: 'rgba(244,67,54,0.85)',
            borderWidth: 1.5,
            borderDash: [5, 3],
            backgroundColor: 'rgba(244,67,54,0.10)',
            fill: false,
            pointRadius: 0,
            tension: 0,
            order: 3,
        },
        {
            label: t('bv_btc_price'),
            data: closes,
            borderColor: '#f7931a',
            borderWidth: 1.5,
            fill: false,
            pointRadius: 0,
            tension: 0,
            order: 1,
        },
        {
            label: t('bv_mm730'),
            data: mm730,
            borderColor: 'rgba(76,175,80,0.9)',
            borderWidth: 1.5,
            borderDash: [5, 3],
            backgroundColor: 'rgba(76,175,80,0.10)',
            fill: false,
            pointRadius: 0,
            tension: 0,
            order: 2,
        },
    ];

    const opts = _baseOptions(null);
    opts.plugins.subtitle = {
        display: true,
        text: t('bv_mm2a_sub'),
        color: _cssVar('--muted'),
        font: { size: 11 },
        padding: { bottom: 8 },
    };

    const chart = new Chart(canvas, { type: 'line', data: { labels, datasets }, options: opts });
    _charts.push(chart);
}

// ── Export ────────────────────────────────────────────────────────────────────

function refreshBtcValuation() {
    const el = document.getElementById('btc-valuation');
    if (el) el.remove();
    _destroyCharts();
    if (typeof activeCoin !== 'undefined' && activeCoin?.symbol === 'BTC') {
        renderBtcValuation(activeCoin);
    }
}

window.renderBtcValuation  = renderBtcValuation;
window.refreshBtcValuation = refreshBtcValuation;

})();
