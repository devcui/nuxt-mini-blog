<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { useRoute } from "vue-router";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Tag",
    to: "/tag",
    active: route.path.startsWith("/classify/tag"),
  },
  {
    label: "Series",
    to: "/classify/series",
    active: route.path.startsWith("/classify/series"),
  },
  {
    label: "Collection",
    to: "/classify/collection",
    active: route.path.startsWith("/classify/collection"),
  },
  {
    label: "Topic",
    to: "/classify/topic",
    active: route.path.startsWith("/classify/topic"),
  },
  {
    label: "Category",
    to: "/classify/category",
    active: route.path.startsWith("/classify/category"),
  },
  {
    label: "Subcategory",
    to: "/classify/subcategory",
    active: route.path.startsWith("/classify/subcategory"),
  },
  {
    label: "Timeline",
    to: "/timeline",
    active: route.path.startsWith("/timeline"),
  },
  {
    label: "About",
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
      <UNavigationMenu
        variant="link"
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>

    <template #right>
      <UColorModeButton />
      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/devcui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>

<style></style>
