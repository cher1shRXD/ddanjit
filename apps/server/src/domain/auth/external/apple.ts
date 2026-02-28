import appleSignin from "apple-signin-auth";

export const appleService = {
  async verify(identityToken: string) {
    const payload = await appleSignin.verifyIdToken(identityToken, {
      audience: process.env.APPLE_BUNDLE_ID!,
      ignoreExpiration: false,
    });

    return {
      oauthId: payload.sub,
      email: payload.email ?? null,
    };
  },
};
