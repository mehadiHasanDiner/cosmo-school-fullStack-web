import { motion } from "motion/react";

const alignStyles = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const SectionTitle = ({
  eyebrow,
  title,
  highlightedText,
  description,
  align = "center",
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        mx-auto flex max-w-3xl flex-col
        ${alignStyles[align]}
        ${className}
      `}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.14em] text-primary shadow-sm">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>

          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl font-extrabold leading-tight text-neutral sm:text-4xl lg:text-4xl">
        {title}{" "}
        {highlightedText && (
          <span className="relative inline-block text-primary">
            {highlightedText}

            <motion.span
              className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-primary via-secondary to-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                delay: 0.25,
              }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-base-content/70 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
