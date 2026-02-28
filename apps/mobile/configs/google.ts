import { GOOGLE_CLIENT_IOS } from "@/constants/env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  iosClientId: GOOGLE_CLIENT_IOS,
});
