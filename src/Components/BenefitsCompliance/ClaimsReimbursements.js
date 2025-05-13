
import React, { useState, useEffect } from 'react';
import "./BenefitsCompliance.css";
 
function ClaimsReimbursements() {
  const [showModal, setShowModal] = useState(false);
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    claimType: '',
    otherClaimType: '',
    claimAmount: '',
    file: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
 
  useEffect(() => {
    fetch('http://localhost:8080/api/claims')
      .then((response) => response.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.id - a.id);
        setClaims(sorted);
      })
      .catch((error) => console.error('Error fetching claims:', error));
  }, []);
 
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const actualClaimType =
      formData.claimType === 'Other' ? formData.otherClaimType : formData.claimType;
 
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('employeeName', formData.employeeName);
    formDataToSubmit.append('claimType', actualClaimType);
    formDataToSubmit.append('claimAmount', formData.claimAmount);
    formDataToSubmit.append('claimDate', new Date().toISOString().split('T')[0]);
    if (formData.file) formDataToSubmit.append('file', formData.file);
 
    fetch('http://localhost:8080/api/claims/create', {
      method: 'POST',
      body: formDataToSubmit,
    })
      .then((res) => res.json())
      .then((data) => {
        setClaims((prev) => [data, ...prev]);
        setFormData({
          employeeName: '',
          claimType: '',
          otherClaimType: '',
          claimAmount: '',
          file: null,
        });
        setShowModal(false);
        setCurrentPage(1);
      })
      .catch((error) => console.error('Error submitting claim:', error));
  };
 
  const getImageUrl = (id) => `http://localhost:8080/api/claims/${id}/file`;
 
  const handleFileDownload = (id) => {
    fetch(getImageUrl(id))
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `claim-${id}.jpg`; // adjust extension if needed
        link.click();
      });
  };
 
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentClaims = claims.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(claims.length / itemsPerPage);
 
  return (
    <div className="claim-app">
      <h1 className="claim-title">Employee Claims</h1>
      <button className="claim-add-btn" onClick={() => setShowModal(true)}>Add Claim</button>
 
      {showModal && (
        <div className="claim-modal">
          <div className="claim-modal-content">
            <h2>New Claim</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Employee Name:
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  required
                />
              </label>
 
              <label>
                Claim Type:
                <select name="claimType" value={formData.claimType} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Medical">Medical</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Other">Other</option>
                </select>
              </label>
 
              {formData.claimType === 'Other' && (
                <label>
                  Please Specify:
                  <input
                    type="text"
                    name="otherClaimType"
                    value={formData.otherClaimType}
                    onChange={handleChange}
                    required
                  />
                </label>
              )}
 
              <label>
                Claim Amount (₹):
                <input
                  type="number"
                  name="claimAmount"
                  value={formData.claimAmount}
                  onChange={handleChange}
                  required
                />
              </label>
 
              <label>
                Upload File:
                <input type="file" name="file" onChange={handleChange} />
              </label>
 
              <div className="claim-modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {claims.length > 0 && (
        <div>
          <h2>Submitted Claims</h2>
          <table className="claim-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Claim Type</th>
                <th>Amount</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {currentClaims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.employeeName}</td>
                  <td>{claim.claimType}</td>
                  <td>₹{claim.claimAmount}</td>
                  <td>
                    {claim.fileData ? (
                      <>
                        <button onClick={() => window.open(getImageUrl(claim.id), '_blank')}>View</button>
                        &nbsp;
                        <button onClick={() => handleFileDownload(claim.id)}>Download</button>
                      </>
                    ) : 'No file'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
 
          <div className="claim-pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default ClaimsReimbursements;