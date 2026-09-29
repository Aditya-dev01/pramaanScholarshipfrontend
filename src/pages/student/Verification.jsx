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

        <p className="text-sm font-medium text-[#24823F]">
          Final Verification
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#26332A]">
          Review & Submit
        </h1>

        <p className="mt-2 text-[#26332A]/60">
          Review your information before submitting the application.
        </p>

      </div>


      <div className="space-y-6">

        <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDEBD8] text-[#24823F]">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="font-bold text-[#26332A]">
                Document Verification
              </h2>

              <p className="text-sm text-[#26332A]/60">
                Verification results for your uploaded documents.
              </p>
            </div>

          </div>


          <div className="mt-6 space-y-3">

            {application.documents?.map(
              (document) => (
                <div
                  key={document.type}
                  className="flex items-center justify-between rounded-xl bg-[#FFF8E7] p-4"
                >
                  <div>
                    <p className="font-medium text-[#26332A]">
                      {document.type}
                    </p>

                    <p className="text-xs text-[#26332A]/50">
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


        <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

          <h2 className="font-bold text-[#26332A]">
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
          <div className="flex items-start gap-3 rounded-xl bg-[#FBE8DF] p-5 text-[#C76B45]">

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


        <div className="rounded-2xl border border-[#DDEBD8] bg-[#DDEBD8] p-6">

          <div className="flex items-start gap-3">

            <CheckCircle
              size={21}
              className="mt-0.5 text-[#24823F]"
            />

            <p className="text-sm leading-6 text-[#26332A]/70">
              By submitting this application, you confirm that all
              information and documents provided are accurate.
            </p>

          </div>

          <button
            onClick={handleSubmit}
            disabled={!allVerified}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#24823F] px-6 py-3.5 font-bold text-white hover:bg-[#185C2C] disabled:cursor-not-allowed disabled:bg-[#DDEBD8] disabled:text-[#26332A]/50"
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
    <div className="rounded-xl bg-[#FFF8E7] p-4">
      <p className="text-xs text-[#26332A]/50">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#26332A]">
        {value || "-"}
      </p>
    </div>
  );
}

export default Verification;