import { Button, Dropdown, Spacer } from "@ddanjit/ui";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import { useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import QuitButton from "../widgets/QuitButton";
import Progress from "../widgets/Progress";
import { usePersistedState } from "../shared/providers/snapshot-provider/usePersistedState";
import { situationOptions } from "../features/start-activity/constants/options";
import { useSituationStore } from "../features/start-activity/stores/situation";

const ActivitySituation = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { situation, setSituation } = useSituationStore();
  const [selected, setSelected] = usePersistedState(
    situation !== situationOptions[0] ? situation : situationOptions[0],
    "activity-situation-selected",
  );
  const tab = useTab();
  const [done, setDone] = useState(false);

  const handleNext = () => {
    setSituation(selected);
    setCloseRequest(true);
    setDone(true);
  };

  return (
    <Screen className="flex flex-col w-full gap-5">
      <Progress from={50} to={done ? 100 : 50} />
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
          지금 시간은 {`${new Date().getHours()}`.padStart(2, "0")}:
          {`${new Date().getMinutes()}`.padStart(2, "0")}분!
          <br />
          어떤 상황에 황금 같은 휴식 시간이?!
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
            options={situationOptions}
            fontSize={24}
          />
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
        onAnimationComplete={() => tab.move("activity-find")}>
        <Button
          background="primary"
          size="full"
          className="text-white"
          onClick={handleNext}>
          딴짓 찾기
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

export default ActivitySituation;
