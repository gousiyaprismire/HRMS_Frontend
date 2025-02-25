import React, { useState } from "react";
import "./FeedbackQuestions.css";

const FeedbackQuestions = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "How well does the employee communicate with colleagues?" },
    { id: 2, text: "How effectively does the employee handle conflicts?" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      if (editingId !== null) {
        setQuestions(
          questions.map((q) =>
            q.id === editingId ? { ...q, text: newQuestion } : q
          )
        );
        setEditingId(null);
      } else {
        setQuestions([...questions, { id: questions.length + 1, text: newQuestion }]);
      }
      setNewQuestion("");
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
    setQuestions(questions.filter((q) => q.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
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
          {questions.map((question, index) => (
            <tr key={question.id}>
              <td>{index + 1}</td>
              <td>{question.text}</td>
              <td>
                <button className="feedback-questions-edit-btn" onClick={() => handleEdit(question)}>Edit</button>
                <button className="feedback-questions-delete-btn" onClick={() => confirmDelete(question.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {showDeleteModal && (
        <div className="feedback-questions-modal-overlay">
          <div className="feedback-questions-modal-box">
            <h3>Are you sure?</h3>
            <p>Do you really want to delete this feedback question? This action cannot be undone.</p>
            <div className="feedback-questions-modal-buttons">
              <button onClick={handleDelete} className="feedback-questions-confirm-delete">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="feedback-questions-cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackQuestions;
