const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://scholarship-management-system-0hfy.onrender.com";

const AUTH_TOKEN_KEY = "scholarship_auth_token";

function normaliseScholarship(row) {
  return {
    id: String(row.scholarship_id ?? row.id ?? ""),
    title: row.name ?? "Untitled scholarship",
    provider: row.provider ?? "Government Scholarship Portal",
    type: row.minority_category_req ?? "Scholarship",
    amount: row.benefit_amount ?? 0,
    deadline: row.deadline ?? "Not specified",
    description: row.description ?? "Eligibility details are available below.",
    eligibility: [
      row.min_education_level && `Minimum education: ${row.min_education_level}`,
      row.min_passing_percentage != null && `Minimum marks: ${row.min_passing_percentage}%`,
      row.max_age != null && `Maximum age: ${row.max_age} years`,
      row.minority_category_req && `Category: ${row.minority_category_req}`,
      row.one_child_req === true && "Available to one-child applicants",
    ].filter(Boolean),
    requiredDocuments: row.required_documents ?? [],
  };
}

function normaliseApplication(row) {
  return {
    id: String(row.application_id ?? row.id ?? ""),
    studentName: row.user_name ?? row.student_name ?? "Student",
    studentEmail: row.user_email ?? row.email ?? "",
    scholarshipName: row.scholarship_name ?? "Scholarship",
    status: row.status ?? "Pending",
    submittedAt: row.timestamp ?? null,
    educationLevel: row.education_level,
    passingPercentage: row.passing_percentage,
    income: row.income,
    minorityCategory: row.minority_category,
  };
}

async function post(path, body, { authenticated = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (authenticated) {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) throw new Error("Please sign in to view applications.");
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.msg || data.message || "Unable to load data.");
  }
  return data;
}

export async function fetchScholarships({ offset = 0, limit = 20 } = {}) {
  const data = await post("/scholarships", { offset, limit });
  return (data.details?.rows ?? []).map(normaliseScholarship);
}

export async function fetchApplications({ offset = 0, limit = 20 } = {}) {
  const data = await post("/applications", { offset, limit }, { authenticated: true });
  return (data.details?.rows ?? []).map(normaliseApplication);
}

export async function createApplication(application) {
  const data = await post("/createApplication", application, { authenticated: true });
  return normaliseApplication(data.details?.row ?? {});
}
