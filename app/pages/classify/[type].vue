<script lang="ts" setup>
import type { ContentCollectionItem } from '@nuxt/content';

const route = useRoute();
const router = useRouter()
const { locale } = useLocale()

const type = computed<string | undefined>(() => {
  if (route.params.type) {
    return route.params.type as string
  }
  return undefined
})

const limit = computed<number>({
  get: () => {
    if (route.query.limit) {
      return parseInt(route.query.limit as string)
    }
    return 5
  },
  set: (next: number) => {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        limit: next
      }
    })
  }
})

const { data: docs } = await useAsyncData(route.path + '-metas', async () => {
  if (!type.value) return []
  return queryCollection('content')
    .where(type.value, 'IS NOT NULL')
    .where('path', 'LIKE', `%/${locale.value.code}/%`)
    .all()
})


const { data: classify } = await useAsyncData(
  route.path + '-classify',
  async () => {
    if (!type.value) return []
    return await queryCollection('classify')
      .where('type', '=', type.value)
      .andWhere(query =>
        query.where('stem', 'LIKE', `%/${locale.value.code}/%`)
      )
      .all()
  }
)

const metas = computed(() => {
  return classify.value?.map(item => item.metas).flat().sort((a, b) => (a.no ?? 0) - (b.no ?? 0)).slice(0, limit.value)
})

const combineMetaDocs = computed(() => {
  return metas.value?.map(meta => {
    meta.docs = docs.value?.filter(doc => {
      if (!type.value) return false
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (doc as any)[type.value]?.includes(meta.key)
    })
    meta.docs = meta.docs?.sort((a, b) => (a.no ?? 0) - (b.no ?? 0))
    return meta
  })
})

const loadMore = () => {
  limit.value += 5
}

const to = (doc: Partial<ContentCollectionItem>) => {
  if (doc.path) {
    router.push(doc.path)
  }
}

</script>

<template>
  <div>

    <h1 class="mb-8  text-[clamp(1rem,5vw,1.75rem)] font-semibold">{{ type }}</h1>

    <ul>
      <li v-for="meta in combineMetaDocs" :key="meta.key" class="mt-20 flex flex-col items-center space-y-4">
        <div class="mx-auto  w-full space-y-4 md:min-w-[60vw]">
          <img :src="meta.banner" alt="" class="w-full rounded-2xl object-cover shadow-md">

          <div class="space-y-2 text-center">
            <span class="block text-[clamp(1rem,2.5vw,1.5rem)] leading-snug font-semibold">{{ meta.key }} - {{ meta.desc
              }}</span>
            <div class="flex justify-center gap-4 text-[clamp(0.75rem,1.8vw,0.9rem)]">
              <span>created: {{ meta.created }}</span>
              <span>updated: {{ meta.updated }}</span>
            </div>
          </div>

          <ul class="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3">
            <li v-for="doc in meta.docs" :key="doc.title" class="text-[clamp(0.85rem,2vw,1rem)]">
              <u-link class="block cursor-pointer text-center  hover:underline" @click="to(doc)">{{ doc.title
                }}</u-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <div class="flex justify-center">
      <u-button class="mt-8 rounded-2xl px-6 py-3 text-[clamp(0.9rem,2vw,1.1rem)] font-medium shadow" @click="loadMore">
        Load More
      </u-button>
    </div>
  </div>
</template>