const RejectedUser = () => {
  return (
    <section className="p-4 sm:p-6 lg:p-8 body-font">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Rejected Users
          </p>

          <h1 className="mt-1 text-3xl font-black text-neutral">
            All Rejected List
          </h1>

          <p className="mt-2 text-base-content/60"> All rejected users list</p>
        </div>
      </div>
    </section>
  );
};

export default RejectedUser;
