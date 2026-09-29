function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  iconClass = "bg-[#E8EEDB] text-[#9BB06D]",
}) {
  return (
    <div className="rounded-2xl border border-[#E8EEDB] bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-[#293127]/60">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#293127]">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-[#293127]/50">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon size={21} />
          </div>
        )}

      </div>

    </div>
  );
}

export default DashboardCard;