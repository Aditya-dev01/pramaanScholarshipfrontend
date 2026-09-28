export const scholarships = [
  {
    id: "sch-001",
    title: "National Merit Scholarship",
    provider: "Education Foundation",
    amount: 50000,
    deadline: "30 Nov 2026",
    type: "Merit",

    description:
      "A merit-based scholarship designed to support academically strong students pursuing higher education.",

    eligibility: [
      "Applicant must be enrolled in a recognized institution.",
      "Minimum academic performance of 70% is required.",
      "Applicant must be an Indian citizen.",
      "Annual family income should be below ₹8 lakh.",
    ],

    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate",
      "Academic Marksheet",
      "Bank Account Proof",
    ],
  },

  {
    id: "sch-002",
    title: "Higher Education Support Scholarship",
    provider: "National Education Trust",
    amount: 75000,
    deadline: "15 Dec 2026",
    type: "Need Based",

    description:
      "Financial assistance for students who require support to continue their higher education.",

    eligibility: [
      "Applicant must be currently enrolled in higher education.",
      "Annual family income should be below ₹5 lakh.",
      "Applicant must maintain satisfactory academic performance.",
      "Applicant must provide valid financial documentation.",
    ],

    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate",
      "Academic Marksheet",
      "Bank Account Proof",
    ],
  },

  {
    id: "sch-003",
    title: "Future Leaders Scholarship",
    provider: "Future India Foundation",
    amount: 100000,
    deadline: "10 Jan 2027",
    type: "Leadership",

    description:
      "A scholarship supporting students demonstrating leadership, community involvement and strong academic potential.",

    eligibility: [
      "Applicant must be enrolled in an undergraduate or postgraduate program.",
      "Applicant must demonstrate leadership activities.",
      "Minimum academic performance of 65% is required.",
      "Applicant must be an Indian citizen.",
    ],

    requiredDocuments: [
      "Aadhaar Card",
      "Academic Marksheet",
      "Leadership Certificate",
      "Bank Account Proof",
    ],
  },
];


export function getScholarshipById(id) {
  return scholarships.find(
    (scholarship) =>
      scholarship.id === id
  );
}