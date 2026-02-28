import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

export const googleService = {
  async verify(idToken: string) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: [
        process.env.GOOGLE_CLIENT_IOS!,
        process.env.GOOGLE_CLIENT_ANDROID!,
      ],
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error("Invalid token");

    return {
      oauthId: payload.sub,
      email: payload.email!,
      name: payload.name ?? null,
    };
  },
};
