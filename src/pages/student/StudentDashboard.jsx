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
import ApplicationCard from "../../components/ApplicationCard";
import { useAuth } from "../../context/AuthContext";
import { getApplications } from "../../data/applications";

function StudentDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const refresh = () => {
      const all = getApplications();

      setApplications(
        all.filter(
          (app) => app.studentEmail === user.email
        )
      );
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
  }, [user.email]);

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
          Student Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#293127]">
          Welcome, {user.name}
        </h1>

        <p className="mt-2 text-[#293127]/60">
          Manage your scholarship applications and track their status.
        </p>

      </div>


      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Applications"
          value={applications.length}
          icon={FileText}
        />

        <DashboardCard
          title="Pending"
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


      <div className="mt-8 grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-[#293127]">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-[#293127]/60">
                Your latest scholarship applications
              </p>
            </div>

            <Link
              to="/student/applications"
              className="flex items-center gap-2 text-sm font-semibold text-[#9BB06D]"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="space-y-4">

            {applications.length ? (
              applications
                .slice(0, 3)
                .map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                ))
            ) : (
              <div className="rounded-2xl border border-dashed border-[#E8EEDB] bg-white p-10 text-center">

                <FileText
                  className="mx-auto text-[#293127]/30"
                  size={40}
                />

                <h3 className="mt-4 font-bold text-[#293127]">
                  No applications yet
                </h3>

                <p className="mt-2 text-sm text-[#293127]/60">
                  Start by exploring available scholarships.
                </p>

                <Link
                  to="/student/scholarships"
                  className="mt-5 inline-flex rounded-lg bg-[#9BB06D] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Browse Scholarships
                </Link>

              </div>
            )}

          </div>

        </div>


        <div className="rounded-2xl bg-gradient-to-br from-[#657A3F] to-[#9BB06D] p-7 text-white">

          <h2 className="text-xl font-bold">
            Find a scholarship
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#E8EEDB]">
            Explore available opportunities and start your next
            application.
          </p>

          <Link
            to="/student/scholarships"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#9BB06D]"
          >
            Explore Scholarships
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;