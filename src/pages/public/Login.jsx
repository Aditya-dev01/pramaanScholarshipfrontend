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
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-[#FFF8E7] px-4 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#DDEBD8] bg-white shadow-xl lg:grid-cols-2">

        {/* =====================================
            LEFT PANEL
        ===================================== */}

        <div className="hidden bg-[#185C2C] p-10 text-white lg:block">

          <div className="flex h-full flex-col justify-between">

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF8E7] font-bold text-[#185C2C]">
                S
              </div>

              <h1 className="mt-8 text-4xl font-bold">
                Welcome back.
              </h1>

              <p className="mt-5 leading-7 text-[#DDEBD8]">
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

            <h2 className="text-2xl font-bold text-[#26332A]">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-[#26332A]/70">
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
                    ? "border-[#24823F] bg-[#DDEBD8] text-[#185C2C]"
                    : "border-[#DDEBD8] text-[#26332A]/70 hover:border-[#24823F]"
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
                    ? "border-[#24823F] bg-[#DDEBD8] text-[#185C2C]"
                    : "border-[#DDEBD8] text-[#26332A]/70 hover:border-[#24823F]"
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

                <label className="mb-2 block text-sm font-semibold text-[#26332A]">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#26332A]/40"
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
                    className="w-full rounded-xl border border-[#DDEBD8] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8] disabled:bg-[#DDEBD8]/50"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#26332A]">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#26332A]/40"
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
                    className="w-full rounded-xl border border-[#DDEBD8] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8] disabled:bg-[#DDEBD8]/50"
                  />

                </div>

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#24823F] py-3.5 font-bold text-white transition hover:bg-[#185C2C] disabled:cursor-not-allowed disabled:opacity-60"
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

            <div className="mt-6 rounded-xl bg-[#DDEBD8] p-4 text-xs text-[#26332A]/70">

              {role === "student" ? (
                <>
                  <p className="font-bold text-[#26332A]">
                    Demo Student
                  </p>

                  <p>
                    student@example.com / student123
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-[#26332A]">
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

            <p className="mt-7 text-center text-sm text-[#26332A]/70">

              Don't have a student account?{" "}

              <Link
                to="/register"
                className="font-semibold text-[#24823F] hover:text-[#185C2C]"
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