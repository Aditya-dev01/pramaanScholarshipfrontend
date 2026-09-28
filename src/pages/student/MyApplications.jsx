import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import ApplicationCard from "../../components/ApplicationCard";
import { useAuth } from "../../context/AuthContext";
import { getApplications } from "../../data/applications";

function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    const refresh = () => {
      setApplications(
        getApplications().filter(
          (application) =>
            application.studentEmail === user.email
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

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">

        <p className="text-sm font-medium text-blue-600">
          Applications
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          My Applications
        </h1>

        <p className="mt-2 text-slate-500">
          Track every scholarship application you have submitted.
        </p>

      </div>


      {applications.length ? (
        <div className="space-y-4">

          {applications.map(
            (application) => (
              <ApplicationCard
                key={application.id}
                application={application}
              />
            )
          )}

        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <FileText
            size={42}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            No applications found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your submitted applications will appear here.
          </p>

        </div>
      )}

    </div>
  );
}

export default MyApplications;