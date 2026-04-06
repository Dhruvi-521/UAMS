import {
  BookMarked, BookOpen, Check, Eye,
  Pencil, Plus, Search, Trash2, X, Settings
} from "lucide-react";
import { useState } from "react";
import "./ManageFaculty.css";
import AddFaculty from "./AddFaculty";

const facultyData = [
  { id: "F-103300001", name: "Dr. Alisha Singh",         department: "Computer Science", designation: "Professor",           status: "Active",   email: "alisingh@gmail.com",   joinDate: "Aug 18, 1985", experience: "35+ years", specializations: ["AI", "Engineering"],        degree: "Ph.D. in Computer Science (UBC)",          primaryDept: "Computer Science", office: "252 Miandresa, Suite 8800", currentLoad: "4 Courses", avatar: "AS" },
  { id: "F-103300002", name: "Prof. Ken Chen",            department: "Computer Science", designation: "Professor",           status: "On Leave", email: "kenchen@gmail.com",    joinDate: "Mar 12, 1990", experience: "25+ years", specializations: ["ML", "Data Science"],        degree: "Ph.D. in Computer Science (MIT)",           primaryDept: "Computer Science", office: "301 Tech Building",         currentLoad: "2 Courses", avatar: "KC" },
  { id: "F-103300003", name: "Assoc. Prof. Maria Garcia", department: "Computer Science", designation: "Associate Professor", status: "Active",   email: "mgarcia@gmail.com",    joinDate: "Jun 5, 1995",  experience: "20+ years", specializations: ["Networks", "Security"],      degree: "Ph.D. in Computer Engineering (Stanford)",  primaryDept: "Computer Science", office: "215 West Hall",             currentLoad: "5 Courses", avatar: "MG" },
  { id: "F-103300004", name: "Dr. Alana Clngh",           department: "Computer Science", designation: "Professor",           status: "Active",   email: "aclngh@gmail.com",     joinDate: "Sep 20, 2000", experience: "15+ years", specializations: ["Algorithms", "Theory"],      degree: "Ph.D. in Mathematics (UCLA)",               primaryDept: "Computer Science", office: "408 Science Hall",          currentLoad: "3 Courses", avatar: "AC" },
  { id: "F-103300005", name: "Prof. Kevin Chen",          department: "Computer Science", designation: "Professor",           status: "Active",   email: "kchen@gmail.com",      joinDate: "Jan 15, 1998", experience: "22+ years", specializations: ["AI", "Robotics"],            degree: "Ph.D. in Robotics (CMU)",                   primaryDept: "Computer Science", office: "120 Engineering Bldg",      currentLoad: "4 Courses", avatar: "KC" },
  { id: "F-103300006", name: "Assoc. Prof. Chloe Patel",  department: "Computer Science", designation: "Associate Professor", status: "Active",   email: "cpatel@gmail.com",     joinDate: "Nov 3, 2005",  experience: "12+ years", specializations: ["HCI", "UX Design"],          degree: "Ph.D. in HCI (Georgia Tech)",               primaryDept: "Computer Science", office: "330 Innovation Hub",        currentLoad: "5 Courses", avatar: "CP" },
  { id: "F-103300007", name: "Dr. Samuel Lee",            department: "Computer Science", designation: "Professor",           status: "Active",   email: "slee@gmail.com",       joinDate: "Apr 7, 1993",  experience: "28+ years", specializations: ["Databases", "Cloud"],         degree: "Ph.D. in Information Systems (UC Berkeley)",primaryDept: "Computer Science", office: "512 Data Center",           currentLoad: "3 Courses", avatar: "SL" },
  { id: "F-103300008", name: "Prof. Fatima Khan",         department: "Computer Science", designation: "Professor",           status: "Active",   email: "fkhan@gmail.com",      joinDate: "Feb 28, 2002", experience: "18+ years", specializations: ["Cybersecurity", "Blockchain"],degree: "Ph.D. in Information Security (Oxford)",    primaryDept: "Computer Science", office: "225 Security Lab",          currentLoad: "4 Courses", avatar: "FK" },
  { id: "F-103300009", name: "Kevin Nguyen",              department: "Computer Science", designation: "Professor",           status: "On Leave", email: "knguyen@gmail.com",    joinDate: "Jul 14, 2008", experience: "10+ years", specializations: ["Software Eng", "DevOps"],     degree: "Ph.D. in Software Engineering (Waterloo)",  primaryDept: "Computer Science", office: "180 Dev Lab",               currentLoad: "1 Course",  avatar: "KN" },
  { id: "F-103300010", name: "Liam Nguyen",               department: "Computer Science", designation: "Professor",           status: "Active",   email: "liamnguyens@gmail.com",joinDate: "Oct 10, 2010", experience: "10+ years", specializations: ["AI", "NLP"],                 degree: "Ph.D. in Computer Science (Toronto)",       primaryDept: "Computer Science", office: "101 AI Research Center",    currentLoad: "4 Courses", avatar: "LN" },
];

const allCourses = [
  { code: "CS-101", name: "Introduction to AI",           credits: 3, semester: "Semester 1" },
  { code: "CS-201", name: "Data Structures & Algorithms", credits: 4, semester: "Semester 2" },
  { code: "CS-301", name: "Machine Learning",             credits: 3, semester: "Semester 3" },
  { code: "CS-401", name: "Advanced Algorithms",          credits: 4, semester: "Semester 4" },
  { code: "CS-501", name: "Deep Learning",                credits: 3, semester: "Semester 5" },
  { code: "CS-601", name: "Computer Vision",              credits: 3, semester: "Semester 6" },
  { code: "CS-701", name: "Natural Language Processing",  credits: 3, semester: "Semester 7" },
  { code: "CS-801", name: "Cloud Computing",              credits: 4, semester: "Semester 8" },
  { code: "CS-901", name: "Cybersecurity Fundamentals",   credits: 3, semester: "Semester 5" },
  { code: "CS-111", name: "Database Management Systems",  credits: 4, semester: "Semester 3" },
];

const avatarColors = ["#4f46e5","#7c3aed","#0891b2","#059669","#d97706","#dc2626","#9333ea","#0d9488","#7c3aed","#2563eb"];

function Avatar({ initials, index, size = 36 }) {
  return (
    <div className="fm-avatar" style={{ width: size, height: size, background: avatarColors[index % avatarColors.length], fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`fm-badge ${status === "Active" ? "fm-badge-active" : "fm-badge-leave"}`}>{status}</span>;
}

export default function FacultyManagement() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [sidebarOpen,     setSidebarOpen]     = useState(false);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [sidebarTab,      setSidebarTab]      = useState("personal");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [courseSearch,    setCourseSearch]    = useState("");
  const [assignedCourses, setAssignedCourses] = useState(["CS-101","CS-201","CS-301","CS-401"]);
  const [tempAssigned,    setTempAssigned]    = useState([]);
  const [showAddForm,     setShowAddForm]     = useState(false);

  // ── Show Add Faculty page ──
  if (showAddForm) return <AddFaculty onBack={() => setShowAddForm(false)} />;

  const filtered = facultyData.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProfile = (faculty) => { setSelectedFaculty(faculty); setSidebarOpen(true); setSidebarTab("personal"); };
  const closeSidebar = () => { setSidebarOpen(false); setTimeout(() => setSelectedFaculty(null), 420); };
  const openAssignModal = () => { setTempAssigned([...assignedCourses]); setCourseSearch(""); setAssignModalOpen(true); };
  const toggleTemp = (code) => setTempAssigned(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
  const saveAssignment = () => { setAssignedCourses([...tempAssigned]); setAssignModalOpen(false); };
  const cancelAssignment = () => setAssignModalOpen(false);

  const filteredCourses       = allCourses.filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()) || c.code.toLowerCase().includes(courseSearch.toLowerCase()));
  const assignedCourseObjects = allCourses.filter(c => assignedCourses.includes(c.code));
  const selectedIndex         = selectedFaculty ? facultyData.findIndex(f => f.id === selectedFaculty.id) : 0;

  return (
    <div className="fm-wrapper">

      {/* Dim overlay */}
      <div className={`fm-overlay${sidebarOpen ? " active" : ""}`} onClick={closeSidebar} />

      {/* ── Main page ── */}
      <div className={`fm-page${sidebarOpen ? " shifted" : ""}`}>

        <div className="fm-header">
          <div>
            <h1 className="fm-title">Faculty Management</h1>
          </div>
          <div className="fm-header-actions">
            <button className="fm-btn-primary" onClick={() => setShowAddForm(true)}>
              <Plus size={15} /> Add New Faculty
            </button>
            <button className="fm-btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Data
            </button>
          </div>
        </div>

        <div className="fm-filters">
          <div className="fm-search-wrap">
            <svg className="fm-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="fm-search" placeholder="Search by Name, Faculty ID, or Email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <select className="fm-select"><option>All Departments</option><option>Computer Science</option><option>Mathematics</option></select>
          <select className="fm-select"><option>All Designations</option><option>Professor</option><option>Associate Professor</option></select>
          <select className="fm-select"><option>All Specializations</option><option>AI</option><option>All Specializations</option><option>ML</option></select>
          <select className="fm-select"><option>2020+</option><option>2023</option></select>
        </div>

        {/* Desktop table */}
        <div className="fm-table-card">
          <div className="fm-table-scroll">
            <table className="fm-table">
              <thead>
                <tr><th>Faculty ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map((f, i) => (
                  <tr key={f.id} className={selectedFaculty?.id === f.id ? "fm-row-selected" : ""} onClick={() => openProfile(f)}>
                    <td><span className="fm-id-text">{f.id}</span></td>
                    <td><div className="fm-name-cell"><Avatar initials={f.avatar} index={i} size={34}/><span className="fm-name-text">{f.name}</span></div></td>
                    <td>{f.department}</td><td>{f.designation}</td>
                    <td><StatusBadge status={f.status}/></td>
                    <td>
                      <div className="fm-action-btns" onClick={e => e.stopPropagation()}>
                        <button className="fm-act-btn fm-act-view" onClick={() => openProfile(f)}><Eye size={13}/></button>
                        <button className="fm-act-btn fm-act-edit"><Pencil size={13}/></button>
                        <button className="fm-act-btn fm-act-del"><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="fm-card-list">
          {filtered.map((f, i) => (
            <div key={f.id} className={`fm-faculty-card${selectedFaculty?.id === f.id ? " fm-row-selected" : ""}`} onClick={() => openProfile(f)}>
              <div className="fm-card-top">
                <Avatar initials={f.avatar} index={i} size={48}/>
                <div className="fm-card-info">
                  <div className="fm-card-id">{f.id}</div>
                  <div className="fm-card-name">{f.name}</div>
                  <div className="fm-card-designation">{f.designation}</div>
                </div>
                <StatusBadge status={f.status}/>
              </div>
              <div className="fm-card-actions" onClick={e => e.stopPropagation()}>
                <button className="fm-card-view-btn" onClick={() => openProfile(f)}><Eye size={14}/> View Profile</button>
                <button className="fm-card-icon-btn edit"><Pencil size={14} color="#64748b"/></button>
                <button className="fm-card-icon-btn del"><Trash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button className="fm-fab" onClick={() => setShowAddForm(true)}><Plus size={24}/></button>

      {/* ── Profile Sidebar / Bottom Sheet ── */}
      <div className={`fm-sidebar${sidebarOpen ? " open" : ""}`}>

        <div className="fm-sb-header">
          <div className="fm-sb-drag-handle" />
          <div className="fm-sb-header-row">
            <span className="fm-sb-title">Faculty Profile</span>
            <X size={16} onClick={closeSidebar}/>
          </div>
        </div>

        {selectedFaculty && (
          <>
            <div className="fm-sb-body">

              {/* Hero */}
              <div className="fm-sb-hero">
                <div className="fm-sb-avatar-wrap">
                  <div className="fm-sb-avatar-ring">
                    <Avatar initials={selectedFaculty.avatar} index={selectedIndex} size={94}/>
                  </div>
                  <div className="fm-sb-badge-float">
                    <StatusBadge status={selectedFaculty.status}/>
                  </div>
                </div>
                <h2 className="fm-sb-name">{selectedFaculty.name}</h2>
                <p className="fm-sb-id">{selectedFaculty.id.replace("F-", "")}</p>
                <div className="fm-sb-desktop-btns">
                  <button className="fm-sb-btn-blue">Update Details</button>
                  <button className="fm-sb-btn-red">Delete Faculty</button>
                </div>
              </div>

              {/* Tabs */}
              <div className="fm-sb-tabs">
                {[{key:"personal",label:"Personal Details"},{key:"courses",label:"Course Assignment"}].map(tab => (
                  <button key={tab.key} className={`fm-sb-tab${sidebarTab===tab.key?" active":""}`} onClick={() => setSidebarTab(tab.key)}>{tab.label}</button>
                ))}
              </div>

              {/* Personal Details */}
              {sidebarTab === "personal" && (
                <div className="fm-sb-content">
                  <div className="fm-info-grid">
                    <div className="fm-info-card">
                      <div className="fm-info-label">Department</div>
                      <div className="fm-info-value">{selectedFaculty.primaryDept}</div>
                    </div>
                    <div className="fm-info-card">
                      <div className="fm-info-label">Designation</div>
                      <div className="fm-info-value">{selectedFaculty.designation.replace("Associate Professor","Assoc. Prof.").replace("Professor","Prof.")}</div>
                    </div>
                    <div className="fm-info-card">
                      <div className="fm-info-label">Experience</div>
                      <div className="fm-info-value">{selectedFaculty.experience}</div>
                    </div>
                    <div className="fm-info-card">
                      <div className="fm-info-label">Current Load</div>
                      <div className="fm-info-value">{selectedFaculty.currentLoad}</div>
                    </div>
                    <div className="fm-info-card fm-info-full">
                      <div className="fm-info-label">Degree</div>
                      <div className="fm-info-value">{selectedFaculty.degree}</div>
                    </div>
                    <div className="fm-info-card fm-info-full">
                      <div className="fm-info-label">Specializations</div>
                      <div className="fm-spec-tags">
                        {selectedFaculty.specializations.map(s => <span key={s} className="fm-spec-tag">{s}</span>)}
                      </div>
                    </div>
                  </div>
                  <div className="fm-notes-card">
                    <div className="fm-notes-row"><strong>Email</strong><span>{selectedFaculty.email}</span></div>
                    <div className="fm-notes-row"><strong>Joined</strong><span>{selectedFaculty.joinDate}</span></div>
                    <div className="fm-notes-row fm-notes-last"><strong>Office</strong><span>{selectedFaculty.office}</span></div>
                  </div>
                </div>
              )}

              {/* Courses */}
              {sidebarTab === "courses" && (
                <div className="fm-sb-content">
                  <div className="fm-courses-hdr">
                    <span className="fm-courses-count">{assignedCourses.length} Course{assignedCourses.length!==1?"s":""} Assigned</span>
                    <button className="fm-assign-btn" onClick={openAssignModal}><Plus size={13}/> Assign Course</button>
                  </div>
                  {assignedCourseObjects.length > 0
                    ? assignedCourseObjects.map((c,i) => (
                        <div className="fm-course-item" key={i}>
                          <div className="fm-course-icon"><BookMarked size={15} color="#1e40af"/></div>
                          <div className="fm-course-info">
                            <div className="fm-course-code">{c.code}</div>
                            <div className="fm-course-name">{c.name}</div>
                          </div>
                          <div className="fm-course-meta">
                            <span className="fm-course-credits">{c.credits} Credits</span>
                            <span className="fm-course-sem">{c.semester}</span>
                          </div>
                        </div>
                      ))
                    : <div className="fm-no-courses"><BookOpen size={32} color="#cbd5e1"/><p>No courses assigned yet</p></div>
                  }
                </div>
              )}

            </div>
          </>
        )}
      </div>

      {/* Assign Course Modal */}
      {assignModalOpen && (
        <div className="fm-modal-overlay" onClick={cancelAssignment}>
          <div className="fm-modal" onClick={e => e.stopPropagation()}>
            <div className="fm-modal-header">
              <div>
                <h2 className="fm-modal-title">Assign Courses</h2>
                <p className="fm-modal-sub">Select subjects for <strong>{selectedFaculty?.name}</strong></p>
              </div>
              <button className="fm-modal-close" onClick={cancelAssignment}><X size={18}/></button>
            </div>
            <div className="fm-modal-search-wrap">
              <Search size={14} className="fm-modal-search-icon"/>
              <input className="fm-modal-search" placeholder="Search course name or code..." value={courseSearch} onChange={e => setCourseSearch(e.target.value)}/>
            </div>
            <div className="fm-modal-summary">
              <span>{tempAssigned.length} selected</span>
              {tempAssigned.length > 0 && <button className="fm-modal-clear" onClick={() => setTempAssigned([])}>Clear all</button>}
            </div>
            <div className="fm-modal-list">
              {filteredCourses.length > 0
                ? filteredCourses.map((c,i) => {
                    const sel = tempAssigned.includes(c.code);
                    return (
                      <div key={i} className={`fm-modal-row${sel?" selected":""}`} onClick={() => toggleTemp(c.code)}>
                        <div className={`fm-modal-check${sel?" checked":""}`}>{sel && <Check size={11} color="#fff" strokeWidth={3}/>}</div>
                        <div className="fm-modal-course-icon"><BookMarked size={14} color={sel?"#1e40af":"#94a3b8"}/></div>
                        <div className="fm-modal-course-info">
                          <div className="fm-modal-course-name">{c.name}</div>
                          <div className="fm-modal-course-meta">{c.code} · {c.semester}</div>
                        </div>
                        <span className="fm-modal-credits">{c.credits} Credits</span>
                      </div>
                    );
                  })
                : <div className="fm-modal-empty"><BookOpen size={28} color="#cbd5e1"/><p>No courses found</p></div>
              }
            </div>
            <div className="fm-modal-footer">
              <button className="fm-modal-cancel" onClick={cancelAssignment}>Cancel</button>
              <button className="fm-modal-save" onClick={saveAssignment}><Check size={14}/> Save Assignment</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
