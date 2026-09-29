function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  iconClass = "bg-[#DDEBD8] text-[#24823F]",
}) {
  return (
    <div className="rounded-2xl border border-[#DDEBD8] bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-[#26332A]/60">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#26332A]">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-[#26332A]/50">
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