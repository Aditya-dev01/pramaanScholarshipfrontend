import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { fetchScholarships } from "../services/portalApi";

const ScholarshipContext = createContext(null);

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshScholarships = async () => {
    setLoading(true);
    setError("");
    try {
      setScholarships(await fetchScholarships());
    } catch (err) {
      setError(err.message || "Unable to load scholarships.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshScholarships();
  }, []);

  function addScholarship(scholarship) {
    // Creation is handled by the create-scholarship endpoint; refresh so the
    // published database record is the source of truth.
    refreshScholarships();
    return scholarship;
  }

  return (
    <ScholarshipContext.Provider
      value={{ scholarships, addScholarship, loading, error, refreshScholarships }}
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
