import {
  Search,
  UserPlus,
  FileText,
  Upload,
  ShieldCheck,
  Send,
  CheckCircle,
} from "lucide-react";

function ApplyProcess() {
  const steps = [
    {
      icon: Search,
      title: "Discover Scholarship",
      text: "Browse available scholarships and select an opportunity that matches your eligibility.",
    },
    {
      icon: UserPlus,
      title: "Register / Login",
      text: "Create your student account or log in to your existing account.",
    },
    {
      icon: FileText,
      title: "Complete Application",
      text: "Enter your personal, academic and financial information.",
    },
    {
      icon: Upload,
      title: "Upload Documents",
      text: "Upload all required supporting documents.",
    },
    {
      icon: ShieldCheck,
      title: "AI/OCR Verification",
      text: "The document verification workflow checks uploaded files.",
    },
    {
      icon: Send,
      title: "Submit Application",
      text: "After successful verification, submit the completed application.",
    },
    {
      icon: CheckCircle,
      title: "Track Decision",
      text: "Monitor your application status from your student dashboard.",
    },
  ];

  return (
    <div>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
            How It Works
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Scholarship application process
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Follow the complete workflow from scholarship discovery
            to application decision.
          </p>

        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">

          <div className="space-y-5">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={23} />
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Step {index + 1}
                    </div>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      {step.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {step.text}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

    </div>
  );
}

export default ApplyProcess;