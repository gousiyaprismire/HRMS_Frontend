// import React, { useState } from "react";
// import "./PerformanceManagement.css";

// const PerformanceManagement = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <div className="main-content">
//       <div className="header">
//         <div>
//           <h1>Performance Management Dashboard</h1>
//           <p>View latest status of performance measurement at one place.</p>
//         </div>
//         <div className="settings-container">
//           <button 
//             className="settings-btn" 
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             ⚙️ Settings
//           </button>
//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <ul>
//                 <li>Performance Periods</li>
//                 <li>Feedback Questions</li>
//                 <li>General Options</li>
//                 <li>Goal Categories</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
      
//       <div className="cards">
//         {["Total Employees", "Forms Sent", "Forms Accepted", "Rated by Employees", "Rated by Managers", "Rating Finalized"].map((title) => (
//           <div key={title} className="card">
//             <h2>{title}</h2>
//             <p>-</p>
//           </div>
//         ))}
//       </div>
      
//       <div className="buttons">
//         <button className="goal-btn">🎯 Organization Goals</button>
//         <button className="appraisal-btn">📄 Appraisal Forms</button>
//       </div>
//     </div>
//   );
// };

// export default PerformanceManagement;






import React from "react";
import "./PerformanceManagement.css";

const PerformanceManagement = () => {
  return (
    <div className="main-content">
      <div className="header">
        <div>
        <h1>Performance Management Dashboard</h1>
        <p>View latest status of performance measurement at one place.</p>
        </div>
        <button className="settings-btn">⚙️ Settings</button>
      </div>
      

      
      <div className="cards">
        {["Total Employees", "Forms Sent", "Forms Accepted", "Rated by Employees", "Rated by Managers", 
        "Rating Finalized"].map((title) => (
          <div key={title} className="card">
            <h2>{title}</h2>
            <p>-</p>
          </div>
        ))}
      </div>

      
      <div className="buttons">
        <button className="goal-btn">🎯 Organization Goals</button>
        <button className="appraisal-btn">📄 Appraisal Forms</button>
      </div>
    </div>
  );
};

export default PerformanceManagement;