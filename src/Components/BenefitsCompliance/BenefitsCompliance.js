import React, { useState } from "react";
import "./BenefitsCompliance.css";
import BenefitsEnrollment from "./BenefitsEnrollment";
import ClaimsReimbursements from "./ClaimsReimbursements";
import CompanyPolicyCompliance from "./CompanyPolicyCompliance";
import AuditComplianceReports from "./AuditComplianceReports";

// Debugging: Log the imported components
console.log(
  BenefitsEnrollment,
  ClaimsReimbursements,
  CompanyPolicyCompliance,
  AuditComplianceReports
);


function BenefitsCompliance() {
  const [activeTab, setActiveTab] = useState("benefits-enrollment");

  const tabOptions = {
    "benefits-enrollment": <BenefitsEnrollment />,
    "claims-reimbursements": <ClaimsReimbursements />,
    "company-policy": <CompanyPolicyCompliance />,
    "audit-reports": <AuditComplianceReports />,
  };

  return (
    <div className="benefits-compliance-container">
      <h2 className="benefits-compliance-header">Benefits & Compliance</h2>

      {/* Navigation Tabs */}
      <div className="tabs">
        {Object.keys(tabOptions).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab === "benefits-enrollment" && "🏥 Benefits Enrollment"}
            {tab === "claims-reimbursements" && "💰 Claims & Reimbursements"}
            {tab === "company-policy" && "📜 Company Policy & Compliance"}
            {tab === "audit-reports" && "📊 Audit & Compliance Reports"}
          </button>
        ))}
      </div>

      {/* Display Selected Component */}
      <div className="tab-content">{tabOptions[activeTab]}</div>
    </div>
  );
}

export default BenefitsCompliance;
