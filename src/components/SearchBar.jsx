import { Search, X } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search scholarships..." }) {
  return (
    <div className="relative w-full">
      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#26332A]/50"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#DDEBD8] bg-white py-3 pl-11 pr-10 text-sm text-[#26332A] shadow-sm placeholder:text-[#26332A]/50 focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#26332A]/50 hover:bg-[#DDEBD8] hover:text-[#26332A]"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;