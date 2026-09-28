import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import StatusBadge from "../../components/StatusBadge";
import {
  getApplication,
} from "../../data/applications";

function ApplicationDetails() {
  const { id } = useParams();

  const [application, setApplication] =
    useState(() => getApplication(id));

  useEffect(() => {
    const refresh = () => {
      setApplication(getApplication(id));
    };

    window.addEventListener(
      "applicationsUpdated",
      refresh
    );

    return () =>
      window.removeEventListener(
        "applicationsUpdated",
        refresh
      );
  }, [id]);

  if (!application) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Application not found.
      </div>
    );
  }

  const status = application.status;

  return (
    <div className="mx-auto max-w-5xl">

      <Link
        to="/student/applications"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to Applications
      </Link>


      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm text-slate-500">
            Application ID
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {application.id}
          </h1>

          <p className="mt-2 text-slate-500">
            {application.scholarshipName}
          </p>
        </div>

        <StatusBadge status={status} />

      </div>


      <div className="grid gap-7 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <h2 className="font-bold text-slate-900">
                Applicant Information
              </h2>

            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <Info
                label="Name"
                value={application.formData?.fullName}
              />

              <Info
                label="Email"
                value={application.formData?.email}
              />

              <Info
                label="Institution"
                value={application.formData?.institution}
              />

              <Info
                label="Course"
                value={application.formData?.course}
              />

              <Info
                label="Category"
                value={application.formData?.category}
              />

              <Info
                label="Annual Income"
                value={application.formData?.annualIncome}
              />

            </div>

          </section>


          {application.officerComment && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="font-bold text-slate-900">
                Officer Comment
              </h2>

              <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {application.officerComment}
              </p>

            </section>
          )}

        </div>


        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Application Timeline
          </h2>

          <div className="mt-6 space-y-6">

            <TimelineItem
              icon={FileText}
              title="Application Created"
              active
            />

            <TimelineItem
              icon={CheckCircle}
              title="Documents Verified"
              active={application.documents?.every(
                (document) =>
                  document.status === "Verified"
              )}
            />

            <TimelineItem
              icon={Clock}
              title="Application Submitted"
              active={status !== "Draft"}
            />

            <TimelineItem
              icon={CheckCircle}
              title="Decision"
              active={
                status === "Accepted" ||
                status === "Rejected"
              }
              finalStatus={status}
            />

          </div>

        </section>

      </div>

    </div>
  );
}


function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}


function TimelineItem({
  icon: Icon,
  title,
  active,
  finalStatus,
}) {
  return (
    <div className="flex gap-3">

      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          active
            ? "bg-green-100 text-green-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        <Icon size={17} />
      </div>

      <div>
        <p
          className={`text-sm font-semibold ${
            active
              ? "text-slate-900"
              : "text-slate-400"
          }`}
        >
          {title}
        </p>

        {finalStatus && (
          <p
            className={`mt-1 text-xs ${
              finalStatus === "Accepted"
                ? "text-green-600"
                : finalStatus === "Rejected"
                ? "text-red-600"
                : "text-slate-500"
            }`}
          >
            {finalStatus}
          </p>
        )}
      </div>

    </div>
  );
}

export default ApplicationDetails;