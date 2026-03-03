import { useState } from "react";
import Screen from "../shared/providers/safe-area-provider/Screen";
import { useFindActivityQuery } from "../features/find-activity/queries";
import { useTimeStore } from "../features/find-activity/stores/time";
import { Button, Spacer } from "@ddanjit/ui";
import Sliding from "../shared/ui/Sliding";
import QuitButton from "../widgets/QuitButton";
import { useTab } from "../shared/providers/tab-provider/useTab";
import { icons } from "../shared/constants/icons";

const ActivityRefound = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const { time } = useTimeStore();
  const { data } = useFindActivityQuery(time);
  const activity = data?.data.data;
  const tab = useTab();

  const handleNext = () => {
    setIsAgreed(true);
    setCloseRequest(true);
  }

  return (
    <Screen className="flex flex-col w-full gap-5">
      <Spacer height={60} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <h1 className="text-4xl font-bold">또다른 딴짓을 찾았어요!</h1>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.2}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy">
        <h2 className="text-2xl font-semibold">{activity?.title}</h2>
      </Sliding>
      <Spacer height={0} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.3}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy"
        className="flex justify-center w-full">
        <h2 className="text-2xl font-semibold">
          <img src={icons[activity?.icon || "lightbulb"]} alt="icon" className="w-50 h-50" />
        </h2>
      </Sliding>
      <Spacer />
      <Sliding
        direction="bottom-top"
        startPosition="400%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.8}
        animationStyle="bouncy"
        onAnimationComplete={() => isAgreed ? tab.move("activity") : tab.move("activity-list")}>
        <Button
          background="primary"
          size="full"
          className="text-white"
          onClick={handleNext}>
          마음에 들어요. 지금 시작할게요.
        </Button>
      </Sliding>
      <QuitButton
        closeRequest={closeRequest}
        onClick={() => setCloseRequest(true)}
        text="이것도 마음에 안들어요. 직접 찾을게요."
      />
    </Screen>
  );
};

export default ActivityRefound;
