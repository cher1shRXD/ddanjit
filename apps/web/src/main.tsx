import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SafeAreaProvider from "./shared/providers/safe-area-provider/index.tsx";
import { NavigationStack } from "@cher1shrxd/webview-stack-kit";

createRoot(document.getElementById("root")!).render(
  <SafeAreaProvider>
    <NavigationStack>
      <App />
    </NavigationStack>
  </SafeAreaProvider>,
);
