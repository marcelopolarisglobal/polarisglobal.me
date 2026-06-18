# Polaris Global Strategies — Manual Técnico e Funcional

**Versão:** 1.5  
**Data:** Junho 2026  
**Domínio:** https://polarisglobal.me

---

## 1. Visão Geral

O site da Polaris Global Strategies Ltd é uma presença online institucional para a empresa privada de investimentos, focada em identificar e capitalizar oportunidades estratégicas nos mercados globais com uma abordagem diversificada em ativos reais, financeiros e virtuais. É um site estático, bilíngue (EN/PT), composto por uma página principal e uma seção de pesquisa de investimentos com relatórios individuais em HTML.

---

## 2. Especificação Funcional

### 2.1 Estrutura de Páginas

O site é composto por três camadas de páginas:

| Página | Arquivo | Descrição |
|---|---|---|
| Home | `index.html` | Página principal com Hero, About e Disclaimer |
| Snapshot | `snapshot.html` | Cotações e retornos do último fechamento de mercado |
| Research | `research.html` | Listagem de todos os relatórios de investimento |
| Relatório | `reports/PGS-XXX-YYYYMM.html` | Relatório individual de tese de investimento |

A navegação superior é fixa (*sticky*) em todas as páginas e inclui links para About, Disclaimer, Snapshot, Research e Crypto — nessa ordem. Links de About e Disclaimer nas páginas internas redirecionam para `index.html#about` e `index.html#disclaimer`. O link Crypto aponta para `/crypto/` (página externa ao site estático).

Cada relatório possui uma barra de navegação de volta ao site no topo (`✦ POLARIS GLOBAL / Research / PGS-XXX-YYYYMM`), que desaparece ao imprimir.

### 2.2 Navegação Interna — index.html

Seções acessadas via rolagem suave:

| Seção | ID | Descrição |
|---|---|---|
| Hero | `#home` | Apresentação principal da empresa |
| About | `#about` | Descrição institucional e diferenciais |
| Disclaimer | `#disclaimer` | Aviso legal completo |
| Footer | — | Logo, links e copyright |

### 2.3 Suporte a Idiomas

O site suporta dois idiomas com troca instantânea sem recarregar a página:

- **EN** — Inglês americano (padrão)
- **PT** — Português brasileiro

O idioma selecionado é salvo no `localStorage` do navegador. O atributo `lang` do HTML (`en-US` / `pt-BR`) é atualizado dinamicamente. A página `research.html` participa do sistema i18n (rótulos e botões são traduzidos). O conteúdo dos relatórios individuais permanece no idioma em que foi gerado (indicado pelo badge PT/EN no card).

### 2.4 Seção Research

A página `research.html` lista os relatórios disponíveis em cards com:

- Badge do ticker (ex: `BRK.B`, `GOOGL`, `TSLA`, `EQTL3`)
- Data do relatório (ex: `Jun 2026`)
- Badge de idioma (`EN` ou `PT`)
- Nome da empresa
- Tipo do relatório
- Link "View Report →" / "Ver Relatório →"

Os relatórios são exibidos do mais recente para o mais antigo.

### 2.5 Convenção de Nomenclatura dos Relatórios

```
PGS-{TICKER}-{YYYYMM}.html
```

Exemplos: `PGS-BRKB-202606.html`, `PGS-GOOGL-202606.html`, `PGS-TSLA-202606.html`, `PGS-EQTL3-202606.html`

### 2.6 Responsividade

| Breakpoint | Comportamento |
|---|---|
| > 900px | Layout completo com links de navegação visíveis |
| ≤ 900px | Links de navegação ocultados (mantém logo e toggle de idioma) |
| ≤ 768px | Layout de coluna única; cards empilhados verticalmente |
| ≤ 480px | Espaçamentos reduzidos para telas pequenas |

---

## 3. Especificação Técnica

### 3.1 Stack

O site é **estático puro** — não utiliza servidor de aplicação, banco de dados ou framework. A única automação de backend é o pipeline de dados do Snapshot, executado via GitHub Actions.

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 com Custom Properties (variáveis nativas) |
| Comportamento | JavaScript ES6+ vanilla (sem dependências) |
| Fontes | Google Fonts (Outfit + Inter + IBM Plex Mono) via CDN |
| Dados de mercado | Python + `yfinance`, executado via GitHub Actions |

### 3.2 Estrutura de Arquivos

```
polarisglobal.me/
├── index.html             ← página principal
├── snapshot.html          ← panorama de mercado (lê data/snapshot.json)
├── research.html          ← listagem de relatórios
├── CNAME                  ← domínio customizado para GitHub Pages
├── css/
│   └── styles.css         ← design system (tema escuro azul)
├── js/
│   └── main.js            ← motor de i18n e comportamentos
├── data/
│   └── snapshot.json      ← dados de mercado gerados pelo GitHub Actions
├── scripts/
│   └── update-snapshot.py ← script Python que busca e grava snapshot.json
├── .github/
│   └── workflows/
│       └── market-data.yml ← workflow: roda o script seg–sex às 22:30 UTC
└── reports/               ← relatórios HTML individuais
    ├── PGS-BRKB-202606.html
    ├── PGS-EQTL3-202606.html
    ├── PGS-GOOGL-202606.html
    ├── PGS-ITSA4-202606.html
    ├── PGS-KLBN11-202606.html
    ├── PGS-PSSA3-202606.html
    ├── PGS-TSLA-202606.html
    └── PGS-VULC3-202606.html
```

### 3.3 Design System

**Paleta — tema escuro (site principal e research.html):**

```css
--bg:          #07090F   /* fundo principal */
--bg-card:     #0E1520   /* fundo de cards */
--blue:        #3B82F6   /* azul primário */
--blue-light:  #60A5FA   /* azul claro (destaques) */
--text:        #F1F5F9   /* texto principal */
--text-muted:  #94A3B8   /* texto secundário */
```

**Tipografia:**
- `Outfit` (pesos 600–800) — títulos e headings
- `Inter` (pesos 300–600) — corpo de texto e interface
- `IBM Plex Mono` (pesos 400–600) — dados numéricos em `snapshot.html`

Os relatórios individuais possuem tema claro próprio com fontes e variáveis CSS independentes (Playfair Display + DM Sans). Não dependem de `css/styles.css`.

### 3.4 Sistema de Internacionalização (i18n)

Cada elemento de texto traduzível possui o atributo `data-i18n` com uma chave única:

```html
<p data-i18n="hero.eyebrow">Private Investment Company</p>
```

O arquivo `js/main.js` contém o objeto `i18n` com traduções EN e PT indexadas por essas chaves. A função `applyLanguage(lang)` percorre todos os elementos `[data-i18n]` e substitui o `textContent`. O mesmo `main.js` é usado por `index.html` e `research.html`.

**Chaves existentes por namespace:**

| Namespace | Descrição |
|---|---|
| `nav.*` | Links de navegação (about, disclaimer, snapshot, research, crypto) |
| `hero.*` | Textos da seção Hero |
| `about.*` | Textos e cards da seção About |
| `disclaimer.*` | Textos da seção Disclaimer |
| `snapshot.*` | Textos de `snapshot.html` (heading, colunas, stamp, rodapé, avisos) |
| `research.*` | Textos da página Research (heading, sub, sub2, cta) |
| `footer.*` | Copyright do rodapé |

---

## 4. Infraestrutura e Publicação

### 4.1 Repositório GitHub

| Item | Valor |
|---|---|
| Conta | `marcelopolarisglobal` |
| Repositório | `polarisglobal.me` |
| Visibilidade | Público |
| URL | https://github.com/marcelopolarisglobal/polarisglobal.me |
| Branch principal | `main` |

### 4.2 GitHub Pages

| Item | Valor |
|---|---|
| Fonte | Branch `main`, pasta `/` |
| Domínio customizado | `polarisglobal.me` |
| HTTPS | Ativado (Let's Encrypt, gerenciado pelo GitHub) |
| URL principal | https://polarisglobal.me |
| URL alternativa | https://marcelopolarisglobal.github.io/polarisglobal.me |

O GitHub Pages detecta novos commits no branch `main` e publica automaticamente em ~1 minuto.

### 4.3 Domínio — GoDaddy

**Registrador:** GoDaddy | **Domínio:** `polarisglobal.me`

| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| `A` | `@` | `185.199.108.153` | 600 |
| `A` | `@` | `185.199.109.153` | 600 |
| `A` | `@` | `185.199.110.153` | 600 |
| `A` | `@` | `185.199.111.153` | 600 |
| `CNAME` | `www` | `marcelopolarisglobal.github.io` | 600 |

---

## 5. Fluxo de Atualização do Site

### 5.1 Alterações gerais (texto, estilo, estrutura)

```bash
# 1. Editar os arquivos desejados
# 2. Registrar as mudanças
git add <arquivo(s)>
git commit -m "descrição da mudança"
# 3. Publicar (atualiza em ~1 minuto)
git push
```

### 5.2 Página Snapshot

A página `snapshot.html` exibe preços e retornos (% 24h, % YTD, % 5 Anos) do último fechamento de mercado. Os dados são buscados **no servidor** via GitHub Actions e armazenados em `data/snapshot.json`. O browser apenas lê esse arquivo estático — sem chamadas externas, sem restrição de CORS.

**Ativos monitorados:** SPY · QQQ · EWZ · BTC-USD · GC=F (GOLD)

**Frequência de atualização:** segunda a sexta, automaticamente às 22:30 UTC (após fechamento da NYSE). O timestamp da última atualização é exibido na própria página.

**Atualização manual (fora do horário agendado):**
Acesse `github.com/marcelopolarisglobal/polarisglobal.me → Actions → Update Market Snapshot → Run workflow`.

**Para adicionar ou remover um ativo:**

1. Editar o array `ASSETS` em `scripts/update-snapshot.py`:

```python
ASSETS = [
    {"ticker": "SPY",  "symbol": "SPY",     "name": "SPDR S&P 500 ETF"},
    # adicionar ou remover entradas aqui
]
```

2. Editar o array `ASSETS` no `<script>` inline de `snapshot.html` (usado apenas para montar o esqueleto visual da tabela):

```javascript
const ASSETS = [
  { ticker: "SPY", name: "SPDR S&P 500 ETF" },
  // mesmo conjunto do script Python
];
```

3. Commitar, fazer push e acionar o workflow manualmente para gerar o novo `snapshot.json`.

### 5.4 Adicionar um novo relatório

1. Colocar o arquivo HTML gerado em `reports/` seguindo a convenção `PGS-{TICKER}-{YYYYMM}.html`

2. Inserir a barra de navegação de volta ao site **antes do primeiro `<div>` ou `<nav>` do `<body>`**:

```html
<div class="pgs-topbar">
  <a href="../index.html" class="pgs-brand">✦ POLARIS GLOBAL</a>
  <span class="pgs-sep">/</span>
  <a href="../research.html">Research</a>
  <span class="pgs-sep">/</span>
  <span style="color:#475569;">PGS-TICKER-YYYYMM</span>
</div>
```

3. Inserir também o CSS do topbar antes de `</style>` no `<head>` do relatório:

```css
.pgs-topbar {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 24px; background: #07090F;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  font-family: system-ui, sans-serif; font-size: 12px;
}
.pgs-topbar a { color: #94A3B8; text-decoration: none; }
.pgs-topbar a:hover { color: #F1F5F9; }
.pgs-topbar .pgs-brand { color: #60A5FA; font-weight: 700; letter-spacing: 0.12em; font-size: 11px; }
.pgs-topbar .pgs-sep { color: #334155; }
@media print { .pgs-topbar { display: none !important; } }
```

4. Adicionar um novo `<article class="report-card">` em `research.html` (mais recentes no topo):

```html
<!-- PGS-TICKER-YYYYMM -->
<article class="report-card">
  <div class="report-card-meta">
    <span class="report-ticker">TICKER</span>
    <span class="report-date">Mês AAAA</span>
    <span class="report-lang">EN</span>
  </div>
  <h2 class="report-company">Nome da Empresa</h2>
  <p class="report-type">Tipo do Relatório</p>
  <a href="reports/PGS-TICKER-YYYYMM.html" class="report-cta">
    <span data-i18n="research.cta">View Report</span> →
  </a>
</article>
```

5. Commitar e fazer push:

```bash
git add reports/PGS-TICKER-YYYYMM.html research.html
git commit -m "Add PGS-TICKER-YYYYMM report"
git push
```

### 5.5 Remover um relatório

1. Deletar o arquivo em `reports/`
2. Remover o `<article class="report-card">` correspondente em `research.html`
3. Commitar e fazer push

---

## 6. Contato e Titularidade

| Item | Valor |
|---|---|
| Empresa | Polaris Global Strategies Ltd |
| Jurisdição | British Virgin Islands (BVI) |
| E-mail | marcelo.polaris.global@gmail.com |
| Domínio | polarisglobal.me |
| Ano de referência legal | 2026 |
