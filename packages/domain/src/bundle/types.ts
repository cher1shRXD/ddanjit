import { createSelectSchema } from "drizzle-zod";
import { bundleTable } from "./schema";
import z from "zod";

export const BundelSchema = createSelectSchema(bundleTable);
export type Bundle = z.infer<typeof BundelSchema>;