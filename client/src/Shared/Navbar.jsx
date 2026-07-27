import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Academics",
    path: "/academics",
    children: [
      {
        name: "Curriculum",
        path: "/academics/curriculum",
      },
      {
        name: "Achievement",
        path: "/academics/achievement",
      },
    ],
  },
  {
    name: "Teachers",
    path: "/teachers",
  },
  {
    name: "Notice",
    path: "/notices",
  },
  {
    name: "Gallery",
    path: "/gallery",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  const location = useLocation();

  // Navbar shrink on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu after route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  }, [location.pathname]);

  // Prevent body scrolling while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isParentActive = (link) => {
    if (link.path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === link.path ||
      location.pathname.startsWith(`${link.path}/`)
    );
  };

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full
          border-b transition-all duration-500
          ${
            isScrolled
              ? "border-primary/15 bg-white/90 shadow-[0_12px_40px_rgba(24,101,52,0.12)] backdrop-blur-xl"
              : "border-transparent bg-white/95"
          }
        `}
      >
        {/* Colourful top brand line */}
        <div
          className={`
            bg-gradient-to-r from-primary via-secondary to-accent
            transition-all duration-500
            ${isScrolled ? "h-0.5" : "h-1"}
          `}
        />

        <nav
          className={`
            mx-auto flex items-center justify-between
            px-4 transition-all duration-500
            sm:px-6 lg:px-8
            ${isScrolled ? "h-16" : "h-20 lg:h-24"}
          `}
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="Cosmo School home"
            className="group relative z-10 flex shrink-0 items-center"
          >
            <div
              className={`
                relative overflow-hidden 
                border border-white/10
                transition-all duration-500
                group-hover:-translate-y-0.5
                
                ${isScrolled ? "px-3 py-2" : "px-4 py-2.5"}
              `}
            >
              {/* bg-neutral shadow-[0_10px_25px_rgba(31,37,43,0.18)]  group-hover:shadow-[0_15px_35px_rgba(39,140,69,0.22)]  rounded-2xl*/}

              {/* Logo shine animation */}
              <span
                aria-hidden="true"
                className="
                  absolute inset-y-0 -left-16 w-12
                  -skew-x-12 bg-green-600/40 blur-sm
                  transition-all duration-700
                  group-hover:left-[115%]
                "
              />
              <img
                src="/logo.png"
                alt="Cosmo School"
                className={`
                  relative z-10 w-auto object-contain
                  transition-all duration-500
                  ${isScrolled ? "h-8" : "h-9 lg:h-10"}
                `}
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const hasChildren = link.children?.length > 0;
              const parentActive = isParentActive(link);

              // Normal navigation item
              if (!hasChildren) {
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) => `
            group relative flex min-h-11 items-center
            overflow-hidden rounded-xl px-3.5
            text-sm font-bold tracking-[0.01em]
            transition-all duration-300
            xl:px-4
            ${
              isActive
                ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(39,140,69,0.15)]"
                : "text-neutral/75 hover:-translate-y-0.5 hover:bg-base-200 hover:text-primary"
            }
          `}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Hover background */}
                        <span
                          aria-hidden="true"
                          className="
                  absolute inset-0 origin-bottom scale-y-0
                  bg-gradient-to-t from-primary/10 to-transparent
                  transition-transform duration-300
                  group-hover:scale-y-100
                "
                        />

                        <span className="relative z-10">{link.name}</span>

                        {/* Active underline */}
                        <span
                          aria-hidden="true"
                          className={`
                  absolute inset-x-3 bottom-1 h-0.5
                  origin-left rounded-full
                  bg-gradient-to-r
                  from-primary via-secondary to-accent
                  transition-all duration-300
                  ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70"
                  }
                `}
                        />

                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="
                    absolute right-2 top-2
                    size-1.5 rounded-full bg-primary
                    shadow-[0_0_0_4px_rgba(39,140,69,0.12)]
                  "
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              }

              // Navigation item with dropdown
              return (
                <div key={link.path} className="group/dropdown relative">
                  {/* Parent link */}
                  <NavLink
                    to={link.path}
                    className={`
            group relative flex min-h-11 items-center
            gap-1.5 overflow-hidden rounded-xl px-3.5
            text-sm font-bold tracking-[0.01em]
            transition-all duration-300
            xl:px-4
            ${
              parentActive
                ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(39,140,69,0.15)]"
                : "text-neutral/75 hover:-translate-y-0.5 hover:bg-base-200 hover:text-primary"
            }
          `}
                  >
                    {/* Hover background */}
                    <span
                      aria-hidden="true"
                      className="
              absolute inset-0 origin-bottom scale-y-0
              bg-gradient-to-t from-primary/10 to-transparent
              transition-transform duration-300
              group-hover:scale-y-100
            "
                    />

                    <span className="relative z-10">{link.name}</span>

                    <ChevronDown
                      className="
              relative z-10 size-4
              transition-transform duration-300
              group-hover/dropdown:rotate-180
            "
                    />

                    {/* Active underline */}
                    <span
                      aria-hidden="true"
                      className={`
              absolute inset-x-3 bottom-1 h-0.5
              origin-left rounded-full
              bg-gradient-to-r
              from-primary via-secondary to-accent
              transition-all duration-300
              ${
                parentActive
                  ? "scale-x-100 opacity-100"
                  : "scale-x-0 opacity-0 group-hover/dropdown:scale-x-100 group-hover/dropdown:opacity-70"
              }
            `}
                    />

                    {parentActive && (
                      <span
                        aria-hidden="true"
                        className="
                absolute right-2 top-2
                size-1.5 rounded-full bg-primary
                shadow-[0_0_0_4px_rgba(39,140,69,0.12)]
              "
                      />
                    )}
                  </NavLink>

                  {/* Invisible hover bridge */}
                  <div className="absolute left-0 top-full h-3 w-full" />

                  {/* Dropdown */}
                  <div
                    className="
            invisible absolute left-1/2 top-[calc(100%+10px)]
            z-50 w-64 -translate-x-1/2
            translate-y-3 scale-95 opacity-0
            transition-all duration-300
            group-hover/dropdown:visible
            group-hover/dropdown:translate-y-0
            group-hover/dropdown:scale-100
            group-hover/dropdown:opacity-100
          "
                  >
                    {/* Dropdown arrow */}
                    <span
                      className="
              absolute -top-2 left-1/2 size-4
              -translate-x-1/2 rotate-45
              border-l border-t border-primary/15
              bg-white
            "
                    />

                    <div
                      className="
              relative overflow-hidden rounded-2xl
              border border-primary/15 bg-white/95
              p-2 shadow-[0_20px_50px_rgba(31,41,35,0.18)]
              backdrop-blur-xl
            "
                    >
                      {/* Top gradient */}
                      <div
                        className="
                absolute inset-x-0 top-0 h-1
                bg-gradient-to-r
                from-primary via-secondary to-accent
              "
                      />

                      <div className="space-y-1 pt-1">
                        {link.children.map((child, childIndex) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) => `
                    group/child relative flex min-h-12
                    items-center justify-between
                    overflow-hidden rounded-xl px-4
                    text-sm font-bold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-primary text-white shadow-[0_8px_20px_rgba(39,140,69,0.22)]"
                        : "text-neutral/75 hover:bg-primary/10 hover:pl-5 hover:text-primary"
                    }
                  `}
                          >
                            {({ isActive }) => (
                              <>
                                <span className="relative z-10 flex items-center gap-3">
                                  <span
                                    className={`
                            grid size-7 place-items-center
                            rounded-lg text-[11px] font-black
                            transition-all duration-300
                            ${
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-primary/10 text-primary group-hover/child:bg-primary group-hover/child:text-white"
                            }
                          `}
                                  >
                                    {String(childIndex + 1).padStart(2, "0")}
                                  </span>

                                  {child.name}
                                </span>

                                <ArrowUpRight
                                  className={`
                          size-4 transition-transform duration-300
                          group-hover/child:translate-x-0.5
                          group-hover/child:-translate-y-0.5
                          ${isActive ? "text-secondary" : "text-primary/55"}
                        `}
                                />

                                {isActive && (
                                  <span
                                    className="
                            absolute bottom-0 left-0 top-0
                            w-1 bg-secondary
                          "
                                  />
                                )}
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>

                      {/* Decorative background */}
                      <div
                        className="
                pointer-events-none absolute
                -bottom-12 -right-12 size-28
                rounded-full bg-primary/10 blur-2xl
              "
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="
                group relative flex min-h-11 items-center
                gap-2 rounded-xl border border-primary/20
                bg-white px-4 text-sm font-bold text-primary
                shadow-sm transition-all duration-300
                hover:-translate-y-0.5 hover:border-primary/40
                hover:bg-primary/5
                hover:shadow-[0_10px_25px_rgba(39,140,69,0.12)]
                active:translate-y-0 active:scale-[0.98]
              "
            >
              <GraduationCap
                className="
                  size-5 transition-transform duration-300
                  group-hover:-rotate-6 group-hover:scale-110
                "
              />
              Login
            </Link>

            <Link
              to="/admission"
              className="
                group relative isolate flex min-h-11
                items-center gap-2 overflow-hidden
                rounded-xl border border-accent
                bg-accent px-5 text-sm font-bold text-white
                shadow-[0_10px_24px_rgba(229,43,50,0.24)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_16px_30px_rgba(229,43,50,0.30)]
                active:translate-y-0 active:scale-[0.97]
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute inset-y-0 -left-16 -z-10
                  w-12 -skew-x-12 bg-white/25
                  transition-all duration-700
                  group-hover:left-[115%]
                "
              />
              Admission
              <ArrowUpRight
                className="
                  size-4 transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="
              group relative grid size-11 place-items-center
              overflow-hidden rounded-xl border border-primary/15
              bg-primary/10 text-primary
              shadow-sm transition-all duration-300
              hover:bg-primary hover:text-white
              active:scale-95 lg:hidden
            "
          >
            <span
              className={`
                absolute transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }
              `}
            >
              <Menu className="size-6" />
            </span>

            <span
              className={`
                absolute transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }
              `}
            >
              <X className="size-6" />
            </span>
          </button>
        </nav>

        {/* Mobile navigation */}
        <div
          id="mobile-navigation"
          className={`
            absolute left-0 right-0 top-full
            overflow-hidden border-b border-primary/15
            bg-white/95 shadow-[0_20px_45px_rgba(31,41,35,0.14)]
            backdrop-blur-xl transition-all duration-500
            lg:hidden
            ${
              isMobileMenuOpen
                ? "visible max-h-[calc(100vh-64px)] translate-y-0 opacity-100"
                : "invisible max-h-0 -translate-y-3 opacity-0"
            }
          `}
        >
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-5 sm:px-6">
            <div
              className="
                cosmo-gradient rounded-3xl border
                border-primary/15 bg-base-100 p-3
                shadow-[0_12px_35px_rgba(39,140,69,0.08)]
              "
            >
              <div className="space-y-1">
                {navLinks.map((link, index) => {
                  const hasChildren = link.children?.length > 0;
                  const parentActive = isParentActive(link);
                  const isSubmenuOpen = openMobileSubmenu === link.name;

                  // Normal mobile link
                  if (!hasChildren) {
                    return (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === "/"}
                        style={{
                          transitionDelay: isMobileMenuOpen
                            ? `${index * 35}ms`
                            : "0ms",
                        }}
                        className={({ isActive }) => `
            group relative flex min-h-13
            items-center justify-between
            overflow-hidden rounded-xl px-4
            font-bold transition-all duration-300
            ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-5 opacity-0"
            }
            ${
              isActive
                ? "bg-primary text-white shadow-[0_8px_20px_rgba(39,140,69,0.22)]"
                : "text-neutral/75 hover:bg-primary/10 hover:pl-5 hover:text-primary"
            }
          `}
                      >
                        {({ isActive }) => (
                          <>
                            <span className="relative z-10 flex items-center gap-3">
                              <span
                                className={`
                    grid size-7 place-items-center
                    rounded-lg text-xs font-black
                    transition-colors duration-300
                    ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-primary/10 text-primary"
                    }
                  `}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              {link.name}
                            </span>

                            <ChevronDown
                              className={`
                  size-4 -rotate-90
                  transition-transform duration-300
                  group-hover:translate-x-1
                  ${isActive ? "text-secondary" : "text-primary/60"}
                `}
                            />

                            {isActive && (
                              <span
                                className="
                    absolute bottom-0 left-0 top-0
                    w-1 bg-secondary
                  "
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  }

                  // Mobile link with submenu
                  return (
                    <div
                      key={link.path}
                      style={{
                        transitionDelay: isMobileMenuOpen
                          ? `${index * 35}ms`
                          : "0ms",
                      }}
                      className={`
          overflow-hidden rounded-xl
          transition-all duration-300
          ${
            isMobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-5 opacity-0"
          }
        `}
                    >
                      {/* Parent mobile button */}
                      <div
                        className={`
            relative flex min-h-13 items-center
            overflow-hidden rounded-xl
            transition-all duration-300
            ${
              parentActive
                ? "bg-primary text-white shadow-[0_8px_20px_rgba(39,140,69,0.22)]"
                : "text-neutral/75 hover:bg-primary/10 hover:text-primary"
            }
          `}
                      >
                        {/* Parent navigation area */}
                        <NavLink
                          to={link.path}
                          className="
              relative z-10 flex min-h-13
              flex-1 items-center gap-3 px-4
              font-bold
            "
                        >
                          <span
                            className={`
                grid size-7 place-items-center
                rounded-lg text-xs font-black
                transition-colors duration-300
                ${
                  parentActive
                    ? "bg-white/15 text-white"
                    : "bg-primary/10 text-primary"
                }
              `}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {link.name}
                        </NavLink>

                        {/* Submenu toggle button */}
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileSubmenu((current) =>
                              current === link.name ? null : link.name,
                            )
                          }
                          aria-label={`${link.name} submenu`}
                          aria-expanded={isSubmenuOpen}
                          className={`
              relative z-10 mr-2 grid size-10
              place-items-center rounded-lg
              transition-all duration-300
              ${
                parentActive
                  ? "bg-white/10 text-secondary hover:bg-white/20"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }
            `}
                        >
                          <ChevronDown
                            className={`
                size-5 transition-transform duration-300
                ${isSubmenuOpen ? "rotate-180" : "rotate-0"}
              `}
                          />
                        </button>

                        {parentActive && (
                          <span
                            className="
                absolute bottom-0 left-0 top-0
                w-1 bg-secondary
              "
                          />
                        )}
                      </div>

                      {/* Mobile submenu */}
                      <div
                        className={`
            grid transition-all duration-500
            ${
              isSubmenuOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="
                ml-5 mt-2 space-y-1
                border-l-2 border-primary/15
                pb-2 pl-3
              "
                          >
                            {link.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={({ isActive }) => `
                    group/child relative flex min-h-11
                    items-center justify-between
                    overflow-hidden rounded-xl px-3
                    text-sm font-bold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-secondary/25 text-neutral shadow-sm"
                        : "text-neutral/65 hover:bg-primary/10 hover:pl-4 hover:text-primary"
                    }
                  `}
                              >
                                {({ isActive }) => (
                                  <>
                                    <span className="flex items-center gap-3">
                                      <span
                                        className={`
                            size-2 rounded-full
                            transition-all duration-300
                            ${
                              isActive
                                ? "scale-125 bg-accent shadow-[0_0_0_4px_rgba(229,43,50,0.12)]"
                                : "bg-primary/40 group-hover/child:bg-primary"
                            }
                          `}
                                      />

                                      {child.name}
                                    </span>

                                    <ArrowUpRight
                                      className={`
                          size-4 transition-transform duration-300
                          group-hover/child:translate-x-0.5
                          group-hover/child:-translate-y-0.5
                          ${isActive ? "text-accent" : "text-primary/50"}
                        `}
                                    />
                                  </>
                                )}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-base-300 pt-4">
                <Link
                  to="/login"
                  className="
                    flex min-h-12 items-center justify-center
                    gap-2 rounded-xl border border-primary/20
                    bg-white font-bold text-primary
                    transition-all duration-300
                    hover:bg-primary/10 active:scale-95
                  "
                >
                  <GraduationCap className="size-5" />
                  Login
                </Link>

                <Link
                  to="/admission"
                  className="
                    flex min-h-12 items-center justify-center
                    gap-2 rounded-xl border border-accent
                    bg-accent font-bold text-white
                    shadow-[0_8px_20px_rgba(229,43,50,0.22)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_12px_25px_rgba(229,43,50,0.28)]
                    active:translate-y-0 active:scale-95
                  "
                >
                  Admission
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      <button
        type="button"
        aria-label="Close mobile navigation"
        onClick={() => setIsMobileMenuOpen(false)}
        className={`
          fixed inset-0 z-40 bg-neutral/40
          backdrop-blur-sm transition-all duration-500
          lg:hidden
          ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />
    </>
  );
};

export default Navbar;
