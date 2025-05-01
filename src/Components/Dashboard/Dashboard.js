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

  const notifications = [
    { id: 1, title: "📝 New leave request from A" },
    { id: 2, title: "💰 Payroll processing due in 2 days" },
    { id: 3, title: "📅 Interview scheduled with B" },
  ];

  const announcements = [
    { id: 1, title: "📜 New Leave Policy Update: Effective from March 1st" },
    { id: 2, title: "🎊 Annual Company Meetup on March 15th!" },
    { id: 3, title: "💡 HR Reminder: Performance Reviews Due by Feb 28" },
  ];

  const birthdays = [
    { id: 1, name: "A", date: "Feb 20" },
    { id: 2, name: "B", date: "Feb 25" },
  ];

  const deskTime = {
    avgHours: 6.5,
    maxHours: 9,
    minHours: 4,
  };

  const [attendanceData, setAttendanceData] = useState({ present: 0, absent: 0 });
  const [activeTime, setActiveTime] = useState(0);
  const [blurTime, setBlurTime] = useState(0);
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
      if (idle) {
        setBlurTime((prev) => prev + 1);
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-activity-summary">
        <p className="dashboard-activity-time">
          💻 Active Time: {(activeTime / 60).toFixed(1)} minutes
        </p>
        <p className="dashboard-activity-time">
          🕶️ Blur Time: {(blurTime / 60).toFixed(1)} minutes
        </p>
        <p className="dashboard-activity-status">
          Status: {isActive ? "🟢 Active" : "🔴 Inactive"}
        </p>
      </div>

      <div className="dashboard-employee-overview">
        {[
          { label: "👥 Total Employees", value: stats.employees, color: "dashboard-bg-blue" },
          { label: "✅ Active Employees", value: stats.active, color: "dashboard-bg-green" },
          { label: "🌴 On Leave", value: stats.onLeave, color: "dashboard-bg-yellow" },
          { label: "💵 Payroll Processed", value: stats.payroll.processed, color: "dashboard-bg-purple" },
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
          <h2 className="dashboard-chart-title">📈 Recruitment Status</h2>
          <div className="dashboard-recruitment-tracker">
            {[
              { label: "🛠️ Open Jobs", value: stats.recruitment.openJobs, max: 10, color: "blue" },
              { label: "📋 Applicants", value: stats.recruitment.applicants, max: 50, color: "green" },
              { label: "🎤 Interviews", value: stats.recruitment.interviews, max: 20, color: "purple" },
            ].map((stage, index) => (
              <div key={index} className="dashboard-recruitment-stage">
                <p className="dashboard-recruitment-label">{stage.label}: {stage.value}</p>
                <div className="dashboard-recruitment-bar">
                  <div
                    className={`dashboard-recruitment-fill ${stage.color}`}
                    style={{ width: `${(stage.value / stage.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-flex-section">
        <div className="dashboard-birthday-section">
          <h2 className="dashboard-section-title">🎉 🎂 Upcoming Birthdays</h2>
          <ul className="dashboard-birthday-list">
            {birthdays.map((person) => (
              <li key={person.id} className="dashboard-birthday-item">
                🎈 {person.name} - {person.date}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-desk-time">
          <h2 className="dashboard-section-title">⌛ Desk Time Summary</h2>
          <p>🕒 Avg Desk Time: {deskTime.avgHours} hrs</p>
          <p>🔝 Max Desk Time: {deskTime.maxHours} hrs</p>
          <p>🔻 Min Desk Time: {deskTime.minHours} hrs</p>
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
          <h2 className="dashboard-section-title">🔔 Recent Notifications</h2>
          <ul className="dashboard-list">
            {notifications.map((note) => (
              <li key={note.id} className="dashboard-list-item">
                {note.title}
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
