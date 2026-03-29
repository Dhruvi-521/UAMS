import React, { useState } from "react";
import ReportPage from "./ReportPage";

const tableRows = [
  ["March",    "2024", "₹52,000", { badge: true, text: "Paid", variant: "success" }],
  ["February", "2024", "₹50,000", { badge: true, text: "Paid", variant: "success" }],
  ["January",  "2024", "₹48,000", { badge: true, text: "Paid", variant: "success" }],
  ["December", "2023", "₹48,000", { badge: true, text: "Paid", variant: "success" }],
  ["November", "2023", "₹46,000", { badge: true, text: "Paid", variant: "success" }],
];

export default function PayrollReport({ setActiveReport }) {
  const [filters, setFilters] = useState({});

  return (
    <ReportPage
      title="Payroll Report"
      accentColor="#0d9488"
      setActiveReport={setActiveReport}
      filters={[
        { name: "month", type: "select", label: "Month",
          options: ["January","February","March","April","May","June","July","August","September","October","November","December"] },
        { name: "year",  type: "select", label: "Year",
          options: ["2022","2023","2024","2025"] },
      ]}
      filterValues={filters}
      onFilterChange={(name, val) => setFilters((p) => ({ ...p, [name]: val }))}
      onGenerate={() => {}}
      summaryCards={[
        { label: "Net Salary",       value: "₹52,000", icon: "💰", color: "#0d9488" },
        { label: "Total Earnings",   value: "₹56,000", icon: "📈", color: "#16a34a" },
        { label: "Total Deductions", value: "₹4,000",  icon: "📉", color: "#dc2626" },
        { label: "Leave Deduction",  value: "₹1,000",  icon: "🏖️", color: "#ea580c" },
      ]}
      tableHeaders={["Month", "Year", "Net Salary", "Status"]}
      tableRows={tableRows}
    />
  );
}