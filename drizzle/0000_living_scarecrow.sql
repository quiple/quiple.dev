-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "unicode_data" (
	"code" varchar(5) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"gen_cat" text NOT NULL,
	"comb_cls" text NOT NULL,
	"bidi_cat" text NOT NULL,
	"dec_map" text,
	"dec_dig_val" bigint,
	"dig_val" bigint,
	"num_val" bigint,
	"mir" boolean,
	"one_name" text,
	"cmt" text,
	"uc" varchar(5),
	"lc" varchar(5),
	"tc" varchar(5)
);

*/