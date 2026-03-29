import React, { useState } from "react";
import ReportPage from "./ReportPage";

const tableRows = [
  ["01 Jan 2024", "Monday",    { badge: true, text: "Present",  variant: "success" }],
  ["02 Jan 2024", "Tuesday",   { badge: true, text: "Present",  variant: "success" }],
  ["03 Jan 2024", "Wednesday", { badge: true, text: "Absent",   variant: "danger"  }],
  ["04 Jan 2024", "Thursday",  { badge: true, text: "Present",  variant: "success" }],
  ["05 Jan 2024", "Friday",    { badge: true, text: "Leave",    variant: "warning" }],
  ["08 Jan 2024", "Monday",    { badge: true, text: "Present",  variant: "success" }],
  ["09 Jan 2024", "Tuesday",   { badge: true, text: "Present",  variant: "success" }],
  ["10 Jan 2024", "Wednesday", { badge: true, text: "Absent",   variant: "danger"  }],
  ["11 Jan 2024", "Thursday",  { badge: true, text: "Present",  variant: "success" }],
  ["12 Jan 2024", "Friday",    { badge: true, text: "Present",  variant: "success" }],
];

export default function AttendanceReport({ setActiveReport }) {
  const [filters, setFilters] = useState({});

  return (
    <ReportPage
      title="Attendance Report"
      accentColor="#2563eb"
      setActiveReport={setActiveReport}
      filters={[
        { name: "fromDate", type: "date",   label: "From Date" },
        { name: "toDate",   type: "date",   label: "To Date"   },
        { name: "month",    type: "select", label: "Month",
          options: ["January","February","March","April","May","June","July","August","September","October","November","December"] },
        { name: "year",     type: "select", label: "Year",
          options: ["2022","2023","2024","2025"] },
      ]}
      filterValues={filters}
      onFilterChange={(name, val) => setFilters((p) => ({ ...p, [name]: val }))}
      onGenerate={() => {}}
      summaryCards={[
        { label: "Working Days", value: "22", icon: "📅", color: "#2563eb" },
        { label: "Present Days", value: "18", icon: "✅", color: "#16a34a" },
        { label: "Absent Days",  value: "2",  icon: "❌", color: "#dc2626" },
        { label: "Leaves Taken", value: "2",  icon: "🏖️", color: "#ea580c" },
      ]}
      tableHeaders={["Date", "Day", "Status"]}
      tableRows={tableRows}
    />
  );
}