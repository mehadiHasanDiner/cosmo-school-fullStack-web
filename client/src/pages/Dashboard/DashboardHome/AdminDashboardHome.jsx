import { Link } from "react-router";
import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiClock,
  FiBell,
  FiFileText,
  FiCalendar,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

import ManagementCard from "../../../components/dashboard/ManagementCard";
import DashboardStatCard from "../../../components/dashboard/DashboardStatCard";
import QuickLink from "../../../components/dashboard/QuickLink";

const AdminDashboardHome = ({ user, stats }) => {
  return (
    <section className="min-h-screen bg-base-200/40 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* =====================================================
            ADMIN WELCOME SECTION
        ====================================================== */}

        <div
          className="
            relative overflow-hidden rounded-3xl
            border border-primary/15
            bg-linear-to-br
            from-primary/10
            via-base-100
            to-secondary/12
            p-6
            shadow-[0_20px_60px_rgba(39,140,69,0.11)]
            sm:p-8
          "
        >
          {/* Decorative background */}
          <div
            className="
              pointer-events-none absolute
              -right-20 -top-24 size-64
              rounded-full bg-secondary/20 blur-3xl
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-24 left-20 size-56
              rounded-full bg-primary/10 blur-3xl
            "
          />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-primary/20
                  bg-primary/10 px-4 py-2
                  text-xs font-black uppercase
                  tracking-[0.15em] text-primary
                "
              >
                <FiShield />
                Administrator
              </div>

              <h1 className="mt-4 text-3xl font-black text-neutral sm:text-4xl">
                Welcome, {user?.name || "Admin"} 👋
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-base-content/60">
                Manage Cosmo School users, verification requests, students and
                school activities from your admin dashboard.
              </p>
            </div>

            <div
              className="
                rounded-2xl border border-primary/15
                bg-base-100/80 px-5 py-4
                shadow-sm backdrop-blur
              "
            >
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/40">
                Account
              </p>

              <p className="mt-1 flex items-center gap-2 font-black text-primary">
                <FiShield />
                Super Admin
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            icon={FiBookOpen}
            title="Students"
            value={stats?.students ?? 0}
            description="Active students"
            color="green"
          />

          <DashboardStatCard
            icon={FiUsers}
            title="Guardians"
            value={stats?.guardians ?? 0}
            description="Verified guardians"
            color="blue"
          />

          <DashboardStatCard
            icon={FiUserCheck}
            title="Teachers"
            value={stats?.teachers ?? 0}
            description="Verified teachers"
            color="yellow"
          />

          <DashboardStatCard
            icon={FiClock}
            title="Pending"
            value={stats?.pendingVerifications ?? 0}
            description="Awaiting verification"
            color="red"
          />
        </div>

        {/* =====================================================
            MAIN SECTION
        ====================================================== */}

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Pending Verification */}
          <div
            className="
              rounded-3xl border border-primary/15
              bg-base-100 p-6
              shadow-[0_15px_45px_rgba(0,0,0,0.06)]
            "
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  User Management
                </p>

                <h2 className="mt-1 text-2xl font-black text-neutral">
                  Pending Verifications
                </h2>

                <p className="mt-1 text-sm text-base-content/50">
                  Review Guardian and Teacher account requests.
                </p>
              </div>

              <Link
                to="/dashboard/admin/verifications"
                className="
                  btn btn-sm rounded-xl
                  border-primary/20 bg-primary/10
                  text-primary
                  hover:bg-primary hover:text-white
                "
              >
                View All
                <FiArrowRight />
              </Link>
            </div>

            {/* Empty / Placeholder */}
            <div
              className="
                mt-6 rounded-2xl
                border border-dashed border-primary/25
                bg-primary/3
                p-8 text-center
              "
            >
              <div
                className="
                  mx-auto grid size-16
                  place-items-center rounded-2xl
                  bg-primary/10 text-2xl text-primary
                "
              >
                <FiUserCheck />
              </div>

              <h3 className="mt-4 font-black text-neutral">
                Verification Requests
              </h3>

              <p className="mt-2 text-sm text-base-content/55">
                Recent Guardian and Teacher verification requests will appear
                here.
              </p>

              {stats?.pendingVerifications > 0 && (
                <Link
                  to="/dashboard/admin/verifications"
                  className="
                    btn btn-primary btn-sm
                    mt-5 rounded-xl text-white
                  "
                >
                  Review Requests
                  <FiArrowRight />
                </Link>
              )}
            </div>
          </div>

          {/* =====================================================
              QUICK ACTIONS
          ====================================================== */}

          <div
            className="
              rounded-3xl border border-base-300
              bg-base-100 p-6
              shadow-[0_15px_45px_rgba(0,0,0,0.05)]
            "
          >
            <h2 className="text-xl font-black text-neutral">Quick Actions</h2>

            <p className="mt-1 text-sm text-base-content/50">
              Manage important school activities.
            </p>

            <div className="mt-5 space-y-3">
              <QuickLink
                icon={FiUserCheck}
                title="Verify Users"
                path="/dashboard/admin/verifications"
              />

              <QuickLink
                icon={FiBookOpen}
                title="Manage Students"
                path="/dashboard/admin/students"
              />

              <QuickLink
                icon={FiBell}
                title="Manage Notices"
                path="/dashboard/admin/notices"
              />

              <QuickLink
                icon={FiFileText}
                title="Manage Forms"
                path="/dashboard/admin/forms"
              />

              <QuickLink
                icon={FiCalendar}
                title="Class Routine"
                path="/dashboard/admin/routines"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            MANAGEMENT CARDS
        ====================================================== */}

        <div>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Administration
            </p>

            <h2 className="mt-1 text-2xl font-black text-neutral">
              School Management
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ManagementCard
              icon={FiUsers}
              title="User Management"
              description="Manage Guardians, Teachers and other website users."
              path="/dashboard/admin/users"
            />

            <ManagementCard
              icon={FiBookOpen}
              title="Student Management"
              description="Manage student information and Guardian relationships."
              path="/dashboard/admin/students"
            />

            <ManagementCard
              icon={FiBell}
              title="Notice Management"
              description="Create, publish and manage school notices."
              path="/dashboard/admin/notices"
            />

            <ManagementCard
              icon={FiFileText}
              title="Form Management"
              description="Manage online forms and submitted applications."
              path="/dashboard/admin/forms"
            />

            <ManagementCard
              icon={FiCalendar}
              title="Routine Management"
              description="Create and manage class routines."
              path="/dashboard/admin/routines"
            />

            <ManagementCard
              icon={FiUserCheck}
              title="Verification"
              description="Review and approve Guardian and Teacher profiles."
              path="/dashboard/admin/verifications"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// Reusable Management Card
// =====================================================

export default AdminDashboardHome;
