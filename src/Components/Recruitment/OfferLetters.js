import React, { useState } from "react";
import "./Recruitment.css"; // Import the CSS file

function OfferLetters() {
  const [offers, setOffers] = useState([
    {
      candidate: "A",
      email: "@example.com",
      phone: "9987456321",
      position: "Software Engineer",
      salary: "80,000",
      joiningDate: "2025-03-01",
      employmentType: "Full-Time",
      workLocation: "On-site",
      offerExpiry: "2025-02-25",
      hrContact: "Purple",
      status: "Sent",
    },
    {
      candidate: "B",
      email: "b@example.com",
      phone: "987456321",
      position: "Product Manager",
      salary: "100,000",
      joiningDate: "2025-04-01",
      employmentType: "Full-Time",
      workLocation: "Hybrid",
      offerExpiry: "2025-02-28",
      hrContact: "Dolly",
      status: "Sent",
    },
  ]);

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

  const [showForm, setShowForm] = useState(false);

  const jobPositions = ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "QA Engineer"];
  const employmentTypes = ["Full-Time", "Part-Time", "Contract"];
  const workLocations = ["Remote", "On-site", "Hybrid"];

  const handleAddOffer = (e) => {
    e.preventDefault(); // Prevent page reload
    if (newOffer.candidate && newOffer.position && newOffer.email && newOffer.salary) {
      setOffers([...offers, newOffer]);
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
      setShowForm(false); // Hide form after submission
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleStatusChange = (index, status) => {
    const updatedOffers = [...offers];
    updatedOffers[index].status = status;
    setOffers(updatedOffers);
  };

  return (
    <div className="offer-container">
      <h2>Offer Letters</h2>

      {/* Offer Letters Table */}
      <table className="offer-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Employment Type</th>
            <th>Work Location</th>
            <th>Offer Expiry</th>
            <th>HR Contact</th>
            <th>Status</th>
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
              <td>{offer.salary}</td>
              <td>{offer.joiningDate}</td>
              <td>{offer.employmentType}</td>
              <td>{offer.workLocation}</td>
              <td>{offer.offerExpiry}</td>
              <td>{offer.hrContact}</td>
              <td className={`status ${offer.status.toLowerCase()}`}>{offer.status}</td>
              <td>
                <button onClick={() => handleStatusChange(index, "Accepted")} disabled={offer.status !== "Sent"}>
                  Accept
                </button>
                <button onClick={() => handleStatusChange(index, "Rejected")} disabled={offer.status !== "Sent"}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-offer-button" onClick={() => setShowForm(true)}>
        Add New Offer Letter
      </button>

      {showForm && (
        <form className="offer-form" onSubmit={handleAddOffer}>
          <h3>Add New Offer Letter</h3>
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

          <button type="submit">Create Offer Letter</button>
          <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default OfferLetters;
