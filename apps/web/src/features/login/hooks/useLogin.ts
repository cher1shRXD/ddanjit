import { RequestTypes } from "@ddanjit/bridge-interface";
import type { BaseResponse, ErrorResponse } from "@ddanjit/domain";
import { useBridge } from "../../../shared/libs/bridge/hooks/useBridge";
import apiClient from "../../../shared/libs/axios/api-client";
import type { AxiosError } from "axios";

export const useLogin = (requestClose: (state: boolean) => void) => {
  const execute = useBridge();

  const login = async (provider: string) => {
    const response = await execute<{ idToken: string }>(RequestTypes.LOGIN, {
      provider,
    });

    if (!response.success || !response.data) return;

    try {
      const { data } = await apiClient.post<
        BaseResponse<{ accessToken: string; refreshToken: string }>
      >(`/auth/${provider}`, {
        idToken: response.data.idToken,
      });

      if (data.data) {
        alert(data.message);
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        requestClose(true);
      }
    } catch (error) {
      alert(error);
      const err = error as AxiosError<ErrorResponse>
      alert("로그인에 실패했습니다. 다시 시도해주세요." + err.status);
    }
  };

  return { login };
};
