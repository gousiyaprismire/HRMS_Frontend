import React, { useEffect, useState } from "react";
import "./Compensation.css";

const Compensation = () => {
  const [compensations, setCompensations] = useState([]);
  const [newComp, setNewComp] = useState({ employeeId: "", ctc: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/compensations")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => setCompensations(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Unable to fetch compensations.");
      });
  }, []);

  const handleChange = (e) => {
    setNewComp({ ...newComp, [e.target.name]: e.target.value });
  };

  const calculateBreakup = (ctc) => {
    const annualCTC = parseFloat(ctc);
    const basicPay = Math.round(annualCTC * 0.5);
    const hra = Math.round(basicPay * 0.4);
    const conveyanceAllowance = 19200;
    const medicalAllowance = 15000;
    const employerPf = Math.round(basicPay * 0.12);
    const specialAllowance =
      annualCTC -
      (basicPay + hra + conveyanceAllowance + medicalAllowance + employerPf);
    const employeePf = employerPf;
    const professionalTax = 2400;
    const variablePay = 15840;
    const totalDeductions = employeePf + professionalTax + variablePay;
    const netTakeHome = annualCTC - totalDeductions;

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
    setLoading(true);
    setError("");

    const { employeeId, ctc } = newComp;

    if (!employeeId || !ctc) {
      setError("Employee ID and CTC are required.");
      setLoading(false);
      return;
    }

    const breakdown = calculateBreakup(ctc);

    try {
      const response = await fetch("http://localhost:8080/api/compensations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId, ctc, ...breakdown }),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Failed to add compensation.");
      }

      const added = await response.json();
      setCompensations([...compensations, added]);
      setNewComp({ employeeId: "", ctc: "" });
    } catch (err) {
      console.error("Add error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compensation-container">
      <h2 className="compensation-title">Compensation Management</h2>

      <form className="compensation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          value={newComp.employeeId}
          onChange={handleChange}
          className="compensation-input"
          required
        />
        <input
          type="number"
          name="ctc"
          placeholder="CTC (₹)"
          value={newComp.ctc}
          onChange={handleChange}
          className="compensation-input"
          required
        />
        <button type="submit" className="compensation-button" disabled={loading}>
          {loading ? "Adding..." : "Add Compensation"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <table className="compensation-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>CTC</th>
            <th>Basic Pay</th>
            <th>HRA</th>
            <th>Conveyance</th>
            <th>Medical</th>
            <th>Special</th>
            <th>Employer PF</th>
            <th>Employee PF</th>
            <th>Tax</th>
            <th>Variable Pay</th>
            <th>Deductions</th>
            <th>Net Take Home</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(compensations) &&
            compensations.map((comp) => (
              <tr key={comp.id || comp.employeeId}>
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Compensation;
