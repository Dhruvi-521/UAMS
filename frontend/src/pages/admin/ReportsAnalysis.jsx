import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  CalendarCheck,
  FileText,
  TrendingUp,
  Bell,
  Settings,
  Home,
  PieChart,
  ChevronRight,
  Download,
  Menu,
  X,
  Award,
  Activity,
  Layers,
  Database,
  RefreshCw,
  Users2,
} from "lucide-react";
import ReportCard from "../../layouts/ReportCard";
import "./Reports.css";

const navItems = [
  { icon: Home, label: "ReportsAnalysis", active: true },
  { icon: BarChart2, label: "Reports & Analysis", active: false },
  { icon: GraduationCap, label: "Students", active: false },
  { icon: Users, label: "Faculty", active: false },
  { icon: BookOpen, label: "Courses", active: false },
  { icon: CalendarCheck, label: "Attendance", active: false },
  { icon: FileText, label: "Examinations", active: false },
  { icon: PieChart, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const reports = [
  {
    id: "attendance",
    title: "Attendance Report",
    description: "Monitor attendance trends and defaulters across departments",
    icon: ClipboardList,
    color: "#e05252",
    bgColor: "rgba(224,82,82,0.1)",
  },
  {
    id: "student-performance",
    title: "Student Performance",
    description: "Track academic performance and progression analytics",
    icon: GraduationCap,
    color: "#6b46c1",
    bgColor: "rgba(107,70,193,0.1)",
  },
  {
    id: "exam-statistics",
    title: "Exam Statistics",
    description: "Analyze pass rates, grades, and result distribution",
    icon: FileText,
    color: "#7c59d4",
    bgColor: "rgba(124,89,212,0.1)",
  },
  {
    id: "program-academic",
    title: "Program Academic",
    description: "Program-wise academic performance insights",
    icon: Database,
    color: "#1aa87a",
    bgColor: "rgba(26,168,122,0.1)",
  },
  {
    id: "department-performance",
    title: "Department Performance",
    description: "Compare departmental academic outcomes",
    icon: Users,
    color: "#2556a7",
    bgColor: "rgba(37,86,167,0.1)",
  },
];

const ReportsAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="rp-reports-page">
      <div className="reports-page">
        {/* Topbar */}
        <header className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="topbar-left">
              <h1>Reports & Analysis</h1>
              <p>University Academic Management System</p>
            </div>
          </div>
          <div className="topbar-right">
            <button className="btn-generate">
              <RefreshCw size={14} /> Generate
            </button>
          </div>
        </header>

        <main className="page-content">
          <div className="section-header">
            <div>
              <div className="section-title">Academic Reports</div>
              <div className="section-subtitle">
                Click any card to view the full detailed report
              </div>
            </div>
          </div>

          <div className="reports-grid">
              {reports.map((r) => {
                return (
                  <div
                    key={r.id}
                    onClick={() => navigate(`/admin/reports/${r.id}`)}
                  >
                    <ReportCard report={r} />
                  </div>
                );
              })}
            </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsAnalysis;
