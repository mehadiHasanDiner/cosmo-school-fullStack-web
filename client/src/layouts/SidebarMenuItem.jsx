import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router";

const SidebarMenuItem = ({ menu }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const Icon = menu.icon;

  // যদি menu-এর children থাকে,
  // তাহলে এটি dropdown/submenu
  if (menu.children) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          data-tip={menu.title}
          className="
            flex w-full items-center justify-between
            rounded-xl px-4 py-3
            text-left font-medium
            transition
            hover:bg-primary/10
            hover:text-primary
            is-drawer-close:tooltip is-drawer-close:tooltip-right
          "
        >
          <span className="flex items-center gap-3 ">
            {Icon && <Icon className="text-lg" />}
            <span className=" is-drawer-close:hidden">{menu.title}</span>
          </span>

          <FiChevronDown
            className={`
              transition-transform duration-300
              ${menuOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* Submenu */}

        {menuOpen && (
          <div className="ml-6 mt-1 space-y-1 border-l border-primary/20 pl-3">
            {menu.children.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `
                    block rounded-lg
                    px-4 py-2
                    text-sm
                    transition

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
          flex items-center gap-3
          rounded-xl px-4 py-3
          font-medium
          transition
          is-drawer-close:tooltip is-drawer-close:tooltip-right

          ${
            isActive
              ? "bg-primary text-white shadow-sm"
              : "text-base-content/70 hover:bg-primary/10 hover:text-primary"
          }
        `
      }
    >
      {Icon && <Icon className="text-lg" />}
      <span className="is-drawer-close:hidden">{menu.title}</span>
    </NavLink>
  );
};

export default SidebarMenuItem;
