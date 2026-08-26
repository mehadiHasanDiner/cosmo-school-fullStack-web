import { motion } from "motion/react";
import { LoaderCircle } from "lucide-react";

const buttonStyles = {
  primary: "border-primary bg-primary text-primary-content hover:bg-[#20783a]",

  secondary:
    "border-secondary bg-secondary text-secondary-content hover:bg-[#dfb210]",

  accent: "border-accent bg-accent text-accent-content hover:bg-[#c9232a]",

  neutral: "border-neutral bg-neutral text-neutral-content hover:bg-[#12171b]",

  outline:
    "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-content",

  ghost:
    "border-transparent bg-transparent text-base-content hover:bg-primary/10 hover:text-primary",
};

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-sm sm:text-base",
  lg: "min-h-14 px-7 text-base sm:px-8 sm:text-lg",
};

const CosmoButton = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={
        disabled || loading
          ? {}
          : {
              y: -3,
              scale: 1.025,
            }
      }
      whileTap={
        disabled || loading
          ? {}
          : {
              y: 0,
              scale: 0.97,
            }
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 24,
      }}
      className={`
        btn
        relative
        isolate
        overflow-hidden
        rounded-xl
        border
        font-semibold
        normal-case
        tracking-wide
        transition-colors
        duration-300
        focus-visible:outline-2
        focus-visible:outline-offset-3
        focus-visible:outline-primary
        disabled:pointer-events-none
        disabled:opacity-60
        ${buttonStyles[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-white/20"
        initial={{ x: "-110%", skewX: "-20deg" }}
        whileHover={{ x: "110%" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
      />

      <span className="absolute inset-x-3 bottom-0 h-px bg-white/50" />

      {loading && <LoaderCircle className="size-5 animate-spin" />}

      {!loading && Icon && iconPosition === "left" && (
        <motion.span
          whileHover={{
            rotate: [0, -8, 8, 0],
          }}
        >
          <Icon className="size-5" />
        </motion.span>
      )}

      <span>{loading ? "Please wait..." : children}</span>

      {!loading && Icon && iconPosition === "right" && (
        <motion.span
          whileHover={{
            x: 4,
          }}
        >
          <Icon className="size-5" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default CosmoButton;
