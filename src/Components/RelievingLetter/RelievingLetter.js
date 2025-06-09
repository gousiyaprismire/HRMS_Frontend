import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RelievingLetter.css';

const API_BASE = 'http://localhost:8080/api/letters';  

const RelievingLetterGenerator = () => {
  const [letters, setLetters] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [employeeName, setEmployeeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [relievingDate, setRelievingDate] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const response = await axios.get(API_BASE);
      setLetters(response.data);
    } catch (error) {
      console.error('Error fetching letters:', error);
    }
  };

  const clearForm = () => {
    setEmployeeName('');
    setDesignation('');
    setJoiningDate('');
    setRelievingDate('');
    setEmail('');
    setAddress('');
    setEditingId(null);
  };

  const handleGenerateOrUpdate = async () => {
    const letterData = { employeeName, designation, joiningDate, relievingDate, email, address };

    try {
      if (editingId) {
        alert('Update function not implemented in backend yet.');
      } else {
    
        await axios.post(`${API_BASE}/generate`, letterData);
        clearForm();
        fetchLetters();
      }
    } catch (error) {
      console.error('Error saving letter:', error);
    }
  };

  const handleEdit = (letter) => {
    setEditingId(letter.id);
    setEmployeeName(letter.employeeName);
    setDesignation(letter.designation);
    setJoiningDate(letter.joiningDate);
    setRelievingDate(letter.relievingDate);
    setEmail(letter.email);
    setAddress(letter.address);
  };

  const handleSendMail = async (id) => {
    try {
      await axios.post(`${API_BASE}/send-mail/${id}`);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="relieving-letter-container">
      <div className="relieving-letter-card">
        <h2 className="relieving-letter-heading">Relieving Letter Generator</h2>

        <div className="relieving-letter-form-row">
          <div className="relieving-letter-form-group">
            <label>Employee Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          <div className="relieving-letter-form-group">
            <label>Designation</label>
            <input
              type="text"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
        </div>

        <div className="relieving-letter-form-row">
          <div className="relieving-letter-form-group">
            <label>Joining Date</label>
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
            />
          </div>

          <div className="relieving-letter-form-group">
            <label>Relieving Date</label>
            <input
              type="date"
              value={relievingDate}
              onChange={(e) => setRelievingDate(e.target.value)}
            />
          </div>
        </div>

        <div className="relieving-letter-form-row">
          <div className="relieving-letter-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter employee email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relieving-letter-form-group">
            <label>Address</label>
            <input
              type="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

       
        <div className="relieving-letter-button-container">
          <button className="relieving-letter-button" onClick={handleGenerateOrUpdate}>
            {editingId ? 'Update Letter' : 'Generate Letter'}
          </button>
          {editingId && (
            <button
              className="relieving-letter-button"
              onClick={clearForm}
              style={{ marginLeft: '10px', backgroundColor: '#ccc' }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {letters.length > 0 && (
        <div className="relieving-letter-table-container">
          <h3 className="relieving-letter-table-heading">Generated Letters</h3>
          <table className="relieving-letter-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Relieving Date</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter) => (
                <tr key={letter.id}>
                  <td>{letter.employeeName}</td>
                  <td>{letter.designation}</td>
                  <td>{letter.joiningDate}</td>
                  <td>{letter.relievingDate}</td>
                  <td>{letter.email}</td>
                  <td>
                    <button onClick={() => handleEdit(letter)}>Edit</button>
                    <button onClick={() => handleSendMail(letter.id)} style={{ marginLeft: '10px' }}>
                      Send Mail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RelievingLetterGenerator;
