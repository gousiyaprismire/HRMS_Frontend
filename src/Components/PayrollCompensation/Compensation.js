import React, { useState, useEffect } from "react";
import "./Compensation.css";

function Compensation() {
  const [compensations, setCompensations] = useState([]);
  const [newComp, setNewComp] = useState({
    employeeId: "",
    employeeName: "",
    ctc: "",
    variablePay: ""
  });
  const [calculatedData, setCalculatedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  const calculateBreakup = (ctcValue, variablePayValue) => {
    const basicPay = ctcValue * 0.50;
    const hra = ctcValue * 0.20;
    const conveyanceAllowance = ctcValue * 0.048;
    const medicalAllowance = ctcValue * 0.045;
    const employerPf = basicPay * 0.06;
    const specialAllowance = ctcValue - (basicPay + hra + conveyanceAllowance + medicalAllowance + employerPf);
    
    const employeePf = employerPf;
    const professionalTax = 2400.0;
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
      variablePay: variablePayValue,
      totalDeductions,
      netTakeHome,
    };
  };

  const handleAddNew = () => {
    setIsAddModalOpen(true);
    setNewComp({ employeeId: "", ctc: "", variablePay: "" });
    setCalculatedData(null);
  };

  const handleCalculate = () => {
    const { ctc, variablePay } = newComp;
    const breakdown = calculateBreakup(parseFloat(ctc), parseFloat(variablePay));
    setCalculatedData(breakdown);
  };

  const handleSaveNew = async () => {
    const payload = {
      ...newComp,
      ctc: parseFloat(newComp.ctc),
      variablePay: parseFloat(newComp.variablePay),
      ...calculatedData,
    };

    try {
      const response = await fetch("http://localhost:8080/api/compensations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setCompensations([...compensations, data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error saving compensation:", error);
    }
  };

  const handleUpdate = async () => {
    const breakdown = calculateBreakup(parseFloat(editingComp.ctc), parseFloat(editingComp.variablePay));

    try {
      const response = await fetch(
        `http://localhost:8080/api/compensations/${editingComp.employeeId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editingComp, ...breakdown }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      const updated = await response.json();

      setCompensations((prev) =>
        prev.map((c) => (c.employeeId === updated.employeeId ? updated : c))
      );
      setIsModalOpen(false);
      setEditingComp(null);
    } catch (error) {
      console.error("Update Error:", error);
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

      <button onClick={handleAddNew} className="compensation-button">
        Add New Compensation
      </button>

      <table className="compensation-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
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
              <tr key={comp.employeeId}>

                <td>{comp.employeeId}</td>
                <td>{comp.employeeName}</td>
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


      {isAddModalOpen && (
        <div className="compensation-modal-overlay">
          <div className="compensation-modal">
            <h3 className="compensation-modal-title">Add New Compensation</h3>
            <div className="compensation-modal-grid">
            <input
                type="text"
                placeholder="Employee Name"
                value={newComp.employeeName}
                onChange={(e) => setNewComp({ ...newComp, employeeName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Employee ID"
                value={newComp.employeeId}
                onChange={(e) => setNewComp({ ...newComp, employeeId: e.target.value })}
              />
              <input
                type="number"
                placeholder="CTC"
                value={newComp.ctc}
                onChange={(e) => setNewComp({ ...newComp, ctc: e.target.value })}
              />
              <input
                type="number"
                placeholder="Variable Pay"
                value={newComp.variablePay}
                onChange={(e) => setNewComp({ ...newComp, variablePay: e.target.value })}
              />
              <button onClick={handleCalculate}>Calculate</button>
            </div>

            {calculatedData && (
              <div className="compensation-modal-grid">
                {Object.entries(calculatedData).map(([key, value]) => (
                  <div key={key}>
                    <label>{key.replace(/([A-Z])/g, " $1")}</label>
                    <input value={value} readOnly />
                  </div>
                ))}
              </div>
            )}

            <div className="compensation-modal-buttons">
              <button onClick={handleSaveNew}>Save</button>
              <button onClick={() => setIsAddModalOpen(false)} className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && editingComp && (
        <div className="compensation-modal-overlay">
          <div className="compensation-modal">
            <h3>Edit Compensation</h3>
            <div className="compensation-modal-grid">
              {[
                "employeeId", "employeeName", "ctc", "basicPay", "hra", "conveyanceAllowance", "medicalAllowance",
                "specialAllowance", "employerPf", "employeePf", "professionalTax",
                "variablePay", "totalDeductions", "netTakeHome"
              ].map((field) => (
                <div key={field}>
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type={field === "employeeId" ? "text" : "number"}
                    value={editingComp[field]}
                    readOnly={field === "employeeId"}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="compensation-modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsModalOpen(false)} className="cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compensation;
