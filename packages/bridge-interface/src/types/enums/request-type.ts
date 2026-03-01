export const RequestTypes = {
  HAPTIC: "HAPTIC",
  LOGIN: "LOGIN",
} as const;

export type RequestType = typeof RequestTypes[keyof typeof RequestTypes];
