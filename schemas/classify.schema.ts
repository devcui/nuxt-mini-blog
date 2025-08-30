import { z } from "@nuxt/content";
import contentSchema from './content.schema'

export default z.object({
  type: z.string(),
  metas: z.array(
    z.object({
      key: z.string(),
      desc: z.string().optional(),
      no: z.number().optional(),
      banner: z.string().optional(),
      created: z.date().optional(),
      updated: z.date().optional(),
      docs: z.array(contentSchema).optional(),
    })
  ),
});
