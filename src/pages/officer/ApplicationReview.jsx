import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  User,
  XCircle,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../../components/Modal";
import StatusBadge from "../../components/StatusBadge";
import {
  getApplication,
  updateApplication,
} from "../../data/applications";

function ApplicationReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState(() => getApplication(id));

  const [rejectOpen, setRejectOpen] =
    useState(false);

  const [comment, setComment] =
    useState("");

  useEffect(() => {
    const refresh = () => {
      setApplication(getApplication(id));
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
  }, [id]);

  if (!application) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Application not found.
      </div>
    );
  }


  const handleAccept = () => {
    updateApplication(id, {
      status: "Accepted",
      officerComment:
        "Application accepted after review.",
      decisionAt:
        new Date().toLocaleString(),
    });

    navigate("/officer/applications");
  };


  const handleReject = () => {

    if (!comment.trim()) {
      return;
    }

    updateApplication(id, {
      status: "Rejected",
      officerComment: comment,
      decisionAt:
        new Date().toLocaleString(),
    });

    setRejectOpen(false);

    navigate("/officer/applications");
  };


  return (
    <div className="mx-auto max-w-6xl">

      <Link
        to="/officer/applications"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#24823F]"
      >
        <ArrowLeft size={17} />
        Back to Applications
      </Link>


      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm text-[#26332A]/60">
            Application Review
          </p>

          <h1 className="mt-1 text-2xl font-bold text-[#26332A]">
            {application.scholarshipName}
          </h1>

          <p className="mt-1 text-sm text-[#26332A]/60">
            {application.id}
          </p>
        </div>

        <StatusBadge
          status={application.status}
        />

      </div>


      <div className="grid gap-7 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          {/* Applicant */}

          <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DDEBD8] text-[#24823F]">
                <User size={20} />
              </div>

              <h2 className="font-bold text-[#26332A]">
                Applicant Information
              </h2>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <Info
                label="Full Name"
                value={application.formData?.fullName}
              />

              <Info
                label="Email"
                value={application.formData?.email}
              />

              <Info
                label="Phone"
                value={application.formData?.phone}
              />

              <Info
                label="Date of Birth"
                value={application.formData?.dob}
              />

              <Info
                label="Gender"
                value={application.formData?.gender}
              />

              <Info
                label="Category"
                value={application.formData?.category}
              />

              <Info
                label="Institution"
                value={application.formData?.institution}
              />

              <Info
                label="Course"
                value={application.formData?.course}
              />

              <Info
                label="Year"
                value={application.formData?.year}
              />

              <Info
                label="Annual Income"
                value={application.formData?.annualIncome}
              />

            </div>

          </section>


          {/* Statement */}

          <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

            <h2 className="font-bold text-[#26332A]">
              Student Statement
            </h2>

            <p className="mt-4 rounded-xl bg-[#FFF8E7] p-5 text-sm leading-7 text-[#26332A]/70">
              {application.formData?.statement || "-"}
            </p>

          </section>


          {/* Documents */}

          <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DDEBD8] text-[#24823F]">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#26332A]">
                  Uploaded Documents
                </h2>

                <p className="text-sm text-[#26332A]/60">
                  Review document verification results.
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
                      <p className="font-semibold text-[#26332A]">
                        {document.type}
                      </p>

                      <p className="mt-1 text-xs text-[#26332A]/50">
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

        </div>


        {/* Decision panel */}

        <div>

          <div className="sticky top-24 rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-[#26332A]">
              Application Decision
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#26332A]/60">
              Review the student's information and verified documents
              before making a decision.
            </p>

            <div className="mt-6 space-y-3">

              <button
                onClick={handleAccept}
                disabled={
                  application.status === "Accepted" ||
                  application.status === "Rejected"
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#24823F] px-5 py-3.5 font-bold text-white hover:bg-[#185C2C] disabled:cursor-not-allowed disabled:bg-[#DDEBD8] disabled:text-[#26332A]/50"
              >
                <CheckCircle size={18} />
                Accept Application
              </button>

              <button
                onClick={() => setRejectOpen(true)}
                disabled={
                  application.status === "Accepted" ||
                  application.status === "Rejected"
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#C76B45] bg-[#FBE8DF] px-5 py-3.5 font-bold text-[#C76B45] hover:bg-[#F3D5C8] disabled:cursor-not-allowed disabled:bg-[#DDEBD8] disabled:text-[#26332A]/50"
              >
                <XCircle size={18} />
                Reject Application
              </button>

            </div>

            {application.officerComment && (
              <div className="mt-6 rounded-xl bg-[#FFF8E7] p-4">

                <p className="text-xs font-bold uppercase tracking-wider text-[#26332A]/50">
                  Decision Comment
                </p>

                <p className="mt-2 text-sm leading-6 text-[#26332A]/70">
                  {application.officerComment}
                </p>

              </div>
            )}

          </div>

        </div>

      </div>


      <Modal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title="Reject Application"
      >

        <p className="text-sm leading-6 text-[#26332A]/60">
          Please provide a reason for rejecting this application.
          The student will be able to see this comment.
        </p>

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          rows={5}
          placeholder="Enter rejection reason..."
          className="mt-5 w-full rounded-xl border border-[#DDEBD8] px-4 py-3 text-sm focus:border-[#C76B45] focus:ring-4 focus:ring-[#FBE8DF]"
        />

        <div className="mt-5 flex justify-end gap-3">

          <button
            onClick={() => setRejectOpen(false)}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#26332A]/70 hover:bg-[#DDEBD8]"
          >
            Cancel
          </button>

          <button
            onClick={handleReject}
            disabled={!comment.trim()}
            className="rounded-lg bg-[#C76B45] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#A95232] disabled:bg-[#DDEBD8] disabled:text-[#26332A]/50"
          >
            Confirm Rejection
          </button>

        </div>

      </Modal>

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

export default ApplicationReview;