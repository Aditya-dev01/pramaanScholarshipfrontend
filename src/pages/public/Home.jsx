import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  FileText,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import ScholarshipGrid from "../../components/ScholarshipGrid";
import { scholarships } from "../../data/scholarships";

function Home() {
  return (
    <div>

      {/* HERO */}

      <section className="overflow-hidden bg-gradient-to-br from-[#185C2C] via-[#24823F] to-[#185C2C]">

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-[#DDEBD8] ring-1 ring-white/20">
              <ShieldCheck size={16} />
              Secure Scholarship Application Platform
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find the right scholarship.
              <span className="block text-[#E5B84B]">
                Build your future.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#DDEBD8]">
              Discover scholarship opportunities, check eligibility,
              submit your documents and track your application from
              one simple platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFF8E7] px-6 py-3.5 font-bold text-[#185C2C] shadow-lg hover:bg-[#DDEBD8]"
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>

              <a
                href="#scholarships"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white hover:bg-white/20"
              >
                Explore Scholarships
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* SCHOLARSHIPS */}

      <section
        id="scholarships"
        className="bg-[#FFF8E7] py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#24823F]">
                Opportunities
              </span>

              <h2 className="mt-2 text-3xl font-bold text-[#26332A]">
                Available Scholarships
              </h2>

              <p className="mt-3 max-w-2xl text-[#26332A]/70">
                Explore scholarship programs and find opportunities
                that match your educational goals.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#26332A]/70">
              <Search size={17} />
              {scholarships.length} opportunities available
            </div>

          </div>

          <ScholarshipGrid scholarships={scholarships} />

        </div>
      </section>


      {/* ABOUT */}

      <section
        id="about"
        className="bg-white py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>

              <span className="text-sm font-bold uppercase tracking-wider text-[#24823F]">
                About ScholarConnect
              </span>

              <h2 className="mt-3 text-3xl font-bold text-[#26332A] sm:text-4xl">
                One platform for your scholarship journey
              </h2>

              <p className="mt-5 leading-7 text-[#26332A]/70">
                ScholarConnect brings scholarship discovery,
                applications, document verification and application
                tracking together in one place.
              </p>

              <div className="mt-7 space-y-4">

                {[
                  "Easy scholarship discovery",
                  "Simple online application process",
                  "Document verification workflow",
                  "Application status tracking",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      size={20}
                      className="text-[#24823F]"
                    />

                    <span className="font-medium text-[#26332A]">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            <div className="rounded-3xl bg-[#DDEBD8] p-8">

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <Search className="text-[#24823F]" />
                  <h3 className="mt-4 font-bold text-[#26332A]">
                    Discover
                  </h3>
                  <p className="mt-2 text-sm text-[#26332A]/70">
                    Find scholarships that match your profile.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <FileText className="text-[#C76B45]" />
                  <h3 className="mt-4 font-bold text-[#26332A]">
                    Apply
                  </h3>
                  <p className="mt-2 text-sm text-[#26332A]/70">
                    Complete your application online.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <ShieldCheck className="text-[#185C2C]" />
                  <h3 className="mt-4 font-bold text-[#26332A]">
                    Verify
                  </h3>
                  <p className="mt-2 text-sm text-[#26332A]/70">
                    Verify your supporting documents.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <CheckCircle className="text-[#E5B84B]" />
                  <h3 className="mt-4 font-bold text-[#26332A]">
                    Track
                  </h3>
                  <p className="mt-2 text-sm text-[#26332A]/70">
                    Follow your application status.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* APPLY PROCESS */}

      <section
        id="process"
        className="bg-[#FFF8E7] py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-wider text-[#24823F]">
              Application Process
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#26332A]">
              Apply in five simple steps
            </h2>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-5">

            {[
              ["01", "Discover", "Find a scholarship that suits you."],
              ["02", "Apply", "Complete your application form."],
              ["03", "Upload", "Submit the required documents."],
              ["04", "Verify", "Documents are checked."],
              ["05", "Track", "Monitor your application decision."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-[#DDEBD8] bg-white p-6"
              >
                <span className="text-sm font-bold text-[#24823F]">
                  {number}
                </span>

                <h3 className="mt-3 font-bold text-[#26332A]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#26332A]/70">
                  {description}
                </p>
              </div>
            ))}

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/apply-process"
              className="inline-flex items-center gap-2 font-semibold text-[#24823F] hover:text-[#185C2C]"
            >
              View complete process
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;