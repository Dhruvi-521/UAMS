import { ArrowLeft, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateFaculty.css";

export default function UpdateFacultyForm({ faculty, onBack, onUpdateSuccess }) {
  const [departments, setDepartments] = useState([]);
  const [saving,      setSaving]      = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // Maps any incoming faculty shape → flat form state.
  // Works whether it receives the normalised object from ManageFaculty or the
  // raw backend response (both field-name variants are handled).
  // ─────────────────────────────────────────────────────────────────────────
  const getInitialData = (f) => {
    if (!f) return {};

    const addressObj =
      typeof f.address === "object" && f.address !== null ? f.address : {};

    const fullAddress =
      addressObj.fullAddress ??
      (typeof f.address === "string" ? f.address : "") ??
      "";

    const specialization =
      typeof f.specialization === "string"
        ? f.specialization
        : Array.isArray(f.specialization)
          ? (f.specialization[0] ?? "")
          : Array.isArray(f.specializations)
            ? (f.specializations[0] ?? "")
            : "";

    return {
      // Identity
      universityEmail: f.universityEmail ?? "",
      facultyId:       f.facultyId       ?? f.id            ?? "",

      // Personal
      firstName:  f.firstName  ?? "",
      middleName: f.middleName ?? "",
      lastName:   f.lastName   ?? "",
      gender:     f.gender     ?? "Male",
      dob:        f.dob        ?? "",

      // Address
      address: fullAddress,
      city:    addressObj.city    ?? f.city    ?? "",
      state:   addressObj.state   ?? f.state   ?? "",
      country: addressObj.country ?? f.country ?? "India",
      pincode: addressObj.pincode ?? f.pincode ?? "",

      // Professional
      degree:         f.degree         ?? f.qualification  ?? "",
      experience:     f.experience     ?? "",
      dateOfJoining:  f.dateOfJoining  ?? f.joiningDate    ?? f.joinDate ?? "",
      specialization,

      // Contact
      personalEmail: f.personalEmail ?? "",
      contactNumber: f.contactNumber ?? f.phone            ?? "",
      familyContact: f.familyContact ?? f.familyPhone      ?? f.guardianPhone ?? "",

      // Department / Designation
      department:  f.department  ?? "",
      designation: f.designation ?? "",
    };
  };

  const [form, setForm] = useState(() => getInitialData(faculty));

  // Re-populate when faculty prop changes (e.g. user picks a different row)
  useEffect(() => {
    if (faculty) setForm(getInitialData(faculty));
  }, [faculty]);

  // Fetch departments for the select dropdown
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Failed to fetch departments", err));
  }, []);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ─────────────────────────────────────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    const targetId = form.facultyId;
    if (!targetId) { alert("Faculty ID missing"); return; }

    setSaving(true);
    try {
      // Map form → backend payload
      const payload = {
        ...form,
        qualification: form.degree,                  // backend field name
        joiningDate:   form.dateOfJoining,            // backend field name
        phone:         form.contactNumber,            // backend field name
        familyPhone:   form.familyContact,            // backend field name
        specialization: [form.specialization],        // backend expects array
        address: {
          fullAddress: form.address,
          city:        form.city,
          state:       form.state,
          country:     form.country,
          pincode:     form.pincode,
        },
      };

      await axios.put(`http://localhost:5000/api/faculty/${targetId}`, payload);

      // ── Notify parent with the saved form data so it can update local state
      //    WITHOUT a full re-fetch (instant UI update).
      if (typeof onUpdateSuccess === "function") {
        onUpdateSuccess(form);   // pass current form state (has normalised keys)
        alert("Faculty Data Updated ")
      } else {
        // Fallback: just go back
        onBack();
      }
    } catch (error) {
      console.error("Update Error:", error.response?.data || error);
      alert("Error updating faculty. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="uf-wrapper">
      <div className="uf-header">
        <button className="uf-back-btn" onClick={onBack} type="button">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="uf-title">Update Faculty</h1>
      </div>

      <div className="uf-card">

        {/* ── Basic Information ──────────────────────────────────────── */}
        <div className="uf-section-label">Basic Information</div>

        <div className="uf-grid uf-grid-2">
          <div className="uf-field">
            <label className="uf-label">University Mail ID</label>
            <input
              className="uf-input"
              type="email"
              value={form.universityEmail}
              onChange={(e) => update("universityEmail", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Faculty ID</label>
            <input
              className="uf-input"
              value={form.facultyId}
              readOnly
              style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
            />
          </div>
        </div>

        <div className="uf-grid uf-grid-3">
          <div className="uf-field">
            <label className="uf-label">First Name</label>
            <input
              className="uf-input"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Middle Name</label>
            <input
              className="uf-input"
              placeholder="Middle Name"
              value={form.middleName}
              onChange={(e) => update("middleName", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Last Name</label>
            <input
              className="uf-input"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="uf-grid uf-grid-2">
          <div className="uf-field">
            <label className="uf-label">Gender</label>
            <select
              className="uf-input"
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="uf-field">
            <label className="uf-label">Date of Birth</label>
            <div className="uf-icon-input-wrap">
              <Calendar size={15} className="uf-input-icon" />
              <input
                className="uf-input uf-input-icon-pad"
                type="date"
                value={form.dob}
                onChange={(e) => update("dob", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Address Details ────────────────────────────────────────── */}
        <div className="uf-section-label">Address Details</div>

        <div className="uf-grid uf-grid-addr">
          <div className="uf-field uf-field-textarea">
            <label className="uf-label">Address</label>
            <textarea
              className="uf-textarea"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              rows={3}
            />
          </div>
          <div className="uf-addr-right">
            <div className="uf-field">
              <label className="uf-label">City</label>
              <select
                className="uf-input"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              >
                <option value="">Select City</option>
                {["Ahmedabad", "Mumbai", "Delhi", "Bangalore", "Pune"].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="uf-field">
              <label className="uf-label">State</label>
              <select
                className="uf-input"
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              >
                <option value="">Select State</option>
                {["Gujarat", "Maharashtra", "Delhi", "Karnataka"].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="uf-field">
              <label className="uf-label">Pincode</label>
              <input
                className="uf-input"
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Professional Details ───────────────────────────────────── */}
        <div className="uf-section-label">Professional Details</div>

        <div className="uf-grid uf-grid-4">
          <div className="uf-field">
            <label className="uf-label">Degree / Qualification</label>
            <input
              className="uf-input"
              value={form.degree}
              onChange={(e) => update("degree", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Experience</label>
            <input
              className="uf-input"
              value={form.experience}
              onChange={(e) => update("experience", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Joining Date</label>
            <div className="uf-icon-input-wrap">
              <Calendar size={15} className="uf-input-icon" />
              <input
                className="uf-input uf-input-icon-pad"
                type="date"
                value={form.dateOfJoining}
                onChange={(e) => update("dateOfJoining", e.target.value)}
              />
            </div>
          </div>
          <div className="uf-field">
            <label className="uf-label">Specialization</label>
            <input
              className="uf-input"
              value={form.specialization}
              onChange={(e) => update("specialization", e.target.value)}
            />
          </div>
        </div>

        {/* ── Contact Information ────────────────────────────────────── */}
        <div className="uf-section-label">Contact Information</div>

        <div className="uf-grid uf-grid-3">
          <div className="uf-field">
            <label className="uf-label">Personal Email</label>
            <input
              className="uf-input"
              type="email"
              value={form.personalEmail}
              onChange={(e) => update("personalEmail", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Contact Number</label>
            <input
              className="uf-input"
              value={form.contactNumber}
              onChange={(e) => update("contactNumber", e.target.value)}
            />
          </div>
          <div className="uf-field">
            <label className="uf-label">Family Contact</label>
            <input
              className="uf-input"
              value={form.familyContact}
              onChange={(e) => update("familyContact", e.target.value)}
            />
          </div>
        </div>

        {/* ── Department and Designation ─────────────────────────────── */}
        <div className="uf-section-label">Department and Designation</div>

        <div className="uf-grid uf-grid-2">
          <div className="uf-field">
            <label className="uf-label">Department</label>
            <select
              className="uf-input"
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept.DepartmentName}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </div>
          <div className="uf-field">
            <label className="uf-label">Designation</label>
            <select
              className="uf-input"
              value={form.designation}
              onChange={(e) => update("designation", e.target.value)}
            >
              <option value="">Select Designation</option>
              <option value="Professor">Professor</option>
              <option value="Assistant Professor">Assistant Professor</option>
              <option value="Associate Professor">Associate Professor</option>
              <option value="Head of Department">Head of Department</option>
            </select>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="uf-footer">
          <button className="uf-cancel-btn" onClick={onBack} type="button" disabled={saving}>
            Cancel
          </button>
          <button
            className="uf-submit-btn"
            type="button"
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? "Saving…" : "Update Faculty"}
          </button>
        </div>

      </div>
    </div>
  );
}