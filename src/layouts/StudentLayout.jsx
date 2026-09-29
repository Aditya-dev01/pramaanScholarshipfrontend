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
    <div className="flex min-h-screen bg-[#FFF8E7]">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#DDEBD8] bg-white px-4 sm:px-6">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-[#26332A]/70 hover:bg-[#DDEBD8] lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-[#26332A]">
                Student Dashboard
              </h1>

              <p className="hidden text-xs text-[#26332A]/60 sm:block">
                Manage your scholarship journey
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-xl p-2.5 text-[#26332A]/70 transition hover:bg-[#DDEBD8]"
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C76B45]" />
            </button>

            {/* User Profile */}
            <div className="group relative">

              {/* Profile Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#DDEBD8]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#24823F] text-sm font-bold text-white">
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "S"}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[#26332A]">
                    {user?.name || "Student"}
                  </p>

                  <p className="text-xs text-[#26332A]/60">
                    Student
                  </p>
                </div>
              </button>

              {/* Hover Dropdown */}
              <div className="invisible absolute right-0 top-full mt-2 w-64 translate-y-2 rounded-2xl border border-[#DDEBD8] bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {/* User Info */}
                <div className="border-b border-[#DDEBD8] px-3 py-3">
                  <p className="font-semibold text-[#26332A]">
                    {user?.name || "Student"}
                  </p>

                  <p className="mt-1 truncate text-xs text-[#26332A]/60">
                    {user?.email || ""}
                  </p>
                </div>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#C76B45] transition hover:bg-[#FBE8DF]"
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