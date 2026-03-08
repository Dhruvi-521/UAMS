/**
 * Route: /student/materials/:materialsId
 * Reads materialsId via useParams()
 */

import { useParams, useNavigate } from "react-router-dom";
import "./MaterialDetails.css";

/* ── All course data ── */
const COURSES = {
  "intro-programming": {
    code: "242301101",
    name: "Introduction to Programming & Problem Solving",
    batch: "FYBCA_Dual",
    color: "#7c6fe0",
  },
  "programming-practicals": {
    code: "242301102",
    name: "Programming – Practicals",
    batch: "FYBCA_Dual",
    color: "#3dd6c8",
  },
  "computer-organization": {
    code: "242301103",
    name: "Fundamentals of Computer Organization",
    batch: "FYBCA_Dual",
    color: "#4a90d9",
  },
  "web-technologies": {
    code: "242301104",
    name: "Web Technologies",
    batch: "FYBCA_Dual",
    color: "#9b8fe0",
  },
  "web-technologies-practicals": {
    code: "242301105",
    name: "Web Technologies – Practicals",
    batch: "FYBCA_Dual",
    color: "#b0b8c1",
  },
  "publishing-multimedia": {
    code: "242301106",
    name: "Publishing & Multimedia Tools",
    batch: "FYBCA_Dual",
    color: "#2ecc71",
  },
};

/* ── Notes per course ── */
const MATERIALS = {
  "intro-programming": [
    { id: 1, title: "Unit 1", type: "FILE", desc: "Introduction to algorithms & flowcharts", done: true,  url: "/assets/pdfs/intro-prog-unit1.pdf" },
    { id: 2, title: "Unit 2", type: "FILE", desc: "Variables, data types & operators",       done: true,  url: "/assets/pdfs/intro-prog-unit2.pdf" },
    { id: 3, title: "Unit 3", type: "FILE", desc: "Control structures and loops",             done: true,  url: "/assets/pdfs/intro-prog-unit3.pdf" },
    { id: 4, title: "Unit 4", type: "FILE", desc: "Functions and arrays",                     done: true,  url: "/assets/pdfs/intro-prog-unit4.pdf" },
  ],
  "programming-practicals": [
    { id: 1, title: "Unit 1", type: "FILE", desc: "Practical 1 – Hello World & basics",   done: true,  url: "/assets/pdfs/prog-prac-unit1.pdf" },
    { id: 2, title: "Unit 2", type: "FILE", desc: "Practical 2 – Conditional programs",   done: false, url: "/assets/pdfs/prog-prac-unit2.pdf" },
    { id: 3, title: "Unit 3", type: "FILE", desc: "Practical 3 – Loop programs",          done: false, url: "/assets/pdfs/prog-prac-unit3.pdf" },
  ],
  "computer-organization": [
    { id: 1, title: "Unit 1", type: "FILE", desc: "Number systems & binary arithmetic",   done: true,  url: "/assets/pdfs/co-unit1.pdf" },
    { id: 2, title: "Unit 2", type: "FILE", desc: "Boolean algebra & logic gates",        done: true,  url: "/assets/pdfs/co-unit2.pdf" },
    { id: 3, title: "Unit 3", type: "FILE", desc: "CPU architecture & memory",            done: true,  url: "/assets/pdfs/co-unit3.pdf" },
    { id: 4, title: "Unit 4", type: "FILE", desc: "I/O and storage systems",              done: false, url: "/assets/pdfs/co-unit4.pdf" },
  ],
  "web-technologies": [
    { id: 1, title: "Unit 1", type: "FILE", desc: "HTML5 fundamentals",    done: true,  url: "/assets/pdfs/wt-unit1.pdf" },
    { id: 2, title: "Unit 2", type: "FILE", desc: "CSS3 and styling",      done: true,  url: "/assets/pdfs/wt-unit2.pdf" },
    { id: 3, title: "Unit 3", type: "FILE", desc: "JavaScript basics",     done: false, url: "/assets/pdfs/wt-unit3.pdf" },
  ],
  "web-technologies-practicals": [
    { id: 1, title: "Unit 1", type: "FILE", desc: "HTML forms & tables",   done: false, url: "/assets/pdfs/wt-prac-unit1.pdf" },
    { id: 2, title: "Unit 2", type: "FILE", desc: "CSS layouts",           done: false, url: "/assets/pdfs/wt-prac-unit2.pdf" },
  ],
  "publishing-multimedia": [
    { id: 1, title: "Unit 1", type: "FILE", desc: "Desktop publishing basics",    done: true,  url: "/assets/pdfs/pm-unit1.pdf" },
    { id: 2, title: "Unit 2", type: "FILE", desc: "Adobe Photoshop basics",       done: true,  url: "/assets/pdfs/pm-unit2.pdf" },
    { id: 3, title: "Unit 3", type: "FILE", desc: "Audio and video editing",      done: false, url: "/assets/pdfs/pm-unit3.pdf" },
  ],
};

/* ── Icons ── */
const FileIcon = () => (
  <svg className="md-file-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#fff" opacity=".92"/>
    <polyline points="14 2 14 8 20 8" fill="none" stroke="#a8d4f5" strokeWidth="1.4"/>
    <line x1="8" y1="13" x2="16" y2="13" stroke="#a8d4f5" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="17" x2="13" y2="17" stroke="#a8d4f5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const BackIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

/* ── Download helper ── */
const downloadFile = (url, title) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/* ── Component ── */
export default function MaterialDetails() {
  const { materialsId } = useParams();
  const navigate = useNavigate();

  const course = COURSES[materialsId];
  const notes  = MATERIALS[materialsId] ?? [];

  if (!course) {
    return (
      <div className="md-not-found">
        <p>Course not found.</p>
        <button className="md-back-btn" onClick={() => navigate("/student/materials")}>
          <BackIcon /> Back to courses
        </button>
      </div>
    );
  }

  const doneCount = notes.filter((n) => n.done).length;
  const pct = notes.length ? Math.round((doneCount / notes.length) * 100) : 0;

  return (
    <div className="md-page">

      {/* Breadcrumb */}
      <nav className="md-breadcrumb">
        <button className="md-back-btn" onClick={() => navigate("/student/materials")}>
          <BackIcon /> Back
        </button>
        <span className="md-sep">/</span>
        <span className="md-bc-course">{course.code}</span>
        <span className="md-sep">/</span>
        <span className="md-bc-current">Notes</span>
      </nav>

      {/* Course header */}
      <div className="md-course-header" style={{ borderLeftColor: course.color }}>
        <div className="md-header-info">
          <h1 className="md-course-title">{course.code} {course.name}</h1>
          <p className="md-course-batch">{course.batch}</p>
        </div>
        <div className="md-header-right">
          <div className="md-prog-track">
            <div className="md-prog-fill" style={{ width: `${pct}%`, background: course.color }}/>
          </div>
          <span className="md-prog-label">{pct}% complete</span>
        </div>
      </div>

      {/* Notes section */}
      <section className="md-section">
        <div className="md-section-head">
          <span className="md-section-arrow">&#8250;</span>
          <h2 className="md-section-title">Notes</h2>
        </div>

        <div className="md-notes-list">
          {notes.length === 0 && (
            <p className="md-empty">No materials available yet.</p>
          )}

          {notes.map((note) => (
            <div key={note.id} className="md-note-row">
              {/* Left */}
              <div className="md-note-left">
                <div className="md-file-icon">
                  <FileIcon />
                </div>
                <div className="md-note-meta">
                  <span className="md-note-type">{note.type}</span>
                  <a
                    className="md-note-title"
                    href={note.url}
                    onClick={(e) => { e.preventDefault(); downloadFile(note.url, note.title); }}
                  >
                    {note.title}
                  </a>
                  {note.desc && <span className="md-note-desc">{note.desc}</span>}
                </div>
              </div>

              {/* Right */}
              <div className="md-note-right">
                {note.done ? (
                  <button
                    className="md-btn md-btn-done"
                    onClick={() => downloadFile(note.url, note.title)}
                    title="Download"
                  >
                    <CheckIcon /> Done
                  </button>
                ) : (
                  <button
                    className="md-btn md-btn-download"
                    onClick={() => downloadFile(note.url, note.title)}
                    title="Download"
                  >
                    <DownloadIcon /> Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
