import { Button, Spacer } from "@ddanjit/ui";
import { useGetActivityListQuery } from "../features/find-activity/queries";
import { useTimeStore } from "../features/find-activity/stores/time";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import { useState } from "react";
import ActivityItem from "../features/find-activity/ui/ActivityItem";
import QuitButton from "../widgets/QuitButton";
import Modal from "../widgets/Modal";
import { useTab } from "../shared/providers/tab-provider/useTab";
import { clearLocalStorage } from "../shared/utils/clear-local-storage";

const ActivityList = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { time } = useTimeStore();
  const { data, isLoading } = useGetActivityListQuery(time);
  const activityList = data?.data.data || [];
  const [showModal, setShowModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const tab = useTab();

  const handleSelect = () => {
    setIsAgreed(true);
    setCloseRequest(true);
  };

  const handleQuit = () => {
    clearLocalStorage();
    tab.move("report");
  };

  return (
    <Screen className="flex flex-col gap-5">
      <Spacer height={60} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <h1 className="text-4xl font-bold">마음에 들지 않았나요?</h1>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.2}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy">
        <h2 className="text-2xl font-semibold">
          작성한 소요시간에 맞는
          <br />
          딴짓 목록이에요.
        </h2>
      </Sliding>
      <Spacer height={0} />
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
              : tab.move("activity-start")
            : handleQuit()
        }
        className="flex-1 w-full py-2 overflow-y-scroll rounded-lg bg-surface/60">
        {isLoading ? (
          <p className="text-center">로딩중...</p>
        ) : (
          activityList.map((activity) => (
            <ActivityItem
              key={activity.id}
              data={activity}
              requestClose={handleSelect}
            />
          ))
        )}
      </Sliding>
      <QuitButton
        closeRequest={closeRequest}
        onClick={() => setShowModal(true)}
        text="여기도 마음에 드는게 없네요. 오늘은 안할래요."
      />
      {showModal && (
        <Modal
          requestParentClose={setCloseRequest}
          texts={[
            "마음에 드는게 그렇게 없어?\n아쉬운대로 “1분 만에” 끝나는 딴짓이라도 볼래?",
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

export default ActivityList;
