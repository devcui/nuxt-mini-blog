// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/scripts', '@nuxt/test-utils', '@nuxt/ui', '@nuxt/devtools', '@nuxtjs/color-mode', '@nuxtjs/mdc', '@nuxt/icon', '@nuxtjs/mdc'],
  css: ['~/assets/css/main.css'],
})
