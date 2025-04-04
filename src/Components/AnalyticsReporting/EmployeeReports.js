import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./EmployeeReports.css";

const EmployeeReports = () => {
  const [search, setSearch] = useState("");
  const stats = {
    activeEmployees: 120,
    retentionRate: "85%",
    turnoverRate: "15%",
    avgSalary: "$75,000",
  };

  const departmentData = [
    { name: "HR", employees: 15 },
    { name: "Engineering", employees: 50 },
    { name: "Sales", employees: 30 },
    { name: "Marketing", employees: 25 },
  ];

  const filteredData = departmentData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Department,Employees"]
        .concat(filteredData.map((row) => `${row.name},${row.employees}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "EmployeeReports.csv");
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Reports");
    XLSX.writeFile(workbook, "EmployeeReports.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Reports", 14, 10);
    doc.autoTable({
      head: [["Department", "Employees"]],
      body: filteredData.map((row) => [row.name, row.employees]),
    });
    doc.save("EmployeeReports.pdf");
  };

  return (
    <div className="employee-reports-container">
      <h2 className="employee-reports-page-title">Employee Reports</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="employee-reports-search-bar"
      />

      <div className="employee-reports-cards-container">
        <div className="employee-reports-card">
          <h3 className="employee-reports-card-title">Active Employees</h3>
          <p className="employee-reports-card-value">{stats.activeEmployees}</p>
        </div>
        <div className="employee-reports-card">
          <h3 className="employee-reports-card-title">Retention Rate</h3>
          <p className="employee-reports-card-value">{stats.retentionRate}</p>
        </div>
        <div className="employee-reports-card">
          <h3 className="employee-reports-card-title">Turnover Rate</h3>
          <p className="employee-reports-card-value">{stats.turnoverRate}</p>
        </div>
        <div className="employee-reports-card">
          <h3 className="employee-reports-card-title">Average Salary</h3>
          <p className="employee-reports-card-value">{stats.avgSalary}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="employee-reports-chart-container">
        <h3 className="employee-reports-chart-title">Department-wise Employee Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="employees" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="employee-reports-export-buttons">
        <button onClick={exportToCSV} className="employee-reports-export-btn employee-reports-csv-btn">
          Export CSV
        </button>
        <button onClick={exportToExcel} className="employee-reports-export-btn employee-reports-excel-btn">
          Export Excel
        </button>
        <button onClick={exportToPDF} className="employee-reports-export-btn employee-reports-pdf-btn">
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default EmployeeReports;
