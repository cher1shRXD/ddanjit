import { RequestTypes } from "@ddanjit/bridge-interface";
import type { ErrorResponse } from "@ddanjit/domain";
import { useBridge } from "../../../shared/libs/bridge/hooks/useBridge";
import type { AxiosError } from "axios";
import { LoginApi } from "../api";
import { storage } from "../../../shared/libs/storage/storage";

export const useLogin = (requestClose: (state: boolean) => void) => {
  const { execute } = useBridge();

  const login = async (provider: string) => {
    const response = await execute<{ idToken: string }>(RequestTypes.LOGIN, {
      provider,
    });

    if (!response.success || !response.data) return;

    try {
      const { data } = await LoginApi.login(provider, response.data.idToken);

      if (data.data) {
        alert(data.message);
        storage.setItem("ACCESS_TOKEN", data.data.accessToken);
        storage.setItem("REFRESH_TOKEN", data.data.refreshToken);
        requestClose(true);
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      alert(
        `로그인에 실패했습니다. ${err.response?.data.message || err.message}`,
      );
    }
  };

  return { login };
};
