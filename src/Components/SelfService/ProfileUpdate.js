import React, { useState } from "react";
import "./SelfService.css";

const ProfileUpdate = () => {
 
  const initialProfiles = [
    {
      name: "Priya",
      email: "Priya.d@example.com",
      phone: "9874563210",
      address: " Hyderabad",
      dob: "1990-05-15",
      gender: "Male",
      department: "IT",
      employeeId: "EMP001",
    },
    {
      name: "dolly",
      email: "dolly.s@example.com",
      phone: "9876563210",
      address: "Bangalore",
      dob: "1988-09-22",
      gender: "Female",
      department: "HR",
      employeeId: "EMP002",
    },
  ];

  const [profiles, setProfiles] = useState(initialProfiles); // Store profiles
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    department: "",
    employeeId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfiles([...profiles, formData]); 
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      gender: "",
      department: "",
      employeeId: "",
    });
    setShowForm(false); 
  };

  return (
    <div className="selfservice-profile-update-container">
      <h2 className="selfservice-profile-update-title">Profile Management</h2>
   
    
     
      {!showForm && (
  <>
    <button
      className="selfservice-add-profile-button"
      onClick={() => setShowForm(true)}
    >
      Add Profile
    </button>
          <table className="selfservice-profile-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Employee ID</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr key={index}>
                  <td>{profile.name}</td>
                  <td>{profile.email}</td>
                  <td>{profile.phone}</td>
                  <td>{profile.address}</td>
                  <td>{profile.dob}</td>
                  <td>{profile.gender}</td>
                  <td>{profile.department}</td>
                  <td>{profile.employeeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
      
      
        </>
      )}

    
      {showForm && (
        <form onSubmit={handleSubmit} className="selfservice-profile-update-form">
          <div className="selfservice-form-grid">
            <div className="selfservice-form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="selfservice-form-input"
                required
              />
            </div>

            <div className="selfservice-form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="selfservice-form-input"
                required
              />
            </div>

            <div className="selfservice-form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="selfservice-form-input"
                required
              />
            </div>

            <div className="selfservice-form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className="selfservice-form-input"
                required
              />
            </div>

            <div className="selfservice-form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="selfservice-form-input"
                required
              />
            </div>

            <div className="selfservice-form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="selfservice-form-input"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="selfservice-form-group">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter your department"
                className="selfservice-form-input"
                required
              />
            </div>

            <div className="selfservice-form-group">
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                placeholder="Enter your Employee ID"
                className="selfservice-form-input"
                required
              />
            </div>
          </div>

          <div className="selfservice-form-buttons">
            <button type="submit" className="selfservice-profile-update-button">
              Update Profile
            </button>
            <button
              type="button"
              className="selfservice-back-button"
              onClick={() => setShowForm(false)}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileUpdate;
