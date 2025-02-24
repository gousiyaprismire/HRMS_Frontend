import React, { useState } from "react";
import "./Recruitment.css";

const Applicant = () => {
  const [showForm, setShowForm] = useState(false);
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      applicantName: "Purple",
      email: "Purple@p.com",
      mobile: "7865461234",
      appliedJob: "Frontend Developer",
      status: "Shortlisted",
    },
    {
      id: 2,
      applicantName: "Dolly",
      email: "Dolly@d.com",
      mobile: "9876543210",
      appliedJob: "Backend Developer",
      status: "Hired",
    },
  ]);

  const [formData, setFormData] = useState({
    applicantName: "",
    contact: "",
    email: "",
    mobile: "",
    degree: "",
    appliedJob: "",
    department: "",
    expectedSalary: "",
    extraAdvantages: "",
    responsible: "",
    nextAction: "",
    appreciation: 0,
    source: "",
    referredBy: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplicants([...applicants, { id: applicants.length + 1, ...formData }]);
    setShowForm(false);
    setFormData({
      applicantName: "",
      contact: "",
      email: "",
      mobile: "",
      degree: "",
      appliedJob: "",
      department: "",
      expectedSalary: "",
      extraAdvantages: "",
      responsible: "",
      nextAction: "",
      appreciation: 0,
      source: "",
      referredBy: "",
      status: "",
    });
  };

  return (
    <div className="applicant-container">
      {!showForm && (
        <div className="applicant-left-section">
          <h2>Applicant List</h2>
          <button onClick={() => setShowForm(true)} className="applicant-btn">
            Add Applicant
          </button>
          <table className="applicant-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Job</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.id}>
                  <td>{app.applicantName}</td>
                  <td>{app.email}</td>
                  <td>{app.mobile}</td>
                  <td>{app.appliedJob}</td>
                  <td>{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="applicant-right-section">
          <h3>Add Applicant</h3>
          <form onSubmit={handleSubmit} className="applicant-form">
  <div className="applicant-form-grid">
    <div className="applicant-form-group">
      <label>Applicant's Name:</label>
      <input 
        type="text" 
        name="applicantName" 
        value={formData.applicantName} 
        onChange={handleChange} 
        placeholder="Enter applicant's name" 
      />
    </div>
    <div className="applicant-form-group">
      <label>Contact:</label>
      <select name="contact" value={formData.contact} onChange={handleChange}>
        <option value="">Select contact</option>
        <option value="phone">Mobile</option>
        <option value="email">Email</option>
      </select>
    </div>
    <div className="applicant-form-group">
      <label>Email:</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Enter email" 
      />
    </div>
    <div className="applicant-form-group">
      <label>Mobile:</label>
      <input 
        type="text" 
        name="mobile" 
        value={formData.mobile} 
        onChange={handleChange} 
        placeholder="Enter mobile" 
      />
    </div>
    <div className="applicant-form-group">
      <label>Degree:</label>
      <select name="degree" value={formData.degree} onChange={handleChange}>
        <option value="">Select degree</option>
        <option value="bachelors">Bachelors</option>
        <option value="masters">Masters</option>
        <option value="phd">PhD</option>
      </select>
    </div>
    <div className="applicant-form-group">
      <label>Applied Job:</label>
      <select name="appliedJob" value={formData.appliedJob} onChange={handleChange}>
        <option value="">Select job</option>
        <option value="softwareTester">Software Tester</option>
        <option value="developer">Full Stack Developer</option>
        <option value="frontend">Frontend Developer</option>
        <option value="backend">Backend Developer</option>
        <option value="devops">DevOps Engineer</option>
      </select>
    </div>
    <div className="applicant-form-group">
      <label>Experience (Years):</label>
      <input 
        type="number" 
        name="experienceYears" 
        value={formData.experienceYears} 
        onChange={handleChange} 
        placeholder="Enter years of experience" 
      />
    </div>
    <div className="applicant-form-group">
      <label>Salary Expected:</label>
      <input 
        type="number" 
        name="expectedSalary" 
        value={formData.expectedSalary} 
        onChange={handleChange} 
        placeholder="Enter expected salary" 
      />
    </div>
  </div>
  <div className="applicant-form-buttons">
    <button type="submit" className="applicant-btn">Save</button>
    <button type="button" onClick={() => setShowForm(false)} className="applicant-btn">Cancel</button>
  </div>
</form>

        </div>
      )}
    </div>
  );
};

export default Applicant;
