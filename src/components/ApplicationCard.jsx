import { Link } from "react-router-dom";
import {
  CalendarDays,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <GraduationCap size={23} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              {application.scholarshipName}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Application ID: {application.id}
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays size={14} />
              {application.submittedAt || "Not submitted"}
            </div>
          </div>

        </div>

        <StatusBadge status={application.status} />

      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          to={`/student/applications/${application.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View Application
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}

export default ApplicationCard;