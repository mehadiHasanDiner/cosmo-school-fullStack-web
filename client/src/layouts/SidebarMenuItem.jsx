import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router";

const SidebarMenuItem = ({ menu, isDrawerOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const Icon = menu.icon;

  // যদি menu-এর children থাকে,
  // তাহলে এটি dropdown/submenu
  if (menu.children) {
    return (
      <div className="w-full">
        <button
          type="button"
          // Sidebar collapsed থাকলে submenu খুলব না।
          // Expanded থাকলেই dropdown কাজ করবে।
          onClick={() => {
            if (!isDrawerOpen) return;
            setMenuOpen((prev) => !prev);
          }}
          data-tip={menu.title}
          className={`
            flex w-full
            items-center
            rounded-xl
            px-3 py-3

            font-medium
            transition-all
            duration-200

            hover:bg-primary/10
            hover:text-primary

            ${
              !isDrawerOpen
                ? "tooltip tooltip-right justify-center"
                : "justify-between"
            }
          `}
        >
          {/* =========================================
              LEFT SIDE
              Icon + Menu Name
          ========================================= */}

          <span
            className={`
              flex items-center
              ${isDrawerOpen ? "gap-3" : "justify-center"}
            `}
          >
            {Icon && <Icon className="shrink-0 text-lg" />}

            {/* Menu Name */}

            {isDrawerOpen && (
              <span
                className={`
                  whitespace-nowrap
                  overflow-hidden
                  transition-all
                  duration-300

                  ${isDrawerOpen ? "max-w-40 opacity-100" : "max-w-0 opacity-0"}
                `}
              >
                {menu.title}
              </span>
            )}
          </span>

          {isDrawerOpen && (
            <FiChevronDown
              className={`transition-all duration-300
                ${isDrawerOpen ? "visible opacity-100" : "invisible w-0 opacity-0"}
                ${menuOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          )}
        </button>

        {/* Submenu */}

        {/* ==========================================
            SUBMENU

            Sidebar open + menu open
            দুটো true হলেই submenu দেখাবে
        ========================================== */}

        {isDrawerOpen && menuOpen && (
          <div
            className="
              ml-6 mt-1
              space-y-1
              border-l
              border-primary/20
              pl-3
            "
          >
            {menu.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `
                    block
                    whitespace-nowrap
                    rounded-lg
                    px-4 py-2

                    text-sm
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-base-content/70 hover:bg-primary/10 hover:text-primary"
                    }
                  `
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  // =====================================================
  // Children না থাকলে normal menu link
  // =====================================================

  return (
    <NavLink
      to={menu.path}
      end={menu.path === "/dashboard"}
      data-tip={menu.title}
      className={({ isActive }) =>
        `
          flex items-center
          rounded-xl
          px-3 py-3

          font-medium

          transition-all
          duration-200

          ${!isDrawerOpen ? "tooltip tooltip-right justify-center" : "gap-3"}

          ${
            isActive
              ? "bg-primary text-white shadow-sm"
              : "text-base-content/70 hover:bg-primary/10 hover:text-primary"
          }
        `
      }
    >
      {Icon && <Icon className="shrink-0 text-lg" />}
      {/* Name only when sidebar open */}

      {isDrawerOpen && <span className="whitespace-nowrap">{menu.title}</span>}
    </NavLink>
  );
};

export default SidebarMenuItem;
