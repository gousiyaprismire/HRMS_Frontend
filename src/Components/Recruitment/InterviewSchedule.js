import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Recruitment.css";

const API_URL = "http://localhost:8080/api/interviews";

const InterviewScheduler = () => {
  const [interviews, setInterviews] = useState([]);
  const [filteredInterviews, setFilteredInterviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingInterviewId, setEditingInterviewId] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    jobPosition: "",
    interviewDate: "",
    interviewer: "",
    mode: "Online",
    status: "Scheduled",
    email: "",
  });

  const [popup, setPopup] = useState({ show: false, id: null, status: "" });

  const jobPositions = [
    "Software Engineer", "Data Analyst", "HR Manager", "Product Manager", "UX/UI Designer",
    "Business Analyst", "Marketing Manager", "Project Manager", "Quality Assurance Engineer",
    "DevOps Engineer", "Front-end Developer", "Back-end Developer", "Full Stack Developer",
    "Sales Manager", "Customer Support Specialist"
  ];

  const statusOptions = ["All", "Scheduled", "Completed", "Cancelled"];

  useEffect(() => {
    fetchInterviews();
  }, []);

  const applyStatusFilter = useCallback(() => {
    if (statusFilter === "All") {
      setFilteredInterviews(interviews);
    } else {
      setFilteredInterviews(interviews.filter(i => i.status === statusFilter));
    }
  }, [interviews, statusFilter]);

  useEffect(() => {
    applyStatusFilter();
  }, [interviews, statusFilter, applyStatusFilter]);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(API_URL);
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDateChange = (e) =>
    setFormData((prev) => ({ ...prev, interviewDate: e.target.value }));

  const handleSchedule = async () => {
    if (!formData.candidateName || !formData.jobPosition || !formData.interviewDate || !formData.interviewer || !formData.email) {
      alert("Please fill all fields!");
      return;
    }

    const formattedDate = new Date(formData.interviewDate).toISOString().slice(0, 19);

    try {
      if (editingInterviewId) {
  
        const response = await axios.put(`${API_URL}/${editingInterviewId}/edit`, {
          ...formData,
          interviewDate: formattedDate,
        });

        setInterviews((prev) =>
          prev.map((int) => (int.id === editingInterviewId ? response.data : int))
        );
      } else {
        
        const response = await axios.post(API_URL, {
          ...formData,
          interviewDate: formattedDate,
        });

        setInterviews([...interviews, response.data]);
      }

      setFormData({
        candidateName: "",
        jobPosition: "",
        interviewDate: "",
        interviewer: "",
        mode: "Online",
        status: "Scheduled",
        email: "",
      });
      setEditingInterviewId(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving interview:", error);
      alert("Error saving interview. Please try again.");
    }
  };

  const editInterview = (interview) => {
    setFormData({
      candidateName: interview.candidateName,
      jobPosition: interview.jobPosition,
      interviewDate: new Date(interview.interviewDate).toISOString().slice(0, 16),
      interviewer: interview.interviewer,
      mode: interview.mode,
      status: interview.status,
      email: interview.email,
    });
    setEditingInterviewId(interview.id);
    setShowForm(true);
  };

  const sendEmail = async (id) => {
    try {
      await axios.post(`${API_URL}/${id}/send-email`);
      alert("Interview email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email.");
    }
  };

  const updateStatus = (id, newStatus) => {
    setPopup({ show: true, id, status: newStatus });
  };

  const confirmStatusUpdate = async () => {
    if (!popup.id) return;

    try {
      await axios.put(`${API_URL}/${popup.id}/status`, { status: popup.status });
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview.id === popup.id ? { ...interview, status: popup.status } : interview
        )
      );
      setPopup({ show: false, id: null, status: "" });
    } catch (error) {
      console.error("Error updating interview status:", error.response ? error.response.data : error);
      alert("Error updating interview status. Please try again.");
    }
  };

  return (
    <div className="interview-scheduler">
      <h2>Interview Scheduler</h2>

      {!showForm && (
        <>
          <button className="add-interview-button" onClick={() => setShowForm(true)}>
            Schedule New Interview
          </button>

          <div className="interview-filter-section">
            <label htmlFor="statusFilter">Filter by Status: </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="interview-select"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {showForm ? (
        <div className="card">
          <h3>{editingInterviewId ? "Edit Interview" : "Schedule New Interview"}</h3>
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            placeholder="Candidate Name"
            className="input"
          />
          <select
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
            className="select"
          >
            <option value="">Select Job Position</option>
            {jobPositions.map((job, index) => (
              <option key={index} value={job}>
                {job}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleDateChange}
            className="input"
          />
          <input
            type="text"
            name="interviewer"
            value={formData.interviewer}
            onChange={handleChange}
            placeholder="Enter Interviewer Name"
            className="input"
          />
          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="select"
          >
            <option value="Online">Online</option>
            <option value="In-Person">In-Person</option>
          </select>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
          <button onClick={handleSchedule} className="button">
            {editingInterviewId ? "Update" : "Schedule"}
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setShowForm(false);
              setEditingInterviewId(null);
              setFormData({
                candidateName: "",
                jobPosition: "",
                interviewDate: "",
                interviewer: "",
                mode: "Online",
                status: "Scheduled",
                email: "",
              });
            }}
          >
            Cancel
          </button>
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
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <tr key={interview.id}>
                    <td>{interview.candidateName}</td>
                    <td>{interview.jobPosition}</td>
                    <td>
                      {interview.interviewDate
                        ? !isNaN(new Date(interview.interviewDate).getTime())
                          ? new Date(interview.interviewDate).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Invalid Date"
                        : "No Date Provided"}
                    </td>
                    <td>{interview.interviewer}</td>
                    <td>{interview.email}</td>
                    <td>
                      <span className={`status-badge status-${interview.status}`}>
                        {interview.status}
                      </span>
                    </td>
                    <td>
                    <button
                                  onClick={() => editInterview(interview)}
                                  className="action-button action-edit"
                                  style={{ backgroundColor: "yellow",color:"black", border: "none", padding: "5px 10px", cursor: "pointer" }}
                                >
                                  Edit
                                </button>

                      <button
                        onClick={() => updateStatus(interview.id, "Cancelled")}
                        className="action-button action-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => updateStatus(interview.id, "Completed")}
                        className="action-button action-complete"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => sendEmail(interview.id)}
                        className="action-button action-email"
                      >
                        Send Email
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No upcoming interviews</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup">
            <p>
              Are you sure you want to mark this interview as{" "}
              {popup.status}?
            </p>
            <button onClick={confirmStatusUpdate}>Confirm</button>
            <button onClick={() => setPopup({ show: false, id: null, status: "" })}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScheduler;
