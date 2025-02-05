import React, { useState } from 'react';
import ProfileUpdate from './ProfileUpdate'; 

const SelfService = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      
      <div className="tabs">
        <button
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => handleTabClick('profile')}
        >
          Profile Update
        </button>
        <button
          className={activeTab === 'leaveAttendance' ? 'active' : ''}
          onClick={() => handleTabClick('leaveAttendance')}
        >
          Leave & Attendance History
        </button>
        <button
          className={activeTab === 'payrollTax' ? 'active' : ''}
          onClick={() => handleTabClick('payrollTax')}
        >
          Payroll & Tax Documents
        </button>
        <button
          className={activeTab === 'expenseReimbursement' ? 'active' : ''}
          onClick={() => handleTabClick('expenseReimbursement')}
        >
          Expense Reimbursement Requests
        </button>
        <button
          className={activeTab === 'helpDesk' ? 'active' : ''}
          onClick={() => handleTabClick('helpDesk')}
        >
          Help Desk & Support Tickets
        </button>
      </div>

    
      <div className="tab-content">
        {activeTab === 'profile' && (
          <div>
            <h2>Profile Update</h2>
            <ProfileUpdate />  {/* Include ProfileUpdate component here */}
          </div>
        )}
        {activeTab === 'leaveAttendance' && (
          <div>
            <h2>Leave & Attendance History</h2>
            <p>Employee can view their past leave and attendance here.</p>
          </div>
        )}
        {activeTab === 'payrollTax' && (
          <div>
            <h2>Payroll & Tax Documents</h2>
            <p>Employee can download payslips and tax forms here.</p>
          </div>
        )}
        {activeTab === 'expenseReimbursement' && (
          <div>
            <h2>Expense Reimbursement Requests</h2>
            <p>Employee can submit expense reimbursement requests here.</p>
          </div>
        )}
        {activeTab === 'helpDesk' && (
          <div>
            <h2>Help Desk & Support Tickets</h2>
            <p>Employee can raise support tickets for IT/HR issues here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfService;
