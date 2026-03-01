import { useEffect, useRef, useState } from "react";

interface Props {
  totalSeconds: number;
  onEnd?: () => void;
  autoStart?: boolean;
}

export const Timer = ({ totalSeconds, onEnd, autoStart = false }: Props) => {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const progress = remaining / totalSeconds;
  const size = 240;
  const center = size / 2;
  const radius = size / 2;
  const strokeWidth = 8;
  const trackRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * trackRadius;
  const strokeDashoffset = circumference * (1 - progress);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  useEffect(() => {
    if (autoStart) setRunning(true);
  }, [autoStart]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            onEnd?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, onEnd]);

  const handleClick = () => {
    if (!autoStart) setRunning(true);
  };

  const isOver = remaining === 0;

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <div
        className={`relative flex items-center justify-center ${!autoStart ? "active:scale-98 transition-transform" : ""}`}
        style={{ width: size, height: size }}
        onClick={handleClick}>
        <svg width={size} height={size} className="absolute -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="fill-surface/60"
          />
          <circle
            cx={center}
            cy={center}
            r={trackRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-primary/20"
          />
          <circle
            cx={center}
            cy={center}
            r={trackRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-1000"
          />
        </svg>

        <div className="z-10 flex items-center justify-center">
          {isOver ? (
            <span className="text-static-orange text-3xl font-bold shake-horizontal">
              Time Over!
            </span>
          ) : (
            <span className="text-primary text-5xl font-semibold tabular-nums">
              {minutes}:{seconds}
            </span>
          )}
        </div>
      </div>

      <div className="w-60">
        <div className="bg-surface/60 rounded-2xl p-2 w-full overflow-hidden relative">
          <div
            className="absolute bottom-0 left-0 h-full bg-primary transition-all duration-1000 z-10"
            style={{ width: `${progress * 100}%` }}
          />
          {isOver ? (
            <div className="relative z-20 w-full h-full bg-white rounded-lg px-2">
              <p className="text-static-orange text-xl font-bold shake-horizontal">
                Time Over!
              </p>
            </div>
          ) : (
            <div className="relative z-20 w-full h-full bg-white rounded-lg px-2">
              <p className="text-primary text-xl font-semibold tabular-nums">
                {minutes}:{seconds}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
