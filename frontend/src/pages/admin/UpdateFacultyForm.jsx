import { ArrowLeft, Calendar, Phone } from "lucide-react";
import { useState } from "react";
import "./UpdateFaculty.css";

export default function UpdateFacultyForm({ faculty, onBack }) {
    const [form, setForm] = useState({
        universityEmail: faculty?.email || "faculty@university.edu",
        facultyId: faculty?.id || "FAC102",
        firstName: faculty?.firstName || (faculty?.name?.split(" ").slice(-2, -1)[0] || "Amit"),
        middleName: faculty?.middleName || "Kumar",
        lastName: faculty?.lastName || (faculty?.name?.split(" ").slice(-1)[0] || "Shah"),
        gender: faculty?.gender || "Male",
        dob: faculty?.dob || "15/05/1985",
        address: faculty?.address || "123, Street Name",
        city: faculty?.city || "Ahmedabad",
        state: faculty?.state || "Gujarat",
        country: faculty?.country || "India",
        pincode: faculty?.pincode || "380001",
        degree: faculty?.degree?.split(" ")[0] || "Ph.D.",
        experience: faculty?.experience?.replace(/\D.*/, "") || "5",
        dateOfJoining: faculty?.joinDate || "01/08/2018",
        specialization: faculty?.specializations?.[0] || "Computer Science",
        personalEmail: faculty?.personalEmail || "amit@email.com",
        contactNumber: faculty?.phone || "9876543210",
        familyContact: faculty?.guardianPhone || "9123456780",
    });

    const [genderOpen, setGenderOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);
    const [stateOpen, setStateOpen] = useState(false);
    const [countryOpen, setCountryOpen] = useState(false);

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const DropdownField = ({ label, field, options, open, setOpen, others }) => (
        <div className="uf-field" {...others}>
            {label && <label className="uf-label">{label}</label>}
            <div className="uf-custom-select-wrap">
                <button
                    className="uf-custom-select"
                    onClick={() => {
                        setGenderOpen(false); setCityOpen(false);
                        setStateOpen(false); setCountryOpen(false);
                        setOpen(p => !p);
                    }}
                    type="button"
                >
                    <span>{form[field]}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
                {open && (
                    <div className="uf-dropdown">
                        {options.map(opt => (
                            <div
                                key={opt}
                                className={`uf-dropdown-item${form[field] === opt ? " selected" : ""}`}
                                onClick={() => { update(field, opt); setOpen(false); }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="uf-wrapper">
            {/* Header */}
            <div className="uf-header">
                <button className="uf-back-btn" onClick={onBack} type="button">
                    <ArrowLeft size={16} />
                    Back
                </button>
                <h1 className="uf-title">Update Faculty</h1>
            </div>

            <div className="uf-card">

                {/* ── Basic Information ── */}
                <div className="uf-section-label">Basic Information</div>

                <div className="uf-grid uf-grid-2">
                    <div className="uf-field">
                        <label className="uf-label">University Faculty Mail ID</label>
                        <input className="uf-input" type="email" value={form.universityEmail} onChange={e => update("universityEmail", e.target.value)} />
                    </div>
                    <div className="uf-field">
                        <label className="uf-label">Faculty ID</label>
                        <input className="uf-input" value={form.facultyId} onChange={e => update("facultyId", e.target.value)} />
                    </div>
                </div>

                <div className="uf-grid uf-grid-3">
                    <div className="uf-field">
                        <input className="uf-input" placeholder="First Name" value={form.firstName} onChange={e => update("firstName", e.target.value)} />
                    </div>
                    <div className="uf-field">
                        <input className="uf-input" placeholder="Middle Name" value={form.middleName} onChange={e => update("middleName", e.target.value)} />
                    </div>
                    <div className="uf-field">
                        <input className="uf-input" placeholder="Last Name" value={form.lastName} onChange={e => update("lastName", e.target.value)} />
                    </div>
                </div>

                <div className="uf-grid uf-grid-2">
                    <DropdownField
                        label="Gender"
                        field="gender"
                        options={["Male", "Female", "Other"]}
                        open={genderOpen}
                        setOpen={setGenderOpen}
                    />
                    <div className="uf-field">
                        <label className="uf-label">Date of Birth</label>
                        <div className="uf-icon-input-wrap">
                            <Calendar size={15} className="uf-input-icon" />
                            <input className="uf-input uf-input-icon-pad" value={form.dob} onChange={e => update("dob", e.target.value)} placeholder="DD/MM/YYYY" />
                        </div>
                    </div>
                </div>

                {/* ── Address Details ── */}
                <div className="uf-section-label">Address Details</div>

                <div className="uf-grid uf-grid-addr">
                    <div className="uf-field uf-field-textarea">
                        <label className="uf-label">Address</label>
                        <textarea className="uf-textarea" value={form.address} onChange={e => update("address", e.target.value)} rows={3} />
                    </div>
                    <div className="uf-addr-right">
                        <DropdownField
                            label="City"
                            field="city"
                            options={["Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"]}
                            open={cityOpen}
                            setOpen={setCityOpen}
                        />
                        <DropdownField
                            label="State"
                            field="state"
                            options={["Gujarat", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"]}
                            open={stateOpen}
                            setOpen={setStateOpen}
                        />
                        <DropdownField
                            label="Country"
                            field="country"
                            options={["India", "USA", "UK", "Canada", "Australia"]}
                            open={countryOpen}
                            setOpen={setCountryOpen}
                        />
                        <div className="uf-field">
                            <label className="uf-label">Pincode</label>
                            <input className="uf-input" value={form.pincode} onChange={e => update("pincode", e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* ── Professional Details ── */}
                <div className="uf-section-label">Professional Details</div>

                <div className="uf-grid uf-grid-4">
                    <div className="uf-field">
                        <label className="uf-label">Degree</label>
                        <input className="uf-input" value={form.degree} onChange={e => update("degree", e.target.value)} />
                    </div>
                    <div className="uf-field">
                        <label className="uf-label">Experience (in years)</label>
                        <input className="uf-input" value={form.experience} onChange={e => update("experience", e.target.value)} />
                    </div>
                    <div className="uf-field">
                        <label className="uf-label">Date of Joining</label>
                        <div className="uf-icon-input-wrap">
                            <Calendar size={15} className="uf-input-icon" />
                            <input className="uf-input uf-input-icon-pad" value={form.dateOfJoining} onChange={e => update("dateOfJoining", e.target.value)} placeholder="DD/MM/YYYY" />
                        </div>
                    </div>
                    <div className="uf-field">
                        <label className="uf-label">Specialization</label>
                        <input className="uf-input" value={form.specialization} onChange={e => update("specialization", e.target.value)} />
                    </div>
                </div>

                {/* ── Contact Information ── */}
                <div className="uf-section-label">Contact Information</div>

                <div className="uf-grid uf-grid-3">
                    <div className="uf-field">
                        <label className="uf-label">Personal Email ID</label>
                        <input className="uf-input" type="email" value={form.personalEmail} onChange={e => update("personalEmail", e.target.value)} />
                    </div>
                    <div className="uf-field">
                        <label className="uf-label">Personal Contact Number</label>
                        <div className="uf-icon-input-wrap">
                            <Phone size={14} className="uf-input-icon" />
                            <input className="uf-input uf-input-icon-pad" value={form.contactNumber} onChange={e => update("contactNumber", e.target.value)} />
                        </div>
                    </div>
                    <div className="uf-field">
                        <label className="uf-label">Family Contact Number</label>
                        <div className="uf-icon-input-wrap">
                            <Phone size={14} className="uf-input-icon" />
                            <input className="uf-input uf-input-icon-pad" value={form.familyContact} onChange={e => update("familyContact", e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="uf-footer">
                    <button className="uf-cancel-btn" onClick={onBack} type="button">Cancel</button>
                    <button className="uf-submit-btn" type="button">Update Faculty</button>
                </div>

            </div>
        </div>
    );
}