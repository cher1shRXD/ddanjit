import { userTransactionError } from "./transaction";
import { userZodError } from "./zod";

export const UserError = { ...userTransactionError, ...userZodError } as const;