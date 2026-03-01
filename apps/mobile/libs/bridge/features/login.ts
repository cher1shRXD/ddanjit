import appleAuth from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const useLogin = () => {
  const appleLogin = async () => {
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (response.identityToken) {
      return {
        idToken: response.identityToken,
        email: response.email || undefined,
      };
    }
    return null;
  };

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const { data } = await GoogleSignin.signIn();
    if (data) return { idToken: data?.idToken, email: data?.user.email };
    return null;
  };

  const login = async ({ provider }: { provider: string }) => {
    switch (provider) {
      case "apple":
        return await appleLogin();
      case "google":
        return await googleLogin();
    }
  };

  return { login };
};
