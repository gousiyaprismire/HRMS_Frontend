import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./Recruitment.css";

function OfferLetters() {
  const [offers, setOffers] = useState([
    {
      candidate: "Keerthi",
      email: "a@gmail.com",
      phone: "9987456321",
      position: "Software Engineer",
      salary: "10LPA",
      joiningDate: "2025-03-01",
      employmentType: "Full-Time",
      workLocation: "On-site",
      offerExpiry: "2025-02-25",
      hr: "Keerthi",
      status: "Sent",
    },
    {
      candidate: "Priya",
      email: "b@gmail.com",
      phone: "9987456320",
      position: "Devops Engineer",
      salary: "8LPA",
      joiningDate: "2025-03-17",
      employmentType: "Full-Time",
      workLocation: "Remote",
      offerExpiry: "2025-03-25",
      hr: "Keerthi",
      status: "Sent",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false); 

  const jobPositions = ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "QA Engineer"];
  const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
  const workLocations = ["Remote", "On-site", "Hybrid"];

  const [newOffer, setNewOffer] = useState({
    candidate: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    joiningDate: "",
    employmentType: "",
    workLocation: "",
    offerExpiry: "",
    hrContact: "",
    status: "Sent",
  });

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (newOffer.candidate && newOffer.position && newOffer.email && newOffer.salary) {
      if (editMode) {
       
        const updatedOffers = offers.map((offer, index) =>
          index === selectedOffer ? newOffer : offer
        );
        setOffers(updatedOffers);
        setEditMode(false);
      } else {
       
        setOffers([...offers, newOffer]);
      }

      setNewOffer({
        candidate: "",
        email: "",
        phone: "",
        position: "",
        salary: "",
        joiningDate: "",
        employmentType: "",
        workLocation: "",
        offerExpiry: "",
        hrContact: "",
        status: "Sent",
      });
      setShowForm(false);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const showDetailsModal = (offer) => {
    setSelectedOffer(offer);
    setDetailsModalVisible(true);
  };

  const handleEditOffer = (index) => {
    setNewOffer(offers[index]);
    setSelectedOffer(index);
    setEditMode(true);
    setShowForm(true);
  };

  return (
    <div className="offer-container">
      <h2>Offer Letters</h2>

      {!showForm && (
        <>
          <button className="add-offer-button" onClick={() => setShowForm(true)}>
            Add New Offer Letter
          </button>

          <table className="offer-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={index}>
                  <td>{offer.candidate}</td>
                  <td>{offer.email}</td>
                  <td>{offer.phone}</td>
                  <td>{offer.position}</td>
                  <td>
                    <button onClick={() => showDetailsModal(offer)}>View Details</button>
                    <button onClick={() => handleEditOffer(index)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
        <form className="offer-form" onSubmit={handleAddOffer}>
          <h3>{editMode ? "Edit Offer Letter" : "Add New Offer Letter"}</h3>
          <input type="text" placeholder="Candidate Name" value={newOffer.candidate} onChange={(e) => setNewOffer({ ...newOffer, candidate: e.target.value })} required />
          <input type="email" placeholder="Candidate Email" value={newOffer.email} onChange={(e) => setNewOffer({ ...newOffer, email: e.target.value })} required />
          <input type="text" placeholder="Phone Number" value={newOffer.phone} onChange={(e) => setNewOffer({ ...newOffer, phone: e.target.value })} />

          <select value={newOffer.position} onChange={(e) => setNewOffer({ ...newOffer, position: e.target.value })} required>
            <option value="">Select Job Position</option>
            {jobPositions.map((position, index) => (
              <option key={index} value={position}>{position}</option>
            ))}
          </select>

          <input type="text" placeholder="Salary Package" value={newOffer.salary} onChange={(e) => setNewOffer({ ...newOffer, salary: e.target.value })} required />
          <input type="date" value={newOffer.joiningDate} onChange={(e) => setNewOffer({ ...newOffer, joiningDate: e.target.value })} />

          <select value={newOffer.employmentType} onChange={(e) => setNewOffer({ ...newOffer, employmentType: e.target.value })}>
            <option value="">Select Employment Type</option>
            {employmentTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <select value={newOffer.workLocation} onChange={(e) => setNewOffer({ ...newOffer, workLocation: e.target.value })}>
            <option value="">Select Work Location</option>
            {workLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>

          <input type="date" placeholder="Offer Expiry Date" value={newOffer.offerExpiry} onChange={(e) => setNewOffer({ ...newOffer, offerExpiry: e.target.value })} />
          <input type="text" placeholder="HR Contact Person" value={newOffer.hrContact} onChange={(e) => setNewOffer({ ...newOffer, hrContact: e.target.value })} />

          <div className="button-container">
            <button type="submit">{editMode ? "Update Offer Letter" : "Create Offer Letter"}</button>
          </div>

          <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Back</button>
        </form>
      )}

      <Modal
        title="Offer Details"
        visible={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailsModalVisible(false)}>
            Close
          </Button>,
        ]}
        className="custom-modal"
      >
        {selectedOffer && (
          <div className="offer-details">
            <p><strong>Candidate:</strong> {selectedOffer.candidate}</p>
            <p><strong>Email:</strong> {selectedOffer.email}</p>
            <p><strong>Phone:</strong> {selectedOffer.phone}</p>
            <p><strong>Position:</strong> {selectedOffer.position}</p>
            <p><strong>Salary:</strong> {selectedOffer.salary}</p>
            <p><strong>Joining Date:</strong> {selectedOffer.joiningDate}</p>
            <p><strong>Employment Type:</strong> {selectedOffer.employmentType}</p>
            <p><strong>Work Location:</strong> {selectedOffer.workLocation}</p>
            <p><strong>Offer Expiry:</strong> {selectedOffer.offerExpiry}</p>
            <p><strong>HR Contact:</strong> {selectedOffer.hrContact}</p>
            <p><strong>Status:</strong> {selectedOffer.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default OfferLetters;
