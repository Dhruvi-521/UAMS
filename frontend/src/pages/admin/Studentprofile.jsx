import {
    BookMarked, BookOpen, Check,
    Plus, Search, X,
    Phone, Mail, MapPin, User,
} from "lucide-react";
import { useState } from "react";
import "./StudentProfile.css";

// ── Shared helpers (also exported for ManageStudent) ──────────────────────────

export const avatarColors = [
    "#4f46e5", "#7c3aed", "#0891b2", "#059669",
    "#d97706", "#dc2626", "#9333ea", "#0d9488",
    "#7c3aed", "#2563eb",
];

export function Avatar({ initials, index, size = 36 }) {
    return (
        <div
            className="sm-avatar"
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

export function StatusBadge({ status }) {
    const cls =
        status === "Active"
            ? "sm-badge-active"
            : status === "Graduated"
                ? "sm-badge-graduated"
                : "sm-badge-hold";
    return <span className={`sm-badge ${cls}`}>{status}</span>;
}

export function CGPABadge({ cgpa }) {
    if (!cgpa) return <span className="sm-cgpa sm-cgpa-mid">—</span>;
    const val = parseFloat(cgpa);
    const cls = val >= 3.7 ? "sm-cgpa-high" : val >= 3.0 ? "sm-cgpa-mid" : "sm-cgpa-low";
    return <span className={`sm-cgpa ${cls}`}>{cgpa}</span>;
}

// ── Course data ───────────────────────────────────────────────────────────────

export const allCourses = [
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

// ── StudentProfile component ──────────────────────────────────────────────────
// Props:
//   selectedStudent  – normalized student object | null
//   selectedIndex    – index in studentData array (for avatar colour)
//   sidebarOpen      – boolean
//   onClose          – () => void
//   onOverlayClick   – () => void   (same as onClose, kept separate for clarity)

export default function StudentProfile({
    selectedStudent,
    selectedIndex,
    sidebarOpen,
    onClose,
    onOverlayClick,
}) {
    const [sidebarTab, setSidebarTab] = useState("personal");
    const [enrollModalOpen, setEnrollModalOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState("");
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [tempEnrolled, setTempEnrolled] = useState([]);

    // Keep enrolledCourses in sync when selectedStudent changes
    // (parent re-mounts or passes a new student)
    const studentCourses = selectedStudent?.courses ?? [];

    // Initialise local enrolled list when a new student is opened
    const [lastStudentId, setLastStudentId] = useState(null);
    if (selectedStudent && selectedStudent.id !== lastStudentId) {
        setLastStudentId(selectedStudent.id);
        setEnrolledCourses(studentCourses);
        setSidebarTab("personal");
    }

    // ── Enroll modal helpers ──
    const openEnrollModal = () => {
        setTempEnrolled([...enrolledCourses]);
        setCourseSearch("");
        setEnrollModalOpen(true);
    };

    const toggleTemp = (code) =>
        setTempEnrolled((prev) =>
            prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
        );

    const saveEnrollment = () => {
        setEnrolledCourses([...tempEnrolled]);
        setEnrollModalOpen(false);
    };

    const cancelEnrollment = () => setEnrollModalOpen(false);

    const filteredCourses = allCourses.filter(
        (c) =>
            c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
            c.code.toLowerCase().includes(courseSearch.toLowerCase())
    );

    const enrolledCourseObjects = allCourses.filter((c) =>
        enrolledCourses.includes(c.code)
    );

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <>
            {/* Dim overlay */}
            <div
                className={`sm-overlay${sidebarOpen ? " active" : ""}`}
                onClick={onOverlayClick}
            />

            {/* Sidebar / Bottom Sheet */}
            <div className={`sm-sidebar${sidebarOpen ? " open" : ""}`}>

                <div className="sm-sb-header">
                    <div className="sm-sb-drag-handle" />
                    <div className="sm-sb-header-row">
                        <span className="sm-sb-title">Student Profile</span>
                        <X size={16} onClick={onClose} style={{ cursor: "pointer" }} />
                    </div>
                </div>

                {selectedStudent && (
                    <div className="sm-sb-body">

                        {/* ── Hero ── */}
                        <div className="sm-sb-hero">
                            <div className="sm-sb-avatar-wrap">
                                <div className="sm-sb-avatar-ring">
                                    <Avatar
                                        initials={selectedStudent.avatar}
                                        index={selectedIndex}
                                        size={94}
                                    />
                                </div>
                                <div className="sm-sb-badge-float">
                                    <StatusBadge status={selectedStudent.status} />
                                </div>
                            </div>
                            <h2 className="sm-sb-name">{selectedStudent.name}</h2>
                            <p className="sm-sb-id">{selectedStudent.id}</p>
                            <div className="sm-sb-cgpa-row">
                                {selectedStudent.cgpa && (
                                    <>
                                        <span className="sm-sb-cgpa-label">CGPA</span>
                                        <CGPABadge cgpa={selectedStudent.cgpa} />
                                    </>
                                )}
                                {selectedStudent.semester && (
                                    <span className="sm-sb-sem-tag">{selectedStudent.semester}</span>
                                )}
                                {selectedStudent.division && (
                                    <span className="sm-sb-sem-tag">{selectedStudent.division}</span>
                                )}
                            </div>
                        </div>

                        {/* ── Tabs ── */}
                        <div className="sm-sb-tabs">
                            {[
                                { key: "personal", label: "Personal Details" },
                                { key: "academic", label: "Academic Info" },
                                // { key: "courses",  label: "Enrolled Courses" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`sm-sb-tab${sidebarTab === tab.key ? " active" : ""}`}
                                    onClick={() => setSidebarTab(tab.key)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* ── Personal Details ── */}
                        {sidebarTab === "personal" && (
                            <div className="sm-sb-content">
                                <div className="sm-info-grid">
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Program</div>
                                        <div className="sm-info-value">{selectedStudent.program || "—"}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Division</div>
                                        <div className="sm-info-value">{selectedStudent.division || "—"}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Gender</div>
                                        <div className="sm-info-value">{selectedStudent.gender || "—"}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Date of Birth</div>
                                        <div className="sm-info-value">{selectedStudent.dob || "—"}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Enrolled</div>
                                        <div className="sm-info-value">{selectedStudent.joinDate || "—"}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Age</div>
                                        <div className="sm-info-value">{selectedStudent.age || "—"}</div>
                                    </div>
                                </div>

                                <div className="sm-notes-card">
                                    <div className="sm-notes-row">
                                        <Mail size={14} className="sm-notes-icon" />
                                        <div>
                                            <div className="sm-notes-key">Personal Email</div>
                                            <div className="sm-notes-val">{selectedStudent.personalEmail || "—"}</div>
                                        </div>
                                    </div>
                                    <div className="sm-notes-row">
                                        <Mail size={14} className="sm-notes-icon" />
                                        <div>
                                            <div className="sm-notes-key">University Email</div>
                                            <div className="sm-notes-val">{selectedStudent.universityEmail || "—"}</div>
                                        </div>
                                    </div>
                                    <div className="sm-notes-row">
                                        <Phone size={14} className="sm-notes-icon" />
                                        <div>
                                            <div className="sm-notes-key">Phone</div>
                                            <div className="sm-notes-val">{selectedStudent.phone || "—"}</div>
                                        </div>
                                    </div>
                                    <div className="sm-notes-row">
                                        <Phone size={14} className="sm-notes-icon" />
                                        <div>
                                            <div className="sm-notes-key">Parent Phone</div>
                                            <div className="sm-notes-val">{selectedStudent.guardianPhone || "—"}</div>
                                        </div>
                                    </div>
                                    {selectedStudent.address && (
                                        <div className="sm-notes-row">
                                            <MapPin size={14} className="sm-notes-icon" />
                                            <div>
                                                <div className="sm-notes-key">Address</div>
                                                <div className="sm-notes-val">
                                                    {selectedStudent.address?.fullAddress || "—"},{" "}
                                                    {selectedStudent.address?.city || ""},{" "}
                                                    {selectedStudent.address?.state || ""},{" "}
                                                    {selectedStudent.address?.country || ""} -{" "}
                                                    {selectedStudent.address?.pincode || ""}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedStudent.guardian && (
                                        <div className="sm-notes-row sm-notes-last">
                                            <User size={14} className="sm-notes-icon" />
                                            <div>
                                                <div className="sm-notes-key">Guardian</div>
                                                <div className="sm-notes-val">
                                                    {selectedStudent.guardian}
                                                    {selectedStudent.guardianPhone
                                                        ? ` · ${selectedStudent.guardianPhone}`
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Academic Info ── */}
                        {sidebarTab === "academic" && (
                            <div className="sm-sb-content">
                                <div className="sm-info-grid">
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Student ID</div>
                                        <div className="sm-info-value">{selectedStudent.id}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Current Semester</div>
                                        <div className="sm-info-value">{selectedStudent.semester || "—"}</div>
                                    </div>
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Division</div>
                                        <div className="sm-info-value">{selectedStudent.division || "—"}</div>
                                    </div>
                                    {selectedStudent.cgpa && (
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">CGPA</div>
                                            <div className="sm-info-value">
                                                <CGPABadge cgpa={selectedStudent.cgpa} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="sm-info-card">
                                        <div className="sm-info-label">Courses Enrolled</div>
                                        <div className="sm-info-value">{enrolledCourses.length} Courses</div>
                                    </div>
                                    <div className="sm-info-card sm-info-full">
                                        <div className="sm-info-label">Academic Status</div>
                                        <div className="sm-info-value">
                                            <StatusBadge status={selectedStudent.status} />
                                        </div>
                                    </div>
                                    <div className="sm-info-card sm-info-full">
                                        <div className="sm-info-label">Program</div>
                                        <div className="sm-info-value">{selectedStudent.program || "—"}</div>
                                    </div>
                                </div>

                                {/* CGPA Progress Bar */}
                                {selectedStudent.cgpa && (
                                    <div className="sm-cgpa-bar-card">
                                        <div className="sm-cgpa-bar-top">
                                            <span className="sm-cgpa-bar-label">CGPA Progress</span>
                                            <span className="sm-cgpa-bar-val">
                                                {selectedStudent.cgpa} / 4.00
                                            </span>
                                        </div>
                                        <div className="sm-cgpa-bar-track">
                                            <div
                                                className="sm-cgpa-bar-fill"
                                                style={{
                                                    width: `${(parseFloat(selectedStudent.cgpa) / 4) * 100}%`,
                                                    background:
                                                        parseFloat(selectedStudent.cgpa) >= 3.7
                                                            ? "#059669"
                                                            : parseFloat(selectedStudent.cgpa) >= 3.0
                                                                ? "#d97706"
                                                                : "#dc2626",
                                                }}
                                            />
                                        </div>
                                        <div className="sm-cgpa-bar-grades">
                                            <span>0.0</span>
                                            <span>1.0</span>
                                            <span>2.0</span>
                                            <span>3.0</span>
                                            <span>4.0</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Enrolled Courses ── */}
                        {sidebarTab === "courses" && (
                            <div className="sm-sb-content">
                                <div className="sm-courses-hdr">
                                    <span className="sm-courses-count">
                                        {enrolledCourses.length} Course
                                        {enrolledCourses.length !== 1 ? "s" : ""} Enrolled
                                    </span>
                                    <button className="sm-enroll-btn" onClick={openEnrollModal}>
                                        <Plus size={13} /> Enroll Course
                                    </button>
                                </div>

                                {enrolledCourseObjects.length > 0 ? (
                                    enrolledCourseObjects.map((c, i) => (
                                        <div className="sm-course-item" key={i}>
                                            <div className="sm-course-icon">
                                                <BookMarked size={15} color="#1e40af" />
                                            </div>
                                            <div className="sm-course-info">
                                                <div className="sm-course-code">{c.code}</div>
                                                <div className="sm-course-name">{c.name}</div>
                                            </div>
                                            <div className="sm-course-meta">
                                                <span className="sm-course-credits">{c.credits} Credits</span>
                                                <span className="sm-course-sem">{c.semester}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="sm-no-courses">
                                        <BookOpen size={32} color="#cbd5e1" />
                                        <p>No courses enrolled yet</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Enroll Course Modal ── */}
            {/* {enrollModalOpen && (
                <div className="sm-modal-overlay" onClick={cancelEnrollment}>
                    <div className="sm-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="sm-modal-header">
                            <div>
                                <h2 className="sm-modal-title">Enroll in Courses</h2>
                                <p className="sm-modal-sub">
                                    Select courses for <strong>{selectedStudent?.name}</strong>
                                </p>
                            </div>
                            <button className="sm-modal-close" onClick={cancelEnrollment}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="sm-modal-search-wrap">
                            <Search size={14} className="sm-modal-search-icon" />
                            <input
                                className="sm-modal-search"
                                placeholder="Search course name or code..."
                                value={courseSearch}
                                onChange={(e) => setCourseSearch(e.target.value)}
                            />
                        </div>

                        <div className="sm-modal-summary">
                            <span>{tempEnrolled.length} selected</span>
                            {tempEnrolled.length > 0 && (
                                <button
                                    className="sm-modal-clear"
                                    onClick={() => setTempEnrolled([])}
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        <div className="sm-modal-list">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((c, i) => {
                                    const sel = tempEnrolled.includes(c.code);
                                    return (
                                        <div
                                            key={i}
                                            className={`sm-modal-row${sel ? " selected" : ""}`}
                                            onClick={() => toggleTemp(c.code)}
                                        >
                                            <div className={`sm-modal-check${sel ? " checked" : ""}`}>
                                                {sel && <Check size={11} color="#fff" strokeWidth={3} />}
                                            </div>
                                            <div className="sm-modal-course-icon">
                                                <BookMarked size={14} color={sel ? "#1e40af" : "#94a3b8"} />
                                            </div>
                                            <div className="sm-modal-course-info">
                                                <div className="sm-modal-course-name">{c.name}</div>
                                                <div className="sm-modal-course-meta">
                                                    {c.code} · {c.semester}
                                                </div>
                                            </div>
                                            <span className="sm-modal-credits">{c.credits} Credits</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="sm-modal-empty">
                                    <BookOpen size={28} color="#cbd5e1" />
                                    <p>No courses found</p>
                                </div>
                            )}
                        </div>

                        <div className="sm-modal-footer">
                            <button className="sm-modal-cancel" onClick={cancelEnrollment}>
                                Cancel
                            </button>
                            <button className="sm-modal-save" onClick={saveEnrollment}>
                                <Check size={14} /> Save Enrollment
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
}