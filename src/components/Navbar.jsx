import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dashboardPath =
    user?.role === "student" ? "/student" : "/officer";

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              S
            </div>

            <div>
              <div className="text-lg font-bold text-slate-900">
                Scholar<span className="text-blue-600">Connect</span>
              </div>
              <div className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:block">
                Scholarship Portal
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/apply-process"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Apply Process
            </Link>

            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Scholarships
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                >
                  <UserPlus size={17} />
                  Register
                </Link>

                <Link
                  to="/login"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Apply Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashboardPath}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <LayoutDashboard size={17} />
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                About
              </Link>

              <Link
                to="/apply-process"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Apply Process
              </Link>

              <Link
                to="/scholarships/sch-001"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Scholarships
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="mt-2 rounded-lg px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    Register
                  </Link>

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white"
                  >
                    Apply Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={closeMenu}
                    className="mt-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-lg px-4 py-3 text-left font-semibold text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;