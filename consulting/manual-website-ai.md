# Manual Técnico e Funcional — Website IA Corporativa

**URL:** https://polarisglobal.me/consulting/
**Repositório:** github.com/marcelopolarisglobal/polarisglobal.me (pasta `/consulting/`)
**Autor:** Marcelo Santos
**Data:** Junho de 2026

---

## 1. Visão geral

Site estático de publicação de conteúdo sobre inteligência artificial com foco corporativo. Não depende de frameworks, CMS ou banco de dados — é HTML e CSS puro, hospedado no GitHub Pages.

**Por que estático:**
- Zero custo de infraestrutura
- Sem superfície de ataque em servidor
- Deploy automático via git push
- Carregamento rápido, sem dependências de runtime

**Arquitetura de hospedagem:**
O site vive como subpasta do repositório principal `polarisglobal.me`. O GitHub Pages serve o domínio `polarisglobal.me` a partir desse repo — tudo que estiver na pasta `consulting/` é automaticamente acessível em `polarisglobal.me/consulting/`. Nenhuma configuração de DNS adicional é necessária.

---

## 2. Estrutura de arquivos

```
polarisglobal.me/          ← repo no GitHub
└── consulting/            ← raiz do site de IA
    ├── index.html         ← homepage (lista de artigos)
    ├── .nojekyll          ← desativa Jekyll no GitHub Pages
    ├── css/
    │   └── site.css       ← todo o CSS do site
    └── artigos/
        └── governanca-ia-empresas.html   ← primeiro artigo
```

Cada novo artigo vai em `artigos/nome-do-artigo.html`. O CSS é compartilhado por todas as páginas.

---

## 3. Sistema visual

A identidade visual foi derivada de um arquivo de estilo para carrossel LinkedIn (formato 1080×1350), adaptada para scroll web responsivo.

### 3.1 Paleta de cores

| Variável CSS    | Valor     | Uso                              |
|-----------------|-----------|----------------------------------|
| `--cream`       | `#FAF9F5` | Fundo principal                  |
| `--panel`       | `#F0EEE6` | Fundo de cards e callouts        |
| `--ink`         | `#23201A` | Texto principal e cover escuro   |
| `--ink-soft`    | `#6B6558` | Texto secundário e metadados     |
| `--blue`        | `#2B69BF` | Destaque, bordas e marcadores    |
| `--blue-deep`   | `#1A4480` | Eyebrows, labels e links         |
| `--line`        | `#DAD4C4` | Divisórias e bordas suaves       |

### 3.2 Tipografia

| Fonte            | Peso(s)       | Uso                                    |
|------------------|---------------|----------------------------------------|
| **Fraunces**     | 400, 500, 600 | Títulos h1/h2/h3, callouts, autoria    |
| **Inter**        | 400, 500, 600 | Corpo de texto, parágrafos             |
| **JetBrains Mono**| 400, 500     | Eyebrows, labels, tags, metadados      |

Carregadas via Google Fonts CDN com `<link rel="preconnect">` no `<head>` de cada página.

### 3.3 Componentes CSS disponíveis

Todos os componentes estão definidos em `css/site.css` e prontos para reutilização em novos artigos.

| Classe(s)                     | O que faz                                               |
|-------------------------------|---------------------------------------------------------|
| `.eyebrow`                    | Label em monospace uppercase azul acima dos títulos     |
| `.article-cover`              | Hero escuro com título grande (usado no topo do artigo) |
| `.spine` + `.spine__tag`      | Barra lateral decorativa com texto vertical (desktop)   |
| `.article-section`            | Container de seção com separador inferior               |
| `.list` + `.list__item`       | Lista com marcadores estilizados (01, —, →, +)         |
| `.callout`                    | Citação em destaque com borda azul esquerda             |
| `.two-col` + `.card`          | Grid de dois cards com borda superior azul              |
| `table.risk`                  | Tabela de riscos com estilo editorial                   |
| `.closing-block`              | Bloco de fechamento com duas linhas (serif + itálico)   |
| `.author-block`               | Bloco de autoria com nome, link e disclaimer            |
| `.article-card`               | Card clicável para a homepage                           |
| `.sub-label`                  | Rótulo de subseção em monospace (ex: "3.1")             |
| `.rule`                       | Linha azul decorativa (48px × 2px)                      |

---

## 4. Como adicionar um novo artigo

### Passo 1 — Criar o arquivo HTML

Copie a estrutura de `artigos/governanca-ia-empresas.html` e ajuste o conteúdo. O caminho do CSS, do logo e do rodapé já estão corretos para qualquer arquivo dentro de `artigos/`.

```html
<!-- Caminho do CSS (sempre assim para arquivos em /artigos/) -->
<link rel="stylesheet" href="../css/site.css">

<!-- Link de volta para a homepage -->
<a href="../index.html" class="site-logo">Marcelo Santos</a>
```

### Passo 2 — Estrutura padrão do artigo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descrição do artigo para SEO.">
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src 'self' https://fonts.googleapis.com;
             font-src https://fonts.gstatic.com; img-src 'self';
             base-uri 'self'; form-action 'none'">
  <title>Título do Artigo — Marcelo Santos</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/site.css">
</head>
<body>

  <header class="site-header">
    <div class="site-header__inner">
      <a href="../index.html" class="site-logo">Marcelo Santos</a>
      <span class="site-tagline">IA com foco corporativo</span>
    </div>
  </header>

  <main>
    <article>
      <header class="article-cover">
        <div class="article-cover__inner">
          <p class="cover-mark">Categoria · Mês de Ano</p>
          <h1 class="cover-title">Título principal com <em>destaque</em></h1>
          <p class="cover-sub">Subtítulo ou lead do artigo.</p>
          <div class="cover-meta">
            <span>Marcelo Santos</span>
          </div>
        </div>
      </header>

      <div class="article-wrapper">
        <div class="spine" aria-hidden="true">
          <span class="spine__dot"></span>
          <span class="spine__tag">Categoria</span>
          <span class="spine__dot"></span>
        </div>
        <div class="article-content">

          <section id="secao-1" class="article-section">
            <span class="eyebrow">01 · Nome da Seção</span>
            <h2>Título da seção</h2>
            <p>Conteúdo...</p>
          </section>

          <!-- mais seções -->

          <div class="author-block">
            <div class="author-name">Marcelo Santos</div>
            <a class="author-link" href="https://www.linkedin.com/in/marcelomirandadossantos/" rel="noopener noreferrer">linkedin.com/in/marcelomirandadossantos</a>
            <p class="disclaimer">Disclaimer do artigo.</p>
          </div>

        </div>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <span class="site-footer__copy">© 2026 Marcelo Santos</span>
      <a href="https://www.linkedin.com/in/marcelomirandadossantos/" class="site-footer__link" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </footer>

</body>
</html>
```

### Passo 3 — Adicionar o card na homepage

Abra `index.html` e adicione um novo `<a class="article-card">` dentro de `.content-grid`:

```html
<a href="artigos/nome-do-novo-artigo.html" class="article-card">
  <span class="article-card__tag">Categoria · Mês Ano</span>
  <div class="article-card__title">Título do Novo Artigo</div>
  <p class="article-card__desc">Descrição curta do conteúdo.</p>
  <div class="article-card__meta">X seções · Tempo de leitura</div>
</a>
```

Atualize também o contador no `.home-hero__stat-number` (atualmente `1`).

### Passo 4 — Publicar

```bash
# No diretório clonado do repo polarisglobal.me
git add consulting/
git commit -m "Adiciona artigo: Título do Novo Artigo"
git push
```

O GitHub Pages recompila automaticamente em ~1 minuto.

---

## 5. Como editar um artigo existente

Edite diretamente o arquivo HTML em `consulting/artigos/nome-do-artigo.html`. Não há build step, template engine ou pré-processador — o que está no arquivo é o que aparece na página.

Após salvar:

```bash
git add consulting/artigos/nome-do-artigo.html
git commit -m "Atualiza: descrição da mudança"
git push
```

---

## 6. Segurança

### Content Security Policy (CSP)

Cada página HTML tem uma meta tag CSP no `<head>`:

```
default-src 'none';
style-src   'self' https://fonts.googleapis.com;
font-src    https://fonts.gstatic.com;
img-src     'self';
base-uri    'self';
form-action 'none'
```

**O que isso garante:**
- Nenhum script pode ser executado (nem inline, nem externo)
- Estilos só carregam do próprio site e do Google Fonts
- Fontes só carregam do Google Fonts CDN
- Não há formulários nem injeção de `<base>`
- Ataques XSS e injeção de conteúdo externo são bloqueados pelo browser

**Limitação:** GitHub Pages não suporta headers HTTP personalizados — por isso o CSP é via meta tag, que não cobre `frame-ancestors`. Para sites que precisam desse controle (impedir embed em iframes externos), seria necessário um proxy (ex: Cloudflare Workers).

### Links externos

Todos os links para domínios externos (LinkedIn, etc.) têm:
```html
rel="noopener noreferrer"
```
Isso impede que a página aberta acesse `window.opener` e não envia o header `Referer`.

---

## 7. Responsividade

Breakpoint único em `768px` (definido em `css/site.css`):

| Elemento          | Desktop (≥768px)         | Mobile (<768px)             |
|-------------------|--------------------------|-----------------------------|
| `.spine`          | Visível (64px de largura)| Oculta (`display: none`)    |
| `.two-col`        | Duas colunas             | Coluna única                |
| `table.risk`      | Tabela normal            | Scroll horizontal           |
| `.article-content`| Padding 52px esquerda    | Padding 20px                |
| `.home-hero`      | Linha (flex row)         | Coluna (flex column)        |
| `.content-grid`   | Auto-fill ≥320px         | Coluna única                |

---

## 8. Deploy e repositórios

### Repositório do site de IA

| Item | Valor |
|---|---|
| Repo | `marcelopolarisglobal/polarisglobal.me` |
| Pasta | `consulting/` |
| Branch | `main` |
| URL ao vivo | `https://polarisglobal.me/consulting/` |

> **Atenção:** existe também o repo `marcelopolarisglobal/consulting` criado durante o processo, que serve `marcelopolarisglobal.github.io/consulting/`. Esse repo pode ser mantido como mirror ou deletado — o site oficial está no `polarisglobal.me`.

### Fluxo de trabalho

```bash
# 1. Clonar o repo principal (primeira vez)
git clone https://github.com/marcelopolarisglobal/polarisglobal.me.git
cd polarisglobal.me

# 2. Editar arquivos dentro de consulting/

# 3. Publicar
git add consulting/
git commit -m "mensagem descritiva"
git push
# → GitHub Pages recompila em ~1 minuto
```

### Verificar se o deploy foi concluído

```bash
curl -so /dev/null -w "%{http_code}" https://polarisglobal.me/consulting/
# Deve retornar 200
```

---

## 9. Fases planejadas

### Fase 1 — Concluída (Junho 2026)
- Homepage com card de artigo
- Artigo: Guia de Governança de IA em Médias Empresas
- CSS compartilhado com sistema visual completo
- Deploy no GitHub Pages em `polarisglobal.me/consulting/`

### Fase 2 — Quando houver mais artigos
- Homepage com grid de múltiplos cards
- Atualizar contador de publicações no hero
- Considerar separação por categorias (Governança, Automação, Cases, etc.)

### Fase 3 — Crescimento futuro
- Página `sobre.html` com bio e contexto do autor
- RSS feed (`feed.xml`) para leitores que seguem por feed
- Open Graph + Twitter Card para preview rico em redes sociais
- `sitemap.xml` para indexação pelo Google

---

## 10. Referências do projeto

| Arquivo de origem | Destino no site |
|---|---|
| `Guia-Governanca-IA-Empresas-v2-copia.md` | `artigos/governanca-ia-empresas.html` |
| `Estilo base para o site.html` (carrossel) | `css/site.css` (adaptado para web) |

Ambos os arquivos de origem foram deletados após a conversão — o conteúdo e o estilo vivem agora nos arquivos do site.
