import { Link } from "react-router";
import { FiChevronRight } from "react-icons/fi";

const QuickLink = ({ icon: Icon, title, path }) => {
  return (
    <Link
      to={path}
      className="
        group flex min-h-13
        items-center justify-between
        rounded-xl border border-base-300
        bg-base-100 px-4
        transition-all duration-300
        hover:translate-x-1
        hover:border-primary/30
        hover:bg-primary/5
        hover:shadow-sm
      "
    >
      <span className="flex items-center gap-3">
        <span
          className="
            grid size-9 place-items-center
            rounded-lg bg-primary/10
            text-primary
            transition-all duration-300
            group-hover:bg-primary
            group-hover:text-white
          "
        >
          <Icon />
        </span>

        <span className="font-bold text-neutral">{title}</span>
      </span>

      <FiChevronRight
        className="
          text-base-content/30
          transition-all duration-300
          group-hover:translate-x-1
          group-hover:text-primary
        "
      />
    </Link>
  );
};

export default QuickLink;
