<script lang="ts" setup>
import type { BlogPostProps } from '@nuxt/ui'

const route = useRoute()
const limit = ref(5)

const { data, refresh } = await useAsyncData(route.path, () => queryCollection("content").order("updated", "DESC").limit(limit.value).all())

const posts = computed<Array<BlogPostProps & { path: string }>>(() => {
  if (!data || !data.value) return []
  return data.value!.map(item => {
    return {
      title: item.title,
      description: item.description,
      image: item.cover,
      date: item.date,
      path: item.path
    }
  })
})

const loadMore = () => {
  limit.value += 5
  refresh()
}

</script>

<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UBlogPosts>
          <UBlogPost v-for="(post, index) in posts" :key="index" :to="post.path" v-bind="post" />
        </UBlogPosts>
      </UContainer>
    </UPageBody>
    <div class=" flex-col items-center justify-center my-4 text-center">
      <u-button @click="loadMore()">Load More</u-button>
    </div>
  </UPage>
</template>

<style></style>
