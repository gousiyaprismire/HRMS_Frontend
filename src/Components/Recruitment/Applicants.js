import React, { useState } from "react";
import "./Recruitment.css";  

function Applicants() {
  const [applicants, setApplicants] = useState([
    { name: "A", job: "Software Engineer", status: "Pending" },
    { name: "B", job: "Product Manager", status: "Shortlisted" }
  ]);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("");

  
  const jobTitles = [
    "Software Engineer",
    "Product Manager",
    "UX Designer",
    "Data Scientist",
    "QA Engineer"
  ];

  const handleAddApplicant = (e) => {
    e.preventDefault(); 
    if (!name || !job || !status) {
      alert("Please fill all fields");
      return;
    }

    const newApplicant = { name, job, status };
    setApplicants((prevApplicants) => [...prevApplicants, newApplicant]);

    
    setName("");
    setJob("");
    setStatus("");
  };

  return (
    <div className="applicants-container">
      <h2 className="applicants-header">Applicants</h2>

      <form onSubmit={handleAddApplicant} className="applicant-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Job:</label>
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Job</option>
            {jobTitles.map((jobTitle, index) => (
              <option key={index} value={jobTitle}>
                {jobTitle}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Applicant</button>
      </form>

      
      <ul className="applicants-list">
        {applicants.map((app, index) => (
          <li key={index} className="applicant-item">
            <span className="applicant-name">{app.name}</span> - 
            <span className="applicant-job">{app.job}</span> 
            <span className={`status ${app.status.toLowerCase()}`}>({app.status})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Applicants;
