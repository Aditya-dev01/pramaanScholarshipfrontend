import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import ApplicationCard from "../../components/ApplicationCard";
import { fetchApplications } from "../../services/portalApi";

function MyApplications() {
  const [applications, setApplications] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        setApplications(await fetchApplications());
      } catch (err) {
        setError(err.message || "Unable to load applications.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">

        <p className="text-sm font-medium text-[#9BB06D]">
          Applications
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#293127]">
          My Applications
        </h1>

        <p className="mt-2 text-[#293127]/60">
          Track every scholarship application you have submitted.
        </p>

      </div>


      {loading ? <p className="text-sm text-[#293127]/60">Loading applications...</p> : error ? <p className="rounded-xl bg-[#F7E7DF] p-4 text-sm text-[#B9684B]">{error}</p> : applications.length ? (
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
        <div className="rounded-2xl border border-dashed border-[#E8EEDB] bg-white p-12 text-center">

          <FileText
            size={42}
            className="mx-auto text-[#293127]/30"
          />

          <h2 className="mt-4 text-lg font-bold text-[#293127]">
            No applications found
          </h2>

          <p className="mt-2 text-sm text-[#293127]/60">
            Your submitted applications will appear here.
          </p>

        </div>
      )}

    </div>
  );
}

export default MyApplications;
