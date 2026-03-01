import type { BaseResponse } from "@ddanjit/domain";
import apiClient from "../../../shared/libs/axios/api-client";

export const LoginApi = {
  async login(provider: string, idToken: string) {
    return await apiClient.post<
      BaseResponse<{ accessToken: string; refreshToken: string }>
    >(`/auth/${provider}`, {
      idToken,
    });
  },
};
