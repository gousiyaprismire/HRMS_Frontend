import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import "./Bonuses.css";

const Bonuses = () => {
    const [data, setData] = useState([]);
    const [newEntry, setNewEntry] = useState({
        empId: '',
        name: '',
        bonusAmount: '',
        bonusType: '',
        month: '',
        year: ''
    });

    const [openPopup, setOpenPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState({ open: false, index: null });
    const [message, setMessage] = useState({ open: false, text: '', type: 'success' });
    const [editIndex, setEditIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const fetchBonuses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/bonuses/all');
            setData(response.data);
        } catch (error) {
            setMessage({ open: true, text: 'Error fetching data!', type: 'error' });
        }
    };

    useEffect(() => {
        fetchBonuses();
    }, []);

    const handleAddNew = () => {
        setNewEntry({ empId: '', name: '', bonusAmount: '', bonusType: '', month: '', year: '' });
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
        if (Object.values(newEntry).some(value => value === '')) {
            setMessage({ open: true, text: 'All fields are required!', type: 'error' });
            return;
        }

        try {
            if (editIndex !== null) {
                await axios.put(`http://localhost:8080/api/bonuses/${newEntry.id}`, newEntry);
                setMessage({ open: true, text: 'Updated successfully!', type: 'success' });
            } else {
                await axios.post('http://localhost:8080/api/bonuses', newEntry);
                setMessage({ open: true, text: 'Added successfully!', type: 'success' });
            }

            fetchBonuses(); 
            setOpenPopup(false);
            setEditIndex(null);

        } catch (error) {
            setMessage({ open: true, text: 'Error saving data!', type: 'error' });
        }
    };

    const handleEdit = (index) => {
        setNewEntry(data[index]);
        setEditIndex(index);
        setOpenPopup(true);
    };

    const handleDeleteConfirmation = (index) => {
        setDeletePopup({ open: true, index });
    };

    const handleConfirmDelete = async () => {
        if (deletePopup.index !== null) {
            try {
                const id = data[deletePopup.index].id;
                await axios.delete(`http://localhost:8080/api/bonuses/${id}`);
                setMessage({ open: true, text: 'Deleted successfully!', type: 'success' });
                fetchBonuses();
            } catch (error) {
                setMessage({ open: true, text: 'Error deleting data!', type: 'error' });
            } finally {
                setDeletePopup({ open: false, index: null });
            }
        }
    };

    const handleCloseDeletePopup = () => {
        setDeletePopup({ open: false, index: null });
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedMonth === "" || item.month === selectedMonth) &&
        (selectedYear === "" || item.year === selectedYear)
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
                        <th>Emp ID</th><th>Name</th><th>Bonus Amount</th><th>Bonus Type</th>
                        <th>Month</th><th>Year</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.empId}</td><td>{item.name}</td><td>{item.bonusAmount}</td>
                            <td>{item.bonusType}</td><td>{item.month}</td><td>{item.year}</td>
                            <td>
                                <button className="bonus-edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="bonus-delete-btn" onClick={() => handleDeleteConfirmation(index)}>Delete</button>
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

            <Dialog
                open={deletePopup.open}
                onClose={handleCloseDeletePopup}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this bonus?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeletePopup} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

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
