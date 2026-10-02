import { useState } from "react";
import { Link, Outlet } from "react-router";
import DashboardMenuContent from "./DashboardMenuContent";
import logoImg from "./../assets/logo.png";
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";

const DashboardLayoutContent = ({ dbUser }) => {
  const availableRoles = dbUser?.roles || [];

  const [activeRole, setActiveRole] = useState(availableRoles[0]);

  // Sidebar বর্তমানে open/expanded কি না
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Button click করে permanently open করা হয়েছে কি না
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);

  // =====================================================
  // Menu button click
  // =====================================================
  const toggleDrawer = () => {
    const nextState = !isPinnedOpen;

    setIsPinnedOpen(nextState);
    setIsDrawerOpen(nextState);
  };

  // =====================================================
  // Sidebar hover করলে temporary open
  // =====================================================
  const handleMouseEnter = () => {
    if (!isPinnedOpen) {
      setIsDrawerOpen(true);
    }
  };

  // =====================================================
  // Mouse বের হলে temporary sidebar close
  // কিন্তু pinned হলে open থাকবে
  // =====================================================
  const handleMouseLeave = () => {
    if (!isPinnedOpen) {
      setIsDrawerOpen(false);
    }
  };

  const roleName = activeRole
    ? activeRole.charAt(0).toUpperCase() + activeRole.slice(1).toLowerCase()
    : "User";

  return (
    <div className="min-h-screen bg-base-100 body-font">
      {/* =================================================
          TOP NAVBAR
      ================================================= */}
      <nav
        className="
          fixed left-0 right-0 top-0 z-40
          flex h-15 items-center
          border-b border-base-300
          bg-base-300
        "
      >
        {/* ===============================================
            MENU BUTTON
            Sidebar-এর প্রথম 56px জায়গায় থাকবে
        =============================================== */}
        <button
          type="button"
          onClick={toggleDrawer}
          aria-label={isPinnedOpen ? "Close sidebar" : "Open sidebar"}
          className="
            flex h-15 w-14 shrink-0
            items-center justify-center
            text-neutral
            transition-all duration-300
            hover:bg-primary/10
            hover:text-primary
          "
        >
          {isPinnedOpen ? (
            <RiMenuUnfold4Fill size={21} />
          ) : (
            <RiMenuFold4Fill size={21} />
          )}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="h-9 w-auto" src={logoImg} alt="Cosmo School" />
        </Link>
      </nav>

      {/* =================================================
          SIDEBAR
      ================================================= */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          fixed bottom-0 left-0 top-15 z-50

          overflow-x-hidden
          overflow-y-auto

          border-r border-base-300
          bg-base-200

          transition-[width]
          duration-300
          ease-in-out

          ${isDrawerOpen ? "w-64" : "w-14"}
        `}
      >
        <ul className="menu w-full p-2">
          <DashboardMenuContent
            activeRole={activeRole}
            isDrawerOpen={isDrawerOpen}
          />
        </ul>
      </aside>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}
      <main
        className={`
          min-h-screen
          pt-15

          transition-[margin]
          duration-300
          ease-in-out

          ${isPinnedOpen ? "ml-64" : "ml-14"}
        `}
      >
        <div className="p-4">
          <Outlet
            context={{
              dbUser,
              availableRoles,
              activeRole,
              setActiveRole,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayoutContent;
