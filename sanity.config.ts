import {koKRLocale} from '@sanity/locale-ko-kr'
// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'quiple-dev',
  title: 'quiple.dev',
  projectId: 'hxo1wurv',
  dataset: 'production',
  plugins: [structureTool(), koKRLocale()],
  schema: {
    types: schemaTypes,
  },
})
