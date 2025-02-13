import React, { useState } from 'react';
import ProfileUpdate from './ProfileUpdate';

const SelfService = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileUpdate />;
      case 'leaveAttendance':
        return <p>Employee can view their past leave and attendance here.</p>;
      case 'payrollTax':
        return <p>Employee can download payslips and tax forms here.</p>;
      case 'expenseReimbursement':
        return <p>Employee can submit expense reimbursement requests here.</p>;
      case 'helpDesk':
        return <p>Employee can raise support tickets for IT/HR issues here.</p>;
      default:
        return (
          <div className="selfservice-dashboard">
            <h2 className="selfservice-dashboard-title">Self-Service For Employees</h2>
            <div className="selfservice-buttons">
              <button onClick={() => setActiveTab('profile')}>Profile Update</button>
              <button onClick={() => setActiveTab('leaveAttendance')}>Leave & Attendance History</button>
              <button onClick={() => setActiveTab('payrollTax')}>Payroll & Tax Documents</button>
              <button onClick={() => setActiveTab('expenseReimbursement')}>Expense Reimbursement Requests</button>
              <button onClick={() => setActiveTab('helpDesk')}>Help Desk & Support Tickets</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="selfservice-container">
      {renderPage()}
      {activeTab !== 'dashboard' && (
        <button className="selfservice-back-button" onClick={() => setActiveTab('dashboard')}>
          Back
        </button>
      )}
    </div>
  );
};

export default SelfService;
