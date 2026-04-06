import { useState } from "react";
import { Calendar } from "lucide-react";
import "./addManualStudent.css";

const PROGRAMS = ["B.Tech.", "B.Sc.", "M.Tech.", "MBA", "PhD"];
const YEAR_OPTIONS = ["2 Year", "3 Year", "5 Year"];
const GENDERS = ["Male", "Female", "Other"];

const initialForm = {
    department: "", program: "", totalYears: "3 Year", creditHour: "140", startDate: "",
    studentId: "", rollNumber: "",
    firstName: "", lastName: "", dob: "", gender: "",
    email: "", mobile: "", parentContact: "",
    status: "Inactive"
};

export default function AddManualStudent() {
    const [form, setForm] = useState(initialForm);
    const [yearOpen, setYearOpen] = useState(false);

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));
    const setVal = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

    const handleSubmit = () => {
        console.log("New Student:", form);
        alert("Student added successfully!");
    };

    return (
        <div className="ams-card">
            <h2 className="ams-section-title">Enter Student Details</h2>

            {/* Academic Information */}
            <div className="ams-section">
                <div className="ams-section-label">Academic Information</div>
                <div className="ams-grid-5">
                    <div className="ams-field">
                        <label className="ams-label">Department Name</label>
                        <input className="ams-input" placeholder="e.g. Engineering" value={form.department} onChange={set("department")} />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Program Name</label>
                        <input className="ams-input" placeholder="e.g. B.Tech." value={form.program} onChange={set("program")} />
                    </div>
                    <div className="ams-field ams-field-rel">
                        <label className="ams-label">Total Years Program</label>
                        <div className="ams-custom-select" onClick={() => setYearOpen(o => !o)}>
                            <span>{form.totalYears}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        {yearOpen && (
                            <div className="ams-dropdown">
                                {YEAR_OPTIONS.map(y => (
                                    <div key={y} className={`ams-dropdown-item${form.totalYears === y ? " selected" : ""}`}
                                        onClick={() => { setVal("totalYears", y); setYearOpen(false); }}>
                                        {y}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Total Credit Hour</label>
                        <input className="ams-input" placeholder="140" value={form.creditHour} onChange={set("creditHour")} type="number" />
                    </div>
                    <div className="ams-field ams-field-rel">
                        <label className="ams-label">Start Date</label>
                        <div className="ams-date-wrap">
                            <input className="ams-input ams-date-input" placeholder="Select Date" value={form.startDate}
                                onChange={set("startDate")} type="date" />
                            <Calendar size={15} className="ams-date-icon" />
                        </div>
                    </div>
                </div>
                <div className="ams-grid-2" style={{ marginTop: 14 }}>
                    <div className="ams-field">
                        <label className="ams-label">Student ID</label>
                        <input className="ams-input" placeholder="" value={form.studentId} onChange={set("studentId")} />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Roll Number</label>
                        <input className="ams-input" placeholder="" value={form.rollNumber} onChange={set("rollNumber")} />
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="ams-section">
                <div className="ams-section-label">Personal Information</div>
                <div className="ams-grid-4">
                    <div className="ams-field">
                        <label className="ams-label">First Name</label>
                        <input className="ams-input" placeholder="First Name" value={form.firstName} onChange={set("firstName")} />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Last Name</label>
                        <input className="ams-input" placeholder="Last Name" value={form.lastName} onChange={set("lastName")} />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Date of Birth</label>
                        <input className="ams-input" placeholder="DOB" value={form.dob} onChange={set("dob")} type="date" />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Gender</label>
                        <select className="ams-input ams-select" value={form.gender} onChange={set("gender")}>
                            <option value="">Gender</option>
                            {GENDERS.map(g => <option key={g}>{g}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="ams-section">
                <div className="ams-section-label">Contact Information</div>
                <div className="ams-grid-3">
                    <div className="ams-field">
                        <label className="ams-label">Student Email</label>
                        <input className="ams-input" placeholder="Student Email" value={form.email} onChange={set("email")} type="email" />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Mobile Number</label>
                        <input className="ams-input" placeholder="Mobile Number" value={form.mobile} onChange={set("mobile")} type="tel" />
                    </div>
                    <div className="ams-field">
                        <label className="ams-label">Parent Contact</label>
                        <input className="ams-input" placeholder="Parent Contact" value={form.parentContact} onChange={set("parentContact")} type="tel" />
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="ams-section">
                <div className="ams-section-label">Status</div>
                <div className="ams-radio-group">
                    {["Active", "Inactive"].map(s => (
                        <label key={s} className="ams-radio-label">
                            <input
                                type="radio"
                                name="status"
                                value={s}
                                checked={form.status === s}
                                onChange={() => setVal("status", s)}
                                className="ams-radio"
                            />
                            <span className={`ams-radio-custom${form.status === s ? " checked" : ""}`} />
                            {s}
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="ams-footer">
                <button className="ams-submit-btn" onClick={handleSubmit}>Add Student</button>
            </div>
        </div>
    );
}