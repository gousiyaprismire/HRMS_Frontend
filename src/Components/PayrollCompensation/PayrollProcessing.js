import { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import "./PayrollProcessing.css";

const PayrollProcessing = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState({ open: false, index: null });
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });
    const [editIndex, setEditIndex] = useState(null);

    const [data, setData] = useState([
        { empId: '201', name: 'Rahul', grossPay: '60000', netPay: '55000', deductions: '5000' }
    ]);

    const [newEntry, setNewEntry] = useState({
        empId: '',
        name: '',
        grossPay: '',
        netPay: '',
        deductions: ''
    });

    const handleAddNew = () => {
        setNewEntry({ empId: '', name: '', grossPay: '', netPay: '', deductions: '' });
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
            setData([newEntry, ...data]); // Newly added data appears first
            setMessage({ open: true, text: 'Added successfully!', type: 'success' });
        }

        setOpenPopup(false);
        setEditIndex(null);
    };

    const handleEdit = (index) => {
        setNewEntry(data[index]);
        setEditIndex(index);
        setOpenPopup(true);
    };

    const handleDelete = (index) => {
        setDeletePopup({ open: true, index });
    };

    const confirmDelete = () => {
        setData(data.filter((_, i) => i !== deletePopup.index));
        setDeletePopup({ open: false, index: null });
        setMessage({ open: true, text: 'Deleted successfully!', type: 'success' });
    };

    return (
        <div className="payroll-container">
            <h1>Payroll Processing</h1> {/* Added heading */}
            <button className="payroll-add-new-btn" onClick={handleAddNew}>+ Add New</button>

            <div className="payroll-filters">
                <TextField className="payroll-search" label="Search" variant="outlined" size="small" />
                <select>
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
                    <option>2024</option>
                    <option>2025</option>
                </select>
            </div>

            <table className="payroll-table">
                <thead>
                    <tr>
                        <th>Emp ID</th><th>Name</th><th>Gross Pay</th><th>Net Pay</th><th>Deductions</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.empId}</td><td>{item.name}</td><td>{item.grossPay}</td><td>{item.netPay}</td><td>{item.deductions}</td>
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
                        <h2>{editIndex !== null ? 'Edit Payroll' : 'Add Payroll'}</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="payroll-form-group">
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
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

            {deletePopup.open && (
                <div className="payroll-popup-overlay">
                    <div className="payroll-delete-popup">
                        <p>Are you sure you want to delete?</p>
                        <div className="payroll-popup-buttons">
                            <button className="payroll-save-btn" onClick={confirmDelete}>Yes</button>
                            <button className="payroll-cancel-btn" onClick={() => setDeletePopup({ open: false, index: null })}>No</button>
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

export default PayrollProcessing;