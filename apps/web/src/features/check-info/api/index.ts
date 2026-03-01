import type { BaseResponse } from "@ddanjit/domain";
import apiClient from "../../../shared/libs/axios/api-client";

export const CheckInfoApi = {
  async checkInfoRegistered() {
    return await apiClient.get<BaseResponse<{ registered: boolean }>>(
      "/users/info/check",
    );
  },
};
