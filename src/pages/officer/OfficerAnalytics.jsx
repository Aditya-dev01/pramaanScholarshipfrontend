
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";

import { getApplications } from "../../data/applications";

function OfficerAnalytics() {
  const applications = getApplications();

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "pending"
  ).length;

  const approvedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "approved" ||
      application.status?.toLowerCase() === "accepted"
  ).length;

  const rejectedApplications = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "rejected"
  ).length;

  const approvalRate =
    totalApplications > 0
      ? Math.round(
          (approvedApplications / totalApplications) * 100
        )
      : 0;

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      icon: FileText,
      color: "#9BB06D",
      bg: "#E8EEDB",
    },
    {
      label: "Pending Review",
      value: pendingApplications,
      icon: Clock,
      color: "#B9684B",
      bg: "#F7E7DF",
    },
    {
      label: "Approved",
      value: approvedApplications,
      icon: CheckCircle,
      color: "#657A3F",
      bg: "#E8EEDB",
    },
    {
      label: "Rejected",
      value: rejectedApplications,
      icon: XCircle,
      color: "#B9684B",
      bg: "#F7E7DF",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#657A3F]">
          Officer Portal
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#293127] sm:text-3xl">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-[#293127]/60">
          Monitor scholarship applications and review performance.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E8EEDB] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-[#293127]/60">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-[#293127]">
                    {stat.value}
                  </p>
                </div>

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: stat.bg }}
                >
                  <Icon
                    size={23}
                    style={{ color: stat.color }}
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Approval Rate */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8EEDB]">
              <TrendingUp
                size={22}
                className="text-[#657A3F]"
              />
            </div>

            <div>
              <h2 className="font-semibold text-[#293127]">
                Approval Rate
              </h2>

              <p className="text-sm text-[#293127]/60">
                Applications approved so far
              </p>
            </div>
          </div>

          <div className="mt-6">

            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-[#293127]">
                {approvalRate}%
              </span>

              <span className="text-sm text-[#293127]/50">
                {approvedApplications} of {totalApplications}
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#E8EEDB]">
              <div
                className="h-full rounded-full bg-[#9BB06D] transition-all"
                style={{
                  width: `${approvalRate}%`,
                }}
              />
            </div>

          </div>
        </div>

        {/* Application Breakdown */}
        <div className="rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm">

          <h2 className="font-semibold text-[#293127]">
            Application Breakdown
          </h2>

          <p className="mt-1 text-sm text-[#293127]/60">
            Current application status distribution
          </p>

          <div className="mt-6 space-y-4">

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#293127]/70">
                  Pending
                </span>

                <span className="font-semibold text-[#293127]">
                  {pendingApplications}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#E8EEDB]">
                <div
                  className="h-full rounded-full bg-[#B9684B]"
                  style={{
                    width: `${
                      totalApplications
                        ? (pendingApplications / totalApplications) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#293127]/70">
                  Approved
                </span>

                <span className="font-semibold text-[#293127]">
                  {approvedApplications}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#E8EEDB]">
                <div
                  className="h-full rounded-full bg-[#657A3F]"
                  style={{
                    width: `${
                      totalApplications
                        ? (approvedApplications / totalApplications) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-[#293127]/70">
                  Rejected
                </span>

                <span className="font-semibold text-[#293127]">
                  {rejectedApplications}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[#E8EEDB]">
                <div
                  className="h-full rounded-full bg-[#B9684B]"
                  style={{
                    width: `${
                      totalApplications
                        ? (rejectedApplications / totalApplications) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default OfficerAnalytics;