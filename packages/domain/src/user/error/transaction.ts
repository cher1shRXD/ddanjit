export const userTransactionError = {
  NOTFOUND: "404::해당 사용자를 찾을 수 없습니다.",
  UNAUTHORIZED: "401::로그인이 필요한 작업입니다.",
  FORBIDDEN: "403::해당 작업을 수행할 권한이 없습니다.",
  CONFLICT: "409::이미 존재하는 사용자입니다.",
  INVALID_OPERATION: "400::유효하지 않은 작업입니다.",
  INTERNAL_ERROR: "500::처리 중 오류가 발생했습니다.",
} as const;