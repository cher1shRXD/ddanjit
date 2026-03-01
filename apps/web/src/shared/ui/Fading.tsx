import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  closeRequest: boolean;
  closeDelay?: number;
  onAnimationComplete?: () => void;
  duration?: number;
  style?: React.CSSProperties;
}

const Fading = ({
  children,
  className,
  delay = 0,
  closeRequest,
  closeDelay = 0,
  onAnimationComplete,
  duration = 0.5,
  style,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={closeRequest ? { opacity: 0 } : { opacity: 1 }}
      transition={{
        duration,
        delay: closeRequest ? closeDelay : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onAnimationComplete={() => {
        if (closeRequest) onAnimationComplete?.();
      }}
      className={className}
      style={style}>
      {children}
    </motion.div>
  );
};

export default Fading;
