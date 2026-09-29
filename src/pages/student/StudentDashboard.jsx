
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

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="mb-8">
        <p className="text-sm font-medium text-[#9BB06D]">
          Student Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#293127]">
          Welcome, {user?.name || "Student"}
        </h1>

        <p className="mt-2 text-[#293127]/60">
          Manage your scholarship applications and track their status.
        </p>
      </div>


      {/* =========================
          STATISTICS
      ========================= */}
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


      {/* =========================
          MAIN CONTENT
      ========================= */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">

        {/* =========================
            RECENT APPLICATIONS
        ========================= */}
        <div className="lg:col-span-2">

          {/* Section Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

            <div>
              <h2 className="text-xl font-bold text-[#293127]">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-[#293127]/60">
                Your latest scholarship applications
              </p>
            </div>

            {applications.length > 0 && (
              <Link
                to="/student/applications"
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#657A3F] transition hover:bg-[#E8EEDB]"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            )}

          </div>


          {/* Applications */}
          <div className="space-y-4">

            {applications.length > 0 ? (

              <>
                {applications
                  .slice(0, 3)
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                    />
                  ))}

                {/* Browse Scholarships */}
                <div className="flex justify-end pt-2">
                  <Link
                    to="/student/scholarships"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#657A3F] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#293127] hover:shadow-md active:scale-[0.98]"
                  >
                    Browse Scholarships
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </>

            ) : (

              /* =========================
                 EMPTY APPLICATION STATE
              ========================= */
              <div className="rounded-2xl border border-dashed border-[#E8EEDB] bg-white p-10 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EEDB]">
                  <FileText
                    className="text-[#657A3F]"
                    size={28}
                  />
                </div>

                <h3 className="mt-4 font-bold text-[#293127]">
                  No applications yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#293127]/60">
                  Start by exploring available scholarships and
                  submit your first application.
                </p>

                <Link
                  to="/student/scholarships"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#9BB06D] px-6 py-3 text-sm font-bold text-black shadow-sm transition-all duration-200 hover:bg-[#657A3F] hover:shadow-md active:scale-[0.98]"
                >
                  Browse Scholarships
                  <ArrowRight size={16} />
                </Link>

              </div>

            )}

          </div>

        </div>


        {/* =========================
            SCHOLARSHIP CTA
        ========================= */}
        <div className="rounded-2xl bg-gradient-to-br from-[#657A3F] to-[#9BB06D] p-7 text-white shadow-sm">

          <h2 className="text-xl font-bold">
            Find a scholarship
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/85">
            Explore available opportunities and start your next
            application.
          </p>

          <Link
            to="/student/scholarships"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black shadow-sm transition-all duration-200 hover:bg-[#E8EEDB] hover:shadow-md active:scale-[0.98]"
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
