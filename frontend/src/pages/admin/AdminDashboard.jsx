import React from "react";
import "./AdminDashboard.css";
import AddStudent from "./addStudent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AttendanceChart from "./AttendanceChart";

import {
  Users,
  UserCheck,
  BookOpen,
  FileText,
  PlusCircle,
  FilePlus,
  Send,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [attendanceAnalytics, setAttendanceAnalytics] = useState({
    overallAttendance: 0,
    programAttendance: [],
  });

  const [todayAttendance, setTodayAttendance] = useState({
    totalStudents: 0,
    presentStudents: 0,
    absentStudents: 0,
    attendancePercentage: 0,
  });
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
        );

        setStats(res.data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };

    const fetchProgramAnalytics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/attendance/program-analytics",
        );

        setAttendanceAnalytics(res.data);
      } catch (err) {
        console.error("Program analytics error:", err);
      }
    };

    const fetchTodayAttendance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/attendance/today",
        );

        setTodayAttendance(res.data);
      } catch (err) {
        console.error(err);
      }
    };


    fetchStats();
    fetchProgramAnalytics();
    fetchTodayAttendance();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* ===== Stats Section ===== */}
        <div className="ad-stats-grid">
          <div className="stat-card blue-bg">
            <div className="stat-header">
              <Users size={20} />
              <span>Total Students</span>
            </div>
            <h2 className="stat-value">{stats.students}</h2>
            {/* <p className="stat-footer">+ 45 this month</p> */}
          </div>

          <div className="stat-card green-bg">
            <div className="stat-header">
              <UserCheck size={20} />
              <span>Total Faculty</span>
            </div>
            <h2 className="stat-value">{stats.faculty}</h2>
            {/* <p className="stat-footer">10 Departments</p> */}
          </div>

          <div className="stat-card purple-bg">
            <div className="stat-header">
              <BookOpen size={20} />
              <span>Total Courses</span>
            </div>
            <h2 className="stat-value">{stats.courses}</h2>
          </div>
        </div>

        {/* ===== Attendance Section ===== */}
        <div className="content-card">
          <div className="section-header">
            <h3>Attendance Analytics</h3>
            <select className="ui-select">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>

          <div className="analytics-summary">
            <p>
              Attendance Today:
              <strong>{todayAttendance.attendancePercentage}%</strong>
            </p>

            <p>
              Present:
              <span className="text-blue">
                {todayAttendance.presentStudents}
              </span>
            </p>

            <p>
              Absent:
              <span className="text-red">{todayAttendance.absentStudents}</span>
            </p>

            <p>
              Total Students:
              <span>{todayAttendance.totalStudents}</span>
            </p>
          </div>

          <div className="chart-area">
            <AttendanceChart data={attendanceAnalytics.programAttendance} />
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="bottom-layout">

          <div className="content-card">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button
                className="btn btn-blue"
                onClick={() => navigate("/admin/students/add")}
              >
                <PlusCircle size={18} /> Add Student
              </button>
              <button
                className="btn btn-green"
                onClick={() => navigate("/admin/faculty/add")}
              >
                <PlusCircle size={18} />
                Add Faculty
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
