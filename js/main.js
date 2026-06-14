// ── Translations ─────────────────────────────────────────────

const i18n = {
  en: {
    'nav.about':      'About',
    'nav.disclaimer': 'Disclaimer',
    'nav.research':   'Research',

    'hero.eyebrow':  'Private Investment Company',
    'hero.heading1': 'Navigating Global',
    'hero.heading2': 'Markets with Precision',
    'hero.sub':      'Strategic investment insights and opportunities across global markets.',

    'about.tag':        'About',
    'about.heading':    'About Polaris Global Strategies',
    'about.body':       'We focus on identifying and capitalizing on strategic opportunities across global markets.',
    'about.card1.title': 'Global Perspective',
    'about.card1.body':  'Navigating opportunities across international markets with strategic precision.',
    'about.card2.title': 'Private Capital',
    'about.card2.body':  'Focused deployment of private capital in high-conviction opportunities.',

    'disclaimer.tag':     'Legal',
    'disclaimer.heading': 'Disclaimer',
    'disclaimer.body':    'Polaris Global Strategies Ltd is a private investment company incorporated in the British Virgin Islands (BVI). The information contained on this website is provided for informational purposes only and does not constitute investment advice, a solicitation, or an offer to buy or sell any securities, financial instruments, or other assets. Polaris Global Strategies Ltd does not provide investment advisory or portfolio management services to the general public. Any investment activities described herein are conducted for the account of the company and its principals only. Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal. The information on this website is not directed at any person in any jurisdiction where such distribution or use would be contrary to local laws or regulations. Polaris Global Strategies Ltd makes no representation or warranty, express or implied, as to the accuracy, completeness, or fairness of the information contained herein.',

    'footer.copy': '© 2026 Polaris Global Strategies Ltd. All rights reserved. Incorporated in the British Virgin Islands.',

    'research.heading': 'Investment Research',
    'research.sub':     'Proprietary analysis and investment thesis reports.',
    'research.cta':     'View Report',
  },

  pt: {
    'nav.about':      'Sobre',
    'nav.disclaimer': 'Aviso Legal',
    'nav.research':   'Pesquisa',

    'hero.eyebrow':  'Empresa de Investimentos Privados',
    'hero.heading1': 'Navegando pelos',
    'hero.heading2': 'Mercados com Precisão',
    'hero.sub':      'Insights e oportunidades de investimento estratégico nos mercados globais.',

    'about.tag':        'Sobre',
    'about.heading':    'Sobre a Polaris Global Strategies',
    'about.body':       'A Polaris Global Strategies Ltd é uma empresa de investimentos privados constituída nas Ilhas Virgens Britânicas. Focamos em identificar e capitalizar oportunidades estratégicas nos mercados globais.',
    'about.card1.title': 'Perspectiva Global',
    'about.card1.body':  'Navegando oportunidades nos mercados internacionais com precisão estratégica.',
    'about.card2.title': 'Capital Privado',
    'about.card2.body':  'Alocação focada de capital privado em oportunidades de alta convicção.',

    'disclaimer.tag':     'Legal',
    'disclaimer.heading': 'Aviso Legal',
    'disclaimer.body':    'A Polaris Global Strategies Ltd é uma empresa de investimentos privados constituída nas Ilhas Virgens Britânicas (BVI). As informações contidas neste site são fornecidas exclusivamente para fins informativos e não constituem aconselhamento de investimento, solicitação ou oferta de compra ou venda de quaisquer valores mobiliários, instrumentos financeiros ou outros ativos. A Polaris Global Strategies Ltd não presta serviços de consultoria de investimentos ou gestão de carteiras ao público em geral. Quaisquer atividades de investimento descritas aqui são conduzidas exclusivamente por conta da empresa e de seus sócios. Desempenho passado não é indicativo de resultados futuros. Todo investimento envolve risco, incluindo a possível perda do capital principal. As informações neste site não são direcionadas a qualquer pessoa em jurisdição onde tal distribuição ou uso seja contrário às leis ou regulamentos locais. A Polaris Global Strategies Ltd não faz qualquer declaração ou garantia, expressa ou implícita, quanto à precisão, integralidade ou imparcialidade das informações aqui contidas.',

    'footer.copy': '© 2026 Polaris Global Strategies Ltd. Todos os direitos reservados. Constituída nas Ilhas Virgens Britânicas.',

    'research.heading': 'Pesquisa de Investimentos',
    'research.sub':     'Análise proprietária e relatórios de tese de investimento.',
    'research.cta':     'Ver Relatório',
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
