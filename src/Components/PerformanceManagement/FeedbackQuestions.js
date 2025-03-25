import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackQuestions.css";

const FeedbackQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch all questions when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/feedback-questions")
      .then((response) => {
        console.log("Fetched Questions:", response.data);
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      if (editingId !== null) {
        // Update existing question
        axios
          .put(`http://localhost:8080/api/feedback-questions/${editingId}`, {
            text: newQuestion,  // Make sure to send 'text', not 'question'
          })
          .then((response) => {
            console.log("Updated Question:", response.data);
            setQuestions(
              questions.map((q) =>
                q.id === editingId ? { ...q, text: newQuestion } : q
              )
            );
            setEditingId(null);
            setNewQuestion("");
          })
          .catch((error) => console.error("Error updating question:", error));
      } else {
        // Add new question
        axios
          .post("http://localhost:8080/api/feedback-questions", {
            text: newQuestion,  // Ensure you are sending 'text' and not 'question'
          })
          .then((response) => {
            console.log("Question Added:", response.data);
            setQuestions((prevQuestions) => [
              ...prevQuestions,
              response.data,
            ]);
            setNewQuestion(""); // Clear input after adding
          })
          .catch((error) => console.error("Error adding question:", error));
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
        setQuestions(questions.filter((q) => q.id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
      })
      .catch((error) => console.error("Error deleting question:", error));
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
