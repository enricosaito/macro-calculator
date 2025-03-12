import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const Reveal = ({ children, direction = "up", delay = 0, className = "" }: RevealProps) => {
  const directionVariants = {
    up: { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down: { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -50, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <motion.div
      initial={directionVariants[direction].initial}
      whileInView={directionVariants[direction].animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
