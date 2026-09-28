const APPLICATIONS_KEY =
  "scholarship_applications";


export const seedApplications = [
  {
    id: "APP-1001",
    studentEmail: "student@example.com",
    studentName: "Demo Student",
    scholarshipId: "sch-001",
    scholarshipName: "National Merit Scholarship",

    formData: {
      fullName: "Demo Student",
      email: "student@example.com",
      phone: "9876543210",
      dob: "2003-06-15",
      gender: "Male",
      institution: "Delhi University",
      course: "B.Sc Computer Science",
      year: "Third Year",
      category: "General",
      annualIncome: "350000",
      address: "New Delhi, India",
      statement:
        "I am applying for this scholarship to support my higher education.",
      eligibilityConfirmed: true,
    },

    documents: [
      {
        type: "Aadhaar Card",
        name: "aadhaar.pdf",
        status: "Verified",
      },
      {
        type: "Income Certificate",
        name: "income.pdf",
        status: "Verified",
      },
      {
        type: "Academic Marksheet",
        name: "marksheet.pdf",
        status: "Verified",
      },
      {
        type: "Bank Account Proof",
        name: "bank.pdf",
        status: "Verified",
      },
    ],

    status: "Pending",
    submittedAt: "28/09/2026, 10:30 AM",
    officerComment: "",
  },
];


export function getApplications() {
  const stored =
    localStorage.getItem(APPLICATIONS_KEY);

  if (!stored) {
    localStorage.setItem(
      APPLICATIONS_KEY,
      JSON.stringify(seedApplications)
    );

    return seedApplications;
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(
      APPLICATIONS_KEY,
      JSON.stringify(seedApplications)
    );

    return seedApplications;
  }
}


export function saveApplications(applications) {
  localStorage.setItem(
    APPLICATIONS_KEY,
    JSON.stringify(applications)
  );

  window.dispatchEvent(
    new Event("applicationsUpdated")
  );
}


export function getApplication(id) {
  return getApplications().find(
    (application) =>
      application.id === id
  );
}


export function addApplication(application) {
  const applications = getApplications();

  const newApplication = {
    id: `APP-${Date.now()}`,
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    ...application,
  };

  saveApplications([
    ...applications,
    newApplication,
  ]);

  return newApplication;
}


export function updateApplication(
  id,
  updates
) {
  const applications = getApplications();

  const updatedApplications =
    applications.map((application) =>
      application.id === id
        ? {
            ...application,
            ...updates,
            updatedAt:
              new Date().toLocaleString(),
          }
        : application
    );

  saveApplications(updatedApplications);

  return updatedApplications.find(
    (application) =>
      application.id === id
  );
}