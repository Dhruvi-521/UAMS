import {
    BookMarked, BookOpen, Check, Eye,
    Pencil, Plus, Search, Trash2, X,
    GraduationCap, Award, Phone, Mail, MapPin, Calendar, User, FileText
} from "lucide-react";
import { useState } from "react";
import "./ManageStudent.css";

const studentData = [
    { id: "S-20240001", name: "Aiden Parker", department: "Computer Science", semester: "Semester 3", status: "Active", email: "aiden.parker@student.edu", phone: "+1 (555) 201-3341", joinDate: "Aug 12, 2022", dob: "Mar 5, 2003", cgpa: "3.85", address: "42 Maple Ave, Boston, MA 02101", courses: ["CS-101", "CS-201", "CS-301"], avatar: "AP", gender: "Male", guardian: "Robert Parker", guardianPhone: "+1 (555) 201-0001" },
    { id: "S-20240002", name: "Sophia Lee", department: "Computer Science", semester: "Semester 5", status: "Active", email: "sophia.lee@student.edu", phone: "+1 (555) 202-4452", joinDate: "Aug 10, 2021", dob: "Jul 14, 2002", cgpa: "3.92", address: "18 Oak Street, Cambridge, MA 02139", courses: ["CS-101", "CS-401", "CS-501", "CS-601"], avatar: "SL", gender: "Female", guardian: "James Lee", guardianPhone: "+1 (555) 202-0002" },
    { id: "S-20240003", name: "Marcus Johnson", department: "Computer Science", semester: "Semester 1", status: "Active", email: "marcus.j@student.edu", phone: "+1 (555) 203-5563", joinDate: "Jan 8, 2024", dob: "Nov 22, 2004", cgpa: "3.45", address: "7 Pine Road, Somerville, MA 02143", courses: ["CS-101", "CS-201"], avatar: "MJ", gender: "Male", guardian: "Angela Johnson", guardianPhone: "+1 (555) 203-0003" },
    { id: "S-20240004", name: "Priya Sharma", department: "Computer Science", semester: "Semester 7", status: "Active", email: "priya.sharma@student.edu", phone: "+1 (555) 204-6674", joinDate: "Aug 9, 2020", dob: "Feb 18, 2001", cgpa: "3.97", address: "91 Elm Drive, Brookline, MA 02445", courses: ["CS-601", "CS-701", "CS-801", "CS-901"], avatar: "PS", gender: "Female", guardian: "Anita Sharma", guardianPhone: "+1 (555) 204-0004" },
    { id: "S-20240005", name: "Ethan Williams", department: "Computer Science", semester: "Semester 4", status: "On Hold", email: "ethan.w@student.edu", phone: "+1 (555) 205-7785", joinDate: "Jan 10, 2022", dob: "Aug 30, 2002", cgpa: "2.88", address: "33 Birch Lane, Newton, MA 02458", courses: ["CS-201", "CS-301", "CS-401"], avatar: "EW", gender: "Male", guardian: "Carol Williams", guardianPhone: "+1 (555) 205-0005" },
    { id: "S-20240006", name: "Zara Ahmed", department: "Computer Science", semester: "Semester 6", status: "Active", email: "zara.ahmed@student.edu", phone: "+1 (555) 206-8896", joinDate: "Aug 14, 2021", dob: "May 9, 2002", cgpa: "3.76", address: "56 Cedar Court, Arlington, MA 02474", courses: ["CS-501", "CS-601", "CS-701"], avatar: "ZA", gender: "Female", guardian: "Hassan Ahmed", guardianPhone: "+1 (555) 206-0006" },
    { id: "S-20240007", name: "Noah Kim", department: "Computer Science", semester: "Semester 2", status: "Active", email: "noah.kim@student.edu", phone: "+1 (555) 207-9907", joinDate: "Jan 6, 2023", dob: "Dec 3, 2003", cgpa: "3.60", address: "12 Walnut Blvd, Medford, MA 02155", courses: ["CS-101", "CS-201", "CS-111"], avatar: "NK", gender: "Male", guardian: "Soo Kim", guardianPhone: "+1 (555) 207-0007" },
    { id: "S-20240008", name: "Isabella Rossi", department: "Computer Science", semester: "Semester 8", status: "Active", email: "i.rossi@student.edu", phone: "+1 (555) 208-1118", joinDate: "Aug 11, 2020", dob: "Oct 17, 2000", cgpa: "3.88", address: "78 Spruce Way, Waltham, MA 02451", courses: ["CS-801", "CS-901", "CS-111"], avatar: "IR", gender: "Female", guardian: "Marco Rossi", guardianPhone: "+1 (555) 208-0008" },
    { id: "S-20240009", name: "Liam Thompson", department: "Computer Science", semester: "Semester 3", status: "Graduated", email: "liam.t@student.edu", phone: "+1 (555) 209-2229", joinDate: "Aug 15, 2020", dob: "Jun 25, 2000", cgpa: "3.55", address: "5 Aspen Circle, Belmont, MA 02478", courses: ["CS-101", "CS-201", "CS-301"], avatar: "LT", gender: "Male", guardian: "David Thompson", guardianPhone: "+1 (555) 209-0009" },
    { id: "S-20240010", name: "Mia Chen", department: "Computer Science", semester: "Semester 5", status: "Active", email: "mia.chen@student.edu", phone: "+1 (555) 210-3340", joinDate: "Aug 13, 2021", dob: "Sep 11, 2002", cgpa: "3.93", address: "23 Poplar St, Malden, MA 02148", courses: ["CS-401", "CS-501", "CS-601", "CS-701"], avatar: "MC", gender: "Female", guardian: "Wei Chen", guardianPhone: "+1 (555) 210-0010" },
];

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
        <div className="sm-avatar" style={{ width: size, height: size, background: avatarColors[index % avatarColors.length], fontSize: size * 0.36 }}>
            {initials}
        </div>
    );
}

function StatusBadge({ status }) {
    const cls = status === "Active" ? "sm-badge-active" : status === "Graduated" ? "sm-badge-graduated" : "sm-badge-hold";
    return <span className={`sm-badge ${cls}`}>{status}</span>;
}

function CGPABadge({ cgpa }) {
    const val = parseFloat(cgpa);
    const cls = val >= 3.7 ? "sm-cgpa-high" : val >= 3.0 ? "sm-cgpa-mid" : "sm-cgpa-low";
    return <span className={`sm-cgpa ${cls}`}>{cgpa}</span>;
}

export default function StudentManagement() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarTab, setSidebarTab] = useState("personal");
    const [enrollModalOpen, setEnrollModalOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState("");
    const [enrolledCourses, setEnrolledCourses] = useState(["CS-101", "CS-201", "CS-301"]);
    const [tempEnrolled, setTempEnrolled] = useState([]);
    const [departmentFilter, setDepartmentFilter] = useState("All Departments");
    const [semesterFilter, setSemesterFilter] = useState("All Semesters");
    const [statusFilter, setStatusFilter] = useState("All Status");

    const filtered = studentData.filter((s) => {

        const matchesSearch =
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment =
            departmentFilter === "All Departments" ||
            s.department === departmentFilter;

        const matchesSemester =
            semesterFilter === "All Semesters" ||
            s.semester === semesterFilter;

        const matchesStatus =
            statusFilter === "All Status" ||
            s.status === statusFilter;

        return (
            matchesSearch &&
            matchesDepartment &&
            matchesSemester &&
            matchesStatus
        );
    });

    const openProfile = (student) => {
        setSelectedStudent(student);
        setSidebarOpen(true);
        setSidebarTab("personal");
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
        setSelectedStudent(null);
    };

    const openEnrollModal = () => {
        setTempEnrolled([...enrolledCourses]);
        setCourseSearch("");
        setEnrollModalOpen(true);
    };

    const toggleTemp = (code) =>
        setTempEnrolled(prev =>
            prev.includes(code)
                ? prev.filter(c => c !== code)
                : [...prev, code]
        );

    const saveEnrollment = () => {
        setEnrolledCourses([...tempEnrolled]);
        setEnrollModalOpen(false);
    };

    const cancelEnrollment = () => setEnrollModalOpen(false);

    const filteredCourses = allCourses.filter(c =>
        c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
        c.code.toLowerCase().includes(courseSearch.toLowerCase())
    );

    const enrolledCourseObjects = allCourses.filter(c =>
        enrolledCourses.includes(c.code)
    );

    const selectedIndex = studentData.findIndex(
        s => s.id === selectedStudent?.id
    );
    return (
        <div className="sm-wrapper">

            {/* Dim overlay */}
            <div className={`sm-overlay${sidebarOpen ? " active" : ""}`} onClick={closeSidebar} />

            {/* ── Main page ── */}
            <div className={`sm-page${sidebarOpen ? " shifted" : ""}`}>

                <div className="sm-header">
                    <div>
                        <h1 className="sm-title">Student Management</h1>
                    </div>
                    <div className="sm-header-actions">
                        <button className="sm-btn-primary"><Plus size={15} /> Add New Student</button>
                        <button className="sm-btn-secondary">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export Data
                        </button>
                    </div>
                </div>

                <div className="sm-filters">
                    <div className="sm-search-wrap">
                        <svg className="sm-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        <input className="sm-search" placeholder="Search by Name, Student ID, or Email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <select
                        className="sm-select"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                        <option>All Departments</option>
                        <option>Computer Science</option>
                        <option>Mathematics</option>
                    </select>

                    <select
                        className="sm-select"
                        value={semesterFilter}
                        onChange={(e) => setSemesterFilter(e.target.value)}
                    >
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

                    <select
                        className="sm-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>On Hold</option>
                        <option>Graduated</option>
                    </select>
                </div>

                {/* Summary Stats */}
                {/* <div className="sm-stats-row">
                    <div className="sm-stat-card">
                        <div className="sm-stat-icon blue"><GraduationCap size={18} color="#1e40af" /></div>
                        <div><div className="sm-stat-num">{studentData.length}</div><div className="sm-stat-label">Total Students</div></div>
                    </div>
                    <div className="sm-stat-card">
                        <div className="sm-stat-icon green"><User size={18} color="#059669" /></div>
                        <div><div className="sm-stat-num">{studentData.filter(s => s.status === "Active").length}</div><div className="sm-stat-label">Active</div></div>
                    </div>
                    <div className="sm-stat-card">
                        <div className="sm-stat-icon amber"><Award size={18} color="#d97706" /></div>
                        <div><div className="sm-stat-num">{studentData.filter(s => s.status === "Graduated").length}</div><div className="sm-stat-label">Graduated</div></div>
                    </div>
                    <div className="sm-stat-card">
                        <div className="sm-stat-icon red"><FileText size={18} color="#dc2626" /></div>
                        <div><div className="sm-stat-num">{studentData.filter(s => s.status === "On Hold").length}</div><div className="sm-stat-label">On Hold</div></div>
                    </div>
                </div> */}

                {/* Desktop table */}
                <div className="sm-table-card">
                    <div className="sm-table-scroll">
                        <table className="sm-table">
                            <thead>
                                <tr><th>Student ID</th><th>Name</th><th>Department</th><th>Semester</th><th>CGPA</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {filtered.map((s, i) => (
                                    <tr key={s.id} className={selectedStudent?.id === s.id ? "sm-row-selected" : ""} onClick={() => openProfile(s)}>
                                        <td><span className="sm-id-text">{s.id}</span></td>
                                        <td>
                                            <div className="sm-name-cell">
                                                <Avatar initials={s.avatar} index={i} size={36} />                                               <div>
                                                    <div className="sm-name-text">{s.name}</div>
                                                    <div className="sm-email-text">{s.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{s.department}</td>
                                        <td><span className="sm-sem-pill">{s.semester}</span></td>
                                        <td><CGPABadge cgpa={s.cgpa} /></td>
                                        <td><StatusBadge status={s.status} /></td>
                                        <td>
                                            <div className="sm-action-btns" onClick={e => e.stopPropagation()}>
                                                <button className="sm-act-btn sm-act-view" onClick={() => openProfile(s)}><Eye size={13} /></button>
                                                <button className="sm-act-btn sm-act-edit"><Pencil size={13} /></button>
                                                <button className="sm-act-btn sm-act-del"><Trash2 size={13} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile cards */}
                <div className="sm-card-list">
                    {filtered.map((s, i) => (
                        <div key={s.id} className={`sm-student-card${selectedStudent?.id === s.id ? " sm-row-selected" : ""}`} onClick={() => openProfile(s)}>
                            <div className="sm-card-top">
                                <Avatar initials={s.avatar} index={i} size={48} />
                                <div className="sm-card-info">
                                    <div className="sm-card-id">{s.id}</div>
                                    <div className="sm-card-name">{s.name}</div>
                                    <div className="sm-card-sub">{s.semester} · <CGPABadge cgpa={s.cgpa} /></div>
                                </div>
                                <StatusBadge status={s.status} />
                            </div>
                            <div className="sm-card-actions" onClick={e => e.stopPropagation()}>
                                <button className="sm-card-view-btn" onClick={() => openProfile(s)}><Eye size={14} /> View Profile</button>
                                <button className="sm-card-icon-btn edit"><Pencil size={14} color="#64748b" /></button>
                                <button className="sm-card-icon-btn del"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAB */}
            <button className="sm-fab"><Plus size={24} /></button>

            {/* ── Profile Sidebar / Bottom Sheet ── */}
            <div className={`sm-sidebar${sidebarOpen ? " open" : ""}`}>

                <div className="sm-sb-header">
                    <div className="sm-sb-drag-handle" />
                    <div className="sm-sb-header-row">
                        <span className="sm-sb-title">Student Profile</span>
                        <X size={16} onClick={closeSidebar} style={{ cursor: "pointer" }} />
                    </div>
                </div>

                {selectedStudent && (
                    <>
                        <div className="sm-sb-body">

                            {/* Hero */}
                            <div className="sm-sb-hero">
                                <div className="sm-sb-avatar-wrap">
                                    <div className="sm-sb-avatar-ring">
                                        <Avatar initials={selectedStudent.avatar} index={selectedIndex} size={94} />
                                    </div>
                                    <div className="sm-sb-badge-float">
                                        <StatusBadge status={selectedStudent.status} />
                                    </div>
                                </div>
                                <h2 className="sm-sb-name">{selectedStudent.name}</h2>
                                <p className="sm-sb-id">{selectedStudent.id}</p>
                                <div className="sm-sb-cgpa-row">
                                    <span className="sm-sb-cgpa-label">CGPA</span>
                                    <CGPABadge cgpa={selectedStudent.cgpa} />
                                    <span className="sm-sb-sem-tag">{selectedStudent.semester}</span>
                                </div>
                                <div className="sm-sb-desktop-btns">
                                    <button className="sm-sb-btn-blue">Update Details</button>
                                    <button className="sm-sb-btn-red">Delete Student</button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="sm-sb-tabs">
                                {[
                                    { key: "personal", label: "Personal Details" },
                                    { key: "academic", label: "Academic Info" },
                                    { key: "courses", label: "Enrolled Courses" },
                                ].map(tab => (
                                    <button key={tab.key} className={`sm-sb-tab${sidebarTab === tab.key ? " active" : ""}`} onClick={() => setSidebarTab(tab.key)}>{tab.label}</button>
                                ))}
                            </div>

                            {/* ── Personal Details ── */}
                            {sidebarTab === "personal" && (
                                <div className="sm-sb-content">
                                    <div className="sm-info-grid">
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">Department</div>
                                            <div className="sm-info-value">{selectedStudent.department}</div>
                                        </div>
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">Gender</div>
                                            <div className="sm-info-value">{selectedStudent.gender}</div>
                                        </div>
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">Date of Birth</div>
                                            <div className="sm-info-value">{selectedStudent.dob}</div>
                                        </div>
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">Enrolled</div>
                                            <div className="sm-info-value">{selectedStudent.joinDate}</div>
                                        </div>
                                    </div>
                                    <div className="sm-notes-card">
                                        <div className="sm-notes-row">
                                            <Mail size={14} className="sm-notes-icon" />
                                            <div>
                                                <div className="sm-notes-key">Email</div>
                                                <div className="sm-notes-val">{selectedStudent.email}</div>
                                            </div>
                                        </div>
                                        <div className="sm-notes-row">
                                            <Phone size={14} className="sm-notes-icon" />
                                            <div>
                                                <div className="sm-notes-key">Phone</div>
                                                <div className="sm-notes-val">{selectedStudent.phone}</div>
                                            </div>
                                        </div>
                                        <div className="sm-notes-row">
                                            <MapPin size={14} className="sm-notes-icon" />
                                            <div>
                                                <div className="sm-notes-key">Address</div>
                                                <div className="sm-notes-val">{selectedStudent.address}</div>
                                            </div>
                                        </div>
                                        <div className="sm-notes-row sm-notes-last">
                                            <User size={14} className="sm-notes-icon" />
                                            <div>
                                                <div className="sm-notes-key">Guardian</div>
                                                <div className="sm-notes-val">{selectedStudent.guardian} · {selectedStudent.guardianPhone}</div>
                                            </div>
                                        </div>
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
                                            <div className="sm-info-value">{selectedStudent.semester}</div>
                                        </div>
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">CGPA</div>
                                            <div className="sm-info-value"><CGPABadge cgpa={selectedStudent.cgpa} /></div>
                                        </div>
                                        <div className="sm-info-card">
                                            <div className="sm-info-label">Courses Enrolled</div>
                                            <div className="sm-info-value">{enrolledCourses.length} Courses</div>
                                        </div>
                                        <div className="sm-info-card sm-info-full">
                                            <div className="sm-info-label">Academic Status</div>
                                            <div className="sm-info-value"><StatusBadge status={selectedStudent.status} /></div>
                                        </div>
                                        <div className="sm-info-card sm-info-full">
                                            <div className="sm-info-label">Department</div>
                                            <div className="sm-info-value">{selectedStudent.department}</div>
                                        </div>
                                    </div>

                                    {/* CGPA Progress Bar */}
                                    <div className="sm-cgpa-bar-card">
                                        <div className="sm-cgpa-bar-top">
                                            <span className="sm-cgpa-bar-label">CGPA Progress</span>
                                            <span className="sm-cgpa-bar-val">{selectedStudent.cgpa} / 4.00</span>
                                        </div>
                                        <div className="sm-cgpa-bar-track">
                                            <div className="sm-cgpa-bar-fill" style={{ width: `${(parseFloat(selectedStudent.cgpa) / 4) * 100}%`, background: parseFloat(selectedStudent.cgpa) >= 3.7 ? "#059669" : parseFloat(selectedStudent.cgpa) >= 3.0 ? "#d97706" : "#dc2626" }} />
                                        </div>
                                        <div className="sm-cgpa-bar-grades">
                                            <span>0.0</span><span>1.0</span><span>2.0</span><span>3.0</span><span>4.0</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Enrolled Courses ── */}
                            {sidebarTab === "courses" && (
                                <div className="sm-sb-content">
                                    <div className="sm-courses-hdr">
                                        <span className="sm-courses-count">{enrolledCourses.length} Course{enrolledCourses.length !== 1 ? "s" : ""} Enrolled</span>
                                        <button className="sm-enroll-btn" onClick={openEnrollModal}><Plus size={13} /> Enroll Course</button>
                                    </div>
                                    {enrolledCourseObjects.length > 0
                                        ? enrolledCourseObjects.map((c, i) => (
                                            <div className="sm-course-item" key={i}>
                                                <div className="sm-course-icon"><BookMarked size={15} color="#1e40af" /></div>
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
                                        : <div className="sm-no-courses"><BookOpen size={32} color="#cbd5e1" /><p>No courses enrolled yet</p></div>
                                    }
                                </div>
                            )}

                        </div>
                    </>
                )}
            </div>

            {/* Enroll Course Modal */}
            {enrollModalOpen && (
                <div className="sm-modal-overlay" onClick={cancelEnrollment}>
                    <div className="sm-modal" onClick={e => e.stopPropagation()}>
                        <div className="sm-modal-header">
                            <div>
                                <h2 className="sm-modal-title">Enroll in Courses</h2>
                                <p className="sm-modal-sub">Select courses for <strong>{selectedStudent?.name}</strong></p>
                            </div>
                            <button className="sm-modal-close" onClick={cancelEnrollment}><X size={18} /></button>
                        </div>
                        <div className="sm-modal-search-wrap">
                            <Search size={14} className="sm-modal-search-icon" />
                            <input className="sm-modal-search" placeholder="Search course name or code..." value={courseSearch} onChange={e => setCourseSearch(e.target.value)} />
                        </div>
                        <div className="sm-modal-summary">
                            <span>{tempEnrolled.length} selected</span>
                            {tempEnrolled.length > 0 && <button className="sm-modal-clear" onClick={() => setTempEnrolled([])}>Clear all</button>}
                        </div>
                        <div className="sm-modal-list">
                            {filteredCourses.length > 0
                                ? filteredCourses.map((c, i) => {
                                    const sel = tempEnrolled.includes(c.code);
                                    return (
                                        <div key={i} className={`sm-modal-row${sel ? " selected" : ""}`} onClick={() => toggleTemp(c.code)}>
                                            <div className={`sm-modal-check${sel ? " checked" : ""}`}>{sel && <Check size={11} color="#fff" strokeWidth={3} />}</div>
                                            <div className="sm-modal-course-icon"><BookMarked size={14} color={sel ? "#1e40af" : "#94a3b8"} /></div>
                                            <div className="sm-modal-course-info">
                                                <div className="sm-modal-course-name">{c.name}</div>
                                                <div className="sm-modal-course-meta">{c.code} · {c.semester}</div>
                                            </div>
                                            <span className="sm-modal-credits">{c.credits} Credits</span>
                                        </div>
                                    );
                                })
                                : <div className="sm-modal-empty"><BookOpen size={28} color="#cbd5e1" /><p>No courses found</p></div>
                            }
                        </div>
                        <div className="sm-modal-footer">
                            <button className="sm-modal-cancel" onClick={cancelEnrollment}>Cancel</button>
                            <button className="sm-modal-save" onClick={saveEnrollment}><Check size={14} /> Save Enrollment</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}