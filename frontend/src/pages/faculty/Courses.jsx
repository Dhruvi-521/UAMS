import { useState } from "react";
import {
  GraduationCap, Layers, BookOpen, FileText, Upload,
  ArrowLeft, Search, Download, CheckCircle, ChevronRight, Users, Award
} from "lucide-react";
import "./Courses.css";

const programs = [
  { id: 1, name: "BCA", icon: "🎓", credits: 10, students: 7, color: "#e0e7ff" },
  { id: 2, name: "MScIT", icon: "💻", credits: 47, students: 9, color: "#dbeafe" },
  { id: 3, name: "IMSCIT", icon: "🔬", credits: 47, students: 9, color: "#d1fae5" },
  { id: 4, name: "B.Tech", icon: "⚙️", credits: 17, students: 11, color: "#fef3c7" },
  { id: 5, name: "B.Tech (Lateral)", icon: "🏗️", credits: 20, students: 1, color: "#fce7f3" },
];

const semestersData = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  label: `Semester ${i + 1}`,
  courses: 6,
  credits: 18,
}));

const coursesData = [
  { code: "242301101", title: "Fundamentals of Computer Organization", tag: "F15CA_Dual", progress: 75 },
  { code: "225301101", title: "Introduction to Programming & Problem Solving", tag: "F1BCA_Dual", progress: 75 },
  { code: "242201101", title: "Programming - Practicals", tag: "F1BCA_Dual", progress: 60 },
  { code: "22CFCT105", title: "Web Technologies", tag: "F15CA_Dual", progress: 88 },
  { code: "242201105", title: "Web Technologies - Practicals", tag: "F1BCA_Dual", progress: 40 },
  { code: "242201106", title: "Web Technologies - Practical", tag: "F1BCA_Dual", progress: 48 },
];

const materialsData = [
  { id: 1, type: "FILE", name: "Unit 1", desc: "Number systems & binary arithmetic", status: "Done" },
  { id: 2, type: "FKS", name: "Unit 2", desc: "Boolean algebra & logic gates", status: "Done" },
  { id: 3, type: "FKE", name: "Unit 3", desc: "CPU architecture & memory", status: "Done" },
  { id: 4, type: "FKE", name: "Unit 4", desc: "I/O and storage systems", status: "Done" },
];

const cardColors = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export default function Courses() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");

  // PAGE 4 — Materials
  if (selectedCourse) {
    return (
      <div className="cc-container">
        <div className="cc-breadcrumb">
          <button className="cc-back-btn" onClick={() => { setSelectedCourse(null); setShowUpload(false); }}>
            <ArrowLeft size={15} /> Back
          </button>
          <span className="cc-crumb">{selectedProgram.name}</span>
          <ChevronRight size={13} className="cc-crumb-sep" />
          <span className="cc-crumb">Semester {selectedSemester.id}</span>
          <ChevronRight size={13} className="cc-crumb-sep" />
          <span className="cc-crumb">{selectedCourse.code}</span>
          <ChevronRight size={13} className="cc-crumb-sep" />
          <span className="cc-crumb active">Material Management</span>
        </div>

        <div className="cc-mat-header">
          <div>
            <div className="cc-mat-title-row">
              <span className="cc-mat-code">{selectedCourse.code}</span>
              <span className="cc-mat-course-title">{selectedCourse.title}</span>
            </div>
            <div className="cc-mat-progress-row">
              <div className="cc-progress-track">
                <div className="cc-progress-fill" style={{ width: `${selectedCourse.progress}%` }} />
              </div>
              <span className="cc-progress-label">{selectedCourse.progress}% complete</span>
            </div>
          </div>
        </div>

        <div className="cc-notes-bar">
          <div className="cc-notes-tab">
            <FileText size={14} /> Notes
          </div>
          <button className="cc-upload-btn" onClick={() => setShowUpload(!showUpload)}>
            <Upload size={14} /> + UPLOAD NEW MATERIAL
          </button>
        </div>

        {showUpload && (
          <div className="cc-upload-form">
            <h4>Upload New Material</h4>
            <input className="cc-input" placeholder="Material Title" />
            <input className="cc-input" placeholder="Description" />
            <input className="cc-input" type="file" />
            <button className="cc-submit-btn">Upload</button>
          </div>
        )}

        <div className="cc-mat-list">
          {materialsData.map(mat => (
            <div className="cc-mat-row" key={mat.id}>
              <div className="cc-mat-icon-wrap">
                <FileText size={20} color="#2563eb" />
              </div>
              <div className="cc-mat-info">
                <span className="cc-mat-type">{mat.type}</span>
                <span className="cc-mat-name">{mat.name}</span>
                <span className="cc-mat-desc">{mat.desc}</span>
              </div>
              <div className="cc-mat-actions">
                <span className="cc-done-badge"><CheckCircle size={13} /> Done</span>
                <button className="cc-dl-btn"><Download size={13} /> Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PAGE 3 — Courses
  if (selectedSemester) {
    const filtered = coursesData.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
    );
    return (
      <div className="cc-container">
        <div className="cc-breadcrumb">
          <button className="cc-back-btn" onClick={() => { setSelectedSemester(null); setSearch(""); }}>
            <ArrowLeft size={15} /> Back
          </button>
          <span className="cc-crumb">{selectedProgram.name}</span>
          <ChevronRight size={13} className="cc-crumb-sep" />
          <span className="cc-crumb">Semester {selectedSemester.id}</span>
          <ChevronRight size={13} className="cc-crumb-sep" />
          <span className="cc-crumb active">Courses</span>
        </div>

        <div className="cc-page-header">
          <h1 className="cc-page-title">{selectedProgram.name} Semester {selectedSemester.id} Courses</h1>
          <div className="cc-search-wrap">
            <Search size={15} className="cc-search-icon" />
            <input
              className="cc-search"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="cc-course-grid">
          {filtered.map((course, i) => (
            <div
              className="cc-course-card"
              key={course.code}
              onClick={() => setSelectedCourse(course)}
            >
              <div className="cc-course-thumb" style={{ background: cardColors[i % cardColors.length] }} />
              <div className="cc-course-body">
                <span className="cc-course-code">{course.code}</span>
                <p className="cc-course-name">{course.title}</p>
                <span className="cc-course-tag">{course.tag}</span>
                <div className="cc-progress-track" style={{ marginTop: 10 }}>
                  <div className="cc-progress-fill" style={{ width: `${course.progress}%` }} />
                </div>
                <span className="cc-progress-pct">{course.progress}% complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PAGE 2 — Semesters
  if (selectedProgram) {
    return (
      <div className="cc-container">
        <div className="cc-breadcrumb">
          <button className="cc-back-btn" onClick={() => setSelectedProgram(null)}>
            <ArrowLeft size={15} /> Back
          </button>
          <span className="cc-crumb">{selectedProgram.name}</span>
          <ChevronRight size={13} className="cc-crumb-sep" />
          <span className="cc-crumb active">Semesters</span>
        </div>

        <div className="cc-page-header">
          <h1 className="cc-page-title">{selectedProgram.name} Semesters</h1>
          {/* <button className="cc-action-btn"><Award size={14} /> Add Semester</button> */}
        </div>

        <div className="cc-sem-grid">
          {semestersData.map(sem => (
            <div className="cc-sem-card" key={sem.id}>
              <div className="cc-sem-num">{sem.id}</div>
              <div className="cc-sem-label">{sem.label}</div>
              <div className="cc-sem-meta">{sem.courses} Courses • {sem.credits} Credits</div>
              <button className="cc-view-btn" onClick={() => setSelectedSemester(sem)}>
                View Courses
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // PAGE 1 — Programs
  return (
    <div className="cc-container">
      <div className="cc-page-header">
        <h1 className="cc-page-title">
          <GraduationCap size={24} style={{ marginRight: 8, verticalAlign: "middle" }} />
          School of Computer Science Programs
        </h1>
        <div style={{ display: "flex", gap: 10 }}>
          <div className="cc-search-wrap">
            <Search size={15} className="cc-search-icon" />
            <input className="cc-search" placeholder="Search Programs..." />
          </div>
          {/*<button className="cc-action-btn">+ Add Program</button> */}
        </div>
      </div>

      <div className="cc-program-grid">
        {programs.map(prog => (
          <div className="cc-program-card" key={prog.id} style={{ "--card-accent": prog.color }}>
            <div className="cc-prog-icon-wrap" style={{ background: prog.color }}>
              {/* <span className="cc-prog-emoji">{prog.icon}</span> */}
            </div>
            <div className="cc-prog-name">{prog.name}</div>
            <div className="cc-prog-meta">
              <span><Layers size={12} /> {prog.credits} credits</span>
              <span><Users size={12} /> {prog.students} students</span>
            </div>
            <button className="cc-view-btn" onClick={() => setSelectedProgram(prog)}>
              View Semester Structure
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}