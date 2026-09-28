import {
  ShieldCheck,
  Search,
  FileCheck2,
  BarChart3,
} from "lucide-react";

function About() {
  return (
    <div>

      <section className="bg-blue-700 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
            About Us
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Making scholarship applications simpler
          </h1>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            ScholarConnect provides a centralized digital workflow
            for students and scholarship officers.
          </p>

        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Search,
                title: "Discover",
                text: "Find scholarship opportunities in one place.",
              },
              {
                icon: FileCheck2,
                title: "Apply",
                text: "Complete and submit applications online.",
              },
              {
                icon: ShieldCheck,
                title: "Verify",
                text: "Check supporting documents through a verification workflow.",
              },
              {
                icon: BarChart3,
                title: "Track",
                text: "Monitor applications and decisions.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              );
            })}

          </div>

        </div>
      </section>

    </div>
  );
}

export default About;