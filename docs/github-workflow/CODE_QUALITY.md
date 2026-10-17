# Padroes de Qualidade - Nuxt 4

## Stack

| Tecnologia | Uso |
|------------|-----|
| Nuxt 4 | Framework |
| Vue 3 | UI |
| TypeScript | Linguagem |
| TailwindCSS v4 | Estilos |

## TypeScript

```typescript
// BOM
interface User {
  id: number
  name: string
}

const users = ref<User[]>([])
const isLoading = ref(false)
```

## Nuxt 4 Patterns

### Pages
```vue
<!-- pages/users/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const { data: user } = await useFetch<User>(`/api/users/${route.params.id}`)
</script>

<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
  </div>
</template>
```

### Composables
```typescript
// composables/useUser.ts
export const useUser = () => {
  const user = useState<User | null>('user', () => null)
  
  async function fetchUser() {
    user.value = await $fetch('/api/user')
  }
  
  return { user, fetchUser }
}
```

## Comandos

```bash
npm run dev      # Dev server
npm run build    # Build
npm run preview  # Preview
```

## Checklist

- [ ] Composition API
- [ ] Auto-imports
- [ ] useFetch/useAsyncData
- [ ] TailwindCSS v4 syntax
