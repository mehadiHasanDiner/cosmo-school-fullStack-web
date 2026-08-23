const colors = {
  green: "border-primary/20 bg-primary/5 text-primary",

  yellow: "border-secondary/30 bg-secondary/10 text-[#8a6d00]",

  red: "border-accent/20 bg-accent/5 text-accent",

  blue: "border-info/20 bg-info/5 text-info",
};

const DashboardStat = ({ icon: Icon, value, label, color = "green" }) => {
  return (
    <div
      className={`
        group rounded-2xl border
        p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_15px_35px_rgba(0,0,0,0.09)]
        ${colors[color]}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-black text-neutral">{value}</p>

          <p className="mt-1 text-sm font-semibold text-base-content/55">
            {label}
          </p>
        </div>

        <div className="grid size-12 place-items-center rounded-xl bg-current/10">
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardStat;
