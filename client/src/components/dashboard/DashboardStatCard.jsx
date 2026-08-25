const colorStyles = {
  green: {
    box: "border-primary/20 bg-primary/[0.05]",
    icon: "bg-primary text-white",
  },

  yellow: {
    box: "border-secondary/30 bg-secondary/[0.08]",
    icon: "bg-secondary text-neutral",
  },

  blue: {
    box: "border-info/20 bg-info/[0.05]",
    icon: "bg-info text-white",
  },

  red: {
    box: "border-accent/20 bg-accent/[0.05]",
    icon: "bg-accent text-white",
  },
};

const DashboardStatCard = ({
  icon: Icon,
  title,
  value,
  description,
  color = "green",
}) => {
  const style = colorStyles[color] || colorStyles.green;

  return (
    <article
      className={`
        group relative overflow-hidden
        rounded-2xl border p-5
        shadow-[0_12px_35px_rgba(0,0,0,0.05)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:shadow-[0_20px_45px_rgba(39,140,69,0.12)]
        ${style.box}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-base-content/55">{title}</p>

          <p className="mt-2 text-3xl font-black text-neutral">{value}</p>

          <p className="mt-1 text-xs text-base-content/45">{description}</p>
        </div>

        <div
          className={`
            grid size-12 place-items-center
            rounded-xl text-xl shadow-md
            transition-transform duration-300
            group-hover:-rotate-3
            group-hover:scale-110
            ${style.icon}
          `}
        >
          <Icon />
        </div>
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
    </article>
  );
};

export default DashboardStatCard;
