import { Link } from "react-router";
import { FiHome, FiUser } from "react-icons/fi";
import { getDashboardMenus } from "../config/dashboardMenu";
import SidebarMenuItem from "./SidebarMenuItem";

const DashboardMenuContent = ({
  dbUser,
  availableRoles,
  activeRole,
  setActiveRole,
}) => {
  const menus = getDashboardMenus(activeRole);
  console.log(menus);
  return (
    <div>
      {/* Current Role */}

      <li className="mb-3">
        <span
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:cursor-auto hover:bg-none"
          data-tip={`${activeRole.charAt(0).toUpperCase() + activeRole.slice(1).toLowerCase()} Dashboard`}
        >
          <FiUser color="green" size={20} />

          <span className="is-drawer-close:hidden text-primary capitalize font-bold">
            {activeRole} Dashboard
          </span>
        </span>
      </li>
      <li>
        <Link
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Homepage"
        >
          {/* Home icon */}
          <FiHome size={18} />
          <span className="is-drawer-close:hidden">Homepage</span>
        </Link>
      </li>

      {/* our dashboard links */}
      {menus.map((menu) => (
        <SidebarMenuItem key={menu.title} menu={menu} />
      ))}
    </div>
  );
};

export default DashboardMenuContent;
