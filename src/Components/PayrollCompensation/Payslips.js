import { useState, useEffect } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import "./Payslips.css";
import axios from "axios";
const API_URL = "http://localhost:8080/api/payslips"; 

const Payslip = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [message, setMessage] = useState({ open: false, text: "", type: "success" });
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [data, setData] = useState([]);

    const [newEntry, setNewEntry] = useState({
        id: "", empId: "", name: "", pan: "", uan: "", bankDays: "", lopDays: "", doj: "", gender: "", totalEarnings: "", month: "", year: ""
    });

    const fetchPayslips = async () => {
        try {
            const response = await fetch(`${API_URL}/all`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPayslips();
    }, []);

    const handleAddNew = () => {
        setNewEntry({ empId: "", name: "", pan: "", uan: "", bankDays: "", lopDays: "", doj: "", gender: "", totalEarnings: "", month: "", year: "" });
        setEditIndex(null);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setEditIndex(null);
    };

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (Object.values(newEntry).some(value =>
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "")
        )) {
          setMessage({ open: true, text: "All fields are required!", type: "error" });
          return;
        }
      
        try {
          if (editIndex !== null) {
            await axios.put(`${API_URL}/${newEntry.id}`, newEntry);
            setMessage({ open: true, text: "Updated successfully!", type: "success" });
          } else {
            await axios.post(API_URL, newEntry);
            setMessage({ open: true, text: "Added successfully!", type: "success" });
          }
          fetchPayslips();
        } catch (error) {
          console.error("Error saving data:", error);
          setMessage({ open: true, text: error.response?.data?.message || "Error saving data!", type: "error" });
        }
      
        handleClosePopup();
      };
      

    const handleEdit = (index) => {
        setNewEntry(data[index]);
        setEditIndex(index);
        setOpenPopup(true);
    };

    const handleDelete = (index) => {
        setDeletePopup(index);
    };

    const confirmDelete = async () => {
        try {
            await fetch(`${API_URL}/${data[deletePopup].id}`, { method: "DELETE" });
            setMessage({ open: true, text: "Deleted successfully!", type: "success" });
            fetchPayslips();
        } catch (error) {
            console.error("Error deleting data:", error);
            setMessage({ open: true, text: "Error deleting data!", type: "error" });
        }
        setDeletePopup(false);
    };

    const filteredData = data.filter(item => {
        const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMonth = selectedMonth ? item.month === selectedMonth : true;
        const matchesYear = selectedYear ? item.year === selectedYear : true;
        return matchesSearch && matchesMonth && matchesYear;
    });

    return (
        <div className="payroll-container">
            <h1>Payslips & Salary Statements</h1>

            <button className="payroll-add-new-btn" onClick={handleAddNew}>+ Add New</button>

            <div className="payroll-filters">
                <TextField
                    className="payroll-search"
                    label="Search..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="payroll-dropdown" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="">Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
                <select className="payroll-dropdown" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Year</option>
                    {["2022", "2023", "2024", "2025"].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <table className="payroll-table">
                <thead>
                    <tr>
                        {['ID', 'Emp ID', 'Name', 'PAN', 'UAN', 'Bank Days', 'LOP Days', 'DOJ', 'Gender', 'Total Earnings', 'Month', 'Year', 'Actions'].map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            {Object.values({ id: item.id, ...item }).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                            <td>
                                <button className="payroll-edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="payroll-delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openPopup && (
                <div className="payroll-popup-overlay">
                    <div className="payroll-popup">
                        <button className="payroll-close-btn" onClick={handleClosePopup}>×</button>
                        <h2>{editIndex !== null ? 'Edit Payslip' : 'Add Payslip'}</h2>
                        {Object.keys(newEntry).map(key => (
                            <div key={key} className="payroll-form-group">
                                <label>{key}:</label>
                                <TextField name={key} value={newEntry[key]} onChange={handleChange} fullWidth />
                            </div>
                        ))}
                        <div className="payroll-popup-buttons">
                            <button className="payroll-save-btn" onClick={handleSave}>{editIndex !== null ? 'Update' : 'Save'}</button>
                            <button className="payroll-cancel-btn" onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {deletePopup !== false && (
                <div className="payroll-popup-overlay">
                    <div className="payroll-delete-popup">
                        <p>Are you sure you want to delete?</p>
                        <button className="payroll-save-btn" onClick={confirmDelete}>Yes</button>
                        <button className="payroll-cancel-btn" onClick={() => setDeletePopup(false)}>No</button>
                    </div>
                </div>
            )}

            <Snackbar open={message.open} autoHideDuration={3000} onClose={() => setMessage({ ...message, open: false })}>
                <Alert severity={message.type}>{message.text}</Alert>
            </Snackbar>
        </div>
    );
};

export default Payslip;
