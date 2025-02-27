import { useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import "./SalaryStructures.css";

const SalaryStructure = () => {
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openViewPopup, setOpenViewPopup] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ open: false, text: "", type: "success" });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const [data, setData] = useState([
        { empId: "201", name: "Rahul", basicPay: "25000", hra: "10000", pf: "5000", deductions: "3000", travelAllowance: "2000", foodAllowance: "1500", pfEmployee: "500", month: "January", year: "2024" }
    ]);

    const [newEntry, setNewEntry] = useState({
        empId: "",
        name: "",
        basicPay: "",
        hra: "",
        pf: "",
        deductions: "",
        travelAllowance: "",
        foodAllowance: "",
        pfEmployee: "",
        month: "",
        year: ""
    });

    const handleAddNew = () => {
        setNewEntry({
            empId: "",
            name: "",
            basicPay: "",
            hra: "",
            pf: "",
            deductions: "",
            travelAllowance: "",
            foodAllowance: "",
            pfEmployee: "",
            month: "",
            year: ""
        });
        setOpenAddForm(true);
    };

    const handleCloseForm = () => {
        setOpenAddForm(false);
    };

    const handleCloseViewPopup = () => {
        setOpenViewPopup(false);
        setSelectedEntry(null);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (Object.values(newEntry).some(value => value.trim() === "")) {
            setMessage({ open: true, text: "All fields are required!", type: "error" });
            return;
        }

        setData([newEntry, ...data]);
        setMessage({ open: true, text: "Added successfully!", type: "success" });
        setOpenAddForm(false);
    };

    const handleView = (entry) => {
        setSelectedEntry({ ...entry });
        setOpenViewPopup(true);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = () => {
        setData(data.map(item => (item.empId === selectedEntry.empId ? selectedEntry : item)));
        setMessage({ open: true, text: "Updated successfully!", type: "success" });
        setIsEditing(false);
    };

    const handleDelete = () => {
        setData(data.filter(item => item.empId !== selectedEntry.empId));
        setOpenViewPopup(false);
        setMessage({ open: true, text: "Deleted successfully!", type: "success" });
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedMonth ? item.month === selectedMonth : true) &&
        (selectedYear ? item.year === selectedYear : true)
    );

    return (
        <div className="salary-container">
            <h1 className="salary-page-title">Salary Structure</h1>

            <div className="salary-header">
                <button className="salary-add-btn" onClick={handleAddNew}>+ Add New</button>
                <div className="salary-filter">
                    <TextField
                        className="salary-search"
                        label="Search Employee"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="">Select Month</option>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value="">Select Year</option>
                        <option>2024</option>
                        <option>2025</option>
                    </select>
                </div>
            </div>

            <table className="salary-table">
                <thead>
                    <tr>
                        <th>Emp ID</th>
                        <th>Name</th>
                        <th>Basic Pay</th>
                        <th>HRA</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.empId}</td>
                            <td>{item.name}</td>
                            <td>{item.basicPay}</td>
                            <td>{item.hra}</td>
                            <td>{item.month}</td>
                            <td>{item.year}</td>
                            <td>
                                <button className="salary-view-btn" onClick={() => handleView(item)}>👁️ View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openViewPopup && selectedEntry && (
                <div className="salary-form-overlay show">
                    <div className="salary-popup">
                        <button className="salary-close-btn" onClick={handleCloseViewPopup}>×</button>
                        <h2>View Salary Details</h2>
                        {Object.keys(selectedEntry).map((key) => (
                            <div key={key} className="salary-form-group">
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                <TextField
                                    name={key}
                                    value={selectedEntry[key]}
                                    onChange={(e) => setSelectedEntry({ ...selectedEntry, [e.target.name]: e.target.value })}
                                    fullWidth
                                    disabled={!isEditing}
                                />
                            </div>
                        ))}
                        <div className="salary-form-buttons">
                            {isEditing ? (
                                <button className="salary-save-btn" onClick={handleUpdate}>Save</button>
                            ) : (
                                <button className="salary-edit-btn" onClick={handleEdit}>Edit</button>
                            )}
                            <button className="salary-delete-btn" onClick={handleDelete}>Delete</button>
                            <button className="salary-cancel-btn" onClick={handleCloseViewPopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <Snackbar
                open={message.open}
                autoHideDuration={3000}
                onClose={() => setMessage({ ...message, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={message.type}>{message.text}</Alert>
            </Snackbar>

        
            {openAddForm && (
                <div className="salary-form-overlay show">
                    <div className="salary-popup">
                        <button className="salary-close-btn" onClick={handleCloseForm}>×</button>
                        <h2>Add Salary Entry</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="salary-form-group">
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                <TextField name={key} value={newEntry[key]} onChange={handleChange} fullWidth />
                            </div>
                        ))}
                        <div className="salary-form-buttons">
                            <button className="salary-save-btn" onClick={handleSave}>Save</button>
                            <button className="salary-cancel-btn" onClick={handleCloseForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalaryStructure;
