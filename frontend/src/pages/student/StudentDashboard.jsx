import React, { useState } from "react";
import "./StudentDashboard.css";

const internalMarks = [
    { date: "Jan 15", course: "CS101", type: "Quiz 1", score: "18/20" },
    { date: "Jan 18", course: "IT203", type: "Assignment", score: "22/25" },
    { date: "Jan 18", course: "IT203", type: "Assignment", score: "22/25" },
    { date: "Jan 19", course: "CS101", type: "Quiz 1", score: "18/20" },
    { date: "Jan 18", course: "IT203", type: "Assignment", score: "22/25" },
];

const mentoringSlots = [
    { day: "Friday, Jan 26", time: "10:00 AM", mentor: "Dr. Sharma", initials: "DS", cls: "av-sharma" },
    { day: "Monday, Jan 29", time: "2:00 PM", mentor: "Prof. Patel", initials: "PP", cls: "av-patel" },
    { day: "Tuesday, Jan 29", time: "2:00 PM", mentor: "Prof. Patel", initials: "PP", cls: "av-patel" },
    { day: "Thursday, Jan 29", time: "3:00 PM", mentor: "Prof. Patel", initials: "PP", cls: "av-patel" },
];

const announcements = [
    { text: "Final Exam Schedule Posted for April", date: "Jan 20, 2024" },
    { text: "Campus-wide Wi-Fi Maintenance on Jan 30", date: "Jan 19, 2024" },
];

const quickActions = [
    { label: "+ View Available Slots", cls: "btn-blue" },
    { label: "+ Book Mentoring Slot", cls: "btn-green" },
    { label: "⬇ Download Materials", cls: "btn-teal" },
    { label: "View Grades", cls: "btn-orange" },
];

export default function StudentDashboard() {
    const [notifCount] = useState(3);

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
    });

    return (
        <div className="dashboard-wrapper">

            {/* ===== MAIN ===== */}
            <main className="dashboard-main">

                <div className="stu-basic-detail">
                    <p className="wc-student">
                        <span>Welcome, </span>
                        <span>Virajsinh Vaghela</span>
                    </p>

                    <p className="student-details">
                        <span className="st-dt-title">Student ID :-</span>
                        <span> SU252701001</span>
                        <span className="st-dt-title">  Roll number :- </span>
                        <span>01</span>
                    </p>
                </div>

                {/* --- STATS --- */}
                <div className="stats-grid">
                    <div className="stat-card purple">
                        <div className="stat-label">
                            <span className="stat-icon">📚</span> Enrolled Courses
                        </div>
                        <div className="stat-value">6</div>
                        <div className="stat-sub">Current Semester</div>
                    </div>

                    <div className="stat-card blue">
                        <div className="stat-label">
                            <span className="stat-icon">👥</span> Attendance %
                        </div>
                        <div className="stat-value">92%</div>
                        <div className="stat-sub">Overall Attendance</div>
                    </div>

                    <div className="stat-card red">
                        <div className="stat-label">
                            <span className="stat-icon">💸</span> Pending Fees
                        </div>
                        <div className="stat-value" style={{ fontSize: "1.6rem" }}>₹25,000</div>
                        <div className="stat-sub">Due Next Month</div>
                    </div>

                    <div className="stat-card green">
                        <div className="stat-label">
                            <span className="stat-icon">⭐</span> Cumulative GPA
                        </div>
                        <div className="stat-value">8.7</div>
                        <div className="stat-sub">Out of 10.0</div>
                    </div>
                </div>

                {/* --- CONTENT GRID --- */}
                <div className="content-grid">

                    {/* Latest Internal Marks */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">📝 Latest Internal Marks</span>
                            <span className="card-count">{internalMarks.length} records</span>
                        </div>
                        <div className="marks-list">
                            {internalMarks.map((item, i) => (
                                <div className="mark-item" key={i}>
                                    <div className="mark-date">{item.date}</div>
                                    <div className="mark-info">
                                        <div className="mark-course">{item.course}</div>
                                        <div className="mark-type">{item.type}</div>
                                    </div>
                                    <div className="mark-score">{item.score}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Mentoring Slots */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">🎓 Upcoming Mentoring Slots</span>
                            <span className="card-count">{mentoringSlots.length} slots</span>
                        </div>
                        <div className="mentoring-list">
                            {mentoringSlots.map((slot, i) => (
                                <div className="mentoring-item" key={i}>
                                    <div className={`mentor-avatar ${slot.cls}`}>{slot.initials}</div>
                                    <div className="mentoring-info">
                                        <div className="mentor-name">{slot.mentor}</div>
                                        <div className="mentor-datetime">{slot.day} · {slot.time}</div>
                                    </div>
                                    <span className="slot-tag">Upcoming</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Announcements */}
                    <div className="card">
                        <div className="card-header">
                            <span className="card-title">📢 Announcements</span>
                            <span className="card-count">{announcements.length} new</span>
                        </div>
                        <div className="announce-list">
                            {announcements.map((item, i) => (
                                <div className="announce-item" key={i}>
                                    <div className="announce-dot" />
                                    <div>
                                        <div className="announce-text">{item.text}</div>
                                        <div className="announce-date">{item.date}</div>
                                    </div>
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

        </div>
    );
}