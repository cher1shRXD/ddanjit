import { ErrorResponse as Return } from "../types/error-response";

export const ErrorResponse = (code: string) => {
  const [statusStr = "500", message] = code.split("::");
  const status = parseInt(statusStr, 10);
  
  return {
    message,
    status,
  } as Return;
} 