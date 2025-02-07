import React, { useState } from "react";
import "./Bonusesincentives.css";

function BonusesIncentives({ onBack }) {
  const [bonuses, setBonuses] = useState([
    { id: 1, employee: "Eknath", bonusAmount: "500/-", date: "2024-01-15", reason: "Performance Bonus" },
    { id: 2, employee: "Manjunath", bonusAmount: "300/-", date: "2024-02-10", reason: "Holiday Bonus" },
  ]);

  const [newBonus, setNewBonus] = useState({ employee: "", bonusAmount: "", date: "", reason: "" });

  const handleDelete = (id) => {
    setBonuses(bonuses.filter((bonus) => bonus.id !== id));
  };

  const handleAddBonus = () => {
    if (!newBonus.employee || !newBonus.bonusAmount || !newBonus.date || !newBonus.reason) {
      alert("Please fill all fields!");
      return;
    }

    setBonuses([...bonuses, { id: bonuses.length + 1, ...newBonus }]);
    setNewBonus({ employee: "", bonusAmount: "", date: "", reason: "" });
  };

  return (
    <div className="bonuses-container">
      <h2>Bonuses & Incentives</h2>

      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Bonus Amount</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bonuses.map((bonus) => (
            <tr key={bonus.id}>
              <td>{bonus.employee}</td>
              <td>{bonus.bonusAmount}</td>
              <td>{bonus.date}</td>
              <td>{bonus.reason}</td>
              <td>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => handleDelete(bonus.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-bonus-form">
        <h3>Add Bonus</h3>
        <input type="text" placeholder="Employee Name" value={newBonus.employee} onChange={(e) => setNewBonus({ ...newBonus, employee: e.target.value })} />
        <input type="text" placeholder="Bonus Amount" value={newBonus.bonusAmount} onChange={(e) => setNewBonus({ ...newBonus, bonusAmount: e.target.value })} />
        <input type="date" value={newBonus.date} onChange={(e) => setNewBonus({ ...newBonus, date: e.target.value })} />
        <input type="text" placeholder="Reason" value={newBonus.reason} onChange={(e) => setNewBonus({ ...newBonus, reason: e.target.value })} />
        <button className="add-button" onClick={handleAddBonus}>Add Bonus</button>
      </div>

      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

export default BonusesIncentives;
