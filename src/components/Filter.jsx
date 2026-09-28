import { SlidersHorizontal } from "lucide-react";

function Filter({ value, onChange, options = [] }) {
  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal
        size={18}
        className="text-slate-400"
      />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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