export const RequestTypes = {
  HAPTIC: "HAPTIC",
  LOGIN: "LOGIN",
  ACK: "ACK",
  RECOVERY: "RECOVERY",
  PUSH: "PUSH",
} as const;

export type RequestType = typeof RequestTypes[keyof typeof RequestTypes];
