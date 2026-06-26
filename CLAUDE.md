# Polaris Global Strategies — Instruções para Claude Code

## Visão Geral do Projeto

Site institucional estático da Polaris Global Strategies Ltd (empresa de investimentos privados, BVI). Multi-página, bilíngue EN/PT, hospedado no GitHub Pages em `polarisglobal.me`. Sem framework, sem build step — HTML/CSS/JS puro.

## Estrutura de Arquivos

```
index.html          ← página principal (Hero, About, Disclaimer)
research.html       ← listagem de relatórios de investimento
css/styles.css      ← design system completo (tema escuro azul)
js/main.js          ← sistema i18n + smooth scroll
reports/            ← relatórios HTML individuais (autocontidos)
CNAME               ← domínio customizado para GitHub Pages
```

## Regras de Desenvolvimento

- Nunca criar arquivos de build, configuração de bundler, package.json ou dependências npm — o site é estático puro
- Sempre editar arquivos existentes em vez de criar novos, exceto quando se trata de novas páginas ou novos relatórios
- Não adicionar comentários ao código além do mínimo necessário
- O `css/styles.css` contém o design system e é compartilhado por `index.html` e `research.html` — não criar CSS separado para essas páginas
- Os relatórios em `reports/` possuem CSS embutido próprio e **não** usam `styles.css`

## Sistema i18n

Toda string de UI visível ao usuário deve ter `data-i18n="chave"` no HTML e entrada correspondente no objeto `i18n` de `js/main.js` (em EN e PT). A função `applyLanguage()` percorre todos os elementos `[data-i18n]` e substitui `textContent`.

Ao adicionar texto novo em qualquer página que use `main.js`, sempre adicionar a chave nos dois idiomas.

## Navegação entre Páginas

- Em `index.html`: links internos usam `#ancora` (smooth scroll via JS)
- Em `research.html`: links para About/Disclaimer usam `index.html#ancora` (navegação normal de página)
- Em relatórios (`reports/*.html`): links de volta usam `../index.html` e `../research.html` (um nível acima)

## Relatórios de Investimento

**Convenção de nome:** `PGS-{TICKER}-{YYYYMM}.html`

Cada relatório precisa de:
1. Barra de topbar no `<body>` (antes do primeiro div/nav) com links de volta ao site
2. CSS do topbar inserido antes de `</style>` no `<head>`

O card correspondente em `research.html` exibe: ticker, data, badge de idioma (EN/PT), nome da empresa, tipo do relatório e link.

Cards são ordenados do mais recente para o mais antigo.

## Deploy

```bash
git add <arquivos>
git commit -m "mensagem"
git push   # GitHub Pages publica automaticamente em ~1 minuto
```

Repositório: `github.com/marcelopolarisglobal/polarisglobal.me`, branch `main`.
