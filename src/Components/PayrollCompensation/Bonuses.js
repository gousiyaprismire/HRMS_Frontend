import { useState } from 'react';
import { TextField, Snackbar, Alert } from '@mui/material';
import "./Bonuses.css";

const Bonuses = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState({ open: false, index: null });
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const [data, setData] = useState([
        { EmpId: '101', Name: 'Manjunath', BonusAmount: '5000', BonusType: 'Performance Bonus', Month: 'January', Year: '2024' }
    ]);

    const [newEntry, setNewEntry] = useState({
        EmpId: '',
        Name: '',
        BonusAmount: '',
        BonusType: '',
        Month: '',
        Year: ''
    });

    const handleAddNew = () => {
        setNewEntry({ EmpId: '', Name: '', BonusAmount: '', BonusType: '', Month: '', Year: '' });
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
            setData(prevData => [newEntry, ...prevData]);
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

    const filteredData = data.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedMonth === "" || item.Month === selectedMonth) &&
        (selectedYear === "" || item.Year === selectedYear)
    );

    return (
        <div className="bonus-container">
            <h1>Bonuses & Incentives</h1> 
            <button className="bonus-add-new-btn" onClick={handleAddNew}>+ Add New</button>

            <div className="bonus-filters">
                <TextField
                    className="bonus-search"
                    label="Search..."
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="bonus-dropdown" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
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
                <select className="bonus-dropdown" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                    <option value="">Year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
            </div>

            <table className="bonus-table">
                <thead>
                    <tr>
                        <th>Emp ID</th><th>Name</th><th>Bonus Amount</th><th>Bonus Type</th><th>Month</th><th>Year</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.EmpId}</td><td>{item.Name}</td><td>{item.BonusAmount}</td><td>{item.BonusType}</td>
                            <td>{item.Month}</td><td>{item.Year}</td>
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
