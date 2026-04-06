import { ArrowLeft, Upload, X } from "lucide-react";
import { useState } from "react";
import "./UpdateStudent.css";

export default function UpdateStudentForm({ student, onBack }) {
    const [activeTab, setActiveTab] = useState("manual");
    const [form, setForm] = useState({
        department: student?.department || "Engineering",
        program: student?.program || "B.Tech.",
        totalYears: student?.totalYears || "3 Year",
        totalCredits: student?.totalCredits || "140",
        startDate: student?.startDate || "2023-08-12",
        studentId: student?.id || "STU1023",
        rollNumber: student?.rollNumber || "45",
        firstName: student?.firstName || (student?.name?.split(" ")[0] || "Rahul"),
        lastName: student?.lastName || (student?.name?.split(" ")[1] || "Sharma"),
        dob: student?.dob || "15/05/2004",
        gender: student?.gender || "Male",
        email: student?.email || "rahul@email.com",
        mobile: student?.phone || "9876543210",
        parentContact: student?.guardianPhone || "9123456780",
        status: student?.status === "On Hold" ? "inactive" : "active",
    });

    const [yearsOpen, setYearsOpen] = useState(false);
    const [genderOpen, setGenderOpen] = useState(false);

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    return (
        <div className="us-wrapper">
            {/* Header */}
            <div className="us-header">
                <button className="us-back-btn" onClick={onBack}>
                    <ArrowLeft size={16} />
                    Back
                </button>
                <h1 className="us-title">Update Student</h1>
            </div>

            {/* Tabs */}
            {/* <div className="us-tabs">
                <button
                    className={`us-tab${activeTab === "excel" ? " active" : ""}`}
                    onClick={() => setActiveTab("excel")}
                >
                    Upload via Excel
                </button>
                <button
                    className={`us-tab${activeTab === "manual" ? " active" : ""}`}
                    onClick={() => setActiveTab("manual")}
                >
                    Add Manually
                </button>
            </div> */}

            {/* Excel Tab */}
            {activeTab === "excel" && (
                <div className="us-card">
                    <div className="us-excel-drop">
                        <Upload size={32} color="#94a3b8" />
                        <p className="us-excel-title">Upload Excel File</p>
                        <p className="us-excel-sub">Drag & drop or click to select a .xlsx / .csv file</p>
                        <button className="us-excel-btn">Choose File</button>
                    </div>
                </div>
            )}

            {/* Manual Tab */}
            {activeTab === "manual" && (
                <div className="us-card">
                    <h2 className="us-card-title">Enter Student Details</h2>

                    {/* Academic Information */}
                    <div className="us-section-label">Academic Information</div>
                    <div className="us-grid us-grid-5">
                        <div className="us-field">
                            <label className="us-label">Department Name</label>
                            <input className="us-input" value={form.department} onChange={e => update("department", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Program Name</label>
                            <input className="us-input" value={form.program} onChange={e => update("program", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Total Years Program</label>
                            <div className="us-custom-select-wrap">
                                <button className="us-custom-select" onClick={() => { setYearsOpen(p => !p); setGenderOpen(false); }}>
                                    <span>{form.totalYears}</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                                </button>
                                {yearsOpen && (
                                    <div className="us-dropdown">
                                        {["2 Year", "3 Year", "5 Year"].map(opt => (
                                            <div key={opt} className={`us-dropdown-item${form.totalYears === opt ? " selected" : ""}`} onClick={() => { update("totalYears", opt); setYearsOpen(false); }}>{opt}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="us-field">
                            <label className="us-label">Total Credit Hour</label>
                            <input className="us-input" value={form.totalCredits} onChange={e => update("totalCredits", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Start Date</label>
                            <div className="us-date-wrap">
                                <input className="us-input" type="date" value={form.startDate} onChange={e => update("startDate", e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="us-grid us-grid-2">
                        <div className="us-field">
                            <label className="us-label">Student ID</label>
                            <input className="us-input" value={form.studentId} onChange={e => update("studentId", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Roll Number</label>
                            <input className="us-input" value={form.rollNumber} onChange={e => update("rollNumber", e.target.value)} />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="us-section-label">Personal Information</div>
                    <div className="us-grid us-grid-4">
                        <div className="us-field">
                            <label className="us-label">First Name</label>
                            <input className="us-input" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Last Name</label>
                            <input className="us-input" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">DOB</label>
                            <input className="us-input" value={form.dob} onChange={e => update("dob", e.target.value)} placeholder="DD/MM/YYYY" />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Gender</label>
                            <div className="us-custom-select-wrap">
                                <button className="us-custom-select" onClick={() => { setGenderOpen(p => !p); setYearsOpen(false); }}>
                                    <span>{form.gender}</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                                </button>
                                {genderOpen && (
                                    <div className="us-dropdown">
                                        {["Male", "Female", "Other"].map(opt => (
                                            <div key={opt} className={`us-dropdown-item${form.gender === opt ? " selected" : ""}`} onClick={() => { update("gender", opt); setGenderOpen(false); }}>{opt}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="us-section-label">Contact Information</div>
                    <div className="us-grid us-grid-3">
                        <div className="us-field">
                            <label className="us-label">Email</label>
                            <input className="us-input" type="email" value={form.email} onChange={e => update("email", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Mobile Number</label>
                            <input className="us-input" value={form.mobile} onChange={e => update("mobile", e.target.value)} />
                        </div>
                        <div className="us-field">
                            <label className="us-label">Parent Contact</label>
                            <input className="us-input" value={form.parentContact} onChange={e => update("parentContact", e.target.value)} />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="us-section-label">Status</div>
                    <div className="us-radio-group">
                        <label className="us-radio-label">
                            <div className={`us-radio-circle${form.status === "active" ? " checked" : ""}`} onClick={() => update("status", "active")}>
                                {form.status === "active" && <div className="us-radio-dot" />}
                            </div>
                            <span>Active</span>
                        </label>
                        <label className="us-radio-label">
                            <div className={`us-radio-circle${form.status === "inactive" ? " checked" : ""}`} onClick={() => update("status", "inactive")}>
                                {form.status === "inactive" && <div className="us-radio-dot" />}
                            </div>
                            <span>Inactive</span>
                        </label>
                    </div>

                    {/* Footer Buttons */}
                    <div className="us-footer">
                        <button className="us-cancel-btn" onClick={onBack}>Cancel</button>
                        <button className="us-submit-btn">Update Student</button>
                    </div>
                </div>
            )}
        </div>
    );
}