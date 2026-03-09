import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './attendance.css';

const historyData = [
    { date: '12-Mar-2026', status: 'Present' },
    { date: '10-Mar-2026', status: 'Present' },
    { date: '08-Mar-2026', status: 'Absent' },
    { date: '05-Mar-2026', status: 'Present' },
    { date: '03-Mar-2026', status: 'Present' },
    { date: '01-Mar-2026', status: 'Absent' },
];

const SubjectAttendanceDetails = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();

    // Format subject ID for display
    const displayName = subjectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="dashboard-container">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back to Dashboard</button>
            <h2 className="page-title">{displayName} - Daily History</h2>

            <div className="history-grid">
                {historyData.map((item, index) => (
                    <div key={index} className={`history-card ${item.status.toLowerCase()}`}>
                        <div className="history-info">
                            <span className="date-text">{item.date}</span>
                            <span className={`status-badge ${item.status.toLowerCase()}`}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectAttendanceDetails;


// import { useParams, useNavigate } from 'react-router-dom';
// import { SUBJECTS } from './StudentAttendance';
// import './Attendance1.css';

// // ── Generate mock daily attendance ────────────────────────────────────────
// function generateDailyAttendance(total, present) {
//     const dates = [];
//     const startDate = new Date('2024-08-01');
//     let presentCount = 0;
//     let absentCount = 0;

//     for (let i = 0; i < total; i++) {
//         // Skip weekends
//         const d = new Date(startDate);
//         d.setDate(startDate.getDate() + i + Math.floor(i / 5) * 2);

//         const remaining = total - i;
//         const presentNeeded = present - presentCount;
//         // Weighted random to hit the target
//         const probability = presentNeeded / remaining;
//         const isPresent = Math.random() < probability;

//         if (isPresent) {
//             presentCount++;
//         } else {
//             absentCount++;
//         }

//         dates.push({
//             date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
//             dayName: d.toLocaleDateString('en-IN', { weekday: 'short' }),
//             status: isPresent ? 'present' : 'absent',
//             month: d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
//         });
//     }
//     return dates;
// }

// // ── Group by month ─────────────────────────────────────────────────────────
// function groupByMonth(entries) {
//     const map = {};
//     entries.forEach((e) => {
//         if (!map[e.month]) map[e.month] = [];
//         map[e.month].push(e);
//     });
//     return Object.entries(map);
// }

// const pct = (p, t) => Math.round((p / t) * 100);

// // ── Component ─────────────────────────────────────────────────────────────
// export default function SubjectAttendanceDetails() {
//     const { subjectId } = useParams();
//     const navigate = useNavigate();

//     const subject = SUBJECTS.find((s) => s.id === subjectId);

//     if (!subject) {
//         return (
//             <div className="detail-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
//                 <div style={{ textAlign: 'center' }}>
//                     <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
//                     <h2 style={{ color: '#e8eaf6', fontFamily: 'Sora, sans-serif' }}>Subject not found</h2>
//                     <button
//                         className="back-btn"
//                         onClick={() => navigate('/student/attendance')}
//                         style={{ marginTop: 20, width: 'auto', padding: '10px 24px', borderRadius: 10, fontSize: '0.9rem' }}
//                     >
//                         ← Back to Dashboard
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Stable mock data (seeded via subject id length trick)
//     const dailyData = generateDailyAttendance(subject.total, subject.present);
//     const grouped = groupByMonth(dailyData);
//     const absent = subject.total - subject.present;
//     const attendancePct = pct(subject.present, subject.total);

//     const chipClass = attendancePct >= 75 ? 'c-green' : attendancePct >= 60 ? 'c-purple' : 'c-red';
//     const statusLabel = attendancePct >= 75 ? 'On Track ✅' : attendancePct >= 60 ? 'At Risk ⚠️' : 'Critical 🚨';

//     return (
//         <div className="detail-page">
//             {/* Header */}
//             <header className="detail-header">
//                 <button className="back-btn" onClick={() => navigate('/student/attendance')} aria-label="Go back">
//                     ←
//                 </button>
//                 <div className="detail-header-info">
//                     <h1 style={{ color: subject.color }}>{subject.name}</h1>
//                     <p>
//                         {subject.code} · Daily Attendance Record · Semester 5
//                     </p>
//                 </div>
//                 <div
//                     style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 10,
//                         background: `${subject.color}22`,
//                         border: `1.5px solid ${subject.color}55`,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         fontSize: '1.3rem',
//                         flexShrink: 0,
//                     }}
//                 >
//                     📚
//                 </div>
//             </header>

//             <div className="detail-content">
//                 {/* Summary chips */}
//                 <div className="detail-summary">
//                     <div className={`detail-chip ${chipClass}`}>
//                         <span className="chip-val">{attendancePct}%</span>
//                         <span className="chip-lbl">Attendance</span>
//                     </div>
//                     <div className="detail-chip c-blue">
//                         <span className="chip-val">{subject.total}</span>
//                         <span className="chip-lbl">Total Classes</span>
//                     </div>
//                     <div className="detail-chip c-green">
//                         <span className="chip-val">{subject.present}</span>
//                         <span className="chip-lbl">Present</span>
//                     </div>
//                     <div className="detail-chip c-red">
//                         <span className="chip-val">{absent}</span>
//                         <span className="chip-lbl">Absent</span>
//                     </div>
//                     <div className="detail-chip c-purple">
//                         <span className="chip-val" style={{ fontSize: '1rem', paddingTop: 4 }}>
//                             {statusLabel}
//                         </span>
//                         <span className="chip-lbl">Status</span>
//                     </div>
//                 </div>

//                 {/* Daily records grouped by month */}
//                 {grouped.map(([month, entries]) => {
//                     const mPresent = entries.filter((e) => e.status === 'present').length;
//                     return (
//                         <div className="month-group" key={month}>
//                             <div className="month-title">
//                                 {month}
//                                 <span
//                                     style={{
//                                         marginLeft: 8,
//                                         fontSize: '0.7rem',
//                                         padding: '2px 10px',
//                                         borderRadius: 20,
//                                         background: 'rgba(79,142,247,0.12)',
//                                         color: '#4f8ef7',
//                                         letterSpacing: 0.5,
//                                         fontWeight: 600,
//                                         textTransform: 'none',
//                                     }}
//                                 >
//                                     {mPresent}/{entries.length} present
//                                 </span>
//                             </div>

//                             <div className="daily-grid">
//                                 {entries.map((entry, idx) => (
//                                     <div key={idx} className={`day-card ${entry.status}`}>
//                                         <span className="day-num">{entry.dayName}</span>
//                                         <span className="day-date">{entry.date}</span>
//                                         <div className="day-status">
//                                             <span className="day-status-dot" />
//                                             {entry.status === 'present' ? 'Present' : 'Absent'}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }