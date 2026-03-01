import { Button, Spacer } from "@ddanjit/ui";
import Ddani from "../shared/assets/icons/Ddani";
import Logo from "../shared/assets/icons/Logo";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import Fading from "../shared/ui/Fading";
import Sliding from "../shared/ui/Sliding";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Footer from "../widgets/Footer";
import { useCheckInfo } from "../features/check-info/hooks/useCheckInfo";

const Onboarding = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const tab = useTab();
  const { isLoggedIn, isRegistered } = useCheckInfo();

  return (
    <Fading
      className="w-full h-full"
      closeRequest={closeRequest}
      closeDelay={1}
      onAnimationComplete={() =>
        tab.move(
          isLoggedIn
            ? isRegistered
              ? "ddanjit-start"
              : "register-info"
            : "login",
        )
      }>
      <Screen className="bg-primary">
        <div className="relative flex flex-col items-end w-full h-full gap-4">
          <Sliding
            direction="top-bottom"
            startPosition="400%"
            endPosition="100%"
            rotate={90}
            delay={0.5}
            duration={1}
            closeRequest={closeRequest}
            closeDelay={0.5}
            animationStyle="bouncy"
            className="text-white text-[96px] font-black absolute text-nowrap top-4 -left-53">
            <h1>DDAN-JIT</h1>
          </Sliding>
          <Spacer />
          <Sliding
            direction="right-left"
            startPosition="150%"
            delay={1.2}
            closeRequest={closeRequest}
            closeDelay={0}
            animationStyle="bouncy">
            <Ddani size={128} className="drop-shadow-lg" />
          </Sliding>
          <Sliding
            direction="right-left"
            startPosition="150%"
            delay={1.2}
            closeRequest={closeRequest}
            closeDelay={0}
            animationStyle="bouncy">
            <p className="text-3xl font-bold text-end">
              넘쳐나는 도파민들?
              <br />
              이건 격이 다른
            </p>
          </Sliding>
          <Sliding
            direction="right-left"
            startPosition="150%"
            delay={1.2}
            closeRequest={closeRequest}
            closeDelay={0}
            animationStyle="bouncy">
            <Logo size={128} className="text-white" />
          </Sliding>
          <Spacer />
          <Sliding
            direction="bottom-top"
            startPosition="200%"
            delay={2}
            duration={1}
            closeRequest={closeRequest}
            closeDelay={0.5}
            animationStyle="bouncy"
            className="w-full">
            <div className="flex flex-col w-full gap-5">
              <Button
                size="fit"
                background="surface"
                onClick={() => setCloseRequest(true)}
                rounded={8}>
                <div className="flex items-center">
                  <p className="font-semibold">시작하기</p>
                  <Icon icon="mdi:arrow-right" className="ml-2" />
                </div>
              </Button>
              <Footer />
            </div>
          </Sliding>
        </div>
      </Screen>
    </Fading>
  );
};

export default Onboarding;
