import React, { useState } from "react";
import "./Recruitment.css";

const Applicant = () => {
  const [showForm, setShowForm] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      applicantName: "Keerthi",
      email: "Purple@p.com",
      mobile: "7865461234",
      appliedJob: "Frontend Developer",
      status: "Shortlisted",
    },
    {
      id: 2,
      applicantName: "Priya",
      email: "Dolly@d.com",
      mobile: "9876543210",
      appliedJob: "Backend Developer",
      status: "Hired",
    },
  ]);

  const [formData, setFormData] = useState({
    applicantName: "",
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
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.email || !formData.mobile || !formData.degree || !formData.appliedJob || !formData.expectedSalary || !formData.department) {
      alert("Please fill in all required fields before saving.");
      return;
    }
    setApplicants([...applicants, { id: applicants.length + 1, ...formData }]);
    setShowForm(false);
    resetForm();
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      applicantName: "",
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
      status: "Pending",
    });
  };

  const updateStatus = (id, newStatus) => {
    setApplicants(
      applicants.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
    setPopupMessage(`Applicant status updated to "${newStatus}"`);
    setTimeout(() => setPopupMessage(""), 2000);
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
                <th>Action</th>
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
                  <td>
                    <button className="applicant-action-btn" onClick={() => updateStatus(app.id, "Hired")}>
                      Hired
                    </button>
                    <button className="applicant-action-btn" onClick={() => updateStatus(app.id, "Rejected")}>
                      Rejected
                    </button>
                    <button className="applicant-action-btn" onClick={() => updateStatus(app.id, "Shortlisted")}>
                      Shortlisted
                    </button>
                  </td>
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
                <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} placeholder="Enter applicant's name" />
              </div>
              <div className="applicant-form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
              </div>
              <div className="applicant-form-group">
                <label>Mobile:</label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile" />
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
                <label>Department:</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="">Select department</option>
                  <option value="engineering">Engineering</option>
                  <option value="hr">Human Resources</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
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
                <label>Expected Salary:</label>
                <input type="number" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="Enter expected salary" />
              </div>
              <div className="applicant-form-group">
                <label>Appreciation:</label>
                <input type="number" name="appreciation" value={formData.appreciation} onChange={handleChange} placeholder="Enter appreciation score" />
              </div>
            </div>
            <div className="applicant-form-buttons">
              <button type="submit" className="applicant-btn save-btn">Save</button>
              <button type="button" className="applicant-btn cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {popupMessage && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicant;
