import AnalyticsChart from "../../components/AnalyticsChart";

export default function Analytic() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Analytics
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Application Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Overview of scholarship application activity.
          </p>
        </div>

        {/* Analytics Chart */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <AnalyticsChart />
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Applications */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">
              Applications
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              1,250
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              Total applications
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-amber-700">
              Pending
            </p>

            <h2 className="mt-2 text-3xl font-bold text-amber-900">
              320
            </h2>

            <p className="mt-2 text-xs text-amber-700">
              Applications awaiting review
            </p>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-green-700">
              Accepted
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-900">
              780
            </h2>

            <p className="mt-2 text-xs text-green-700">
              Approved applications
            </p>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-medium text-red-700">
              Rejected
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-900">
              150
            </h2>

            <p className="mt-2 text-xs text-red-700">
              Rejected applications
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}