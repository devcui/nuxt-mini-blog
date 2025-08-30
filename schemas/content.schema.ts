import { z } from '@nuxt/content'

export default z.object({
  no: z.number(),
  title: z.string(),
  cover: z.string().optional(),
  category: z.array(z.string()).optional(),
  subcategory: z.array(z.string()).optional(),
  tag: z.array(z.string()).optional(),
  topic: z.array(z.string()).optional(),
  collection: z.array(z.string()).optional(),
  author: z.array(z.string()).optional(),
  series: z.array(z.string()).optional(),
  summary: z.string().optional(),
  date: z.date().optional(),
  updated: z.date().optional(),
})
