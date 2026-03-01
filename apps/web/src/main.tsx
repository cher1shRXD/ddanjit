import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SafeAreaProvider from "./shared/providers/safe-area-provider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <SafeAreaProvider>
    <App />
  </SafeAreaProvider>,
);
