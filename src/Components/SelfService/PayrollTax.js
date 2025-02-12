import React from 'react';
import './SelfService.css'; 

const PayrollTax = () => {
  const documents = [
    { title: 'Payslip - January 2025', link: '/path/to/document1.pdf' },
    { title: 'Tax Form - 2024', link: '/path/to/document2.pdf' }
  ];

  return (
    <div className="payroll-tax-container">
      <h2 className="payroll-tax-title">Payroll & Tax Documents</h2>
      
      <ul className="payroll-tax-list">
        {documents.map((doc, index) => (
          <li key={index} className="payroll-tax-document-item">
            {doc.title}
            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="payroll-tax-document-download">
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayrollTax;
