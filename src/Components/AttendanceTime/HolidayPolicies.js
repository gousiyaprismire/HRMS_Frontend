import React, { useState, useEffect } from "react";
import axios from "axios";
import "./holidayPolicies.css";

const API_URL = "http://localhost:8080/api/leaves"; 

function HolidayPolicies() {
  const [leavePolicies, setLeavePolicies] = useState([]);

  const holidays = [
    { date: "2025-01-01", name: "New Year's Day", type: "Public Holiday" },
    { date: "2025-01-26", name: "Republic Day", type: "National Holiday" },
    { date: "2025-08-15", name: "Independence Day", type: "National Holiday" },
    { date: "2025-10-02", name: "Gandhi Jayanti", type: "National Holiday" },
    { date: "2025-12-25", name: "Christmas", type: "Public Holiday" },
  ];

  useEffect(() => {
    fetchLeavePolicies();
  }, []);

  const fetchLeavePolicies = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeavePolicies(response.data);
    } catch (error) {
      console.error("Error fetching leave policies:", error);
    }
  };

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

      {/* Leave Policies Section */}
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
            {leavePolicies.length === 0 ? (
              <tr>
                <td colSpan="3">No leave policies available.</td>
              </tr>
            ) : (
              leavePolicies.map((policy, index) => (
                <tr key={index} className="leave-row-container">
                  <td className="leave-type-container">{policy.type}</td>
                  <td className="leave-days-container">{policy.days}</td>
                  <td className="leave-description-container">{policy.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HolidayPolicies;
