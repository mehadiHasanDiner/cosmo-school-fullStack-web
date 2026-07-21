import clsx from "clsx";

const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={clsx(
        `
        bg-base-100
        rounded-[10px]
        border
        border-base-300
        shadow-sm
        p-6
        transition-all
        duration-300
        `,
        hover &&
          `
          hover:-translate-y-2
          hover:shadow-xl
        `,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
