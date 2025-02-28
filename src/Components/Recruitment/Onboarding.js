import { useState } from "react";
import { Modal } from "antd";  
import "./Recruitment.css";

const EmployeeOnboarding = () => {
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "J",
      email: "K.P@example.com",
      phone: "9876543210",
      role: "Software Engineer",
      department: "IT",
      joiningDate: "2025-03-01",
      manager: "Keerthi",
      location: "Remote",
      status: "Pending",
      hrContact: "S",
    },
    {
      id: "EMP002",
      name: "E",
      email: "e.w@example.com",
      phone: "9123456789",
      role: "HR Manager",
      department: "HR",
      joiningDate: "2025-03-05",
      manager: "Priya",
      location: "On-site",
      status: "In Progress",
      hrContact: "D",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    joiningDate: "",
    manager: "",
    location: "Remote",
    documents: null,
  });

  const [showForm, setShowForm] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const jobRoles = ["Software Engineer", "Data Analyst", "HR Manager"];
  const departments = ["IT", "HR", "Finance"];
  const managers = ["Keerthi", "Priya", "Purple"];
  const workLocations = ["Remote", "On-site", "Hybrid"];


<select>
  {workLocations.map((location, index) => (
    <option key={index} value={location}>{location}</option>
  ))}
</select>

  const generateEmployeeID = () => {
    return `EMP${String(employees.length + 1).padStart(3, "0")}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files });
  };


  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupVisible(true);
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.department ||
      !formData.joiningDate ||
      !formData.manager
    ) {
      showPopup("Please fill all required fields!"); 
      return;
    }

    const newEmployee = {
      id: generateEmployeeID(),
      ...formData,
      status: "Pending",
      hrContact: "Unassigned",
    };

    setEmployees([...employees, newEmployee]);
    showPopup("Employee added successfully!"); 

    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      joiningDate: "",
      manager: "",
      location: "Remote",
      documents: null,
    });
    setShowForm(false);
  };

  const updateStatus = (id, newStatus) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
    showPopup(`Status updated to "${newStatus}"`); 
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    showPopup("Employee removed successfully!"); 
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
                  <th>HR Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.role}</td>
                      <td>{emp.joiningDate}</td>
                      <td>
                        <span className={`status-badge status-${emp.status.toLowerCase()}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td>{emp.hrContact}</td>
                      <td>
                        <button onClick={() => updateStatus(emp.id, "In Progress")} className="action-button action-progress">In Progress</button>
                        <button onClick={() => updateStatus(emp.id, "Completed")} className="action-button action-complete">Complete</button>
                        <button onClick={() => removeEmployee(emp.id)} className="action-button action-remove">Remove</button>
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
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="input" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="input" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input" required />

            <select name="role" value={formData.role} onChange={handleChange} className="select" required>
              <option value="">Select Job Role</option>
              {jobRoles.map((role, index) => <option key={index} value={role}>{role}</option>)}
            </select>

            <select name="department" value={formData.department} onChange={handleChange} className="select" required>
              <option value="">Select Department</option>
              {departments.map((dept, index) => <option key={index} value={dept}>{dept}</option>)}
            </select>

            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} className="input" required />

            <select name="manager" value={formData.manager} onChange={handleChange} className="select" required>
              <option value="">Select Reporting Manager</option>
              {managers.map((mgr, index) => <option key={index} value={mgr}>{mgr}</option>)}
            </select>

            <input type="file" multiple onChange={handleFileChange} className="input-file" />
          </div>

          <div className="button-container">
            <button onClick={handleSubmit} className="button">Add Employee</button>
            <button className="cancel-button" onClick={() => setShowForm(false)}>Back</button>
          </div>
        </div>
      )}

      {/* Centered Popup */}
      <Modal visible={popupVisible} onCancel={() => setPopupVisible(false)} footer={null} centered>
        <p style={{ textAlign: "center", fontSize: "18px" }}>{popupMessage}</p>
      </Modal>
    </div>
  );
};

export default EmployeeOnboarding;
