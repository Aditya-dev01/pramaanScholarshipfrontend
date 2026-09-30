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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      let result;

      if (role === "student") {
        result = await studentLogin(
          email.trim(),
          password
        );
      } else {
        result = await officerLogin(
          email.trim(),
          password
        );
      }

      if (!result?.success) {
        setError(
          result?.message || "Login failed."
        );
        return;
      }

      // --------------------------------------------
      // STUDENT
      // --------------------------------------------

      if (role === "student") {
        if (scholarshipId) {
          navigate(
            `/student/apply/${scholarshipId}`
          );
        } else {
          navigate("/student");
        }

        return;
      }

      // --------------------------------------------
      // OFFICER
      // --------------------------------------------

      if (role === "officer") {
        navigate("/officer");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-[#FFF8E7] px-4 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E8EEDB] bg-white shadow-xl lg:grid-cols-2">


        {/* =====================================
            LEFT PANEL
        ===================================== */}

        <div className="hidden bg-[#657A3F] p-10 text-white lg:block">

          <div className="flex h-full flex-col justify-between">

            <div>

              <div className="flex h-35 w-35 items-center justify-center rounded-xl font-bold text-[#657A3F]">
                <img src="logo.jpg" alt="logo" />
              </div>

              <h1 className="text-4xl font-bold">
                Welcome back.
              </h1>

              <p className="mt-5 leading-7 text-[#E8EEDB]">
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

            <h2 className="text-2xl font-bold text-[#293127]">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-[#293127]/70">
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
                disabled={loading}
                className={`rounded-xl border p-4 text-left transition ${role === "student"
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


              {/* Officer */}
              <button
                type="button"
                onClick={() => {
                  setRole("officer");
                  setError("");
                }}
                disabled={loading}
                className={`rounded-xl border p-4 text-left transition ${role === "officer"
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

                <label className="mb-2 block text-sm font-semibold text-[#293127]">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#293127]/40"
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
                    className="w-full rounded-xl border border-[#E8EEDB] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB] disabled:bg-[#E8EEDB]/50"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-[#293127]">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#293127]/40"
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
                    className="w-full rounded-xl border border-[#E8EEDB] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB] disabled:bg-[#E8EEDB]/50"
                  />

                </div>

              </div>


              {/* Submit */}
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


            {/* =================================
                DEMO CREDENTIALS
            ================================= */}

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


            {/* =================================
                REGISTER
            ================================= */}

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
