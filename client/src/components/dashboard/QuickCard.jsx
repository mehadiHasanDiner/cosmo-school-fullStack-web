import { FiArrowRight } from "react-icons/fi";

const QuickCard = ({ icon: Icon, title, description }) => {
  return (
    <button
      type="button"
      className="
        group relative overflow-hidden rounded-2xl
        border border-base-300 bg-base-100
        p-5 text-left
        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-[0_15px_35px_rgba(39,140,69,0.12)]
      "
    >
      <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="text-xl" />
      </div>

      <h3 className="mt-4 font-black text-neutral">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-base-content/55">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-2 font-bold text-primary">
        Open
        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary via-secondary to-accent transition-transform duration-300 group-hover:scale-x-100" />
    </button>
  );
};

export default QuickCard;
