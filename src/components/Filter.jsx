import { SlidersHorizontal } from "lucide-react";

function Filter({ value, onChange, options = [] }) {
  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal
        size={18}
        className="text-[#293127]/50"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-[#E8EEDB] bg-white px-4 py-3 text-sm font-medium text-[#293127] shadow-sm focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB]"
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