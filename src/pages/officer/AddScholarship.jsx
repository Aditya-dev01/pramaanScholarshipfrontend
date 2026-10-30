import { useState } from "react";
import { CheckCircle, PlusCircle } from "lucide-react";

import { useScholarships } from "../../context/ScholarshipContext";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://scholarship-management-system-0hfy.onrender.com"
).replace(/\/+$/, "");

const AUTH_TOKEN_KEY = "scholarship_auth_token";

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

const initialEnabledCriteria = {
  educationLevel: false,
  passingPercentage: false,
  maxAge: false,
  maxIncome: false,
  singleGirlChild: false,
  minorityCategory: false,
  benefitAmount: false,
  deadline: false,
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#E8EEDB] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#657A3F] focus:ring-4 focus:ring-[#E8EEDB] disabled:cursor-not-allowed disabled:bg-[#F7F7F2] disabled:text-[#293127]/45";

function OptionalField({ enabled, name, label, onToggle, children }) {
  return (
    <div className="rounded-xl border border-[#E8EEDB] p-4">
      <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-[#293127]">
        <input
          type="checkbox"
          name={name}
          checked={enabled}
          onChange={onToggle}
          className="h-4 w-4 accent-[#657A3F]"
        />
        {label}
      </label>
      <div className={enabled ? "" : "pointer-events-none opacity-60"}>
        {children}
      </div>
    </div>
  );
}

function AddScholarship() {
  const { addScholarship } = useScholarships();
  const [form, setForm] = useState(initialForm);
  const [enabledCriteria, setEnabledCriteria] = useState(
    initialEnabledCriteria,
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleCriterion(event) {
    const { name, checked } = event.target;
    setEnabledCriteria((current) => ({ ...current, [name]: checked }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (isSubmitting) return;
    if (!form.name.trim()) {
      setError("Scholarship name is required.");
      return;
    }

    const passingPercentage = enabledCriteria.passingPercentage
      ? Number(form.passingPercentage)
      : null;
    const maxAge = enabledCriteria.maxAge ? Number(form.maxAge) : null;
    const maxIncome = enabledCriteria.maxIncome ? Number(form.maxIncome) : null;
    const benefitAmount = enabledCriteria.benefitAmount
      ? Number(form.benefitAmount)
      : null;

    if (
      enabledCriteria.passingPercentage &&
      (form.passingPercentage === "" ||
        !Number.isInteger(passingPercentage) ||
        passingPercentage < 0 ||
        passingPercentage > 100)
    ) {
      setError(
        "Minimum passing percentage must be a whole number from 0 to 100.",
      );
      return;
    }

    if (
      enabledCriteria.maxAge &&
      (form.maxAge === "" || !Number.isInteger(maxAge) || maxAge < 0)
    ) {
      setError("Maximum age must be a whole number of 0 or more.");
      return;
    }

    if (
      enabledCriteria.maxIncome &&
      (form.maxIncome === "" || !Number.isInteger(maxIncome) || maxIncome < 0)
    ) {
      setError("Maximum annual income must be a whole number of 0 or more.");
      return;
    }

    if (
      enabledCriteria.benefitAmount &&
      (form.benefitAmount === "" ||
        !Number.isInteger(benefitAmount) ||
        benefitAmount < 0)
    ) {
      setError("Benefit amount must be a whole number of 0 or more.");
      return;
    }

    if (enabledCriteria.minorityCategory && !form.minorityCategory) {
      setError("Please select a minority category.");
      return;
    }

    const deadlineDate = enabledCriteria.deadline
      ? new Date(form.deadline)
      : null;
    if (
      enabledCriteria.deadline &&
      (!form.deadline || Number.isNaN(deadlineDate.getTime()))
    ) {
      setError("Please provide a valid deadline date and time.");
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token?.trim()) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      min_education_level: enabledCriteria.educationLevel
        ? form.educationLevel
        : null,
      min_passing_percentage: passingPercentage,
      max_age: maxAge,
      max_income: maxIncome,
      one_child_req: enabledCriteria.singleGirlChild
        ? form.singleGirlChild === "yes"
        : null,
      minority_category_req: enabledCriteria.minorityCategory
        ? form.minorityCategory
        : null,
      benefit_amount: benefitAmount,
      deadline: enabledCriteria.deadline
        ? `${form.deadline.replace("T", " ")}:00`
        : null,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/createScholarship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.msg ||
            data.message ||
            `Unable to create scholarship. HTTP ${response.status}.`,
        );
      }

      const eligibility = [
        ...(enabledCriteria.educationLevel
          ? [`Minimum education level: ${form.educationLevel}.`]
          : []),
        ...(enabledCriteria.passingPercentage
          ? [`Minimum passing percentage: ${passingPercentage}%.`]
          : []),
        ...(enabledCriteria.maxAge ? [`Maximum age: ${maxAge} years.`] : []),
        ...(enabledCriteria.maxIncome
          ? [
              `Annual family income must not exceed ₹${maxIncome.toLocaleString("en-IN")}.`,
            ]
          : []),
        ...(enabledCriteria.singleGirlChild
          ? [
              `Single girl child: ${form.singleGirlChild === "yes" ? "Required" : "Not required"}.`,
            ]
          : []),
        ...(enabledCriteria.minorityCategory
          ? [`Minority category: ${form.minorityCategory}.`]
          : []),
      ];

      addScholarship({
        id: `admin-${Date.now()}`,
        title: form.name.trim(),
        provider: "Government Scholarship Portal",
        amount: benefitAmount ?? 0,
        deadline: deadlineDate
          ? deadlineDate.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "No deadline specified",
        deadlineAt: enabledCriteria.deadline ? form.deadline : null,
        type: enabledCriteria.minorityCategory
          ? `${form.minorityCategory} Minority`
          : "General",
        description: "Financial support for eligible students.",
        eligibility,
        requiredDocuments: [
          "Aadhaar Card",
          "Income Certificate",
          "Academic Marksheet",
          "Bank Account Proof",
        ],
        criteria: {
          minEducationLevel: enabledCriteria.educationLevel
            ? form.educationLevel
            : null,
          minPassingPercentage: passingPercentage,
          maxAge,
          maxIncome,
          singleGirlChild: enabledCriteria.singleGirlChild
            ? form.singleGirlChild === "yes"
            : null,
          minorityCategory: enabledCriteria.minorityCategory
            ? form.minorityCategory
            : null,
        },
      });

      setForm({ ...initialForm });
      setEnabledCriteria({ ...initialEnabledCriteria });
      setSuccess(data.msg || "Created scholarship.");
    } catch (err) {
      console.error("Create scholarship error:", err);
      setError(
        err.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <p className="text-sm font-medium text-[#657A3F]">Administration</p>
        <h1 className="mt-1 text-3xl font-bold text-[#293127]">
          Add scholarship
        </h1>
        <p className="mt-2 text-[#293127]/60">
          Select only the criteria that apply. Unchecked fields are sent to the
          backend as null.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#E8EEDB] bg-white p-6 shadow-sm sm:p-8"
      >
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            role="status"
            className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        <label className="block text-sm font-semibold text-[#293127]">
          Scholarship name
          <input
            className={inputClass}
            name="name"
            value={form.name}
            onChange={updateField}
            maxLength={100}
            required
          />
        </label>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <OptionalField
            enabled={enabledCriteria.educationLevel}
            name="educationLevel"
            label="Add minimum education level"
            onToggle={toggleCriterion}
          >
            <select
              className={inputClass}
              name="educationLevel"
              value={form.educationLevel}
              onChange={updateField}
              disabled={!enabledCriteria.educationLevel}
            >
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Graduation">Graduation</option>
              <option value="Post-graduation">Post-graduation</option>
            </select>
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.passingPercentage}
            name="passingPercentage"
            label="Add minimum passing percentage"
            onToggle={toggleCriterion}
          >
            <input
              className={inputClass}
              name="passingPercentage"
              type="number"
              min="0"
              max="100"
              step="1"
              value={form.passingPercentage}
              onChange={updateField}
              disabled={!enabledCriteria.passingPercentage}
            />
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.maxAge}
            name="maxAge"
            label="Add maximum age"
            onToggle={toggleCriterion}
          >
            <input
              className={inputClass}
              name="maxAge"
              type="number"
              min="0"
              step="1"
              value={form.maxAge}
              onChange={updateField}
              disabled={!enabledCriteria.maxAge}
            />
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.maxIncome}
            name="maxIncome"
            label="Add maximum annual income"
            onToggle={toggleCriterion}
          >
            <input
              className={inputClass}
              name="maxIncome"
              type="number"
              min="0"
              step="1"
              value={form.maxIncome}
              onChange={updateField}
              disabled={!enabledCriteria.maxIncome}
            />
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.singleGirlChild}
            name="singleGirlChild"
            label="Add single girl child criterion"
            onToggle={toggleCriterion}
          >
            <select
              className={inputClass}
              name="singleGirlChild"
              value={form.singleGirlChild}
              onChange={updateField}
              disabled={!enabledCriteria.singleGirlChild}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.minorityCategory}
            name="minorityCategory"
            label="Add minority category criterion"
            onToggle={toggleCriterion}
          >
            <select
              className={inputClass}
              name="minorityCategory"
              value={form.minorityCategory}
              onChange={updateField}
              disabled={!enabledCriteria.minorityCategory}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Jain">Jain</option>
              <option value="Parsi">Parsi</option>
            </select>
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.benefitAmount}
            name="benefitAmount"
            label="Add benefit amount"
            onToggle={toggleCriterion}
          >
            <input
              className={inputClass}
              name="benefitAmount"
              type="number"
              min="0"
              step="1"
              value={form.benefitAmount}
              onChange={updateField}
              disabled={!enabledCriteria.benefitAmount}
            />
          </OptionalField>
          <OptionalField
            enabled={enabledCriteria.deadline}
            name="deadline"
            label="Add deadline"
            onToggle={toggleCriterion}
          >
            <input
              className={inputClass}
              name="deadline"
              type="datetime-local"
              value={form.deadline}
              onChange={updateField}
              disabled={!enabledCriteria.deadline}
            />
          </OptionalField>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#657A3F] px-5 py-3 font-bold text-white transition hover:bg-[#526332] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PlusCircle size={18} />
          {isSubmitting ? "Creating scholarship..." : "Add scholarship"}
        </button>
      </form>
    </div>
  );
}

export default AddScholarship;
