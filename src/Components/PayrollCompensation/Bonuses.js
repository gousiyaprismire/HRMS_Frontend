import { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import "./Bonuses.css";

const Bonuses = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState({ open: false, index: null });
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });
    const [editIndex, setEditIndex] = useState(null);

    const [data, setData] = useState([
        { empId: '101', name: 'Manjunath', bonusAmount: '5000', bonusType: 'Performance Bonus' }
    ]);

    const [newEntry, setNewEntry] = useState({
        empId: '',
        name: '',
        bonusAmount: '',
        bonusType: ''
    });

    const handleAddNew = () => {
        setNewEntry({ empId: '', name: '', bonusAmount: '', bonusType: '' });
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
        if (Object.values(newEntry).some(value => value === '')) {
            setMessage({ open: true, text: 'All fields are required!', type: 'error' });
            return;
        }

        if (editIndex !== null) {
            const updatedData = [...data];
            updatedData[editIndex] = newEntry;
            setData(updatedData);
            setMessage({ open: true, text: 'Updated successfully!', type: 'success' });
        } else {
            setData(prevData => [...prevData, newEntry]);
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
        <div className="bonus-container">
            <button className="bonus-add-new-btn" onClick={handleAddNew}>+ Add New</button>
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
                                <button className="bonus-edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="bonus-delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openPopup && (
                <div className="bonus-popup-overlay">
                    <div className="bonus-popup">
                        <button className="bonus-close-btn" onClick={handleClosePopup}>×</button>
                        <h2>{editIndex !== null ? 'Edit Bonus' : 'Add Bonus'}</h2>
                        {Object.keys(newEntry).map((key) => (
                            <div key={key} className="bonus-form-group">
                                <label>{key}:</label>
                                <TextField name={key} value={newEntry[key]} onChange={handleChange} fullWidth />
                            </div>
                        ))}
                        <div className="bonus-popup-buttons">
                            <button className="bonus-save-btn" onClick={handleSave}>{editIndex !== null ? 'Update' : 'Save'}</button>
                            <button className="bonus-cancel-btn" onClick={handleClosePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {deletePopup.open && (
                <div className="bonus-popup-overlay">
                    <div className="bonus-delete-popup">
                        <p>Are you sure you want to delete?</p>
                        <div className="bonus-popup-buttons">
                            <button className="bonus-save-btn" onClick={confirmDelete}>Yes</button>
                            <button className="bonus-cancel-btn" onClick={() => setDeletePopup({ open: false, index: null })}>No</button>
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

export default Bonuses;
