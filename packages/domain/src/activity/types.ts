import { createSelectSchema } from "drizzle-zod";
import { activityTable } from "./schema";
import z from "zod";

export const ActivitySchema = createSelectSchema(activityTable);
export type Activity = z.infer<typeof ActivitySchema>;