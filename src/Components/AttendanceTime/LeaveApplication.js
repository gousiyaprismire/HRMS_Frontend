import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./leaveApplication.css"; 

function LeaveApplication() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Manjunadh", leaveType: "Sick Leave", startDate: "2025-02-05", endDate: "2025-02-06", status: "Pending" },
    { id: 2, name: "Eknath", leaveType: "Vacation", startDate: "2025-02-10", endDate: "2025-02-15", status: "Approved" }
  ]);
  
  const [formData, setFormData] = useState({
    name: "",
    leaveType: "Sick Leave",
    startDate: "",
    endDate: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeaveRequest = {
      ...formData,
      id: leaveRequests.length + 1,
      status: "Pending"
    };
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setFormData({
      name: "",
      leaveType: "Sick Leave",
      startDate: "",
      endDate: ""
    });
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="leave-application-container">
      <h2>Leave Application</h2>
      <button onClick={handleBack}>Back</button>
      <form onSubmit={handleSubmit} className="leave-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Leave Type:</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
          >
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Apply for Leave</button>
      </form>

      <div className="leave-requests">
        <h3>Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.name}</td>
                <td>{request.leaveType}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveApplication;
