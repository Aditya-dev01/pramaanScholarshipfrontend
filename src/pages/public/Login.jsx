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
  const { studentLogin, officerLogin } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Preserve the scholarship selected before login.
  const scholarshipId = searchParams.get("scholarship");

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      let result;

      if (role === "student") {
        result = await studentLogin(email.trim(), password);
      } else {
        result = await officerLogin(email.trim(), password);
      }

      // Handle unsuccessful authentication.
      if (!result?.success) {
        setError(result?.message || "Invalid email or password.");
        return;
      }

      // Redirect students to the selected scholarship.
      if (role === "student") {
        if (scholarshipId) {
          navigate(
            `/student/apply/${encodeURIComponent(scholarshipId)}`,
            { replace: true }
          );
        } else {
          navigate("/student", { replace: true });
        }

        return;
      }

      // Officers go to their dashboard.
      if (role === "officer") {
        navigate("/officer", { replace: true });
      }
    } catch (err) {
      setError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-[#FFF8E7] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E8EEDB] bg-white shadow-xl lg:grid-cols-2">
        {/* Left panel */}
        <div className="hidden bg-[#657A3F] p-10 text-white lg:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl bg-white/10 p-3">
                <img
                  src="/logo.jpg"
                  alt="AadiVidya logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <h1 className="text-4xl font-bold">
                Welcome back.
              </h1>

              <p className="mt-5 leading-7 text-[#E8EEDB]">
                Sign in to continue your scholarship journey,
                submit applications and track decisions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap size={22} />
                <span>Student scholarship applications</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={22} />
                <span>Secure application review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <h2 className="text-2xl font-bold text-[#293127]">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-[#293127]/70">
              Choose your account type and enter your credentials.
            </p>

            {/* Account type selector */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole("student");
                  setError("");
                }}
                disabled={loading}
                aria-pressed={role === "student"}
                className={`rounded-xl border p-4 text-left transition ${
                  role === "student"
                    ? "border-[#9BB06D] bg-[#E8EEDB] text-[#657A3F]"
                    : "border-[#E8EEDB] text-[#293127]/70 hover:border-[#9BB06D]"
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

              <button
                type="button"
                onClick={() => {
                  setRole("officer");
                  setError("");
                }}
                disabled={loading}
                aria-pressed={role === "officer"}
                className={`rounded-xl border p-4 text-left transition ${
                  role === "officer"
                    ? "border-[#9BB06D] bg-[#E8EEDB] text-[#657A3F]"
                    : "border-[#E8EEDB] text-[#293127]/70 hover:border-[#9BB06D]"
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

            {/* Selected scholarship notice */}
            {role === "student" && scholarshipId && (
              <div className="mt-5 rounded-xl border border-[#E8EEDB] bg-[#FFF8E7] p-3 text-sm text-[#293127]">
                Sign in to continue applying for your selected
                scholarship.
              </div>
            )}

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Credentials form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-[#293127]"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#293127]/40"
                  />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    placeholder={
                      role === "officer"
                        ? "officer@example.com"
                        : "you@example.com"
                    }
                    className="w-full rounded-xl border border-[#E8EEDB] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB] disabled:bg-[#E8EEDB]/50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-semibold text-[#293127]"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#293127]/40"
                  />

                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#E8EEDB] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB] disabled:bg-[#E8EEDB]/50"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#9BB06D] py-3.5 font-bold text-white transition hover:bg-[#657A3F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : role === "student"
                    ? "Sign in as Student"
                    : "Sign in as Officer"}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 rounded-xl bg-[#E8EEDB] p-4 text-xs text-[#293127]/70">
              {role === "student" ? (
                <>
                  <p className="font-bold text-[#293127]">
                    Demo Student
                  </p>
                  <p>
                    student@example.com / student123
                  </p>
                </>
              ) : (
                <>
                  <p className="font-bold text-[#293127]">
                    Demo Officer
                  </p>
                  <p>
                    officer@example.com / officer123
                  </p>
                </>
              )}
            </div>

            {/* Registration link */}
            <p className="mt-7 text-center text-sm text-[#293127]/70">
              Don't have a student account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#9BB06D] hover:text-[#657A3F]"
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
