<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

const replacedLocale = computed(() => {
  if (locale.value === 'zh-CN') {
    return 'zh_cn'
  }
  return locale.value
})

const lang = computed(() => locales[replacedLocale.value].code)
const dir = computed(() => locales[replacedLocale.value].dir)

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})
</script>
<template>
  <u-app :locale="locales[replacedLocale]">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </u-app>
</template>
