import React, { useState } from "react";
import "./EmployeeManagement.css";

const EmployeeDocuments = ({ employee }) => {
  const [documents, setDocuments] = useState(employee.documents || []);

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments([...documents, { name: file.name, url: URL.createObjectURL(file) }]);
    }
  };

  // Handle file removal
  const handleRemove = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocs);
  };

  return (
    <div className="employee-documents">
      <h2>📂 Manage Employee Documents</h2>
      
      {/* Upload Section */}
      <label className="upload-label">
        <input type="file" onChange={handleUpload} hidden />
        <span className="upload-button">📤 Upload Document</span>
      </label>

      {/* Display Uploaded Documents */}
      {documents.length > 0 ? (
        <ul className="document-list">
          {documents.map((doc, index) => (
            <li key={index} className="document-item">
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                📄 {doc.name}
              </a>
              <button onClick={() => handleRemove(index)} className="delete-button">❌</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-documents">No documents uploaded yet.</p>
      )}
    </div>
  );
};

export default EmployeeDocuments;
