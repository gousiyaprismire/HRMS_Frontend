import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./AttendanceTime.css"; // External CSS file


function AttendanceTime() {
  return (
    <div className="dashboard">
      <h1>Attendance & Time Management</h1>
      <nav>
        <ul>
          <li><Link to="/attendance-tracking"><button>Employee Attendance Tracking</button></Link></li>
          <li><Link to="/leave-application"><button>Leave Application</button></Link></li>
          <li><Link to="/leave-approval"><button>Leave Approval Panel</button></Link></li>
          <li><Link to="/timesheet"><button>Timesheet Management</button></Link></li>
          <li><Link to="/holiday"><button>Holiday & Leave Policies</button></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default AttendanceTime;
