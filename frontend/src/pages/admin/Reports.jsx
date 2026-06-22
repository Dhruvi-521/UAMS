import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ArrowLeft,
  ChevronRight,
  Download,
  ClipboardList,
  GraduationCap,
  FileText,
  Database,
  Users,
} from "lucide-react";

const COLORS = ["#1aa87a", "#e05252", "#f07b34", "#6b46c1"];

export default function Reports() {
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/reports/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setData(res.data.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = (title, Icon) => (
    <div className="rp-header">
      <div className="rp-header-left">
        <div className="rp-breadcrumb">
          <span onClick={() => navigate("/admin/reports")}>Reports</span>
          <ChevronRight size={14} />
          {title}
        </div>

        <h1 className="rp-title">
          <Icon size={22} /> {title}
        </h1>

        <p className="rp-subtitle">Analytics overview and insights</p>
      </div>

      <button className="btn-export primary">
        <Download size={16} />
        Export
      </button>
    </div>
  );

  if (loading) return <h2 style={{ padding: 20 }}>Loading...</h2>;
  if (!data) return <h2 style={{ padding: 20 }}>No Data Found</h2>;

  return (
    <div className="rp-reports-page">
      <div className="reports-page">
        {/* ================= ATTENDANCE ================= */}
        {reportId === "attendance" && (
          <>
            {renderHeader("Attendance Report", ClipboardList)}

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon blue" />
                <div>
                  <div className="stat-value">{data.totalRecords}</div>
                  <div className="stat-label">Total Records</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green" />
                <div>
                  <div className="stat-value">{data.present}</div>
                  <div className="stat-label">Present</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon red" />
                <div>
                  <div className="stat-value">{data.absent}</div>
                  <div className="stat-label">Absent</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple" />
                <div>
                  <div className="stat-value">{data.attendancePercentage}%</div>
                  <div className="stat-label">Attendance</div>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Present", value: data.present },
                      { name: "Absent", value: data.absent },
                    ]}
                    dataKey="value"
                  >
                    {COLORS.map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* ================= STUDENT ================= */}
        {reportId === "student-performance" && (
          <>
            {renderHeader("Student Performance", GraduationCap)}

            <div className="panel-card">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={Array.isArray(data) ? data.slice(0, 10) : []}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="averagePercentage" fill="#3b72c8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rp-table-section">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Semester</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(data) ? data : []).map((s) => (
                    <tr key={s.studentId}>
                      <td>{s.name}</td>
                      <td>{s.semester}</td>
                      <td>{s.averagePercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= EXAM STATISTICS ================= */}
        {reportId === "exam-statistics" && (
          <>
            {renderHeader("Exam Statistics", FileText)}

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-value">{data.totalExams}</div>
                <div className="stat-label">Total Exams</div>
              </div>

              <div className="stat-card">
                <div className="stat-value">{data.averageScore}%</div>
                <div className="stat-label">Average Score</div>
              </div>

              <div className="stat-card">
                <div className="stat-value">{data.passRate}%</div>
                <div className="stat-label">Pass Rate</div>
              </div>
            </div>
          </>
        )}

        {/* ================= PROGRAM (FIXED BLANK ISSUE) ================= */}
        {reportId === "program-academic" && (
          <>
            {renderHeader("Program Academic", Database)}

            <div className="rp-table-section">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={Array.isArray(data) ? data : [] } fill="#7c59d4">
                  <XAxis dataKey="programName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passPercentage" />
                </BarChart>
              </ResponsiveContainer>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Students</th>
                    <th>Pass %</th>
                  </tr>
                </thead>

                <tbody>
                  {(Array.isArray(data) ? data : []).map((p) => (
                    <tr key={p.programId}>
                      <td>{p.programName}</td>
                      <td>{p.totalStudents}</td>
                      <td>{p.passPercentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================= DEPARTMENT (FIXED BLANK ISSUE) ================= */}
        {reportId === "department-performance" && (
          <>
            {renderHeader("Department Performance", Users)}

            <div className="rp-table-section">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={Array.isArray(data) ? data : []} fill = "#0e8fa3">
                  <XAxis dataKey="departmentName" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalStudents" />
                </BarChart>
              </ResponsiveContainer>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Programs</th>
                    <th>Students</th>
                  </tr>
                </thead>

                <tbody>
                  {(Array.isArray(data) ? data : []).map((d) => (
                    <tr key={d.departmentId}>
                      <td>{d.departmentName}</td>
                      <td>{d.totalPrograms}</td>
                      <td>{d.totalStudents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
