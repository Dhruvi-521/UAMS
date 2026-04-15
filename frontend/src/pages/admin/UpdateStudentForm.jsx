import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import "./UpdateStudent.css";

export default function UpdateStudentForm({ student, onBack }) {
    const [activeTab] = useState("manual");

    const [form, setForm] = useState({
        program: "",
        semester: "",
        batch: "",
        division: "",
        fullAddress: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        studentId: "",
        rollNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        mobile: "",
        parentContact: "",
        status: "active",
    });

    const [genderOpen, setGenderOpen] = useState(false);

    const update = (field, value) =>
        setForm(prev => ({ ...prev, [field]: value }));

    // ✅ FIXED: Handles both API + normalized data
    useEffect(() => {
        if (student) {
            const addr = student?.address || {};

            setForm({
                program:
                    typeof student?.program === "object"
                        ? student?.program?.programName
                        : student?.program || "",

                semester: student?.semester || "",
                batch: student?.batch || "",
                division: student?.division || "",

                fullAddress: addr.fullAddress || "",
                city: addr.city || "",
                state: addr.state || "",
                pincode: addr.pincode || "",
                country: addr.country || "",

                studentId: student?.studentId || student?.id || "",
                rollNumber: student?.rollNumber || "",

                firstName: student?.firstName || "",
                middleName: student?.middleName || "",
                lastName: student?.lastName || "",

                dob: student?.dob
                    ? new Date(student.dob).toISOString().split("T")[0]
                    : "",

                gender: student?.gender || "",

                email:
                    student?.personalEmail ||
                    student?.universityEmail ||
                    student?.email ||
                    "",

                mobile: student?.mobile || student?.phone || "",

                parentContact: student?.guardianPhone || "",

                status:
                    student?.status === "On Hold"
                        ? "inactive"
                        : "active",
            });
        }
    }, [student]);

    return (
        <div className="us-wrapper">
            {/* Header */}
            <div className="us-header">
                <button className="us-back-btn" onClick={onBack}>
                    <ArrowLeft size={16} /> Back
                </button>
                <h1 className="us-title">Update Student</h1>
            </div>

            {activeTab === "manual" && (
                <div className="us-card">
                    <h2 className="us-card-title">Enter Student Details</h2>

                    {/* Academic */}
                    <div className="us-section-label">Academic Information</div>
                    <div className="us-grid us-grid-5">
                        <div className="us-field">
                            <label className="us-label">Program Name</label>
                            <input className="us-input" value={form.program} onChange={e => update("program", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Semester</label>
                            <input className="us-input" value={form.semester} onChange={e => update("semester", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Batch</label>
                            <input className="us-input" value={form.batch} onChange={e => update("batch", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Division</label>
                            <input className="us-input" value={form.division} onChange={e => update("division", e.target.value)} />
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

                    {/* Personal */}
                    <div className="us-section-label">Personal Information</div>
                    <div className="us-grid us-grid-4">
                        <div className="us-field">
                            <label className="us-label">First Name</label>
                            <input className="us-input" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Middle Name</label>
                            <input className="us-input" value={form.middleName} onChange={e => update("middleName", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Last Name</label>
                            <input className="us-input" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">DOB</label>
                            <input
                                type="date"
                                className="us-input"
                                value={form.dob}
                                onChange={e => update("dob", e.target.value)}
                            />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Gender</label>
                            <div className="us-custom-select-wrap">
                                <button
                                    className="us-custom-select"
                                    onClick={() => setGenderOpen(p => !p)}
                                >
                                    {form.gender || "Select"}
                                </button>

                                {genderOpen && (
                                    <div className="us-dropdown">
                                        {["Male", "Female", "Other"].map(opt => (
                                            <div
                                                key={opt}
                                                className="us-dropdown-item"
                                                onClick={() => {
                                                    update("gender", opt);
                                                    setGenderOpen(false);
                                                }}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="us-section-label">Address Information</div>
                    <div className="us-grid us-grid-3">
                        <div className="us-field">
                            <label className="us-label">Address</label>
                            <input className="us-input" value={form.fullAddress} onChange={e => update("fullAddress", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Country</label>
                            <input className="us-input" value={form.country} onChange={e => update("country", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">State</label>
                            <input className="us-input" value={form.state} onChange={e => update("state", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">City</label>
                            <input className="us-input" value={form.city} onChange={e => update("city", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Pin Code</label>
                            <input className="us-input" value={form.pincode} onChange={e => update("pincode", e.target.value)} />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="us-section-label">Contact Information</div>
                    <div className="us-grid us-grid-3">
                        <div className="us-field">
                            <label className="us-label">Email</label>
                            <input className="us-input" value={form.email} onChange={e => update("email", e.target.value)} />
                        </div>

                        <div className="us-field">
                            <label className="us-label">Mobile</label>
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
                        <label>
                            <input type="radio" checked={form.status === "active"} onChange={() => update("status", "active")} />
                            Active
                        </label>

                        <label>
                            <input type="radio" checked={form.status === "inactive"} onChange={() => update("status", "inactive")} />
                            Inactive
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="us-footer">
                        <button className="us-cancel-btn" onClick={onBack}>Cancel</button>
                        <button className="us-submit-btn">Update Student</button>
                    </div>
                </div>
            )}
        </div>
    );
}