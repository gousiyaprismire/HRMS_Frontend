"use client";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const stats = {
    employees: 120,
    active: 110,
    onLeave: 10,
    attendance: { present: 95, absent: 15 },
    payroll: { processed: "$120K", pending: "$30K" },
    recruitment: { openJobs: 5, applicants: 30, interviews: 8 },
  };

  const announcements = [
    { id: 1, title: "📜 New Leave Policy Update: Effective from March 1st" },
    { id: 2, title: "🎊 Annual Company Meetup on March 15th!" },
    { id: 3, title: "💡 HR Reminder: Performance Reviews Due by Feb 28" },
  ];

const deskTimeData = [
  {
    id: 1,
    employeeName: "A",
    checkIn: "9:00 AM",
    checkOut: "5:00 PM",
    totalHours: 8,
  },
  {
    id: 2,
    employeeName: "B",
    checkIn: "9:30 AM",
    checkOut: "6:00 PM",
    totalHours: 8.5,
  },
];


  const projectDeadlines = [
    { id: 1, project: "Website Redesign", deadline: "May 22" },
    { id: 2, project: "Mobile App Launch", deadline: "June 5" },
    { id: 3, project: "Q2 Marketing Campaign", deadline: "June 15" },
  ];

  const teamHighlights = [
    { id: 1, highlight: "Engineering team completed sprint ahead of schedule." },
    { id: 2, highlight: "HR successfully onboarded 10 new employees." },
    { id: 3, highlight: "Sales exceeded monthly targets by 15%." },
  ];

  const [attendanceData, setAttendanceData] = useState({ present: 0, absent: 0 });
  const [activeTime, setActiveTime] = useState(0);
 const [blurTime, setBlurTime] = useState(0);
   const [idleTime, setIdleTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
useEffect(() => {
    let lastActivity = Date.now();
 
    const handleActivity = () => {
      lastActivity = Date.now();
      setIsActive(true);
    };
 
    const interval = setInterval(() => {
      const now = Date.now();
      const idle = now - lastActivity > 60000;
 
      setIsActive(!idle);
 
      if (document.hidden) {
        setBlurTime((prev) => prev + 1);
      } else if (idle) {
        setIdleTime((prev) => prev + 1);
      } else {
        setActiveTime((prev) => prev + 1);
      }
    }, 1000);
 
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
 
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);
 
  useEffect(() => {
    setTimeout(() => {
      setAttendanceData({ present: stats.attendance.present, absent: stats.attendance.absent });
    }, 500);
  }, [stats.attendance.present, stats.attendance.absent]);
 
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("activeTimeDate");
    const storedTime = localStorage.getItem("activeTime");

    if (storedDate !== today) {
      localStorage.setItem("activeTime", "0");
      localStorage.setItem("activeTimeDate", today);
      setActiveTime(0);
    } else if (storedTime) {
      setActiveTime(Number(storedTime));
    }

    let lastActivity = Date.now();

    const handleActivity = () => {
      lastActivity = Date.now();
      setIsActive(true);
    };

    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      if (currentHour >= 9 && currentHour < 18) {
        if (Date.now() - lastActivity > 60000) {
          setIsActive(false);
        } else {
          setActiveTime((prev) => {
            const updated = prev + 1;
            localStorage.setItem("activeTime", updated.toString());
            return updated;
          });
        }
      } else {
        setIsActive(false);
      }
    }, 1000);

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAttendanceData({
        present: stats.attendance.present,
        absent: stats.attendance.absent,
      });
    }, 500);
  }, [stats.attendance.present, stats.attendance.absent]);

  return (
    <div className="dashboard-container">

      <div className="dashboard-activity-summary">
        <p className="dashboard-activity-time">💻 Active Time: {(activeTime / 60).toFixed(1)} minutes</p>
        <p className="dashboard-activity-time">🕶️ Blur Time: {(blurTime / 60).toFixed(1)} minutes</p>
        <p className="dashboard-activity-time">💤 Idle Time: {(idleTime / 60).toFixed(1)} minutes</p>
        <p className="dashboard-activity-status">
          Status: {isActive ? "🟢 Active" : "🔴 Inactive"}
        </p>
      </div>

      <div className="dashboard-employee-overview">
        {[{ label: "👥 Total Employees", value: stats.employees, color: "dashboard-bg-blue" },
        { label: "✅ Active Employees", value: stats.active, color: "dashboard-bg-green" },
        { label: "🌴 On Leave", value: stats.onLeave, color: "dashboard-bg-yellow" },
        { label: "💵 Payroll Processed", value: stats.payroll.processed, color: "dashboard-bg-purple" }
        ].map((item, index) => (
          <div key={index} className={`dashboard-stat-card ${item.color}`}>
            <p className="dashboard-stat-label">{item.label}</p>
            <p className="dashboard-stat-value">{item.value}</p>
          </div>
        ))}
      </div>

    
      <div className="dashboard-charts-section">
       
        <div className="dashboard-chart-card">
          <h2 className="dashboard-chart-title">📊 Attendance Summary</h2>
          <div className="dashboard-attendance-donut">
            <svg width="150" height="150" viewBox="0 0 36 36" className="dashboard-donut-chart">
              <circle cx="18" cy="18" r="15.9155" className="dashboard-donut-bg" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                className="dashboard-donut-segment present"
                strokeDasharray={`${attendanceData.present} ${100 - attendanceData.present}`}
              />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                className="dashboard-donut-segment absent"
                strokeDasharray={`${attendanceData.absent} ${100 - attendanceData.absent}`}
                transform="rotate(-90 18 18)"
              />
              <text x="18" y="15" className="dashboard-donut-text present-text" textAnchor="middle">
                ✅ {attendanceData.present}%
              </text>
              <text x="18" y="21" className="dashboard-donut-text absent-text" textAnchor="middle">
                ❌ {attendanceData.absent}%
              </text>
            </svg>
            <div className="dashboard-donut-legend">
              <span className="present">✅ Present</span>
              <span className="absent">❌ Absent</span>
            </div>
          </div>
        </div>

       
        <div className="dashboard-chart-card">
          <h2 className="dashboard-chart-title">📊 Team Performance Summary</h2>
          <div className="dashboard-performance-summary">
            {[
              { name: "Engineering", score: 87, color: "#4caf50" },
              { name: "HR", score: 78, color: "#2196f3" },
              { name: "Marketing", score: 65, color: "#ff9800" },
              { name: "Sales", score: 72, color: "#9c27b0" },
            ].map((team, idx) => (
              <div key={idx} className="dashboard-performance-item">
                <p className="dashboard-performance-label">{team.name} Team</p>
                <div className="dashboard-performance-bar-container">
                  <div
                    className="dashboard-performance-bar"
                    style={{ width: `${team.score}%`, backgroundColor: team.color }}
                  />
                </div>
                <p className="dashboard-performance-score">{team.score}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

  
    <div className="dashboard-flex-section">
  <div className="dashboard-desktime-section">
    <h2 className="dashboard-section-title">🖥️ Desk Time</h2>
    <table className="dashboard-desktime-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        {deskTimeData.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.employeeName}</td>
            <td>{entry.checkIn}</td>
            <td>{entry.checkOut}</td>
            <td>{entry.totalHours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="dashboard-project-deadlines">
    <h2 className="dashboard-section-title">📅 Upcoming Project Deadlines</h2>
    <ul className="dashboard-project-list">
      {projectDeadlines.map((item) => (
        <li key={item.id} className="dashboard-project-item">
          🚩 {item.project} - Due by {item.deadline}
        </li>
      ))}
    </ul>
  </div>
</div>



     
      <div className="dashboard-quick-actions">
        <h2 className="dashboard-section-title">⚡ Quick Actions</h2>
        <div className="dashboard-actions-grid">
          <button
            className="dashboard-action-button blue"
            onClick={() => (window.location.href = "/employee-management")}
          >
            ➕ Add New Employee
          </button>
          <button
            className="dashboard-action-button gray"
            onClick={() => (window.location.href = "/recruitment/applicant-management")}
          >
            ✅ Recruitment
          </button>
          <button
            className="dashboard-action-button green"
            onClick={() => (window.location.href = "/payroll-processing")}
          >
            💰 Process Payroll
          </button>
        </div>
      </div>

      
      <div className="dashboard-flex-row">
        <div className="dashboard-section-container">
          <h2 className="dashboard-section-title">🏆 Team Highlights</h2>
          <ul className="dashboard-list">
            {teamHighlights.map((highlight) => (
              <li key={highlight.id} className="dashboard-list-item">
                🌟 {highlight.highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section-container">
          <h2 className="dashboard-section-title">📢 Announcements & HR Updates</h2>
          <ul className="dashboard-list">
            {announcements.map((update) => (
              <li key={update.id} className="dashboard-list-item">
                {update.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
