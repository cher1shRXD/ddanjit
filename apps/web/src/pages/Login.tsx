import { useState } from "react";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import { Spacer } from "@ddanjit/ui";
import GoogleLogin from "../shared/assets/images/google-login.png";
import AppleLogin from "../shared/assets/images/apple-login.png";
import Footer from "../widgets/Footer";
import { useTab } from "../shared/providers/tab-provider/useTab";
import { useLogin } from "../features/login/hooks/useLogin";

const Login = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { login } = useLogin(setCloseRequest);
  const tab = useTab();

  return (
    <Screen className="flex flex-col gap-5">
      <Spacer height={120} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <h1 className="text-4xl font-bold">환영합니다</h1>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.2}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy">
        <h2 className="text-2xl font-semibold">
          괜찮아요? 많이 놀랬죠?
          <br />
          걱정마요, 딴짓이 있잖아요.
        </h2>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <p>
          저는 세상에 넘쳐나는 자극적인 도파민에게서
          <br />
          여러분들을 구하고 있어요.
        </p>
      </Sliding>
      <Spacer />
      <div className="space-y-1">
        <Sliding
          direction="bottom-top"
          startPosition="400%"
          delay={0.4}
          closeRequest={closeRequest}
          closeDelay={0.2}
          animationStyle="bouncy"
          onAnimationComplete={() => tab.move("register-info")}>
          <button
            className="transition-transform active:scale-95 drop-shadow-md"
            onClick={() => login("google")}>
            <img src={GoogleLogin} alt="Google Login" />
          </button>
        </Sliding>
        <Sliding
          direction="bottom-top"
          startPosition="400%"
          delay={0.6}
          closeRequest={closeRequest}
          closeDelay={0.2}
          animationStyle="bouncy">
          <button
            className="transition-transform active:scale-95 drop-shadow-md"
            onClick={() => login("apple")}>
            <img src={AppleLogin} alt="Apple Login" />
          </button>
        </Sliding>
      </div>
      <Sliding
        direction="bottom-top"
        startPosition="400%"
        delay={0.8}
        closeRequest={closeRequest}
        closeDelay={0}
        animationStyle="bouncy">
        <Footer />
      </Sliding>
    </Screen>
  );
};

export default Login;
