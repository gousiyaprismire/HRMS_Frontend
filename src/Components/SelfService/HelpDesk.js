import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfService.css";

const HelpDesk = () => {
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "", 
    issueType: "",
    description: "",
  });

  const issueDescriptions = {
    IT: ["Laptop not working", "Internet issue", "Software installation"],
    HR: ["Payroll issue", "Leave request", "Employee benefits"],
  };

 
  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      fetchTickets();
    }
  }, []);


  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tickets");
      setTickets(response.data);
      localStorage.setItem("tickets", JSON.stringify(response.data)); 
    } catch (error) {
      console.error("Error fetching tickets:", error);
      alert("Failed to fetch tickets.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "issueType") {
      setFormData({ ...formData, issueType: value, description: "" }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/tickets/${id}/status`, { status: newStatus });
  
      setTickets(prevTickets => {
        const updatedTickets = prevTickets.map(ticket =>
          ticket.id === id ? { ...ticket, status: newStatus } : ticket
        );
        localStorage.setItem("tickets", JSON.stringify(updatedTickets)); 
        return updatedTickets;
      });
      alert("Ticket status updated!");
    } catch (error) {
      console.error("Error updating ticket status:", error);
      alert("Failed to update ticket status.");
    }
  };

 
  const removeTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tickets/${id}`);
  
      setTickets(tickets => {
        const updatedTickets = tickets.filter(ticket => ticket.id !== id);
        localStorage.setItem("tickets", JSON.stringify(updatedTickets)); 
        return updatedTickets;
      });
      alert("Ticket removed successfully!");
    } catch (error) {
      console.error("Error removing ticket:", error);
      alert("Failed to remove ticket.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.employeeId || !formData.issueType || !formData.description) {
      alert("Please fill all fields!");
      return;
    }

    const newTicket = {
      employeeId: formData.employeeId, 
      issueType: formData.issueType,
      description: formData.description,
      status: "Open",
    };

    try {
      const response = await axios.post("http://localhost:8080/api/tickets", newTicket, {
        headers: { "Content-Type": "application/json" },
      });

      setTickets(prevTickets => {
        const updatedTickets = [...prevTickets, response.data];
        localStorage.setItem("tickets", JSON.stringify(updatedTickets)); 
        return updatedTickets;
      });
      setFormData({ employeeId: "", issueType: "", description: "" });
      setShowForm(false);
      alert("Ticket submitted successfully!");
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Failed to submit ticket.");
    }
  };

  return (
    <div className="helpdesk-container">
      <h2 className="helpdesk-title">Help Desk & Support Tickets</h2>

      {!showForm && (
        <>
          <button className="helpdesk-add-button" onClick={() => setShowForm(true)}>
            New Ticket
          </button>

          <div className="helpdesk-status">
            <h3>Existing Tickets</h3>
            <table className="helpdesk-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
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
                      <td>{ticket.employeeId}</td> 
                      <td>{ticket.issueType}</td>
                      <td>{ticket.description}</td>
                      <td>
                        <span
                          className={`helpdesk-status-badge helpdesk-status-${ticket.status.toLowerCase()}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => updateStatus(ticket.id, "In Progress")}
                          className="helpdesk-action-button helpdesk-progress"
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateStatus(ticket.id, "Resolved")}
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
                    <td colSpan="5" className="text-center">
                      No Tickets
                    </td>
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
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="helpdesk-form-input"
                required
              />
            </div>

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

            {formData.issueType && (
              <div className="helpdesk-form-group">
                <label>Description:</label>
                <select
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="helpdesk-form-input"
                  required
                >
                  <option value="">Select issue description</option>
                  {issueDescriptions[formData.issueType].map((desc, index) => (
                    <option key={index} value={desc}>
                      {desc}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
