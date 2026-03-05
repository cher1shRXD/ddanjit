import { useEffect, useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import Sliding from "../shared/ui/Sliding";
import { useActivityStore } from "../features/find-activity/stores/activity";
import { clearLocalStorage } from "../shared/utils/clear-local-storage";

const ActivityStart = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { activity } = useActivityStore();
  const tab = useTab();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCloseRequest(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Sliding
      direction="top-bottom"
      startPosition="150%"
      animationStyle="solid"
      closeRequest={closeRequest}
      className="flex flex-col items-center justify-center w-full h-full gap-4 text-2xl font-bold text-white bg-primary"
      duration={0.5}
      onAnimationComplete={() => {
        tab.move("activity");
        clearLocalStorage(["activity"])
      }}>
      <p>선택한 딴짓을 시작할게요</p>
      <p className="text-sm font-medium text-center">
        {activity?.title}!
        <br />
        정말 탁월한 선택이에요!
      </p>
    </Sliding>
  );
};

export default ActivityStart;
