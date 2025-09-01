<script lang="ts" setup>
import type { ContentCollectionItem } from '@nuxt/content'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const { data } = await useAsyncData(route.path, () => queryCollection("content").where("path", 'LIKE', `%/${locale.value.code}/%`).all())

const docs = computed(() => {
  if (!data) return []
  if (!data.value) return []
  if (!route.query.tag) return []
  return data.value!.filter(doc => doc.tag?.includes(route.query.tag as string))
})

const to = (doc: Partial<ContentCollectionItem>) => {
  if (doc.path) {
    router.push(doc.path)
  }
}
</script>

<template>
  <div>
    <h1 class="mb-8  text-[clamp(1rem,5vw,1.75rem)] font-semibold">{{ route.query.tag }}</h1>
    <ul class="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
      <li v-for="doc in docs" :key="doc.title" class="text-[clamp(0.85rem,2vw,1rem)] ">
        <u-link class="block cursor-pointer text-center  hover:underline" @click="to(doc)">{{ doc.title }}</u-link>
      </li>
    </ul>
  </div>
</template>


<style></style>
