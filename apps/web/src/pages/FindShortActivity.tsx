import { useEffect, useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import Sliding from "../shared/ui/Sliding";
import { useFindShortActivityQuery } from "../features/find-activity/queries";

const FindShortActivity = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const { isLoading } = useFindShortActivityQuery();
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

  return (
    <Sliding
      direction="top-bottom"
      startPosition="150%"
      animationStyle="solid"
      closeRequest={closeRequest}
      className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-primary"
      duration={0.5}
      onAnimationComplete={() => tab.move("activity-found-short")}>
      <p className="text-center">
        1분 구원 딴짓
        <br />
        찾는 중...
      </p>
    </Sliding>
  );
};

export default FindShortActivity;
