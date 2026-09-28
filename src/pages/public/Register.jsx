import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Registration is always for a student
    const result = register(
      name,
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Account successfully created
    setSuccess(
      "Account created successfully! Redirecting to home..."
    );

    // Redirect to home page after 1.5 seconds
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-slate-50 px-4 py-12">

      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">

        {/* Header */}
        <div className="text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            S
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Create Student Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Register as a student to discover and apply for scholarships.
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >

          {/* Full Name */}
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
                disabled={!!success}
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>
          </div>

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
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={!!success}
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
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
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                disabled={!!success}
                className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>
          </div>

          {/* Account Information */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

            <div className="flex items-start gap-3">

              <GraduationCap
                className="mt-0.5 text-blue-600"
                size={22}
              />

              <div>
                <p className="font-semibold text-slate-900">
                  Student Account
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  This registration form is only available
                  for students. Officer accounts are created
                  separately.
                </p>
              </div>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!!success}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {success
              ? "Account Created"
              : "Create Student Account"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>

        {/* Officer Login */}
        <p className="mt-3 text-center text-sm text-slate-500">
          Are you an officer?{" "}

          <Link
            to="/officer/login"
            className="font-semibold text-slate-700 hover:text-blue-600"
          >
            Officer Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
