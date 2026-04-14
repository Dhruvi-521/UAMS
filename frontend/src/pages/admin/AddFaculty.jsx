import { useState, useEffect } from "react";
import {
  ArrowLeft, Mail, Hash, User, Calendar,
  MapPin, Phone, GraduationCap, Briefcase, BookOpen,
} from "lucide-react";
import axios from "axios";
import "./AddFaculty.css";

// Generate next Faculty ID
// const getNextFacultyId = () => {
//   const prefix = "SUF2022";
//   const lastId = localStorage.getItem("lastFacultyId") || "0";
//   const nextNumber = parseInt(lastId, 10) + 1;
//   const nextId = prefix + String(nextNumber).padStart(3, "0");
//   localStorage.setItem("lastFacultyId", nextNumber);
//   return nextId;
// };

// Initial form state
const INITIAL = {
  universityEmail: "",
  // facultyId: getNextFacultyId(),
  facultyId: " ",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  degree: "",
  experience: "",
  joiningDate: "",
  specialization: "",
  personalEmail: "",
  personalPhone: "",
  familyPhone: "",
  department: "",
  designation: "",
};

export default function AddFaculty({ onBack }) {
  const [form, setForm] = useState(INITIAL);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Fetch departments from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // Submit form
  const handleSubmit = async () => {
    // Validate required fields
    if (!form.firstName || !form.lastName || !form.universityEmail || !form.personalPhone || !form.department || !form.designation) {
      alert("Please fill all required fields: First Name, Last Name, University Email, Phone, Department, Designation");
      return;
    }

    const payload = {
      facultyId: form.facultyId,
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      email: form.universityEmail,
      phone: form.personalPhone,
      familyPhone: form.familyPhone,
      department: form.department, // can be name or _id depending on backend
      designation: form.designation,
      qualification: form.degree,
      experience: parseInt(form.experience) || 0,
      dob: form.dob,
      joiningDate: form.joiningDate,
      specialization: form.specialization ? form.specialization.split(",").map(s => s.trim()) : [],
      address: {
        fullAddress: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        pincode: form.pincode,
      },
      personalEmail: form.personalEmail,
      gender: form.gender,
    };

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/faculty/add", payload);
      alert(res.data.message || "Faculty added successfully!");
      setForm(INITIAL);
      onBack();
    } catch (error) {
      console.error("Error adding faculty:", error);
      if (error.response && error.response.data) {
        alert("Error: " + (error.response.data.message || "Failed to add faculty"));
      } else {
        alert("Server Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="af-wrapper">
      {/* Header */}
      <div className="af-header">
        <button className="af-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1 className="af-title">Add Faculty</h1>
      </div>

      <div className="af-form-body">
        {/* Basic Info */}
        <section className="af-section">
          <h2 className="af-section-title">Basic Information</h2>
          <div className="af-row af-row-2">
            <div className="af-field">
              <label className="af-label">University Faculty Mail ID *</label>
              <div className="af-input-wrap">
                <Mail size={15} className="af-icon" />
                <input
                  className="af-input af-input-icon"
                  placeholder="University Faculty Mail ID"
                  value={form.universityEmail}
                  onChange={setField("universityEmail")}
                />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Faculty ID</label>
              <div className="af-input-wrap">
                <Hash size={15} className="af-icon" />
                <input className="af-input af-input-icon" value={form.facultyId} />
              </div>
            </div>
          </div>

          <div className="af-row af-row-3">
            <div className="af-field">
              <label className="af-label">First Name *</label>
              <div className="af-input-wrap">
                <User size={15} className="af-icon" />
                <input className="af-input af-input-icon" placeholder="First Name" value={form.firstName} onChange={setField("firstName")} />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Middle Name</label>
              <input className="af-input" placeholder="Middle Name" value={form.middleName} onChange={setField("middleName")} />
            </div>
            <div className="af-field">
              <label className="af-label">Last Name *</label>
              <input className="af-input" placeholder="Last Name" value={form.lastName} onChange={setField("lastName")} />
            </div>
          </div>

          <div className="af-row af-row-2-auto">
            <div className="af-field">
              <label className="af-label">Gender</label>
              <select className="af-select" value={form.gender} onChange={setField("gender")}>
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
                <input type="date" className="af-input af-input-icon" value={form.dob} onChange={setField("dob")} />
              </div>
            </div>
          </div>
        </section>

        {/* Address Details */}
        <section className="af-section">
          <h2 className="af-section-title">Address Details</h2>
          <div className="af-field">
            <label className="af-label">Address</label>
            <div className="af-input-wrap">
              <MapPin size={15} className="af-icon af-icon-top" />
              <textarea className="af-textarea af-input-icon" placeholder="Street Address" rows={3} value={form.address} onChange={setField("address")} />
            </div>
          </div>

          <div className="af-row af-row-4">
            <div className="af-field">
              <label className="af-label">City</label>
              <input className="af-input" value={form.city} onChange={setField("city")} placeholder="City" />
            </div>
            <div className="af-field">
              <label className="af-label">State</label>
              <input className="af-input" value={form.state} onChange={setField("state")} placeholder="State" />
            </div>
            <div className="af-field">
              <label className="af-label">Country</label>
              <input className="af-input" value={form.country} onChange={setField("country")} placeholder="Country" />
            </div>
            <div className="af-field">
              <label className="af-label">Pincode</label>
              <input className="af-input" placeholder="Pincode" maxLength={6} value={form.pincode} onChange={setField("pincode")} />
            </div>
          </div>
        </section>

        {/* Professional Details */}
        <section className="af-section">
          <h2 className="af-section-title">Professional Details</h2>
          <div className="af-row af-row-4">
            <div className="af-field">
              <label className="af-label">Degree</label>
              <div className="af-input-wrap">
                <GraduationCap size={15} className="af-icon" />
                <input className="af-input af-input-icon" placeholder="e.g. Ph.D." value={form.degree} onChange={setField("degree")} />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Experience (years)</label>
              <div className="af-input-wrap">
                <Briefcase size={15} className="af-icon" />
                <input type="number" min="0" className="af-input af-input-icon" value={form.experience} onChange={setField("experience")} />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Date of Joining</label>
              <div className="af-input-wrap">
                <Calendar size={15} className="af-icon" />
                <input type="date" className="af-input af-input-icon" value={form.joiningDate} onChange={setField("joiningDate")} />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Specialization (comma separated)</label>
              <div className="af-input-wrap">
                <BookOpen size={15} className="af-icon" />
                <input className="af-input af-input-icon" placeholder="CS, AI, ML" value={form.specialization} onChange={setField("specialization")} />
              </div>
            </div>
          </div>
        </section>

        {/* Department Selection */}
        <section className="af-section">
          <h2 className="af-section-title">Department *</h2>
          <div className="af-field">
            <select className="af-select" value={form.department} onChange={setField("department")}>
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.DepartmentName}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Designation */}
        <section className="af-section">
          <h2 className="af-section-title">Designation *</h2>
          <div className="af-field">
            <select className="af-select" value={form.designation} onChange={setField("designation")}>
              <option value="">Select Designation</option>
              <option>Professor</option>
              <option>Head of Department</option>
              <option>Assistant Professor</option>
            </select>
          </div>
        </section>

        {/* Contact Information */}
        <section className="af-section">
          <h2 className="af-section-title">Contact Information</h2>
          <div className="af-row af-row-3">
            <div className="af-field">
              <label className="af-label">Personal Email</label>
              <div className="af-input-wrap">
                <Mail size={15} className="af-icon" />
                <input className="af-input af-input-icon" placeholder="Personal Email" value={form.personalEmail} onChange={setField("personalEmail")} />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Personal Phone *</label>
              <div className="af-input-wrap">
                <Phone size={15} className="af-icon" />
                <input className="af-input af-input-icon" type="tel" placeholder="Phone Number" value={form.personalPhone} onChange={setField("personalPhone")} />
              </div>
            </div>
            <div className="af-field">
              <label className="af-label">Family Phone</label>
              <div className="af-input-wrap">
                <Phone size={15} className="af-icon" />
                <input className="af-input af-input-icon" type="tel" placeholder="Phone Number" value={form.familyPhone} onChange={setField("familyPhone")} />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="af-footer">
          <button className="af-submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Faculty"}
          </button>
        </div>
      </div>
    </div>
  );
}