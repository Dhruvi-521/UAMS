import React from 'react';
import { useNavigate } from 'react-router-dom';
import './attendance.css';

const mockSubjects = [
    { id: 'data-structures', name: 'Data Structures', total: 33, present: 28, absent: 5, percent: 85, color: '#4A90E2' },
    { id: 'applied-mathematics', name: 'Applied Mathematics', total: 30, present: 27, absent: 3, percent: 90, color: '#50C878' },
    { id: 'operating-systems', name: 'Operating Systems', total: 27, present: 21, absent: 6, percent: 78, color: '#FFB347' },
    { id: 'hci', name: 'Human Computer Interaction', total: 39, present: 32, absent: 7, percent: 82, color: '#9B59B6' },
];

const StudentAttendance = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h2 className="page-title">Student Attendance</h2>

            {/* Row 1: Summary Cards */}
            <div className="summary-grid">
                <div className="card summary-card overall">
                    <h3>Overall Attendance %</h3>
                    <div className="stat-value">85%</div>
                    <p>Consistent attendance is key.</p>
                </div>
                <div className="card summary-card present">
                    <h3>Total Present Days</h3>
                    <div className="stat-value">110 / 129</div>
                    <p>Total days present this semester.</p>
                </div>
                <div className="card summary-card absent">
                    <h3>Total Absent Days</h3>
                    <div className="stat-value">19</div>
                    <p>Total classes missed.</p>
                </div>
            </div>

            {/* Row 2: Circular Progress Grid */}
            <div className="card progress-section">
                <h3>Subject-wise Attendance Progress</h3>
                <div className="progress-grid">
                    {mockSubjects.map((sub) => (
                        <div key={sub.id} className="progress-item">
                            <div className="circular-progress" style={{
                                background: `conic-gradient(${sub.color} ${sub.percent * 3.6}deg, #ededed 0deg)`
                            }}>
                                <div className="inner-circle">
                                    <span>{sub.percent}%</span>
                                </div>
                            </div>
                            <h4>{sub.name}</h4>
                            <p>{sub.present}/{sub.total} Classes</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 3: Attendance Table */}
            <div className="card table-section">
                <h3>Subject-wise Attendance</h3>
                <div className="responsive-table-container">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Total Classes</th>
                                <th>Present</th>
                                <th>Absent</th>
                                <th>Attendance %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockSubjects.map((sub) => (
                                <tr key={sub.id} onClick={() => navigate(`/student/attendance/${sub.id}`)} className="clickable-row">
                                    <td data-label="Subject"><strong>{sub.name}</strong></td>
                                    <td data-label="Total Classes">{sub.total}</td>
                                    <td data-label="Present">{sub.present}</td>
                                    <td data-label="Absent">{sub.absent}</td>
                                    <td data-label="Attendance %" style={{ color: sub.color, fontWeight: 'bold' }}>{sub.percent}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;




// import { useNavigate } from 'react-router-dom';
// import './Attendance1.css';

// // ── Mock Data ──────────────────────────────────────────────────────────────
// export const SUBJECTS = [
//     {
//         id: 'data-structures',
//         name: 'Data Structures',
//         code: 'CS301',
//         color: '#4f8ef7',
//         total: 42,
//         present: 38,
//     },
//     {
//         id: 'applied-mathematics',
//         name: 'Applied Mathematics',
//         code: 'MA201',
//         color: '#2dd4a0',
//         total: 38,
//         present: 28,
//     },
//     {
//         id: 'operating-systems',
//         name: 'Operating Systems',
//         code: 'CS302',
//         color: '#a78bfa',
//         total: 40,
//         present: 35,
//     },
//     {
//         id: 'human-computer-interaction',
//         name: 'Human Computer Interaction',
//         code: 'CS410',
//         color: '#ff8c42',
//         total: 36,
//         present: 22,
//     },
// ];

// // ── Helpers ───────────────────────────────────────────────────────────────
// const pct = (present, total) => Math.round((present / total) * 100);

// const badgeClass = (p) => (p >= 75 ? 'safe' : p >= 60 ? 'warn' : 'danger');

// const CIRCUMFERENCE = 2 * Math.PI * 46; // r=46

// // ── Circular Progress ─────────────────────────────────────────────────────
// function CircleProgress({ subject }) {
//     const p = pct(subject.present, subject.total);
//     const offset = CIRCUMFERENCE - (p / 100) * CIRCUMFERENCE;
//     const cls = badgeClass(p);
//     const label = cls === 'safe' ? 'On Track' : cls === 'warn' ? 'At Risk' : 'Critical';

//     return (
//         <div className="progress-item">
//             <div className="circle-wrap">
//                 <svg viewBox="0 0 100 100">
//                     <circle className="circle-bg" cx="50" cy="50" r="46" />
//                     <circle
//                         className="circle-fill"
//                         cx="50"
//                         cy="50"
//                         r="46"
//                         stroke={subject.color}
//                         strokeDasharray={CIRCUMFERENCE}
//                         strokeDashoffset={offset}
//                     />
//                 </svg>
//                 <div className="circle-center">
//                     <span className="pct" style={{ color: subject.color }}>
//                         {p}
//                         <span className="pct-sign">%</span>
//                     </span>
//                 </div>
//             </div>
//             <div className="progress-label">{subject.name}</div>
//             <span className={`progress-badge ${cls}`}>{label}</span>
//         </div>
//     );
// }

// // ── Main Component ────────────────────────────────────────────────────────
// export default function StudentAttendance() {
//     const navigate = useNavigate();

//     const totalClasses = SUBJECTS.reduce((s, sub) => s + sub.total, 0);
//     const totalPresent = SUBJECTS.reduce((s, sub) => s + sub.present, 0);
//     const totalAbsent = totalClasses - totalPresent;
//     const overallPct = pct(totalPresent, totalClasses);

//     const handleRowClick = (subjectId) => {
//         navigate(`/student/attendance/${subjectId}`);
//     };

//     return (
//         <div className="att-page">
//             {/* Header */}
//             <header className="att-header">
//                 <div className="att-header-icon">🎓</div>
//                 <div className="att-header-text">
//                     <h1>Attendance Dashboard</h1>
//                     <p>Academic Year 2024–25 · Semester 5</p>
//                 </div>
//             </header>

//             <main className="att-content">
//                 {/* ── Row 1: Summary Cards ── */}
//                 <section>
//                     <div className="att-section-label">Overview</div>
//                     <div className="summary-cards">
//                         {/* Overall % */}
//                         <div className="summary-card blue">
//                             <div className="summary-icon">📊</div>
//                             <div className="summary-info">
//                                 <div className="label">Overall Attendance</div>
//                                 <div className="value">{overallPct}%</div>
//                                 <div className="sub">{overallPct >= 75 ? '✅ Meets requirement' : '⚠️ Below 75%'}</div>
//                             </div>
//                         </div>

//                         {/* Total Present */}
//                         <div className="summary-card green">
//                             <div className="summary-icon">✅</div>
//                             <div className="summary-info">
//                                 <div className="label">Total Present Days</div>
//                                 <div className="value">{totalPresent}</div>
//                                 <div className="sub">out of {totalClasses} classes</div>
//                             </div>
//                         </div>

//                         {/* Total Absent */}
//                         <div className="summary-card red">
//                             <div className="summary-icon">❌</div>
//                             <div className="summary-info">
//                                 <div className="label">Total Absent Days</div>
//                                 <div className="value">{totalAbsent}</div>
//                                 <div className="sub">{totalAbsent} classes missed</div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* ── Row 2: Circular Progress ── */}
//                 <section>
//                     <div className="progress-section">
//                         <div className="progress-section-header">
//                             <div className="progress-dot" />
//                             <h2>Subject-wise Attendance Progress</h2>
//                         </div>
//                         <div className="progress-grid">
//                             {SUBJECTS.map((sub) => (
//                                 <CircleProgress key={sub.id} subject={sub} />
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* ── Row 3: Subject Table ── */}
//                 <section>
//                     <div className="table-section">
//                         <div className="table-header">
//                             <h2>Subject-wise Attendance</h2>
//                             <div className="table-hint">
//                                 <span>👆</span> Click a row to view daily details
//                             </div>
//                         </div>

//                         {/* Desktop Table */}
//                         <div className="att-table-wrap">
//                             <table className="att-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Subject</th>
//                                         <th>Total Classes</th>
//                                         <th>Present</th>
//                                         <th>Absent</th>
//                                         <th>Attendance %</th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {SUBJECTS.map((sub) => {
//                                         const p = pct(sub.present, sub.total);
//                                         return (
//                                             <tr key={sub.id} onClick={() => handleRowClick(sub.id)}>
//                                                 <td>
//                                                     <div className="subject-cell">
//                                                         <span
//                                                             className="subject-dot"
//                                                             style={{ background: sub.color }}
//                                                         />
//                                                         <div>
//                                                             <div className="subject-name">{sub.name}</div>
//                                                             <div className="subject-code">{sub.code}</div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>{sub.total}</td>
//                                                 <td style={{ color: '#2dd4a0', fontWeight: 600 }}>{sub.present}</td>
//                                                 <td style={{ color: '#f25c7a', fontWeight: 600 }}>
//                                                     {sub.total - sub.present}
//                                                 </td>
//                                                 <td>
//                                                     <span className={`att-pct-badge ${badgeClass(p)}`}>
//                                                         {p}%
//                                                     </span>
//                                                 </td>
//                                                 <td className="row-arrow">›</td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>

//                         {/* Mobile Cards (shown on small screens via CSS) */}
//                         <div className="mobile-table-cards">
//                             <div className="mobile-cards-list">
//                                 {SUBJECTS.map((sub) => {
//                                     const p = pct(sub.present, sub.total);
//                                     return (
//                                         <div
//                                             key={sub.id}
//                                             className="mobile-subj-card"
//                                             onClick={() => handleRowClick(sub.id)}
//                                         >
//                                             <div className="mobile-subj-left">
//                                                 <span
//                                                     className="subject-dot"
//                                                     style={{
//                                                         background: sub.color,
//                                                         width: 12,
//                                                         height: 12,
//                                                         borderRadius: '50%',
//                                                         display: 'inline-block',
//                                                     }}
//                                                 />
//                                                 <div className="mobile-subj-info">
//                                                     <div className="name">{sub.name}</div>
//                                                     <div className="meta">
//                                                         {sub.code} · {sub.total} classes · Present: {sub.present}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="mobile-subj-right">
//                                                 <span className={`att-pct-badge ${badgeClass(p)}`}>{p}%</span>
//                                                 <span style={{ color: '#7b82a8', fontSize: '1rem' }}>›</span>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// }