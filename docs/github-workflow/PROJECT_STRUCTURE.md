# Estrutura do Projeto - Savana NuxtJS Chronicles

## Visao Geral

E-commerce moderno desenvolvido com Nuxt 4.

## Diretorios

```
nuxtjs-chronicles-part-1/
├── app/                    # Nuxt App Router
│   ├── [locale]/           # Rotas localizadas
│   │   ├── page.vue        # Home
│   │   └── product/        # Rotas de produto
│   └── app.vue             # Componente raiz
├── components/             # Componentes Vue
│   ├── ui/                 # Componentes UI
│   ├── product/            # Componentes de produto
│   └── cart/               # Componentes de carrinho
├── composables/            # Composables
│   ├── useCart.ts          # Logica do carrinho
│   └── useI18n.ts          # Internacionalizacao
├── layouts/                # Layouts
├── pages/                  # Rotas adicionais
├── assets/                 # Assets estaticos
│   └── css/                # Estilos globais
├── i18n/                   # Traducoes
│   ├── pt-BR.json
│   └── en.json
├── docs/                   # Documentacao
│   └── github-workflow/    # Padroes GitHub
└── .github/                # Templates e CI/CD
```

## Convencoes

### Nomenclatura
- Componentes: PascalCase (ProductCard.vue)
- Composables: camelCase com prefixo use (useCart.ts)
- Tipos: PascalCase com sufixo Type (ProductType.ts)

### i18n
- Arquivos de traducao em i18n/
- Uso de $t('key') nos componentes

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Nuxt 4 |
| UI | Vue 3 |
| Estilos | TailwindCSS v4 |
| Linguagem | TypeScript |
| i18n | @nuxtjs/i18n |
