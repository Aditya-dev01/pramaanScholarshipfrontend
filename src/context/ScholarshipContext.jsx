import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  addScholarship as saveScholarship,
  scholarships as initialScholarships,
} from "../data/scholarships";

const ScholarshipContext = createContext(null);

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useState(
    initialScholarships
  );

  function addScholarship(scholarship) {
    const savedScholarship = saveScholarship(scholarship);
    setScholarships([...initialScholarships]);
    return savedScholarship;
  }

  return (
    <ScholarshipContext.Provider
      value={{ scholarships, addScholarship }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarships() {
  const context = useContext(ScholarshipContext);

  if (!context) {
    throw new Error(
      "useScholarships must be used inside ScholarshipProvider"
    );
  }

  return context;
}
