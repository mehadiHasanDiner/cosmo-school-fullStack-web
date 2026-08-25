import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const ManagementCard = ({ icon: Icon, title, description, path }) => {
  return (
    <Link
      to={path}
      className="
        group relative overflow-hidden
        rounded-2xl border border-base-300
        bg-base-100 p-6
        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:border-primary/25
        hover:shadow-[0_18px_45px_rgba(39,140,69,0.12)]
      "
    >
      <div
        className="
          grid size-13 place-items-center
          rounded-xl bg-primary/10
          text-xl text-primary
          transition-all duration-300
          group-hover:bg-primary
          group-hover:text-white
          group-hover:rotate-3
        "
      >
        <Icon />
      </div>

      <h3 className="mt-5 text-lg font-black text-neutral">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-base-content/55">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
        Manage
        <FiArrowRight
          className="
            transition-transform duration-300
            group-hover:translate-x-1
          "
        />
      </div>

      <div
        className="
          absolute inset-x-0 bottom-0
          h-1 origin-left scale-x-0
          bg-linear-to-r
          from-primary via-secondary to-accent
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />
    </Link>
  );
};

export default ManagementCard;
