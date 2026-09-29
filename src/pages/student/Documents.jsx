import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Stepper from "../../components/Stepper";
import DocumentCard from "../../components/DocumentCard";
import { getApplication, updateApplication } from "../../data/applications";
import { getScholarshipById } from "../../data/scholarships";

function Documents() {
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

  const documents = application.documents || [];

  const handleUpload = (documentName, file) => {

    const updatedDocuments = documents.filter(
      (document) =>
        document.type !== documentName
    );

    updatedDocuments.push({
      type: documentName,
      name: file.name,
      size: file.size,
      status: "Checking",
      checkedAt: new Date().toLocaleString(),
    });

    updateApplication(applicationId, {
      documents: updatedDocuments,
    });

    setTimeout(() => {

      const latest = getApplication(
        applicationId
      );

      if (!latest) return;

      const checkedDocuments =
        (latest.documents || []).map(
          (document) => {

            if (
              document.type !== documentName
            ) {
              return document;
            }

            const suspicious =
              /tampered|fake|edited|modified/i.test(
                document.name
              );

            return {
              ...document,
              status: suspicious
                ? "Rejected"
                : "Verified",
              checkedAt:
                new Date().toLocaleString(),
            };
          }
        );

      updateApplication(applicationId, {
        documents: checkedDocuments,
      });

      setApplication(
        getApplication(applicationId)
      );

    }, 1200);
  };


  const verifiedCount = documents.filter(
    (document) =>
      document.status === "Verified"
  ).length;

  const rejectedCount = documents.filter(
    (document) =>
      document.status === "Rejected"
  ).length;

  const allVerified =
    scholarship?.requiredDocuments?.every(
      (requiredDocument) =>
        documents.some(
          (document) =>
            document.type === requiredDocument &&
            document.status === "Verified"
        )
    );


  return (
    <div className="mx-auto max-w-5xl">

      <Stepper currentStep={3} />

      <div className="mb-8">

        <p className="text-sm font-medium text-[#24823F]">
          Step 3
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#26332A]">
          Upload Documents
        </h1>

        <p className="mt-2 text-[#26332A]/60">
          Upload the documents required for{" "}
          <span className="font-semibold">
            {scholarship?.title}
          </span>
          .
        </p>

      </div>


      <div className="mb-7 grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#DDEBD8] bg-white p-5">
          <p className="text-sm text-[#26332A]/60">
            Required
          </p>

          <p className="mt-1 text-2xl font-bold text-[#26332A]">
            {scholarship?.requiredDocuments?.length || 0}
          </p>
        </div>

        <div className="rounded-2xl border border-[#DDEBD8] bg-[#DDEBD8] p-5">
          <p className="text-sm text-[#24823F]">
            Verified
          </p>

          <p className="mt-1 text-2xl font-bold text-[#185C2C]">
            {verifiedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#C76B45] bg-[#FBE8DF] p-5">
          <p className="text-sm text-[#C76B45]">
            Rejected
          </p>

          <p className="mt-1 text-2xl font-bold text-[#C76B45]">
            {rejectedCount}
          </p>
        </div>

      </div>


      <div className="space-y-4">

        {scholarship?.requiredDocuments?.map(
          (document) => {

            const uploaded =
              documents.find(
                (item) =>
                  item.type === document
              );

            return (
              <DocumentCard
                key={document}
                document={document}
                uploadedFile={uploaded}
                onUpload={(file) =>
                  handleUpload(
                    document,
                    file
                  )
                }
              />
            );
          }
        )}

      </div>


      {rejectedCount > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#FBE8DF] p-5 text-[#C76B45]">

          <AlertCircle
            size={20}
            className="mt-0.5"
          />

          <div>
            <p className="font-semibold">
              Document verification failed
            </p>

            <p className="mt-1 text-sm">
              Please re-upload the rejected documents before
              continuing.
            </p>
          </div>

        </div>
      )}


      <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#DDEBD8] bg-[#DDEBD8] p-6">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={22}
            className="mt-0.5 text-[#24823F]"
          />

          <div>
            <p className="font-semibold text-[#26332A]">
              AI/OCR Document Verification
            </p>

            <p className="mt-1 text-sm text-[#26332A]/60">
              Uploaded documents are checked before submission.
            </p>
          </div>

        </div>

        <button
          disabled={!allVerified}
          onClick={() =>
            navigate(
              `/student/verification/${applicationId}`
            )
          }
          className="hidden items-center gap-2 rounded-xl bg-[#24823F] px-5 py-3 text-sm font-bold text-white hover:bg-[#185C2C] disabled:cursor-not-allowed disabled:bg-[#DDEBD8] disabled:text-[#26332A]/50 sm:flex"
        >
          Continue
          <ArrowRight size={17} />
        </button>

      </div>

      <button
        disabled={!allVerified}
        onClick={() =>
          navigate(
            `/student/verification/${applicationId}`
          )
        }
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#24823F] px-5 py-3.5 font-bold text-white hover:bg-[#185C2C] disabled:cursor-not-allowed disabled:bg-[#DDEBD8] disabled:text-[#26332A]/50 sm:hidden"
      >
        Continue
        <ArrowRight size={17} />
      </button>

    </div>
  );
}

export default Documents;