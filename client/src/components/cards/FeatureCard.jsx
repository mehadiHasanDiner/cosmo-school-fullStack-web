import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const variants = {
  green: {
    icon: "bg-primary text-primary-content",
    light: "bg-primary/10",
    border: "border-primary/20",
    glow: "group-hover:shadow-[0_22px_55px_rgba(39,140,69,0.20)]",
  },

  yellow: {
    icon: "bg-secondary text-secondary-content",
    light: "bg-secondary/15",
    border: "border-secondary/30",
    glow: "group-hover:shadow-[0_22px_55px_rgba(244,197,24,0.22)]",
  },

  red: {
    icon: "bg-accent text-accent-content",
    light: "bg-accent/10",
    border: "border-accent/20",
    glow: "group-hover:shadow-[0_22px_55px_rgba(229,43,50,0.18)]",
  },

  blue: {
    icon: "bg-info text-info-content",
    light: "bg-info/10",
    border: "border-info/20",
    glow: "group-hover:shadow-[0_22px_55px_rgba(40,120,200,0.18)]",
  },
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color = "green",
  linkText = "Learn More",
  onClick,
}) => {
  const style = variants[color] || variants.green;

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group
        relative
        isolate
        h-full
        overflow-hidden
        rounded-3xl
        border
        bg-base-100
        p-6
        shadow-[0_12px_35px_rgba(31,41,35,0.08)]
        transition-shadow
        duration-500
        sm:p-8
        ${style.border}
        ${style.glow}
      `}
    >
      <div
        className={`
          absolute
          -right-16
          -top-16
          -z-10
          size-44
          rounded-full
          blur-3xl
          transition-transform
          duration-700
          group-hover:scale-150
          ${style.light}
        `}
      />

      <motion.div
        whileHover={{
          rotate: [0, -7, 7, 0],
          scale: 1.08,
        }}
        transition={{
          duration: 0.5,
        }}
        className={`
          mb-6
          grid
          size-16
          place-items-center
          rounded-2xl
          shadow-lg
          ${style.icon}
        `}
      >
        {Icon && <Icon className="size-8" strokeWidth={1.8} />}
      </motion.div>

      <h3 className="text-xl font-extrabold text-neutral sm:text-2xl">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-base-content/70">{description}</p>

      <button
        type="button"
        onClick={onClick}
        className="mt-6 inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-accent"
      >
        {linkText}

        <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>

      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary via-secondary to-accent transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
};

export default FeatureCard;
