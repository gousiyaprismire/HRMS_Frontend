import { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import "./TaxReports.css";

const TaxReports = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [data, setData] = useState([
        { empId: '101', name: 'Manjunath', providentFund: '5000', insurance: '2000', deductions: '7000' }
    ]);
    const [newEntry, setNewEntry] = useState({
        empId: '',
        name: '',
        providentFund: '',
        insurance: '',
        deductions: ''
    });
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });

    const handleAddNew = () => setOpenPopup(true);
    const handleClosePopup = () => setOpenPopup(false);

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (Object.values(newEntry).some(value => value === '')) {
            setMessage({ open: true, text: 'All fields are required!', type: 'error' });
            return;
        }
        setData([newEntry, ...data]);
        setNewEntry({ empId: '', name: '', providentFund: '', insurance: '', deductions: '' });
        setMessage({ open: true, text: 'Added successfully!', type: 'success' });
        setOpenPopup(false);
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setData(data.filter((_, i) => i !== index));
            setMessage({ open: true, text: 'Deleted successfully!', type: 'success' });
        }
    };

    return (
        <div className="tax-container">
            <button className="tax-add-new-btn" onClick={handleAddNew}>+ Add New</button>
            <div className="tax-filters">
                <TextField className="tax-search" label="Search" variant="outlined" size="small" />
                <select>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                        <option key={month}>{month}</option>
                    ))}
                </select>
                <select>
                    {[2024, 2025, 2026, 2027].map(year => (
                        <option key={year}>{year}</option>
                    ))}
                </select>
            </div>
            <table className="tax-table">
                <thead>
                    <tr>
                        <th>Emp ID</th><th>Name</th><th>Provident Fund</th><th>Insurance</th><th>Deductions</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.empId}</td><td>{item.name}</td><td>{item.providentFund}</td>
                            <td>{item.insurance}</td><td>{item.deductions}</td>
                            <td>
                                <button className="tax-edit-btn">Edit</button>
                                <button className="tax-delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openPopup && (
                <div className="tax-popup">
                    <div className="tax-popup-inner">
                        <button className="tax-close-btn" onClick={handleClosePopup}>×</button>
                        <h2>Add Tax Report</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="tax-form-group">
                                <label>{key}:</label>
                                <TextField name={key} value={newEntry[key]} onChange={handleChange} fullWidth />
                            </div>
                        ))}
                        <div className="tax-popup-buttons">
                            <button className="tax-save-btn" onClick={handleSave}>Save</button>
                            <button className="tax-cancel-btn" onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <Snackbar open={message.open} autoHideDuration={3000} onClose={() => setMessage({ ...message, open: false })}>
                <Alert severity={message.type}>{message.text}</Alert>
            </Snackbar>
        </div>
    );
};

export default TaxReports;
