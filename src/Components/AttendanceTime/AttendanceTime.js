import React, { useState } from "react";
import EmployeeAttendance from "./EmployeeAttendanceTracking";
import LeaveApplication from "./LeaveApplication";
import LeaveApprovalPanel from "./LeaveApprovalPanel";
import TimesheetManagement from "./TimesheetManagement";
import Holiday from "./Holiday";
import "./AttendanceTime.css";


function Dashboard({ setActivePage }) {
  return (
    <div className="dashboard">
      <h1>Attendance & Time</h1>
      <nav>
        <ul>
          <li><button onClick={() => setActivePage("attendance")}>Employee Attendance Tracking</button></li>
          <li><button onClick={() => setActivePage("leave")}>Leave Application</button></li>
          <li><button onClick={() => setActivePage("approval")}>Leave Approval Panel</button></li>
          <li><button onClick={() => setActivePage("timesheet")}>Timesheet Management</button></li>
          <li><button onClick={() => setActivePage("holidays")}>Holiday & Leave Policies</button></li>
        </ul>
      </nav>
    </div>
  );
}

const Attendance = () => <div className="page"><h2>Employee Attendance Tracking</h2></div>;
const Leave = () => <div className="page"><h2>Leave Application</h2></div>;
const Approval = () => <div className="page"><h2>Leave Approval Panel</h2></div>;
const Timesheet = () => <div className="page"><h2>Timesheet Management</h2></div>;
const Holidays = () => <div className="page"><h2>Holiday & Leave Policies</h2></div>;

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  let content;
  switch (activePage) {
    case "attendance":
      content = <Attendance />;
      break;
    case "leave":
      content = <Leave />;
      break;
    case "approval":
      content = <Approval />;
      break;
    case "timesheet":
      content = <Timesheet />;
      break;
    case "holidays":
      content = <Holidays />;
      break;
    default:
      content = <Dashboard setActivePage={setActivePage} />;
  }

  return <div>{content}</div>;
}

export default App;
