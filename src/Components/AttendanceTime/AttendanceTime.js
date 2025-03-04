import React from "react";
import { Link } from "react-router-dom";
import "./AttendanceTime.css";

function AttendanceTime() {
  return (
    <div className="attendanceTime-dashboard">
      <h1 className="attendanceTime-header">Attendance & Time Management</h1>

      <nav className="attendanceTime-nav">
        <ul>
          <li>
            <Link to="/attendance-tracking">
              <button className="attendanceTime-button">Employee Attendance Tracking</button>
            </Link>
          </li>
          <li>
            <Link to="/leave-application">
              <button className="attendanceTime-button">Leave Application</button>
            </Link>
          </li>
          <li>
            <Link to="/leave-approval">
              <button className="attendanceTime-button">Leave Approval Panel</button>
            </Link>
          </li>
          <li>
            <Link to="/timesheet">
              <button className="attendanceTime-button">Timesheet Management</button>
            </Link>
          </li>
          <li>
            <Link to="/holiday">
              <button className="attendanceTime-button">Holiday & Leave Policies</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AttendanceTime;
