import { useCheckInfoRegisteredQuery } from "../queries";

export const useCheckInfo = () => {
  const isLoggedIn = !!localStorage.getItem("ACCESS_TOKEN");
  const { data } = useCheckInfoRegisteredQuery(isLoggedIn);

  return {
    isLoggedIn,
    isRegistered: data,
  }
};
