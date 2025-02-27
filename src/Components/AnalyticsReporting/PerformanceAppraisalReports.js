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
      <h2 className="performance-title-container">Performance & Appraisal Reports</h2>
      
      <div className="performance-controls-container">
        <TextField className="performance-search-container" label="Search Employee" variant="outlined" size="small" onChange={(e) => setSearchTerm(e.target.value)} />
        <Button className="performance-export-btn-container excel-btn-container" variant="contained" color="success" onClick={exportToExcel}>Export Excel</Button>
        <Button className="performance-export-btn-container pdf-btn-container" variant="contained" color="error" onClick={exportToPDF}>Export PDF</Button>
      </div>

      <table className="performance-table-container">
        <thead className="performance-table-header-container">
          <tr>
            <th className="performance-table-cell-container">Employee</th>
            <th className="performance-table-cell-container">Performance Rating</th>
            <th className="performance-table-cell-container">Goal Achievement (%)</th>
            <th className="performance-table-cell-container">Projects</th>
            <th className="performance-table-cell-container">Training</th>
            <th className="performance-table-cell-container">Feedback Score</th>
            <th className="performance-table-cell-container">Promotions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((emp, index) => (
            <tr className="performance-table-row-container" key={index}>
              <td className="performance-table-cell-container">{emp.name}</td>
              <td className="performance-table-cell-container">{emp.rating}</td>
              <td className="performance-table-cell-container">{emp.goalAchievement}%</td>
              <td className="performance-table-cell-container">{emp.projects}</td>
              <td className="performance-table-cell-container">{emp.training}</td>
              <td className="performance-table-cell-container">{emp.feedbackScore}</td>
              <td className="performance-table-cell-container">{emp.promotions}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="performance-charts-container">
        <div className="performance-bar-chart-container">
          <h3 className="performance-chart-title-container">Performance & Goal Achievement</h3>
          <Bar data={barChartData} />
        </div>
        <div className="performance-pie-chart-container">
          <h3 className="performance-chart-title-container">Training Completion</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceAppraisalReports;
