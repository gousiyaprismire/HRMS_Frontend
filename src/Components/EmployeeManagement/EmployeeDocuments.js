import React, { useState } from "react";
import "./EmployeeManagement.css";

const EmployeeDocuments = ({ employee }) => {
  const [documents, setDocuments] = useState(employee.documents || []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments([...documents, file.name]);
    }
  };

  return (
    <div className="employee-documents">
      <h2>Manage Documents</h2>
      <input type="file" onChange={handleUpload} />
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>{doc}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDocuments;
