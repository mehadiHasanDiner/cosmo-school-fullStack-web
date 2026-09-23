import { Outlet } from "react-router";

import useDbUser from "../hooks/useDbUser";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DashboardContent from "./DashboardContent";
import { useState } from "react";

const DashboardLayout = () => {
  const { dbUser, isDbUserLoading } = useDbUser();
  const availableRoles = dbUser?.roles || [];

  // প্রথম available role default হিসেবে নিচ্ছি
  const [activeRole, setActiveRole] = useState(availableRoles[0]);

  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }

  if (!dbUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
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
          </label>
          <div className="px-4">Cosmo Dashboard</div>
          <p className="font-bold">Email: {dbUser?.email}</p>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet
            context={{ availableRoles, activeRole, setActiveRole }}
          ></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <DashboardContent dbUser={dbUser} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
