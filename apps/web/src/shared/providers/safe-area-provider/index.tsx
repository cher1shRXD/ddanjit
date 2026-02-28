import type { PropsWithChildren } from "react";
import { SafeAreaContext } from "./safe-area-context";

const SafeAreaProvider = ({ children }: PropsWithChildren) => {
  const searchParams = new URLSearchParams(window.location.search);
  const top = parseFloat(searchParams.get("top") ?? "0");
  const bottom = parseFloat(searchParams.get("bottom") ?? "0");

  return (
    <SafeAreaContext.Provider value={{ top, bottom }}>
      {children}
    </SafeAreaContext.Provider>
  );
};

export default SafeAreaProvider;
