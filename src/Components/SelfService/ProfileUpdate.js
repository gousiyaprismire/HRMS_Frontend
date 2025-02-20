import React, { useState } from 'react';
import './SelfService.css';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    department: '',
    employeeId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="selfservice-profile-update-container">
      <h2 className="selfservice-profile-update-title">Update Your Profile</h2>
      
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
            />
          </div>

          <div className="selfservice-form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="selfservice-form-input"
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
            />
          </div>
        </div>

        <button type="submit" className="selfservice-profile-update-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
