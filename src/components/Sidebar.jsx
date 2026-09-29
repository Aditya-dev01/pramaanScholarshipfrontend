import {
  LayoutDashboard,
  FileText,
  BarChart3,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user } = useAuth();

  const role = user?.role;

  const studentLinks = [
    {
      label: "Dashboard",
      path: "/student",
      icon: LayoutDashboard,
    },
    {
      label: "Applications",
      path: "/student/applications",
      icon: FileText,
    },
  ];

  const officerLinks = [
    {
      label: "Dashboard",
      path: "/officer",
      icon: LayoutDashboard,
    },
    {
      label: "Applications",
      path: "/officer/applications",
      icon: FileText,
    },
    {
      label: "Analytics",
      path: "/officer/analytics",
      icon: BarChart3,
    },
  ];

  const links =
    role === "student"
      ? studentLinks
      : role === "officer"
        ? officerLinks
        : [];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          transform border-r border-[#E8EEDB]
          bg-white transition-transform duration-300
          lg:static lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#E8EEDB] px-5">
          <div>
            <h2 className="text-lg font-bold text-[#293127]">
              {role === "student"
                ? "Student Portal"
                : "Officer Portal"}
            </h2>

            <p className="text-xs text-[#293127]/50">
              Scholarship Management
            </p>
          </div>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-[#293127]/60 hover:bg-[#E8EEDB] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">

          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/student" || link.path === "/officer"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-semibold transition
                  ${
                    isActive
                      ? "bg-[#E8EEDB] text-[#657A3F]"
                      : "text-[#293127]/70 hover:bg-[#E8EEDB] hover:text-[#657A3F]"
                  }
                  `
                }
              >
                <Icon size={20} />

                <span>{link.label}</span>
              </NavLink>
            );
          })}

        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
