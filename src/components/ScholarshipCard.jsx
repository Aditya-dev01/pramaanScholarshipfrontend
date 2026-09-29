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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DDEBD8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="h-2 bg-[#24823F]" />

      <div className="flex flex-1 flex-col p-6">

        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-[#DDEBD8] px-3 py-1 text-xs font-semibold text-[#185C2C]">
            {scholarship.type}
          </span>

          <span className="text-xs font-medium text-[#26332A]/50">
            {scholarship.provider}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#26332A]">
          {scholarship.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#26332A]/60">
          {scholarship.description}
        </p>

        <div className="my-6 space-y-3 border-y border-[#DDEBD8] py-5">

          <div className="flex items-center gap-3">
            <IndianRupee
              size={18}
              className="text-[#24823F]"
            />

            <div>
              <p className="text-xs text-[#26332A]/50">
                Award Amount
              </p>

              <p className="font-bold text-[#26332A]">
                ₹{Number(scholarship.amount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-[#C76B45]"
            />

            <div>
              <p className="text-xs text-[#26332A]/50">
                Application Deadline
              </p>

              <p className="font-semibold text-[#26332A]">
                {scholarship.deadline}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-auto flex gap-3">

          <Link
            to={`/scholarships/${scholarship.id}`}
            className="flex flex-1 items-center justify-center rounded-lg border border-[#DDEBD8] px-4 py-3 text-sm font-semibold text-[#26332A] hover:bg-[#FFF8E7]"
          >
            Details
          </Link>

          <button
            onClick={() => navigate(applyPath)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#24823F] px-4 py-3 text-sm font-semibold text-white hover:bg-[#185C2C]"
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