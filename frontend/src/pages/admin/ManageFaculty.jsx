import {
  Eye, Pencil, Plus, Trash2, Search, X
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ManageFaculty.css";
import AddFaculty from "./AddFaculty";
import UpdateFacultyForm from "./UpdateFacultyForm";
import FacultyProfile from "./FacultyProfile";

const allCourses = [
  { code: "CS-101", name: "Introduction to AI", credits: 3, semester: "Semester 1" },
  { code: "CS-201", name: "Data Structures & Algorithms", credits: 4, semester: "Semester 2" },
  { code: "CS-301", name: "Machine Learning", credits: 3, semester: "Semester 3" },
  { code: "CS-401", name: "Advanced Algorithms", credits: 4, semester: "Semester 4" },
  { code: "CS-501", name: "Deep Learning", credits: 3, semester: "Semester 5" },
  { code: "CS-601", name: "Computer Vision", credits: 3, semester: "Semester 6" },
  { code: "CS-701", name: "Natural Language Processing", credits: 3, semester: "Semester 7" },
  { code: "CS-801", name: "Cloud Computing", credits: 4, semester: "Semester 8" },
  { code: "CS-901", name: "Cybersecurity Fundamentals", credits: 3, semester: "Semester 5" },
  { code: "CS-111", name: "Database Management Systems", credits: 4, semester: "Semester 3" },
];

const avatarColors = ["#4f46e5", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626", "#9333ea", "#0d9488", "#7c3aed", "#2563eb"];

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
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedCourses, setAssignedCourses] = useState(["CS-101", "CS-201", "CS-301", "CS-401"]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [currentFaculty, setCurrentFaculty] = useState(null);

  // ── Fetch faculty data from Backend API
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5000/api/faculty");
        const normalized = response.data.map((f) => {
          const firstName = f.firstName ?? "";
          const lastName = f.lastName ?? "";
          const fullName = `${firstName} ${lastName}`.trim();

          return {
            id: f.id ?? f.facultyId ?? "",
            name: fullName,
            firstName,
            middleName: f.middleName ?? "",
            lastName,
            department: f.department ?? "",
            designation: f.designation ?? "",
            status: f.status ?? "Active",
            email: f.email ?? "",
            joinDate: f.joiningDate ?? "",
            experience: f.experience ?? "",
            specializations: Array.isArray(f.specializations)
              ? f.specializations
              : f.specialization ? [f.specialization] : [],
            degree: f.qualification ?? "",
            primaryDept: f.primaryDept ?? f.department ?? "",
            office: f.office ?? "",
            currentLoad: f.currentLoad ?? "",
            avatar: f.avatar ?? ([firstName, lastName]
              .filter(Boolean)
              .map(w => w[0].toUpperCase())
              .join("") || "??"),
          };
        });
        setFacultyData(normalized);
      } catch (err) {
        console.error("Failed to fetch faculty:", err);
        setError("Failed to load faculty data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (showAddForm) return <AddFaculty onBack={() => setShowAddForm(false)} />;

  if (isEditing && currentFaculty) {
    return (
      <UpdateFacultyForm
        faculty={currentFaculty}
        onBack={() => { setIsEditing(false); setCurrentFaculty(null); }}
      />
    );
  }

  const filtered = facultyData.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProfile = (faculty) => { 
    setSelectedFaculty(faculty); 
    setSidebarOpen(true); 
  };

  const closeSidebar = () => { 
    setSidebarOpen(false); 
    setTimeout(() => setSelectedFaculty(null), 400); 
  };

  const selectedIndex = selectedFaculty ? facultyData.findIndex(f => f.id === selectedFaculty.id) : 0;

  return (
    <div className="fm-wrapper">
      <div className={`fm-page${sidebarOpen ? " shifted" : ""}`}>
        <div className="fm-header">
          <h1 className="fm-title">Faculty Management</h1>
          <div className="fm-header-actions">
            <button className="fm-btn-primary" onClick={() => setShowAddForm(true)}>
              <Plus size={15} /> Add New Faculty
            </button>
            <button className="fm-btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Data
            </button>
          </div>
        </div>

        <div className="fm-filters">
          <div className="fm-search-wrap">
            <Search className="fm-search-icon" size={15} />
            <input className="fm-search" placeholder="Search by Name, Faculty ID, or Email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <select className="fm-select"><option>All Departments</option><option>Computer Science</option><option>Mathematics</option></select>
          <select className="fm-select"><option>All Designations</option><option>Professor</option><option>Associate Professor</option></select>
        </div>

        {loading && <div className="fm-status-msg">Loading faculty data...</div>}
        {!loading && error && <div className="fm-status-msg error">{error}</div>}

        {!loading && !error && (
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
                      <td>
                        <div className="fm-name-cell">
                          <Avatar initials={f.avatar} index={i} size={34} />
                          <span className="fm-name-text">{f.name}</span>
                        </div>
                      </td>
                      <td>{f.department}</td><td>{f.designation}</td>
                      <td><StatusBadge status={f.status} /></td>
                      <td>
                        <div className="fm-action-btns" onClick={e => e.stopPropagation()}>
                          <button className="fm-act-btn fm-act-view" onClick={() => openProfile(f)}><Eye size={13} /></button>
                          <button className="fm-act-btn fm-act-edit" onClick={() => { setCurrentFaculty(f); setIsEditing(true); }}><Pencil size={13} /></button>
                          <button className="fm-act-btn fm-act-del"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="fm-card-list">
            {filtered.map((f, i) => (
              <div key={f.id} className={`fm-faculty-card${selectedFaculty?.id === f.id ? " fm-row-selected" : ""}`} onClick={() => openProfile(f)}>
                <div className="fm-card-top">
                  <Avatar initials={f.avatar} index={i} size={48} />
                  <div className="fm-card-info">
                    <div className="fm-card-id">{f.id}</div>
                    <div className="fm-card-name">{f.name}</div>
                    <div className="fm-card-designation">{f.designation}</div>
                  </div>
                  <StatusBadge status={f.status} />
                </div>
                <div className="fm-card-actions" onClick={e => e.stopPropagation()}>
                  <button className="fm-card-view-btn" onClick={() => openProfile(f)}><Eye size={14} /> View Profile</button>
                  <button className="fm-card-icon-btn edit" onClick={() => { setCurrentFaculty(f); setIsEditing(true); }}><Pencil size={14} color="#64748b" /></button>
                  <button className="fm-card-icon-btn del"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="fm-fab" onClick={() => setShowAddForm(true)}><Plus size={24} /></button>

      <FacultyProfile 
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        faculty={selectedFaculty}
        index={selectedIndex}
        allCourses={allCourses}
        assignedCourseCodes={assignedCourses}
        onUpdateCourses={setAssignedCourses}
      />
    </div>
  );
}