import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  IndianRupee,
  CheckCircle,
  FileText,
} from "lucide-react";

import { getScholarshipById } from "../../data/scholarships";

function ScholarshipDetails() {
  const { id } = useParams();
  const scholarship = getScholarshipById(id);

  if (!scholarship) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#26332A]">
          Scholarship not found
        </h1>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-[#24823F]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E7]">

      <section className="bg-[#185C2C] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#DDEBD8] hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to scholarships
          </Link>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            {scholarship.type}
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold">
            {scholarship.title}
          </h1>

          <p className="mt-4 text-[#DDEBD8]">
            Provided by {scholarship.provider}
          </p>

        </div>
      </section>


      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">

          <div className="space-y-8 lg:col-span-2">

            <div className="rounded-2xl border border-[#DDEBD8] bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#26332A]">
                About the Scholarship
              </h2>

              <p className="mt-4 leading-7 text-[#26332A]/70">
                {scholarship.description}
              </p>

            </div>


            <div className="rounded-2xl border border-[#DDEBD8] bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#26332A]">
                Eligibility Criteria
              </h2>

              <div className="mt-5 space-y-4">

                {scholarship.eligibility.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle
                        size={19}
                        className="mt-0.5 shrink-0 text-[#24823F]"
                      />

                      <p className="text-sm leading-6 text-[#26332A]/70">
                        {item}
                      </p>
                    </div>
                  )
                )}

              </div>

            </div>


            <div className="rounded-2xl border border-[#DDEBD8] bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#26332A]">
                Required Documents
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {scholarship.requiredDocuments.map(
                  (document) => (
                    <div
                      key={document}
                      className="flex items-center gap-3 rounded-xl bg-[#DDEBD8] p-4"
                    >
                      <FileText
                        size={18}
                        className="text-[#24823F]"
                      />

                      <span className="text-sm font-medium text-[#26332A]">
                        {document}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>

          </div>


          <div>

            <div className="sticky top-24 rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-[#26332A]">
                Scholarship Summary
              </h3>

              <div className="mt-6 space-y-5">

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#DDEBD8] p-2 text-[#24823F]">
                    <IndianRupee size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-[#26332A]/50">
                      Award Amount
                    </p>

                    <p className="font-bold text-[#26332A]">
                      ₹
                      {Number(
                        scholarship.amount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#FFF8E7] p-2 text-[#C76B45]">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-[#26332A]/50">
                      Deadline
                    </p>

                    <p className="font-bold text-[#26332A]">
                      {scholarship.deadline}
                    </p>
                  </div>
                </div>

              </div>

              <Link
                to={`/login?scholarship=${scholarship.id}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#24823F] px-5 py-3.5 font-bold text-white hover:bg-[#185C2C]"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default ScholarshipDetails;