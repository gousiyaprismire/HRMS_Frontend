import { useState, useEffect } from "react";
import axios from "axios";
import "./OrganizationGoals.css";

function OrganizationGoals() {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    description: "",
    target: "",
    rollupMethod: "",
    period: "", 
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);


  const fetchGoals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/organization_goals");
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };


  const handleAddClick = () => {
    setShowModal(true);
    setNewGoal({ description: "", target: "", rollupMethod: "", period: "" });
    setEditingIndex(null);
  };

 
  const handleSave = async () => {
    if (!newGoal || !newGoal.description || !newGoal.period) {
      alert("Goal description and period are required.");
      return;
    }
  
    const goalData = {
      goalDescription: newGoal.description.trim(),
      target: newGoal.target ? newGoal.target.trim() : "",
      rollupMethod: newGoal.rollupMethod ? newGoal.rollupMethod.trim() : "",
      period: newGoal.period.trim(),
    };
  
    try {
      if (editingIndex !== null) {
        await axios.put(
          `http://localhost:8080/api/organization_goals/${goals[editingIndex].id}`,
          goalData
        );
      } else {
        await axios.post("http://localhost:8080/api/organization_goals", goalData);
      }
      fetchGoals();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving goal:", error.response ? error.response.data : error.message);
      alert("Failed to save goal. Please check your input.");
    }
  };
  
  const handleEdit = (index) => {
    setNewGoal(goals[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (deleteIndex !== null) {
      try {
        await axios.delete(`http://localhost:8080/api/organization_goals/${goals[deleteIndex].id}`);
        fetchGoals();
        setShowDeleteModal(false);
        setDeleteIndex(null);
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
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

      <p className="organization-goal-para">Define top-level goals for the performance period.</p>

      <table className="organization-goal-table">
        <thead>
          <tr>
            <th>Goal Description</th>
            <th>Target</th>
            <th>Rollup Method</th>
            <th>Period</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <tr key={goal.id}>
                <td>{goal.goalDescription}</td>
                <td>{goal.target}</td>
                <td>{goal.rollupMethod}</td>
                <td>{goal.period}</td>
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
              <td colSpan="5" className="text-center">No records found</td>
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
            <label>Period *</label>
            <input
              type="text"
              value={newGoal.period}
              onChange={(e) => setNewGoal({ ...newGoal, period: e.target.value })}
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
