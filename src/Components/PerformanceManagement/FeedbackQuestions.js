import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackQuestions.css";

const FeedbackQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/feedback-questions")
      .then((response) => {
        console.log("✅ Full API Response:", response);
        if (response.data && Array.isArray(response.data)) {
          setQuestions(response.data);
          console.log("📌 Setting Questions:", response.data);
        } else {
          console.error("❌ Unexpected API Response Format:", response.data);
        }
      })
      .catch((error) => {
        console.error("❌ API Fetch Error:", error.response ? error.response.data : error.message);
      });
  }, []);

  const handleChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      if (editingId !== null) {
      
        axios
          .put(`http://localhost:8080/api/feedback-questions/${editingId}`, {
            text: newQuestion,
          })
          .then((response) => {
            console.log("✅ Updated Question:", response.data);
            setQuestions((prevQuestions) =>
              prevQuestions.map((q) =>
                q.id === editingId ? response.data : q
              )
            );
            setEditingId(null);
            setNewQuestion("");
          })
          .catch((error) =>
            console.error("❌ Error updating question:", error.response?.data || error.message)
          );
      } else {
   
        axios
          .post("http://localhost:8080/api/feedback-questions", {
            text: newQuestion,
          })
          .then((response) => {
            console.log("✅ Question Added:", response.data);
            setQuestions((prevQuestions) => {
              console.log("📌 Updated Questions State:", [...prevQuestions, response.data]);
              return [...prevQuestions, response.data];
            });
            setNewQuestion(""); 
          })
          .catch((error) =>
            console.error("❌ Error adding question:", error.response?.data || error.message)
          );
      }
    }
  };

  const handleEdit = (question) => {
    setEditingId(question.id);
    setNewQuestion(question.text);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/feedback-questions/${deleteId}`)
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
      })
      .catch((error) => console.error("❌ Error deleting question:", error));
  };

  return (
    <div className="feedback-questions-container">
      <h2>360° Feedback Questions</h2>
      <p>Manage feedback questions for employee performance evaluation.</p>

      <form onSubmit={handleSubmit} className="question-form">
        <input
          type="text"
          placeholder="Enter feedback question"
          value={newQuestion}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update Question" : "Add Question"}</button>
      </form>

      <table className="feedback-questions-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.text}</td>
                <td>
                  <button
                    className="feedback-questions-edit-btn"
                    onClick={() => handleEdit(question)}
                  >
                    Edit
                  </button>
                  <button
                    className="feedback-questions-delete-btn"
                    onClick={() => confirmDelete(question.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No questions available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="feedback-questions-modal-overlay">
          <div className="feedback-questions-modal-box">
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this feedback question? This action cannot be undone.</p>
            <div className="feedback-questions-modal-buttons">
              <button onClick={handleDelete} className="feedback-questions-confirm-delete">
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="feedback-questions-cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackQuestions;
