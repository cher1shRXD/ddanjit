import { Button, Dropdown, Spacer } from "@ddanjit/ui";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import { useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import QuitButton from "../widgets/QuitButton";
import { useTimeStore } from "../features/find-activity/stores/time";
import { usePersistedState } from "../shared/providers/snapshot-provider/usePersistedState";
import { timeOptions } from "../features/find-activity/constants/options";
import type { Duration } from "@ddanjit/domain";
import Modal from "../widgets/Modal";

const ActivityTime = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { time, setTime } = useTimeStore();
  const [selected, setSelected] = usePersistedState(
    time !== timeOptions[0] ? time : timeOptions[0],
    "activity-time-selected",
  );
  const tab = useTab();
  const [showModal, setShowModal] = usePersistedState(
    false,
    "activity-time-show-modal",
  );
  const [isAgreed, setIsAgreed] = useState(false);

  const handleNext = () => {
    setTime(selected as Duration);
    setIsAgreed(true);
    setCloseRequest(true);
  };

  return (
    <Screen className="flex flex-col w-full gap-5">
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
        closeDelay={0.4}
        animationStyle="bouncy"
        onAnimationComplete={() =>
          isAgreed
            ? showModal
              ? tab.move("activity-find-short")
              : tab.move("activity-find")
            : tab.move("report")
        }>
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
        onClick={() => setShowModal(true)}
        text="지금은 별로 하고싶지 않아요."
      />
      {showModal && (
        <Modal
          requestParentClose={setCloseRequest}
          texts={[
            "솔직히 지금 좀 심심하잖아~\n나 같으면 릴스보단 딴짓하면서 의미 있게라도 보낸다 ㅋㅋ",
            "이거만 해도 하루 정도는 연속 기록으로 쳐줘!",
          ]}
          enterButton={
            <Button
              size="full"
              background="primary"
              className="text-white"
              onClick={() => setIsAgreed(true)}>
              1분 구원 딴짓 보여주세요.
            </Button>
          }
          quitButton={
            <Button
              size="full"
              background="transparent"
              className="text-text/40">
              관심 없어요. 안할래요.
            </Button>
          }
          closeModal={() => setShowModal(false)}
        />
      )}
    </Screen>
  );
};

export default ActivityTime;
