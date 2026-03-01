import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { useBridge } from "@/libs/bridge/common/hooks/useBridge";
import { BridgeUiProvider } from "@/libs/bridge/common/contexts/BridgeUiProvider";

const AppContent = () => {
  const { top, bottom } = useSafeAreaInsets();
  const host = "http://172.30.1.73:5173";
  const uri = `${host}?top=${top}&bottom=${bottom}`;
  const handleMessage = useBridge();
  const ref = useRef<WebView>(null);

  return (
    <WebView
      ref={ref}
      source={{ uri }}
      style={{ flex: 1 }}
      scrollEnabled={false}
      onMessage={(event) => {
        handleMessage(event.nativeEvent.data, ref.current || undefined);
      }}
    />
  );
};

const App = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <BridgeUiProvider top={top} bottom={bottom}>
      <AppContent />
    </BridgeUiProvider>
  );
};

export default App;
