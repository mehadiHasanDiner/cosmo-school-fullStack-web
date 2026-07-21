const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  let buttonClass =
    "font-heading rounded-xl font-semibold transition-all duration-300 active:scale-95";

  //   let buttonSize = "px-4 py-2 text-sm";

  if (variant === "primary") {
    buttonClass += "bg-primary text-white hover:bg-[#08703C]";
  }
  if (variant === "secondary") {
    buttonClass += "bg-secondary text-gray-900 hover:bg-yellow-500";
  }
  if (variant === "outline") {
    buttonClass +=
      "border border-primary text-primary hover:bg-primary hover:text-white";
  }
  if (variant === "danger") {
    buttonClass += "bg-error text-white hover:bg-red-700";
  }
  if (variant === "ghost") {
    buttonClass += "bg-transparent hover:bg-base-200 text-neutral";
  }

  return <div className={buttonClass}>{children}</div>;
};

export default Button;
