import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  GraduationCap,
  User,
  ShieldCheck,
} from "lucide-react";

import Stepper from "../../components/Stepper";

export default function ApplicationReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    if (!confirmed) {
      alert(
        "Please confirm that all the information provided is correct."
      );
      return;
    }

    alert(
      "Application submitted successfully! Application ID: SCH-NEW-001"
    );

    navigate("/student/applications");
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Stepper */}
        <div className="mb-8 rounded-2xl border border-[#DDEBD8] bg-white p-4 shadow-sm md:p-6">
          <Stepper currentStep={5} />
        </div>

        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() =>
              navigate(`/student/apply/${id}/documents`)
            }
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#26332A]/70 transition hover:text-[#24823F]"
          >
            <ArrowLeft size={17} />
            Back to Documents
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-[#26332A] md:text-3xl">
            Review Application
          </h1>

          <p className="mt-2 text-sm text-[#26332A]/60 md:text-base">
            Review all the information and documents carefully before
            submitting your scholarship application.
          </p>
        </div>

        {/* Application ID */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#DDEBD8] bg-[#DDEBD8] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#24823F]">
              Application
            </p>

            <p className="mt-1 text-lg font-bold text-[#185C2C]">
              SCH-NEW-001
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#24823F] shadow-sm">
            <ShieldCheck size={17} />
            Ready for Review
          </div>
        </div>

        <div className="space-y-6">

          {/* Personal Information */}
          <section className="overflow-hidden rounded-2xl border border-[#DDEBD8] bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-[#DDEBD8] px-5 py-5 md:px-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDEBD8] text-[#24823F]">
                <User size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#26332A]">
                  Personal Information
                </h2>

                <p className="text-sm text-[#26332A]/60">
                  Your basic personal details
                </p>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 md:p-6 lg:grid-cols-4">
              <InfoItem
                label="Full Name"
                value="Rahul Kumar"
              />

              <InfoItem
                label="Date of Birth"
                value="12 May 2005"
              />

              <InfoItem
                label="Email"
                value="student@gmail.com"
              />

              <InfoItem
                label="Mobile"
                value="9876543210"
              />
            </div>
          </section>

          {/* Education */}
          <section className="overflow-hidden rounded-2xl border border-[#DDEBD8] bg-white shadow-sm">
            <div className="flex items-center gap-4 border-b border-[#DDEBD8] px-5 py-5 md:px-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDEBD8] text-[#24823F]">
                <GraduationCap size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#26332A]">
                  Education
                </h2>

                <p className="text-sm text-[#26332A]/60">
                  Your academic information
                </p>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-6">
              <InfoItem
                label="College / University"
                value="XYZ University"
              />

              <InfoItem
                label="Course"
                value="B.Tech"
              />

              <InfoItem
                label="Percentage"
                value="84%"
              />
            </div>
          </section>

          {/* Documents */}
          <section className="overflow-hidden rounded-2xl border border-[#DDEBD8] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DDEBD8] px-5 py-5 md:px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DDEBD8] text-[#24823F]">
                  <FileText size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#26332A]">
                    Documents
                  </h2>

                  <p className="text-sm text-[#26332A]/60">
                    Documents uploaded for verification
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-[#DDEBD8] px-3 py-1.5 text-xs font-semibold text-[#24823F] sm:flex">
                <CheckCircle size={15} />
                Verified
              </div>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-6">
              <DocumentItem title="Aadhaar Card" />
              <DocumentItem title="Marksheet" />
              <DocumentItem title="Income Certificate" />
              <DocumentItem title="Bank Passbook" />
            </div>
          </section>

          {/* Confirmation */}
          <section className="rounded-2xl border border-[#E5B84B] bg-[#FFF8E7] p-5 md:p-6">
            <div className="flex items-start gap-4">
              <input
                id="confirmation"
                type="checkbox"
                checked={confirmed}
                onChange={(e) =>
                  setConfirmed(e.target.checked)
                }
                className="mt-1 h-5 w-5 cursor-pointer rounded border-[#DDEBD8] text-[#24823F] focus:ring-[#DDEBD8]"
              />

              <label
                htmlFor="confirmation"
                className="cursor-pointer"
              >
                <p className="font-semibold text-[#26332A]">
                  Declaration & Confirmation
                </p>

                <p className="mt-1 text-sm leading-6 text-[#26332A]/70">
                  I confirm that all information provided in this
                  application is true and correct to the best of my
                  knowledge. I understand that providing incorrect or
                  fraudulent information may result in rejection of my
                  scholarship application.
                </p>
              </label>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#DDEBD8] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/student/apply/${id}/documents`
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDEBD8] bg-white px-5 py-3 text-sm font-semibold text-[#26332A]/70 shadow-sm transition hover:bg-[#FFF8E7] hover:border-[#24823F]"
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!confirmed}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition ${
                confirmed
                  ? "bg-[#24823F] hover:bg-[#185C2C] hover:shadow-md"
                  : "cursor-not-allowed bg-[#DDEBD8] text-[#26332A]/50"
              }`}
            >
              Submit Application
              <ArrowRight size={17} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Reusable Information Component
------------------------------ */

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-[#FFF8E7] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#26332A]/60">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-semibold text-[#26332A]">
        {value}
      </p>
    </div>
  );
}

/* -----------------------------
   Document Component
------------------------------ */

function DocumentItem({ title }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#DDEBD8] bg-[#FFF8E7] p-4 transition hover:border-[#24823F] hover:bg-[#DDEBD8]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#24823F] shadow-sm">
          <FileText size={19} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#26332A]">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-[#26332A]/60">
            Document verified successfully
          </p>
        </div>
      </div>

      <div className="ml-3 flex shrink-0 items-center gap-1.5 rounded-full bg-[#DDEBD8] px-2.5 py-1.5 text-xs font-semibold text-[#24823F]">
        <CheckCircle size={14} />
        <span className="hidden sm:inline">
          Verified
        </span>
      </div>
    </div>
  );
}