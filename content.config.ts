import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import contentSchema from './schemas/content.schema'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: contentSchema,
    }),
  },
})
