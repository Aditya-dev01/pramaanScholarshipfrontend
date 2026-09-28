import { useMemo, useState } from "react";

import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import ScholarshipGrid from "../../components/ScholarshipGrid";
import { scholarships } from "../../data/scholarships";

function Scholarships() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const types = [
    ...new Set(
      scholarships.map(
        (scholarship) => scholarship.type
      )
    ),
  ];

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {

      const matchesSearch =
        scholarship.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        scholarship.provider
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "all" ||
        scholarship.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-8">

        <p className="text-sm font-medium text-blue-600">
          Scholarships
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Find your opportunity
        </h1>

        <p className="mt-2 text-slate-500">
          Search and filter scholarships based on your needs.
        </p>

      </div>


      <div className="mb-7 flex flex-col gap-3 md:flex-row">

        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
          />
        </div>

        <Filter
          value={type}
          onChange={setType}
          options={types}
        />

      </div>


      <div className="mb-5 text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900">
          {filteredScholarships.length}
        </span>{" "}
        scholarships
      </div>


      <ScholarshipGrid
        scholarships={filteredScholarships}
      />

    </div>
  );
}

export default Scholarships;