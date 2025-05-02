import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./TaxReports.css";

const TaxReports = () => {
  const [taxReports, setTaxReports] = useState([]);
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
    month: "",
    year: "",
  });

  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tax-reports/all");
      setTaxReports(response.data);
    } catch (error) {
      showToastMessage("Error fetching data!", true);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const openPopup = (report = null) => {
    setSelectedReport(report);
    setNewReport(report || { empId: "", name: "", providentFund: "", insurance: "", deductions: "", month: "", year: "" });
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

 
  const handleSave = async () => {
    try {
      if (selectedReport) {
        await axios.put(`http://localhost:8080/api/tax-reports/${newReport.empId}`, newReport);
        showToastMessage("Updated Successfully!");
      } else {
        await axios.post("http://localhost:8080/api/tax-reports", newReport);
        showToastMessage("Added Successfully!");
      }
      fetchData();
      closePopup();
    } catch (error) {
      showToastMessage(error.response?.data?.message || "Error saving data!", true);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tax-reports/${id}`);
      showToastMessage("Deleted Successfully!", true);
      fetchData();
    } catch (error) {
      showToastMessage(error.response?.data?.message || "Error deleting data!", true);
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="tax-container">
      <h1>Tax & Deduction Reports</h1>
      <button className="tax-add-new-btn" onClick={() => openPopup()}>+ Add New</button>

      <div className="tax-filters">
        <input type="text" placeholder="Search..." className="tax-search" />
        <select>
          <option>Month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
          </select>
        <select>
          <option>Year</option>
          <option>2024</option>
          <option>2025</option>
          </select>
      </div>

      <table className="tax-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Provident Fund</th>
            <th>Insurance</th>
            <th>Deductions</th>
            <th>Month</th>
            <th>Year</th>
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
              <td>{report.month}</td>
              <td>{report.year}</td>
              <td>
                <button className="tax-edit-btn" onClick={() => openPopup(report)}>Edit</button>
                <button className="tax-delete-btn" onClick={() => setDeleteConfirm(report.empId)}>Delete</button>
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

            {Object.keys(newReport).map((key) => (
              <div key={key} className="tax-form-group">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input
                  type={["providentFund", "insurance", "deductions"].includes(key) ? "number" : "text"}
                  value={newReport[key]}
                  onChange={(e) => setNewReport({ ...newReport, [key]: e.target.value })}
                />
              </div>
            ))}

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
