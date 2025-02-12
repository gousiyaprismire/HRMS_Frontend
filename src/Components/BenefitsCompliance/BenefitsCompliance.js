import React, { useState } from "react";
import "./BenefitsCompliance.css";
import BenefitsEnrollment from "./BenefitsEnrollment";
import ClaimsReimbursements from "./ClaimsReimbursements";
import CompanyPolicyCompliance from "./CompanyPolicyCompliance";
import AuditComplianceReports from "./AuditComplianceReports";

function BenefitsCompliance() {
  const [activeTab, setActiveTab] = useState("benefits-enrollment");

  return (
    <div className="benefits-compliance-container">
      <h2 className="benefits-compliance-header">Benefits & Compliance</h2>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("benefits-enrollment")}
          className={activeTab === "benefits-enrollment" ? "active" : ""}
        >
          🏥 Benefits Enrollment
        </button>
        <button
          onClick={() => setActiveTab("claims-reimbursements")}
          className={activeTab === "claims-reimbursements" ? "active" : ""}
        >
          💰 Claims & Reimbursements
        </button>
        <button
          onClick={() => setActiveTab("company-policy")}
          className={activeTab === "company-policy" ? "active" : ""}
        >
          📜 Company Policy & Compliance
        </button>
        <button
          onClick={() => setActiveTab("audit-reports")}
          className={activeTab === "audit-reports" ? "active" : ""}
        >
          📊 Audit & Compliance Reports
        </button>
      </div>

      {/* Display Selected Component */}
      <div className="tab-content">
        {activeTab === "benefits-enrollment" && <BenefitsEnrollment />}
        {activeTab === "claims-reimbursements" && <ClaimsReimbursements />}
        {activeTab === "company-policy" && <CompanyPolicyCompliance />}
        {activeTab === "audit-reports" && <AuditComplianceReports />}
      </div>
    </div>
  );
}

export default BenefitsCompliance;
