import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/Topbar";
import LoginForm from "./Components/LoginForm/LoginForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import AnalyticsReporting from "./Components/AnalyticsReporting/AnalyticsReporting";
import AttendanceTime from "./Components/AttendanceTime/AttendanceTime";
import BenefitsCompliance from "./Components/BenefitsCompliance/BenefitsCompliance";
import PayrollCompensation from "./Components/PayrollCompensation/PayrollCompensation";
import SecurityDataPrivacy from "./Components/SecurityDataPrivacy/SecurityDataPrivacy";
import PerformanceManagement from "./Components/PerformanceManagement/PerformanceManagement";
import SelfService from "./Components/SelfService/SelfService";
import EmployeeAttendanceTracking from "./Components/AttendanceTime/EmployeeAttendanceTracking";
import LeaveApplication from "./Components/AttendanceTime/LeaveApplication";
import LeaveApprovalPanel from "./Components/AttendanceTime/LeaveApprovalPanel";
import TimesheetManagement from "./Components/AttendanceTime/TimesheetManagement";
import HolidayPolicies from "./Components/AttendanceTime/HolidayPolicies";
import GoalCategories from "./Components/PerformanceManagement/GoalCategories";
import JobListings from "./Components/Recruitment/JobListings";
import InterviewSchedule from "./Components/Recruitment/InterviewSchedule";
import OfferLetters from "./Components/Recruitment/OfferLetters";
import Onboarding from "./Components/Recruitment/Onboarding";
import Applicant from "./Components/Recruitment/Applicants";
import ProfileUpdate from "./Components/SelfService/ProfileUpdate";
import LeaveAttendance from "./Components/SelfService/LeaveAttendance";
import PayrollTax from "./Components/SelfService/PayrollTax";
import ExpenseReimbursement from "./Components/SelfService/ExpenseReimbursement";
import HelpDesk from "./Components/SelfService/HelpDesk";
import SalaryStructure from "./Components/PayrollCompensation/SalaryStructures";
import Payslips from "./Components/PayrollCompensation/Payslips";
import Bonuses from "./Components/PayrollCompensation/Bonuses";
import PayrollProcessing from "./Components/PayrollCompensation/PayrollProcessing";
import TaxReports from "./Components/PayrollCompensation/TaxReports";
import EmployeeReports from "./Components/AnalyticsReporting/EmployeeReports";
import PerformanceAppraisalReports from "./Components/AnalyticsReporting/PerformanceAppraisalReports";
import OrganizationGoals from "./Components/PerformanceManagement/OrganizationGoals";
import BenefitsEnrollment from "./Components/BenefitsCompliance/BenefitsEnrollment";
import ClaimsReimbursements from "./Components/BenefitsCompliance/ClaimsReimbursements";
import CompanyPolicyCompliance from "./Components/BenefitsCompliance/CompanyPolicyCompliance";
import AuditReports from "./Components/BenefitsCompliance/AuditComplianceReports";
import FeedbackQuestions from "./Components/PerformanceManagement/FeedbackQuestions";
import GeneralOptions from "./Components/PerformanceManagement/GeneralOptions";
import Compensation from "./Components/PayrollCompensation/Compensation";
import AddEmployee from "./Components/EmployeeManagement/AddEmployee";
import EmployeeDashboard from "./Components/EmployeeDashboard/EmployeeDashboard";
import { LogOut } from "lucide-react";
import RelievingLetter from "./Components/RelievingLetter/RelievingLetter";
import PayslipForm from "./Components/PayrollCompensation/PayslipForm";
import CreateProfile from "./Components/EmployeeDashboard/CreateProfile";
 
const ProtectedRoute = ({ children }) => {

  const user = localStorage.getItem("currentlogged");

  return user ? children : <LoginForm />;

};
 
const DashboardLayout = ({ children }) => (
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <TopBar />
        <div style={{ display: "flex", marginTop: "60px" }}>
        <Sidebar />
        <div style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>

                {children}
        </div>
        </div>
        </div>

);
 
const App = () => {
        return (
                <Router>
                <Routes>

                        {/* Public Routes */}
                <Route path="/" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<LogOut />} />
                {/* Protected Routes with Layout */}
                <Route path="/dashboard" element={
                <ProtectedRoute>
                <DashboardLayout><Dashboard /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/analytics-reporting" element={
                <ProtectedRoute>
                <DashboardLayout><AnalyticsReporting /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/attendance" element={
                <ProtectedRoute>
                <DashboardLayout><AttendanceTime /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/attendance-tracking" element={
                <ProtectedRoute>
                <DashboardLayout><EmployeeAttendanceTracking /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/leave-application" element={
                <ProtectedRoute>
                <DashboardLayout><LeaveApplication /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/leave-approval" element={
                <ProtectedRoute>
                <DashboardLayout><LeaveApprovalPanel /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/employee-reports" element={
                <ProtectedRoute>
                <DashboardLayout><EmployeeReports /></DashboardLayout>
                </ProtectedRoute>

                        } />

                <Route path="/payslip-form" element={
                        <ProtectedRoute>
                                <DashboardLayout><PayslipForm /></DashboardLayout>
                        </ProtectedRoute>
                } />

                <Route path="/create-profile" element={<ProtectedRoute>
                        <DashboardLayout><CreateProfile /></DashboardLayout>
                </ProtectedRoute>}/>

                
                <Route path="/relieving-letter" element={
                        <ProtectedRoute>
                                <DashboardLayout><RelievingLetter /></DashboardLayout>
                        </ProtectedRoute>
                }/>
                <Route path="/performance-appraisal-reports" element={
                <ProtectedRoute>
                <DashboardLayout><PerformanceAppraisalReports /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/holiday" element={
                <ProtectedRoute>
                <DashboardLayout><HolidayPolicies /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/timesheet" element={
                <ProtectedRoute>
                <DashboardLayout><TimesheetManagement /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/benefits-compliance" element={
                <ProtectedRoute>
                <DashboardLayout><BenefitsCompliance /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/employee-management" element={
                <ProtectedRoute>
                <DashboardLayout><AddEmployee /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/employee-dashboard" element={
                <ProtectedRoute>
                <DashboardLayout><EmployeeDashboard /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/payroll" element={
                <ProtectedRoute>
                <DashboardLayout><PayrollCompensation /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/performance-management" element={
                <ProtectedRoute>
                <DashboardLayout><PerformanceManagement /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/goal-categories" element={
                <ProtectedRoute>
                <DashboardLayout><GoalCategories /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/organization-goals" element={
                <ProtectedRoute>
                <DashboardLayout><OrganizationGoals /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/feedback-questions" element={
                <ProtectedRoute>
                <DashboardLayout><FeedbackQuestions /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/general-options" element={
                <ProtectedRoute>
                <DashboardLayout><GeneralOptions /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/security" element={
                <ProtectedRoute>
                <DashboardLayout><SecurityDataPrivacy /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/benefits/benefits-enrollment" element={
                <ProtectedRoute>
                <DashboardLayout><BenefitsEnrollment /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/benefits/claims-reimbursements" element={
                <ProtectedRoute>
                <DashboardLayout><ClaimsReimbursements /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/benefits/company-policy-compliance" element={
                <ProtectedRoute>
                <DashboardLayout><CompanyPolicyCompliance /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/benefits/audit-reports" element={
                <ProtectedRoute>
                <DashboardLayout><AuditReports /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/recruitment/job-listings" element={
                <ProtectedRoute>
                <DashboardLayout><JobListings /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/recruitment/job-listings/applicants" element={
                <ProtectedRoute>
                <DashboardLayout><Applicant /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/recruitment/applicant-management" element={
                <ProtectedRoute>
                <DashboardLayout><InterviewSchedule /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/recruitment/offer-letters" element={
                <ProtectedRoute>
                <DashboardLayout><OfferLetters /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/recruitment/onboarding" element={
                <ProtectedRoute>
                <DashboardLayout><Onboarding /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/selfservice" element={
                <ProtectedRoute>
                <DashboardLayout><SelfService /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/selfservice/profile-update" element={
                <ProtectedRoute>
                <DashboardLayout><ProfileUpdate /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/selfservice/leave-attendance-history" element={
                <ProtectedRoute>
                <DashboardLayout><LeaveAttendance /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/selfservice/payroll-tax-documents" element={
                <ProtectedRoute>
                <DashboardLayout><PayrollTax /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/selfservice/expense-reimbursement" element={
                <ProtectedRoute>
                <DashboardLayout><ExpenseReimbursement /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/selfservice/help-desk" element={
                <ProtectedRoute>
                <DashboardLayout><HelpDesk /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/salary-structure" element={
                <ProtectedRoute>
                <DashboardLayout><SalaryStructure /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/payslips" element={
                <ProtectedRoute>
                <DashboardLayout><Payslips /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/bonuses" element={
                <ProtectedRoute>
                <DashboardLayout><Bonuses /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/payroll-processing" element={
                <ProtectedRoute>
                <DashboardLayout><PayrollProcessing /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/tax-reports" element={
                <ProtectedRoute>
                <DashboardLayout><TaxReports /></DashboardLayout>
                </ProtectedRoute>

                        } />
                <Route path="/compensation" element={
                <ProtectedRoute>
                <DashboardLayout><Compensation /></DashboardLayout>
                </ProtectedRoute>

                        } />
                </Routes>
                </Router>

  );

};
 
export default App;
 