import { useEffect, useState } from "react";
import Sliding from "../shared/ui/Sliding"

const FindActivity = () => {
  const [closeRequest, setCloseRequest] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCloseRequest(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCloseRequest]);

  return (
    <Sliding
      direction="top-bottom"
      startPosition="150%"
      animationStyle="solid"
      closeRequest={closeRequest}
      className="flex items-center justify-center w-full h-full text-2xl font-bold text-white bg-primary"
      duration={0.5}
      onAnimationComplete={() => {}}
    >
      <p>딴짓 찾는 중...</p>
    </Sliding>
  )
}

export default FindActivity