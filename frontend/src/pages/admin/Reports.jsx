import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, Download, Printer, Share2, Filter,
    BarChart2, TrendingUp, TrendingDown, Minus, BarChart
} from 'lucide-react';
import './Reports.css';

const reportConfig = {
    'department-performance': {
        title: 'Department Performance reports',
        subtitle: 'Comprehensive performance metrics across all academic departments',
        color: '#2556a7',
        summaryCards: [
            { value: '10', label: 'Total Departments', change: null, color: '#2556a7' },
            { value: '8.9', label: 'Avg Faculty Rating', change: '+0.3', up: true, color: '#1aa87a' },
            { value: '87%', label: 'Avg Attendance', change: '-1.2%', up: false, color: '#e05252' },
            { value: '1,250', label: 'Total Students', change: '+4.2%', up: true, color: '#6b46c1' },
        ],
        tableHeaders: ['Department', 'Faculty', 'Students', 'Avg Attendance', 'Pass %', 'Rating', 'Status'],
        tableData: [
            ['Computer Science', '18', '320', '89%', '92%', '9.1', 'excellent'],
            ['Electronics & Comm.', '15', '280', '85%', '88%', '8.7', 'good'],
            ['Mechanical Eng.', '14', '260', '82%', '84%', '8.4', 'good'],
            ['Civil Engineering', '12', '210', '79%', '81%', '8.1', 'good'],
            ['Information Tech.', '10', '180', '91%', '94%', '9.3', 'excellent'],
            ['Chemical Eng.', '8', '140', '77%', '79%', '7.9', 'average'],
            ['MBA', '6', '160', '83%', '87%', '8.5', 'good'],
        ],
    },
    'program-academic': {
        title: 'Program-wise Academic reports',
        subtitle: 'Academic performance breakdown by program and specialisation',
        color: '#1aa87a',
        summaryCards: [
            { value: '18', label: 'Total Programs', change: null, color: '#1aa87a' },
            { value: '7.8', label: 'Avg CGPA', change: '+0.2', up: true, color: '#2556a7' },
            { value: '91%', label: 'Completion Rate', change: '+3%', up: true, color: '#6b46c1' },
            { value: '24', label: 'Active Electives', change: '+4', up: true, color: '#f07b34' },
        ],
        tableHeaders: ['Program', 'Sem', 'Enrolled', 'Avg CGPA', 'Pass Rate', 'Dropouts', 'Status'],
        tableData: [
            ['B.Tech – CSE', 'Sem 6', '120', '8.4', '94%', '2', 'excellent'],
            ['B.Tech – ECE', 'Sem 6', '110', '8.0', '90%', '3', 'good'],
            ['B.Tech – ME', 'Sem 6', '100', '7.7', '86%', '5', 'good'],
            ['M.Tech – CSE', 'Sem 2', '40', '8.9', '97%', '0', 'excellent'],
            ['MBA', 'Sem 4', '60', '8.2', '93%', '1', 'good'],
            ['BCA', 'Sem 4', '80', '7.5', '84%', '6', 'average'],
        ],
    },
    'student-performance': {
        title: 'Student Performance Analytics',
        subtitle: 'Individual and cohort analytics covering academic progress and achievement',
        color: '#6b46c1',
        summaryCards: [
            { value: '1,250', label: 'Total Students', change: null, color: '#6b46c1' },
            { value: '78%', label: 'Above Average', change: '+5%', up: true, color: '#1aa87a' },
            { value: '12%', label: 'Academic Risk', change: '-2%', up: true, color: '#e05252' },
            { value: '3.4%', label: 'Top Performers', change: '+0.8%', up: true, color: '#2556a7' },
        ],
        tableHeaders: ['Student', 'Roll No.', 'Program', 'CGPA', 'Attendance', 'Backlogs', 'Status'],
        tableData: [
            ['Surya Sharma', 'CS2101', 'B.Tech CSE', '9.4', '95%', '0', 'excellent'],
            ['Meera Singh', 'CS2102', 'B.Tech CSE', '9.1', '91%', '0', 'excellent'],
            ['Raj Patel', 'EC2108', 'B.Tech ECE', '8.7', '88%', '0', 'good'],
            ['Anita Rao', 'ME2115', 'B.Tech ME', '8.2', '82%', '1', 'good'],
            ['Vikram Nair', 'CS2119', 'B.Tech CSE', '7.8', '74%', '2', 'average'],
            ['Divya Menon', 'MBA101', 'MBA', '8.5', '89%', '0', 'good'],
        ],
    },
    'faculty-workload': {
        title: 'Faculty Workload Analysis',
        subtitle: 'Teaching hours, mentoring, research output, and workload distribution',
        color: '#0e8fa3',
        summaryCards: [
            { value: '85', label: 'Total Faculty', change: null, color: '#0e8fa3' },
            { value: '18.4', label: 'Avg Hours/Week', change: '-0.6', up: true, color: '#2556a7' },
            { value: '92%', label: 'Rating Score', change: '+1.2%', up: true, color: '#1aa87a' },
            { value: '24', label: 'Research Papers', change: '+6', up: true, color: '#6b46c1' },
        ],
        tableHeaders: ['Faculty', 'Department', 'Courses', 'Teaching Hrs', 'Mentoring', 'Research', 'Load'],
        tableData: [
            ['Dr. Ramesh Kumar', 'CSE', '4', '16 hrs/wk', '12 students', '3 papers', 'excellent'],
            ['Prof. Anjali Verma', 'ECE', '3', '14 hrs/wk', '8 students', '1 paper', 'good'],
            ['Dr. Suresh Iyer', 'ME', '5', '20 hrs/wk', '15 students', '2 papers', 'average'],
            ['Prof. Priya Das', 'MBA', '4', '18 hrs/wk', '10 students', '0 papers', 'good'],
            ['Dr. Mohan Lal', 'Civil', '3', '12 hrs/wk', '6 students', '4 papers', 'excellent'],
        ],
    },
    'course-outcome': {
        title: 'Course Outcome Achievement',
        subtitle: 'OBE-based attainment levels for course outcomes and program outcomes',
        color: '#f07b34',
        summaryCards: [
            { value: '32', label: 'Total Courses', change: null, color: '#f07b34' },
            { value: '68%', label: 'Avg CO Attainment', change: '+4%', up: true, color: '#1aa87a' },
            { value: '74%', label: 'PO Attainment', change: '+2%', up: true, color: '#2556a7' },
            { value: '8', label: 'Below Target', change: '-3', up: true, color: '#e05252' },
        ],
        tableHeaders: ['Course Code', 'Course Name', 'CO1', 'CO2', 'CO3', 'Avg Attainment', 'Status'],
        tableData: [
            ['CS301', 'Data Structures', '82%', '79%', '74%', '78%', 'good'],
            ['CS302', 'DBMS', '91%', '88%', '85%', '88%', 'excellent'],
            ['EC201', 'Digital Circuits', '74%', '70%', '68%', '71%', 'average'],
            ['ME301', 'Thermodynamics', '65%', '63%', '60%', '63%', 'average'],
            ['CS401', 'Machine Learning', '88%', '85%', '82%', '85%', 'good'],
        ],
    },
    'attendance': {
        title: 'Attendance Analytics',
        subtitle: 'Detailed attendance patterns, defaulters, and department-wise analysis',
        color: '#e05252',
        summaryCards: [
            { value: '87%', label: 'Overall Attendance', change: null, color: '#e05252' },
            { value: '92%', label: 'Faculty Attendance', change: '+1%', up: true, color: '#1aa87a' },
            { value: '42', label: 'Defaulters (<75%)', change: '-8', up: true, color: '#f07b34' },
            { value: '15', label: 'Detained Students', change: '-3', up: true, color: '#6b46c1' },
        ],
        tableHeaders: ['Department', 'Total Students', 'Present Avg', 'Defaulters', 'Detained', 'Faculty %', 'Trend'],
        tableData: [
            ['Computer Science', '320', '89%', '8', '2', '94%', 'good'],
            ['Electronics', '280', '85%', '12', '4', '91%', 'good'],
            ['Mechanical', '260', '82%', '15', '5', '89%', 'average'],
            ['Civil', '210', '79%', '18', '6', '87%', 'average'],
            ['IT', '180', '91%', '4', '1', '96%', 'excellent'],
        ],
    },
    'exam-statistics': {
        title: 'Examination Result Statistics',
        subtitle: 'Semester exam results with grade distributions and performance analysis',
        color: '#7c59d4',
        summaryCards: [
            { value: '89%', label: 'Pass Percentage', change: null, color: '#7c59d4' },
            { value: '7.9', label: 'Avg SGPA', change: '+0.3', up: true, color: '#1aa87a' },
            { value: '134', label: 'Students with Backlog', change: '-22', up: true, color: '#e05252' },
            { value: '38', label: 'University Toppers', change: '+5', up: true, color: '#2556a7' },
        ],
        tableHeaders: ['Subject', 'Appeared', 'Passed', 'Pass %', 'Highest', 'Avg Score', 'Status'],
        tableData: [
            ['Data Structures', '120', '114', '95%', '98', '81.2', 'excellent'],
            ['DBMS', '110', '102', '93%', '97', '79.4', 'excellent'],
            ['Digital Circuits', '100', '88', '88%', '94', '74.1', 'good'],
            ['Thermodynamics', '90', '74', '82%', '91', '70.5', 'good'],
            ['Machine Learning', '80', '66', '83%', '96', '72.8', 'good'],
            ['Engineering Maths', '130', '104', '80%', '100', '68.9', 'average'],
        ],
    },
    'research': {
        title: 'Research & Publication reports',
        subtitle: 'Faculty research contributions, publications, patents, and funding details',
        color: '#1a3a6b',
        summaryCards: [
            { value: '24', label: 'Publications', change: null, color: '#1a3a6b' },
            { value: '6', label: 'Patents Filed', change: '+2', up: true, color: '#1aa87a' },
            { value: '₹12.4L', label: 'Grants Received', change: '+18%', up: true, color: '#f07b34' },
            { value: '8', label: 'Conferences', change: '+3', up: true, color: '#6b46c1' },
        ],
        tableHeaders: ['Faculty', 'Publications', 'Citations', 'Patents', 'Conferences', 'Grants', 'H-Index'],
        tableData: [
            ['Dr. Ramesh Kumar', '6', '142', '2', '3', '₹3.2L', '8'],
            ['Dr. Mohan Lal', '5', '98', '1', '2', '₹2.1L', '6'],
            ['Dr. Suresh Iyer', '4', '76', '0', '1', '₹0', '5'],
            ['Prof. Anjali Verma', '3', '54', '1', '1', '₹1.8L', '4'],
            ['Dr. Priya Nair', '6', '183', '2', '1', '₹5.3L', '9'],
        ],
    },
};

const getBadgeClass = (status) => {
    if (status === 'excellent') return 'tb-excellent';
    if (status === 'good') return 'tb-good';
    if (status === 'average') return 'tb-average';
    return 'tb-low';
};

const Reports = () => {
    const navigate = useNavigate();
    const { reportId } = useParams();
    const [dept, setDept] = useState('All Departments');
    const [program, setProgram] = useState('All Programs');
    const [semester, setSemester] = useState('This Semester');

    const config = reportConfig[reportId] || reportConfig['department-performance'];

    return (
        <div className="rp-reports-page">
            <div className="reports-page">
                <div className="report-shell">
                    <div className="main-area">
                        <main className="report-page">
                            {/* Header */}
                            <div className="rp-header">
                                <div className="rp-header-left">
                                    <div className="rp-breadcrumb">
                                        <button
                                            className="back-btn"
                                            onClick={() => navigate("/admin/reports")}
                                        >
                                            <ArrowLeft size={16} /> Back to Reports
                                        </button>
                                    </div>
                                    <div className="rp-title">{config.title}</div>
                                    <div className="rp-subtitle">{config.subtitle}</div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="rp-filters">
                                <Filter size={16} color="#5b6a8a" />
                                <div className="filter-group">
                                    <label className="filter-label">Department</label>
                                    <select className="filter-select" value={dept} onChange={e => setDept(e.target.value)}>
                                        <option>All Departments</option>
                                        <option>Computer Science</option>
                                        <option>Electronics & Comm.</option>
                                        <option>Mechanical Eng.</option>
                                        <option>Civil Engineering</option>
                                        <option>Information Tech.</option>
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <label className="filter-label">Program</label>
                                    <select className="filter-select" value={program} onChange={e => setProgram(e.target.value)}>
                                        <option>All Programs</option>
                                        <option>B.Tech</option>
                                        <option>M.Tech</option>
                                        <option>MBA</option>
                                        <option>BCA</option>
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <label className="filter-label">Semester</label>
                                    <select className="filter-select" value={semester} onChange={e => setSemester(e.target.value)}>
                                        <option>This Semester</option>
                                        <option>Last Semester</option>
                                        <option>Annual 2024</option>
                                        <option>Annual 2023</option>
                                    </select>
                                </div>
                                <button className="btn-generate" style={{ background: config.color, marginTop: 'auto' }}>
                                    Apply Filters
                                </button>
                            </div>

                            {/* Summary Cards */}
                            <div className="rp-summary-cards">
                                {config.summaryCards.map((card, i) => (
                                    <div className="summary-card" key={i}>
                                        <div className="summary-card-value" style={{ color: card.color }}>{card.value}</div>
                                        <div className="summary-card-label">{card.label}</div>
                                        {card.change && (
                                            <div className={`summary-card-change ${card.up ? 'change-up' : 'change-down'}`}>
                                                {card.up ? '↑' : '↓'} {card.change} vs last period
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Chart Placeholder */}
                            <div className="rp-table-section" style={{ marginBottom: 0, borderBottom: 'none', borderRadius: 'var(--radius) var(--radius) 0 0' }}>
                                <div className="rp-table-header">
                                    <div className="rp-table-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <BarChart size={16} color={config.color} /> Performance Chart
                                    </div>
                                </div>
                            </div>
                            <div className="chart-placeholder" style={{ borderRadius: '0 0 var(--radius) var(--radius)', margin: '0 0 22px 0', borderTop: 'none' }}>
                                <BarChart2 size={48} className="chart-placeholder-icon" />
                                <strong style={{ color: '#5b6a8a' }}>Interactive Chart Area</strong>
                                <span>Integrate Recharts, Chart.js, or D3 here to display visual analytics for this report.</span>
                                <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {['Bar Chart', 'Line Chart', 'Pie Chart', 'Heat Map'].map(t => (
                                        <span key={t} className="meta-pill" style={{ cursor: 'pointer' }}>{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Data Table */}
                            <div className="rp-table-section">
                                <div className="rp-table-header">
                                    <div className="rp-table-title">Detailed Data Table</div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn-export"><Download size={13} /> Export CSV</button>
                                        <button className="btn-export"><Printer size={13} /> Print</button>
                                    </div>
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                {config.tableHeaders.map((h) => (
                                                    <th key={h}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {config.tableData.map((row, ri) => (
                                                <tr key={ri}>
                                                    {row.map((cell, ci) => {
                                                        const isLast = ci === row.length - 1;
                                                        const isStat = !isLast && cell.includes('%');
                                                        return (
                                                            <td key={ci}>
                                                                {isLast ? (
                                                                    <span className={`table-badge ${getBadgeClass(cell)}`}>
                                                                        {cell.charAt(0).toUpperCase() + cell.slice(1)}
                                                                    </span>
                                                                ) : isStat ? (
                                                                    <div className="progress-bar-wrap">
                                                                        <div className="mini-progress">
                                                                            <div
                                                                                className="mini-fill"
                                                                                style={{ width: cell, background: config.color }}
                                                                            />
                                                                        </div>
                                                                        <span style={{ fontSize: 12, fontWeight: 600, minWidth: 36 }}>{cell}</span>
                                                                    </div>
                                                                ) : cell}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Export Bar */}
                            <div className="rp-export-bar" style={{ marginTop: 22 }}>
                                <span className="export-label">Export this report as:</span>
                                <div className="export-btns">
                                    <button className="btn-export"><Download size={13} /> PDF reports</button>
                                    <button className="btn-export"><Download size={13} /> Excel Sheet</button>
                                    <button className="btn-export"><Share2 size={13} /> Share Link</button>
                                    <button className="btn-export primary" style={{ background: config.color, borderColor: config.color }}>
                                        <Printer size={13} /> Print reports
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
