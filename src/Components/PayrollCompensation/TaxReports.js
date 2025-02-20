import React, { useState, useEffect } from "react";
import "./TaxReports.css";

const TaxReports = () => {
  const [taxReports, setTaxReports] = useState([
    { id: 1, empId: "EMP001", name: "John Doe", providentFund: 5000, insurance: 2000, deductions: 1500 },
    { id: 2, empId: "EMP002", name: "Jane Smith", providentFund: 5500, insurance: 2200, deductions: 1700 },
  ]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [newReport, setNewReport] = useState({
    empId: "",
    name: "",
    providentFund: "",
    insurance: "",
    deductions: "",
  });

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const openPopup = (report = null) => {
    setSelectedReport(report);
    setNewReport(report || { empId: "", name: "", providentFund: "", insurance: "", deductions: "" });
    setPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedReport(null);
    setPopupOpen(false);
  };

  const showToastMessage = (message, isError = false) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSave = () => {
    if (selectedReport) {
      setTaxReports(taxReports.map(report => report.id === selectedReport.id ? { ...newReport, id: selectedReport.id } : report));
      showToastMessage("Updated Successfully!");
    } else {
      setTaxReports([...taxReports, { id: taxReports.length + 1, ...newReport }]);
      showToastMessage("Added Successfully!");
    }
    closePopup();
  };

  const handleDelete = (id) => {
    setTaxReports(taxReports.filter(report => report.id !== id));
    showToastMessage("Deleted Successfully!", true);
    setDeleteConfirm(null);
  };

  return (
    <div className="tax-container">
      <button className="tax-add-new-btn" onClick={() => openPopup()}>+ Add New</button>

      <div className="tax-filters">
        <input type="text" placeholder="Search..." className="tax-search" />
        <select><option>Month</option></select>
        <select><option>Year</option></select>
      </div>

      <table className="tax-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Provident Fund</th>
            <th>Insurance</th>
            <th>Deductions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxReports.map((report) => (
            <tr key={report.id}>
              <td>{report.empId}</td>
              <td>{report.name}</td>
              <td>{report.providentFund}</td>
              <td>{report.insurance}</td>
              <td>{report.deductions}</td>
              <td>
                <button className="tax-edit-btn" onClick={() => openPopup(report)}>Edit</button>
                <button className="tax-delete-btn" onClick={() => setDeleteConfirm(report.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="tax-popup-overlay" onClick={closePopup}>
          <div className="tax-popup show" onClick={(e) => e.stopPropagation()}>
            <button className="tax-close-btn" onClick={closePopup}>×</button>
            <h2>{selectedReport ? "Edit Tax Report" : "Add New Tax Report"}</h2>
            <div className="tax-form-group">
              <label>Emp ID:</label>
              <input type="text" value={newReport.empId} onChange={(e) => setNewReport({ ...newReport, empId: e.target.value })} />
            </div>
            <div className="tax-form-group">
              <label>Name:</label>
              <input type="text" value={newReport.name} onChange={(e) => setNewReport({ ...newReport, name: e.target.value })} />
            </div>
            <div className="tax-form-group">
              <label>Provident Fund:</label>
              <input type="number" value={newReport.providentFund} onChange={(e) => setNewReport({ ...newReport, providentFund: e.target.value })} />
            </div>
            <div className="tax-form-group">
              <label>Insurance:</label>
              <input type="number" value={newReport.insurance} onChange={(e) => setNewReport({ ...newReport, insurance: e.target.value })} />
            </div>
            <div className="tax-form-group">
              <label>Deductions:</label>
              <input type="number" value={newReport.deductions} onChange={(e) => setNewReport({ ...newReport, deductions: e.target.value })} />
            </div>
            <div className="tax-popup-buttons">
              <button className="tax-save-btn" onClick={handleSave}>Save</button>
              <button className="tax-cancel-btn" onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm !== null && (
        <div className="tax-popup-overlay">
          <div className="tax-delete-popup">
            <p>Are you sure you want to delete?</p>
            <button className="tax-save-btn" onClick={() => handleDelete(deleteConfirm)}>Yes</button>
            <button className="tax-cancel-btn" onClick={() => setDeleteConfirm(null)}>No</button>
          </div>
        </div>
      )}

      {showToast && (
        <div className={`tax-toast ${toastMessage.includes("Deleted") ? "error" : ""}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default TaxReports;
