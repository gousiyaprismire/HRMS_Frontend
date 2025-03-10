import { useState, useEffect } from "react";
import "./OrganizationGoals.css";

function OrganizationGoals() {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    description: "",
    target: "",
    rollupMethod: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    // Fetch goals from API
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  const handleAddClick = () => {
    setShowModal(true);
    setNewGoal({ description: "", target: "", rollupMethod: "" });
    setEditingIndex(null);
  };

  const handleSave = () => {
    if (newGoal.description.trim() && newGoal.target.trim()) {
      if (editingIndex !== null) {
        const updatedGoals = [...goals];
        updatedGoals[editingIndex] = newGoal;
        setGoals(updatedGoals);
      } else {
        setGoals([...goals, newGoal]);
      }
      setShowModal(false);
    }
  };

  const handleEdit = (index) => {
    setNewGoal(goals[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedGoals = goals.filter((_, i) => i !== deleteIndex);
      setGoals(updatedGoals);
      setShowDeleteModal(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="organization-goal-container">
      <div className="organization-goal-header-container">
        <h2 className="organization-goal-heading">Organization Goals</h2>
        <button className="btn organization-goal-btn-success organization-goal-add-new-button" onClick={handleAddClick}>
          ➕ Add New
        </button>
      </div>

      <p className="organization-goal-para">Define top level goals for performance period</p>

      <div className="mb-3">
        <label className="organization-goal-para"> Select Period:</label>
        <select className="form-control organization-goal-select-period">
          <option>Performance Appraisal for 2024</option>
          <option>Performance Appraisal for 2023</option>
          <option>Performance Appraisal for 2022</option>
        </select>
      </div>

      <table className="organization-goal-table">
        <thead>
          <tr>
            <th>Goal Description</th>
            <th>Target</th>
            <th>Rollup Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <tr key={index}>
                <td>{goal.description}</td>
                <td>{goal.target}</td>
                <td>{goal.rollupMethod}</td>
                <td>
                  <button className="btn organization-goal-btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                  <button
                    className="btn organization-goal-btn-danger"
                    onClick={() => {
                      setDeleteIndex(index);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingIndex !== null ? "Edit Goal" : "Add New Goal"}</h2>
            <label>Goal Description *</label>
            <input
              type="text"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            />
            <label>Target *</label>
            <input
              type="text"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            />
            <label>Rollup Method</label>
            <input
              type="text"
              value={newGoal.rollupMethod}
              onChange={(e) => setNewGoal({ ...newGoal, rollupMethod: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Close</button>
              <button onClick={handleSave}>{editingIndex !== null ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this goal?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn organization-goal-btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationGoals;
