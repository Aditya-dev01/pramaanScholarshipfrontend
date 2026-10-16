import { useState } from "react";
import { CheckCircle, PlusCircle } from "lucide-react";

import { useScholarships } from "../../context/ScholarshipContext";

const initialForm = {
  name: "",
  educationLevel: "10th",
  passingPercentage: "",
  maxAge: "",
  maxIncome: "",
  singleGirlChild: "no",
  minorityCategory: "",
  benefitAmount: "",
  deadline: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#E8EEDB] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9BB06D] focus:ring-4 focus:ring-[#E8EEDB]";

function AddScholarship() {
  const { addScholarship } = useScholarships();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const passingPercentage = Number(form.passingPercentage);
    const maxAge = Number(form.maxAge);
    const maxIncome = Number(form.maxIncome);
    const benefitAmount = Number(form.benefitAmount);

    if (!form.name.trim()) {
      setError("Scholarship name is required.");
      return;
    }

    if (
      !Number.isInteger(passingPercentage) ||
      passingPercentage < 0 ||
      passingPercentage > 100
    ) {
      setError("Minimum passing percentage must be a whole number from 0 to 100.");
      return;
    }

    if (!Number.isInteger(maxAge) || maxAge < 0) {
      setError("Maximum age must be a whole number of 0 or more.");
      return;
    }

    if (!Number.isInteger(maxIncome) || maxIncome < 0) {
      setError("Maximum income must be a whole number of 0 or more.");
      return;
    }

    if (!Number.isInteger(benefitAmount) || benefitAmount < 0) {
      setError("Benefit amount must be a whole number of 0 or more.");
      return;
    }

    const deadlineDate = new Date(form.deadline);
    if (Number.isNaN(deadlineDate.getTime())) {
      setError("Please provide a valid deadline date and time.");
      return;
    }
    addScholarship({
      id: `admin-${Date.now()}`,
      title: form.name.trim(),
      provider: "Government Scholarship Portal",
      amount: benefitAmount,
      deadline: deadlineDate.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      deadlineAt: form.deadline,
      type: `${form.minorityCategory} Minority`,
      description: `Financial support for eligible ${form.educationLevel} students.`,
      eligibility: [
        `Minimum education level: ${form.educationLevel}.`,
        `Minimum passing percentage: ${passingPercentage}%.`,
        `Maximum age: ${maxAge} years.`,
        `Annual family income must not exceed ₹${maxIncome.toLocaleString("en-IN")}.`,
        `Single girl child: ${form.singleGirlChild === "yes" ? "Required" : "Not required"}.`,
        `Minority category: ${form.minorityCategory}.`,
      ],
      requiredDocuments: [
        "Aadhaar Card",
        "Income Certificate",
        "Academic Marksheet",
        "Bank Account Proof",
      ],
      criteria: {
        minEducationLevel: form.educationLevel,
        minPassingPercentage: passingPercentage,
        maxAge,
        maxIncome,
        singleGirlChild: form.singleGirlChild === "yes",
        minorityCategory: form.minorityCategory || null,
      },
    });

    setForm(initialForm);
    setSuccess("Scholarship added. It is now available in student scholarship search.");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[#9BB06D]">Administration</p>
        <h1 className="mt-1 text-3xl font-bold text-[#293127]">Add scholarship</h1>
        <p className="mt-2 text-[#293127]/60">Publish a scholarship opportunity for students to discover.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm sm:p-8">
        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
        {success && <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"><CheckCircle size={18} />{success}</div>}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="md:col-span-2 text-sm font-semibold text-[#293127]">Scholarship name<input className={inputClass} name="name" value={form.name} onChange={updateField} maxLength="100" required /></label>
          <label className="text-sm font-semibold text-[#293127]">Minimum education level<select className={inputClass} name="educationLevel" value={form.educationLevel} onChange={updateField}><option value="10th">10th</option><option value="12th">12th</option><option value="graduation">Graduation</option><option value="postgraduation">Postgraduation</option></select></label>
          <label className="text-sm font-semibold text-[#293127]">Minimum passing percentage<input className={inputClass} name="passingPercentage" type="number" min="0" max="100" step="1" value={form.passingPercentage} onChange={updateField} required /></label>
          <label className="text-sm font-semibold text-[#293127]">Maximum age<input className={inputClass} name="maxAge" type="number" min="0" step="1" value={form.maxAge} onChange={updateField} required /></label>
          <label className="text-sm font-semibold text-[#293127]">Maximum annual income<input className={inputClass} name="maxIncome" type="number" min="0" step="1" value={form.maxIncome} onChange={updateField} required /></label>
          <label className="text-sm font-semibold text-[#293127]">Single girl child<select className={inputClass} name="singleGirlChild" value={form.singleGirlChild} onChange={updateField}><option value="no">No</option><option value="yes">Yes</option></select></label>
          <label className="text-sm font-semibold text-[#293127]">Minority category<select className={inputClass} name="minorityCategory" value={form.minorityCategory} onChange={updateField} required><option value="" disabled>Select a category</option><option value="Muslim">Muslim</option><option value="Christian">Christian</option><option value="Sikh">Sikh</option><option value="Buddhist">Buddhist</option><option value="Jain">Jain</option><option value="Parsi">Parsi</option></select></label>
          <label className="text-sm font-semibold text-[#293127]">Benefit amount<input className={inputClass} name="benefitAmount" type="number" min="0" step="1" value={form.benefitAmount} onChange={updateField} required /></label>
          <label className="text-sm font-semibold text-[#293127]">Deadline<input className={inputClass} name="deadline" type="datetime-local" value={form.deadline} onChange={updateField} required /></label>
        </div>
        <button type="submit" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#657A3F] px-5 py-3 font-bold text-white transition hover:bg-[#526332]"><PlusCircle size={18} />Add scholarship</button>
      </form>
    </div>
  );
}

export default AddScholarship;
