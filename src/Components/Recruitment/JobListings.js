import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Recruitment.css";

function JobListings() {
  const navigate = useNavigate(); 
  const [jobs, setJobs] = useState([
    { title: "Software Engineer", applications: 10, status: "Recruitment Done", hired: "0/3" },
    { title: "Frontend Developer", applications: 7, status: "Recruitment Done", hired: "0/2" },
    { title: "Backend Developer", applications: 5, status: "Recruitment Done", hired: "0/2" },
    { title: "Full Stack Developer", applications: 12, status: "Recruitment Done", hired: "0/4" },
  ]);

  const [newJob, setNewJob] = useState({ title: "", applications: 0, status: "Pending", hired: "0/1" });

  const jobTitles = [
    "Chief Executive Officer",
    "Chief Technical Officer",
    "Consultant",
    "Experienced Developer",
    "Human Resources Manager",
    "Marketing and Community Manager",
    "Trainee",
    "ERP Techno Functionalist",
  ];

  const handleAddJob = () => {
    if (newJob.title) {
      setJobs([...jobs, newJob]);
      setNewJob({ title: "", applications: 0, status: "Pending", hired: "0/1" });
    } else {
      alert("Please select a job title.");
    }
  };

  const handleNavigateToApplicants = (jobTitle) => {
    navigate(`/applicants?job=${encodeURIComponent(jobTitle)}`);
  };

  return (
    <div className="job-listings-container">
      <h2 className="job-listings-header">Job Positions</h2>

      <div className="job-listings-cards">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <div className="job-info">
              <button 
                className="job-applications" 
                onClick={() => handleNavigateToApplicants(job.title)}
              >
                Applications: {job.applications}
              </button>
              <span className="job-status">{job.status}</span>
              <span className="job-hired">Hired: {job.hired}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="job-select-container">
        <select
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          className="job-select"
        >
          <option value="">Select Job Title</option>
          {jobTitles.map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>
        <button onClick={handleAddJob} className="add-job-button">
          Add Job
        </button>
      </div>
    </div>
  );
}

export default JobListings;
