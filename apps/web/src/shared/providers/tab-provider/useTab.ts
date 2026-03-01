import { useContext } from "react";
import { TabContext } from "./tab-context";

export const useTab = () => {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTab must be used within TabProvider");
  return ctx;
};
