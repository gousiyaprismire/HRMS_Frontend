import React, { useState } from 'react';
import axios from 'axios';
import './RelievingLetter.css';

const RelievingLetterForm = () => {
  const [employee, setEmployee] = useState({
    employeeName: '',
    joiningDate: '',
    relievingDate: '',
    designation: '',
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    console.log('Sending request with data:', employee);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/relieving-letter/generate',
        employee,
        { responseType: 'blob' }
      );

      console.log('PDF response received:', response);

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relieving_letter.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log('PDF download triggered.');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please check backend logs.');
    }
  };

  return (
    <div className="relieving-form-container">
      <h2 className="relieving-form-title">Generate Relieving Letter</h2>
      <div className="relieving-form-fields">
        <label className="relieving-label">Employee Name</label>
        <input
          className="relieving-input"
          type="text"
          name="employeeName"
          placeholder="Enter full name"
          value={employee.employeeName}
          onChange={handleChange}
        />

        <label className="relieving-label">Joining Date</label>
        <input
          className="relieving-input"
          type="date"
          name="joiningDate"
          value={employee.joiningDate}
          onChange={handleChange}
        />

        <label className="relieving-label">Relieving Date</label>
        <input
          className="relieving-input"
          type="date"
          name="relievingDate"
          value={employee.relievingDate}
          onChange={handleChange}
        />

        <label className="relieving-label">Designation</label>
        <input
          className="relieving-input"
          type="text"
          name="designation"
          placeholder="Enter designation"
          value={employee.designation}
          onChange={handleChange}
        />

        <button className="relieving-generate-button" onClick={handleDownload}>
          Generate Letter
        </button>
      </div>
    </div>
  );
};

export default RelievingLetterForm;
