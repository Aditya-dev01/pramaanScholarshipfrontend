import ScholarshipCard from "./ScholarshipCard";

function ScholarshipGrid({ scholarships }) {
  if (!scholarships?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#E8EEDB] bg-white p-12 text-center">
        <h3 className="font-semibold text-[#293127]">
          No scholarships found
        </h3>

        <p className="mt-2 text-sm text-[#293127]/60">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {scholarships.map((scholarship) => (
        <ScholarshipCard
          key={scholarship.id}
          scholarship={scholarship}
        />
      ))}
    </div>
  );
}

export default ScholarshipGrid;