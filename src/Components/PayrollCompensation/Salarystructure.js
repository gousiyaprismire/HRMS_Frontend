import React, { useState, useEffect } from "react";
import "./SalaryStructure.css";

const SalaryStructure = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false); 
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false); 
  const [selectedItemId, setSelectedItemId] = useState(null); 
  const [editData, setEditData] = useState(null); 
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSalaryData();
      setSalaryData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (salaryData) {
      setFilteredData(
        salaryData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (month === "" || item.month === month) &&
            (year === "" || item.year === year)
        )
      );
    }
  }, [salaryData, searchQuery, month, year]);

  const fetchSalaryData = () => {
    return [
      {
        empId: "E12345",
        name: "Manjunadh",
        basicPay: 35000,
        hra: 15000,
        pf: 4200,
        deductions: 2000,
        medicalAllowance: 3000,
        travelAllowance: 2000,
        foodAllowance: 1500,
        pfEmployee: 4200,
        month: "January",
        year: 2025,
        someCondition: true,
      },
      {
        empId: "E12346",
        name: "Eknath",
        basicPay: 40000,
        hra: 18000,
        pf: 4800,
        deductions: 2500,
        medicalAllowance: 3500,
        travelAllowance: 2500,
        foodAllowance: 1800,
        pfEmployee: 4800,
        month: "February",
        year: 2025,
        someCondition: true,
      },
   
    ];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleAddNew = () => {
    setEditData(null); 
    setPopupOpen(true); 
  };

  const handleEditClick = (item) => {
    setEditData(item); 
    setPopupOpen(true); 
  };

  const handleClosePopup = () => {
    setPopupOpen(false); 
  };

  const handleDeleteClick = (empId) => {
    setSelectedItemId(empId); 
    setDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
   
    setSalaryData(salaryData.filter((item) => item.empId !== selectedItemId));
    setDeletePopupOpen(false);
  };

  const handleCancelDelete = () => {
    setDeletePopupOpen(false); 
  };

  const handleSave = (e) => {
    e.preventDefault();
   
    if (editData) {
 
      const updatedData = salaryData.map((item) =>
        item.empId === editData.empId ? { ...item, ...editData } : item
      );
      setSalaryData(updatedData);
    } else {
    
      const newItem = {
        empId: `E${Math.floor(Math.random() * 100000)}`,
        name: e.target.name.value,
        basicPay: parseFloat(e.target.basicPay.value),
        hra: parseFloat(e.target.hra.value),
        pf: parseFloat(e.target.pf.value),
        deductions: parseFloat(e.target.deductions.value),
        medicalAllowance: parseFloat(e.target.medicalAllowance.value),
        travelAllowance: parseFloat(e.target.travelAllowance.value),
        foodAllowance: parseFloat(e.target.foodAllowance.value),
        pfEmployee: parseFloat(e.target.pfEmployee.value),
        month: e.target.month.value,
        year: parseInt(e.target.year.value),
        someCondition: true,
      };
      setSalaryData([...salaryData, newItem]);
    }
    setPopupOpen(false); 
  };
     
  return (
    <div className="salary-structure-container">
      <h1>Salary Structure</h1>
      <div className="filters">
        <button className="payroll-add-new-button" onClick={handleAddNew}>
          + Add New
        </button>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {[2025, 2024, 2023, 2022].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button className="search-button">🔍</button>
        </div>
      </div>
      <div className="salary-table">
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Basic Pay</th>
              <th>HRA</th>
              <th>PF</th>
              <th>Deductions</th>
              <th>Medical Allowance</th>
              <th>Travel Allowance</th>
              <th>Food Allowance</th>
              <th>PF Employee</th>
              <th>Month</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.empId}>
                  <td>{item.empId}</td>
                  <td>{item.name}</td>
                  <td>{formatCurrency(item.basicPay)}</td>
                  <td>{formatCurrency(item.hra)}</td>
                  <td>{formatCurrency(item.pf)}</td>
                  <td>{formatCurrency(item.deductions)}</td>
                  <td>{formatCurrency(item.medicalAllowance)}</td>
                  <td>{formatCurrency(item.travelAllowance)}</td>
                  <td>{formatCurrency(item.foodAllowance)}</td>
                  <td>{formatCurrency(item.pfEmployee)}</td>
                  <td>{item.month}</td>
                  <td>{item.year}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(item.empId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="add-new-popup">
            <div className="popup-header">
              <h2>{editData ? "Edit Salary Entry" : "Add New Salary Entry"}</h2>
              <button className="close-button" onClick={handleClosePopup}>
                &times;
              </button>
            </div>
            <div className="popup-body">
              <form onSubmit={handleSave}>
                <label>Employee ID</label>
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  name="empId"
                  defaultValue={editData ? editData.empId : ""}
                  disabled={!!editData}
                />
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  defaultValue={editData ? editData.name : ""}
                />
                <label>Basic Pay</label>
                <input
                  type="number"
                  placeholder="Enter Basic Pay"
                  name="basicPay"
                  defaultValue={editData ? editData.basicPay : ""}
                />
                <label>HRA</label>
                <input
                  type="number"
                  placeholder="Enter HRA"
                  name="hra"
                  defaultValue={editData ? editData.hra : ""}
                />
                <label>PF</label>
                <input
                  type="number"
                  placeholder="Enter PF"
                  name="pf"
                  defaultValue={editData ? editData.pf : ""}
                />
                <label>Deductions</label>
                <input
                  type="number"
                  placeholder="Enter Deductions"
                  name="deductions"
                  defaultValue={editData ? editData.deductions : ""}
                />
                <label>Medical Allowance</label>
                <input
                  type="number"
                  placeholder="Enter Medical Allowance"
                  name="medicalAllowance"
                  defaultValue={editData ? editData.medicalAllowance : ""}
                />
                <label>Travel Allowance</label>
                <input
                  type="number"
                  placeholder="Enter Travel Allowance"
                  name="travelAllowance"
                  defaultValue={editData ? editData.travelAllowance : ""}
                />
                <label>Food Allowance</label>
                <input
                  type="number"
                  placeholder="Enter Food Allowance"
                  name="foodAllowance"
                  defaultValue={editData ? editData.foodAllowance : ""}
                />
                <label>PF Employee</label>
                <input
                  type="number"
                  placeholder="Enter PF Employee"
                  name="pfEmployee"
                  defaultValue={editData ? editData.pfEmployee : ""}
                />
                <label>Month</label>
                <select name="month" defaultValue={editData ? editData.month : ""}>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <label>Year</label>
                <select name="year" defaultValue={editData ? editData.year : ""}>
                  {[2025, 2024, 2023, 2022].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="popup-footer">
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      
      {isDeletePopupOpen && (
        <div className="delete-popup-overlay">
          <div className="delete-popup">
            <div className="delete-popup-header">
              <h2>Delete Confirmation</h2>
            </div>
            <div className="delete-popup-body">
              <p>Are you sure you want to delete this entry?</p>
            </div>
            <div className="delete-popup-footer">
              <button
                className="confirm-delete-button"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="cancel-delete-button"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryStructure;