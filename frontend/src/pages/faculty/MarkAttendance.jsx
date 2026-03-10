import { useState } from "react";
import {
  BookOpen, Cpu, Calculator, Network, Briefcase, Code2,
  Database, Radio, Settings, Users, ChevronRight, CheckCircle2,
  XCircle, UserCircle2, ArrowLeft, Send, GraduationCap,
  ClipboardList, BarChart3
} from "lucide-react";
import "./MarkAttendance.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUBJECTS = [
  { id: 1, name: "Robotics & AI",        code: "EE505", semester: "Autumn 2023", program: "B.Tech (ECE)", icon: Cpu },
  { id: 2, name: "Advanced Calculus",    code: "MA302", semester: "Autumn 2023", program: "B.Tech (CSE)", icon: Calculator },
  { id: 3, name: "Computer Networks",    code: "CS401", semester: "Autumn 2023", program: "B.Tech (CSE)", icon: Network },
  { id: 4, name: "Project Management",   code: "MG201", semester: "Autumn 2023", program: "B.Tech (ECE)", icon: Briefcase },
  { id: 5, name: "Software Engineering", code: "SE405", semester: "Autumn 2023", program: "B.Tech (ECE)", icon: Code2 },
  { id: 6, name: "Data Structures",      code: "CS301", semester: "Autumn 2023", program: "B.Tech (ECE)", icon: Database },
  { id: 7, name: "Signals & Systems",    code: "EE301", semester: "Autumn 2023", program: "B.Tech (ECE)", icon: Radio },
  { id: 8, name: "Operating Systems",    code: "CS302", semester: "Autumn 2023", program: "B.Tech (CSE)", icon: Settings },
];

const DIVISIONS = ["A", "B", "C", "D"];

const STUDENTS = [
  { id: 1,  name: "Priya Sharma",  roll: "1"},
  { id: 2,  name: "Vikram Singh",  roll: "2"},
  { id: 3,  name: "Aisha Khan",    roll: "3"},
  { id: 4,  name: "Amira Singh",   roll: "4"},
  { id: 5,  name: "Sanlam Singh",  roll: "5"},
  { id: 6,  name: "Rnnta Shan",    roll: "6"},
  { id: 7,  name: "Arjun Patel",   roll: "7"},
  { id: 8,  name: "Shara Sharma",  roll: "8"},
  { id: 9,  name: "Dev Mehta",     roll: "9"},
  { id: 10, name: "Kavya Reddy",   roll: "10"},
];

const AVATAR_COLORS = [
  "#3b82f6","#8b5cf6","#ec4899","#f59e0b",
  "#10b981","#ef4444","#06b6d4","#f97316","#6366f1","#14b8a6"
];

// ─── Shared Header ─────────────────────────────────────────────────────────────

function PageHeader({ title, subtitle }) {
  return (
    <div className="fact-att-page-header">
      <div className="fact-att-header-badge">
        <GraduationCap size={16} />
        <span>Faculty: Dr. Anya Sharma</span>
        <span className="fact-att-dot">·</span>
        <span>Oct 26, 2023</span>
      </div>
      <h1 className="fact-att-page-title">{title}</h1>
      {/* {subtitle && <p className="fact-att-page-subtitle">{subtitle}</p>} */}
    </div>
  );
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────────

function Breadcrumb({ step }) {
  const steps = ["Subject", "Division", "Attendance"];
  return (
    <div className="fact-att-breadcrumb">
      {steps.map((s, i) => (
        <span key={s} className="fact-att-breadcrumb-item">
          <span className={`fact-att-crumb ${i < step ? "fact-att-crumb-done" : i === step ? "fact-att-crumb-active" : "fact-att-crumb-idle"}`}>
            {i < step
              ? <CheckCircle2 size={13} />
              : <span className="fact-att-crumb-num">{i + 1}</span>}
            {s}
          </span>
          {i < steps.length - 1 && <ChevronRight size={14} className="fact-att-crumb-arrow" />}
        </span>
      ))}
    </div>
  );
}

// ─── Page 1: Subject Selection ─────────────────────────────────────────────────

function SubjectSelection({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className="fact-att-page-wrapper">
      <PageHeader
        title="Select Subject for Attendance"
        subtitle="Choose the subject you're marking attendance for today"
      />
      <Breadcrumb step={0} />

      <div className="fact-att-subject-grid">
        {SUBJECTS.map((subj) => {
          const Icon = subj.icon;
          const isSelected = selected?.id === subj.id;
          return (
            <div
              key={subj.id}
              className={`fact-att-subject-card${isSelected ? " fact-att-subject-card-selected" : ""}${hovered === subj.id ? " fact-att-subject-card-hovered" : ""}`}
              onClick={() => setSelected(subj)}
              onMouseEnter={() => setHovered(subj.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {isSelected && <div className="fact-att-card-ring" />}
              <div className={`fact-att-card-icon-wrap${isSelected ? " fact-att-card-icon-active" : ""}`}>
                <Icon size={28} strokeWidth={1.6} />
              </div>
              <h3 className="fact-att-card-title">{subj.name}</h3>
              <p className="fact-att-card-code">{subj.code}</p>
              <div className="fact-att-card-meta">
                <div className="fact-att-meta-row"><BookOpen size={12} />{subj.name}</div>
                <div className="fact-att-meta-row"><ClipboardList size={12} />{subj.code}</div>
                <div className="fact-att-meta-row"><BarChart3 size={12} />{subj.semester}</div>
                <div className="fact-att-meta-row"><GraduationCap size={12} />{subj.program}</div>
              </div>
              {isSelected && (
                <div className="fact-att-card-selected-badge">
                  <CheckCircle2 size={14} /> Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fact-att-page-footer">
        <button
          className={`fact-att-btn-primary${!selected ? " fact-att-btn-disabled" : ""}`}
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
        >
          Confirm Subject Selection <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Page 2: Division Selection ────────────────────────────────────────────────

function DivisionSelection({ subject, onSelect, onBack }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="fact-att-page-wrapper">
      <PageHeader title="Select Division" />
      <Breadcrumb step={1} />

      <div className="fact-att-context-pill">
        <BookOpen size={14} />
        <span>Subject: <strong>{subject.name}</strong> — {subject.code}</span>
      </div>

      <div className="fact-att-division-grid">
        {DIVISIONS.map((div) => {
          const isSelected = selected === div;
          return (
            <div
              key={div}
              className={`fact-att-division-card${isSelected ? " fact-att-division-card-selected" : ""}`}
              onClick={() => setSelected(div)}
            >
              {isSelected && <div className="fact-att-div-glow" />}
              <div className={`fact-att-div-icon-wrap${isSelected ? " fact-att-div-icon-active" : ""}`}>
                <Users size={36} strokeWidth={1.4} />
              </div>
              <h2 className="fact-att-div-label">Division {div}</h2>
              <p className="fact-att-div-sub">BTech-CSE-2023</p>
              {isSelected && (
                <div className="fact-att-div-check"><CheckCircle2 size={16} /></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fact-att-page-footer">
        <button className="fact-att-btn-outline" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <button
          className={`fact-att-btn-primary${!selected ? " fact-att-btn-disabled" : ""}`}
          onClick={() => selected && onSelect(selected)}
          disabled={!selected}
        >
          Confirm Division Selection <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ─── Page 3: Attendance ────────────────────────────────────────────────────────

function AttendancePage({ subject, division, onBack }) {
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(STUDENTS.map(s => [s.id, null]))
  );
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id, val) =>
    setAttendance(prev => ({ ...prev, [id]: val }));

  const presentCount = Object.values(attendance).filter(v => v === true).length;
  const absentCount  = Object.values(attendance).filter(v => v === false).length;
  const unmarked     = Object.values(attendance).filter(v => v === null).length;

  if (submitted) {
    return (
      <div className="fact-att-page-wrapper fact-att-center-content">
        <div className="fact-att-success-card">
          <div className="fact-att-success-icon"><CheckCircle2 size={56} /></div>
          <h2 className="fact-att-success-title">Attendance Submitted!</h2>
          <p className="fact-att-success-msg">
            Records saved for <strong>{subject.name}</strong> — Division <strong>{division}</strong>
          </p>
          <div className="fact-att-success-stats">
            <div className="fact-att-stat fact-att-stat-present">
              <span>{presentCount}</span>Present
            </div>
            <div className="fact-att-stat fact-att-stat-absent">
              <span>{absentCount}</span>Absent
            </div>
          </div>
          <button className="fact-att-btn-primary" onClick={onBack} style={{ marginTop: "1.5rem" }}>
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fact-att-page-wrapper">
      <PageHeader title="Take Attendance" />
      <Breadcrumb step={2} />

      <div className="fact-att-context-pill">
        <BookOpen size={14} />
        <span>
          <strong>{subject.name}</strong> · Division <strong>{division}</strong> · BTech-CSE-2023
        </span>
      </div>

      {/* Live counters */}
      <div className="fact-att-stats-bar">
        <div className="fact-att-stat-box fact-att-stat-box-present">
          <CheckCircle2 size={20} />
          <div>
            <span className="fact-att-stat-count">{presentCount}</span>
            <span className="fact-att-stat-label">Present</span>
          </div>
        </div>
        <div className="fact-att-stat-box fact-att-stat-box-absent">
          <XCircle size={20} />
          <div>
            <span className="fact-att-stat-count">{absentCount}</span>
            <span className="fact-att-stat-label">Absent</span>
          </div>
        </div>
        <div className="fact-att-stat-box fact-att-stat-box-unmarked">
          <UserCircle2 size={20} />
          <div>
            <span className="fact-att-stat-count">{unmarked}</span>
            <span className="fact-att-stat-label">Unmarked</span>
          </div>
        </div>
        <div className="fact-att-stat-box fact-att-stat-box-total">
          <Users size={20} />
          <div>
            <span className="fact-att-stat-count">{STUDENTS.length}</span>
            <span className="fact-att-stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* Student list - single column */}
      <div className="fact-att-student-list">
        <div className="fact-att-list-header">
          <span>Student</span>
          <span>Attendance</span>
        </div>
        {STUDENTS.map((student, i) => {
          const status = attendance[student.id];
          return (
            <div
              key={student.id}
              className={`fact-att-student-row${status === true ? " fact-att-row-present" : status === false ? " fact-att-row-absent" : ""}`}
            >
              <div className="fact-att-student-info">
                {/* <div
                  className="fact-att-avatar"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {student.avatar}
                </div> */}
                <div className="fact-att-student-text">
                  <span className="fact-att-student-name">{student.name}</span>
                  <span className="fact-att-student-roll">{student.roll}</span>
                </div>
              </div>
              <div className="fact-att-toggle-group">
                <button
                  className={`fact-att-toggle-btn fact-att-present-btn${status === true ? " fact-att-toggle-active" : ""}`}
                  onClick={() => toggle(student.id, true)}
                >
                  <CheckCircle2 size={15} /> Present
                </button>
                <button
                  className={`fact-att-toggle-btn fact-att-absent-btn${status === false ? " fact-att-toggle-active" : ""}`}
                  onClick={() => toggle(student.id, false)}
                >
                  <XCircle size={15} /> Absent
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fact-att-page-footer">
        <button className="fact-att-btn-outline" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <button
          className={`fact-att-btn-primary${unmarked > 0 ? " fact-att-btn-warn" : ""}`}
          onClick={() => setSubmitted(true)}
        >
          <Send size={16} />
          Submit Attendance
          {unmarked > 0 && <span className="fact-att-warn-badge">{unmarked} unmarked</span>}
        </button>
      </div>
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────

export default function MarkAttendance() {
  const [page, setPage]         = useState(0);
  const [subject, setSubject]   = useState(null);
  const [division, setDivision] = useState(null);

  function handleSubject(subj)  { setSubject(subj); setPage(1); }
  function handleDivision(div)  { setDivision(div); setPage(2); }
  function handleBack()         { setPage(p => Math.max(0, p - 1)); }
  function handleReset()        { setPage(0); setSubject(null); setDivision(null); }

  return (
    <div className="fact-att-shell">
      <div className="fact-att-blob fact-att-blob-1" />
      <div className="fact-att-blob fact-att-blob-2" />

      {page === 0 && <SubjectSelection onSelect={handleSubject} />}
      {page === 1 && (
        <DivisionSelection subject={subject} onSelect={handleDivision} onBack={handleBack} />
      )}
      {page === 2 && (
        <AttendancePage subject={subject} division={division} onBack={handleReset} />
      )}
    </div>
  );
}