import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';
import pieChart from '../../images/Pie-chart.png';
import barChart from '../../images/Bar-chart.png';
import lineChart from '../../images/Line-chart.png';

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('employeeData');
    if (saved) setEmployeeData(JSON.parse(saved));
  }, []);

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedData = { ...employeeData, profilePic: reader.result };
        setEmployeeData(updatedData);
        localStorage.setItem('employeeData', JSON.stringify(updatedData));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="employee-dashboard-container">
      <div className="employee-dashboard-header">
        <div className="employee-dashboard-profile">
          <div className="employee-dashboard-profile-pic" onClick={handleProfileClick}>
            {employeeData?.profilePic ? (
              <img src={employeeData.profilePic} alt="Profile" className="employee-profile-img" />
            ) : (
              'Profile'
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <div className="employee-dashboard-profile-info">
            <h3>{employeeData?.name || 'User Name'}</h3>
            <p>{employeeData?.empId || 'A103 - Active Employee'}</p>
          </div>
          <div className="employee-dashboard-profile-info-text">
            <p>Joining Date: 1-1-2025</p>
            <p>Total Job Experience: 1</p>
            <p>Contact Number : +919876543210</p>
            <p>{employeeData?.designation || 'Executive, Software Developer'}</p>
          </div>
        </div>
        <div className="employee-dashboard-title">
          <h2>Employee Dashboard</h2>
          <button onClick={() => navigate('/create-profile')}>Create Profile</button>
        </div>
      </div>

      {/* ...rest of cards remain unchanged... */}
      <div className="employee-dashboard-cards">
        <div className="employee-dashboard-card">
          <h4>Employee Details</h4>
          <p><strong>DOB:</strong> {employeeData?.dob || '--'}</p>
          <p><strong>Gender:</strong> {employeeData?.gender || '--'}</p>
          <p><strong>Marital Status:</strong> {employeeData?.maritalStatus || '--'}</p>
          <p><strong>Nationality:</strong> {employeeData?.nationality || '--'}</p>
          <p><strong>Email:</strong> {employeeData?.email || '--'}</p>
        </div>

        <div className="employee-dashboard-card">
          <h4>Job Details</h4>
          <p><strong>Type:</strong> {employeeData?.type || '--'}</p>
          <p><strong>Designation:</strong> {employeeData?.designation || '--'}</p>
          <p><strong>Service Age:</strong> {employeeData?.serviceAge || '--'}</p>
          <p><strong>Reporting Boss:</strong> {employeeData?.boss || '--'}</p>
          <p><strong>Department:</strong> {employeeData?.department || '--'}</p>
        </div>

        <div className="employee-dashboard-card">
          <h4>Salary & Increments</h4>
          <p><strong>Current Salary:</strong> {employeeData?.currentSalary || '--'}</p>
          <p><strong>Joining Salary:</strong> {employeeData?.joiningSalary || '--'}</p>
          <p><strong>Last Increment:</strong> {employeeData?.lastIncrement || '--'}</p>
          <p><strong>Avg. Salary:</strong> {employeeData?.avgSalary || '--'}</p>
          <p><strong>Max Salary:</strong> {employeeData?.maxSalary || '--'}</p>
        </div>

        <div className="employee-dashboard-card">
          <h4>Education & Training</h4>
          <p><strong>Highest Ed.:</strong> {employeeData?.education || '--'}</p>
          <p><strong>Certification 1:</strong> {employeeData?.cert1 || '--'}</p>
          <p><strong>Certification 2:</strong> {employeeData?.cert2 || '--'}</p>
        </div>
      </div>

      <div className="employee-dashboard-charts">
        <div className="employee-dashboard-chart-card">
          <h4>Gender Distribution</h4>
          <img src={pieChart} alt="Pie Chart" />
        </div>
        <div className="employee-dashboard-chart-card">
          <h4>Manpower by Department</h4>
          <img src={barChart} alt="Bar Chart" />
        </div>
        <div className="employee-dashboard-chart-card">
          <h4>Join by Year</h4>
          <img src={lineChart} alt="Line Chart" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
