import React, { useState } from 'react';
import './Recruitment.css';
 
const Applicant = () => {
  const [formData, setFormData] = useState({
    
    applicantName: '',
    contact: '',
    email: '',
    mobile: '',
    degree: '',
    appliedJob: '',
    department: '',
    expectedSalary: '',
    extraAdvantages: '',
    responsible: '',
    nextAction: '',
    appreciation: 0,
    source: '',
    referredBy: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };
 
  return (
    <form onSubmit={handleSubmit} className="applicant-form">
  {/* Applicant's Name and Contact */}
  <div className="applicant-inline-group">
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
      <select
        name="contact"
        value={formData.contact}
        onChange={handleChange}
      >
        <option value="">Select contact</option>
        <option value="phone">Mobile</option>
        <option value="email">Email</option>
      </select>
    </div>
  </div>

  {/* Email and Mobile */}
  <div className="applicant-inline-group">
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
  </div>

  {/* Degree and Applied Job */}
  <div className="applicant-inline-group">
    <div className="applicant-form-group">
      <label>Degree:</label>
      <select
        name="degree"
        value={formData.degree}
        onChange={handleChange}
      >
        <option value="">Select degree</option>
        <option value="bachelors">Bachelors</option>
        <option value="masters">Masters</option>
        <option value="phd">PhD</option>
      </select>
    </div>
    <div className="applicant-form-group">
      <label>Applied Job:</label>
      <select
        name="appliedJob"
        value={formData.appliedJob}
        onChange={handleChange}
      >
        <option value="">Select job</option>
        <option value="softwareTester">Software Tester</option>
        <option value="developer">Full Stack Developer</option>
        <option value="frontend">Frontend Developer</option>
        <option value="backend">Backend Developer</option>
        <option value="devops">DevOps Engineer</option>
      </select>
    </div>
  </div>

  {/* Department and Expected Salary */}
  <div className="applicant-inline-group">
    <div className="applicant-form-group">
      <label>Department:</label>
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
      >
        <option value="">Select department</option>
        <option value="hr">HR</option>
        <option value="it">IT</option>
        <option value="marketing">Marketing</option>
      </select>
    </div>
    <div className="applicant-form-group">
      <label>Expected Salary:</label>
      <input
        type="text"
        name="expectedSalary"
        value={formData.expectedSalary}
        onChange={handleChange}
        placeholder="Enter expected salary"
      />
    </div>
  </div>
{/* Status */}
<div className="applicant-inline-group">
  <div className="applicant-form-group">
    <label>Status:</label>
    <div className="status-options">
      
    <label>
        <input
          type="radio"
          name="status"
          value="hired"
          checked={formData.status === 'hired'}
          onChange={handleChange}
        />
        Hired
      </label>
      <label>
        <input
          type="radio"
          name="status"
          value="shortlisted"
          checked={formData.status === 'shortlisted'}
          onChange={handleChange}
        />
        Shortlisted
      </label>
    
      <label>
        <input
          type="radio"
          name="status"
          value="rejected"
          checked={formData.status === 'rejected'}
          onChange={handleChange}
        />
        Rejected
      </label>
    </div>
  </div>
</div>


  {/* Buttons */}
  <div>
    <button type="submit" className="applicant-btn">Save</button>
    <button type="reset" onClick={() => setFormData({})} className="applicant-btn">Discard</button>
  </div>
  
</form>

  );
};
 
export default Applicant;