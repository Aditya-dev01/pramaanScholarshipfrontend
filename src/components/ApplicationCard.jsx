import { Link } from "react-router-dom";
import {
  CalendarDays,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  return (
    <div className="rounded-2xl border border-[#DDEBD8] bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DDEBD8] text-[#24823F]">
            <GraduationCap size={23} />
          </div>

          <div>
            <h3 className="font-bold text-[#26332A]">
              {application.scholarshipName}
            </h3>

            <p className="mt-1 text-sm text-[#26332A]/60">
              Application ID: {application.id}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-[#26332A]/50">
              <CalendarDays size={14} />
              {application.submittedAt || "Not submitted"}
            </div>
          </div>

        </div>

        <StatusBadge status={application.status} />

      </div>

      <div className="mt-5 border-t border-[#DDEBD8] pt-4">
        <Link
          to={`/student/applications/${application.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#24823F] hover:text-[#185C2C]"
        >
          View Application
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}

export default ApplicationCard;