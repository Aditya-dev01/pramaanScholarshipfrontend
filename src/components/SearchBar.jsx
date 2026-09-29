import { Search, X } from "lucide-react";

function SearchBar({ value, onChange, placeholder = "Search scholarships..." }) {
  return (
    <div className="relative w-full">
      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#293127]/50"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E8EEDB] bg-white py-3 pl-11 pr-10 text-sm text-[#293127] shadow-sm placeholder:text-[#293127]/50 focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB]"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#293127]/50 hover:bg-[#E8EEDB] hover:text-[#293127]"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;