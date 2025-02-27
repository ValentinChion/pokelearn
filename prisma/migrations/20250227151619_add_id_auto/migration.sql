-- AlterTable
CREATE SEQUENCE pokemon_id_seq;
ALTER TABLE "Pokemon" ALTER COLUMN "id" SET DEFAULT nextval('pokemon_id_seq'),
ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE pokemon_id_seq OWNED BY "Pokemon"."id";
