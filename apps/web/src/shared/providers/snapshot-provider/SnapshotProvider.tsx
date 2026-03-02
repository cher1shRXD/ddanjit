import { useEffect, type ReactNode } from "react";
import { registry } from "./registry";
import { storage } from "../../libs/storage/storage";

const SnapshotProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "hidden") {
        registry.forEach((getValue, key) => {
          storage.setItem(key, JSON.stringify(getValue()));
        });
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return <>{children}</>;
};

export default SnapshotProvider;
