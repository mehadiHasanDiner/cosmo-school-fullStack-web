import { motion } from "motion/react";
import { Inbox } from "lucide-react";
import CosmoButton from "./CosmoButton";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No information found",
  description = "There is currently no information available here.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        cosmo-gradient
        flex
        min-h-80
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-primary/30
        bg-base-100
        p-8
        text-center
      "
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="grid size-20 place-items-center rounded-3xl bg-primary/10 text-primary shadow-lg"
      >
        <Icon className="size-10" />
      </motion.div>

      <h3 className="mt-6 text-2xl font-extrabold text-neutral">{title}</h3>

      <p className="mt-3 max-w-md leading-7 text-base-content/65">
        {description}
      </p>

      {buttonText && (
        <div className="mt-7">
          <CosmoButton onClick={onButtonClick}>{buttonText}</CosmoButton>
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
