import { useState } from "react";
import {
  Menu,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Student Dashboard
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage your scholarship journey
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User Profile */}
            <div className="group relative">

              {/* Profile Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "S"}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-slate-800">
                    {user?.name || "Student"}
                  </p>

                  <p className="text-xs text-slate-500">
                    Student
                  </p>
                </div>
              </button>

              {/* Hover Dropdown */}
              <div className="invisible absolute right-0 top-full mt-2 w-64 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {/* User Info */}
                <div className="border-b border-slate-100 px-3 py-3">
                  <p className="font-semibold text-slate-900">
                    {user?.name || "Student"}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {user?.email || ""}
                  </p>
                </div>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />

                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default StudentLayout;