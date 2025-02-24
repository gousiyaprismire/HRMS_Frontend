import React, { useState } from "react";
import "./FeedbackQuestions.css"; // Ensure the CSS file is linked

const FeedbackQuestions = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "How well does the employee communicate with colleagues?" },
    { id: 2, text: "How effectively does the employee handle conflicts?" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setNewQuestion(e.target.value);
  };

  // Handle form submission for adding or updating a question
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      if (editingId !== null) {
        // Update existing question
        setQuestions(
          questions.map((q) =>
            q.id === editingId ? { ...q, text: newQuestion } : q
          )
        );
        setEditingId(null);
      } else {
        // Add new question
        setQuestions([...questions, { id: questions.length + 1, text: newQuestion }]);
      }
      setNewQuestion("");
    }
  };

  // Handle edit
  const handleEdit = (question) => {
    setEditingId(question.id);
    setNewQuestion(question.text);
  };

  // Handle delete
  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="feedback-questions-container">
      <h2>360° Feedback Questions</h2>
      <p>Manage feedback questions for employee performance evaluation.</p>

      {/* Add/Edit Question Form */}
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

      {/* Questions Table */}
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
                <button className="edit-btn" onClick={() => handleEdit(question)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(question.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackQuestions;
