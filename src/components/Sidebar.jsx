import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  ClipboardList,
  BarChart3,
  X,
} from "lucide-react";

function Sidebar({ role, mobileOpen, setMobileOpen }) {
  const studentLinks = [
    {
      label: "Dashboard",
      path: "/student",
      icon: LayoutDashboard,
    },
    {
      label: "Scholarships",
      path: "/student/scholarships",
      icon: GraduationCap,
    },
    {
      label: "My Applications",
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
      icon: ClipboardList,
    },
    {
      label: "Analytics",
      path: "/officer",
      icon: BarChart3,
    },
  ];

  const links =
    role === "student"
      ? studentLinks
      : officerLinks;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-white transition-transform lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              S
            </div>

            <span className="font-bold text-slate-900">
              ScholarConnect
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        <div className="p-4">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {role === "student"
              ? "Student Portal"
              : "Officer Portal"}
          </p>

          <nav className="space-y-1">

            {links.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/student" || item.path === "/officer"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.label}
                </NavLink>
              );
            })}

          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;