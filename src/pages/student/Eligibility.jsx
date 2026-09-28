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
        <h1>Eligibility Check</h1>

        <p>
          Check whether you meet the requirements for
          <strong> {scholarship.name}</strong>.
        </p>

        <div className="eligibility-list">
          {criteria.map((item) => (
            <div
              className="eligibility-item"
              key={item.title}
            >
              <div>
                <h3>{item.title}</h3>

                <p>
                  Your value: <strong>{item.value}</strong>
                </p>

                <p>
                  Required: {item.required}
                </p>
              </div>

              {item.eligible ? (
                <CheckCircle
                  className="eligible-icon"
                />
              ) : (
                <XCircle className="not-eligible-icon" />
              )}
            </div>
          ))}
        </div>

        <div className="eligible-message">
          <CheckCircle />

          <div>
            <h3>You are eligible to apply!</h3>

            <p>
              You meet the basic eligibility
              requirements.
            </p>
          </div>
        </div>

        <button
          className="primary-btn"
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