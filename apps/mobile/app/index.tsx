import { WebView } from "react-native-webview";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const host = "http://172.30.1.73:5173";
  const uri = `${host}?top=${top}&bottom=${bottom}`;

  const appleLogin = async () => {
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    console.log(response);

    return {
      identityToken: response.identityToken,
      name: response.fullName?.givenName ?? null,
    };
  };

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();
    console.log(data);
    return data?.idToken;
  };

  return <WebView source={{ uri }} style={{ flex: 1 }} scrollEnabled={false} />;
};

export default App;
