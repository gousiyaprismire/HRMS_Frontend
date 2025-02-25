import React, { useState } from "react";
import "./FeedbackQuestions.css"; 

const FeedbackQuestions = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "How well does the employee communicate with colleagues?" },
    { id: 2, text: "How effectively does the employee handle conflicts?" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [editingId, setEditingId] = useState(null);

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

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
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
                <button className="feedback-questions-delete-btn" onClick={() => handleDelete(question.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackQuestions;
