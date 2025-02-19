import { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import "./Bonuses.css";
   
const Bonuses = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [data, setData] = useState([
        { empId: 'EMP001', name: 'Manjunath', bonusAmount: '5000', bonusType: 'Performance Bonus' }
    ]);
    const [newEntry, setNewEntry] = useState({
        empId: '',
        name: '',
        bonusAmount: '',
        bonusType: ''
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
        setNewEntry({ empId: '', name: '', bonusAmount: '', bonusType: '' });
        setMessage({ open: true, text: 'Added successfully!', type: 'success' });
        setOpenPopup(false);
    };

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="bonus-container">
            <button className="bonus-add-new-btn" onClick={handleAddNew}>+ Add New</button>
            <div className="bonus-filters">
                <TextField className="bonus-search" label="Search" variant="outlined" size="small" />
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
            <table className="bonus-table">
                <thead>
                    <tr>
                        <th>Emp ID</th><th>Name</th><th>Bonus Amount</th><th>Bonus Type</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.empId}</td><td>{item.name}</td><td>{item.bonusAmount}</td><td>{item.bonusType}</td>
                            <td>
                                <button className="bonus-edit-btn">Edit</button>
                                <button className="bonus-delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openPopup && (
                <div className="bonus-popup">
                    <div className="bonus-popup-inner">
                        <button className="bonus-close-btn" onClick={handleClosePopup}>×</button>
                        <h2>Add Bonus</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="bonus-form-group">
                                <label>{key}:</label>
                                <TextField name={key} value={newEntry[key]} onChange={handleChange} fullWidth />
                            </div>
                        ))}
                        <div className="bonus-popup-buttons">
                            <button className="bonus-save-btn" onClick={handleSave}>Save</button>
                            <button className="bonus-cancel-btn" onClick={handleClosePopup}>Cancel</button>
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

export default Bonuses;
