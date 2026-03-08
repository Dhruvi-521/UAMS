import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart2, BookOpen, Users, GraduationCap, ClipboardList,
    CalendarCheck, FileText, TrendingUp, Bell, Settings,
    Home, PieChart, ChevronRight, Download, Menu, X,
    Award, Activity, Layers, Database, RefreshCw, Users2
} from 'lucide-react';
import ReportCard from '../../layouts/ReportCard';
import './Reports.css'

const reports = [
    {
        icon: BarChart2,
        title: 'Department Performance Report',
        description: 'Comprehensive analysis of academic output, faculty metrics, and student outcomes across all departments.',
        route: '/admin/reports/department-performance',        
        color: '#2556a7',
        bgColor: 'rgba(37,86,167,0.1)',
        badge: 'Active',
        badgeType: 'active',
        meta: [{ label: '10 Depts' }, { label: 'Sem 6' }],
        updated: '2h ago'
    },
    {
        icon: Layers,
        title: 'Program-wise Academic Report',
        description: 'In-depth breakdown of academic metrics by program, including pass rates, GPAs, and course completions.',
        route: '/admin/reports/program-academic',
        color: '#1aa87a',
        bgColor: 'rgba(26,168,122,0.1)',
        badge: 'New',
        badgeType: 'new',
        meta: [{ label: '18 Programs' }, { label: 'Annual' }],
        updated: '5h ago'
    },
    {
        icon: GraduationCap,
        title: 'Student Performance Analytics',
        description: 'Individual and cohort-level analytics covering grades, attendance, assessments, and progression trends.',
        route: '/admin/reports/student-performance',
        color: '#6b46c1',
        bgColor: 'rgba(107,70,193,0.1)',
        badge: 'Active',
        badgeType: 'active',
        meta: [{ label: '1,250 Students' }, { label: 'Live' }],
        updated: '1h ago'
    },
    {
        icon: Users2,
        title: 'Faculty Workload Analysis',
        description: 'Detailed workload distribution, teaching hours, mentoring load, and research contribution per faculty.',
        route: '/admin/reports/faculty-workload',
        color: '#0e8fa3',
        bgColor: 'rgba(14,143,163,0.1)',
        badge: 'Pending',
        badgeType: 'pending',
        meta: [{ label: '85 Faculty' }, { label: 'Monthly' }],
        updated: '1d ago'
    },
    {
        icon: Award,
        title: 'Course Outcome Achievement',
        description: 'Tracks attainment of defined course outcomes and program outcomes based on assessment data.',
        route: '/admin/reports/course-outcome',
        color: '#f07b34',
        bgColor: 'rgba(240,123,52,0.1)',
        badge: 'Active',
        badgeType: 'active',
        meta: [{ label: '32 Courses' }, { label: 'OBE' }],
        updated: '3h ago'
    },
    {
        icon: CalendarCheck,
        title: 'Attendance Analytics',
        description: 'Monitor student and faculty attendance patterns, trends, defaulters, and department-wise breakdowns.',
        route: '/admin/reports/attendance',
        color: '#e05252',
        bgColor: 'rgba(224,82,82,0.1)',
        badge: 'Active',
        badgeType: 'active',
        meta: [{ label: '87% Avg' }, { label: 'Daily' }],
        updated: '30m ago'
    },
    {
        icon: FileText,
        title: 'Examination Result Statistics',
        description: 'Semester exam results with pass/fail ratios, grade distributions, topper lists, and backlog analysis.',
        route: '/admin/reports/exam-statistics',
        color: '#7c59d4',
        bgColor: 'rgba(124,89,212,0.1)',
        badge: 'New',
        badgeType: 'new',
        meta: [{ label: 'Sem 5 Results' }, { label: 'Latest' }],
        updated: '6h ago'
    },
    {
        icon: Database,
        title: 'Research & Publication Report',
        description: 'Faculty research output, publications in journals, conference papers, patents, and funding received.',
        route: '/admin/reports/research',
        color: '#1a3a6b',
        bgColor: 'rgba(26,58,107,0.1)',
        badge: 'Active',
        badgeType: 'active',
        meta: [{ label: '24 Papers' }, { label: 'Annual' }],
        updated: '12h ago'
    },
];

const navItems = [
    { icon: Home, label: 'ReportsAnalysis', active: true },
    { icon: BarChart2, label: 'Reports & Analysis', active: false },
    { icon: GraduationCap, label: 'Students', active: false },
    { icon: Users, label: 'Faculty', active: false },
    { icon: BookOpen, label: 'Courses', active: false },
    { icon: CalendarCheck, label: 'Attendance', active: false },
    { icon: FileText, label: 'Examinations', active: false },
    { icon: PieChart, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
];

const quickStats = [
    { label: 'Overall Attendance', value: 87, color: '#2556a7' },
    { label: 'Course Completion', value: 76, color: '#1aa87a' },
    { label: 'Faculty Rating', value: 92, color: '#6b46c1' },
    { label: 'CO Attainment', value: 68, color: '#f07b34' },
    { label: 'Pass Percentage', value: 89, color: '#e05252' },
];

const activities = [
    { color: '#1aa87a', text: 'Semester 6 results uploaded by Exam Cell', time: '2 hours ago' },
    { color: '#2556a7', text: 'Faculty workload report generated for Q1 2024', time: '5 hours ago' },
    { color: '#6b46c1', text: 'Student attendance defaulter list flagged (42 students)', time: '8 hours ago' },
    { color: '#f07b34', text: 'Course outcome assessment completed – CSE Dept', time: '1 day ago' },
    { color: '#e05252', text: 'New research publication added by Dr. Ramesh Kumar', time: '2 days ago' },
];

const ReportsAnalysis = () => {
    const navigate = useNavigate();

    return (
        <div className="rp-reports-page">
            <div className="reports-page">
                {/* Topbar */}
                <header className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="topbar-left">
                            <h1>Reports & Analysis</h1>
                            <p>University Academic Management System</p>
                        </div>
                    </div>
                    <div className="topbar-right">
                        <div className="topbar-filters">
                            <select className="filter-select">
                                <option>This Semester</option>
                                <option>Last Semester</option>
                                <option>Annual 2024</option>
                            </select>
                            <select className="filter-select">
                                <option>Jan 2024 – Apr 2024</option>
                                <option>Aug 2024 – Dec 2024</option>
                            </select>
                        </div>
                        <button className="btn-generate">
                            <RefreshCw size={14} /> Generate
                        </button>
                        {/* <button className="topbar-icon-btn">
                            <Bell size={16} />
                            <span className="notif-badge">3</span>
                        </button>
                        <button className="topbar-icon-btn">
                            <Settings size={16} />
                        </button> */}
                    </div>
                </header>

                {/* Content */}
                <main className="page-content">
                    {/* Stats Row */}
                    <div className="stats-row">
                        {[
                            { icon: GraduationCap, value: '1,250', label: 'Total Students', trend: '+4.2%', up: true, cls: 'blue' },
                            { icon: Users, value: '85', label: 'Faculty Members', trend: '+2 new', up: true, cls: 'green' },
                            { icon: BookOpen, value: '32', label: 'Active Courses', trend: '+3 this sem', up: true, cls: 'purple' },
                            { icon: Activity, value: '87%', label: 'Overall Attendance', trend: '-1.2%', up: false, cls: 'red' },
                        ].map((s) => (
                            <div className="stat-card" key={s.label}>
                                <div className={`stat-icon ${s.cls}`}><s.icon size={22} /></div>
                                <div className="stat-info">
                                    <div className="stat-value">{s.value}</div>
                                    <div className="stat-label">{s.label}</div>
                                    <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>
                                        {s.up ? '↑' : '↓'} {s.trend}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reports Grid */}
                    <div className="section-header">
                        <div>
                            <div className="section-title">Academic Reports</div>
                            <div className="section-subtitle">Click any card to view the full detailed report</div>
                        </div>
                    </div>

                    <div className="reports-grid">
                        {reports.map((r) => (
                            <ReportCard key={r.route} report={r} />
                        ))}
                    </div>

                    {/* Bottom Panels */}
                    <div className="bottom-panels">
                        <div className="panel-card">
                            <div className="panel-title">
                                <TrendingUp size={16} color="#2556a7" /> Performance Overview
                            </div>
                            <div className="quick-stats-list">
                                {quickStats.map((qs) => (
                                    <div className="qs-row" key={qs.label}>
                                        <span className="qs-label">{qs.label}</span>
                                        <div className="qs-bar-wrap">
                                            <div className="qs-bar" style={{ width: `${qs.value}%`, background: qs.color }} />
                                        </div>
                                        <span className="qs-value">{qs.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="panel-card">
                            <div className="panel-title">
                                <Activity size={16} color="#6b46c1" /> Recent Activity
                            </div>
                            <div className="activity-list">
                                {activities.map((a, i) => (
                                    <div className="activity-item" key={i}>
                                        <div className="activity-dot" style={{ background: a.color }} />
                                        <div>
                                            <div className="activity-text">{a.text}</div>
                                            <div className="activity-time">{a.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default ReportsAnalysis;
