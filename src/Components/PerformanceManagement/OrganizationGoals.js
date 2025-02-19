import { useState, useEffect } from "react";
import "./OrganizationGoals.css";

function OrganizationGoals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Fetch goals from API
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

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

      <button className="btn btn-success">Add New</button>
    </div>
  );
}

export default OrganizationGoals;
