import { useMutation } from "@tanstack/react-query";
import { RegisterAcquisitionApi } from "../api";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@ddanjit/domain";

export const useRegisterAcquisitionMutation = () => {
  return useMutation({
    mutationFn: RegisterAcquisitionApi.registerAcquisition,
    onSuccess: () => {
      alert("가입 경로를 성공적으로 저장했습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(
        `가입 경로 저장에 실패했습니다. ${error.response?.data.message || error.message}`,
      );
    },
  });
};
