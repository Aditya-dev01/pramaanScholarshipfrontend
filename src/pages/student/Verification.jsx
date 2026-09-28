import { useEffect, useState } from "react";
import {
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Stepper from "../../components/Stepper";
import StatusBadge from "../../components/StatusBadge";
import {
  getApplication,
  updateApplication,
} from "../../data/applications";
import { getScholarshipById } from "../../data/scholarships";

function Verification() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState(() => getApplication(applicationId));

  useEffect(() => {
    const refresh = () => {
      setApplication(getApplication(applicationId));
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
  }, [applicationId]);

  if (!application) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Application not found.
      </div>
    );
  }

  const scholarship = getScholarshipById(
    application.scholarshipId
  );

  const allVerified =
    scholarship?.requiredDocuments?.every(
      (requiredDocument) =>
        application.documents?.some(
          (document) =>
            document.type === requiredDocument &&
            document.status === "Verified"
        )
    );


  const handleSubmit = () => {
    if (!allVerified) {
      return;
    }

    updateApplication(applicationId, {
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    });

    navigate(
      `/student/applications/${applicationId}`
    );
  };


  return (
    <div className="mx-auto max-w-4xl">

      <Stepper currentStep={4} />

      <div className="mb-8">

        <p className="text-sm font-medium text-blue-600">
          Final Verification
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Review & Submit
        </h1>

        <p className="mt-2 text-slate-500">
          Review your information before submitting the application.
        </p>

      </div>


      <div className="space-y-6">

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Document Verification
              </h2>

              <p className="text-sm text-slate-500">
                Verification results for your uploaded documents.
              </p>
            </div>

          </div>


          <div className="mt-6 space-y-3">

            {application.documents?.map(
              (document) => (
                <div
                  key={document.type}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {document.type}
                    </p>

                    <p className="text-xs text-slate-400">
                      {document.name}
                    </p>
                  </div>

                  <StatusBadge
                    status={document.status}
                  />
                </div>
              )
            )}

          </div>

        </section>


        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Applicant Information
          </h2>

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

          </div>

        </section>


        {!allVerified && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 p-5 text-red-700">

            <AlertCircle
              size={20}
              className="mt-0.5"
            />

            <div>
              <p className="font-semibold">
                Verification incomplete
              </p>

              <p className="mt-1 text-sm">
                All required documents must be verified before
                submitting the application.
              </p>
            </div>

          </div>
        )}


        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <div className="flex items-start gap-3">

            <CheckCircle
              size={21}
              className="mt-0.5 text-blue-600"
            />

            <p className="text-sm leading-6 text-slate-600">
              By submitting this application, you confirm that all
              information and documents provided are accurate.
            </p>

          </div>

          <button
            onClick={handleSubmit}
            disabled={!allVerified}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Submit Application
            <ArrowRight size={18} />
          </button>

        </div>

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

export default Verification;