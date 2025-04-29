import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Recruitment.css";


const API_URL = "http://localhost:8080/api/jobs";

function JobListings({ setActivePage }) {
  const navigate = useNavigate();
  
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", applications: 0, status: "Pending", hired: "0/1" });

  const jobTitles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cloud Architect",
    "Cybersecurity Analyst",
    "Data Scientist",
    "AI Engineer",
    "UI/UX Designer",
    "QA Engineer",
  ];

  
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setJobs(response.data);  
      })
      .catch(error => {
        console.error("Error fetching job listings:", error);
      });
  }, []);

  const handleAddJob = () => {
    if (newJob.title) {
      
      axios.post(API_URL, newJob)
        .then(response => {
          setJobs([...jobs, response.data]);  
          setNewJob({ title: "", applications: 0, status: "Pending", hired: "0/1" });
        })
        .catch(error => {
          console.error("Error adding new job:", error);
        });
    } else {
      alert("Please select a job title.");
    }
  };

  const handleApplicationsClick = (jobTitle) => {
    navigate(`/recruitment/job-listings/applicants?title=${jobTitle}`);
  };

  return (
    <div className="recruitment-job-listings">
      <h2 className="recruitment-job-listings-header">Job Listings</h2>

      <div className="recruitment-job-cards">
        {jobs.map((job, index) => (
          <div key={index} className="recruitment-job-card">
            <h3 className="recruitment-job-title">{job.title}</h3>
            <div className="recruitment-job-info">
              <button 
                className="recruitment-job-apply" 
                onClick={() => handleApplicationsClick(job.title)} 
              >
                Applications {job.applications}
              </button>
              <span className="recruitment-job-status">{job.status}</span>
              {/* <span className="recruitment-job-hired">Hired: {job.hired}</span> */}
            </div>
          </div>
        ))}
      </div>

      <div className="recruitment-job-add-container">
        <label htmlFor="job-select" className="recruitment-job-select-label"></label>
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
