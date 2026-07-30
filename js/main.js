// ── Translations ─────────────────────────────────────────────

const i18n = {
  en: {
    'nav.about':      'About',
    'nav.letters':    'Letters',
    'nav.snapshot':   'Snapshot',
    'nav.research':   'Research',
    'nav.crypto':     'Crypto',

    'hero.eyebrow':  'Private Investment Company',
    'hero.heading1': 'Navigating Global',
    'hero.heading2': 'Markets with Precision',
    'hero.sub':      'Strategic investment insights and opportunities across global markets.',

    'about.tag':        'About',
    'about.heading':    'About Polaris Global Strategies',
    'about.body':       'Polaris Global Strategies is a private investment company focused on identifying and capitalizing on strategic opportunities across global markets. We operate with a diversified approach, exploring real, financial and digital assets to build and preserve value over time.',
    'about.card1.title': 'Global Perspective',
    'about.card1.body':  'Navigating opportunities across international markets with strategic precision.',
    'about.card2.title': 'Private Capital',
    'about.card2.body':  'Focused deployment of private capital in high-conviction opportunities.',

    'about.invest.heading': 'How We Invest',
    'about.invest.p1': 'Polaris Global Strategies invests with a simple yet demanding conviction: wealth is built by purchasing good businesses at reasonable prices and holding them for as long as it takes for value to be realized. We do not chase short-term price movements or market euphoria. We look for understandable businesses, managed with rational capital allocation, with predictable cash generation, low debt, and the ability to pass inflation through to customers. Every position enters the portfolio with a margin of safety and the expectation of remaining for years, not months.',
    'about.invest.p2': 'This discipline translates into concrete decisions. Holding cash is part of the thesis, not a residual position: liquidity gives us the ammunition to capitalize on opportunities that arise during corrections, without ever being forced to sell good assets to fund them. The diversification we build serves the same purpose of prudence. We combine equities in Brazil and the United States, exposure to markets beyond these two economies, long-contract logistics assets, and a store of value in Bitcoin and gold — sized with parsimony as patrimonial insurance against the erosion of fiat currencies.',
    'about.invest.p3': 'Above all, we are patient investors. Our permanent reference is the school of Warren Buffett and Charlie Munger, for whom the real money is made not in the buying or the selling, but in the waiting. It is this lens that guides how we evaluate every business, how we build the portfolio, and how we navigate cycles of fiscal and geopolitical uncertainty. We remain attentive, with cash available and without haste, faithful to the conviction that time is the best ally of a sound thesis.',

    'disclaimer.tag':     'Legal',
    'disclaimer.heading': 'Disclaimer',
    'disclaimer.body':    'Polaris Global Strategies Ltd is a private investment company. The information contained on this website is provided for informational purposes only and does not constitute investment advice, a solicitation, or an offer to buy or sell any securities, financial instruments, or other assets. Polaris Global Strategies Ltd does not provide investment advisory or portfolio management services to the general public. Any investment activities described herein are conducted for the account of the company and its principals only. Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal. The information on this website is not directed at any person in any jurisdiction where such distribution or use would be contrary to local laws or regulations. Polaris Global Strategies Ltd makes no representation or warranty, express or implied, as to the accuracy, completeness, or fairness of the information contained herein.',

    'contact.label': 'Inquiries:',

    'footer.copy': '© 2026 Polaris Global Strategies Ltd. All rights reserved.',

    'snapshot.eyebrow':    'Market Snapshot',
    'snapshot.heading':    'Market Snapshot',
    'snapshot.col.ticker': 'Ticker',
    'snapshot.col.price':  'Price (USD)',
    'snapshot.col.24h':    '% 24h',
    'snapshot.col.ytd':    '% YTD',
    'snapshot.col.5y':     '% 5Y',
    'snapshot.refresh':    'Refresh',
    'snapshot.loading':     'loading…',
    'snapshot.updated':     'updated',
    'snapshot.foot':        'Data: Yahoo Finance, fetched daily after market close (Mon–Fri, 22:30 UTC). Prices in USD &middot; <b>% 24h</b> previous close vs. prior close &middot; <b>% YTD</b> vs. last close of previous year &middot; <b>% 5Y</b> cumulative return &middot; GOLD = GC=F (continuous gold futures). Not investment advice.',
    'snapshot.notice.err':  'Could not load: <b>{t}</b>. Some assets had errors in the latest update.',
    'snapshot.notice.json': 'Market data not yet available. The daily update runs Mon–Fri at 22:30 UTC.',

    'research.heading': 'Investment Research',
    'research.sub':     'Each Polaris Global Strategies report is an institutional-grade equity research study on a single asset — B3-listed equities, U.S. stocks and ETFs, and other instruments. Data is sourced from primary sources (SEC filings, earnings calls, and leading financial press) and verified live for each edition, always covering the four most recently reported quarters in continuous sequence. Each document includes earnings analysis, competitive moat assessment, risks, bull and bear scenarios, valuation context, and a directional verdict (🟢 BUY / 🟡 NEUTRAL / 🔴 SELL). Conclusions describe the perceived risk/return profile — they never constitute buy or sell recommendations.',
    'research.sub2':    'Disclaimer: Content produced exclusively for internal use by Polaris Global Strategies Ltd. Does not constitute an investment recommendation for third parties, individuals, or legal entities. PGS does not provide asset management, advisory, or consulting services, has no clients, and offers no products to third parties. Investments in variable income involve risks, including total loss of capital.',
    'research.cta':     'View Report',
    'research.group.invested':  'Invested Companies',
    'research.group.evaluated': 'Evaluated · Not Invested',
    'research.group.note':      'Companies analyzed under the same methodology, in which no position was taken.',

    'letters.heading': 'Partner Letters',
    'letters.sub':     'Periodic letters on the conduct of the portfolio as a whole — the reasoning behind the decisions of each period, what changed in our reading of the environment, and what stayed the same. They complement the single-asset studies in Research rather than replacing them, and describe positions already held; they never constitute buy or sell recommendations.',
    'letters.note':    'Letters are published in English only.',
    'letters.sub2':    'Disclaimer: Content produced exclusively for internal use by Polaris Global Strategies Ltd. Does not constitute an investment recommendation for third parties, individuals, or legal entities. PGS does not provide asset management, advisory, or consulting services, has no clients, and offers no products to third parties.',
    'letters.cta':     'Read Letter',
  },

  pt: {
    'nav.about':      'Sobre',
    'nav.letters':    'Cartas',
    'nav.snapshot':   'Snapshot',
    'nav.research':   'Pesquisa',
    'nav.crypto':     'Cripto',

    'hero.eyebrow':  'Empresa de Investimentos Privados',
    'hero.heading1': 'Navegando pelos',
    'hero.heading2': 'Mercados com Precisão',
    'hero.sub':      'Insights e oportunidades de investimento estratégico nos mercados globais.',

    'about.tag':        'Sobre',
    'about.heading':    'Sobre a Polaris Global Strategies',
    'about.body':       'A Polaris Global Strategies é uma empresa privada de investimentos focada em identificar e capitalizar oportunidades estratégicas nos mercados globais. Atuamos com uma abordagem diversificada, explorando ativos reais, financeiros e virtuais para construir e preservar valor ao longo do tempo.',
    'about.card1.title': 'Perspectiva Global',
    'about.card1.body':  'Navegando oportunidades nos mercados internacionais com precisão estratégica.',
    'about.card2.title': 'Capital Privado',
    'about.card2.body':  'Alocação focada de capital privado em oportunidades de alta convicção.',

    'about.invest.heading': 'Como Investimos',
    'about.invest.p1': 'A Polaris Global Strategies investe com uma convicção simples e exigente: o patrimônio se constrói comprando bons negócios a preços razoáveis e carregando-os pelo tempo necessário para que o valor se realize. Não perseguimos o movimento de curto prazo nem a euforia do mercado. Buscamos empresas compreensíveis, geridas com racionalidade na alocação de capital, com geração de caixa previsível, baixo endividamento e capacidade de repassar inflação. Cada posição entra na carteira com margem de segurança e a expectativa de permanecer por anos, não por meses.',
    'about.invest.p2': 'Essa disciplina se traduz em decisões concretas. Carregar caixa é parte da tese, e não uma posição residual: a liquidez nos dá munição para aproveitar as oportunidades que surgem nas correções, sem nunca sermos forçados a vender bons ativos para financiá-las. A diversificação que construímos cumpre o mesmo propósito de prudência. Combinamos ações no Brasil e nos Estados Unidos, exposição a mercados além dessas duas economias, ativos logísticos de contrato longo e uma reserva de valor em Bitcoin e ouro, dimensionada com parcimônia como seguro patrimonial diante da deterioração das moedas fiduciárias.',
    'about.invest.p3': 'Acima de tudo, somos investidores de paciência. A referência permanente é a escola de Warren Buffett e Charlie Munger, para quem o dinheiro grande não está na compra ou na venda, mas na espera. É essa lente que orienta a forma como avaliamos cada negócio, como construímos a carteira e como atravessamos os ciclos de incerteza fiscal e geopolítica. Permanecemos atentos, com caixa disponível e sem pressa, fiéis à convicção de que o tempo é o melhor aliado de uma boa tese.',

    'disclaimer.tag':     'Legal',
    'disclaimer.heading': 'Aviso Legal',
    'disclaimer.body':    'A Polaris Global Strategies Ltd é uma empresa de investimentos privados. As informações contidas neste site são fornecidas exclusivamente para fins informativos e não constituem aconselhamento de investimento, solicitação ou oferta de compra ou venda de quaisquer valores mobiliários, instrumentos financeiros ou outros ativos. A Polaris Global Strategies Ltd não presta serviços de consultoria de investimentos ou gestão de carteiras ao público em geral. Quaisquer atividades de investimento descritas aqui são conduzidas exclusivamente por conta da empresa e de seus sócios. Desempenho passado não é indicativo de resultados futuros. Todo investimento envolve risco, incluindo a possível perda do capital principal. As informações neste site não são direcionadas a qualquer pessoa em jurisdição onde tal distribuição ou uso seja contrário às leis ou regulamentos locais. A Polaris Global Strategies Ltd não faz qualquer declaração ou garantia, expressa ou implícita, quanto à precisão, integralidade ou imparcialidade das informações aqui contidas.',

    'contact.label': 'Contato:',

    'footer.copy': '© 2026 Polaris Global Strategies Ltd. Todos os direitos reservados.',

    'snapshot.eyebrow':    'Panorama do Mercado',
    'snapshot.heading':    'Panorama do Mercado',
    'snapshot.col.ticker': 'Ativo',
    'snapshot.col.price':  'Preço (USD)',
    'snapshot.col.24h':    '% 24h',
    'snapshot.col.ytd':    '% no Ano',
    'snapshot.col.5y':     '% 5 Anos',
    'snapshot.refresh':    'Atualizar',
    'snapshot.loading':     'carregando…',
    'snapshot.updated':     'atualizado',
    'snapshot.foot':        'Dados: Yahoo Finance, atualizado diariamente após o fechamento do mercado (seg–sex, 22:30 UTC). Preços em USD &middot; <b>% 24h</b> fechamento anterior vs. fechamento prévio &middot; <b>% YTD</b> vs. último fechamento do ano anterior &middot; <b>% 5 Anos</b> retorno acumulado &middot; GOLD = GC=F (ouro futuro contínuo). Não é recomendação de investimento.',
    'snapshot.notice.err':  'Não foi possível carregar: <b>{t}</b>. Alguns ativos tiveram erros na última atualização.',
    'snapshot.notice.json': 'Dados de mercado ainda não disponíveis. A atualização diária ocorre seg–sex às 22:30 UTC.',

    'research.heading': 'Pesquisa de Investimentos',
    'research.sub':     'Cada relatório da Polaris Global Strategies é um estudo de equity research de nível institucional sobre um único ativo — ações da B3, ações e ETFs norte-americanos e outros instrumentos. Os dados vêm de fontes primárias (registros na SEC, teleconferências de resultados e imprensa financeira de primeira linha) e são reapurados ao vivo a cada edição, cobrindo sempre os quatro trimestres reportados mais recentes em sequência contínua. Cada documento reúne análise de resultados, avaliação de fosso competitivo, riscos, cenários bull e bear, contexto de valuation e um veredito direcional (🟢 COMPRA / 🟡 NEUTRO / 🔴 VENDA). As conclusões descrevem a relação risco/retorno percebida — nunca orientam decisões de compra ou venda.',
    'research.sub2':    'Aviso: Conteúdo produzido exclusivamente para uso interno da Polaris Global Strategies Ltd. Não constitui recomendação de investimento para terceiros, pessoas físicas ou jurídicas. A PGS não presta serviços de gestão, consultoria ou assessoria, não possui clientes e não oferece produtos a terceiros. Investimentos em renda variável envolvem riscos, inclusive perda total do capital.',
    'research.cta':     'Ver Relatório',
    'research.group.invested':  'Empresas Investidas',
    'research.group.evaluated': 'Avaliadas · Não Investidas',
    'research.group.note':      'Empresas analisadas sob a mesma metodologia, nas quais nenhuma posição foi assumida.',

    'letters.heading': 'Cartas aos Sócios',
    'letters.sub':     'Cartas periódicas sobre a condução da carteira como um todo — a lógica por trás das decisões de cada período, o que mudou na leitura de cenário e o que se manteve. Complementam os estudos por ativo da seção Pesquisa, sem substituí-los, e descrevem posições já assumidas; nunca orientam decisões de compra ou venda.',
    'letters.note':    'As cartas são publicadas apenas em inglês.',
    'letters.sub2':    'Aviso: Conteúdo produzido exclusivamente para uso interno da Polaris Global Strategies Ltd. Não constitui recomendação de investimento para terceiros, pessoas físicas ou jurídicas. A PGS não presta serviços de gestão, consultoria ou assessoria, não possui clientes e não oferece produtos a terceiros.',
    'letters.cta':     'Ler Carta',
  },
};

// ── Language Engine ───────────────────────────────────────────

function applyLanguage(lang) {
  const t = i18n[lang];
  if (!t) return;

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  localStorage.setItem('polaris-lang', lang);
}

// ── Init ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // Restore saved language (default: English)
  const saved = localStorage.getItem('polaris-lang') || 'en';
  applyLanguage(saved);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id === '#home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
