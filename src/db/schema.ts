import { pgTable, varchar, text, bigint, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const unicodeData = pgTable("unicode_data", {
	code: varchar({ length: 5 }).primaryKey().notNull(),
	name: text().notNull(),
	genCat: text("gen_cat").notNull(),
	combCls: text("comb_cls").notNull(),
	bidiCat: text("bidi_cat").notNull(),
	decMap: text("dec_map"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	decDigVal: bigint("dec_dig_val", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	digVal: bigint("dig_val", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	numVal: bigint("num_val", { mode: "number" }),
	mir: boolean(),
	oneName: text("one_name"),
	cmt: text(),
	uc: varchar({ length: 5 }),
	lc: varchar({ length: 5 }),
	tc: varchar({ length: 5 }),
});
