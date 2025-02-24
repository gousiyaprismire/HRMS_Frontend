import React, { useState } from 'react';
import './SelfService.css';

const HelpDesk = () => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 'TCK001',
      issueType: 'IT',
      description: 'Laptop not working',
      status: 'Pending',
    },
    {
      id: 'TCK002',
      issueType: 'HR',
      description: 'Payroll issue',
      status: 'In Progress',
    },
  ]);

  const [formData, setFormData] = useState({
    issueType: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.issueType || !formData.description) {
      alert('Please fill all fields!');
      return;
    }

    const newTicket = {
      id: `TCK${String(tickets.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Pending',
    };

    setTickets([...tickets, newTicket]);
    setFormData({ issueType: '', description: '' });
    setShowForm(false);
  };

  const updateStatus = (id, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const removeTicket = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className="helpdesk-container">
      <h2 className="helpdesk-title">Help Desk & Support Tickets</h2>

      {!showForm && (
        <>
          <button className="helpdesk-add-button" onClick={() => setShowForm(true)}>
            Submit New Ticket
          </button>

          <div className="helpdesk-status">
            <h3>Existing Tickets</h3>
            <table className="helpdesk-table">
              <thead>
                <tr>
                  <th>Issue Type</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.issueType}</td>
                      <td>{ticket.description}</td>
                      <td>
                        <span className={`helpdesk-status-badge helpdesk-status-${ticket.status.toLowerCase()}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => updateStatus(ticket.id, 'In Progress')}
                          className="helpdesk-action-button helpdesk-progress"
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateStatus(ticket.id, 'Resolved')}
                          className="helpdesk-action-button helpdesk-resolved"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => removeTicket(ticket.id)}
                          className="helpdesk-action-button helpdesk-remove"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No Tickets</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showForm && (
        <div className="helpdesk-card">
          <h3>Submit New Ticket</h3>
          <form onSubmit={handleSubmit} className="helpdesk-form">
            <div className="helpdesk-form-group">
              <label>Issue Type:</label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                className="helpdesk-form-input"
                required
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
                required
              />
            </div>

            <div className="helpdesk-button-container">
              <button type="submit" className="helpdesk-submit-button">
                Submit Ticket
              </button>
              <button className="helpdesk-cancel-button" onClick={() => setShowForm(false)}>
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HelpDesk;
