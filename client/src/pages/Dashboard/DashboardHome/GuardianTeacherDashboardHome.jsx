import { useState } from "react";
import { FiUsers, FiUser, FiRefreshCw } from "react-icons/fi";

import GuardianDashboardHome from "./GuardianDashboardHome";
import TeacherDashboardHome from "./TeacherDashboardHome";

const GuardianTeacherDashboardHome = ({ user }) => {
  /*
    একই user Guardian এবং Teacher।
    তাই user কোন role-এর dashboard দেখবে
    সেটা এই state দিয়ে control করছি।
  */
  const [activeRole, setActiveRole] = useState("guardian");

  return (
    <section className="min-h-screen bg-base-200/40">
      {/* Role switcher */}
      <div className="border-b border-base-300 bg-base-100 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
              Dual Account
            </p>

            <h2 className="text-xl font-black text-neutral">
              Guardian & Teacher
            </h2>
          </div>

          <div className="inline-flex rounded-2xl border border-primary/15 bg-base-200 p-1.5">
            <button
              type="button"
              onClick={() => setActiveRole("guardian")}
              className={`
                flex items-center gap-2 rounded-xl px-4 py-2.5
                text-sm font-bold transition-all duration-300
                ${
                  activeRole === "guardian"
                    ? "bg-primary text-white shadow-[0_8px_20px_rgba(39,140,69,0.22)]"
                    : "text-base-content/60 hover:bg-white"
                }
              `}
            >
              <FiUsers />
              Guardian
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("teacher")}
              className={`
                flex items-center gap-2 rounded-xl px-4 py-2.5
                text-sm font-bold transition-all duration-300
                ${
                  activeRole === "teacher"
                    ? "bg-neutral text-white shadow-[0_8px_20px_rgba(31,41,35,0.20)]"
                    : "text-base-content/60 hover:bg-white"
                }
              `}
            >
              <FiUser />
              Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Current role information */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-2xl border border-secondary/25 bg-secondary/10 px-4 py-3 text-sm">
          <FiRefreshCw className="text-secondary-content" />

          <span className="font-semibold text-base-content/70">
            You are currently viewing your{" "}
            <strong className="capitalize text-neutral">{activeRole}</strong>{" "}
            dashboard.
          </span>
        </div>
      </div>

      {/* Dashboard switch */}
      {activeRole === "guardian" && <GuardianDashboardHome user={user} />}

      {activeRole === "teacher" && <TeacherDashboardHome user={user} />}
    </section>
  );
};

export default GuardianTeacherDashboardHome;
