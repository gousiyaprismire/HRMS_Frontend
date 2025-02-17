import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./timesheetManagement.css";

function TimesheetManagement() {
  const [timesheets, setTimesheets] = useState([
    { id: 1, date: "2025-02-05", workHours: 8, overtime: 0, shift: "Morning", comments: "Regular workday" },
    { id: 2, date: "2025-02-06", workHours: 9, overtime: 1, shift: "Evening", comments: "Overtime due to project" },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    date: "",
    workHours: "",
    shift: "Morning",
    comments: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(null);  // Store the entry to be deleted

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workHours = parseFloat(formData.workHours);
    const overtime = workHours > 9 ? workHours - 9 : 0;

    if (isEditing) {
      setTimesheets(timesheets.map((entry) => (entry.id === formData.id ? { ...formData, workHours, overtime } : entry)));
    } else {
      const newTimesheet = {
        id: timesheets.length + 1,
        date: formData.date,
        workHours,
        overtime,
        shift: formData.shift,
        comments: formData.comments,
      };
      setTimesheets([...timesheets, newTimesheet]);
    }

    setShowForm(false);
    setFormData({ id: null, date: "", workHours: "", shift: "Morning", comments: "" });
    setIsEditing(false);
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (entry) => {
    setDeleteEntry(entry);  // Store the entry to be deleted
    setShowDeleteDialog(true);  // Show the delete confirmation dialog
  };

  const confirmDelete = () => {
    setTimesheets(timesheets.filter((entry) => entry.id !== deleteEntry.id));
    setShowDeleteDialog(false);  // Close the dialog after deletion
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);  // Close the dialog without deleting
  };

  return (
    <div className="timesheet-container">
      <button className="add-entry-btn" onClick={() => setShowForm(true)}>Add Entry</button>

      <h2>Timesheet Management</h2>

      {showForm && (
        <div className={`timesheet-form ${showForm ? "show" : ""}`}>
          <h3>{isEditing ? "Edit Timesheet Entry" : "Add New Timesheet Entry"}</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <label>Work Hours:</label>
              <input type="number" name="workHours" value={formData.workHours} onChange={handleChange} required />
            </div>
            <div>
              <label>Shift:</label>
              <select name="shift" value={formData.shift} onChange={handleChange}>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <div>
              <label>Comments:</label>
              <input type="text" name="comments" value={formData.comments} onChange={handleChange} />
            </div>
            <div className="form-buttons">
              <button type="submit">{isEditing ? "Update" : "Add"} Entry</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="timesheet-table">
        <h3>Timesheet Records</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Work Hours</th>
              <th>Overtime</th>
              <th>Shift</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.length === 0 ? (
              <tr><td colSpan="7">No records available.</td></tr>
            ) : (
              timesheets.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.date}</td>
                  <td>{entry.workHours}</td>
                  <td className={entry.overtime > 0 ? "overtime" : ""}>{entry.overtime}</td>
                  <td>{entry.shift}</td>
                  <td>{entry.comments}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(entry)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(entry)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && deleteEntry && (
        <div className="delete-confirmation-dialog">
          <div className="dialog-content">
            <h4>Confirm Deletion</h4>
            <p>Are you sure you want to delete the following entry?</p>
            <ul>
              <li><strong>ID:</strong> {deleteEntry.id}</li>
              <li><strong>Date:</strong> {deleteEntry.date}</li>
              <li><strong>Work Hours:</strong> {deleteEntry.workHours}</li>
              <li><strong>Overtime:</strong> {deleteEntry.overtime}</li>
              <li><strong>Shift:</strong> {deleteEntry.shift}</li>
              <li><strong>Comments:</strong> {deleteEntry.comments}</li>
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

export default TimesheetManagement;