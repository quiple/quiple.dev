// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'quiple-dev',
  title: 'quiple.dev',
  projectId: 'hxo1wurv',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      /* your content types here*/
    ],
  },
})
