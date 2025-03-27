import React, { useState, useEffect } from "react";
import axios from "axios";
import "./timesheetManagement.css";

const API_URL = "http://localhost:8080/api/timesheets";

function TimesheetManagement() {
  const [timesheets, setTimesheets] = useState([]);
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
  const [deleteEntry, setDeleteEntry] = useState(null);

  // Fetch all timesheets on component load
  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    try {
      const response = await axios.get(API_URL);
      setTimesheets(response.data);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workHours = parseFloat(formData.workHours);
    const overtime = workHours > 9 ? workHours - 9 : 0;

    try {
      if (isEditing) {
        // Update existing entry
        await axios.put(`${API_URL}/${formData.id}`, { ...formData, workHours, overtime });
      } else {
        // Add new entry
        await axios.post(API_URL, { ...formData, workHours, overtime });
      }

      fetchTimesheets();
      setShowForm(false);
      resetForm();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving timesheet:", error);
    }
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (entry) => {
    setDeleteEntry(entry);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteEntry || !deleteEntry.id) return;

    try {
      await axios.delete(`${API_URL}/${deleteEntry.id}`);
      fetchTimesheets();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting timesheet:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      date: "",
      workHours: "",
      shift: "Morning",
      comments: "",
    });
  };

  return (
    <div className="timesheet-container">
      <button className="add-entry-btn" onClick={() => setShowForm(true)}>+ Add Entry</button>

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
