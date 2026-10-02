import { FiUser } from "react-icons/fi";
import { getDashboardMenus } from "../config/dashboardMenu";
import SidebarMenuItem from "./SidebarMenuItem";

const DashboardMenuContent = ({ activeRole, isDrawerOpen }) => {
  const menus = getDashboardMenus(activeRole);

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
