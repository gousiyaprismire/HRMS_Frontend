import React, { useState } from "react";
import "./leaveApplication.css";

function LeaveApplication() {
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Manjunadh", leaveType: "Sick Leave", startDate: "2025-02-05", endDate: "2025-02-06", status: "Pending" },
    { id: 2, name: "Eknath", leaveType: "Vacation", startDate: "2025-02-10", endDate: "2025-02-15", status: "Approved" }
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    leaveType: "Sick Leave",
    startDate: "",
    endDate: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setLeaveRequests(leaveRequests.map(req => req.id === formData.id ? { ...formData, status: "Pending" } : req));
    } else {
      const newLeaveRequest = { id: leaveRequests.length + 1, ...formData, status: "Pending" };
      setLeaveRequests([...leaveRequests, newLeaveRequest]);
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowForm(false);
      setFormData({ id: null, name: "", leaveType: "Sick Leave", startDate: "", endDate: "" });
      setIsEditing(false);
    }, 2000);
  };

  const handleEdit = (request) => {
    setFormData(request);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (entry) => {
    setDeleteEntry(entry);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setLeaveRequests(leaveRequests.filter(req => req.id !== deleteEntry.id));
    setShowDeleteDialog(false);
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
              <tr><td colSpan="7">No leave requests available.</td></tr>
            ) : (
              leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
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

      {showDeleteDialog && deleteEntry && (
        <div className="delete-confirmation-dialog">
          <div className="dialog-content">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete this leave request?</p>
            <ul>
              <li><strong>ID:</strong> {deleteEntry.id}</li>
              <li><strong>Name:</strong> {deleteEntry.name}</li>
              <li><strong>Leave Type:</strong> {deleteEntry.leaveType}</li>
              <li><strong>Start Date:</strong> {deleteEntry.startDate}</li>
              <li><strong>End Date:</strong> {deleteEntry.endDate}</li>
            </ul>
            <div className="dialog-buttons">
              <button className="confirm-btn" onClick={confirmDelete}>Confirm</button>
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveApplication;