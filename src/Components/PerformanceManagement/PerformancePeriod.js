import React, { useState } from "react";
import "./PerformancePeriod.css";

const PerformancePeriod = () => {
  const [periods, setPeriods] = useState([
    { id: 1, name: "Performance Appraisal 2024", startDate: "2024-01-01", endDate: "2024-12-31" },
    { id: 2, name: "Performance Appraisal 2023", startDate: "2023-01-01", endDate: "2023-12-31" }
  ]);

  const [newPeriod, setNewPeriod] = useState({ name: "", startDate: "", endDate: "" });
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (e) => {
    setNewPeriod({ ...newPeriod, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPeriod.name && newPeriod.startDate && newPeriod.endDate) {
      if (editingId !== null) {
        setPeriods(periods.map((period) =>
          period.id === editingId ? { ...period, ...newPeriod } : period
        ));
        setEditingId(null);
      } else {
        setPeriods([...periods, { id: periods.length + 1, ...newPeriod }]);
      }
      setNewPeriod({ name: "", startDate: "", endDate: "" });
    }
  };

  const handleEdit = (period) => {
    setEditingId(period.id);
    setNewPeriod({ name: period.name, startDate: period.startDate, endDate: period.endDate });
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setPeriods(periods.filter((period) => period.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="performance-period-container">
      <h2>Performance Periods</h2>
      <p>Manage appraisal periods for employees and managers.</p>

      <form onSubmit={handleSubmit} className="period-form">
  <input
    type="text"
    name="name"
    placeholder="Performance Period Name"
    value={newPeriod.name}
    onChange={handleChange}
    required
  />
  <input
    type="date"
    name="startDate"
    value={newPeriod.startDate}
    onChange={handleChange}
    required
  />
  <input
    type="date"
    name="endDate"
    value={newPeriod.endDate}
    onChange={handleChange}
    required
  />
  <button type="submit">{editingId ? "Update" : "Add"}</button>
</form>


      <table className="performance-period-table">
        <thead>
          <tr>
            <th>Performance Period</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period.id}>
              <td>{period.name}</td>
              <td>{period.startDate}</td>
              <td>{period.endDate}</td>
              <td>
                <button className="performance-period-edit-btn" onClick={() => handleEdit(period)}>Edit</button>
                <button className="performance-period-delete-btn" onClick={() => confirmDelete(period.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="performance-period-modal-overlay">
          <div className="performance-period-modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this period?</p>
            <div className="performance-period-modal-buttons">
              <button onClick={handleDelete} className="performance-period-delete-btn">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="performance-period-cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformancePeriod;
