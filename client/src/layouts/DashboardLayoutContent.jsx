import { useRef, useState } from "react";
import { Link, Outlet } from "react-router";
import DashboardMenuContent from "./DashboardMenuContent";
import logoImg from "./../assets/logo.png";
import { RiMenuFold4Fill } from "react-icons/ri";

const DashboardLayoutContent = ({ dbUser }) => {
  // Loading শেষ হওয়ার পর এই component render হবে
  // তাই dbUser.roles এখানে already পাওয়া যাবে

  // DaisyUI drawer checkbox-কে reference করছি
  const drawerRef = useRef(null);
  const availableRoles = dbUser?.roles || [];

  // User-এর প্রথম role default role
  const [activeRole, setActiveRole] = useState(availableRoles[0]);

  // Button Click → Open / Close
  const toggleDrawer = () => {
    if (!drawerRef.current) return;
    drawerRef.current.checked = !drawerRef.current.checked;
  };

  // Mouse sidebar-এর উপর গেলে Open
  const handleMouseEnter = () => {
    if (!drawerRef.current) return;

    drawerRef.current.checked = true;
  };

  // Mouse sidebar থেকে চলে গেলে → Close
  const handleMouseLeave = () => {
    if (!drawerRef.current) return;

    drawerRef.current.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open">
      <input ref={drawerRef} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className=" navbar w-full bg-base-300">
          <button
            type="button"
            onClick={toggleDrawer}
            aria-label="Toggle sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <RiMenuFold4Fill size={20} />
          </button>
          <div className="">
            <span>
              <Link to="/">
                <img className="w-1/2" src={logoImg} alt="" />
              </Link>
            </span>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet
            context={{ dbUser, availableRoles, activeRole, setActiveRole }}
          ></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <div
          className="drawer-overlay"
          onClick={() => {
            if (drawerRef.current) {
              drawerRef.current.checked = false;
            }
          }}
        ></div>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="mt-15 flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64"
        >
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <DashboardMenuContent
              dbUser={dbUser}
              availableRoles={availableRoles}
              activeRole={activeRole}
              setActiveRole={setActiveRole}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayoutContent;
