import { useLocalStorage } from "../../../shared/libs/storage/storage";
import { useCheckInfoRegisteredQuery } from "../queries";

export const useCheckInfo = () => {
  const { value } = useLocalStorage("ACCESS_TOKEN");
  const isLoggedIn = !!value;
  const { data } = useCheckInfoRegisteredQuery(isLoggedIn);

  return {
    isLoggedIn,
    isRegistered: data,
  }
};
