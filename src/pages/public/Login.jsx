import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Mail, GraduationCap, ShieldCheck } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const scholarshipId =
    searchParams.get("scholarship");

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = login(
      email,
      password,
      role
    );

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (role === "student") {
      navigate(
        scholarshipId
          ? `/student/apply/${scholarshipId}`
          : "/student"
      );
    } else {
      navigate("/officer");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-slate-50 px-4 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

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
                Sign in to continue your scholarship journey,
                submit applications and track decisions.
              </p>

            </div>

            <div className="space-y-4">

              <div className="flex gap-3">
                <GraduationCap />
                <span>Student scholarship applications</span>
              </div>

              <div className="flex gap-3">
                <ShieldCheck />
                <span>Secure document verification</span>
              </div>

            </div>

          </div>

        </div>


        <div className="p-6 sm:p-10">

          <div className="mx-auto max-w-md">

            <h2 className="text-2xl font-bold text-slate-900">
              Sign in
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Select your account type and enter your credentials.
            </p>


            {/* ROLE */}

            <div className="mt-7 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setRole("student")}
                className={`rounded-xl border p-4 text-left ${
                  role === "student"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600"
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
                onClick={() => setRole("officer")}
                className={`rounded-xl border p-4 text-left ${
                  role === "officer"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600"
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


            {error && (
              <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

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
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>
              </div>


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
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>
              </div>


              <button
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>


            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">

              <p className="font-bold text-slate-700">
                Demo Student
              </p>

              <p>
                student@example.com / student123
              </p>

              <p className="mt-3 font-bold text-slate-700">
                Demo Officer
              </p>

              <p>
                officer@example.com / officer123
              </p>

            </div>


            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{" "}
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