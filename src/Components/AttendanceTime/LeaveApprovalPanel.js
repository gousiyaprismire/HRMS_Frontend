import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./leaveApprovalPanel.css"; 

function LeaveApprovalPanel() {
  const navigate = useNavigate();

  // Sample leave requests 
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Manjunadh", leaveType: "Sick Leave", startDate: "2025-02-05", endDate: "2025-02-06", status: "Pending" },
    { id: 2, name: "Eknath", leaveType: "Vacation", startDate: "2025-02-10", endDate: "2025-02-15", status: "Pending" },
    { id: 3, name: "Sowri", leaveType: "Personal", startDate: "2025-02-20", endDate: "2025-02-22", status: "Pending" }
  ]);

  // Function to update leave status
  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="leave-approval-container">
      <h2>Leave Approval Panel</h2>
      <button onClick={() => navigate(-1)}>Back</button>

      <div className="leave-requests">
        <h3>Pending Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length === 0 ? (
              <tr><td colSpan="7">No pending leave requests.</td></tr>
            ) : (
              leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td className={request.status === "Approved" ? "approved" : request.status === "Rejected" ? "rejected" : "pending"}>
                    {request.status}
                  </td>
                  <td>
                    {request.status === "Pending" ? (
                      <>
                        <button className="approve-btn" onClick={() => handleStatusChange(request.id, "Approved")}>Approve</button>
                        <button className="reject-btn" onClick={() => handleStatusChange(request.id, "Rejected")}>Reject</button>
                      </>
                    ) : (
                      <span>Processed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveApprovalPanel;
