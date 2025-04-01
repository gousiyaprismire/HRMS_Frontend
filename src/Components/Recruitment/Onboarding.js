import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import "./Recruitment.css";

const API_BASE_URL = "http://localhost:8080/api/employee"; 

const EmployeeOnboarding = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    jobRole: "",
    department: "",
    joiningDate: "",
    reportingManager: "",
    workLocation: "Remote",
  });
  const [showForm, setShowForm] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const jobRoles = ["Software Engineer", "Data Analyst", "HR Manager"];
  const departments = ["IT", "HR", "Finance"];
  const managers = ["Keerthi", "Priya", "Purple"];
  const workLocations = ["Remote", "On-site", "Hybrid"];

  
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
  
    const formattedValue = name === "joiningDate" ? value.split("T")[0] : value;
  
    setFormData({ ...formData, [name]: formattedValue });
  };
  


  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.jobRole ||
      !formData.department ||
      !formData.joiningDate ||
      !formData.reportingManager
    ) {
      showPopup("Please fill all required fields!");
      return;
    }

    axios
      .post(API_BASE_URL, formData)
      .then((response) => {
        setEmployees([...employees, response.data]);
        showPopup("Employee added successfully!");
        setShowForm(false);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          jobRole: "",
          department: "",
          joiningDate: "",
          reportingManager: "",
          workLocation: "Remote",
        });
      })
      .catch((error) => console.error("Error adding employee:", error));
  };


  const updateStatus = (id, newStatus) => {
    axios
      .put(`${API_BASE_URL}/${id}`, { status: newStatus })
      .then(() => {
        setEmployees(
          employees.map((emp) =>
            emp.id === id ? { ...emp, status: newStatus } : emp
          )
        );
        showPopup(`Status updated to "${newStatus}"`);
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  
  const removeEmployee = (id) => {
    axios
      .delete(`${API_BASE_URL}/${id}`)
      .then(() => {
        setEmployees(employees.filter((emp) => emp.id !== id));
        showPopup("Employee removed successfully!");
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <div className="employee-onboarding">
      <h2>New Employee Onboarding</h2>

      {!showForm && (
        <>
          <button className="toggle-form-button" onClick={() => setShowForm(true)}>
            Add New Employee
          </button>

          <div className="onboarding-status">
            <h2>Onboarding Status</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Job Role</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Reporting Manager</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.fullName}</td>
                      <td>{emp.jobRole}</td>
                      <td>{emp.joiningDate}</td>
                      <td>
                        <span className={`status-badge status-${(emp.status || "Pending").toLowerCase()}`}>
                          {emp.status || "Pending"}
                        </span>
                      </td>
                      <td>{emp.reportingManager || "Unassigned"}</td>
                      <td>
                        <button onClick={() => updateStatus(emp.id, "In Progress")} className="action-button action-progress">
                          In Progress
                        </button>
                        <button onClick={() => updateStatus(emp.id, "Completed")} className="action-button action-complete">
                          Complete
                        </button>
                        <button onClick={() => removeEmployee(emp.id)} className="action-button action-remove">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6" className="text-center">No Employees</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showForm && (
        <div className="employee-onboarding card">
          <h3>Add New Employee</h3>

          <div className="form-grid">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="input" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input" required />
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="input" required />

            <select name="jobRole" value={formData.jobRole} onChange={handleChange} className="select" required>
              <option value="">Select Job Role</option>
              {jobRoles.map((role, index) => <option key={index} value={role}>{role}</option>)}
            </select>

            <select name="department" value={formData.department} onChange={handleChange} className="select" required>
              <option value="">Select Department</option>
              {departments.map((dept, index) => <option key={index} value={dept}>{dept}</option>)}
            </select>

            <select name="workLocation" value={formData.workLocation} onChange={handleChange} className="select" required>
              <option value="">Select Work Location</option>
              {workLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>

            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="input" required />

            <select name="reportingManager" value={formData.reportingManager} onChange={handleChange} className="select" required>
              <option value="">Select Reporting Manager</option>
              {managers.map((mgr, index) => <option key={index} value={mgr}>{mgr}</option>)}
            </select>
          </div>

          <div className="button-container">
            <button onClick={handleSubmit} className="button">Add Employee</button>
            <button className="cancel-button" onClick={() => setShowForm(false)}>Back</button>
          </div>
        </div>
      )}

      <Modal open={popupVisible} onCancel={() => setPopupVisible(false)} footer={null} centered>
        <p style={{ textAlign: "center", fontSize: "18px" }}>{popupMessage}</p>
      </Modal>
    </div>
  );
};

export default EmployeeOnboarding;
