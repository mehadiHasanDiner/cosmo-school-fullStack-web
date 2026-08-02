import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-[#08703C] shadow shadow-emerald-700",

    secondary:
      "bg-secondary text-gray-900 hover:bg-yellow-500 shadow shadow-yellow-600",

    outline:
      "border border-green-700 text-green-800 hover:bg-green-700 hover:text-white",

    danger: "bg-error text-white hover:bg-red-700 shadow shadow-red-900",

    ghost: "bg-transparent hover:bg-base-200 text-neutral",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-6 py-3 text-base",

    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={clsx(
        "font-heading rounded-full font-semibold transition-all duration-300 active:scale-95",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
