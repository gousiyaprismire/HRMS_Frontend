import { useState, useEffect } from "react"; 
import "./OrganizationGoals.css";

function OrganizationGoals() {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    description: "",
    target: "",
    rollupMethod: "",
  });

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
  };

  const handleSave = () => {
    if (newGoal.description.trim() && newGoal.target.trim()) {
      setGoals([...goals, newGoal]);
      setShowModal(false);
    }
  };

  return (
    <div className="organization-goal-container">
      <h2 className="organization-goal-heading">Organization Goals</h2>
      <p className="organization-goal-para">Define top level goals for performance period</p>

      <div className="mb-3">
        <label className="organization-goal-para"> Select Period:</label>
        <select className="form-control">
          <option>Performance Appraisal for 2024</option>
          <option>Performance Appraisal for 2023</option>
          <option>Performance Appraisal for 2022</option>
        </select>
      </div>

      <table className="table">
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
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
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

      {/* Add New Goal Button */}
      <button className="btn btn-success" onClick={handleAddClick}>
        ➕ Add New
      </button>

      {/* Modal for Adding Goal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Goal</h2>
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
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrganizationGoals;
