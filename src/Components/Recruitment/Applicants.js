import React, { useState } from "react";
import "./Recruitment.css";

function Applicants() {
  const [applicants, setApplicants] = useState([
    { name: "A", job: "Software Engineer", status: "Pending" },
    { name: "B", job: "Product Manager", status: "Shortlisted" },
  ]);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("");

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

      <form onSubmit={handleAddApplicant} className="applicants-form">
        <div className="applicants-form-group">
          <label className="applicants-form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="applicants-form-input"
            required
          />
        </div>
        <div className="applicants-form-group">
          <label className="applicants-form-label">Job</label>
          <select
            value={job}
            onChange={(e) => setJob(e.target.value)}
            className="applicants-form-select"
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
        <div className="applicants-form-group">
          <label className="applicants-form-label">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="applicants-form-select"
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="applicants-submit-button">
          Add Applicant
        </button>
      </form>

      <ul className="applicants-list">
        {applicants.map((app, index) => (
          <li key={index} className="applicants-item">
            <span className="applicants-name">{app.name}</span> -{" "}
            <span className="applicants-job">{app.job}</span>{" "}
            <span className={`applicants-status ${app.status.toLowerCase()}`}>
              ({app.status})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Applicants;
