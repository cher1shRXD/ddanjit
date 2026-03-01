import { useMutation } from "@tanstack/react-query";
import { RegisterInfoApi } from "../api";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@ddanjit/domain";

export const useRegisterInfoMutation = () => {
  return useMutation({
    mutationFn: RegisterInfoApi.registerInfo,
    onSuccess: () => {
      alert("회원 정보가 성공적으로 저장되었습니다.");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      alert(
        `회원 정보 저장에 실패했습니다. ${error.response?.data.message || error.message}`,
      );
    },
  });
};
