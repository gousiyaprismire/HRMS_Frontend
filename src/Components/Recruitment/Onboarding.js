import React, { useState } from "react";
import "./Recruitment.css";

function Onboarding() {
  const [newHires, setNewHires] = useState([
    { name: "A", documentsSubmitted: true, startDate: "2025-02-01", department: "Engineering", status: "Completed" },
    { name: "B", documentsSubmitted: false, startDate: "2025-02-15", department: "Marketing", status: "Pending" }
  ]);

  const handleUpdateStatus = (index, newStatus) => {
    const updatedHires = [...newHires];
    updatedHires[index].status = newStatus;
    setNewHires(updatedHires);
  };

  return (
    <div className="onboarding-container">
      <h2>Onboarding</h2>

     
      <ul className="new-hire-list">
        {newHires.map((hire, index) => (
          <li key={index} className="new-hire-item">
            <div>
              <h3>{hire.name}</h3>
              <p><strong>Start Date:</strong> {hire.startDate}</p>
              <p><strong>Department:</strong> {hire.department}</p>
              <p><strong>Documents Status:</strong> {hire.documentsSubmitted ? "Completed" : "Pending"}</p>
              <p><strong>Onboarding Status:</strong> {hire.status}</p>
            </div>

            <div className="status-buttons">
              <button
                onClick={() => handleUpdateStatus(index, "Completed")}
                disabled={hire.status === "Completed"}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleUpdateStatus(index, "In Progress")}
                disabled={hire.status === "In Progress" || hire.status === "Completed"}
              >
                Mark as In Progress
              </button>
              <button
                onClick={() => handleUpdateStatus(index, "Pending")}
                disabled={hire.status === "Pending"}
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
