import React, { useState } from "react";
import "./Bonuses.css";

const Bonuses = ({ goBack, openAddBonus }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const bonusData = [
    { id: 1, empId: "E101", name: "Manjunath", bonus: "5000", reason: "Project Completion" },
    { id: 2, empId: "E102", name: "Eknath", bonus: "3000", reason: "Extra Hours Worked" },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bonuses-container">
      <h2>Bonuses & Incentives</h2>
      <div className="bonuses-header">
        <input
          type="text"
          placeholder="Search by Employee ID or Name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="add-bonus-btn" onClick={openAddBonus}>
          + Add Bonus
        </button>
      </div>
      <table className="bonus-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Bonus Amount</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {bonusData
            .filter((b) => b.empId.includes(searchTerm) || b.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((b) => (
              <tr key={b.id}>
                <td>{b.empId}</td>
                <td>{b.name}</td>
                <td>{b.bonus}</td>
                <td>{b.reason}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="back-btn" onClick={() => goBack()}>
        Back
      </button>
    </div>
  );
};

export default Bonuses;
