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

        <p className="text-sm font-medium text-[#24823F]">
          Applications
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#26332A]">
          Application List
        </h1>

        <p className="mt-2 text-[#26332A]/60">
          Review and manage scholarship applications.
        </p>

      </div>


      <div className="mb-6 flex flex-col gap-3 md:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#26332A]/50"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search applicant or scholarship..."
            className="w-full rounded-xl border border-[#DDEBD8] bg-white py-3 pl-10 pr-4 text-sm focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
          />

        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-xl border border-[#DDEBD8] bg-white px-4 py-3 text-sm font-medium focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
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


      <div className="overflow-hidden rounded-2xl border border-[#DDEBD8] bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px] text-left">

            <thead className="border-b border-[#DDEBD8] bg-[#FFF8E7]">

              <tr>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#26332A]/60">
                  Applicant
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#26332A]/60">
                  Scholarship
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#26332A]/60">
                  Submitted
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#26332A]/60">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#26332A]/60">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-[#DDEBD8]">

              {filtered.map(
                (application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-[#FFF8E7]"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-[#26332A]">
                        {application.studentName}
                      </p>

                      <p className="mt-1 text-xs text-[#26332A]/60">
                        {application.studentEmail}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <p className="text-sm font-medium text-[#26332A]">
                        {application.scholarshipName}
                      </p>

                      <p className="mt-1 text-xs text-[#26332A]/50">
                        {application.id}
                      </p>

                    </td>

                    <td className="px-6 py-5 text-sm text-[#26332A]/60">
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
                        className="inline-flex items-center gap-2 rounded-lg bg-[#DDEBD8] px-3 py-2 text-sm font-semibold text-[#185C2C] hover:bg-[#FFF8E7]"
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
          <div className="p-12 text-center text-sm text-[#26332A]/60">
            No applications match your search.
          </div>
        )}

      </div>

    </div>
  );
}

export default Applications;