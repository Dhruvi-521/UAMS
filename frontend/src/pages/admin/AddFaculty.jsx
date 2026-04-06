import { useState } from "react";
import {
    ArrowLeft, Mail, Hash, User, Calendar,
    MapPin, Phone, GraduationCap, Briefcase, BookOpen,
} from "lucide-react";
import "./AddFaculty.css";

const INITIAL = {
    universityEmail: "", facultyId: "",
    firstName: "", middleName: "", lastName: "",
    gender: "", dob: "",
    address: "", city: "", state: "", country: "", pincode: "",
    degree: "", experience: "", joiningDate: "", specialization: "",
    personalEmail: "", personalPhone: "", familyPhone: "",
};

export default function AddFaculty({ onBack }) {
    const [form, setForm] = useState(INITIAL);

    const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

    const handleSubmit = () => {
        console.log("Faculty Data:", form);
        alert("Faculty added successfully!");
        onBack();
    };

    return (
        <div className="af-wrapper">
            {/* ── Header ── */}
            <div className="af-header">
                <button className="af-back-btn" onClick={onBack}>
                    <ArrowLeft size={18} />
                    <span>Back</span>
                </button>
                <h1 className="af-title">Add Faculty</h1>
            </div>

            <div className="af-form-body">

                {/* ── Basic Information ── */}
                <section className="af-section">
                    <h2 className="af-section-title">Basic Information</h2>

                    <div className="af-row af-row-2">
                        <div className="af-field">
                            <label className="af-label">University Faculty Mail ID</label>
                            <div className="af-input-wrap">
                                <Mail size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="University Faculty Mail ID"
                                    value={form.universityEmail} onChange={set("universityEmail")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Faculty ID</label>
                            <div className="af-input-wrap">
                                <Hash size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="Faculty ID"
                                    value={form.facultyId} onChange={set("facultyId")} />
                            </div>
                        </div>
                    </div>

                    <div className="af-row af-row-3">
                        <div className="af-field">
                            <label className="af-label">First Name</label>
                            <div className="af-input-wrap">
                                <User size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="First Name"
                                    value={form.firstName} onChange={set("firstName")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Middle Name</label>
                            <input className="af-input" placeholder="Middle Name"
                                value={form.middleName} onChange={set("middleName")} />
                        </div>
                        <div className="af-field">
                            <label className="af-label">Last Name</label>
                            <input className="af-input" placeholder="Last Name"
                                value={form.lastName} onChange={set("lastName")} />
                        </div>
                    </div>

                    <div className="af-row af-row-2-auto">
                        <div className="af-field">
                            <label className="af-label">Gender</label>
                            <select className="af-select" value={form.gender} onChange={set("gender")}>
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Non-binary</option>
                                <option>Prefer not to say</option>
                            </select>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Date of Birth</label>
                            <div className="af-input-wrap">
                                <Calendar size={15} className="af-icon" />
                                <input type="date" className="af-input af-input-icon"
                                    value={form.dob} onChange={set("dob")} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Address Details ── */}
                <section className="af-section">
                    <h2 className="af-section-title">Address Details</h2>

                    <div className="af-field">
                        <label className="af-label">Address</label>
                        <div className="af-input-wrap">
                            <MapPin size={15} className="af-icon af-icon-top" />
                            <textarea className="af-textarea af-input-icon" placeholder="Street Address place here..."
                                rows={3} value={form.address} onChange={set("address")} />
                        </div>
                    </div>

                    <div className="af-row af-row-4">
                        <div className="af-field">
                            <label className="af-label">City</label>
                            <select className="af-select" value={form.city} onChange={set("city")}>
                                <option value="">City</option>
                                <option>Mumbai</option><option>Delhi</option>
                                <option>Bangalore</option><option>Ahmedabad</option>
                                <option>Chennai</option><option>Hyderabad</option>
                            </select>
                        </div>
                        <div className="af-field">
                            <label className="af-label">State</label>
                            <select className="af-select" value={form.state} onChange={set("state")}>
                                <option value="">State</option>
                                <option>Gujarat</option><option>Maharashtra</option>
                                <option>Karnataka</option><option>Tamil Nadu</option>
                                <option>Delhi</option>
                            </select>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Country</label>
                            <select className="af-select" value={form.country} onChange={set("country")}>
                                <option value="">Country</option>
                                <option>India</option><option>USA</option>
                                <option>UK</option><option>Canada</option>
                                <option>Australia</option>
                            </select>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Pincode</label>
                            <input className="af-input" placeholder="Pincode" maxLength={6}
                                value={form.pincode} onChange={set("pincode")} />
                        </div>
                    </div>
                </section>

                {/* ── Professional Details ── */}
                <section className="af-section">
                    <h2 className="af-section-title">Professional Details</h2>

                    <div className="af-row af-row-4">
                        <div className="af-field">
                            <label className="af-label">Degree</label>
                            <div className="af-input-wrap">
                                <GraduationCap size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="e.g. Ph.D."
                                    value={form.degree} onChange={set("degree")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Experience (in years)</label>
                            <div className="af-input-wrap">
                                <Briefcase size={15} className="af-icon" />
                                <input type="number" min="0" className="af-input af-input-icon" placeholder="1"
                                    value={form.experience} onChange={set("experience")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Date of Joining</label>
                            <div className="af-input-wrap">
                                <Calendar size={15} className="af-icon" />
                                <input type="date" className="af-input af-input-icon"
                                    value={form.joiningDate} onChange={set("joiningDate")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Specialization</label>
                            <div className="af-input-wrap">
                                <BookOpen size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="e.g. Computer Science"
                                    value={form.specialization} onChange={set("specialization")} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Contact Information ── */}
                <section className="af-section">
                    <h2 className="af-section-title">Contact Information</h2>

                    <div className="af-row af-row-3">
                        <div className="af-field">
                            <label className="af-label">Personal Email ID</label>
                            <div className="af-input-wrap">
                                <Mail size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="Personal Email ID"
                                    value={form.personalEmail} onChange={set("personalEmail")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Personal Contact Number</label>
                            <div className="af-input-wrap">
                                <Phone size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="Phone Number" type="tel"
                                    value={form.personalPhone} onChange={set("personalPhone")} />
                            </div>
                        </div>
                        <div className="af-field">
                            <label className="af-label">Family Contact Number</label>
                            <div className="af-input-wrap">
                                <Phone size={15} className="af-icon" />
                                <input className="af-input af-input-icon" placeholder="Phone Number" type="tel"
                                    value={form.familyPhone} onChange={set("familyPhone")} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Footer ── */}
                <div className="af-footer">
                    <button className="af-submit-btn" onClick={handleSubmit}>
                        Add Faculty
                    </button>
                </div>

            </div>
        </div>
    );
}