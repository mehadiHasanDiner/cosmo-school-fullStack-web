import { Link } from "react-router";
import { FiHome, FiUser } from "react-icons/fi";
import { getDashboardMenus } from "../config/dashboardMenu";
import SidebarMenuItem from "./SidebarMenuItem";

const DashboardMenuContent = ({
  dbUser,
  availableRoles,
  activeRole,
  setActiveRole,
  isDrawerOpen,
}) => {
  const menus = getDashboardMenus(activeRole);
  console.log(menus);

  const roleName = activeRole
    ? activeRole.charAt(0).toUpperCase() + activeRole.slice(1).toLowerCase()
    : "User";
  return (
    <div className="w-full">
      {/* Current Role */}

      <li className="mb-3">
        <span
          className={`
            flex items-center gap-3
            rounded-xl

            ${!isDrawerOpen ? "tooltip tooltip-right" : ""}
          `}
          data-tip={`${roleName} Dashboard`}
        >
          <FiUser className="shrink-0 text-primary" size={20} />

          {isDrawerOpen && (
            <span className="whitespace-nowrap font-bold capitalize text-primary">
              {activeRole} Dashboard
            </span>
          )}
        </span>
      </li>
      <li>
        <Link
          to="/dashboard"
          className={`
            flex items-center gap-3
            ${!isDrawerOpen ? "tooltip tooltip-right" : ""}
          `}
          data-tip="Homepage"
        >
          {/* Home icon */}
          <FiHome size={18} />
          {isDrawerOpen && <span className="whitespace-nowrap">Homepage</span>}
        </Link>
      </li>

      {/* our dashboard links */}
      {menus.map((menu) => (
        <SidebarMenuItem
          key={menu.title}
          menu={menu}
          isDrawerOpen={isDrawerOpen}
        />
      ))}
    </div>
  );
};

export default DashboardMenuContent;
