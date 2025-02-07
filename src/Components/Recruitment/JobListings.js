import React, { useState } from "react";
import "./Recruitment.css";

function JobListings() {
  
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


  return (
    <div className="recruitment-job-listings">
      <h2 className="recruitment-job-listings-header">Job Positions</h2>

      <div className="recruitment-job-cards">
        {jobs.map((job, index) => (
          <div key={index} className="recruitment-job-card">
            <h3 className="recruitment-job-title">{job.title}</h3>
            <div className="recruitment-job-info">
              <button 
                className="recruitment-job-apply" 
               
              >
                Applications: {job.applications}
              </button>
              <span className="recruitment-job-status">{job.status}</span>
              <span className="recruitment-job-hired">Hired: {job.hired}</span>
            </div>
          </div>
        ))}
      </div>


      <div className="recruitment-job-add-container">
        <label htmlFor="job-select" className="recruitment-job-select-label">
          
        </label>
        <div className="recruitment-job-select-wrapper">
          <select
            id="job-select"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="recruitment-job-select"
          >
            <option value="">Choose a title</option>
            {jobTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
          <button onClick={handleAddJob} className="recruitment-add-job">
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobListings;
