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
import { useState, useEffect } from "react";
import axios from "axios";
import "./Students.css";



const evaluationItems = [
  "Patient Interviews",
  "Physical Exams",
  "Case Presentations",
  "Medical Documentation",
];

function StudentList({ onSelectStudent }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState("All Semester");
  const [program, setProgram] = useState("All Programs");
  const [division, setDivision] = useState("All Divisions");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/faculty/department-students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedStudents = response.data.students.map((student) => ({
        id: student._id,

        name: `${student.firstName} ${student.lastName}`,

        semester: student.semester,

        program:
          student.program?.programName || "",

        division: student.division,

        contact: student.mobile,

        studentId: student.studentId,

        rollNumber: student.rollNumber,

        email: student.universityEmail,

        phone: student.mobile,

        gpa: "N/A",

        usmle1: "N/A",

        usmle2: "N/A",
      }));

      setStudents(formattedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading students...</h2>
      </div>
    );
  }
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

              {[
                ...new Set(
                  students.map((s) => String(s.semester))
                ),
              ].map((semester) => (
                <option key={semester}>
                  {semester}
                </option>
              ))}
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

              {[
                ...new Set(
                  students.map((s) => s.program)
                ),
              ].map((programName) => (
                <option key={programName}>
                  {programName}
                </option>
              ))}
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

              {[
                ...new Set(
                  students.map((s) => s.division)
                ),  
              ].map((division) => (
                <option key={division}>
                  {division}
                </option>
              ))}
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
