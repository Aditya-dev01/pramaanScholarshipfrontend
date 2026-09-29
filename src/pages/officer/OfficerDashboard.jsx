import { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import DashboardCard from "../../components/DashboardCard";
import AnalyticsChart from "../../components/AnalyticsChart";
import StatusBadge from "../../components/StatusBadge";
import { getApplications } from "../../data/applications";

function OfficerDashboard() {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    const refresh = () => {
      setApplications(getApplications());
    };

    refresh();

    window.addEventListener(
      "applicationsUpdated",
      refresh
    );

    return () =>
      window.removeEventListener(
        "applicationsUpdated",
        refresh
      );
  }, []);

  const pending = applications.filter(
    (app) =>
      app.status === "Pending" ||
      app.status === "Under Review"
  ).length;

  const accepted = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <p className="text-sm font-medium text-[#9BB06D]">
          Officer Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#293127]">
          Application Overview
        </h1>

        <p className="mt-2 text-[#293127]/60">
          Monitor scholarship applications and review decisions.
        </p>

      </div>


      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Applications"
          value={applications.length}
          icon={FileText}
        />

        <DashboardCard
          title="Pending Review"
          value={pending}
          icon={Clock}
          iconClass="bg-[#FFF8E7] text-[#E5B84B]"
        />

        <DashboardCard
          title="Accepted"
          value={accepted}
          icon={CheckCircle}
          iconClass="bg-[#E8EEDB] text-[#9BB06D]"
        />

        <DashboardCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          iconClass="bg-[#F7E7DF] text-[#B9684B]"
        />

      </div>


      <div className="mt-8 grid gap-7 lg:grid-cols-2">

        <AnalyticsChart
          data={{
            pending,
            accepted,
            rejected,
          }}
        />

        <div className="rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold text-[#293127]">
                Pending Reviews
              </h2>

              <p className="mt-1 text-sm text-[#293127]/60">
                Applications waiting for a decision.
              </p>
            </div>

            <Link
              to="/officer/applications"
              className="text-sm font-semibold text-[#9BB06D]"
            >
              View All
            </Link>

          </div>


          <div className="mt-6 space-y-3">

            {applications
              .filter(
                (app) =>
                  app.status === "Pending" ||
                  app.status === "Under Review"
              )
              .slice(0, 4)
              .map((application) => (
                <Link
                  key={application.id}
                  to={`/officer/applications/${application.id}`}
                  className="flex items-center justify-between rounded-xl bg-[#FFF8E7] p-4 hover:bg-[#E8EEDB]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#293127]">
                      {application.studentName}
                    </p>

                    <p className="mt-1 text-xs text-[#293127]/60">
                      {application.scholarshipName}
                    </p>
                  </div>

                  <StatusBadge
                    status={application.status}
                  />
                </Link>
              ))}

            {!pending && (
              <div className="py-8 text-center text-sm text-[#293127]/50">
                No pending applications.
              </div>
            )}

          </div>

        </div>

      </div>


      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#657A3F] to-[#9BB06D] p-7 text-white">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-xl font-bold">
              Review applications
            </h2>

            <p className="mt-2 text-sm text-[#E8EEDB]">
              Open the application list to review submitted information
              and documents.
            </p>
          </div>

          <Link
            to="/officer/applications"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#657A3F]"
          >
            View Applications
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OfficerDashboard;