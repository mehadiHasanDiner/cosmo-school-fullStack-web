import { motion } from "motion/react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-5">
      <div className="relative size-16">
        <motion.span
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.span
          className="absolute inset-3 rounded-full border-4 border-secondary/30 border-b-secondary"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
        }}
        className="font-bold text-base-content/60"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
