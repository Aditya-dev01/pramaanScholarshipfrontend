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
        <h1 className="text-3xl font-bold text-slate-900">
          Scholarship not found
        </h1>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">

      <section className="bg-blue-700 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"
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

          <p className="mt-4 text-blue-100">
            Provided by {scholarship.provider}
          </p>

        </div>
      </section>


      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">

          <div className="space-y-8 lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                About the Scholarship
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {scholarship.description}
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
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
                        className="mt-0.5 shrink-0 text-green-500"
                      />

                      <p className="text-sm leading-6 text-slate-600">
                        {item}
                      </p>
                    </div>
                  )
                )}

              </div>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Required Documents
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {scholarship.requiredDocuments.map(
                  (document) => (
                    <div
                      key={document}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <FileText
                        size={18}
                        className="text-blue-600"
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {document}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>

          </div>


          <div>

            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-slate-900">
                Scholarship Summary
              </h3>

              <div className="mt-6 space-y-5">

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-50 p-2 text-green-600">
                    <IndianRupee size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Award Amount
                    </p>

                    <p className="font-bold text-slate-900">
                      ₹
                      {Number(
                        scholarship.amount
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-50 p-2 text-orange-600">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Deadline
                    </p>

                    <p className="font-bold text-slate-900">
                      {scholarship.deadline}
                    </p>
                  </div>
                </div>

              </div>

              <Link
                to={`/login?scholarship=${scholarship.id}`}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white hover:bg-blue-700"
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