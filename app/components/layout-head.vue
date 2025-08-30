<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import { useRoute } from 'vue-router'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Tag',
    to: '/tag',
    active: route.path.startsWith('/tag'),
  },
  {
    label: 'Series',
    to: '/series',
    active: route.path.startsWith('/series'),
  },
  {
    label: 'Collection',
    to: '/collection',
    active: route.path.startsWith('/collection'),
  },
  {
    label: 'Topic',
    to: '/topic',
    active: route.path.startsWith('/topic'),
  },
  {
    label: 'Category',
    to: '/category',
    active: route.path.startsWith('/category'),
  },
  {
    label: 'Subcategory',
    to: '/subcategory',
    active: route.path.startsWith('/subcategory'),
  },
  {
    label: 'Timeline',
    to: '/timeline',
    active: route.path.startsWith('/timeline'),
  },
  {
    label: 'About',
    to: '/about',
    active: route.path.startsWith('/about'),
  },
])
</script>

<template>
  <UHeader>
    <template #title>
      <div>NONSENSE</div>
    </template>

    <ClientOnly>
      <UNavigationMenu variant="link" :items="items" />
    </ClientOnly>

    <template #body>
      <UNavigationMenu variant="link" :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <UColorModeButton />
      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="https://github.com/devcui" target="_blank" icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>
  </UHeader>
</template>

<style></style>
