import axios from "axios";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import "./addManualStudent.css";

const GENDERS = ["Male", "Female", "Other"];



const initialForm = {
    program: "",
    semester: "",
    division: "",
    createdDate: "",
    studentId: "",
    rollNumber: "",

    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",

    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",

    universityEmail: "",
    personalEmail: "",
    mobile: "",
    parentContact: "",

    status: "Inactive"
};

export default function AddManualStudent() {
    const [form, setForm] = useState(initialForm);
    const [program, setProgram] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/programs")
            .then(res => setProgram(res.data))
            .catch(err => console.log(err))
    }, [])
    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const setVal = (field, val) =>
        setForm((prev) => ({ ...prev, [field]: val }));

    const handleSubmit = async () => {
        // 1. Basic Validation: Ensure a program is selected
        if (!form.program) {
            alert("Please select a Program");
            return;
        }

        try {
            // 2. Prepare the data for the backend
            const payload = {
                ...form,
                // Convert strings to Numbers to match your Mongoose Schema
                semester: Number(form.semester),
                rollNumber: Number(form.rollNumber),
                // Ensure dates aren't empty strings if they are optional
                dob: form.dob || null,
                createdDate: form.createdDate || new Date()
            };

            console.log("Submitting Cleaned Payload:", payload);

            const response = await axios.post("http://localhost:5000/api/students/add", payload);

            if (response.data.success) {
                alert("Student added successfully!");
                setForm(initialForm);
            }
        } catch (err) {
            console.error("Server Error Details:", err.response?.data);
            // Show the specific error message from the backend if available
            alert(`Error: ${err.response?.data?.message || "Failed to add student"}`);
        }
    };

    return (
        <div className="ams-card">
            <h2 className="ams-section-title">Enter Student Details</h2>

            {/* Academic Information */}
            <div className="ams-section">
                <div className="ams-section-label">Academic Information</div>

                <div className="ams-grid-5">
                    <div className="ams-field">
                        <label className="ams-label">Program Name</label>
                        <select
                            className="ams-input"
                            value={form.program}
                            onChange={set("program")}
                        >
                            <option value="">-- Select Program --</option> {/* ADD THIS */}
                            {program.map((prog) => (
                                <option key={prog._id} value={prog._id}>
                                    {prog.programName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="ams-field">
                        <label className="ams-label">Semester</label>
                        <input
                            type="text"
                            className="ams-input"
                            value={form.semester}
                            onChange={set("semester")}
                            placeholder="Enter Semester"
                        />
                    </div>

                    <div className="ams-field">
                        <label className="ams-label">Division</label>
                        <input
                            type="text"
                            className="ams-input"
                            value={form.division}
                            onChange={set("division")}
                            placeholder="Enter Division (eg.A)"
                        />
                    </div>

                    <div className="ams-field ams-field-rel">
                        <label className="ams-label">Created Date</label>
                        <div className="ams-date-wrap">
                            <input
                                type="date"
                                className="ams-input ams-date-input"
                                value={form.createdDate}
                                onChange={set("createdDate")}
                            />
                            <Calendar size={15} className="ams-date-icon" />
                        </div>
                    </div>
                </div>

                <div className="ams-grid-2" style={{ marginTop: 14 }}>
                    <div className="ams-field">
                        <label className="ams-label">Student ID</label>
                        <input
                            type="text"
                            className="ams-input"
                            value={form.studentId}
                            onChange={set("studentId")}
                            placeholder="Enter Student ID (eg. SU252701)"
                        />
                    </div>

                    <div className="ams-field">
                        <label className="ams-label">Roll Number</label>
                        <input
                            type="text"
                            className="ams-input"
                            value={form.rollNumber}
                            onChange={set("rollNumber")}
                            placeholder="Enter Class roll number"
                        />
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="ams-section">
                <div className="ams-section-label">Personal Information</div>

                <div className="ams-grid-4">

                    <div className="ams-field">
                        <label className="ams-label">First Name</label>
                        <input className="ams-input" placeholder="First Name"
                            value={form.firstName} onChange={set("firstName")} />
                    </div>

                    <div className="ams-field">
                        <label className="ams-label">Middle Name</label>
                        <input className="ams-input" placeholder="Middle Name"
                            value={form.middleName} onChange={set("middleName")} />
                    </div>

                    <div className="ams-field">
                        <label className="ams-label">Last Name</label>
                        <input className="ams-input" placeholder="Last Name"
                            value={form.lastName} onChange={set("lastName")} />
                    </div>

                    <div className="ams-field">
                        <label className="ams-label">Date of Birth</label>
                        <input type="date" className="ams-input"
                            value={form.dob} onChange={set("dob")} />
                    </div>

                    <select className="ams-input"
                        value={form.gender}
                        onChange={set("gender")}>
                        <option value="">Gender</option>
                        {GENDERS.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Address */}
            <div className="ams-section">
                <div className="ams-section-label">Address Information</div>

                <div className="ams-grid-4">

                    <div>
                        <label className="ams-label">Address</label>

                        <input className="ams-input" placeholder="Address"
                            value={form.address} onChange={set("address")} />
                    </div>

                    <div>
                        <label className="ams-label">Country</label>

                        <input className="ams-input" placeholder="Country"
                            value={form.country} onChange={set("country")} />
                    </div>

                    <div>
                        <label className="ams-label">State</label>

                        <input className="ams-input" placeholder="State"
                            value={form.state} onChange={set("state")} />
                    </div>

                    <div>
                        <label className="ams-label">City</label>

                        <input className="ams-input" placeholder="City"
                            value={form.city} onChange={set("city")} />
                    </div>
                    <div>
                        <label className="ams-label">Pin Code</label>
                        <input className="ams-input" placeholder="Pin Code"
                            value={form.pincode} onChange={set("pincode")} />
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="ams-section">
                <div className="ams-section-label">Contact Information</div>

                <div className="ams-grid-3">

                    <div>
                        <label className="ams-label">University Email</label>

                        <input type="email" className="ams-input"
                            placeholder="University Email"
                            value={form.universityEmail}
                            onChange={set("universityEmail")} />
                    </div>

                    <div>
                        <label className="ams-label">Personal Email</label>

                        <input type="email" className="ams-input"
                            placeholder="Personal Email"
                            value={form.personalEmail}
                            onChange={set("personalEmail")} />
                    </div>

                    <div>
                        <label className="ams-label">Mobile</label>

                        <input type="tel" className="ams-input"
                            placeholder="Mobile"
                            value={form.mobile}
                            onChange={set("mobile")} />

                    </div>

                    <div>
                        <label className="ams-label">Parent Contact</label>

                        <input type="tel" className="ams-input"
                            placeholder="Parent Contact"
                            value={form.parentContact}
                            onChange={set("parentContact")} />
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
                                value={s}
                                checked={form.status === s}
                                onChange={() => setVal("status", s)}
                            />
                            {s}
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="ams-footer">
                <button className="ams-submit-btn" onClick={handleSubmit}>
                    Add Student
                </button>
            </div>
        </div>
    );
}