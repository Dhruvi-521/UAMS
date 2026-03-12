import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown, ChevronLeft, ChevronRight,
  ChevronsUpDown,
  ClipboardList,
  Filter,
  GraduationCap,
  Hash,
  IdCard,
  Layers,
  LayoutGrid,
  Mail, Phone
} from "lucide-react";
import { useState } from "react";
import "./Students.css";

const students = [
  {
    id:1, name: "Sarah Mitchell", semester: "4", program: "BCA",
    division: "A", contact: "1234567",
    studentId: "SU250251", rollNumber: "37",
    email: "smitchell@uams.edu", phone: "(501) 555-1234",
    gpa: "3.65", usmle1: "234", usmle2: "245",
  },
  {
    id:2, name: "James Carter", semester: "3", program: "BCA",
    division: "A", contact: "1234558",
    studentId: "SU250252", rollNumber: "14",
    email: "jcarter@uams.edu", phone: "(501) 555-2345",
    gpa: "3.72", usmle1: "241", usmle2: "238",
  },
  {
    id: 3, name: "Emily Johnson", semester: "2", program: "MScit",
    division: "B", contact: "1234569",
    studentId: "SU250253", rollNumber: "1",
    email: "ejohnson@uams.edu", phone: "(501) 555-3456",
    gpa: "3.88", usmle1: "229", usmle2: "251",
  },
  {
    id: 4, name: "Michael Adams", semester: "3", program: "MScit",
    division: "A", contact: "1234570",
    studentId: "SU250254", rollNumber: "36",
    email: "madams@uams.edu", phone: "(501) 555-4567",
    gpa: "3.45", usmle1: "218", usmle2: "226",
  },
  {
    id: 5, name: "Jessica Patel", semester: "4", program: "IMScit",
    division: "B", contact: "1234571",
    studentId: "SU250255", rollNumber: "50",
    email: "jpatel@uams.edu", phone: "(501) 555-5678",
    gpa: "3.91", usmle1: "248", usmle2: "255",
  },
  {
    id: 6, name: "Daniel White", semester: "3", program: "MScit",
    division: "B", contact: "1234572",
    studentId: "SU250256", rollNumber: "10",
    email: "dwhite@uams.edu", phone: "(501) 555-6789",
    gpa: "3.58", usmle1: "235", usmle2: "242",
  },
  {
    id: 7, name: "Anna Green", semester: "2", program: "IMScit",
    division: "A", contact: "1234573",
    studentId: "SU250257", rollNumber: "9",
    email: "agreen@uams.edu", phone: "(501) 555-7890",
    gpa: "3.77", usmle1: "244", usmle2: "249",
  },
  {
    id: 8, name: "Ryan Brooks", semester: "4", program: "BCA",
    division: "B", contact: "1234574",
    studentId: "SU250258", rollNumber: "40",
    email: "rbrooks@uams.edu", phone: "(501) 555-8901",
    gpa: "3.62", usmle1: "231", usmle2: "237",
  },
  {
    id: 9, name: "Megan Lewis", semester: "3", program: "MScit",
    division: "A", contact: "1234575",
    studentId: "SU250259", rollNumber: "41",
    email: "mlewis@uams.edu", phone: "(501) 555-9012",
    gpa: "3.84", usmle1: "246", usmle2: "252",
  },
  {
    id: 10, name: "Christopher Hall", semester: "4", program: "BCA",
    division: "A", contact: "1234576",
    studentId: "SU250260", rollNumber: "42",
    email: "chall@uams.edu", phone: "(501) 555-1987",
    gpa: "3.69", usmle1: "239", usmle2: "244",
  },
];

const evaluationItems = [
  "Patient Interviews",
  "Physical Exams",
  "Case Presentations",
  "Medical Documentation",
];

function StudentList({ onSelectStudent }) {
  const [semester, setSemester] = useState("All Semester");
  const [program, setProgram] = useState("All Programs");
  const [division, setDivision] = useState("All Divisions");

  const filtered = students.filter((s) => {
    return (
      (semester === "All Semester" || s.semester === semester) &&
      (program === "All Programs" || s.program === program) &&
      (division === "All Divisions" || s.division === division)
    );
  });

  return (
    <div className="page-container">
      <h1 className="st-page-title">Students</h1>

      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">
            <LayoutGrid size={14} /> Semester
          </label>
          <div className="select-wrapper">
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="filter-select">
              <option>All Semester</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <ChevronDown size={14} className="select-icon" />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <GraduationCap size={14} /> Program
          </label>
          <div className="select-wrapper">
            <select value={program} onChange={(e) => setProgram(e.target.value)} className="filter-select">
              <option>All Programs</option>
              <option>BCA</option>
              <option>MScit</option>
              <option>IMScit</option>
            </select>
            <ChevronDown size={14} className="select-icon" />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <LayoutGrid size={14} /> Division
          </label>
          <div className="select-wrapper">
            <select value={division} onChange={(e) => setDivision(e.target.value)} className="filter-select">
              <option>All Divisions</option>
              <option>A</option>
              <option>B</option>
            </select>
            <ChevronDown size={14} className="select-icon" />
          </div>
        </div>

        <button className="filter-btn">
          <Filter size={14} /> Filter
        </button>
      </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th className="col-hash"><Hash size={13} /></th>
              <th className="col-name">
                Name <ChevronsUpDown size={12} className="sort-icon" />
              </th>
              <th>Semester</th>
              <th>Program</th>
              <th>Division</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr key={student.id} className="table-row">
                <td className="col-hash">
                  <span className="row-icon"><IdCard size={13} /></span>
                </td>
                <td className="col-name">
                  <button className="student-link" onClick={() => onSelectStudent(student)}>
                    {student.name}
                  </button>
                </td>
                <td>{student.semester}</td>
                <td>{student.program}</td>
                <td>{student.division}</td>
                <td>{student.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="pagination-count">1–{filtered.length} of {filtered.length}</span>
        <div className="pagination-controls">
          <button className="page-btn"><ChevronLeft size={14} /></button>
          <span className="page-range">1–3</span>
          <button className="page-btn"><ChevronLeft size={14} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn"><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}

function StudentProfile({ student, onBack }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Evaluations", "Academic Progress"];

  return (
    <div className="page-container">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={15} /> Back to Students
      </button>

      <h1 className="page-title">Student Profile</h1>

      <div className="profile-header">
        <div className="profile-name-row">
          <h2 className="profile-name">{student.name}</h2>
          {/* <span className="profile-id-badge">{student.rollNumber}</span> */}
        </div>
        <div className="profile-meta">
          <span><GraduationCap size={14} /> {student.semester}</span>
          <span><BookOpen size={14} /> {student.program}</span>
          <span><Layers size={14} /> {student.division}</span>
        </div>
      </div>

      <div className="tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="overview-content">
          <section className="info-section">
            <h3 className="section-heading">Academic Information</h3>
            <div className="cards-grid">
              <div className="info-card">
                <div className="card-row card-row-header">
                  <IdCard size={14} /> <strong>Student Details</strong>
                </div>
                <div className="card-divider" />
                <div className="card-row">
                  <Mail size={13} className="row-icon-muted" /> {student.studentId}
                </div>
                <div className="card-divider" />
                <div className="card-row">
                  <IdCard size={13} className="row-icon-muted" /> Roll Number {student.rollNumber}
                </div>
              </div>

              <div className="info-card">
                <div className="card-row card-row-header">
                  <Layers size={14} /> <strong>Contact Information</strong>
                </div>
                <div className="card-divider" />
                <div className="card-row">
                  <Mail size={13} className="row-icon-muted" />
                  <a href={`mailto:${student.email}`} className="email-link">{student.email}</a>
                </div>
                <div className="card-divider" />
                <div className="card-row">
                  <Phone size={13} className="row-icon-muted" /> {student.phone}
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h3 className="section-heading">Academic Summary</h3>
            <div className="cards-grid">
              <div className="info-card">
                <div className="card-row">
                  <GraduationCap size={13} className="row-icon-muted" /> GPA: {student.gpa}
                </div>

              </div>

              <div className="info-card">
                <div className="card-row card-row-header">
                  <ClipboardList size={14} /> <strong>Evaluations</strong>
                </div>
                <div className="card-divider" />
                {evaluationItems.map((item) => (
                  <div key={item} className="card-row eval-row">
                    <CheckCircle2 size={14} className="check-icon" /> {item}
                  </div>
                ))}
              </div>
            </div>


          </section>
        </div>
      )}

      {activeTab !== "Overview" && (
        <div className="placeholder-tab">
          <p>{activeTab} content coming soon.</p>
        </div>
      )}
    </div>
  );
}

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="app-shell">
      {selectedStudent === null ? (
        <StudentList onSelectStudent={setSelectedStudent} />
      ) : (
        <StudentProfile student={selectedStudent} onBack={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
