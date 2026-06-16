import { useState, useEffect } from "react";
import {
  BookOpen,
  Cpu,
  Calculator,
  Network,
  Briefcase,
  Code2,
  Database,
  Radio,
  Settings,
  Users,
  ChevronRight,
  CheckCircle2,
  XCircle,
  UserCircle2,
  ArrowLeft,
  Send,
  GraduationCap,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import "./MarkAttendance.css";

const DIVISIONS = ["A", "B", "C", "D"];

const STUDENTS = [
  { id: 1, name: "Priya Sharma", roll: "1" },
  { id: 2, name: "Vikram Singh", roll: "2" },
  { id: 3, name: "Aisha Khan", roll: "3" },
  { id: 4, name: "Amira Singh", roll: "4" },
  { id: 5, name: "Sanlam Singh", roll: "5" },
  { id: 6, name: "Rnnta Shan", roll: "6" },
  { id: 7, name: "Arjun Patel", roll: "7" },
  { id: 8, name: "Shara Sharma", roll: "8" },
  { id: 9, name: "Dev Mehta", roll: "9" },
  { id: 10, name: "Kavya Reddy", roll: "10" },
];

function PageHeader({ title }) {
  return (
    <div className="fact-att-page-header">
      <div className="fact-att-header-badge">
        <GraduationCap size={16} />
        <span>Faculty: Dr. Anya Sharma</span>
        <span className="fact-att-dot">·</span>
        <span>Oct 26, 2023</span>
      </div>
      <h1 className="fact-att-page-title">{title}</h1>
    </div>
  );
}

function Breadcrumb({ step }) {
  const steps = ["Subject", "Division", "Attendance"];
  return (
    <div className="fact-att-breadcrumb">
      {steps.map((s, i) => (
        <span key={s} className="fact-att-breadcrumb-item">
          <span
            className={`fact-att-crumb ${i < step ? "fact-att-crumb-done" : i === step ? "fact-att-crumb-active" : "fact-att-crumb-idle"}`}
          >
            {i < step ? (
              <CheckCircle2 size={13} />
            ) : (
              <span className="fact-att-crumb-num">{i + 1}</span>
            )}
            {s}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight size={14} className="fact-att-crumb-arrow" />
          )}
        </span>
      ))}
    </div>
  );
}

// ─── Page 1: Subject Selection — click card → go directly ─────────────────────
function SubjectSelection({ onSelect, subjects, loading }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="fact-att-page-wrapper">
      {/* <PageHeader title="Select Subject for Attendance" /> */}
      <h1 className="fact-att-page-title">Select Subject for Attendance</h1>
      <Breadcrumb step={0} />

      <div className="fact-att-subject-grid">
        {subjects.map((subj) => {
          const Icon = BookOpen;
          return (
            <div
              key={subj.id}
              className={`fact-att-subject-card${hovered === subj.id ? " fact-att-subject-card-hovered" : ""}`}
              onClick={() => onSelect(subj)}
              onMouseEnter={() => setHovered(subj.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="fact-att-card-icon-wrap">
                <Icon size={28} strokeWidth={1.6} />
              </div>
              <h3 className="fact-att-card-title">{subj.courseName}</h3>

              <p className="fact-att-card-code">{subj.courseId}</p>
              <div className="fact-att-card-meta">
                <div className="fact-att-meta-row">
                  <BookOpen size={12} />
                  {subj.courseName}
                </div>

                <div className="fact-att-meta-row">
                  <ClipboardList size={12} />
                  {subj.courseId}
                </div>

                <div className="fact-att-meta-row">
                  <BarChart3 size={12} />
                  Semester {subj.semesterNumber}
                </div>

                <div className="fact-att-meta-row">
                  <GraduationCap size={12} />
                  {subj.totalCredits} Credits
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page 2: Division Selection — click card → go directly ────────────────────
function DivisionSelection({ subject, onSelect, onBack }) {
  return (
    <div className="fact-att-page-wrapper">
      {/* <PageHeader title="Select Division" /> */}
      <h1 className="fact-att-page-title">Select Division</h1>
      <Breadcrumb step={1} />

      {/* <div className="fact-att-context-pill">
        <BookOpen size={14} />
        <span>
          Subject: <strong>{subject.courseName}</strong> — {subject.courseId}
        </span>
      </div> */}

      <div className="fact-att-division-grid">
        {DIVISIONS.map((div) => (
          <div
            key={div}
            className="fact-att-division-card"
            onClick={() => onSelect(div)}
          >
            <div className="fact-att-div-icon-wrap">
              <Users size={36} strokeWidth={1.4} />
            </div>
            <h2 className="fact-att-div-label">Division {div}</h2>
            {/* <p className="fact-att-div-sub">BTech-CSE-2023</p> */}
          </div>
        ))}
      </div>

      <div className="fact-att-page-footer">
        <button className="fact-att-btn-outline" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    </div>
  );
}

// ─── Page 3: Attendance — default absent, click row to toggle present ──────────
function AttendancePage({ subject, division, onBack }) {
  // default: everyone false (absent)
  const [attendance, setAttendance] = useState(() =>
    Object.fromEntries(STUDENTS.map((s) => [s.id, false])),
  );
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) =>
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = STUDENTS.length - presentCount;

  if (submitted) {
    return (
      <div className="fact-att-page-wrapper fact-att-center-content">
        <div className="fact-att-success-card">
          <div className="fact-att-success-icon">
            <CheckCircle2 size={56} />
          </div>
          <h2 className="fact-att-success-title">Attendance Submitted!</h2>
          <p className="fact-att-success-msg">
            Records saved for <strong>{subject.courseName}</strong> — Division{" "}
            <strong>{division}</strong>
          </p>
          <div className="fact-att-success-stats">
            <div className="fact-att-stat fact-att-stat-present">
              <span>{presentCount}</span>Present
            </div>
            <div className="fact-att-stat fact-att-stat-absent">
              <span>{absentCount}</span>Absent
            </div>
          </div>
          <button
            className="fact-att-btn-primary"
            onClick={onBack}
            style={{ marginTop: "1.5rem" }}
          >
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fact-att-page-wrapper">
      {/* <PageHeader title="Take Attendance" /> */}
      <h1 className="fact-att-page-title">Take Attendance</h1>
      <Breadcrumb step={2} />

      {/* <div className="fact-att-context-pill">
        <BookOpen size={14} />
        <span>
          <strong>{subject.name}</strong> · Division <strong>{division}</strong>{" "}
          · BTech-CSE-2023
        </span>
      </div> */}

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
        <div className="fact-att-stat-box fact-att-stat-box-total">
          <Users size={20} />
          <div>
            <span className="fact-att-stat-count">{STUDENTS.length}</span>
            <span className="fact-att-stat-label">Total</span>
          </div>
        </div>
      </div>

      <div className="fact-att-student-list">
        <div className="fact-att-list-header">
          <span>Student</span>
          <span>Click row to mark Present / Absent</span>
        </div>
        {STUDENTS.map((student) => {
          const isPresent = attendance[student.id];
          return (
            <div
              key={student.id}
              className={`fact-att-student-row fact-att-row-clickable${isPresent ? " fact-att-row-present fact-att-border-present" : " fact-att-row-absent fact-att-border-absent"}`}
              onClick={() => toggle(student.id)}
            >
              <div className="fact-att-student-info">
                <div
                  className={`fact-att-status-dot${isPresent ? " fact-att-dot-present" : " fact-att-dot-absent"}`}
                />
                <div className="fact-att-student-text">
                  <span className="fact-att-student-name">{student.name}</span>
                  <span className="fact-att-student-roll">
                    Roll: {student.roll}
                  </span>
                </div>
              </div>
              <div
                className={`fact-att-presence-badge${isPresent ? " fact-att-badge-present" : " fact-att-badge-absent"}`}
              >
                {isPresent ? (
                  <>
                    <CheckCircle2 size={16} />{" "}
                  </>
                ) : (
                  <>
                    <XCircle size={16} />{" "}
                  </>
                )}
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
          className="fact-att-btn-primary"
          onClick={() => setSubmitted(true)}
        >
          <Send size={16} /> Submit Attendance
        </button>
      </div>
    </div>
  );
}

export default function MarkAttendance() {
  const [page, setPage] = useState(0);
  const [subject, setSubject] = useState(null);
  const [division, setDivision] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/faculty-course/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setSubjects(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleSubject(subj) {
    setSubject(subj);
    setPage(1);
  }
  function handleDivision(div) {
    setDivision(div);
    setPage(2);
  }
  function handleBack() {
    setPage((p) => Math.max(0, p - 1));
  }
  function handleReset() {
    setPage(0);
    setSubject(null);
    setDivision(null);
  }

  return (
    <div className="fact-att-shell">
      <div className="fact-att-blob fact-att-blob-1" />
      <div className="fact-att-blob fact-att-blob-2" />
      {page === 0 && (
        <SubjectSelection
          onSelect={handleSubject}
          subjects={subjects}
          loading={loading}
        />
      )}
      {page === 1 && (
        <DivisionSelection
          subject={subject}
          onSelect={handleDivision}
          onBack={handleBack}
        />
      )}
      {page === 2 && (
        <AttendancePage
          subject={subject}
          division={division}
          onBack={handleReset}
        />
      )}
    </div>
  );
}
