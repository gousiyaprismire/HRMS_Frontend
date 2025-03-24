import React, { useState, useEffect } from "react";
import axios from "axios";
import "./leaveApplication.css";

const API_URL = "http://localhost:8080/api/leave-applications";

function LeaveApplication() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    empId: "",
    name: "",
    leaveType: "Sick Leave",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(API_URL);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.empId.trim()) {
      alert("Employee ID cannot be empty.");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${formData.id}`, formData);
      } else {
        await axios.post(API_URL, { ...formData, status: "Pending", empId: formData.empId.trim() });
      }

      fetchLeaveRequests();
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setShowForm(false);
        resetForm();
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  const handleEdit = (request) => {
    setFormData({
      id: request.id,
      empId: request.empId || "",
      name: request.name,
      leaveType: request.leaveType,
      startDate: request.startDate,
      endDate: request.endDate,
      status: request.status || "Pending",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      empId: "",
      name: "",
      leaveType: "Sick Leave",
      startDate: "",
      endDate: "",
      status: "Pending",
    });
  };

  const handleDelete = (entry) => {
    setDeleteEntry(entry);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteEntry.id}`);
      fetchLeaveRequests();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting leave request:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className="leave-container">
      <button className="add-entry-btn" onClick={() => setShowForm(true)}>Apply for Leave</button>
      <h2>Leave Application</h2>

      {showForm && (
        <div className="leave-form show">
          <h3>{isEditing ? "Edit Leave Request" : "New Leave Request"}</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Employee ID:</label>
              <input type="text" name="empId" value={formData.empId} onChange={handleChange} required />
            </div>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Leave Type:</label>
              <select name="leaveType" value={formData.leaveType} onChange={handleChange}>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Vacation">Vacation</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <div>
              <label>Start Date:</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
            </div>
            <div className="form-buttons">
              <button type="submit">{isEditing ? "Update" : "Submit"}</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
          {showSuccess && <p className="success-message">Leave request submitted successfully!</p>}
        </div>
      )}

      <div className="leave-table">
        <h3>Leave Requests</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length === 0 ? (
              <tr><td colSpan="8">No leave requests available.</td></tr>
            ) : (
              leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.empId}</td>
                  <td>{request.name}</td>
                  <td>{request.leaveType}</td>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.status}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(request)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(request)}>Delete</button>
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

export default LeaveApplication;
