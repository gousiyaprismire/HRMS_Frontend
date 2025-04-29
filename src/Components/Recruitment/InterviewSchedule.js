import { useState, useEffect } from "react";
import axios from "axios";
import "./Recruitment.css";

const API_URL = "http://localhost:8080/api/interviews"; 

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    jobPosition: "",
    interviewDate: "",
    interviewer: "",
    mode: "Online",
    status: "Scheduled", 
  });

  const [popup, setPopup] = useState({ show: false, id: null, status: "" });

  const jobPositions = ["Software Engineer", "Data Analyst", "HR Manager"];
  // const interviewers = ["Keerthi", "Priya", "Zara"];

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(API_URL);
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      interviewDate: e.target.value, 
    }));
  };
  

  const handleSchedule = async () => {
    if (!formData.candidateName || !formData.jobPosition || !formData.interviewDate || !formData.interviewer) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post(API_URL, formData);
      setInterviews([...interviews, response.data]);
      setFormData({
        candidateName: "",
        jobPosition: "",
        interviewDate: "",
        interviewer: "",
        mode: "Online",
        status: "Scheduled",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
  };

  const updateStatus = (id, newStatus) => {
    console.log("Updating popup state:", id, newStatus); 
  
    setPopup({ show: true, id, status: newStatus });
  };
  

  const confirmStatusUpdate = async () => {
    if (!popup.id) return;
  
    console.log("Attempting to update status for ID:", popup.id, "New Status:", popup.status);
  
    try {
      const response = await axios.put(`${API_URL}/${popup.id}`, { status: popup.status });
  
      console.log("Response from server:", response.data); 
  
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview.id === popup.id ? { ...interview, status: popup.status } : interview
        )
      );
  
      setPopup({ show: false, id: null, status: "" }); 
    } catch (error) {
      console.error("Error updating interview status:", error.response ? error.response.data : error);
    }
  };
  

  return (
    <div className="interview-scheduler">
      <h2>Interview Scheduler</h2>

      {!showForm && (
        <button className="add-interview-button" onClick={() => setShowForm(true)}>
          Schedule New Interview
        </button>
      )}

      {showForm ? (
        <div className="card">
          <h3>Schedule New Interview</h3>
          <input type="text" name="candidateName" value={formData.candidateName} onChange={handleChange} placeholder="Candidate Name" className="input" />
          <select name="jobPosition" value={formData.jobPosition} onChange={handleChange} className="select">
            <option value="">Select Job Position</option>
            {jobPositions.map((job, index) => (<option key={index} value={job}>{job}</option>))}
          </select>
          
          
          <input type="datetime-local" name="interviewDate" onChange={handleDateChange} className="input" required />

          <input
  type="text"
  name="interviewer"
  value={formData.interviewer}
  onChange={handleChange}
  placeholder="Enter Interviewer Name"
  className="input"
/>


          
          <select name="mode" value={formData.mode} onChange={handleChange} className="select">
            <option value="Online">Online</option>
            <option value="In_Person">In-Person</option> 
          </select>

          <button onClick={handleSchedule} className="button">Schedule</button>
          <button className="cancel-button" onClick={() => setShowForm(false)}>Back</button>
        </div>
      ) : (
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
                    <td>{interview.candidateName}</td>
                    <td>{interview.jobPosition}</td>
                    <td>{interview.interviewDate.replace("T", " ")}</td>
                    <td>{interview.interviewer}</td>
                    <td><span className={`status-badge status-${interview.status}`}>{interview.status}</span></td>
                    <td>

                      <button onClick={() => updateStatus(interview.id, "Scheduled")} className="action-button action-reschedule">Reschedule</button>
                      <button onClick={() => updateStatus(interview.id, "Cancelled")} className="action-button action-cancel">Cancel</button>
                      <button onClick={() => updateStatus(interview.id, "Completed")} className="action-button action-complete">Mark as Completed</button>
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
      )}

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Confirm Action</h3>
            <p>Are you sure you want to mark this interview as <strong>{popup.status}</strong>?</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={confirmStatusUpdate}>Yes</button>
              <button className="cancel-btn" onClick={() => setPopup({ show: false, id: null, status: "" })}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;
