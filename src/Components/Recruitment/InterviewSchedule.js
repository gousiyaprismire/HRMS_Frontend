import { useState } from "react";
import "./Recruitment.css"; 

const InterviewScheduler = () => {
  const initialInterviews = [
    { id: 1, candidate: "J", job: "Software Engineer", dateTime: "2025-02-25T10:00", interviewer: "Keerthi", mode: "Online", status: "scheduled" },
    { id: 2, candidate: "E", job: "Data Analyst", dateTime: "2025-02-26T14:30", interviewer: "Priya", mode: "In-Person", status: "rescheduled" },
    { id: 3, candidate: "M", job: "HR Manager", dateTime: "2025-02-27T09:15", interviewer: "Zara", mode: "Online", status: "completed" },
  ];

  const [interviews, setInterviews] = useState(initialInterviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ candidate: "", job: "", dateTime: "", interviewer: "", mode: "Online" });

  const jobPositions = ["Software Engineer", "Data Analyst", "HR Manager"];
  const interviewers = ["Keerthi", "Priya", "Zara"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSchedule = () => {
    if (!formData.candidate || !formData.job || !formData.dateTime || !formData.interviewer) {
      alert("Please fill all fields!");
      return;
    }

    const newInterview = { id: interviews.length + 1, ...formData, status: "scheduled" };
    setInterviews([...interviews, newInterview]);
    setFormData({ candidate: "", job: "", dateTime: "", interviewer: "", mode: "Online" });
    setShowForm(false);
  };

  const updateStatus = (id, newStatus) => {
    setInterviews(interviews.map((interview) => (interview.id === id ? { ...interview, status: newStatus } : interview)));
  };

  return (
    <div className="interview-scheduler">
      <h2>Interview Scheduler</h2>
      
      <button className="add-interview-button" onClick={() => setShowForm(true)}>Schedule New Interview</button>
      
      {showForm && (
        <div className="card">
          <h3>Schedule New Interview</h3>
          <input type="text" name="candidate" value={formData.candidate} onChange={handleChange} placeholder="Candidate Name" className="input" />
          <select name="job" value={formData.job} onChange={handleChange} className="select">
            <option value="">Select Job Position</option>
            {jobPositions.map((job, index) => (<option key={index} value={job}>{job}</option>))}
          </select>
          <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="input" />
          <select name="interviewer" value={formData.interviewer} onChange={handleChange} className="select">
            <option value="">Select Interviewer</option>
            {interviewers.map((interviewer, index) => (<option key={index} value={interviewer}>{interviewer}</option>))}
          </select>
          <select name="mode" value={formData.mode} onChange={handleChange} className="select">
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
          </select>
          <button onClick={handleSchedule} className="button">Schedule</button>
          <button className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div className="upcoming-interviews">
        <h2>Upcoming Interviews</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job Position</th>
              <th>Date & Time</th>
              <th>Interviewer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.length > 0 ? (
              interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.candidate}</td>
                  <td>{interview.job}</td>
                  <td>{interview.dateTime.replace("T", " ")}</td>
                  <td>{interview.interviewer}</td>
                  <td><span className={`status-badge status-${interview.status}`}>{interview.status}</span></td>
                  <td>
                    <button onClick={() => updateStatus(interview.id, "rescheduled")} className="action-button action-reschedule">Reschedule</button>
                    <button onClick={() => updateStatus(interview.id, "canceled")} className="action-button action-cancel">Cancel</button>
                    <button onClick={() => updateStatus(interview.id, "completed")} className="action-button action-complete">Mark as Completed</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No upcoming interviews</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewScheduler;