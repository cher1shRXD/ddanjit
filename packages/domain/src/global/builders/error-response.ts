import { GlobalError } from "../error";
import { ErrorResponse as Return } from "../types/error-response";

export const ErrorResponseBuilder = (error: unknown) => {
  const [statusStr, message] = (
    error instanceof Error ? error.message : GlobalError.INTERNAL_ERROR
  ).split("::");
  console.log("ErrorResponseBuilder", { error, statusStr, message });
  const status = parseInt(statusStr || "500", 10);

  return {
    message,
    status,
  } as Return;
};
