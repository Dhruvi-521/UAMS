// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div>
//       Faculty Dashboard
//     </div>
//   )
// }

// export default Dashboard



// import React from "react";
// import "./FacultyDashboard.css";

// function Dashboard() {
//     return (
//         <div className="dashboard-container">

//             {/* Top Cards */}
//             <div className="top-cards">
//                 <div className="card purple">
//                     <h3>Total Courses</h3>
//                     <h1>5</h1>
//                     <p>2 this semester</p>
//                 </div>

//                 <div className="card blue">
//                     <h3>Students Mentored</h3>
//                     <h1>45</h1>
//                     <p>Students</p>
//                 </div>

//                 <div className="card red">
//                     <h3>Pending Leaves</h3>
//                     <h1>2</h1>
//                     <p>Pending</p>
//                 </div>

//                 <div className="card green">
//                     <h3>Salary Summary</h3>
//                     <h2>₹1,10,000</h2>
//                     <p>Next Paycheck</p>
//                 </div>
//             </div>

//             {/* Bottom Section */}
//             <div className="bottom-section">

//                 <div className="box">
//                     <h2>Today's Classes</h2>
//                     <ul>
//                         <li>10:00 AM - CS101 - Lecture Hall A</li>
//                         <li>2:00 PM - IT203 - Lab 3</li>
//                         <li>4:00 PM - IT203 - Lecture Hall B</li>
//                     </ul>
//                 </div>

//                 <div className="box">
//                     <h2>Upcoming Mentoring Slots</h2>
//                     <ul>
//                         <li>Monday, Jan 22, 11:00 AM - Student A</li>
//                         <li>Wednesday, Jan 24, 3:00 PM - Student B</li>
//                         <li>Wednesday, Jan 24, 3:00 PM - Student C</li>
//                     </ul>
//                 </div>

//                 <div className="box">
//                     <h2>Salary Summary</h2>
//                     <p>Last Payslip (Dec'24): ₹1,10,000</p>
//                     <p>Annual Package: ₹13,20,000</p>
//                     <p>Tax Deducted: ₹8,000</p>
//                 </div>

//                 <div className="box">
//                     <h2>Quick Actions</h2>
//                     <div className="buttons">
//                         <button className="btn blue-btn">Quick Attendance</button>
//                         <button className="btn green-btn">New Mentoring Slot</button>
//                         <button className="btn purple-btn">Upload Study Material</button>
//                         <button className="btn orange-btn">Apply Leave</button>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// }

// export default Dashboard;

import React, { useState } from "react";
import "./Dashboard.css";

const todayClasses = [
    { time: "10:00 AM", code: "CS101", venue: "Lecture Hall A" },
    { time: "2:00 PM", code: "IT203", venue: "Lab 3" },
    { time: "4:00 PM", code: "IT203", venue: "Lecture Hall B" },
];

const mentoringSlots = [
    { date: "Mon, Jan 22", time: "11:00 AM", student: "Student A", avatar: "A", cls: "avatar-a" },
    { date: "Wed, Jan 24", time: "3:00 PM", student: "Student B", avatar: "B", cls: "avatar-b" },
    { date: "Wed, Jan 24", time: "3:00 PM", student: "Student B", avatar: "B", cls: "avatar-b" },
    { date: "Wed, Jan 24", time: "3:00 PM", student: "Student C", avatar: "C", cls: "avatar-c" },
];

const salaryData = [
    { label: "Last Payslip (Dec'24)", value: "₹1,10,000", type: "highlight" },
    { label: "Annual Package", value: "₹13,20,000", type: "normal" },
    { label: "Tax Deducted", value: "₹8,000", type: "deduct" },
];

const quickActions = [
    { label: "+ Quick Attendance", cls: "btn-blue" },
    { label: "+ New Mentoring Slot", cls: "btn-green" },
    { label: "Upload Study Material", cls: "btn-purple" },
    { label: "Apply Leave", cls: "btn-orange" },
];

export default function FacultyDashboard() {
    const [notifCount] = useState(2);

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
    });

    return (
        <div className="dashboard-wrapper">
            {/* ===== HEADER ===== */}
            {/* <header className="dashboard-header">
                <div className="header-left">
                    <div className="header-avatar">DR</div>
                    <div className="header-title">
                        <h1>Faculty Dashboard</h1>
                        <p>UAMS — Academic Portal</p>
                    </div>
                </div>
                <div className="header-right">
                    <span className="header-date">{today}</span>
                    <button className="notif-btn" title="Notifications">
                        🔔
                        {notifCount > 0 && <span className="notif-badge" />}
                    </button>
                </div>
            </header> */}

            {/* ===== MAIN ===== */}
            <main className="dashboard-main">

                {/* --- STATS --- */}
                <div className="stats-grid">
                    <div className="stat-card blue">
                        <div className="stat-header">
                            <span className="stat-icon">📚</span> Total Courses
                        </div>
                        <div className="stat-value">5</div>
                        <div className="stat-sub">2 this semester</div>
                    </div>

                    <div className="stat-card purple">
                        <div className="stat-header">
                            <span className="stat-icon">👥</span> Students Mentored
                        </div>
                        <div className="stat-value">45</div>
                        <div className="stat-sub">Students</div>
                    </div>

                    <div className="stat-card red">
                        <div className="stat-header">
                            <span className="stat-icon">📋</span> Pending Leaves
                        </div>
                        <div className="stat-value">2</div>
                        <div className="stat-sub">Pending</div>
                    </div>

                    <div className="stat-card green">
                        <div className="stat-header">
                            <span className="stat-icon">💰</span> Salary Summary
                        </div>
                        <div className="stat-value" style={{ fontSize: "1.3rem" }}>₹1,10,000</div>
                        <div className="stat-sub">Next Paycheck · Dec'24</div>
                    </div>
                </div>

                {/* --- CONTENT GRID --- */}
                <div className="content-grid">

                    {/* Today's Classes */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">📅 Today's Classes</span>
                            <span className="card-badge">{todayClasses.length} classes</span>
                        </div>
                        <div className="class-list">
                            {todayClasses.map((cls, i) => (
                                <div className="class-item" key={i}>
                                    <div className="class-time">{cls.time}</div>
                                    <div className="class-info">
                                        <div className="class-code">{cls.code}</div>
                                        <div className="class-venue">{cls.venue}</div>
                                    </div>
                                    <div className="class-dot" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Mentoring Slots */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">🎓 Upcoming Mentoring Slots</span>
                            <span className="card-badge">{mentoringSlots.length} slots</span>
                        </div>
                        <div className="mentoring-list">
                            {mentoringSlots.map((slot, i) => (
                                <div className="mentoring-item" key={i}>
                                    <div className={`student-avatar ${slot.cls}`}>{slot.avatar}</div>
                                    <div className="mentoring-info">
                                        <div className="mentoring-student">{slot.student}</div>
                                        <div className="mentoring-time">{slot.date} · {slot.time}</div>
                                    </div>
                                    <span className="mentoring-tag">Upcoming</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Salary Summary */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">💳 Salary Summary</span>
                            <span className="card-badge">Dec 2024</span>
                        </div>
                        <div className="salary-list">
                            {salaryData.map((row, i) => (
                                <div className="salary-row" key={i}>
                                    <span className="salary-label">{row.label}</span>
                                    <span className={`salary-value ${row.type}`}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">⚡ Quick Actions</span>
                        </div>
                        <div className="actions-grid">
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    className={`action-btn ${action.cls}`}
                                    onClick={() => alert(`${action.label} clicked!`)}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </main>

            {/* ===== FOOTER ===== */}
            <footer className="dashboard-footer">
                © 2024 UAMS — University Academic Management System. All rights reserved.
            </footer>
        </div>
    );
}