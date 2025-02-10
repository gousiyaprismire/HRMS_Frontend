import React from "react";

const PayrollProcessing = ({ goBack }) => {
  return (
    <div>
      <h2>Payroll Processing</h2>
      <p>Generate and approve employee payroll.</p>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default PayrollProcessing;
