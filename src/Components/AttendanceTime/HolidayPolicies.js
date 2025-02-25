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
      <h2 className="page-title">Holiday & Leave Policies</h2>

      {/* Holiday Calendar */}
      <div className="holiday-section-container">
        <h3 className="holiday-header">Company Holidays - 2025</h3>
        <table className="holiday-table-container">
          <thead>
            <tr>
              <th className="holiday-table-header">Date</th>
              <th className="holiday-table-header">Holiday</th>
              <th className="holiday-table-header">Type</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index} className="holiday-row-container">
                <td className="holiday-date-container">{holiday.date}</td>
                <td className="holiday-name-container">{holiday.name}</td>
                <td className="holiday-type-container">{holiday.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      { /* Leave Policies Section */ }
      <div className="leave-section-container">
        <h3 className="leave-header">Leave Policies</h3>
        <table className="leave-table-container">
          <thead>
            <tr>
              <th className="leave-table-header">Type of Leave</th>
              <th className="leave-table-header">Days Allowed</th>
              <th className="leave-table-header">Description</th>
            </tr>
          </thead>
          <tbody>
            {leavePolicies.map((policy, index) => (
              <tr key={index} className="leave-row-container">
                <td className="leave-type-container">{policy.type}</td>
                <td className="leave-days-container">{policy.days}</td>
                <td className="leave-description-container">{policy.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HolidayPolicies;
