import React, { useState } from "react";
import "./BenefitsCompliance.css"; // Ensure styles are included

const BenefitsEnrollment = () => {
  const [formData, setFormData] = useState({
    healthInsurance: "",
    retirementPlan: "",
    dentalInsurance: "",
    visionInsurance: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate selection before submission
    if (Object.values(formData).some((value) => value === "")) {
      alert("Please select all benefits before enrolling.");
      return;
    }

    setSubmitted(true);
  };

  const benefitOptions = {
    healthInsurance: ["Basic Plan", "Premium Plan", "Family Coverage"],
    retirementPlan: ["401(k) Standard", "Roth 401(k)", "Pension Plan"],
    dentalInsurance: ["Basic Coverage", "Comprehensive Plan"],
    visionInsurance: ["Basic Coverage", "Comprehensive Plan"],
  };

  return (
    <div className="benefits-enrollment">
      <h2>Benefits Enrollment</h2>
      <p>Select and enroll in your employee benefits.</p>

      {submitted ? (
        <div className="confirmation-message">
          ✅ Enrollment successful! Your selected benefits have been recorded.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="benefits-form">
          {Object.keys(benefitOptions).map((benefit) => (
            <div className="form-group" key={benefit}>
              <label htmlFor={benefit}>
                {benefit.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
              </label>
              <select
                name={benefit}
                value={formData[benefit]}
                onChange={handleChange}
                required
              >
                <option value="">Select Plan</option>
                {benefitOptions[benefit].map((option, index) => (
                  <option key={index} value={option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button type="submit">Enroll</button>
        </form>
      )}
    </div>
  );
};

export default BenefitsEnrollment;
