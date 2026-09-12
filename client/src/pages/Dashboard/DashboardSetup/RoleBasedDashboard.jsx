import { useState } from "react";
import GuardianDashboardHome from "../DashboardHome/GuardianDashboardHome";
import TeacherDashboardHome from "../DashboardHome/TeacherDashboardHome";
import { FiRefreshCw } from "react-icons/fi";
import AdminDashboard from "../DashboardHome/AdminDashboard";

const RoleBasedDashboard = ({ user }) => {
  const availableRoles = user?.roles || [];
  console.log(availableRoles);

  // প্রথম available role default হিসেবে নিচ্ছি
  const [activeRole, setActiveRole] = useState(availableRoles[0] || null);

  return (
    <div>
      {/* ================================
          Role Switcher
      ================================= */}
      <div className="border-b border-base-300 bg-base-100 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {availableRoles.length > 1 && (
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                Dual Account
              </p>
            )}
            <h2 className="text-xl font-black text-neutral capitalize">
              {" "}
              {availableRoles.join(" & ")}{" "}
            </h2>
          </div>

          <div>
            {availableRoles.length > 1 && (
              <div className="inline-flex rounded-2xl border border-primary/15 bg-base-200 p-1.5">
                {availableRoles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={`
                flex items-center gap-2 rounded-xl px-4 py-2.5
                text-sm font-bold transition-all duration-300
                ${
                  activeRole === role
                    ? "bg-neutral text-white shadow-[0_8px_20px_rgba(31,41,35,0.20)]"
                    : "text-base-content/60 hover:bg-white"
                }
              `}
                  >
                    <span className="capitalize">{role}</span>
                  </button>
                ))}
              </div>
            )}
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

      {/* ================================
          Active Dashboard
      ================================= */}

      {activeRole === "guardian" && (
        <GuardianDashboardHome user={user} embedded />
      )}

      {activeRole === "teacher" && (
        <TeacherDashboardHome user={user} embedded />
      )}

      {/* Admin Dashboard এটা এখন কাজ করছে না। TO DO: Fix Admin Dashboard later */}
      {activeRole === "admin" && <AdminDashboard user={user} embedded />}
    </div>
  );
};

export default RoleBasedDashboard;
