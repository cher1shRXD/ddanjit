import { motion, type Transition } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top";
  closeRequest: boolean;
  closeDelay?: number;
  startPosition?: string;
  endPosition?: string;
  onAnimationComplete?: () => void;
  rotate?: number;
  duration?: number;
  style?: React.CSSProperties;
  animationStyle?: "bouncy" | "solid";
}

const getHidden = (direction: string, startPosition: string) => {
  switch (direction) {
    case "left-right": return { x: `-${startPosition}`, y: 0 }
    case "right-left": return { x: `${startPosition}`, y: 0 }
    case "top-bottom": return { x: 0, y: `-${startPosition}` }
    case "bottom-top": return { x: 0, y: `${startPosition}` }
    default: return { x: 0, y: 0 }
  }
}

const getVisible = (direction: string, endPosition: string) => {
  switch (direction) {
    case "left-right": return { x: endPosition, y: 0 }
    case "right-left": return { x: `-${endPosition}`, y: 0 }
    case "top-bottom": return { x: 0, y: endPosition }
    case "bottom-top": return { x: 0, y: `-${endPosition}` }
    default: return { x: 0, y: 0 }
  }
}

const Sliding = ({
  children,
  className,
  delay = 0,
  closeDelay = 0,
  direction = "right-left",
  closeRequest,
  startPosition = "100%",
  endPosition = "0%",
  onAnimationComplete,
  rotate = 0,
  duration = 0.5,
  style,
  animationStyle = "solid",
}: Props) => {
  const hidden = getHidden(direction, startPosition)
  const visible = getVisible(direction, endPosition)

  const springTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1,
    delay: closeRequest ? closeDelay : delay,
  }

  const solidTransition: Transition = {
    duration,
    delay: closeRequest ? closeDelay : delay,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  }

  const transition = animationStyle === "bouncy" ? springTransition : solidTransition

  return (
    <motion.div
      initial={{ ...hidden, rotate }}
      animate={closeRequest ? { ...hidden, rotate } : { ...visible, rotate }}
      transition={transition}
      onAnimationComplete={() => {
        if (closeRequest) onAnimationComplete?.()
      }}
      className={className}
      style={{
        ...style,
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  )
}

export default Sliding