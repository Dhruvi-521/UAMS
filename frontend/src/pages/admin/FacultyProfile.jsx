import React, { useState } from "react";
import { 
  X, BookMarked, BookOpen, Plus, Search, Check 
} from "lucide-react";
import "./FacultyProfile.css";

// Reusing your Avatar component logic
function Avatar({ initials, index, size = 36 }) {
  const avatarColors = ["#4f46e5", "#7c3aed", "#0891b2", "#059669", "#d97706", "#dc2626", "#9333ea", "#0d9488", "#7c3aed", "#2563eb"];
  return (
    <div className="fm-avatar" style={{ width: size, height: size, background: avatarColors[index % avatarColors.length], fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`fm-badge ${status === "Active" ? "fm-badge-active" : "fm-badge-leave"}`}>{status}</span>;
}

export default function FacultyProfile({ 
  isOpen, 
  onClose, 
  faculty, 
  index, 
  allCourses, 
  assignedCourseCodes, 
  onUpdateCourses 
}) {
  const [sidebarTab, setSidebarTab] = useState("personal");
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [tempAssigned, setTempAssigned] = useState([]);

  if (!faculty) return null;

  // Modal Logic
  const openAssignModal = () => {
    setTempAssigned([...assignedCourseCodes]);
    setCourseSearch("");
    setAssignModalOpen(true);
  };

  const toggleTemp = (code) => 
    setTempAssigned(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);

  const saveAssignment = () => {
    onUpdateCourses([...tempAssigned]);
    setAssignModalOpen(false);
  };

  const filteredCourses = allCourses.filter(c => 
    c.name.toLowerCase().includes(courseSearch.toLowerCase()) || 
    c.code.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const assignedCourseObjects = allCourses.filter(c => assignedCourseCodes.includes(c.code));

  return (
    <>
      {/* Overlay */}
      <div className={`fm-overlay${isOpen ? " active" : ""}`} onClick={onClose} />

      {/* Sidebar */}
      <div className={`fm-sidebar${isOpen ? " open" : ""}`}>
        <div className="fm-sb-header">
          <div className="fm-sb-drag-handle" />
          <div className="fm-sb-header-row">
            <span className="fm-sb-title">Faculty Profile</span>
            <X size={16} className="fm-sb-close-icon" onClick={onClose} />
          </div>
        </div>

        <div className="fm-sb-body">
          <div className="fm-sb-hero">
            <div className="fm-sb-avatar-wrap">
              <div className="fm-sb-avatar-ring">
                <Avatar initials={faculty.avatar} index={index} size={94} />
              </div>
              <div className="fm-sb-badge-float">
                <StatusBadge status={faculty.status} />
              </div>
            </div>
            <h2 className="fm-sb-name">{faculty.name}</h2>
            <p className="fm-sb-id">{faculty.id.toString().replace("F-", "")}</p>
          </div>

          <div className="fm-sb-tabs">
            {[{ key: "personal", label: "Personal Details" }, { key: "courses", label: "Course Assignment" }].map(tab => (
              <button 
                key={tab.key} 
                className={`fm-sb-tab${sidebarTab === tab.key ? " active" : ""}`} 
                onClick={() => setSidebarTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {sidebarTab === "personal" && (
            <div className="fm-sb-content">
              <div className="fm-info-grid">
                <div className="fm-info-card">
                  <div className="fm-info-label">Department</div>
                  <div className="fm-info-value">{faculty.primaryDept}</div>
                </div>
                <div className="fm-info-card">
                  <div className="fm-info-label">Designation</div>
                  <div className="fm-info-value">
                    {faculty.designation.replace("Associate Professor", "Assoc. Prof.").replace("Professor", "Prof.")}
                  </div>
                </div>
                <div className="fm-info-card">
                  <div className="fm-info-label">Experience</div>
                  <div className="fm-info-value">{faculty.experience}</div>
                </div>
                <div className="fm-info-card fm-info-full">
                  <div className="fm-info-label">Degree</div>
                  <div className="fm-info-value">{faculty.degree}</div>
                </div>
                <div className="fm-info-card fm-info-full">
                  <div className="fm-info-label">Specializations</div>
                  <div className="fm-spec-tags">
                    {faculty.specializations.map(s => (
                      <span key={s} className="fm-spec-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="fm-notes-card">
                <div className="fm-notes-row"><strong>Email</strong><span>{faculty.email}</span></div>
                <div className="fm-notes-row"><strong>Joined</strong><span>{faculty.joinDate}</span></div>
                
              </div>
            </div>
          )}

          {sidebarTab === "courses" && (
            <div className="fm-sb-content">
              <div className="fm-courses-hdr">
                <span className="fm-courses-count">
                  {assignedCourseCodes.length} Course{assignedCourseCodes.length !== 1 ? "s" : ""} Assigned
                </span>
                <button className="fm-assign-btn" onClick={openAssignModal}>
                  <Plus size={13} /> Assign Course
                </button>
              </div>
              {assignedCourseObjects.length > 0 ? (
                assignedCourseObjects.map((c, i) => (
                  <div className="fm-course-item" key={i}>
                    <div className="fm-course-icon"><BookMarked size={15} color="#1e40af" /></div>
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
              ) : (
                <div className="fm-no-courses">
                  <BookOpen size={32} color="#cbd5e1" />
                  <p>No courses assigned yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Assign Course Modal */}
      {assignModalOpen && (
        <div className="fm-modal-overlay" onClick={() => setAssignModalOpen(false)}>
          <div className="fm-modal" onClick={e => e.stopPropagation()}>
            <div className="fm-modal-header">
              <div>
                <h2 className="fm-modal-title">Assign Courses</h2>
                <p className="fm-modal-sub">Select subjects for <strong>{faculty.name}</strong></p>
              </div>
              <button className="fm-modal-close" onClick={() => setAssignModalOpen(false)}><X size={18} /></button>
            </div>
            <div className="fm-modal-search-wrap">
              <Search size={14} className="fm-modal-search-icon" />
              <input 
                className="fm-modal-search" 
                placeholder="Search course name or code..." 
                value={courseSearch} 
                onChange={e => setCourseSearch(e.target.value)} 
              />
            </div>
            <div className="fm-modal-summary">
              <span>{tempAssigned.length} selected</span>
              {tempAssigned.length > 0 && (
                <button className="fm-modal-clear" onClick={() => setTempAssigned([])}>Clear all</button>
              )}
            </div>
            <div className="fm-modal-list">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((c, i) => {
                  const sel = tempAssigned.includes(c.code);
                  return (
                    <div key={i} className={`fm-modal-row${sel ? " selected" : ""}`} onClick={() => toggleTemp(c.code)}>
                      <div className={`fm-modal-check${sel ? " checked" : ""}`}>
                        {sel && <Check size={11} color="#fff" strokeWidth={3} />}
                      </div>
                      <div className="fm-modal-course-icon">
                        <BookMarked size={14} color={sel ? "#1e40af" : "#94a3b8"} />
                      </div>
                      <div className="fm-modal-course-info">
                        <div className="fm-modal-course-name">{c.name}</div>
                        <div className="fm-modal-course-meta">{c.code} · {c.semester}</div>
                      </div>
                      <span className="fm-modal-credits">{c.credits} Credits</span>
                    </div>
                  );
                })
              ) : (
                <div className="fm-modal-empty">
                  <BookOpen size={28} color="#cbd5e1" />
                  <p>No courses found</p>
                </div>
              )}
            </div>
            <div className="fm-modal-footer">
              <button className="fm-modal-cancel" onClick={() => setAssignModalOpen(false)}>Cancel</button>
              <button className="fm-modal-save" onClick={saveAssignment}>
                <Check size={14} /> Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}