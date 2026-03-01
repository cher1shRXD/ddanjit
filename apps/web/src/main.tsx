import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SafeAreaProvider from "./shared/providers/safe-area-provider/index.tsx";
import { NavigationStack } from "@cher1shrxd/webview-stack-kit";
import { BridgeProvider } from "./shared/libs/bridge/contexts/BridgeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BridgeProvider>
    <SafeAreaProvider>
      <NavigationStack>
        <App />
      </NavigationStack>
    </SafeAreaProvider>
  </BridgeProvider>,
);
