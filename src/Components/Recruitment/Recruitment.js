import React, { useState } from "react";
import "./Recruitment.css";
import JobListings from "./JobListings";
import Applicants from "./Applicants";
import InterviewSchedule from "./InterviewSchedule";
import OfferLetters from "./OfferLetters";
import Onboarding from "./Onboarding";

function Recruitment() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="recruitment-container">
      <h2 className="recruitment-header">Recruitment</h2>

      <div className="recruitment-tabs">
        <button
          onClick={() => setActiveTab("jobs")}
          className={activeTab === "jobs" ? "active" : ""}
        >
          Job Listings
        </button>
        <button
          onClick={() => setActiveTab("applicants")}
          className={activeTab === "applicants" ? "active" : ""}
        >
          Applicants
        </button>
        <button
          onClick={() => setActiveTab("interviews")}
          className={activeTab === "interviews" ? "active" : ""}
        >
          Interviews
        </button>
        <button
          onClick={() => setActiveTab("offers")}
          className={activeTab === "offers" ? "active" : ""}
        >
          Offers
        </button>
        <button
          onClick={() => setActiveTab("onboarding")}
          className={activeTab === "onboarding" ? "active" : ""}
        >
          Onboarding
        </button>
      </div>

      <div className="recruitment-tab-content">
        {activeTab === "jobs" && <JobListings />}
        {activeTab === "applicants" && <Applicants />}
        {activeTab === "interviews" && <InterviewSchedule />}
        {activeTab === "offers" && <OfferLetters />}
        {activeTab === "onboarding" && <Onboarding />}
      </div>
    </div>
  );
}

export default Recruitment;
