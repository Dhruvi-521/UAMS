import {
  Eye, Pencil, Plus, Trash2, Search,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
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

const avatarColors = [
  "#4f46e5", "#7c3aed", "#0891b2", "#059669",
  "#d97706", "#dc2626", "#9333ea", "#0d9488", "#2563eb",
];

// ─────────────────────────────────────────────────────────────────────────────
// Converts ANY faculty shape (raw backend OR previously normalised) into the
// single normalised object used everywhere in the UI.
// ─────────────────────────────────────────────────────────────────────────────
function normalizeFaculty(f) {
  const firstName = f.firstName ?? "";
  const lastName = f.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  const addressObj =
    typeof f.address === "object" && f.address !== null ? f.address : {};

  return {
    // Identity
    id: f.id ?? f.facultyId ?? "",
    facultyId: f.facultyId ?? f.id ?? "",

    // Personal
    name: fullName,
    firstName,
    middleName: f.middleName ?? "",
    lastName,
    gender: f.gender ?? "Male",
    dob: f.dob ?? "",

    // Address — nested object OR flat keys
    address: addressObj.fullAddress ?? (typeof f.address === "string" ? f.address : ""),
    city: addressObj.city ?? f.city ?? "",
    state: addressObj.state ?? f.state ?? "",
    country: addressObj.country ?? f.country ?? "India",
    pincode: addressObj.pincode ?? f.pincode ?? "",

    // Professional — keep both backend and normalised key names
    department: f.department ?? "",
    designation: f.designation ?? "",
    status: f.status ?? "Active",
    degree: f.qualification ?? f.degree ?? "",
    qualification: f.qualification ?? f.degree ?? "",
    experience: f.experience ?? "",
    joinDate: f.joiningDate ?? f.joinDate ?? f.dateOfJoining ?? "",
    joiningDate: f.joiningDate ?? f.joinDate ?? f.dateOfJoining ?? "",
    dateOfJoining: f.joiningDate ?? f.joinDate ?? f.dateOfJoining ?? "",

    // Specialization — both array and single string
    specializations: Array.isArray(f.specializations)
      ? f.specializations
      : f.specialization
        ? (Array.isArray(f.specialization) ? f.specialization : [f.specialization])
        : [],
    specialization: Array.isArray(f.specialization)
      ? (f.specialization[0] ?? "")
      : Array.isArray(f.specializations)
        ? (f.specializations[0] ?? "")
        : (f.specialization ?? ""),

    // Contact — keep both backend and normalised key names
    email: f.email ?? f.universityEmail ?? "",
    universityEmail: f.email ?? f.universityEmail ?? "",
    personalEmail: f.personalEmail ?? "",
    phone: f.phone ?? f.contactNumber ?? "",
    contactNumber: f.phone ?? f.contactNumber ?? "",
    familyContact: f.familyPhone ?? f.familyContact ?? f.guardianPhone ?? "",
    familyPhone: f.familyPhone ?? f.familyContact ?? f.guardianPhone ?? "",

    // Misc
    primaryDept: f.primaryDept ?? f.department ?? "",
    office: f.office ?? "",
    currentLoad: f.currentLoad ?? "",
    avatar:
      f.avatar ??
      ([firstName, lastName].filter(Boolean).map((w) => w[0].toUpperCase()).join("") || "??"),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper sub-components
// ─────────────────────────────────────────────────────────────────────────────
function Avatar({ initials, index, size = 36 }) {
  return (
    <div
      className="fm-avatar"
      style={{
        width: size,
        height: size,
        background: avatarColors[index % avatarColors.length],
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`fm-badge ${status === "Active" ? "fm-badge-active" : "fm-badge-leave"}`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
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

  // ── Fetch list from backend (extracted so it can be called after updates)
  const fetchFaculty = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("http://localhost:5000/api/faculty");
      setFacultyData(data.map(normalizeFaculty));
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
      setError("Failed to load faculty data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFaculty(); }, [fetchFaculty]);

  // ── Called by UpdateFacultyForm right after a successful PUT
  // `savedForm` is the exact form state that was submitted.
  const handleUpdateSuccess = useCallback((savedForm) => {
    const targetId = savedForm.facultyId ?? savedForm.id;

    // Optimistic patch — update local state instantly
    setFacultyData((prev) =>
      prev.map((f) => {
        if (f.id !== targetId) return f;

        const updated = {
          ...f,
          firstName: savedForm.firstName ?? f.firstName,
          middleName: savedForm.middleName ?? f.middleName,
          lastName: savedForm.lastName ?? f.lastName,
          gender: savedForm.gender ?? f.gender,
          dob: savedForm.dob ?? f.dob,
          address: savedForm.address ?? f.address,
          city: savedForm.city ?? f.city,
          state: savedForm.state ?? f.state,
          country: savedForm.country ?? f.country,
          pincode: savedForm.pincode ?? f.pincode,
          department: savedForm.department ?? f.department,
          designation: savedForm.designation ?? f.designation,
          degree: savedForm.degree ?? f.degree,
          qualification: savedForm.degree ?? f.qualification,
          experience: savedForm.experience ?? f.experience,
          joinDate: savedForm.dateOfJoining ?? f.joinDate,
          joiningDate: savedForm.dateOfJoining ?? f.joiningDate,
          dateOfJoining: savedForm.dateOfJoining ?? f.dateOfJoining,
          specialization: savedForm.specialization ?? f.specialization,
          specializations: savedForm.specialization
            ? [savedForm.specialization]
            : f.specializations,
          email: savedForm.universityEmail ?? f.email,
          universityEmail: savedForm.universityEmail ?? f.universityEmail,
          personalEmail: savedForm.personalEmail ?? f.personalEmail,
          contactNumber: savedForm.contactNumber ?? f.contactNumber,
          phone: savedForm.contactNumber ?? f.phone,
          familyContact: savedForm.familyContact ?? f.familyContact,
          familyPhone: savedForm.familyContact ?? f.familyPhone,
        };

        // Rebuild derived display fields
        const fullName = `${updated.firstName} ${updated.lastName}`.trim();
        updated.name = fullName;
        updated.avatar = [updated.firstName, updated.lastName]
          .filter(Boolean).map((w) => w[0].toUpperCase()).join("") || "??";

        return updated;
      })
    );

    // Also re-fetch from server to stay in sync with DB
    fetchFaculty();

    // Navigate back to the table
    setIsEditing(false);
    setCurrentFaculty(null);
  }, [fetchFaculty]);

  // ── Sub-page routing
  if (showAddForm) {
    return <AddFaculty onBack={() => { setShowAddForm(false); fetchFaculty(); }} />;
  }

  if (isEditing && currentFaculty) {
    return (
      <UpdateFacultyForm
        faculty={currentFaculty}
        onBack={() => { setIsEditing(false); setCurrentFaculty(null); }}
        onUpdateSuccess={handleUpdateSuccess}   // ← key prop
      />
    );
  }

  const filtered = facultyData.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openProfile = (faculty) => { setSelectedFaculty(faculty); setSidebarOpen(true); };
  const closeSidebar = () => {
    setSidebarOpen(false);
    setTimeout(() => setSelectedFaculty(null), 400);
  };

  const selectedIndex = selectedFaculty
    ? facultyData.findIndex((f) => f.id === selectedFaculty.id)
    : 0;

  const handleDelete = async (faculty) => {
    try {
      const confirmDelete = window.confirm(
        `Delete ${faculty.name}?`
      );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/faculty/${faculty.facultyId}`
      );

      // remove from UI
      setFacultyData(prev =>
        prev.filter(f => f.facultyId !== faculty.facultyId)
      );

      alert("Faculty deleted successfully");

    } catch (error) {
      console.error("Delete Error:", error.response?.data || error);
      alert("Error deleting faculty");
    }
  };

  return (
    <div className="fm-wrapper">
      <div className={`fm-page${sidebarOpen ? " shifted" : ""}`}>

        {/* Header */}
        <div className="fm-header">
          <h1 className="fm-title">Faculty Management</h1>
          <div className="fm-header-actions">
            <button className="fm-btn-primary" onClick={() => setShowAddForm(true)}>
              <Plus size={15} /> Add New Faculty
            </button>
            <button className="fm-btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Data
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="fm-filters">
          <div className="fm-search-wrap">
            <Search className="fm-search-icon" size={15} />
            <input
              className="fm-search"
              placeholder="Search by Name, Faculty ID, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="fm-select">
            <option>All Departments</option><option>Computer Science</option><option>Mathematics</option>
          </select>
          <select className="fm-select">
            <option>All Designations</option><option>Professor</option><option>Associate Professor</option>
          </select>
        </div>

        {loading && <div className="fm-status-msg">Loading faculty data...</div>}
        {!loading && error && <div className="fm-status-msg error">{error}</div>}

        {/* Desktop Table */}
        {!loading && !error && (
          <div className="fm-table-card">
            <div className="fm-table-scroll">
              <table className="fm-table">
                <thead>
                  <tr>
                    <th>Faculty ID</th><th>Name</th><th>Department</th>
                    <th>Designation</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f, i) => (
                    <tr
                      key={f.id}
                      className={selectedFaculty?.id === f.id ? "fm-row-selected" : ""}
                      onClick={() => openProfile(f)}
                    >
                      <td><span className="fm-id-text">{f.id}</span></td>
                      <td>
                        <div className="fm-name-cell">
                          <Avatar initials={f.avatar} index={i} size={34} />
                          <span className="fm-name-text">{f.name}</span>
                        </div>
                      </td>
                      <td>{f.department}</td>
                      <td>{f.designation}</td>
                      <td><StatusBadge status={f.status} /></td>
                      <td>
                        <div className="fm-action-btns" onClick={(e) => e.stopPropagation()}>
                          <button className="fm-act-btn fm-act-view" onClick={() => openProfile(f)}>
                            <Eye size={13} />
                          </button>
                          <button
                            className="fm-act-btn fm-act-edit"
                            onClick={() => { setCurrentFaculty(f); setIsEditing(true); }}
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            className="fm-act-btn fm-act-del"
                            onClick={() => handleDelete(f)}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        {!loading && !error && (
          <div className="fm-card-list">
            {filtered.map((f, i) => (
              <div
                key={f.id}
                className={`fm-faculty-card${selectedFaculty?.id === f.id ? " fm-row-selected" : ""}`}
                onClick={() => openProfile(f)}
              >
                <div className="fm-card-top">
                  <Avatar initials={f.avatar} index={i} size={48} />
                  <div className="fm-card-info">
                    <div className="fm-card-id">{f.id}</div>
                    <div className="fm-card-name">{f.name}</div>
                    <div className="fm-card-designation">{f.designation}</div>
                  </div>
                  <StatusBadge status={f.status} />
                </div>
                <div className="fm-card-actions" onClick={(e) => e.stopPropagation()}>
                  <button className="fm-card-view-btn" onClick={() => openProfile(f)}>
                    <Eye size={14} /> View Profile
                  </button>
                  <button
                    className="fm-card-icon-btn edit"
                    onClick={() => { setCurrentFaculty(f); setIsEditing(true); }}
                  >
                    <Pencil size={14} color="#64748b" />
                  </button>
                  <button
                    className="fm-card-icon-btn del"
                    onClick={() => handleDelete(f)}
                  >
                    <Trash2 size={14} />
                  </button>
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