import { useEffect, useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import StatusBadge from "../../components/StatusBadge";
import { getApplications } from "../../data/applications";

function Applications() {
  const [applications, setApplications] =
    useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

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

  const filtered = useMemo(() => {
    return applications.filter(
      (application) => {

        const matchesSearch =
          application.studentName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          application.studentEmail
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          application.scholarshipName
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          status === "all" ||
          application.status === status;

        return matchesSearch && matchesStatus;
      }
    );
  }, [applications, search, status]);


  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <p className="text-sm font-medium text-blue-600">
          Applications
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Application List
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage scholarship applications.
        </p>

      </div>


      <div className="mb-6 flex flex-col gap-3 md:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search applicant or scholarship..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="all">
            All Statuses
          </option>
          <option value="Pending">
            Pending
          </option>
          <option value="Under Review">
            Under Review
          </option>
          <option value="Accepted">
            Accepted
          </option>
          <option value="Rejected">
            Rejected
          </option>
        </select>

      </div>


      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px] text-left">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Applicant
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Scholarship
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Submitted
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filtered.map(
                (application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-900">
                        {application.studentName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {application.studentEmail}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <p className="text-sm font-medium text-slate-800">
                        {application.scholarshipName}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {application.id}
                      </p>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {application.submittedAt || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge
                        status={application.status}
                      />
                    </td>

                    <td className="px-6 py-5">

                      <Link
                        to={`/officer/applications/${application.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        <Eye size={16} />
                        Review
                      </Link>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>


        {!filtered.length && (
          <div className="p-12 text-center text-sm text-slate-500">
            No applications match your search.
          </div>
        )}

      </div>

    </div>
  );
}

export default Applications;