import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SafeAreaProvider from "./shared/providers/safe-area-provider/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </StrictMode>,
);
