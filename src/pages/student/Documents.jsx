
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  GraduationCap,
  Calendar,
  Users,
  Wallet,
  Info,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Stepper from "../../components/Stepper";
import DocumentCard from "../../components/DocumentCard";
import {
  getApplication,
  updateApplication,
} from "../../data/applications";
import { getScholarshipById } from "../../data/scholarships";

// Common documents required for scholarship applications
const DEFAULT_DOCUMENTS = [
  "Aadhaar Card",
  "Category / Minority Certificate",
  "Income Certificate",
  "10th Marksheet",
  "Date of Birth Proof",
  "Bank Passbook",
  "Domicile Certificate",
  "Passport Size Photograph",
];

// Remove duplicate document names
const getRequiredDocuments = (scholarship) => {
  const scholarshipDocuments =
    scholarship?.requiredDocuments || [];

  return [
    ...new Set([
      ...DEFAULT_DOCUMENTS,
      ...scholarshipDocuments,
    ]),
  ];
};

function Documents() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(
    () => getApplication(applicationId)
  );

  useEffect(() => {
    const refresh = () => {
      setApplication(getApplication(applicationId));
    };

    window.addEventListener("applicationsUpdated", refresh);

    return () => {
      window.removeEventListener(
        "applicationsUpdated",
        refresh
      );
    };
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

  const requiredDocuments =
    getRequiredDocuments(scholarship);

  // Scholarship eligibility criteria
  const education =
    scholarship?.min_education_level ||
    scholarship?.minEducationLevel ||
    "10th";

  const marks =
    scholarship?.min_passing_percentage ??
    scholarship?.minPassingPercentage ??
    70;

  const maxAge =
    scholarship?.max_age ??
    scholarship?.maxAge ??
    30;

  const category =
    scholarship?.category ||
    scholarship?.minority_category ||
    scholarship?.minorityCategory ||
    "Muslim";

  const maxIncome =
    scholarship?.max_income ??
    scholarship?.maxIncome;

  // Upload document
  const handleUpload = (documentName, file) => {
    const latest = getApplication(applicationId);

    if (!latest) return;

    const existingDocuments = latest.documents || [];

    const updatedDocuments = existingDocuments.filter(
      (document) => document.type !== documentName
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

    setApplication(getApplication(applicationId));

    // Demo verification.
    // Replace this section with your backend AI/OCR API.
    setTimeout(() => {
      const current = getApplication(applicationId);

      if (!current) return;

      const checkedDocuments = (
        current.documents || []
      ).map((document) => {
        if (document.type !== documentName) {
          return document;
        }

        const suspicious =
          /tampered|fake|edited|modified/i.test(
            document.name
          );

        return {
          ...document,
          status: suspicious ? "Rejected" : "Verified",
          checkedAt: new Date().toLocaleString(),
        };
      });

      updateApplication(applicationId, {
        documents: checkedDocuments,
      });

      setApplication(getApplication(applicationId));
    }, 1200);
  };

  const verifiedCount = documents.filter(
    (document) => document.status === "Verified"
  ).length;

  const rejectedCount = documents.filter(
    (document) => document.status === "Rejected"
  ).length;

  const checkingCount = documents.filter(
    (document) => document.status === "Checking"
  ).length;

  const allVerified = requiredDocuments.every(
    (requiredDocument) =>
      documents.some(
        (document) =>
          document.type === requiredDocument &&
          document.status === "Verified"
      )
  );

  const handleContinue = () => {
    if (!allVerified) return;

    navigate(
      `/student/verification/${applicationId}`
    );
  };

  return (
    <div className="mx-auto max-w-5xl">

      {/* Progress Stepper */}
      <Stepper currentStep={3} />

      {/* Page Heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#9BB06D]">
          STEP 3 OF 4
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#293127]">
          Upload Required Documents
        </h1>

        <p className="mt-2 text-[#293127]/60">
          Upload all necessary documents to verify your
          scholarship application for{" "}
          <span className="font-semibold text-[#657A3F]">
            {scholarship?.title || "this scholarship"}
          </span>.
        </p>
      </div>

      {/* Eligibility Criteria */}
      <div className="mb-8 rounded-2xl border border-[#E8EEDB] bg-white p-6">

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-[#E8EEDB] p-3">
            <GraduationCap
              size={24}
              className="text-[#657A3F]"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#293127]">
              Scholarship Eligibility Criteria
            </h2>

            <p className="text-sm text-[#293127]/60">
              Check the eligibility requirements before uploading.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-3 rounded-xl bg-[#F4F7EF] p-4">
            <GraduationCap
              size={22}
              className="text-[#657A3F]"
            />

            <div>
              <p className="text-xs text-[#293127]/60">
                Minimum Education
              </p>

              <p className="font-semibold text-[#293127]">
                {education}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F4F7EF] p-4">
            <FileCheck
              size={22}
              className="text-[#657A3F]"
            />

            <div>
              <p className="text-xs text-[#293127]/60">
                Minimum Marks
              </p>

              <p className="font-semibold text-[#293127]">
                {marks}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F4F7EF] p-4">
            <Calendar
              size={22}
              className="text-[#657A3F]"
            />

            <div>
              <p className="text-xs text-[#293127]/60">
                Maximum Age
              </p>

              <p className="font-semibold text-[#293127]">
                {maxAge} Years
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F4F7EF] p-4">
            <Users
              size={22}
              className="text-[#657A3F]"
            />

            <div>
              <p className="text-xs text-[#293127]/60">
                Required Category
              </p>

              <p className="font-semibold text-[#293127]">
                {category}
              </p>
            </div>
          </div>

          {maxIncome != null && (
            <div className="flex items-center gap-3 rounded-xl bg-[#F4F7EF] p-4 sm:col-span-2">
              <Wallet
                size={22}
                className="text-[#657A3F]"
              />

              <div>
                <p className="text-xs text-[#293127]/60">
                  Maximum Annual Family Income
                </p>

                <p className="font-semibold text-[#293127]">
                  ₹{Number(maxIncome).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}

        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#FFF8E7] p-4 text-sm text-[#293127]/70">
          <Info
            size={18}
            className="mt-0.5 shrink-0 text-[#B9684B]"
          />

          <p>
            Make sure your uploaded documents support the
            eligibility information provided in your application.
            Incorrect information may result in rejection.
          </p>
        </div>

      </div>

      {/* Document Statistics */}
      <div className="mb-7 grid gap-4 sm:grid-cols-4">

        <div className="rounded-2xl border border-[#E8EEDB] bg-white p-5">
          <p className="text-sm text-[#293127]/60">
            Required
          </p>

          <p className="mt-1 text-2xl font-bold text-[#293127]">
            {requiredDocuments.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8EEDB] bg-[#E8EEDB] p-5">
          <p className="text-sm text-[#657A3F]">
            Verified
          </p>

          <p className="mt-1 text-2xl font-bold text-[#526332]">
            {verifiedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#E8EEDB] bg-[#F4F7EF] p-5">
          <p className="text-sm text-[#657A3F]">
            Checking
          </p>

          <p className="mt-1 text-2xl font-bold text-[#657A3F]">
            {checkingCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#B9684B]/30 bg-[#F7E7DF] p-5">
          <p className="text-sm text-[#B9684B]">
            Rejected
          </p>

          <p className="mt-1 text-2xl font-bold text-[#B9684B]">
            {rejectedCount}
          </p>
        </div>

      </div>

      {/* Required Documents */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#293127]">
          Required Documents
        </h2>

        <p className="mt-1 text-sm text-[#293127]/60">
          Upload clear and readable documents in PDF, JPG or PNG format.
        </p>
      </div>

      <div className="space-y-4">

        {requiredDocuments.map((document) => {
          const uploaded = documents.find(
            (item) => item.type === document
          );

          return (
            <DocumentCard
              key={document}
              document={document}
              uploadedFile={uploaded}
              onUpload={(file) =>
                handleUpload(document, file)
              }
            />
          );
        })}

      </div>

      {/* Rejected Document Warning */}
      {rejectedCount > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#F7E7DF] p-5 text-[#B9684B]">

          <AlertCircle
            size={22}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Document Verification Failed
            </p>

            <p className="mt-1 text-sm">
              Some documents could not be verified.
              Please upload valid and original documents again.
            </p>
          </div>

        </div>
      )}

      {/* Upload Progress */}
      <div className="mt-6 rounded-2xl border border-[#E8EEDB] bg-white p-5">

        <div className="mb-2 flex justify-between text-sm">
          <span className="font-semibold text-[#293127]">
            Upload Progress
          </span>

          <span className="font-bold text-[#657A3F]">
            {verifiedCount}/{requiredDocuments.length}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#E8EEDB]">
          <div
            className="h-full rounded-full bg-[#657A3F] transition-all duration-500"
            style={{
              width: `${
                requiredDocuments.length
                  ? (verifiedCount / requiredDocuments.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>

      </div>

      {/* AI/OCR Verification */}
      <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-[#E8EEDB] bg-[#E8EEDB] p-6 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={25}
            className="mt-0.5 shrink-0 text-[#657A3F]"
          />

          <div>
            <p className="font-bold text-[#293127]">
              PramaanAI - AI/OCR Document Verification
            </p>

            <p className="mt-1 text-sm text-[#293127]/60">
              Your uploaded documents will be checked for
              authenticity and verification before submission.
            </p>

            <p className="mt-2 text-sm font-semibold text-[#657A3F]">
              {allVerified
                ? "All required documents verified successfully."
                : `${requiredDocuments.length - verifiedCount} document(s) remaining.`}
            </p>
          </div>

        </div>

        <button
          disabled={!allVerified}
          onClick={handleContinue}
          className="hidden shrink-0 items-center gap-2 rounded-xl bg-[#9BB06D] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#657A3F] disabled:cursor-not-allowed disabled:bg-[#E8EEDB] disabled:text-[#293127]/50 sm:flex"
        >
          Continue
          <ArrowRight size={17} />
        </button>

      </div>

      {/* Mobile Continue Button */}
      <button
        disabled={!allVerified}
        onClick={handleContinue}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9BB06D] px-5 py-3.5 font-bold text-white transition hover:bg-[#657A3F] disabled:cursor-not-allowed disabled:bg-[#E8EEDB] disabled:text-[#293127]/50 sm:hidden"
      >
        Continue
        <ArrowRight size={17} />
      </button>

    </div>
  );
}

export default Documents;
