import React, { useState } from 'react';
import './SelfService.css'; 
const HelpDesk = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support ticket submitted successfully!');
  };

  return (
    <div className="helpdesk-container">
      <h2 className="helpdesk-title">Help Desk & Support Tickets</h2>
      
      <form onSubmit={handleSubmit} className="helpdesk-form">
        <div className="helpdesk-form-group">
          <label>Issue Type:</label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleInputChange}
            className="helpdesk-form-input"
          >
            <option value="">Select issue type</option>
            <option value="IT">IT Issue</option>
            <option value="HR">HR Issue</option>
          </select>
        </div>

        <div className="helpdesk-form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the issue"
            className="helpdesk-form-input"
          />
        </div>

        <button type="submit" className="helpdesk-button">
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default HelpDesk;
