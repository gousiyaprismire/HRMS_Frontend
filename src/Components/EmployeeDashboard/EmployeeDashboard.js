import React from 'react';
import './EmployeeDashboard.css';
import pieChart from '../../images/Pie-chart.png';
import barChart from '../../images/Bar-chart.png';
import lineChart from '../../images/Line-chart.png';

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard-container">
      <div className="employee-dashboard-header">
        <div className="employee-dashboard-profile">
          <div className="employee-dashboard-profile-pic">Profile</div>
          <div className="employee-dashboard-profile-info">
            <h3>User Name</h3>
            <p>A103 - Active Employee</p>
          </div>
          <div className="employee-dashboard-profile-info-text">
          <p>Joining Date: 1-1-2025</p>
            <p>Total Job Experience: 1</p>
            <p>Contact Number : +919876543210</p>
            <p>Executive, Software Developer</p>
          </div>
        </div>
        <div className="employee-dashboard-title">
          <h2>Employee Dashboard</h2>
        </div>
      </div>

      <div className="employee-dashboard-cards">
        <div className="employee-dashboard-card">
          <h4>Employee Details</h4>
          <p><strong>DOB:</strong> 1-Jan-2025</p>
          <p><strong>Gender:</strong> Female</p>
          <p><strong>Marital Status:</strong> Un Married</p>
          <p><strong>Nationality:</strong> India</p>
          <p><strong>Email:</strong> prismire@gmail.com</p>
        </div>

        <div className="employee-dashboard-card">
          <h4>Job Details</h4>
          <p><strong>Type:</strong> Permanent</p>
          <p><strong>Designation:</strong> Executive</p>
          <p><strong>Service Age:</strong> 18.6 Years</p>
          <p><strong>Reporting Boss:</strong> Name</p>
          <p><strong>Department:</strong> Production</p>
        </div>

        <div className="employee-dashboard-card">
          <h4>Salary & Increments</h4>
          <p><strong>Current Salary:</strong> 00,000</p>
          <p><strong>Joining Salary:</strong> 00,000</p>
          <p><strong>Last Increment:</strong> 0,000</p>
          <p><strong>Avg. Salary:</strong> 00,000</p>
          <p><strong>Max Salary:</strong> 00,000</p>
        </div>

        <div className="employee-dashboard-card">
          <h4>Education & Training</h4>
          <p><strong>Highest Ed.:</strong> BSc in Information</p>
          <p><strong>Certification 1:</strong> Creating benchmarks</p>
          <p><strong>Certification 2:</strong> Evaluating team members</p>
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
