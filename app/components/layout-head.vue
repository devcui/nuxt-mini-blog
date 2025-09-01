<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { useRoute } from "vue-router";

const { t } = useI18n()
const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('tag'),
    to: "/tag",
    active: route.path.startsWith("/classify/tag"),
  },
  {
    label: t('series'),
    to: "/classify/series",
    active: route.path.startsWith("/classify/series"),
  },
  {
    label: t('collection'),
    to: "/classify/collection",
    active: route.path.startsWith("/classify/collection"),
  },
  {
    label: t('topic'),
    to: "/classify/topic",
    active: route.path.startsWith("/classify/topic"),
  },
  {
    label: t('category'),
    to: "/classify/category",
    active: route.path.startsWith("/classify/category"),
  },
  {
    label: t('subcategory'),
    to: "/classify/subcategory",
    active: route.path.startsWith("/classify/subcategory"),
  },
  {
    label: t('timeline'),
    to: "/timeline",
    active: route.path.startsWith("/timeline"),
  },
  {
    label: t('about'),
    to: "/about",
    active: route.path.startsWith("/about"),
  },
]);
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
      <UTooltip :text="t('openOnGithub')" :kbds="['meta', 'G']">
        <UButton color="neutral" variant="ghost" to="https://github.com/devcui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>
  </UHeader>
</template>

<style></style>
