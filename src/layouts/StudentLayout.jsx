import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function StudentLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar
        role="student"
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm font-medium text-slate-500">
              Student Portal
            </p>
          </div>

          <div className="flex items-center gap-4">

            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={20} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600" />
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-500">
                  Student
                </p>
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

export default StudentLayout;