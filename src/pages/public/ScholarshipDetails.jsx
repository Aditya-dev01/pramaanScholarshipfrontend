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
        <h1 className="text-3xl font-bold text-[#293127]">
          Scholarship not found
        </h1>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-[#9BB06D]"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E7]">

      <section className="bg-[#657A3F] py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#E8EEDB] hover:text-white"
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

          <p className="mt-4 text-[#E8EEDB]">
            Provided by {scholarship.provider}
          </p>

        </div>
      </section>


      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">

          <div className="space-y-8 lg:col-span-2">

            <div className="rounded-2xl border border-[#E8EEDB] bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#293127]">
                About the Scholarship
              </h2>

              <p className="mt-4 leading-7 text-[#293127]/70">
                {scholarship.description}
              </p>

            </div>


            <div className="rounded-2xl border border-[#E8EEDB] bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#293127]">
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
                        className="mt-0.5 shrink-0 text-[#9BB06D]"
                      />

                      <p className="text-sm leading-6 text-[#293127]/70">
                        {item}
                      </p>
                    </div>
                  )
                )}

              </div>

            </div>


            <div className="rounded-2xl border border-[#E8EEDB] bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#293127]">
                Required Documents
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {scholarship.requiredDocuments.map(
                  (document) => (
                    <div
                      key={document}
                      className="flex items-center gap-3 rounded-xl bg-[#E8EEDB] p-4"
                    >
                      <FileText
                        size={18}
                        className="text-[#9BB06D]"
                      />

                      <span className="text-sm font-medium text-[#293127]">
                        {document}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>

          </div>


          <div>

            <div className="sticky top-24 rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-[#293127]">
                Scholarship Summary
              </h3>

              <div className="mt-6 space-y-5">

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#E8EEDB] p-2 text-[#9BB06D]">
                    <IndianRupee size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-[#293127]/50">
                      Award Amount
                    </p>

                    <p className="font-bold text-[#293127]">
                      ₹
                      {Number(
                        scholarship.amount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#FFF8E7] p-2 text-[#B9684B]">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-[#293127]/50">
                      Deadline
                    </p>

                    <p className="font-bold text-[#293127]">
                      {scholarship.deadline}
                    </p>
                  </div>
                </div>

              </div>

              <Link
                to={`/login?scholarship=${scholarship.id}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#9BB06D] px-5 py-3.5 font-bold text-white hover:bg-[#657A3F]"
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