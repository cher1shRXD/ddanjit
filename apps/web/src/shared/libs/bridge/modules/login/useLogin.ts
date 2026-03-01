import { RequestTypes } from "@ddanjit/bridge-interface";
import { useBridge } from "../../common/hooks/useBridge";

export const useLogin = (requestClose: (state: boolean) => void) => {
  const execute = useBridge();

  const login = async (provider: string) => {
    const response = await execute<{ idToken: string; email?: string }>(
      RequestTypes.LOGIN,
      { provider },
    );

    if(response.success) {
      requestClose(true);
    }
  };

  return { login };
};
