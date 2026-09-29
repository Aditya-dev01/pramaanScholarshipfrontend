function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-[#E8EEDB] text-[#293127]",
    Pending: "bg-[#FFF8E7] text-[#E5B84B]",
    "Under Review": "bg-[#E8EEDB] text-[#9BB06D]",
    Accepted: "bg-[#E8EEDB] text-[#9BB06D]",
    Rejected: "bg-[#F7E7DF] text-[#B9684B]",
    Verified: "bg-[#E8EEDB] text-[#9BB06D]",
    Checking: "bg-[#FFF8E7] text-[#E5B84B]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-[#E8EEDB] text-[#293127]"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;