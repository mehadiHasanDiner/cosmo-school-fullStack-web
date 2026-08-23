import {
  FiUsers,
  FiBookOpen,
  FiBell,
  FiCalendar,
  FiArrowRight,
  FiUser,
} from "react-icons/fi";
import QuickCard from "../../../components/dashboard/QuickCard";
import InfoBox from "../../../components/dashboard/InfoBox";
import DashboardStat from "../../../components/dashboard/DashboardStat";

const GuardianDashboardHome = ({ user }) => {
  /*
    পরে backend থেকে linked children data আনবেন।
    আপাতত demo data রাখা হলো।
  */
  const children = [
    {
      id: 1,
      name: "Rahim Hasan",
      studentId: "CS-2026-00125",
      className: "Class Five",
      section: "A",
      roll: 12,
    },
  ];

  return (
    <section className="min-h-screen bg-base-200/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-linear-to-br from-primary via-[#2d9e52] to-[#1d753c] p-6 text-white shadow-[0_20px_60px_rgba(39,140,69,0.22)] sm:p-8">
          <div className="absolute -right-16 -top-16 size-48 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">
              Guardian Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Welcome back, {user?.name || "Guardian"} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-white/80">
              Stay connected with your child's academic information, school
              notices and important updates.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat
            icon={FiUsers}
            value={children.length}
            label="Linked Children"
            color="green"
          />

          <DashboardStat
            icon={FiBell}
            value="4"
            label="New Notices"
            color="yellow"
          />

          <DashboardStat
            icon={FiCalendar}
            value="5"
            label="Classes Today"
            color="blue"
          />

          <DashboardStat
            icon={FiBookOpen}
            value="2"
            label="Assignments"
            color="red"
          />
        </div>

        {/* Children */}
        <div className="mt-8 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-neutral">My Children</h2>

              <p className="mt-1 text-sm text-base-content/55">
                Students linked with your guardian account.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {children.map((child) => (
              <div
                key={child.id}
                className="group rounded-2xl border border-primary/15 bg-primary/3 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(39,140,69,0.12)]"
              >
                <div className="flex items-center gap-4">
                  <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary">
                    <FiUser />
                  </div>

                  <div>
                    <h3 className="font-black text-neutral">{child.name}</h3>

                    <p className="text-sm text-base-content/50">
                      {child.studentId}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
                  <InfoBox label="Class" value={child.className} />
                  <InfoBox label="Section" value={child.section} />
                  <InfoBox label="Roll" value={child.roll} />
                </div>

                <button className="btn btn-ghost mt-5 w-full justify-between text-primary hover:bg-primary/10">
                  View Student
                  <FiArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick access */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <QuickCard
            icon={FiCalendar}
            title="Class Routine"
            description="View your child's daily class schedule."
          />

          <QuickCard
            icon={FiBell}
            title="Notices"
            description="Check important school announcements."
          />

          <QuickCard
            icon={FiBookOpen}
            title="Assignments"
            description="View homework and assignments."
          />

          <QuickCard
            icon={FiUsers}
            title="Attendance"
            description="Track student attendance records."
          />
        </div>
      </div>
    </section>
  );
};

export default GuardianDashboardHome;
