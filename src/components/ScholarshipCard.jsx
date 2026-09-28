import { Link, useNavigate } from "react-router-dom";
import {
  IndianRupee,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function ScholarshipCard({ scholarship }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const applyPath =
    user?.role === "student"
      ? `/student/apply/${scholarship.id}`
      : "/login";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="h-2 bg-blue-600" />

      <div className="flex flex-1 flex-col p-6">

        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {scholarship.type}
          </span>

          <span className="text-xs font-medium text-slate-400">
            {scholarship.provider}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {scholarship.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {scholarship.description}
        </p>

        <div className="my-6 space-y-3 border-y border-slate-100 py-5">

          <div className="flex items-center gap-3">
            <IndianRupee
              size={18}
              className="text-green-600"
            />

            <div>
              <p className="text-xs text-slate-400">
                Award Amount
              </p>

              <p className="font-bold text-slate-900">
                ₹{Number(scholarship.amount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-orange-500"
            />

            <div>
              <p className="text-xs text-slate-400">
                Application Deadline
              </p>

              <p className="font-semibold text-slate-900">
                {scholarship.deadline}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-auto flex gap-3">

          <Link
            to={`/scholarships/${scholarship.id}`}
            className="flex flex-1 items-center justify-center rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Details
          </Link>

          <button
            onClick={() => navigate(applyPath)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Apply
            <ArrowRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ScholarshipCard;