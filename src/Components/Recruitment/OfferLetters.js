import React, { useState } from "react";
import "./Recruitment.css"; // Import the CSS file

function OfferLetters() {
  const [offers, setOffers] = useState([
   
     { candidate: "A", position: "Software Engineer", status: "Sent" },
     { candidate: "B", position: "Product Manager", status: "Sent" }
  ]);

  const [newOffer, setNewOffer] = useState({
    candidate: "",
    position: "",
    status: "Sent"
  });

  
  const jobPositions = [
    "Software Engineer",
    "Product Manager",
    "UX Designer",
    "Data Scientist",
    "QA Engineer"
  ];

  const handleAddOffer = () => {
    if (newOffer.candidate && newOffer.position) {
      setOffers([...offers, newOffer]);
      setNewOffer({ candidate: "", position: "", status: "Sent" });
    } else {
      alert("Please fill in all fields.");
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

     
      <ul className="offer-list">
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <span>{offer.candidate} - {offer.position} ({offer.status})</span>
            <div>
              <button
                onClick={() => handleStatusChange(index, "Accepted")}
                disabled={offer.status === "Accepted" || offer.status === "Rejected"}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusChange(index, "Rejected")}
                disabled={offer.status === "Accepted" || offer.status === "Rejected"}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>

      
      <div className="offer-form">
        <h3>Add New Offer Letter</h3>
        <input
          type="text"
          placeholder="Candidate Name"
          value={newOffer.candidate}
          onChange={(e) => setNewOffer({ ...newOffer, candidate: e.target.value })}
        />
        
        
        <select
          value={newOffer.position}
          onChange={(e) => setNewOffer({ ...newOffer, position: e.target.value })}
        >
          <option value="">Select Job Position</option>
          {jobPositions.map((position, index) => (
            <option key={index} value={position}>
              {position}
            </option>
          ))}
        </select>

        <button onClick={handleAddOffer}>Create Offer Letter</button>
      </div>
    </div>
  );
}

export default OfferLetters;
