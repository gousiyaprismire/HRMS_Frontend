import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfService.css";

const API_BASE_URL = "http://localhost:8080/api/profiles"; 

const ProfileUpdate = () => {
  const [profiles, setProfiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
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


  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        const formattedProfiles = response.data.map((profile) => ({
          ...profile,
          dob: profile.dob ? profile.dob.split("T")[0] : "", 
        }));
        setProfiles(formattedProfiles);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "dob") {
     
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    console.log(date.toISOString().split("T")[0]);
    return date.toISOString().split("T")[0]; 
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.dob);

    const formattedData = {
      ...formData,
      dateOfBirth: formatDate(formData.dob).toString(),
    };

    axios
      .post(API_BASE_URL, formattedData)
      .then((response) => {
        setProfiles([...profiles, response.data]);
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
      })
      .catch((error) => {
        console.error("Error adding/storing profile:", error);
      });
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
                  <td>{profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split("T")[0] : ""}</td>
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
              value={formData.dob ? new Date(formData.dob).toISOString().split("T")[0] : ""}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="selfservice-form-input"
              required
            >
              <option value="">Select your department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
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
