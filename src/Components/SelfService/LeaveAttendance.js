import React, { useState } from 'react';
import './SelfService.css';

const LeaveAttendance = () => {
  const [history] = useState([
    { date: '2025-01-15', type: 'Sick Leave', status: 'Approved' },
    { date: '2025-02-02', type: 'Casual Leave', status: 'Pending' },
    { date: '2025-03-10', type: 'Annual Leave', status: 'Rejected' }
  ]);

  return (
    <div className="leave-attendance-container">
      <h2 className="leave-attendance-title">Leave & Attendance History</h2>
      
      {history.length > 0 ? (
        <table className="leave-attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td className={`status-${item.status.toLowerCase()}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="leave-attendance-no-data">No leave or attendance records found.</p>
      )}
    </div>
  );
};

export default LeaveAttendance;
