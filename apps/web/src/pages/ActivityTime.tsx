import { Button, Dropdown, Spacer } from "@ddanjit/ui";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import { useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import QuitButton from "../widgets/QuitButton";
import Progress from "../widgets/Progress";
import { useTimeStore } from "../features/start-activity/stores/time";
import { usePersistedState } from "../shared/providers/snapshot-provider/usePersistedState";
import { timeOptions } from "../features/start-activity/constants/options";

const ActivityTime = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { time, setTime } = useTimeStore();
  const [selected, setSelected] = usePersistedState(
    time !== timeOptions[0] ? time : timeOptions[0],
    "activity-time-selected",
  );
  const tab = useTab();

  const handleNext = () => {
    setTime(selected);
    setCloseRequest(true);
  };

  return (
    <Screen className="flex flex-col w-full gap-5">
      <Progress from={0} to={50} />
      <Spacer height={60} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <h1 className="text-4xl font-bold">시작하기</h1>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.2}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy">
        <h2 className="text-2xl font-semibold">
          짧은 여유 시간이 생기셨군요!
          <br />
          어느 정도를 딴짓에 사용 할까요?
        </h2>
      </Sliding>
      <Spacer height={0} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.3}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy"
        className="flex items-center justify-center w-full">
        <div className="flex items-center justify-center gap-3">
          <Dropdown
            selected={selected}
            onChange={setSelected}
            options={timeOptions}
            fontSize={24}
          />
          <p className="text-2xl font-bold">분</p>
        </div>
      </Sliding>
      <Spacer />
      <Sliding
        direction="bottom-top"
        startPosition="400%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.8}
        animationStyle="bouncy"
        onAnimationComplete={() => tab.move("activity-situation")}>
        <Button
          background="primary"
          size="full"
          className="text-white"
          onClick={handleNext}>
          다음
        </Button>
      </Sliding>
      <QuitButton
        closeRequest={closeRequest}
        onClick={() => {}}
        text="지금은 별로 하고싶지 않아요."
      />
    </Screen>
  );
};

export default ActivityTime;
