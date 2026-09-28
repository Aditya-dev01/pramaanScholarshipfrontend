import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  Lock,
  Mail,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const {
    studentLogin,
    officerLogin,
  } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const scholarshipId =
    searchParams.get("scholarship");

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------------------
  // LOGIN
  // -----------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    let result;

    // Student login
    if (role === "student") {
      result = studentLogin(
        email.trim(),
        password
      );
    }

    // Officer login
    if (role === "officer") {
      result = officerLogin(
        email.trim(),
        password
      );
    }

    setLoading(false);

    // Login failed
    if (!result.success) {
      setError(result.message);
      return;
    }

    // ---------------------------------------
    // STUDENT REDIRECT
    // ---------------------------------------
    if (role === "student") {
      navigate(
        scholarshipId
          ? `/student/apply/${scholarshipId}`
          : "/student"
      );

      return;
    }

    // ---------------------------------------
    // OFFICER REDIRECT
    // ---------------------------------------
    if (role === "officer") {
      navigate("/officer");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-slate-50 px-4 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

        {/* =====================================
            LEFT PANEL
        ===================================== */}

        <div className="hidden bg-blue-700 p-10 text-white lg:block">

          <div className="flex h-full flex-col justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white font-bold text-blue-700">
                S
              </div>

              <h1 className="mt-8 text-4xl font-bold">
                Welcome back.
              </h1>

              <p className="mt-5 leading-7 text-blue-100">
                Sign in to continue your scholarship
                journey, submit applications and track
                decisions.
              </p>

            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <GraduationCap size={22} />

                <span>
                  Student scholarship applications
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={22} />

                <span>
                  Secure application review
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* =====================================
            LOGIN FORM
        ===================================== */}

        <div className="p-6 sm:p-10">

          <div className="mx-auto max-w-md">

            <h2 className="text-2xl font-bold text-slate-900">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Choose your account type and enter
              your credentials.
            </p>


            {/* =================================
                ACCOUNT TYPE
            ================================= */}

            <div className="mt-7 grid grid-cols-2 gap-3">

              {/* Student */}
              <button
                type="button"
                onClick={() => {
                  setRole("student");
                  setError("");
                }}
                className={`rounded-xl border p-4 text-left transition ${
                  role === "student"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >

                <GraduationCap size={21} />

                <p className="mt-2 text-sm font-bold">
                  Student
                </p>

                <p className="text-xs opacity-70">
                  Apply for scholarships
                </p>

              </button>


              {/* Officer */}
              <button
                type="button"
                onClick={() => {
                  setRole("officer");
                  setError("");
                }}
                className={`rounded-xl border p-4 text-left transition ${
                  role === "officer"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >

                <ShieldCheck size={21} />

                <p className="mt-2 text-sm font-bold">
                  Officer
                </p>

                <p className="text-xs opacity-70">
                  Review applications
                </p>

              </button>

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}


            {/* =================================
                FORM
            ================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    disabled={loading}
                    placeholder={
                      role === "officer"
                        ? "officer@example.com"
                        : "you@example.com"
                    }
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    disabled={loading}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />

                </div>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : role === "student"
                  ? "Sign in as Student"
                  : "Sign in as Officer"}
              </button>

            </form>


            {/* =================================
                DEMO CREDENTIALS
            ================================= */}

            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">

              {role === "student" ? (
                <>
                  <p className="font-bold text-slate-700">
                    Demo Student
                  </p>

                  <p>
                    student@example.com / student123
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-slate-700">
                    Demo Officer
                  </p>

                  <p>
                    officer@example.com / officer123
                  </p>
                </>
              )}

            </div>


            {/* =================================
                REGISTER
            ================================= */}

            <p className="mt-7 text-center text-sm text-slate-500">

              Don't have a student account?{" "}

              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create one
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;