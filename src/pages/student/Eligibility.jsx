import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import Stepper from "../../components/Stepper";
import { scholarships } from "../../data/scholarships";

export default function Eligibility() {
  const { id } = useParams();
  const navigate = useNavigate();

  const scholarship = scholarships.find(
    (item) => item.id === Number(id)
  );

  if (!scholarship) {
    return <h2>Scholarship not found.</h2>;
  }

  const criteria = [
    {
      title: "Minimum Percentage",
      value: "84%",
      required: "75%",
      eligible: true,
    },
    {
      title: "Family Income",
      value: "₹2,50,000",
      required: "Below ₹5,00,000",
      eligible: true,
    },
    {
      title: "Education",
      value: "Undergraduate",
      required: scholarship.education,
      eligible: true,
    },
  ];

  return (
    <div>
      <Stepper currentStep={1} />

      <div className="eligibility-page">
        <h1 className="text-[#26332A]">
          Eligibility Check
        </h1>

        <p className="text-[#26332A]/60">
          Check whether you meet the requirements for
          <strong className="text-[#26332A]"> {scholarship.name}</strong>.
        </p>

        <div className="eligibility-list">
          {criteria.map((item) => (
            <div
              className="eligibility-item border-[#DDEBD8] bg-white"
              key={item.title}
            >
              <div>
                <h3 className="text-[#26332A]">
                  {item.title}
                </h3>

                <p className="text-[#26332A]/60">
                  Your value: <strong className="text-[#26332A]">{item.value}</strong>
                </p>

                <p className="text-[#26332A]/60">
                  Required: {item.required}
                </p>
              </div>

              {item.eligible ? (
                <CheckCircle
                  className="eligible-icon text-[#24823F]"
                />
              ) : (
                <XCircle className="not-eligible-icon text-[#C76B45]" />
              )}
            </div>
          ))}
        </div>

        <div className="eligible-message border-[#DDEBD8] bg-[#DDEBD8]">
          <CheckCircle className="text-[#24823F]" />

          <div>
            <h3 className="text-[#185C2C]">
              You are eligible to apply!
            </h3>

            <p className="text-[#26332A]/70">
              You meet the basic eligibility
              requirements.
            </p>
          </div>
        </div>

        <button
          className="primary-btn bg-[#24823F] text-white hover:bg-[#185C2C]"
          onClick={() =>
            navigate(
              `/student/apply/${id}/form`
            )
          }
        >
          Continue Application
        </button>
      </div>
    </div>
  );
}