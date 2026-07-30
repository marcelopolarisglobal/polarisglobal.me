# Polaris Global Strategies — Manual Técnico e Funcional

**Versão:** 1.8  
**Data:** Julho 2026  
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
| Home | `index.html` | Página principal com Hero, About, Como Investimos e Disclaimer |
| Snapshot | `snapshot.html` | Cotações e retornos do último fechamento de mercado |
| Research | `research.html` | Listagem de todos os relatórios de investimento |
| Relatório | `reports/PGS-XXX-YYYYMM.html` | Relatório individual de tese de investimento |

> **Sub-sites independentes:** `crypto/` e `consulting/` são publicados por este mesmo repositório, mas sua documentação é mantida em projetos separados (ver `consulting/manual-website-ai.md`). Este manual não cobre a estrutura interna deles.

A navegação superior é fixa (*sticky*) em todas as páginas e inclui links para About, Disclaimer, Snapshot, Research e Crypto — nessa ordem. Links de About e Disclaimer nas páginas internas redirecionam para `index.html#about` e `index.html#disclaimer`. O link Crypto aponta para `/crypto/`, subdiretório deste repositório.

Cada relatório possui uma barra de navegação de volta ao site no topo (`✦ POLARIS GLOBAL / Research / PGS-XXX-YYYYMM`), que desaparece ao imprimir.

### 2.2 Navegação Interna — index.html

Seções acessadas via rolagem suave:

| Seção | ID | Descrição |
|---|---|---|
| Hero | `#home` | Apresentação principal da empresa |
| About | `#about` | Descrição institucional, diferenciais e filosofia de investimento |
| Disclaimer | `#disclaimer` | Aviso legal completo + linha de contato |
| Footer | — | Logo, links e copyright |

A seção `#about` contém dois blocos internos em sequência: o bloco institucional (texto + cards "Global Perspective" / "Private Capital") e o bloco "Como Investimos" / "How We Invest" (três parágrafos sobre filosofia, disciplina e paciência), separados por uma linha divisória.

### 2.3 Suporte a Idiomas

O site suporta dois idiomas com troca instantânea sem recarregar a página:

- **EN** — Inglês americano (padrão)
- **PT** — Português brasileiro

O idioma selecionado é salvo no `localStorage` do navegador. O atributo `lang` do HTML (`en-US` / `pt-BR`) é atualizado dinamicamente. A página `research.html` participa do sistema i18n (rótulos e botões são traduzidos). O conteúdo dos relatórios individuais permanece no idioma em que foi gerado (indicado pelo badge PT/EN no card).

### 2.4 Seção Research

A página `research.html` lista os relatórios disponíveis em cards com:

- Badge do ticker (ex: `BRK.B`, `GOOGL`, `TSLA`, `ITSA4`)
- Data do relatório (ex: `Jun 2026`)
- Badge de idioma (`EN` ou `PT`)
- Nome da empresa
- Tipo do relatório
- Link "View Report →" / "Ver Relatório →"

Os relatórios são exibidos em duas seções sequenciais, cada uma com um cabeçalho de grupo (`.report-group-head`) acima da grade: "Invested Companies" / "Empresas Investidas" e "Evaluated · Not Invested" / "Avaliadas · Não Investidas". Os cards são visualmente idênticos entre as duas seções — a distinção é apenas o cabeçalho.

A ordem dos cards dentro de "Invested Companies" é curada manualmente (não estritamente cronológica) — reflete a relevância/peso da posição na carteira, definida caso a caso ao adicionar um novo relatório. A seção "Evaluated · Not Invested" segue ordem de inclusão.

A pasta `reports/not-invested/` guarda os relatórios de empresas avaliadas e não investidas. Eles permanecem versionados, acessíveis por URL direta, e **recebem card** em `research.html`, exibidos na segunda seção da página.

### 2.5 Convenção de Nomenclatura dos Relatórios

```
PGS-{TICKER}-{YYYYMM}.html
```

Exemplos: `PGS-BRKB-202606.html`, `PGS-GOOGL-202607.html`, `PGS-TSLA-202607.html`, `PGS-ITSA4-202606.html`

Relatórios complementares (workbooks, carteiras) usam sufixo descritivo: `PGS-WAGN-202606-Carteira.html`

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
| Fontes | Google Fonts (Playfair Display + DM Sans + JetBrains Mono) via CDN |
| Dados de mercado | Python + `yfinance`, executado via GitHub Actions |

### 3.2 Estrutura de Arquivos

```
polarisglobal.me/
├── index.html             ← página principal
├── snapshot.html          ← panorama de mercado (lê data/snapshot.json)
├── research.html          ← listagem de relatórios
├── IMG_0956.JPG           ← ilustração Wall Street (fundo da hero section)
├── CNAME                  ← domínio customizado para GitHub Pages
├── .gitignore             ← exclui .DS_Store e backup/
├── css/
│   └── styles.css         ← design system (tema Wall Street Noir)
├── js/
│   └── main.js            ← motor de i18n e comportamentos
├── data/
│   └── snapshot.json      ← dados de mercado gerados pelo GitHub Actions
├── scripts/
│   └── update-snapshot.py ← script Python que busca e grava snapshot.json
├── .github/
│   └── workflows/
│       └── market-data.yml ← workflow: roda o script seg–sex às 22:30 UTC
├── crypto/                ← sub-site — projeto independente
├── consulting/            ← sub-site — projeto independente
└── reports/               ← relatórios HTML individuais
    ├── not-invested/      ← avaliados e não investidos (com card em research.html)
    │   ├── PGS-LVBI11-202607.html
    │   ├── PGS-MGM-202606.html
    │   └── PGS-SMFT3-202607.html
    ├── PGS-AMZN-202607.html
    ├── PGS-BRKB-202606.html
    ├── PGS-BTLG11-202607.html
    ├── PGS-GOOGL-202607.html
    ├── PGS-ITSA4-202606.html
    ├── PGS-KLBN11-202606.html
    ├── PGS-PSSA3-202606.html
    ├── PGS-TSLA-202607.html
    ├── PGS-VULC3-202606.html
    ├── PGS-WAGN-202606.html
    ├── PGS-WAGN-202606-Carteira.html
    └── PGS-XPLG11-202607.html
```

### 3.3 Design System

**Tema: Wall Street Noir** — fundo escuro com tons quentes, acento ouro vintage, tipografia serif editorial.

**Paleta — site principal (`index.html`, `research.html`, `snapshot.html`):**

```css
--bg:          #0C0B09   /* fundo principal (preto quente) */
--bg-card:     #161411   /* fundo de cards */
--bg-surface:  #1E1B16   /* superfície elevada */
--gold:        #C8A95E   /* acento ouro vintage */
--gold-dim:    rgba(200, 169, 94, 0.12)  /* fundo de badges e destaques */
--text:        #EDE8DF   /* texto principal (branco-creme) */
--text-muted:  #9E9689   /* texto secundário (cinza quente) */
--text-faint:  #4A4540   /* texto terciário */
--border:      rgba(255, 255, 255, 0.07)
--border-hover: rgba(200, 169, 94, 0.3)
--up:          #4FB286   /* positivo (verde) */
--down:        #D96A50   /* negativo (vermelho) */
```

**Tipografia — site principal:**
- `Playfair Display` (pesos 400–800, itálico) — títulos, headings, display
- `DM Sans` (pesos 300–500) — corpo de texto e interface
- `JetBrains Mono` (pesos 400–500) — dados numéricos em `snapshot.html`

**Asset visual:**
- `IMG_0956.JPG` — ilustração panorâmica de Wall Street anos 50 (estilo graphic novel), usada como fundo da hero section com overlay escuro (`rgba(12,11,9,0.82)`)

**Relatórios individuais** possuem tema claro próprio com fontes e variáveis CSS independentes (Playfair Display + DM Sans + JetBrains Mono, paleta laranja/azul por empresa). Não dependem de `css/styles.css`.

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
| `about.*` | Textos institucionais, cards e bloco "Como Investimos" |
| `about.invest.*` | Heading e 3 parágrafos da filosofia de investimento |
| `contact.*` | Linha de contato após o disclaimer (`contact.label`) |
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

Ou localmente (requer `yfinance` instalado):
```bash
python3 scripts/update-snapshot.py
git add data/snapshot.json
git commit -m "data: update market snapshot manual"
git push
```

**Atenção:** Não abrir `snapshot.html` diretamente como arquivo (`file://`) — o `fetch()` é bloqueado pelo browser por segurança. Sempre usar um servidor HTTP local (`python3 -m http.server 8743`) ou o site publicado.

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

### 5.3 Adicionar texto traduzível (i18n)

Todo texto visível ao usuário em `index.html` ou `research.html` deve:

1. Ter atributo `data-i18n="namespace.chave"` no elemento HTML
2. Ter entradas correspondentes em ambos os blocos (`en` e `pt`) do objeto `i18n` em `js/main.js`

```js
// em js/main.js
en: { 'namespace.chave': 'English text' }
pt: { 'namespace.chave': 'Texto em português' }
```

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

4. Adicionar um novo `<article class="report-card">` em `research.html`. Na seção "Invested Companies", a posição do card não segue ordem cronológica fixa — é definida manualmente conforme a relevância da posição na carteira (confirmar com o gestor onde inserir). Na seção "Evaluated · Not Invested", adicionar ao final:

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
git commit -m "feat(reports): add PGS-TICKER-YYYYMM"
git push
```

**Relatórios de empresas avaliadas e não investidas:** seguem o mesmo fluxo, mas com três diferenças:

- O arquivo vai em `reports/not-invested/PGS-TICKER-YYYYMM.html` (um nível mais fundo).
- A topbar usa `../../` em vez de `../` nos links (`../../index.html`, `../../research.html`).
- O card correspondente entra na segunda seção de `research.html` ("Evaluated · Not Invested" / "Avaliadas · Não Investidas"), não na primeira.

### 5.5 Remover um relatório

1. Deletar o arquivo em `reports/`
2. Remover o `<article class="report-card">` correspondente em `research.html`
3. Commitar e fazer push

---

## 6. Backup e Restauração

### 6.1 Mecanismo

Os backups são **tags Git** — marcadores permanentes no histórico do repositório que apontam para um commit específico. Uma tag não é afetada por commits futuros: mesmo após dezenas de alterações, ela continua apontando para o estado exato do momento em que foi criada. As tags são armazenadas tanto localmente quanto no GitHub.

### 6.2 Criar um novo backup

```bash
# Identificar o hash do commit atual
git log --oneline -1

# Criar a tag (substituir a data)
git tag backup-YYYY-MM-DD <hash>

# Enviar para o GitHub
git push origin backup-YYYY-MM-DD
```

### 6.3 Histórico de Backups

| Tag | Data | Commit | Descrição |
|---|---|---|---|
| `backup-2026-06-26` | 26 Jun 2026 | `9c0c213` | Estado inicial — antes do redesign Wall Street Noir |

### 6.4 Restaurar um backup

Para restaurar todos os arquivos ao estado de um backup específico, sem perder o histórico:

```bash
# Voltar os arquivos para o estado da tag (sem fazer commit ainda)
git checkout backup-YYYY-MM-DD -- .

# Revisar o que mudou
git status

# Confirmar a restauração
git add -A
git commit -m "restore: volta ao estado de backup-YYYY-MM-DD"
git push
```

---

## 7. Contato e Titularidade

| Item | Valor |
|---|---|
| Empresa | Polaris Global Strategies Ltd |
| Jurisdição | British Virgin Islands (BVI) |
| E-mail institucional | contact@polarisglobal.me |
| E-mail do gestor | marcelo.polaris.global@gmail.com |
| Domínio | polarisglobal.me |
| Ano de referência legal | 2026 |
