import React, { useState } from "react";
import "./Recruitment.css";
import JobListings from "./JobListings";
import Applicants from "./Applicants";
import InterviewSchedule from "./InterviewSchedule";
import OfferLetters from "./OfferLetters";
import Onboarding from "./Onboarding";

function Recruitment() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "jobs":
        return <JobListings setActivePage={setActivePage} />; 
      case "applicants":
        return <Applicants />;
      case "interviews":
        return <InterviewSchedule />;
      case "offers":
        return <OfferLetters />;
      case "onboarding":
        return <Onboarding />;
      default:
        return (
          <>
            <h1 className="recruitment-header">Recruitment Dashboard</h1>
            <div className="recruitment-buttons">
              <button onClick={() => setActivePage("jobs")}>Job Listings</button>
              {/* <button onClick={() => setActivePage("applicants")}>Applicants</button> */}
              <button onClick={() => setActivePage("interviews")}>Interviews</button>
              <button onClick={() => setActivePage("offers")}>Offers</button>
              <button onClick={() => setActivePage("onboarding")}>Onboarding</button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="recruitment-container">
      {renderPage()}
      {activePage !== "dashboard" && (
        <button className="recruitment-back-button" onClick={() => setActivePage("dashboard")}>
          Back
        </button>
      )}
    </div>
  );
}

export default Recruitment;
