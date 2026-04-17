import { Eye, Pencil, Plus, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageStudent.css";
import AddStudent from "./addStudent";
import UpdateStudentForm from "./UpdateStudentForm";
import StudentProfile, { Avatar, StatusBadge } from "./Studentprofile";

export default function StudentManagement() {
    const [view, setView] = useState("list");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("All Departments");
    const [semesterFilter, setSemesterFilter] = useState("All Semesters");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const calculateAge = (dobString) => {
        if (!dobString) return null;
        const birthDate = new Date(dobString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // If the birthday hasn't happened yet this year, subtract one year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // ── Fetch students from API ───────────────────────────────────────────────
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get("http://localhost:5000/api/students");
                // 🔥 ONLY THIS PART IS UPDATED (inside map)

                const normalized = response.data.map((f) => {
                    const firstName = f.firstName ?? "";
                    const lastName = f.lastName ?? "";
                    const fullName = `${firstName} ${lastName}`.trim();

                    return {
                        id: f.id ?? f.studentId ?? "",
                        rollNumber: f.rollNumber ?? "",
                        name: fullName,
                        firstName,
                        middleName: f.middleName ?? "",
                        lastName,
                        semester: f.semester ?? "",
                        batch: f.batch ?? "",
                        division: f.division ?? "",

                        // ✅ keep as string for table (NO CHANGE)
                        program: f.program?.programName ?? "",

                        status: f.status ?? "Active",

                        // ✅ FIX email fallback
                        email: f.universityEmail ?? f.personalEmail ?? f.email ?? "",

                        // ✅ FIX phone naming
                        phone: f.mobile ?? f.mobileNumber ?? "",

                        joinDate: f.createdAt
                            ? new Date(f.createdAt).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                            })
                            : "",

                        dob: f.dob
                            ? new Date(f.dob).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric",
                            })
                            : "",

                        cgpa: f.cgpa ?? f.gpa ?? "",
                        age: calculateAge(f.dob),

                        // ✅ 🔥 CRITICAL FIX (KEEP OBJECT)
                        address: f.address || {},

                        gender: f.gender ?? "",
                        guardian: f.guardianName ?? f.guardian ?? "",
                        guardianPhone: f.parentContact ?? f.guardianContact ?? "",
                        courses: f.courses ?? [],

                        avatar:
                            [firstName, lastName]
                                .filter(Boolean)
                                .map((w) => w[0].toUpperCase())
                                .join("") || "??",
                    };
                });
                setStudentData(normalized);
            } catch (err) {
                console.error("Failed to fetch students:", err);
                setError("Failed to load student data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    // ── Page-level view switches ──────────────────────────────────────────────
    if (view === "addStudent") {
        return <AddStudent onBack={() => setView("list")} />;
    }
    if (isEditing && editingStudent) {
        return (
            <UpdateStudentForm
                student={editingStudent}
                onBack={() => { setIsEditing(false); setEditingStudent(null); }}
            />
        );
    }

    // ── Filtering ─────────────────────────────────────────────────────────────
    const filtered = studentData.filter((s) => {
        const matchesSearch =
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.email ?? "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment =
            departmentFilter === "All Departments" || s.program === departmentFilter;

        const matchesSemester =
            semesterFilter === "All Semesters" || s.semester === semesterFilter;

        const matchesStatus =
            statusFilter === "All Status" || s.status === statusFilter;

        return matchesSearch && matchesDepartment && matchesSemester && matchesStatus;
    });

    const handleDelete = async (studentId) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            const res = await axios.delete(
                `http://localhost:5000/api/students/student/${studentId}`
            );

            if (res.data.success) {
                alert("Student deleted successfully");

                // remove from UI
                setStudentData((prev) =>
                    prev.filter((s) => s.id !== studentId)
                );
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to delete student");
        }
    };

    // ── Sidebar helpers ───────────────────────────────────────────────────────
    const openProfile = (student) => { setSelectedStudent(student); setSidebarOpen(true); };
    const closeSidebar = () => { setSidebarOpen(false); setSelectedStudent(null); };
    const selectedIndex = studentData.findIndex((s) => s.id === selectedStudent?.id);

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="sm-wrapper">

            {/* ── Main page ── */}
            <div className={`sm-page${sidebarOpen ? " shifted" : ""}`}>

                {/* Header */}
                <div className="sm-header">
                    <div>
                        <h1 className="sm-title">Student Management</h1>
                    </div>
                    <div className="sm-header-actions">
                        <button className="sm-btn-primary" onClick={() => setView("addStudent")}>
                            <UserPlus size={15} /> Add Student
                        </button>
                        {/* <button className="sm-btn-secondary">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export Data
                        </button> */}
                    </div>
                </div>

                {/* Filters */}
                <div className="sm-filters">
                    <div className="sm-search-wrap">
                        <svg className="sm-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            className="sm-search"
                            placeholder="Search by Name, Student ID, or Email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select className="sm-select" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                        <option>All Departments</option>
                        <option>Computer Science</option>
                        <option>Mathematics</option>
                    </select>
                    <select className="sm-select" value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)}>
                        <option>All Semesters</option>
                        <option>Semester 1</option>
                        <option>Semester 2</option>
                        <option>Semester 3</option>
                        <option>Semester 4</option>
                        <option>Semester 5</option>
                        <option>Semester 6</option>
                        <option>Semester 7</option>
                        <option>Semester 8</option>
                    </select>
                    <select className="sm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Hold</option>
                        <option>Graduated</option>
                    </select>
                </div>

                {/* ── Desktop Table ── */}
                <div className="sm-table-card">
                    <div className="sm-table-scroll">
                        <table className="sm-table">
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Name</th>
                                    <th>Program</th>
                                    <th>Semester</th>
                                    <th>Division</th>
                                    <th>Batch</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Loading */}
                                {loading && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: "center", padding: "2.5rem", color: "#94a3b8" }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                    style={{ animation: "spin 1s linear infinite" }}>
                                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                </svg>
                                                Loading students...
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {/* Error */}
                                {!loading && error && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: "center", padding: "2.5rem", color: "#dc2626" }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="12" />
                                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                                </svg>
                                                {error}
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {/* Empty */}
                                {!loading && !error && filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: "center", padding: "2.5rem", color: "#94a3b8" }}>
                                            No students found matching your filters.
                                        </td>
                                    </tr>
                                )}

                                {/* Student rows */}
                                {!loading && !error && filtered.map((s, i) => (
                                    <tr
                                        key={s.id}
                                        className={selectedStudent?.id === s.id ? "sm-row-selected" : ""}
                                        onClick={() => openProfile(s)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <td><span className="sm-id-text">{s.id}</span></td>
                                        <td>
                                            <div className="sm-name-cell">
                                                <Avatar initials={s.avatar} index={i} size={36} />
                                                <div>
                                                    <div className="sm-name-text">{s.name}</div>
                                                    <div className="sm-email-text">{s.email || "—"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{s.program || "—"}</td>
                                        <td><span className="sm-sem-pill">{s.semester || "—"}</span></td>
                                        <td>{s.division || "—"}</td>
                                        <td>{s.batch || "—"}</td>
                                        <td><StatusBadge status={s.status} /></td>
                                        <td>
                                            <div className="sm-action-btns" onClick={(e) => e.stopPropagation()}>
                                                <button className="sm-act-btn sm-act-view" onClick={() => openProfile(s)}>
                                                    <Eye size={13} />
                                                </button>
                                                <button
                                                    className="sm-act-btn sm-act-edit"
                                                    onClick={() => {
                                                        setEditingStudent(s);   // ✅ FIXED
                                                        setIsEditing(true);
                                                    }}
                                                >
                                                    <Pencil size={13} />
                                                </button>
                                                <button
                                                    className="sm-act-btn sm-act-del"
                                                    onClick={() => handleDelete(s.id)}
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

                {/* ── Mobile Cards ── */}
                <div className="sm-card-list">
                    {loading && (
                        <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                            Loading students...
                        </div>
                    )}
                    {!loading && error && (
                        <div style={{ textAlign: "center", padding: "2rem", color: "#dc2626" }}>
                            {error}
                        </div>
                    )}
                    {!loading && !error && filtered.map((s, i) => (
                        <div
                            key={s.id}
                            className={`sm-student-card${selectedStudent?.id === s.id ? " sm-row-selected" : ""}`}
                            onClick={() => openProfile(s)}
                        >
                            <div className="sm-card-top">
                                <Avatar initials={s.avatar} index={i} size={48} />
                                <div className="sm-card-info">
                                    <div className="sm-card-id">{s.id}</div>
                                    <div className="sm-card-name">{s.name}</div>
                                    <div className="sm-card-sub">
                                        {s.semester || "—"} · {s.program || "—"}
                                    </div>
                                </div>
                                <StatusBadge status={s.status} />
                            </div>
                            <div className="sm-card-actions" onClick={(e) => e.stopPropagation()}>
                                <button className="sm-card-view-btn" onClick={() => openProfile(s)}>
                                    <Eye size={14} /> View Profile
                                </button>
                                <button
                                    className="sm-card-icon-btn edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingStudent(s);
                                        setIsEditing(true);
                                    }}
                                >
                                    <Pencil size={14} color="#64748b" />
                                </button>
                                <button
                                    className="sm-card-icon-btn del"
                                    onClick={() => handleDelete(s.id)}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAB */}
            <button className="sm-fab" onClick={() => setView("addStudent")}>
                <Plus size={24} />
            </button>

            {/* ── Profile Sidebar ── */}
            <StudentProfile
                selectedStudent={selectedStudent}
                selectedIndex={selectedIndex}
                sidebarOpen={sidebarOpen}
                onClose={closeSidebar}
                onOverlayClick={closeSidebar}
            />

        </div>
    );
}