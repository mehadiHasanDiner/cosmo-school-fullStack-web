// =====================================================
// Reusable Information Section
// =====================================================

const InformationSection = ({ title, icon: Icon, children }) => {
  return (
    <section className="rounded-2xl border border-base-300 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon />
        </div>

        <h3 className="text-lg font-black text-neutral">{title}</h3>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  );
};

export default InformationSection;
