import React from 'react';
import './Dashboard.css';
import { 
  Users, UserCheck, BookOpen, FileText, 
  PlusCircle, FilePlus, Send 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">

        {/* ===== Stats Section ===== */}
        <div className="stats-grid">
          <div className="stat-card blue-bg">
            <div className="stat-header">
              <Users size={20} />
              <span>Total Students</span>
            </div>
            <h2 className="stat-value">1,250</h2>
            <p className="stat-footer">+ 45 this month</p>
          </div>

          <div className="stat-card green-bg">
            <div className="stat-header">
              <UserCheck size={20} />
              <span>Total Faculty</span>
            </div>
            <h2 className="stat-value">85</h2>
            <p className="stat-footer">10 Departments</p>
          </div>

          <div className="stat-card purple-bg">
            <div className="stat-header">
              <BookOpen size={20} />
              <span>Total Courses</span>
            </div>
            <h2 className="stat-value">32</h2>
            <p className="stat-footer">25 Active This Semester</p>
          </div>

          <div className="stat-card red-bg">
            <div className="stat-header">
              <FileText size={20} />
              <span>Pending Leaves</span>
            </div>
            <h2 className="stat-value">18</h2>
            <div className="stat-footer-flex">
              <span>7 S, 6 F</span>
              {/* <button className="mini-view-btn">View All</button> */}
            </div>
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
            <p>Overall Attendance: <strong>87%</strong></p>
            <p>Students: <span className="text-blue">85%</span></p>
            <p>Faculty: <span className="text-green">92%</span></p>
          </div>

          <div className="chart-area">
            <p>Chart Visualization Area</p>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="bottom-layout">
          <div className="content-card">
            <h3>Monthly Payroll Summary</h3>
            <div className="payroll-row">
              <span className="pay-amount">₹12,50,000</span>
              <span className="pay-status paid">Paid</span>
            </div>
            <div className="payroll-row">
              <span className="pay-amount">₹1,80,000</span>
              <span className="pay-status pending">Pending</span>
            </div>
          </div>

          <div className="content-card">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="btn btn-blue ">
                <PlusCircle size={18}/> Add Student
              </button>
              <button className="btn btn-green">
                <PlusCircle size={18}/> Add Faculty
              </button>
              <button className="btn btn-purple">
                <FilePlus size={18}/> Report
              </button>
              <button className="btn btn-orange">
                <Send size={18}/> Notify
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;