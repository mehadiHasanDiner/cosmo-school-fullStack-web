import { motion } from "motion/react";

const directions = {
  up: {
    hidden: { opacity: 0, y: 45 },
    visible: { opacity: 1, y: 0 },
  },

  down: {
    hidden: { opacity: 0, y: -45 },
    visible: { opacity: 1, y: 0 },
  },

  left: {
    hidden: { opacity: 0, x: -45 },
    visible: { opacity: 1, x: 0 },
  },

  right: {
    hidden: { opacity: 0, x: 45 },
    visible: { opacity: 1, x: 0 },
  },

  zoom: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
};

const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}) => {
  const selectedDirection = directions[direction] || directions.up;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.2,
      }}
      variants={selectedDirection}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
