import {
  FiBookOpen,
  FiUsers,
  FiCalendar,
  FiBell,
  FiClock,
} from "react-icons/fi";
import QuickCard from "../../../components/dashboard/QuickCard";
import DashboardStat from "../../../components/dashboard/DashboardStat";

const TeacherDashboardHome = ({ user }) => {
  /*
    পরে backend থেকে teacher-এর assigned class/subject আনবেন।
  */
  const todayClasses = [
    {
      subject: "English",
      className: "Class Five",
      section: "A",
      time: "09:00 AM",
    },
    {
      subject: "English",
      className: "Class Six",
      section: "B",
      time: "11:00 AM",
    },
  ];

  return (
    <section className="min-h-screen bg-base-200/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-neutral via-[#24342b] to-primary p-7 text-white shadow-[0_20px_60px_rgba(31,41,35,0.22)]">
          <div className="absolute -right-20 top-0 size-56 rounded-full bg-secondary/15 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">
              Teacher Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Welcome, {user?.name || "Teacher"} 👋
            </h1>

            <p className="mt-3 max-w-2xl text-white/75">
              Manage your classes, students, assignments and academic activities
              from one place.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat
            icon={FiCalendar}
            value="4"
            label="Classes Today"
            color="green"
          />

          <DashboardStat
            icon={FiUsers}
            value="86"
            label="Assigned Students"
            color="blue"
          />

          <DashboardStat
            icon={FiBookOpen}
            value="3"
            label="Assignments"
            color="yellow"
          />

          <DashboardStat
            icon={FiBell}
            value="5"
            label="New Notices"
            color="red"
          />
        </div>

        {/* Today's classes */}
        <div className="mt-8 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
          <div>
            <h2 className="text-2xl font-black text-neutral">
              Today's Classes
            </h2>

            <p className="mt-1 text-sm text-base-content/55">
              Your scheduled classes for today.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {todayClasses.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-primary/3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-xl bg-primary text-white">
                    <FiBookOpen />
                  </div>

                  <div>
                    <h3 className="font-black text-neutral">{item.subject}</h3>

                    <p className="text-sm text-base-content/55">
                      {item.className} • Section {item.section}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold text-primary">
                  <FiClock />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <QuickCard
            icon={FiUsers}
            title="Student List"
            description="View students from your assigned classes."
          />

          <QuickCard
            icon={FiCalendar}
            title="Class Routine"
            description="Check your teaching schedule."
          />

          <QuickCard
            icon={FiBookOpen}
            title="Assignments"
            description="Create and manage student assignments."
          />

          <QuickCard
            icon={FiBell}
            title="Notices"
            description="View latest school notices."
          />
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboardHome;
