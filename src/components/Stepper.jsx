function Stepper({ currentStep }) {
  const steps = [
    "Scholarship",
    "Application",
    "Documents",
    "Verification",
    "Submit",
  ];

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex min-w-[600px] items-center justify-between">

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber <= currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    active
                      ? "bg-[#24823F] text-white"
                      : "bg-[#DDEBD8] text-[#26332A]/50"
                  }`}
                >
                  {stepNumber}
                </div>

                <span
                  className={`mt-2 text-xs font-medium ${
                    active
                      ? "text-[#24823F]"
                      : "text-[#26332A]/50"
                  }`}
                >
                  {step}
                </span>

              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded ${
                    stepNumber < currentStep
                      ? "bg-[#24823F]"
                      : "bg-[#DDEBD8]"
                  }`}
                />
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Stepper;