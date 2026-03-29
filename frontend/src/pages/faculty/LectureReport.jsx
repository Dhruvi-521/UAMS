import React, { useState } from "react";
import ReportPage from "./ReportPage";

const tableRows = [
  ["Mathematics",      "05 Jan 2024", "09:00 AM", { badge: true, text: "Completed", variant: "success" }],
  ["Physics",          "06 Jan 2024", "11:00 AM", { badge: true, text: "Completed", variant: "success" }],
  ["Computer Science", "08 Jan 2024", "10:00 AM", { badge: true, text: "Missed",    variant: "danger"  }],
  ["Chemistry",        "09 Jan 2024", "02:00 PM", { badge: true, text: "Completed", variant: "success" }],
  ["Mathematics",      "10 Jan 2024", "09:00 AM", { badge: true, text: "Cancelled", variant: "warning" }],
  ["Physics",          "12 Jan 2024", "11:00 AM", { badge: true, text: "Completed", variant: "success" }],
  ["Computer Science", "13 Jan 2024", "10:00 AM", { badge: true, text: "Completed", variant: "success" }],
];

export default function LectureReport({ setActiveReport }) {
  const [filters, setFilters] = useState({});

  return (
    <ReportPage
      title="Lecture / Class Report"
      accentColor="#ea580c"
      setActiveReport={setActiveReport}
      filters={[
        { name: "subject",  type: "select", label: "Subject",
          options: ["Mathematics","Physics","Chemistry","Computer Science"] },
        { name: "fromDate", type: "date",   label: "From Date" },
        { name: "toDate",   type: "date",   label: "To Date"   },
      ]}
      filterValues={filters}
      onFilterChange={(name, val) => setFilters((p) => ({ ...p, [name]: val }))}
      onGenerate={() => {}}
      summaryCards={[
        { label: "Total Lectures", value: "48", icon: "📚", color: "#ea580c" },
        { label: "Completed",      value: "42", icon: "✅", color: "#16a34a" },
        { label: "Missed",         value: "3",  icon: "❌", color: "#dc2626" },
        { label: "Cancelled",      value: "3",  icon: "🚫", color: "#64748b" },
      ]}
      tableHeaders={["Subject", "Date", "Time", "Status"]}
      tableRows={tableRows}
    />
  );
}