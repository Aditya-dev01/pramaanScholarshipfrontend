import { useState } from "react";
import {
  Menu,
  Bell,
  LogOut,
} from "lucide-react";
import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function OfficerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar
        role="officer"
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Desktop title */}
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-slate-500">
              Officer Portal
            </p>
          </div>

          <div className="flex items-center gap-4">

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <Bell size={20} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            {/* Profile */}
            <div className="group relative">

              <button
                type="button"
                className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-100"
              >

                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "O"}
                </div>

                {/* User info */}
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-slate-900">
                    {user?.name || "Officer"}
                  </p>

                  <p className="text-xs text-slate-500">
                    Scholarship Officer
                  </p>
                </div>

              </button>

              {/* Hover dropdown */}
              <div className="invisible absolute right-0 top-full mt-2 w-64 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {/* Account information */}
                <div className="border-b border-slate-100 px-3 py-3">

                  <p className="font-semibold text-slate-900">
                    {user?.name || "Officer"}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {user?.email || ""}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Scholarship Officer
                  </p>

                </div>

                {/* Sign out */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />

                  <span>
                    Sign out
                  </span>
                </button>

              </div>

            </div>

          </div>

        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default OfficerLayout;