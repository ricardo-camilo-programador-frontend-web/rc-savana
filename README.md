[![CI](https://github.com/ricardo-camilo-programador-frontend-web/nuxtjs-chronicles-part-1/actions/workflows/ci.yml/badge.svg)](https://github.com/ricardo-camilo-programador-frontend-web/nuxtjs-chronicles-part-1/actions)
# 🦁 Savana - NuxtJS Chronicles

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b70b8db-229b-4dea-8781-6e1e329cc03f/deploy-status)](https://app.netlify.com/sites/savana-nuxtjs-chronicles-part-1/deploys)

**E-commerce moderno com Nuxt 3**

[Demo](https://savana-nuxtjs-chronicles-part-1.netlify.app/en) • [Portfolio](https://persona-nextjs-chronicles-part-2.netlify.app/) • [Design Original](https://www.figma.com/community/file/1376176068455814953)

</div>

## 📋 Sobre

E-commerce moderno desenvolvido com Nuxt 3, demonstrando boas praticas de desenvolvimento frontend e arquitetura escalavel.

## 🚀 Tecnologias

| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Nuxt | 4.x | Framework Vue |
| Vue | 3.x | UI Framework |
| TypeScript | - | Linguagem |
| TailwindCSS | 4.x | Estilizacao |
| i18n | - | Internacionalizacao |

## ✨ Funcionalidades

- 🌐 Interface bilingue (PT/EN)
- 🎨 Design responsivo com Tailwind CSS
- 🔍 SEO otimizado
- 📊 Analytics integrado (GTM, Clarity, GA)
- 🖼️ Sistema de icones dinamico

## 🏃 Quick Start

```bash
# Clonar repositorio
git clone https://github.com/ricardo-camilo-programador-frontend-web/nuxtjs-chronicles-part-1.git

# Instalar dependencias
pnpm install

# Configurar variaveis de ambiente
cp .env.example .env
# Edite o .env com seus valores

# Rodar desenvolvimento
pnpm dev
```

## 🔧 Variaveis de Ambiente

Todas as variaveis usam o prefixo `NUXT_PUBLIC_` e sao acessadas via `useRuntimeConfig().public.*` no codigo.

| Variavel | Descricao | Exemplo |
|----------|-----------|---------|
| `NUXT_PUBLIC_PROJECT_TITLE` | Titulo do projeto | `Savana Pet Shop` |
| `NUXT_PUBLIC_BASE_URL` | URL base local | `http://localhost:3000` |
| `NUXT_PUBLIC_SITE_URL` | URL do site em producao | `https://savana-...netlify.app` |
| `NUXT_PUBLIC_PORTFOLIO_URL` | URL do portfolio | `https://...` |
| `NUXT_PUBLIC_GITHUB_USERNAME` | Usuario GitHub | `username` |
| `NUXT_PUBLIC_LINKEDIN_USERNAME` | Usuario LinkedIn | `username` |
| `NUXT_PUBLIC_X_USERNAME` | Usuario X/Twitter | `username` |
| `NUXT_PUBLIC_TWITTER_USERNAME` | Usuario Twitter | `username` |
| `NUXT_PUBLIC_WORKANA_USERNAME` | Usuario Workana | `username` |
| `NUXT_PUBLIC_INSTAGRAM_USERNAME` | Usuario Instagram | `username` |
| `NUXT_PUBLIC_FACEBOOK_ID` | ID do Facebook | `123456` |
| `NUXT_PUBLIC_YOUTUBE_USERNAME` | Canal YouTube | `@channel` |
| `NUXT_PUBLIC_BUYMEACOFFEE_USERNAME` | Usuario Buy Me a Coffee | `username` |
| `NUXT_PUBLIC_EMAIL` | Email de contato | `email@example.com` |
| `NUXT_PUBLIC_FIGMA_USERNAME` | Usuario Figma | `username` |
| `NUXT_PUBLIC_FIGMA_ORIGINAL_DESIGN` | ID do design Figma | `abc123` |
| `NUXT_PUBLIC_GTM_ID` | Google Tag Manager ID | `GTM-XXXXXXX` |
| `NUXT_PUBLIC_ADSENSE_ID` | Google AdSense ID | `ca-pub-...` |
| `NUXT_PUBLIC_COUNTER_API_KEY` | Counter.dev API key | `key` |
| `NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Site Verification | `code` |
| `NUXT_PUBLIC_LIVE_DEMO_VIDEO_URL` | URL video demo | `https://...` |
| `NUXT_PUBLIC_TREFLE_API_KEY` | Trefle API key | `key` |

### Netlify

No Netlify, configure as variaveis `NUXT_PUBLIC_*` em **Site settings > Environment variables**. O prefixo `NUXT_PUBLIC_` e necessario para que o Nuxt expor as variaveis ao cliente.

## 📁 Estrutura

```
nuxtjs-chronicles-part-1/
├── app/                    # Nuxt App Router
│   └── [locale]/           # Rotas localizadas
├── components/             # Componentes Vue
├── composables/            # Composables
├── layouts/                # Layouts Nuxt
├── pages/                  # Rotas (auto-import)
├── assets/                 # Assets estaticos
├── docs/                   # Documentacao
│   └── github-workflow/    # Padroes GitHub
└── .github/                # Templates e CI/CD
```

## 🗺️ Roadmap

### Fase 1 - Em Desenvolvimento
- [x] Setup inicial do projeto
- [x] Implementacao de i18n
- [ ] Carrinho de compras
- [ ] Checkout

### Fase 2 - Planejado
- [ ] Pagamentos
- [ ] Dashboard admin
- [ ] Testes automatizados

## 📚 Documentacao

- [Workflow GitHub](./docs/github-workflow/README.md)
- [Padroes de Qualidade](./docs/github-workflow/CODE_QUALITY.md)
- [Padroes de Commit](./docs/github-workflow/COMMIT-PATTERN.md)

## 📜 Scripts

| Comando | Descricao |
|---------|-----------|
| `pnpm dev` | Servidor desenvolvimento |
| `pnpm build` | Build producao |
| `pnpm preview` | Preview producao |
| `pnpm lint` | Verificacao de codigo |

## 👤 Autor

**Ricardo Camilo**
- Portfolio: [persona-nextjs-chronicles-part-2.netlify.app](https://persona-nextjs-chronicles-part-2.netlify.app/)
- GitHub: [@ricardo-camilo-programador-frontend-web](https://github.com/ricardo-camilo-programador-frontend-web)

## 📄 Licenca

MIT License
