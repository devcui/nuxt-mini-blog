<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => queryCollection('content').path(route.path).first())

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path, {
    fields: ['description']
  })
})
</script>

<template>
  <u-page v-if="page">
    <u-page-header :title="page.title" />

    <u-page-body>
      <content-renderer v-if="page.body" :value="page" />
      <u-separator v-if="surround?.filter(Boolean).length" />
      <u-content-surround :surround="surround" />
    </u-page-body>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </u-page>
</template>
