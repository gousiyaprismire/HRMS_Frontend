import React, { useState } from "react";
import axios from "axios";
import "./PayslipForm.css";

function PayslipForm() {
  const [formData, setFormData] = useState({
    empNo: "",
  name: "",
  designation: "",
  contact: "",
  bankAccNo: "",
  ifscCode: "",
  dateOfJoining: "",
  location: "",
  pan: "",
  standardDays: "",
  daysWorked: "",
  bankName: "",
  basicPay: "",
  hra: "",
  specialAllowance: "",
  conveyance: "",
  medical: "",
  pf: "",
  professionalTax: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePayslip = async () => {
    try {
      const response =await axios.post("http://localhost:8080/api/payslips/generate", formData, {
  responseType: "blob"
});

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${formData.name}_Payslip.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to generate payslip:", error);
    }
  };

  return (
    <div className="payslip-form">
      <h2>Generate Payslip</h2>
      <div className="form-grid">
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, " $1")}
            />
          </div>
        ))}
      </div>
      <button onClick={generatePayslip}>Generate Payslip</button>
    </div>
  );
}

export default PayslipForm;
