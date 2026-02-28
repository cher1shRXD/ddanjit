import { BaseResponseBuilder, OauthProvider } from "@ddanjit/domain";
import { JwtProvider } from "../../global/jwt/provider";
import { userRepository } from "../user/repository";
import { appleService } from "./external/apple";
import { googleService } from "./external/google";

export const authService = {
  async loginWithGoogle(idToken: string) {
    const { oauthId, email } = await googleService.verify(idToken);
    return BaseResponseBuilder(
      200,
      "구글 계정으로 로그인 되었습니다.",
      await this.loginOrRegister("google", oauthId, email),
    );
  },

  async loginWithApple(idToken: string) {
    const { oauthId, email } = await appleService.verify(idToken);
    return BaseResponseBuilder(
      200,
      "애플 계정으로 로그인 되었습니다.",
      await this.loginOrRegister("apple", oauthId, email),
    );
  },

  async loginOrRegister(
    provider: OauthProvider,
    oauthId: string,
    email: string,
  ) {
    let user = await userRepository.findByOauthId(provider, oauthId);

    if (!user) {
      user = await userRepository.createOauthUser(email, provider, oauthId);
    }

    const { accessToken, refreshToken } = await JwtProvider.saveTokens(
      user.email,
    );

    return { accessToken, refreshToken };
  },

  async logout(email: string) {
    await JwtProvider.deleteTokens(email);
    return BaseResponseBuilder(200, "로그아웃 되었습니다. 다시 만나요!");
  },
};
