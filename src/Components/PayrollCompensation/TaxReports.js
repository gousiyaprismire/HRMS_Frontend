import React from "react";

const TaxReports = ({ goBack }) => {
  return (
    <div>
      <h2>Tax & Deduction Reports</h2>
      <p>View tax, provident fund, and insurance deductions.</p>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default TaxReports;

