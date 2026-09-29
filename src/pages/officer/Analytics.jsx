import AnalyticsChart from "../../components/AnalyticsChart";

export default function Analytic() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#9BB06D]">
            Analytics
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#293127] md:text-3xl">
            Application Analytics
          </h1>

          <p className="mt-2 text-sm text-[#293127]/60 md:text-base">
            Overview of scholarship application activity.
          </p>
        </div>

        {/* Analytics Chart */}
        <div className="mb-6 rounded-2xl border border-[#E8EEDB] bg-white p-5 shadow-sm md:p-6">
          <AnalyticsChart />
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Applications */}
          <div className="rounded-2xl border border-[#E8EEDB] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#293127]/60">
              Applications
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#293127]">
              1,250
            </h2>

            <p className="mt-2 text-xs text-[#293127]/60">
              Total applications
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-[#E5B84B] bg-[#FFF8E7] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#E5B84B]">
              Pending
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#293127]">
              320
            </h2>

            <p className="mt-2 text-xs text-[#E5B84B]">
              Applications awaiting review
            </p>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl border border-[#E8EEDB] bg-[#E8EEDB] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#9BB06D]">
              Accepted
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#657A3F]">
              780
            </h2>

            <p className="mt-2 text-xs text-[#9BB06D]">
              Approved applications
            </p>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-[#B9684B] bg-[#F7E7DF] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#B9684B]">
              Rejected
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#293127]">
              150
            </h2>

            <p className="mt-2 text-xs text-[#B9684B]">
              Rejected applications
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}