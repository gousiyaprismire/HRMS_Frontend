import { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import "./Payslips.css";
   
const Payslip = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [data, setData] = useState([
        { empId: '101', name: 'Manjunath', pan: 'ABCDE1234F', uan: '100200300400', bankDays: '30', lopDays: '0', doj: '01-01-2020', gender: 'Male', totalEarnings: '50000' }
    ]);
    const [newEntry, setNewEntry] = useState({
        EmpId: '',
        Name: '',
        Pan: '',
        Uan: '',
        BankDays: '',
        LopDays: '',
        Doj: '',
        Gender: '',
        TotalEarnings: ''
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
        setData([...data, newEntry]);
        setNewEntry({ empId: '', name: '', pan: '', uan: '', bankDays: '', lopDays: '', doj: '', gender: '', totalEarnings: '' });
        setMessage({ open: true, text: 'Added successfully!', type: 'success' });
        setOpenPopup(false);
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="payroll-payslip-container">
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
                    <option>2026</option>
                    <option>2027</option>
                </select>
            </div>
            <table className="payroll-table">
                <thead>
                    <tr>
                        <th>Emp ID</th><th>Name</th><th>PAN</th><th>UAN</th><th>Bank Days</th>
                        <th>LOP Days</th><th>DOJ</th><th>Gender</th><th>Total Earnings</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.empId}</td><td>{item.name}</td><td>{item.pan}</td><td>{item.uan}</td>
                            <td>{item.bankDays}</td><td>{item.lopDays}</td><td>{item.doj}</td>
                            <td>{item.gender}</td><td>{item.totalEarnings}</td>
                            <td>
                                <button className="payroll-edit-btn">Edit</button>
                                <button className="payroll-delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openPopup && (
                <div className="payroll-popup">
                    <div className="payroll-popup-inner">
                        <button className="payroll-close-btn" onClick={handleClosePopup}>×</button>
                        <h2>Add Payslip</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="payroll-form-group">
                                <label>{key}:</label>
                                <TextField name={key} value={newEntry[key]} onChange={handleChange} fullWidth />
                            </div>
                        ))}
                        <div className="payroll-popup-buttons">
                            <button className="payroll-save-btn" onClick={handleSave}>Save</button>
                            <button className="payroll-cancel-btn" onClick={handleClosePopup}>Cancel</button>
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

export default Payslip;
