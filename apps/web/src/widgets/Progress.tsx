import { useEffect, useState } from "react";
import { useSafeArea } from "../shared/providers/safe-area-provider/useSafeArea";

interface Props {
  from: number;
  to: number;
}

const Progress = ({ from, to }: Props) => {
  const [progress, setProgress] = useState(from);
  const { top } = useSafeArea();

  useEffect(() => {
    setProgress(to);
  }, [to]);

  return (
    <div className="absolute top-0 left-0 w-full h-2 overflow-hidden bg-text/10" style={{ top }}>
      <div
        className={`h-full transition-all duration-300 ease-in-out bg-primary ${progress !== 100 ? "rounded-r-full" : ""}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Progress;
