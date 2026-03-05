import { useEffect, useState } from "react";
import Sliding from "../shared/ui/Sliding";
import { useTab } from "../shared/providers/tab-provider/useTab";
import { useFindActivityQuery } from "../features/find-activity/queries";
import { useTimeStore } from "../features/find-activity/stores/time";
import { useActivityStore } from "../features/find-activity/stores/activity";

const FindActivity = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const { time } = useTimeStore();
  const { isLoading, data } = useFindActivityQuery(time);
  const { setActivity } = useActivityStore();
  const tab = useTab();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && isMinTimePassed) {
      setTimeout(() => {
        setCloseRequest(true);
      }, 0);
    }
  }, [isLoading, isMinTimePassed]);

  const handleComplete = () => {
    const activity = data?.data.data;
    if (activity) {
      setActivity(activity);
      tab.move("activity-found");
    }
  };

  return (
    <Sliding
      direction="top-bottom"
      startPosition="150%"
      animationStyle="solid"
      closeRequest={closeRequest}
      className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-primary"
      duration={0.5}
      onAnimationComplete={handleComplete}>
      <p>딴짓 찾는 중...</p>
    </Sliding>
  );
};

export default FindActivity;
