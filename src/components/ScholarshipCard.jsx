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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8EEDB] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="h-2 bg-[#9BB06D]" />

      <div className="flex flex-1 flex-col p-6">

        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-[#E8EEDB] px-3 py-1 text-xs font-semibold text-[#657A3F]">
            {scholarship.type}
          </span>

          <span className="text-xs font-medium text-[#293127]/50">
            {scholarship.provider}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#293127]">
          {scholarship.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#293127]/60">
          {scholarship.description}
        </p>

        <div className="my-6 space-y-3 border-y border-[#E8EEDB] py-5">

          <div className="flex items-center gap-3">
            <IndianRupee
              size={18}
              className="text-[#9BB06D]"
            />

            <div>
              <p className="text-xs text-[#293127]/50">
                Award Amount
              </p>

              <p className="font-bold text-[#293127]">
                ₹{Number(scholarship.amount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-[#B9684B]"
            />

            <div>
              <p className="text-xs text-[#293127]/50">
                Application Deadline
              </p>

              <p className="font-semibold text-[#293127]">
                {scholarship.deadline}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-auto flex gap-3">

          <Link
            to={`/scholarships/${scholarship.id}`}
            className="flex flex-1 items-center justify-center rounded-lg border border-[#E8EEDB] px-4 py-3 text-sm font-semibold text-[#293127] hover:bg-[#FFF8E7]"
          >
            Details
          </Link>

          <button
            onClick={() => navigate(applyPath)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#9BB06D] px-4 py-3 text-sm font-semibold text-white hover:bg-[#657A3F]"
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