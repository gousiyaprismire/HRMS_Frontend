import React, { useState, useEffect } from "react";
import "./Compensation.css";

function Compensation() {
  const [compensations, setCompensations] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [ctc, setCtc] = useState("");
  const [editingComp, setEditingComp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCompensations();
  }, []);

  const fetchCompensations = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/compensations");
      const data = await response.json();
      setCompensations(data);
    } catch (error) {
      console.error("Error fetching compensations:", error);
    }
  };

  const calculateBreakup = (ctcValue) => {
    const basicPay = ctcValue * 0.4;
    const hra = basicPay * 0.5;
    const conveyanceAllowance = 1600;
    const medicalAllowance = 1250;
    const specialAllowance =
      ctcValue - (basicPay + hra + conveyanceAllowance + medicalAllowance);
    const employerPf = basicPay * 0.12;
    const employeePf = basicPay * 0.12;
    const professionalTax = 200;
    const variablePay = ctcValue * 0.1;
    const totalDeductions = employeePf + professionalTax;
    const netTakeHome = ctcValue - totalDeductions;

    return {
      basicPay,
      hra,
      conveyanceAllowance,
      medicalAllowance,
      specialAllowance,
      employerPf,
      employeePf,
      professionalTax,
      variablePay,
      totalDeductions,
      netTakeHome,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const breakdown = calculateBreakup(parseFloat(ctc));
    const compensationData = {
      employeeId,
      ctc: parseFloat(ctc),
      ...breakdown,
    };

    try {
      const response = await fetch("http://localhost:8080/api/compensations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(compensationData),
      });

      const data = await response.json();
      setCompensations([...compensations, data]);
      setEmployeeId("");
      setCtc("");
    } catch (error) {
      console.error("Error saving compensation:", error);
    }
  };

  const handleUpdate = async () => {
    const breakdown = calculateBreakup(parseFloat(editingComp.ctc));

    try {
      const response = await fetch(
        `http://localhost:8080/api/compensations/${editingComp.employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...editingComp, ...breakdown }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();

      setCompensations((prev) =>
        prev.map((c) =>
          c.employeeId === updated.employeeId ? updated : c
        )
      );

      setIsModalOpen(false);
      setEditingComp(null);
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update compensation.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditingComp((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="compensation-container">
      <h2 className="compensation-title">Employee Compensation</h2>
      <form onSubmit={handleSubmit} className="compensation-form">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="compensation-input"
        />
        <input
          type="number"
          placeholder="CTC"
          value={ctc}
          onChange={(e) => setCtc(e.target.value)}
          className="compensation-input"
        />
        <button type="submit" className="compensation-button">Save</button>
      </form>

      <table className="compensation-table">
        <thead>
          <tr className="compensation-header-row">
            <th>Employee ID</th>
            <th>CTC</th>
            <th>Basic Pay</th>
            <th>HRA</th>
            <th>Conveyance Allowance</th>
            <th>Medical Allowance</th>
            <th>Special Allowance</th>
            <th>Employer PF</th>
            <th>Employee PF</th>
            <th>Professional Tax</th>
            <th>Variable Pay</th>
            <th>Total Deductions</th>
            <th>Net Take Home</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(compensations) &&
            compensations.map((comp) => (
              <tr key={comp.employeeId} className="compensation-row">
                <td>{comp.employeeId}</td>
                <td>{comp.ctc}</td>
                <td>{comp.basicPay}</td>
                <td>{comp.hra}</td>
                <td>{comp.conveyanceAllowance}</td>
                <td>{comp.medicalAllowance}</td>
                <td>{comp.specialAllowance}</td>
                <td>{comp.employerPf}</td>
                <td>{comp.employeePf}</td>
                <td>{comp.professionalTax}</td>
                <td>{comp.variablePay}</td>
                <td>{comp.totalDeductions}</td>
                <td>{comp.netTakeHome}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingComp(comp);
                      setIsModalOpen(true);
                    }}
                    className="compensation-edit-button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && editingComp && (
  <div className="compensation-modal-overlay">
    <div className="compensation-modal">
      <h3 className="compensation-modal-title">Edit Compensation</h3>

      <div className="compensation-modal-grid">
        {[
          ["Employee ID", "employeeId"],
          ["CTC", "ctc"],
          ["Basic Pay", "basicPay"],
          ["HRA", "hra"],
          ["Conveyance Allowance", "conveyanceAllowance"],
          ["Medical Allowance", "medicalAllowance"],
          ["Special Allowance", "specialAllowance"],
          ["Employer PF", "employerPf"],
          ["Employee PF", "employeePf"],
          ["Professional Tax", "professionalTax"],
          ["Variable Pay", "variablePay"],
          ["Total Deductions", "totalDeductions"],
          ["Net Take Home", "netTakeHome"],
        ].map(([label, field]) => (
          <div className="compensation-modal-field" key={field}>
            <label>{label}</label>
            <input
              type={field === "employeeId" ? "text" : "number"}
              readOnly={field === "employeeId"}
              value={editingComp[field]}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              className="compensation-modal-input"
            />
          </div>
        ))}
      </div>

      <div className="compensation-modal-buttons">
        <button
          onClick={handleUpdate}
          className="compensation-modal-button"
        >
          Save
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="compensation-modal-button cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Compensation;
