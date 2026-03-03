import { useEffect, useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import Fading from "../shared/ui/Fading";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";

const DoneRegister = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const tab = useTab();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCloseRequest(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setCloseRequest]);

  return (
    <Fading
      className="w-full h-full"
      closeRequest={closeRequest}
      duration={0.5}
      closeDelay={1}
      onAnimationComplete={() => tab.move("activity-time")}>
      <Screen className="flex flex-col items-center justify-center gap-5 bg-primary">
        <Sliding
          direction="left-right"
          startPosition="400%"
          delay={0.7}
          closeRequest={closeRequest}
          closeDelay={0.2}
          animationStyle="bouncy">
          <h1 className="text-3xl font-bold">딴짓러가 된 걸 축하해요!</h1>
        </Sliding>
        <Sliding
          direction="left-right"
          startPosition="400%"
          delay={0.9}
          closeRequest={closeRequest}
          closeDelay={0.4}
          animationStyle="bouncy">
          <p className="text-center">
            사용자님의 정보를 저장했어요.
            <br />
            너, 납치된거야 -.-*!
            <br />
            5초 뒤, 본격적으로 딴짓이 시작됩니다!
          </p>
        </Sliding>
      </Screen>
    </Fading>
  );
};

export default DoneRegister;
