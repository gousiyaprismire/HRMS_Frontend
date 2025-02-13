import React, { useState } from "react";
import "./BenefitsCompliance.css";

function CompanyPolicyCompliance() {
  const [policies] = useState([
    {
      id: 1,
      title: "Workplace Safety Policy",
      description: "Guidelines on maintaining a safe and secure workplace.",
      fileUrl: "/documents/workplace-safety-policy.pdf", // Ensure correct path
    },
    {
      id: 2,
      title: "Anti-Discrimination Policy",
      description: "Details the company's stance on discrimination and harassment.",
      fileUrl: "/documents/anti-discrimination-policy.pdf",
    },
    {
      id: 3,
      title: "Employee Benefits Overview",
      description: "A comprehensive guide to employee benefits.",
      fileUrl: "/documents/employee-benefits-overview.pdf",
    },
  ]);

  const handleDownload = (url) => {
    if (!url || typeof url !== "string") {
      alert("⚠ This document is currently unavailable.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="company-policy-compliance-container">
      <h3>📜 Company Policy & Compliance</h3>
      <p>Browse and download important workplace policies and compliance documents:</p>

      <div className="policy-list">
        {policies.map((policy) => (
          <div key={policy.id} className="policy-item">
            <h4>{policy.title}</h4>
            <p>{policy.description}</p>
            <button
              onClick={() => handleDownload(policy.fileUrl)}
              className="download-button"
              aria-label={`Download ${policy.title}`}
            >
              📄 Download/View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyPolicyCompliance;
