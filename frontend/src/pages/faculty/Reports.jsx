import React, { useState } from "react";
import "./Reports.css";
import AttendanceReport from "./AttendanceReport";
import LeaveReport from "./LeaveReport";
import PayrollReport from "./PayrollReport";
import LectureReport from "./LectureReport";
import StudentPerformance from "./StudentPerformance";

const reportCards = [
  {
    id: "attendance",
    title: "Attendance Report",
    description: "Track daily attendance summaries, patterns, and absence trends.",
    icon: "📅",
    color: "card-blue",
    filters: [
      { name: "month", type: "select", label: "Month", options: ["January","February","March","April","May","June","July","August","September","October","November","December"] },
      { name: "year",  type: "select", label: "Year",  options: ["2022","2023","2024","2025"] },
    ],
  },
  // {
  //   id: "leave",
  //   title: "Leave Report",
  //   description: "View leave summaries, approval status, and trends by type.",
  //   icon: "🏖️",
  //   color: "card-green",
  //   filters: [
  //     { name: "leaveType", type: "select", label: "Leave Type", options: ["All","Casual","Sick","Earned"] },
  //     { name: "status",    type: "select", label: "Status",     options: ["All","Approved","Pending","Rejected"] },
  //   ],
  // },
  // {
  //   id: "payroll",
  //   title: "Payroll Report",
  //   description: "Review salary breakdowns, deductions, and net pay history.",
  //   icon: "💰",
  //   color: "card-teal",
  //   filters: [
  //     { name: "month", type: "select", label: "Month", options: ["January","February","March","April","May","June","July","August","September","October","November","December"] },
  //     { name: "year",  type: "select", label: "Year",  options: ["2022","2023","2024","2025"] },
  //   ],
  // },
  {
    id: "lecture",
    title: "Lecture / Class Report",
    description: "Monitor lecture completion, missed classes, and subject coverage.",
    icon: "📚",
    color: "card-orange",
    filters: [
      { name: "subject", type: "select", label: "Subject", options: ["All","Mathematics","Physics","Chemistry","Computer Science"] },
      { name: "date",    type: "date",   label: "Date" },
    ],
  },
  {
    id: "performance",
    title: "Student Performance Report",
    description: "Analyze student grades, pass/fail rates, and exam outcomes.",
    icon: "🎓",
    color: "card-purple",
    filters: [
      { name: "subject",  type: "select", label: "Subject",   options: ["All","Mathematics","Physics","Chemistry","Computer Science"] },
      { name: "examType", type: "select", label: "Exam Type", options: ["All","Mid-Term","Final","Unit Test"] },
    ],
  },
];

const reportComponents = {
  attendance:  AttendanceReport,
  leave:       LeaveReport,
  payroll:     PayrollReport,
  lecture:     LectureReport,
  performance: StudentPerformance,
};

export default function Reports() {
  const [activeReport, setActiveReport] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [search, setSearch] = useState("");

  if (activeReport) {
    const Component = reportComponents[activeReport];
    return <Component setActiveReport={setActiveReport} />;
  }

  const handleFilterChange = (cardId, name, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [cardId]: { ...(prev[cardId] || {}), [name]: value },
    }));
  };

  const filtered = reportCards.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="reports-root">
      <div className="reports-wrapper">

        {/* Header */}
        <div className="reports-header">
          <div className="reports-header-left">
            <h1 className="reports-title">Faculty Reports</h1>
            <p className="reports-subtitle">Generate and view your reports</p>
          </div>
          <div className="reports-search-box">
            <span className="reports-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="reports-search-input"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="reports-grid">
          {filtered.map((card) => (
            <div key={card.id} className={`report-card ${card.color}`}>
              <div className="report-card-icon-wrap">
                <span className="report-card-icon">{card.icon}</span>
              </div>
              <h2 className="report-card-title">{card.title}</h2>
              <p className="report-card-desc">{card.description}</p>

              <div className="report-card-filters">
                {card.filters.map((f) =>
                  f.type === "select" ? (
                    <select
                      key={f.name}
                      className="report-filter-select"
                      value={(filterValues[card.id] || {})[f.name] || ""}
                      onChange={(e) => handleFilterChange(card.id, f.name, e.target.value)}
                    >
                      <option value="">{f.label}</option>
                      {f.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      key={f.name}
                      type="date"
                      className="report-filter-date"
                      value={(filterValues[card.id] || {})[f.name] || ""}
                      onChange={(e) => handleFilterChange(card.id, f.name, e.target.value)}
                    />
                  )
                )}
              </div>

              <button
                className="report-generate-btn"
                onClick={() => setActiveReport(card.id)}
              >
                Generate Report
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="reports-empty">
              <span>📭</span>
              <p>No reports found for "{search}"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
