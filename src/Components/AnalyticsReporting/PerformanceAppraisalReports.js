import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Button, TextField } from "@mui/material";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./PerformanceAppraisalReports.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const PerformanceAppraisalReports = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const performanceData = [
    { name: "Manjunadh", rating: 4.5, goalAchievement: 90, projects: 5, training: 2, feedbackScore: 4.2, promotions: 1 },
    { name: "Sowri", rating: 4.0, goalAchievement: 85, projects: 4, training: 3, feedbackScore: 4.5, promotions: 2 },
    { name: "Eknath", rating: 3.8, goalAchievement: 75, projects: 3, training: 1, feedbackScore: 3.9, promotions: 0 },
  ];

  const filteredData = performanceData.filter((emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Chart Data
  const barChartData = {
    labels: filteredData.map((emp) => emp.name),
    datasets: [
      { label: "Performance Rating", data: filteredData.map((emp) => emp.rating), backgroundColor: "blue" },
      { label: "Goal Achievement (%)", data: filteredData.map((emp) => emp.goalAchievement), backgroundColor: "green" },
    ],
  };

  const pieChartData = {
    labels: ["Training Completed", "Not Completed"],
    datasets: [{ data: [filteredData.reduce((sum, emp) => sum + emp.training, 0), 10], backgroundColor: ["orange", "gray"] }],
  };

  // Export Functions
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Performance Report");
    XLSX.writeFile(wb, "Performance_Report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Performance & Appraisal Report", 10, 10);
    doc.autoTable({
      head: [["Employee", "Rating", "Goal (%)", "Projects", "Training", "Feedback", "Promotions"]],
      body: filteredData.map((emp) => [emp.name, emp.rating, emp.goalAchievement, emp.projects, emp.training, emp.feedbackScore, emp.promotions]),
    });
    doc.save("Performance_Report.pdf");
  };

  return (
    <div className="performance-report-container">
      <h2>Performance & Appraisal Reports</h2>
      
      <div className="controls">
        <TextField label="Search Employee" variant="outlined" size="small" onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="contained" color="success" onClick={exportToExcel}>Export Excel</Button>
        <Button variant="contained" color="error" onClick={exportToPDF}>Export PDF</Button>
      </div>

      <table className="performance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Performance Rating</th>
            <th>Goal Achievement (%)</th>
            <th>Projects</th>
            <th>Training</th>
            <th>Feedback Score</th>
            <th>Promotions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.rating}</td>
              <td>{emp.goalAchievement}%</td>
              <td>{emp.projects}</td>
              <td>{emp.training}</td>
              <td>{emp.feedbackScore}</td>
              <td>{emp.promotions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="charts">
        <div className="bar-chart">
          <h3>Performance & Goal Achievement</h3>
          <Bar data={barChartData} />
        </div>
        <div className="pie-chart">
          <h3>Training Completion</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceAppraisalReports;