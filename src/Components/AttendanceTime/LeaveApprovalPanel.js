import React, { useState, useEffect } from "react";
import axios from "axios";
import "./leaveApprovalPanel.css";

const API_URL = "http://localhost:8080/api/leave-applications"; 

function LeaveApprovalPanel() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/pending`);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/updateStatus/${id}`, null, {
        params: { status: newStatus },
      });

      // **Update state immediately instead of refetching**
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <div className="leave-approval-container">
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
              <tr>
                <td colSpan="7">No pending leave requests.</td>
              </tr>
            ) : (
              leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td className={request.status.toLowerCase()}>{request.status}</td>
                  <td>
                    {request.status === "Pending" ? (
                      <>
                        <button
                          className="approve-btn"
                          onClick={() => handleStatusChange(request.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleStatusChange(request.id, "Rejected")}
                        >
                          Reject
                        </button>
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
