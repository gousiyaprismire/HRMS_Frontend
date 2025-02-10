import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./timesheetManagement.css"; 

function TimesheetManagement() {
  const navigate = useNavigate();

  const [timesheets, setTimesheets] = useState([
    { id: 1, date: "2025-02-05", workHours: 8, overtime: 0, shift: "Morning", comments: "Regular workday" },
    { id: 2, date: "2025-02-06", workHours: 9, overtime: 1, shift: "Evening", comments: "Overtime due to project" },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    workHours: "",
    shift: "Morning",
    comments: "",
  });

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

    const newTimesheet = {
      id: timesheets.length + 1,
      date: formData.date,
      workHours,
      overtime,
      shift: formData.shift,
      comments: formData.comments,
    };

    setTimesheets([...timesheets, newTimesheet]);
    setFormData({ date: "", workHours: "", shift: "Morning", comments: "" });
  };

  const handleDelete = (id) => {
    setTimesheets(timesheets.filter((entry) => entry.id !== id));
  };

  return (
    <div className="timesheet-container">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>

      <h2>Timesheet Management</h2>

      <form onSubmit={handleSubmit} className="timesheet-form">
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
        <button type="submit">Add Entry</button>
      </form>

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
              <th>Action</th>
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
                    <button className="delete-btn" onClick={() => handleDelete(entry.id)}>Delete</button>
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

export default TimesheetManagement;
