<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, zh_cn } from '@nuxt/ui/locale'

const route = useRoute()
const { locale, setLocale, t } = useI18n()

const items: NavigationMenuItem[] = [
  {
    label: t('figmaKit'),
    to: 'https://www.figma.com/community/file/1288455405058138934',
    target: '_blank',
  },
  {
    label: t('playground'),
    to: 'https://stackblitz.com/edit/nuxt-ui',
    target: '_blank',
  },
  {
    label: t('releases'),
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank',
  },
]

const changeLocale = async (code: 'en' | 'zh-CN') => {
  if (route.name === 'content-slug') {
    const paths = route.path.split("/")
    paths[paths.length - 2] = code.toLocaleLowerCase()
    const path = paths.join("/")
    await setLocale(code)
    reloadNuxtApp({
      path: path,
      persistState: false,
      force: true
    })
  } else {
    await setLocale(code)
    reloadNuxtApp({
      path: route.path,
      persistState: false,
      force: true
    })
  }
}

</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">{{ t('copyright') }} © {{ new Date().getFullYear() }}</p>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UButton icon="i-simple-icons-discord" color="neutral" variant="ghost" to="#" target="_blank"
        aria-label="Discord" />
      <UButton icon="i-simple-icons-x" color="neutral" variant="ghost" to="#" target="_blank" aria-label="X" />
      <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" to="https://github.com/devcui"
        target="_blank" aria-label="GitHub" />
      <ULocaleSelect v-model="locale" :locales="[en, zh_cn]" @update:model-value="changeLocale($event as any)" />
    </template>
  </UFooter>
</template>
