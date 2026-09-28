import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, GraduationCap, ShieldCheck } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const result = register(
      name,
      email,
      password,
      role
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(
      role === "student"
        ? "/student"
        : "/officer"
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-slate-50 px-4 py-12">

      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">

        <div className="text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            S
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join ScholarConnect to manage scholarship applications.
          </p>

        </div>


        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>


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
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>


          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Account Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setRole("student")}
                className={`rounded-xl border p-4 text-left ${
                  role === "student"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <GraduationCap className="text-blue-600" />

                <p className="mt-2 font-bold text-slate-900">
                  Student
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRole("officer")}
                className={`rounded-xl border p-4 text-left ${
                  role === "officer"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <ShieldCheck className="text-blue-600" />

                <p className="mt-2 font-bold text-slate-900">
                  Officer
                </p>
              </button>

            </div>
          </div>


          <button
            className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700"
          >
            Create Account
          </button>

        </form>


        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;