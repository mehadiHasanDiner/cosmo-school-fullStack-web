import { useRef, useState } from "react";
import { Link, Outlet } from "react-router";
import DashboardMenuContent from "./DashboardMenuContent";
import logoImg from "./../assets/logo.png";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
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
