import { SlidersHorizontal } from "lucide-react";

function Filter({ value, onChange, options = [] }) {
  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal
        size={18}
        className="text-[#26332A]/50"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-[#DDEBD8] bg-white px-4 py-3 text-sm font-medium text-[#26332A] shadow-sm focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
      >
        <option value="all">All Types</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;