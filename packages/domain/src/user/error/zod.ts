export const userZodError = {
  EMPTY_NAME: "이름은 필수 입력입니다.",
  TOO_LONG_NAME: "이름은 최대 10자까지 입력 가능합니다.",
  NEGATIVE_YEAR: "출생 연도는 음수일 수 없습니다.",
  NEGATIVE_AGE: "나이는 음수일 수 없습니다.",
} as const;