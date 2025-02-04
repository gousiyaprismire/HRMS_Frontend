import React, { useState } from "react";
import "./Recruitment.css";  
function JobListings() {
  const [jobs, setJobs] = useState([
    { title: "Software Engineer", description: "React Developer" },
    { title: "Product Manager", description: "Product Development Lead" }
  ]);

  const [newJob, setNewJob] = useState({ title: "", description: "" });

  
  const jobDescriptions = {
    "Software Engineer": ["React Developer", "Full Stack Developer", "Backend Developer"],
    "Product Manager": ["Product Development Lead", "Product Owner", "Business Analyst"],
    "UX Designer": ["UX/UI Designer", "Interaction Designer", "Product Designer"],
    "Data Scientist": ["Machine Learning Engineer", "Data Analyst", "Data Engineer"],
    "QA Engineer": ["Manual Tester", "Automation Engineer", "QA Lead"]
  };

  
  const handleAddJob = () => {
    if (newJob.title && newJob.description) {
      setJobs([...jobs, newJob]);
      setNewJob({ title: "", description: "" });  // Reset the form
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <div className="job-listings-container">
      <h2 className="job-listings-header">Job Listings</h2>
      
  
      <ul>
        {jobs.map((job, index) => (
          <li key={index} className="job-item">
            <span className="job-title">{job.title}</span>
            <span className="job-description">{job.description}</span>
          </li>
        ))}
      </ul>

     
      <div className="add-job-form">
       
        <select
          value={newJob.title}
          onChange={(e) => {
            setNewJob({ ...newJob, title: e.target.value, description: "" });  
          }}
        >
          <option value="">Select Job Title</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="UX Designer">UX Designer</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="QA Engineer">QA Engineer</option>
        </select>

      
        {newJob.title && (
          <select
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
          >
            <option value="">Select Job Description</option>
            {jobDescriptions[newJob.title].map((desc, index) => (
              <option key={index} value={desc}>
                {desc}
              </option>
            ))}
          </select>
        )}

       
        <button onClick={handleAddJob}>Add Job</button>
      </div>
    </div>
  );
}

export default JobListings;
