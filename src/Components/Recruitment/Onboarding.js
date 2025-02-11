import React, { useState } from "react";
import "./Recruitment.css";

function Onboarding() {
  const [newHires, setNewHires] = useState([
    { name: "A", documentsSubmitted: true, startDate: "2025-02-01", department: "Engineering", status: "Completed" },
    { name: "B", documentsSubmitted: false, startDate: "2025-02-15", department: "Marketing", status: "Pending" },
    // { name: "C", documentsSubmitted: false, startDate: "2025-02-15", department: "Marketing", status: "Rejected" }
  ]);

  const handleUpdateStatus = (index, newStatus) => {
    const updatedHires = [...newHires];
    updatedHires[index].status = newStatus;
    setNewHires(updatedHires);
  };

  return (
    <div className="onboarding-container">
      <h2 className="onboarding-header">Onboarding</h2>

      <ul className="onboarding-new-hire-list">
        {newHires.map((hire, index) => (
          <li key={index} className="onboarding-new-hire-item">
            <div className="onboarding-new-hire-info">
              <h3 className="onboarding-new-hire-name">{hire.name}</h3>
              <p><strong>Start Date:</strong> {hire.startDate}</p>
              <p><strong>Department:</strong> {hire.department}</p>
              <p><strong>Documents Status:</strong> {hire.documentsSubmitted ? "Completed" : "Pending"}</p>
              <p><strong>Onboarding Status:</strong> {hire.status}</p>
            </div>

            <div className="onboarding-status-buttons">
              <button
                onClick={() => handleUpdateStatus(index, "Completed")}
                disabled={hire.status === "Completed"}
                className="onboarding-status-button completed"
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleUpdateStatus(index, "In Progress")}
                disabled={hire.status === "In Progress" || hire.status === "Completed"}
                className="onboarding-status-button in-progress"
              >
                Mark as In Progress
              </button>
              <button
                onClick={() => handleUpdateStatus(index, "Pending")}
                disabled={hire.status === "Pending"}
                className="onboarding-status-button pending"
              >
                Mark as Pending
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Onboarding;
