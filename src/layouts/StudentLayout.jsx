import { useState } from "react";
import {
  Menu,
  Bell,
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

      {/* =========================================
          STUDENT SIDEBAR
      ========================================= */}
      <Sidebar
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />

      {/* =========================================
          MAIN AREA
      ========================================= */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* =========================================
            HEADER
        ========================================= */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E8EEDB] bg-white px-4 sm:px-6">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-[#293127]/70 transition hover:bg-[#E8EEDB] lg:hidden"
            >
              <Menu size={22} />
            </button>

            {/* Page Title */}
            <div>
              <h1 className="text-lg font-bold text-[#293127]">
                Student Dashboard
              </h1>

              <p className="hidden text-xs text-[#293127]/60 sm:block">
                Manage your scholarship journey
              </p>
            </div>
          </div>

          {/* =========================================
              RIGHT SIDE
          ========================================= */}
          <div className="flex items-center gap-3">

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-xl p-2.5 text-[#293127]/70 transition hover:bg-[#E8EEDB]"
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#B9684B]" />
            </button>

            {/* =====================================
                USER PROFILE
            ===================================== */}
            <div className="group relative">

              {/* Profile Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-[#E8EEDB]"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9BB06D] text-sm font-bold text-white">
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "S"}
                </div>

                {/* User Name */}
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-[#293127]">
                    {user?.name || "Student"}
                  </p>

                  <p className="text-xs text-[#293127]/60">
                    Student
                  </p>
                </div>
              </button>

              {/* ===================================
                  PROFILE DROPDOWN
              =================================== */}
              <div className="invisible absolute right-0 top-full mt-2 w-64 translate-y-2 rounded-2xl border border-[#E8EEDB] bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {/* User Information */}
                <div className="border-b border-[#E8EEDB] px-3 py-3">
                  <p className="font-semibold text-[#293127]">
                    {user?.name || "Student"}
                  </p>

                  <p className="mt-1 truncate text-xs text-[#293127]/60">
                    {user?.email || ""}
                  </p>
                </div>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#B9684B] transition hover:bg-[#F7E7DF]"
                >
                  <LogOut size={18} />

                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* =========================================
            PAGE CONTENT
        ========================================= */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default StudentLayout;
