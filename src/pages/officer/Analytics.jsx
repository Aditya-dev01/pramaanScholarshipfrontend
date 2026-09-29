import AnalyticsChart from "../../components/AnalyticsChart";

export default function Analytic() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#24823F]">
            Analytics
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#26332A] md:text-3xl">
            Application Analytics
          </h1>

          <p className="mt-2 text-sm text-[#26332A]/60 md:text-base">
            Overview of scholarship application activity.
          </p>
        </div>

        {/* Analytics Chart */}
        <div className="mb-6 rounded-2xl border border-[#DDEBD8] bg-white p-5 shadow-sm md:p-6">
          <AnalyticsChart />
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Applications */}
          <div className="rounded-2xl border border-[#DDEBD8] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#26332A]/60">
              Applications
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#26332A]">
              1,250
            </h2>

            <p className="mt-2 text-xs text-[#26332A]/60">
              Total applications
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-[#E5B84B] bg-[#FFF8E7] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#E5B84B]">
              Pending
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#26332A]">
              320
            </h2>

            <p className="mt-2 text-xs text-[#E5B84B]">
              Applications awaiting review
            </p>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl border border-[#DDEBD8] bg-[#DDEBD8] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#24823F]">
              Accepted
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#185C2C]">
              780
            </h2>

            <p className="mt-2 text-xs text-[#24823F]">
              Approved applications
            </p>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-[#C76B45] bg-[#FBE8DF] p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-[#C76B45]">
              Rejected
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#26332A]">
              150
            </h2>

            <p className="mt-2 text-xs text-[#C76B45]">
              Rejected applications
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}