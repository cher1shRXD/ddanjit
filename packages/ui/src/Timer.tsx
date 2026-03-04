import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  totalSeconds: number;
  onEnd?: () => void;
  autoStart?: boolean;
}

const MINI_R = 13;
const MINI_CIRC = 2 * Math.PI * MINI_R;

const MiniArc = ({ progress }: { progress: number }) => (
  <svg
    width={32}
    height={32}
    style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
    <circle
      cx={16}
      cy={16}
      r={MINI_R}
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth={3}
    />
    <circle
      cx={16}
      cy={16}
      r={MINI_R}
      fill="none"
      stroke="#A8D5C2"
      strokeWidth={3}
      strokeLinecap="round"
      strokeDasharray={MINI_CIRC}
      strokeDashoffset={MINI_CIRC * (1 - progress)}
      style={{ transition: "stroke-dashoffset 1s linear" }}
    />
  </svg>
);

export const Timer = ({ totalSeconds, onEnd, autoStart = false }: Props) => {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2 });
  const top = Number(
    new URLSearchParams(window.location.search).get("top") || 0,
  );

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
    <>
      <div
        className="flex flex-col items-center gap-6 select-none"
        ref={inViewRef}>
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
              className="transition-all duration-1000 text-primary"
            />
          </svg>

          <div className="z-10 flex items-center justify-center">
            {isOver ? (
              <span className="text-3xl font-semibold text-static-orange shake-horizontal">
                Time Over!
              </span>
            ) : running ? (
              <span className="text-5xl font-semibold text-primary tabular-nums">
                {minutes}:{seconds}
              </span>
            ) : (
              <span className="text-xl font-semibold text-primary">
                눌러서 시작하기
              </span>
            )}
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {running && !isOver && !inView && (
            <motion.div
              key="dynamic-island"
              style={{
                position: "fixed",
                top,
                left: "50%",
                x: "-50%",
                zIndex: 9999,
                originX: 0.5,
                originY: 0,
              }}
              initial={{
                scaleX: 0.3,
                scaleY: 0.3,
                opacity: 0,
                borderRadius: 48,
              }}
              animate={{ scaleX: 1, scaleY: 1, opacity: 1, borderRadius: 32 }}
              exit={{ scaleX: 0.3, scaleY: 0.3, opacity: 0, borderRadius: 48 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 28,
                mass: 0.8,
              }}>
              <div className="w-60">
                <div className="relative w-full p-2 overflow-hidden bg-surface/60 rounded-2xl">
                  <div
                    className="absolute bottom-0 left-0 z-10 h-full transition-all duration-1000 bg-primary"
                    style={{ width: `${progress * 100}%` }}
                  />
                  {isOver ? (
                    <div className="relative z-20 w-full h-full px-2 bg-white rounded-lg">
                      <p className="text-xl font-bold text-static-orange shake-horizontal">
                        Time Over!
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-20 w-full h-full px-2 bg-white rounded-lg">
                      <p className="text-xl font-semibold text-primary tabular-nums">
                        {minutes}:{seconds}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};
