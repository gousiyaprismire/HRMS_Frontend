import React, { useState } from "react";
import "./BenefitsCompliance.css";

function AuditComplianceReports() {
  // Removed setReports since it's unused
  const [reports] = useState([
    {
      id: 1,
      title: "Workplace Safety Audit - 2024",
      description: "Audit of workplace safety measures and compliance.",
      status: "Compliant",
      reportUrl: "/documents/workplace-safety-audit-2024.pdf",
    },
    {
      id: 2,
      title: "Environmental Compliance Check - 2024",
      description: "Audit of environmental regulations and compliance.",
      status: "Violation",
      reportUrl: "/documents/environmental-compliance-check-2024.pdf",
    },
    {
      id: 3,
      title: "Anti-Discrimination Policy Audit",
      description: "Audit to ensure anti-discrimination policies are followed.",
      status: "Compliant",
      reportUrl: "/documents/anti-discrimination-policy-audit.pdf",
    },
  ]);

  const handleDownload = (url) => {
    if (!url) {
      alert("⚠ This report is currently unavailable.");
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="audit-compliance-reports-container">
      <h3>📊 Audit & Compliance Reports</h3>
      <p>Track regulatory compliance and violations through audit reports:</p>

      <div className="report-list">
        {reports.map((report) => (
          <div key={report.id} className="report-item">
            <h4>{report.title}</h4>
            <p>{report.description}</p>
            <p>
              <strong>Status: </strong>
              <span className={`status ${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </p>
            <button
              onClick={() => handleDownload(report.reportUrl)}
              className="download-button"
            >
              📄 View/Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuditComplianceReports;
