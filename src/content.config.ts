import {defineCollection} from 'astro:content'
import {file} from 'astro/loaders'
import {parse} from 'csv-parse/sync'

const unicodeBlocks = defineCollection({
  loader: file('src/contents/unicode-blocks.csv', {
    parser: (text) => parse(text, {delimiter: ';', columns: true, skipEmptyLines: true}),
  }),
})

export const collections = {unicodeBlocks}
