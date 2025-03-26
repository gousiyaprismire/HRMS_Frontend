import { useState, useEffect } from "react";
import { TextField, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"; 
import axios from "axios";
import "./SalaryStructures.css";

const SalaryStructure = () => {
    const API_URL = "http://localhost:8080/salary-structure";
    const [openAddForm, setOpenAddForm] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false); 
    const [openViewPopup, setOpenViewPopup] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ open: false, text: "", type: "success" });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/all`)
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

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

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (Object.values(newEntry).some(value => value.trim() === "")) {
            setMessage({ open: true, text: "All fields are required!", type: "error" });
            return;
        }
        axios.post(`${API_URL}/save`, newEntry)
            .then(response => {
                setData([...data, response.data]);
                setMessage({ open: true, text: "Added successfully!", type: "success" });
                setOpenAddForm(false);
            })
            .catch(error => console.error("Error adding data:", error));
    };
    const handleView = (entry) => {
    setSelectedEntry({ ...entry });
    setIsEditing(false); 
    setOpenViewPopup(true);
};
    const handleEdit = (entry) => {
        setSelectedEntry({ ...entry });
        setIsEditing(true);
        setOpenViewPopup(true);
    };
    
    

    const confirmDelete = (entry) => {
        setSelectedEntry(entry);
        setDeletePopup(true); 
    };
    
    const handleDelete = (entry) => {
        axios.delete(`${API_URL}/delete/${entry.empId}`)
            .then(() => {
                setData(data.filter(item => item.empId !== entry.empId));
                setMessage({ open: true, text: "Deleted successfully!", type: "success" });
                setDeletePopup(false);
            })
            .catch(error => console.error("Error deleting data:", error));
    };
    

    const handleUpdate = () => {
        axios.put(`${API_URL}/update/${selectedEntry.empId}`, selectedEntry)
            .then(response => {
                setData(data.map(item => item.empId === selectedEntry.empId ? response.data : item));
                setMessage({ open: true, text: "Updated successfully!", type: "success" });
                setIsEditing(false);
                setOpenViewPopup(false);
            })
            .catch(error => console.error("Error updating data:", error));
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
                            <div className="salary-action-buttons">
                                <button className="salary-view-btn" onClick={() => handleView(item)}>👁️ </button>
                                <button className="salary-edit-btn" onClick={() => handleEdit(item)}> Edit</button>
                                <button className="salary-delete-btn" onClick={() => confirmDelete(item)}> Delete</button>
                                </div>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openAddForm && (
                <div className="salary-form-overlay show">
                    <div className="salary-popup">
                        <button className="salary-close-btn" onClick={handleCloseForm}>×</button>
                        <h2>Add Salary Entry</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="salary-form-group">
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                <TextField
                                    name={key}
                                    value={newEntry[key]}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </div>
                        ))}
                        <div className="salary-form-buttons">
                            <button className="salary-save-btn" onClick={handleSave}>Save</button>
                            <button className="salary-cancel-btn" onClick={handleCloseForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

<Dialog open={deletePopup} onClose={() => setDeletePopup(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the salary record for <b>{selectedEntry?.name}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setDeletePopup(false)} color="secondary">Cancel</Button>
                <Button onClick={() => handleDelete(selectedEntry)} color="primary">Delete</Button>  
                </DialogActions>
            </Dialog>
            {openViewPopup && selectedEntry && (
  <div className={isEditing ? "salary-form-overlay show" : "salary-view-popup-container"}>

        <div className="salary-popup">
            <button className="salary-close-btn" onClick={() => setOpenViewPopup(false)}>×</button>
            <h2>{isEditing ? "Edit Salary Details" : "View Salary Details"}</h2>

            {isEditing ? (
                Object.keys(selectedEntry).map((key) => (
                    <div key={key} className="salary-form-group">
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <TextField
                            name={key}
                            value={selectedEntry[key]}
                            onChange={(e) => setSelectedEntry({ ...selectedEntry, [e.target.name]: e.target.value })}
                            fullWidth
                        />
                    </div>
                ))
            ) : (
                <div className="salary-view-content">
                    {Object.entries(selectedEntry).map(([key, value]) => (
                        <p key={key}>
                            <strong>
                                {key === "empId" ? "Emp ID" :
                                key === "basicPay" ? "Basic Pay" :
                                key === "hra" ? "HRA" :
                                key === "pf" ? "PF" :
                                key === "deductions" ? "Deductions" :
                                key === "travelAllowance" ? "Travel Allowance" :
                                key === "foodAllowance" ? "Food Allowance" :
                                key === "pfEmployee" ? "PF Employee" :
                                key.charAt(0).toUpperCase() + key.slice(1)}:
                            </strong> {value}
                        </p>
                    ))}
                </div>
            )}

            <div className="salary-form-buttons">
                {isEditing ? (
                    <button className="salary-save-btn" onClick={handleUpdate}>Save</button>
                ) : (
                    <button className="salary-edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button className="salary-cancel-btn" onClick={() => setOpenViewPopup(false)}>Cancel</button>
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
        </div>
    );
};

export default SalaryStructure;