-- AlterTable
CREATE SEQUENCE faq_sequence_seq;
ALTER TABLE "Faq" ALTER COLUMN "sequence" SET DEFAULT nextval('faq_sequence_seq');
ALTER SEQUENCE faq_sequence_seq OWNED BY "Faq"."sequence";
