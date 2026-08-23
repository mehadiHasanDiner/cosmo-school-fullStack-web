const InfoBox = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-base-200 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-base-content/40">
        {label}
      </p>

      <p className="mt-1 font-black text-neutral">{value}</p>
    </div>
  );
};

export default InfoBox;
