import { FiMapPin, FiCalendar, FiBriefcase } from "react-icons/fi";
import logoImg from "../../assets/logo.png";

const EmployeeIdCard = ({ employee }) => {
  const {
    employeeName,
    employeePhotoURL,
    employeeRole,
    employeeCampus,
    employeeSection,
    employeeJoiningDate,
    employeeId,
  } = employee;

  const joiningDate = employeeJoiningDate
    ? new Date(employeeJoiningDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <article
      className="
        mx-auto w-full max-w-sm
        overflow-hidden rounded-2xl
        border border-gray-200 bg-white
        shadow-lg transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-[#176534] to-[#278C45] px-5 py-5 text-center text-white">
        <div className="flex items-center justify-center gap-3">
          <img
            src={logoImg}
            alt="Cosmo School"
            className="h-12 w-12 rounded-full bg-white object-contain p-1"
          />

          <div className="text-left">
            <h2 className="text-xl font-black uppercase">Cosmo School</h2>

            <p className="text-xs text-white/80">Employee Identity Card</p>
          </div>
        </div>
      </div>

      {/* Employee Profile */}
      <div className="px-6 py-6 text-center">
        <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#F4C518] bg-gray-100">
          <img
            src={employeePhotoURL || "/default-avatar.png"}
            alt={employeeName}
            className="h-full w-full object-cover"
          />
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-[#20252B]">
          {employeeName}
        </h3>

        <span className="mt-2 inline-block rounded-full bg-[#E6F5EB] px-4 py-1 text-xs font-bold uppercase text-[#176534]">
          {employeeRole?.replaceAll("_", " ") || "Employee"}
        </span>

        {/* Employee Information */}
        <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-left text-sm">
          <div className="flex items-center gap-3">
            <FiBriefcase className="shrink-0 text-primary" />
            <span className="text-gray-500">Employee ID:</span>
            <span className="ml-auto font-semibold text-gray-800">
              {employeeId || "Not assigned"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FiMapPin className="shrink-0 text-primary" />
            <span className="text-gray-500">Campus:</span>
            <span className="ml-auto font-semibold text-gray-800">
              {employeeCampus || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FiBriefcase className="shrink-0 text-primary" />
            <span className="text-gray-500">Section:</span>
            <span className="ml-auto text-right font-semibold text-gray-800">
              {employeeSection || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FiCalendar className="shrink-0 text-primary" />
            <span className="text-gray-500">Joined:</span>
            <span className="ml-auto font-semibold text-gray-800">
              {joiningDate}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-[#F4C518] px-4 py-3 text-center">
        <p className="text-xs font-bold text-[#20252B]">www.cosmoschools.org</p>
      </div>
    </article>
  );
};

export default EmployeeIdCard;
