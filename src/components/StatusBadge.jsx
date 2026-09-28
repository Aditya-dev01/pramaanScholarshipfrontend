function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-slate-100 text-slate-700",
    Pending: "bg-amber-100 text-amber-700",
    "Under Review": "bg-blue-100 text-blue-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Verified: "bg-green-100 text-green-700",
    Checking: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;