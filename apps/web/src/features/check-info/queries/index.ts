import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckInfoApi } from "../api";

export const useCheckInfoRegisteredQuery = (isLoggedIn: boolean) => {
  return useSuspenseQuery({
    queryKey: ["users", "info", "check", isLoggedIn],
    queryFn: async () => {
      if (!isLoggedIn) return false;
      const { data } = await CheckInfoApi.checkInfoRegistered();
      return data.data?.registered || false;
    },
  });
};