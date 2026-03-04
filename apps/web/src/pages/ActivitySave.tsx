import { useEffect, useState } from "react";
import { useTab } from "../shared/providers/tab-provider/useTab";
import Sliding from "../shared/ui/Sliding";

const ActivitySave = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  const [isMinTimePassed, setIsMinTimePassed] = useState(false);
  const tab = useTab();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimePassed(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMinTimePassed) {
      setTimeout(() => {
        setCloseRequest(true);
      }, 0);
    }
  }, [isMinTimePassed]);

  return (
    <Sliding
      direction="top-bottom"
      startPosition="150%"
      animationStyle="solid"
      closeRequest={closeRequest}
      className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-primary"
      duration={0.5}
      onAnimationComplete={() => tab.move("report")}>
      <p>딴짓 결과를 저장하는중...</p>
      <p className="text-sm font-medium">도파민과 맞바꿀만한 유익한 시간이었길 바라요!</p>
    </Sliding>
  );
};

export default ActivitySave;
