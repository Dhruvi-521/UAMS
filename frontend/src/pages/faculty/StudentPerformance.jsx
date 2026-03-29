import React, { useState } from "react";
import ReportPage from "./ReportPage";

const tableRows = [
  ["Rahul Sharma",  "Mathematics",      "88 / 100", { badge: true, text: "A",    variant: "success" }],
  ["Priya Patel",   "Physics",          "74 / 100", { badge: true, text: "B",    variant: "info"    }],
  ["Amit Verma",    "Chemistry",        "55 / 100", { badge: true, text: "C",    variant: "warning" }],
  ["Sneha Joshi",   "Computer Science", "92 / 100", { badge: true, text: "A+",   variant: "success" }],
  ["Rohit Mehta",   "Mathematics",      "39 / 100", { badge: true, text: "Fail", variant: "danger"  }],
  ["Anita Singh",   "Physics",          "81 / 100", { badge: true, text: "A",    variant: "success" }],
  ["Karan Desai",   "Chemistry",        "67 / 100", { badge: true, text: "B",    variant: "info"    }],
];

export default function StudentPerformance({ setActiveReport }) {
  const [filters, setFilters] = useState({});

  return (
    <ReportPage
      title="Student Performance Report"
      accentColor="#7c3aed"
      setActiveReport={setActiveReport}
      filters={[
        { name: "subject",  type: "select", label: "Subject",
          options: ["Mathematics","Physics","Chemistry","Computer Science"] },
        { name: "examType", type: "select", label: "Exam Type",
          options: ["Mid-Term","Final","Unit Test"] },
        { name: "selectDivision", type: "select", label: "Select Division",
          options: ["A","B","C"] },
      ]}
      filterValues={filters}
      onFilterChange={(name, val) => setFilters((p) => ({ ...p, [name]: val }))}
      onGenerate={() => {}}
      summaryCards={[
        { label: "Average Marks", value: "71%", icon: "📊", color: "#7c3aed" },
        { label: "Pass %",        value: "85%", icon: "✅", color: "#16a34a" },
        { label: "Fail %",        value: "15%", icon: "❌", color: "#dc2626" },
        { label: "Top Score",     value: "92",  icon: "🏆", color: "#ea580c" },
      ]}
      tableHeaders={["Student", "Subject", "Marks", "Grade"]}
      tableRows={tableRows}
    />
  );
}