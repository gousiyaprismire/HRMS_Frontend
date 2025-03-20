import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recruitment.css";

const API_URL = "http://localhost:8080/applicants"; 

const degrees = ["B.Sc", "M.Sc", "B.Tech", "M.Tech", "MBA", "Ph.D"];
const departments = ["HR", "Engineering", "Marketing", "Finance", "Operations"];
const appliedJobs = ["Software Engineer", "Data Analyst", "Marketing Executive", "HR Manager"];

const Applicant = () => {
  const [showForm, setShowForm] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [applicants, setApplicants] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
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
    resume: { url: "" },
  });

 
  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(API_URL);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: { url: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile || !formData.degree || !formData.appliedJob || !formData.expectedSalary || !formData.department) {
      showPopup("Please fill in all required fields before saving.");
      return;
    }

    try {
      const response = await axios.post(API_URL, formData);
      setApplicants([...applicants, response.data]); 
      setShowForm(false);
      showPopup("Applicant added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding applicant:", error);
      showPopup("Failed to add applicant. Try again!");
    }
  };

  
  const updateStatus = async (id, newStatus) => {
    try {
      const applicantToUpdate = applicants.find((app) => app.id === id);
      if (!applicantToUpdate) {
        showPopup("Applicant not found!");
        return;
      }

      const updatedApplicant = { ...applicantToUpdate, status: newStatus };

      const response = await axios.put(`${API_URL}/${id}`, updatedApplicant); 
      console.log("Updated Applicant:", response.data); 

      setApplicants((prevApplicants) =>
        prevApplicants.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );

      showPopup(`Applicant status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Error updating status:", error);
      showPopup("Failed to update status. Try again!");
    }
  };

  
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000);
  };

 
  const resetForm = () => {
    setFormData({
      name: "",
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
      resume: { url: "" },
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
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
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Mobile", name: "mobile", type: "text" },
                { label: "Expected Salary", name: "expectedSalary", type: "number" },
                { label: "Appreciation", name: "appreciation", type: "number" },
                { label: "Resume URL", name: "resume", type: "text" },
              ].map((field) => (
                <div key={field.name} className="applicant-form-group">
                  <label>{field.label}:</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={field.name === "resume" ? formData.resume.url : formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              
              <div className="applicant-form-group">
                <label>Degree:</label>
                <select name="degree" value={formData.degree} onChange={handleChange}>
                  <option value="">Select Degree</option>
                  {degrees.map((degree) => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
              </div>

              
              <div className="applicant-form-group">
                <label>Department:</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="applicant-form-group">
                <label>Applied Job:</label>
                <select name="appliedJob" value={formData.appliedJob} onChange={handleChange}>
                  <option value="">Select Job</option>
                  {appliedJobs.map((job) => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="applicant-form-buttons">
              <button type="submit" className="applicant-btn save-btn">Save</button>
              <button type="button" className="applicant-btn cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

    
      {popupMessage && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <p>{popupMessage}</p>
              <button className="popup-close-btn" onClick={() => setPopupMessage("")}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicant;
