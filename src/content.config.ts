import {defineCollection, z} from 'astro:content'
import {file} from 'astro/loaders'
import {parse} from 'csv-parse/sync'

const unicodeBlocks = defineCollection({
  loader: file('src/contents/unicode-blocks.yaml'),
  schema: z.object({
    last: z.string(),
    name: z.string(),
  }),
})

const unicodeData = defineCollection({
  loader: file('src/contents/unicode-data.csv', {
    parser: (text) => parse(text, {delimiter: ';', columns: true, skipEmptyLines: true}),
  }),
})

export const collections = {unicodeBlocks, unicodeData}
