export const userRoleEnum = ["admin", "user", "tester"] as const;
export type UserRole = typeof userRoleEnum[number];

export const userBenefitsEnum = ["none", "founding", "inviter", "invitee"] as const;
export type UserBenefit = typeof userBenefitsEnum[number];

export const userEmojiEnum = ["smile", "sunglasses"] as const;
export type UserEmoji = typeof userEmojiEnum[number];

export const oauthProviderEnum = ["google", "apple"] as const;
export type OauthProvider = typeof oauthProviderEnum[number];