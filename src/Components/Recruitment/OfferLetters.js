import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import "./Recruitment.css";

function OfferLetters() {
  const [offerLetters, setOfferLetters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const jobPositions = ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "QA Engineer"];
  const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
  const workLocations = ["Remote", "On-site", "Hybrid"];

  const [newOffer, setNewOffer] = useState({
    candidateEmail: "",
    candidateName: "",
    phoneNumber: "",
    jobPosition: "",
    salaryPackage: "",
    offerDate: "",
    employmentType: "",
    workLocation: "",
    offerExpiry: "",
    hrContactPerson: "",
    status: "Sent",
  });

  useEffect(() => {
    fetchOfferLetters();
  }, []);

  const fetchOfferLetters = () => {
    axios.get("http://localhost:8080/api/offer-letters")
      .then((response) => {
        setOfferLetters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offer letters:", error);
      });
  };

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!newOffer.candidateEmail || !newOffer.candidateName || !newOffer.jobPosition || !newOffer.salaryPackage) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (editMode) {
      axios.put(`http://localhost:8080/api/offer-letters/${selectedOffer.id}`, newOffer)
        .then(() => {
          fetchOfferLetters();
          setEditMode(false);
        })
        .catch((error) => console.error("Error updating offer letter:", error));
    } else {
      axios.post("http://localhost:8080/api/offer-letters", newOffer)
        .then(() => {
          fetchOfferLetters();
        })
        .catch((error) => console.error("Error adding offer letter:", error));
    }
  
    setNewOffer({
      candidateEmail: "",
      candidateName: "",
      phoneNumber: "",
      jobPosition: "",
      salaryPackage: "",
      offerDate: "",
      employmentType: "",
      workLocation: "",
      offerExpiry: "",
      hrContactPerson: "",
      status: "Sent",
    });
  
    setShowForm(false);
  };

  const showDetailsModal = (offer) => {
    setSelectedOffer(offer);
    setDetailsModalVisible(true);
  };

  const handleEditOffer = (offer) => {
    setNewOffer(offer);
    setSelectedOffer(offer);
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
              {offerLetters.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.candidateName}</td>
                  <td>{offer.candidateEmail}</td>
                  <td>{offer.phoneNumber}</td>
                  <td>{offer.jobPosition}</td>
                  <td>
                    <button onClick={() => showDetailsModal(offer)}>View Details</button>
                    <button onClick={() => handleEditOffer(offer)}>Edit</button>
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
          <input type="text" placeholder="Candidate Name" value={newOffer.candidateName} onChange={(e) => setNewOffer({ ...newOffer, candidateName: e.target.value })} required />
          <input type="email" placeholder="Candidate Email" value={newOffer.candidateEmail} onChange={(e) => setNewOffer({ ...newOffer, candidateEmail: e.target.value })} required />
          <input type="text" placeholder="Phone Number" value={newOffer.phoneNumber} onChange={(e) => setNewOffer({ ...newOffer, phoneNumber: e.target.value })} />

          <select value={newOffer.jobPosition} onChange={(e) => setNewOffer({ ...newOffer, jobPosition: e.target.value })} required>
            <option value="">Select Job Position</option>
            {jobPositions.map((position, index) => (
              <option key={index} value={position}>{position}</option>
            ))}
          </select>

          <input type="text" placeholder="Salary Package" value={newOffer.salaryPackage} onChange={(e) => setNewOffer({ ...newOffer, salaryPackage: e.target.value })} required />
                  
          <div className="date-input-container">
              <input 
                type="date" 
                value={newOffer.offerDate} 
                onChange={(e) => setNewOffer({ ...newOffer, offerDate: e.target.value })} 
                required 
              />
              <span className="date-placeholder">Offer Date</span>
            </div>

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

  

            <div className="date-input-container">
              <input 
                type="date" 
                value={newOffer.offerExpiry} 
                onChange={(e) => setNewOffer({ ...newOffer, offerExpiry: e.target.value })} 
                required 
              />
              <span className="date-placeholder">Offer Expiry Date</span>
            </div>
          <input type="text" placeholder="HR Contact Person" value={newOffer.hrContactPerson} onChange={(e) => setNewOffer({ ...newOffer, hrContactPerson: e.target.value })} />

          <div className="button-container">
            <button type="submit">{editMode ? "Update Offer Letter" : "Create Offer Letter"}</button>
          </div>


          <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Back</button>
        </form>
      )}

      <Modal
        title="Offer Details"
        open={detailsModalVisible}
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
            {Object.entries(selectedOffer).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default OfferLetters;
