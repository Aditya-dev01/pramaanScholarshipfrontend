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
        <h1 className="text-[#293127]">
          Eligibility Check
        </h1>

        <p className="text-[#293127]/60">
          Check whether you meet the requirements for
          <strong className="text-[#293127]"> {scholarship.name}</strong>.
        </p>

        <div className="eligibility-list">
          {criteria.map((item) => (
            <div
              className="eligibility-item border-[#E8EEDB] bg-white"
              key={item.title}
            >
              <div>
                <h3 className="text-[#293127]">
                  {item.title}
                </h3>

                <p className="text-[#293127]/60">
                  Your value: <strong className="text-[#293127]">{item.value}</strong>
                </p>

                <p className="text-[#293127]/60">
                  Required: {item.required}
                </p>
              </div>

              {item.eligible ? (
                <CheckCircle
                  className="eligible-icon text-[#9BB06D]"
                />
              ) : (
                <XCircle className="not-eligible-icon text-[#B9684B]" />
              )}
            </div>
          ))}
        </div>

        <div className="eligible-message border-[#E8EEDB] bg-[#E8EEDB]">
          <CheckCircle className="text-[#9BB06D]" />

          <div>
            <h3 className="text-[#657A3F]">
              You are eligible to apply!
            </h3>

            <p className="text-[#293127]/70">
              You meet the basic eligibility
              requirements.
            </p>
          </div>
        </div>

        <button
          className="primary-btn bg-[#9BB06D] text-white hover:bg-[#657A3F]"
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