import React, { useState } from 'react';
import ProfileUpdate from './ProfileUpdate';
import LeaveAttendance from './LeaveAttendance';
import PayrollTax from './PayrollTax';
import ExpenseReimbursement from './ExpenseReimbursement';
import HelpDesk from './HelpDesk';


const SelfService = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileUpdate />;
      case 'leaveAttendance':
        return <LeaveAttendance />;
      case 'payrollTax':
        return <PayrollTax />;
      case 'expenseReimbursement':
        return <ExpenseReimbursement />;
      case 'helpDesk':
        return <HelpDesk />;
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
