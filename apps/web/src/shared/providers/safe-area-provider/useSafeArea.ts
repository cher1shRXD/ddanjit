import { useContext } from "react";
import { SafeAreaContext } from "./safe-area-context";

export const useSafeArea = () => {
  return useContext(SafeAreaContext);
};
