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

        <p className="text-sm font-medium text-blue-600">
          Officer Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Application Overview
        </h1>

        <p className="mt-2 text-slate-500">
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
          iconClass="bg-amber-50 text-amber-600"
        />

        <DashboardCard
          title="Accepted"
          value={accepted}
          icon={CheckCircle}
          iconClass="bg-green-50 text-green-600"
        />

        <DashboardCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          iconClass="bg-red-50 text-red-600"
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                Pending Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Applications waiting for a decision.
              </p>
            </div>

            <Link
              to="/officer/applications"
              className="text-sm font-semibold text-blue-600"
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
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4 hover:bg-slate-100"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {application.studentName}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {application.scholarshipName}
                    </p>
                  </div>

                  <StatusBadge
                    status={application.status}
                  />
                </Link>
              ))}

            {!pending && (
              <div className="py-8 text-center text-sm text-slate-400">
                No pending applications.
              </div>
            )}

          </div>

        </div>

      </div>


      <div className="mt-8 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 p-7 text-white">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-xl font-bold">
              Review applications
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Open the application list to review submitted information
              and documents.
            </p>
          </div>

          <Link
            to="/officer/applications"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900"
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