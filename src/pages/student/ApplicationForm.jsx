import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";

import Stepper from "../../components/Stepper";
import { useAuth } from "../../context/AuthContext";
import {
  addApplication,
  getApplications,
  updateApplication,
} from "../../data/applications";
import { getScholarshipById } from "../../data/scholarships";

function ApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const scholarship = getScholarshipById(id);

  const existing = getApplications().find(
    (application) =>
      application.scholarshipId === id &&
      application.studentEmail === user.email &&
      application.status === "Draft"
  );

  const [formData, setFormData] = useState(
    existing?.formData || {
      fullName: user.name || "",
      email: user.email || "",
      phone: "",
      dob: "",
      gender: "",
      institution: "",
      course: "",
      year: "",
      category: "",
      annualIncome: "",
      address: "",
      statement: "",
      eligibilityConfirmed: false,
    }
  );

  const [error, setError] = useState("");

  if (!scholarship) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Scholarship not found.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.eligibilityConfirmed) {
      setError(
        "Please confirm that you meet the eligibility criteria."
      );
      return;
    }

    setError("");

    if (existing) {
      updateApplication(existing.id, {
        formData,
      });

      navigate(
        `/student/documents/${existing.id}`
      );

      return;
    }

    const application = addApplication({
      studentEmail: user.email,
      studentName: user.name,
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.title,
      formData,
      documents: [],
      status: "Draft",
      submittedAt: null,
      officerComment: "",
    });

    navigate(
      `/student/documents/${application.id}`
    );
  };

  return (
    <div className="mx-auto max-w-5xl">

      <Stepper currentStep={2} />

      <div className="mb-7">

        <p className="text-sm font-medium text-[#24823F]">
          Scholarship Application
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#26332A]">
          {scholarship.title}
        </h1>

      </div>


      <div className="mb-7 rounded-2xl border border-[#DDEBD8] bg-[#DDEBD8] p-6">

        <h2 className="font-bold text-[#26332A]">
          Eligibility Criteria
        </h2>

        <div className="mt-4 space-y-3">

          {scholarship.eligibility.map(
            (item) => (
              <div
                key={item}
                className="flex items-start gap-3"
              >
                <CheckCircle
                  size={18}
                  className="mt-0.5 text-[#24823F]"
                />

                <span className="text-sm text-[#26332A]/70">
                  {item}
                </span>
              </div>
            )
          )}

        </div>

      </div>


      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-[#FBE8DF] p-4 text-sm text-[#C76B45]">
          <AlertCircle
            size={18}
            className="mt-0.5"
          />
          {error}
        </div>
      )}


      <form
        onSubmit={handleSubmit}
        className="space-y-7"
      >

        {/* Personal Information */}

        <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-[#26332A]">
            Personal Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <Field
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Field
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Field
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                "Male",
                "Female",
                "Other",
              ]}
            />

            <SelectField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={[
                "General",
                "OBC",
                "SC",
                "ST",
                "EWS",
              ]}
            />

          </div>

        </section>


        {/* Academic */}

        <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-[#26332A]">
            Academic Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <Field
              label="Institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />

            <Field
              label="Course / Program"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Current Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              options={[
                "First Year",
                "Second Year",
                "Third Year",
                "Fourth Year",
                "Postgraduate",
              ]}
            />

            <Field
              label="Annual Family Income"
              name="annualIncome"
              type="number"
              value={formData.annualIncome}
              onChange={handleChange}
              placeholder="₹"
              required
            />

          </div>

        </section>


        {/* Address */}

        <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-[#26332A]">
            Address
          </h2>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Enter your complete address"
            className="mt-5 w-full rounded-xl border border-[#DDEBD8] px-4 py-3 text-sm focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
          />

        </section>


        {/* Statement */}

        <section className="rounded-2xl border border-[#DDEBD8] bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-[#26332A]">
            Statement
          </h2>

          <textarea
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Why should you receive this scholarship?"
            className="mt-5 w-full rounded-xl border border-[#DDEBD8] px-4 py-3 text-sm focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
          />

        </section>


        {/* Confirmation */}

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#DDEBD8] bg-white p-5">

          <input
            type="checkbox"
            name="eligibilityConfirmed"
            checked={formData.eligibilityConfirmed}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-[#DDEBD8] text-[#24823F]"
          />

          <span className="text-sm leading-6 text-[#26332A]/70">
            I confirm that the information provided is accurate
            and that I meet the eligibility criteria for this
            scholarship.
          </span>

        </label>


        <div className="flex justify-end">

          <button
            type="submit"
            className="rounded-xl bg-[#24823F] px-7 py-3.5 font-bold text-white hover:bg-[#185C2C]"
          >
            Save & Continue
          </button>

        </div>

      </form>

    </div>
  );
}


function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#26332A]/80">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#DDEBD8] px-4 py-3 text-sm focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
      />
    </div>
  );
}


function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#26332A]/80">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-xl border border-[#DDEBD8] bg-white px-4 py-3 text-sm focus:border-[#24823F] focus:ring-4 focus:ring-[#DDEBD8]"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ApplicationForm;