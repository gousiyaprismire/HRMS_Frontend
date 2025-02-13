import React from "react";
import { useNavigate } from "react-router-dom";
import "./holidayPolicies.css";

function HolidayPolicies() {
  const navigate = useNavigate();

  const holidays = [
    { date: "2025-01-01", name: "New Year's Day", type: "Public Holiday" },
    { date: "2025-01-26", name: "Republic Day", type: "National Holiday" },
    { date: "2025-08-15", name: "Independence Day", type: "National Holiday" },
    { date: "2025-10-02", name: "Gandhi Jayanti", type: "National Holiday" },
    { date: "2025-12-25", name: "Christmas", type: "Public Holiday" },
  ];

  const leavePolicies = [
    { type: "Casual Leave", days: 12, description: "Can be availed for personal reasons." },
    { type: "Sick Leave", days: 10, description: "For medical emergencies and health issues." },
    { type: "Earned Leave", days: 15, description: "Can be carried forward to the next year." },
    { type: "Maternity Leave", days: 26, description: "For female employees for childbirth." },
    { type: "Paternity Leave", days: 10, description: "For male employees after childbirth." },
  ];

  return (
    <div className="holiday-container">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>

      <h2>Holiday & Leave Policies</h2>

      {/* Holiday Calendar */}
      <div className="holiday-section">
        <h3>Company Holidays - 2025</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.date}</td>
                <td>{holiday.name}</td>
                <td>{holiday.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Policies Section */}
      <div className="leave-section">
        <h3>Leave Policies</h3>
        <table>
          <thead>
            <tr>
              <th>Type of Leave</th>
              <th>Days Allowed</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {leavePolicies.map((policy, index) => (
              <tr key={index}>
                <td>{policy.type}</td>
                <td>{policy.days}</td>
                <td>{policy.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HolidayPolicies;
