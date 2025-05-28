import {bigint, boolean, integer, pgTable, text} from 'drizzle-orm/pg-core'

export const unicodeBlocks = pgTable('unicode_blocks', {
  first: integer().primaryKey().notNull(),
  last: integer().notNull(),
  name: text().notNull(),
  nameKo: text('name_ko'),
})

export const unicodeData = pgTable('unicode_data', {
  code: integer().primaryKey().notNull(),
  name: text().notNull(),
  genCat: text('gen_cat').notNull(),
  combCls: text('comb_cls').notNull(),
  bidiCat: text('bidi_cat').notNull(),
  decMap: text('dec_map'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  decDigVal: bigint('dec_dig_val', {mode: 'number'}),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  digVal: bigint('dig_val', {mode: 'number'}),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  numVal: bigint('num_val', {mode: 'number'}),
  mir: boolean(),
  oneName: text('one_name'),
  cmt: text(),
  uc: integer(),
  lc: integer(),
  tc: integer(),
})
