// =====================================================
// Reusable Information Row
// =====================================================

const InfoRow = ({ label, value, icon: Icon }) => {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-base-200 pb-2 last:border-0">
      <span className="text-sm text-base-content/80">{label}</span>

      <span className="flex items-center gap-2 text-sm font-bold capitalize text-neutral">
        {Icon && <Icon />}

        {value || "—"}
      </span>
    </div>
  );
};

export default InfoRow;
