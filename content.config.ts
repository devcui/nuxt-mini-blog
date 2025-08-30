import { defineCollection, defineContentConfig } from "@nuxt/content";
import contentSchema from "./schemas/content.schema";
import classifySchema from "./schemas/classify.schema";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source:{
        include:"**/*.md",
        prefix:"/content"
      },
      schema: contentSchema,
    }),
    classify: defineCollection({
      type: "data",
      source: "**/*.yaml",
      schema: classifySchema,
    }),
  },
});
