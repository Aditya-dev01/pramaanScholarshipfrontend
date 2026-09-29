function AnalyticsChart({ data }) {
  const items = [
    {
      label: "Pending",
      value: data.pending,
      className: "bg-[#E5B84B]",
    },
    {
      label: "Accepted",
      value: data.accepted,
      className: "bg-[#9BB06D]",
    },
    {
      label: "Rejected",
      value: data.rejected,
      className: "bg-[#B9684B]",
    },
  ];

  const max = Math.max(
    ...items.map((item) => item.value),
    1
  );

  return (
    <div className="rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#293127]">
          Application Analytics
        </h3>

        <p className="mt-1 text-sm text-[#293127]/60">
          Current application distribution
        </p>
      </div>

      <div className="space-y-6">

        {items.map((item) => {
          const width =
            item.value === 0
              ? 0
              : Math.max(
                  (item.value / max) * 100,
                  5
                );

          return (
            <div key={item.label}>

              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-[#293127]/70">
                  {item.label}
                </span>

                <span className="font-bold text-[#293127]">
                  {item.value}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#E8EEDB]">
                <div
                  className={`h-full rounded-full ${item.className}`}
                  style={{ width: `${width}%` }}
                />
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default AnalyticsChart;