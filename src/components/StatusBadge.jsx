function StatusBadge({ status }) {
  const styles = {
    Draft: "bg-[#DDEBD8] text-[#26332A]",
    Pending: "bg-[#FFF8E7] text-[#E5B84B]",
    "Under Review": "bg-[#DDEBD8] text-[#24823F]",
    Accepted: "bg-[#DDEBD8] text-[#24823F]",
    Rejected: "bg-[#FBE8DF] text-[#C76B45]",
    Verified: "bg-[#DDEBD8] text-[#24823F]",
    Checking: "bg-[#FFF8E7] text-[#E5B84B]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-[#DDEBD8] text-[#26332A]"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;