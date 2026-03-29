import React, { useState } from "react";
import ReportPage from "./ReportPage";

const tableRows = [
  ["Sick Leave",   "10 Jan 2024", "12 Jan 2024", "3", { badge: true, text: "Approved", variant: "success" }],
  ["Casual Leave", "20 Feb 2024", "21 Feb 2024", "2", { badge: true, text: "Pending",  variant: "warning" }],
  ["Earned Leave", "05 Mar 2024", "08 Mar 2024", "4", { badge: true, text: "Rejected", variant: "danger"  }],
  ["Sick Leave",   "15 Mar 2024", "16 Mar 2024", "2", { badge: true, text: "Approved", variant: "success" }],
  ["Casual Leave", "02 Apr 2024", "02 Apr 2024", "1", { badge: true, text: "Approved", variant: "success" }],
];

export default function LeaveReport({ setActiveReport }) {
  const [filters, setFilters] = useState({});

  return (
    <ReportPage
      title="Leave Report"
      accentColor="#16a34a"
      setActiveReport={setActiveReport}
      filters={[
        { name: "leaveType", type: "select", label: "Leave Type",
          options: ["Casual","Sick","Earned"] },
        { name: "status",    type: "select", label: "Status",
          options: ["Approved","Pending","Rejected"] },
        { name: "fromDate",  type: "date",   label: "From Date" },
        { name: "toDate",    type: "date",   label: "To Date"   },
      ]}
      filterValues={filters}
      onFilterChange={(name, val) => setFilters((p) => ({ ...p, [name]: val }))}
      onGenerate={() => {}}
      summaryCards={[
        { label: "Total Leaves", value: "12", icon: "📋", color: "#2563eb" },
        { label: "Approved",     value: "8",  icon: "✅", color: "#16a34a" },
        { label: "Pending",      value: "2",  icon: "⏳", color: "#ea580c" },
        { label: "Rejected",     value: "2",  icon: "❌", color: "#dc2626" },
      ]}
      tableHeaders={["Type", "From", "To", "Days", "Status"]}
      tableRows={tableRows}
    />
  );
}