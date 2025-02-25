import { useState } from 'react';
import { TextField, Snackbar, Alert, MenuItem } from '@mui/material';
import "./Payslips.css";

const Payslip = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [monthFilter, setMonthFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [data, setData] = useState([
        { empId: '101', name: 'Manjunath', pan: 'ABCDE1234F', uan: '100200300400', bankDays: '30', lopDays: '0', doj: '01-01-2020', gender: 'Male', totalEarnings: '50000' }
    ]);
    const [newEntry, setNewEntry] = useState({
        empId: '', name: '', pan: '', uan: '', bankDays: '', lopDays: '', doj: '', gender: '', totalEarnings: ''
    });

    const handleAddNew = () => {
        setNewEntry({ empId: '', name: '', pan: '', uan: '', bankDays: '', lopDays: '', doj: '', gender: '', totalEarnings: '' });
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
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
    
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };
    

    const handleSave = () => {
        if (Object.values(newEntry).some(value => value.trim() === '')) {
            setMessage({ open: true, text: 'All fields are required!', type: 'error' });
            return;
        }

        if (editIndex !== null) {
            const updatedData = [...data];
            updatedData[editIndex] = newEntry;
            setData(updatedData);
            setMessage({ open: true, text: 'Updated successfully!', type: 'success' });
        } else {
            setData([newEntry, ...data]);
            setMessage({ open: true, text: 'Added successfully!', type: 'success' });
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

    const confirmDelete = () => {
        setData(data.filter((_, i) => i !== deletePopup));
        setDeletePopup(false);
        setMessage({ open: true, text: 'Deleted successfully!', type: 'success' });
    };

    const handleMonthFilterChange = (e) => {
        setMonthFilter(e.target.value);
    };

    const handleYearFilterChange = (e) => {
        setYearFilter(e.target.value);
    };
   
    const filteredData = data.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMonth = monthFilter ? item.doj.split('-')[1] === monthFilter : true;
        const matchesYear = yearFilter ? item.doj.split('-')[2] === yearFilter : true;
        return matchesSearch && matchesMonth && matchesYear;
    });

    return (
        <div className="payroll-container">
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
<select className="payroll-dropdown" value={selectedMonth} onChange={handleMonthChange}>
<option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>
                <select className="payroll-dropdown" value={selectedYear} onChange={handleYearChange}>
                <option value="">Year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
            </div>
            <table className="payroll-table">
                <thead>
                    <tr>
                        {['Emp ID', 'Name', 'PAN', 'UAN', 'Bank Days', 'LOP Days', 'DOJ', 'Gender', 'Total Earnings', 'Actions'].map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            {Object.values(item).map((value, i) => (
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
                        <div className="payroll-popup-buttons">
                            <button className="payroll-save-btn" onClick={confirmDelete}>Yes</button>
                            <button className="payroll-cancel-btn" onClick={() => setDeletePopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <Snackbar
                open={message.open}
                autoHideDuration={3000}
                onClose={() => setMessage({ ...message, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={message.type}>{message.text}</Alert>
            </Snackbar>
        </div>
    );
};

export default Payslip;
