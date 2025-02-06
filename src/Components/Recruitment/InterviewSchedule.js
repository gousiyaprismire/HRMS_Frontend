import React, { useState } from "react";
import "./Recruitment.css"; // Importing the combined CSS file

function InterviewSchedule() {
  const [interviews, setInterviews] = useState([
    // { candidate: "A", date: "2025-02-10", time: "10:00 AM" }
  ]);

  const [newInterview, setNewInterview] = useState({ candidate: "", date: "", time: "" });


  const handleScheduleInterview = () => {
    if (newInterview.candidate && newInterview.date && newInterview.time) {
      setInterviews([...interviews, newInterview]);
      setNewInterview({ candidate: "", date: "", time: "" }); // Clear the form fields
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="interview-container">
      <h2 className="header">Interview Schedule</h2>
      
      {/* Interview List */}
      <div>
        <ul>
          {interviews.map((int, index) => (
            <li key={index} className="interview-item">
              <span>{int.candidate}</span>  {int.date} at {int.time}
            </li>
          ))}
        </ul>
      </div>

      {/* Interview Schedule Form */}
      <div className="interview-form">
        <input
          type="text"
          placeholder="Candidate Name"
          value={newInterview.candidate}
          onChange={(e) => setNewInterview({ ...newInterview, candidate: e.target.value })}
        />
        <input
          type="date"
          value={newInterview.date}
          onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
        />
        <input
          type="time"
          value={newInterview.time}
          onChange={(e) => setNewInterview({ ...newInterview, time: e.target.value })}
        />
        <button onClick={handleScheduleInterview}>Schedule Interview</button>
      </div>
    </div>
  );
}

export default InterviewSchedule;
