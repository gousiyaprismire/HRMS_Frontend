import React, { useState } from "react"; 
import "./AppraisalForms.css";

const AppraisalForms = () => {
  const [period, setPeriod] = useState("Performance Appraisal for 2024");
  const [location, setLocation] = useState("All Locations");
  const [department, setDepartment] = useState("All Departments");
  const [forms, setForms] = useState([
    { id: 1, employee: "Name1", manager: "Manager1", status: "Pending", lastAction: "10 Feb 2025" },
    { id: 2, employee: "Name2", manager: "Manager2", status: "Approved", lastAction: "15 Feb 2025" }
  ]);

  const showForms = () => {
    console.log("Showing forms...");
  };

  const editForm = (id) => {
    alert(`Editing form ID: ${id}`);
  };

  const deleteForm = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      setForms(forms.filter((form) => form.id !== id));
    }
  };

  const releaseForms = () => {
    setForms(forms.map((form) => ({ ...form, status: "Released", lastAction: new Date().toLocaleDateString() })));
  };

  const recallForms = () => {
    setForms(forms.map((form) => ({ ...form, status: "Recalled", lastAction: new Date().toLocaleDateString() })));
  };

  return (
    <div className="performance-appraisal-container">
      <h2 className="performance-period-h2">Appraisal Forms</h2>
      <p className="performance-period-p">View appraisal forms submitted by employees and managers.</p>

      <div className="performance-appraisal-filters">
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option>Performance Appraisal for 2024</option>
          <option>Performance Appraisal for 2023</option>
          <option>Performance Appraisal for 2022</option>
        </select>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option>All Locations</option>
          <option>New York</option>
          <option>Los Angeles</option>
          <option>Chicago</option>
        </select>

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option>All Departments</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Engineering</option>
        </select>

        <button className="performance-appraisal-show-btn" onClick={showForms}>Show Forms</button>
      </div>

      <div className="performance-appraisal-action-buttons">
        <button className="performance-appraisal-release-btn" onClick={releaseForms}>Release Forms</button>
        <button className="performance-appraisal-recall-btn" onClick={recallForms}>Recall Forms</button>
      </div>

      <table className="performance-appraisal-appraisal-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Manager</th>
            <th>Status</th>
            <th>Last Action</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.length === 0 ? (
            <tr>
              <td colSpan="5">No appraisal forms available.</td>
            </tr>
          ) : (
            forms.map((form) => (
              <tr key={form.id}>
                <td>{form.employee}</td>
                <td>{form.manager}</td>
                <td>{form.status}</td>
                <td>{form.lastAction}</td>
                <td>
                  <div className="appraisal-form-actions">
                    <button className="performance-appraisal-form-edit-btn" onClick={() => editForm(form.id)}>Edit</button>
                    <button className="performance-appraisal-form-delete-btn" onClick={() => deleteForm(form.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* <div className="appraisal-form-actions">
        <button className="save-btn">Save</button>
        <button className="cancel-btn">Cancel</button>
      </div> */}
    </div>
  );
};

export default AppraisalForms;
