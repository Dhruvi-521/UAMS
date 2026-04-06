import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import "./updateCourse.css";

const programs = ["BCA", "MCA", "MScIT", "BBA", "ImscIT"];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const updateCourse = ({ onClose, onSubmit, course }) => {
  const [form, setForm] = useState({
    program: course?.program || "",
    semester: course?.semester || "",
    courseId: course?.code || "",
    courseName: course?.name || "",
    credits: course?.credits || "",
    status: course?.status === "Active" ? "Active" : "Inactive",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="uc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="uc-modal">

        {/* Header */}
        <div className="uc-header">
          <div className="uc-header-text">
            <h2>Update course</h2>
            <p>Update Course Details</p>
          </div>
          <button className="uc-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="uc-form">

          {/* Row 1: Program + Semester */}
          <div className="uc-row">
            <div className="uc-field">
              <label>Update Program</label>
              <div className="uc-select-wrapper">
                <select
                  className="uc-select"
                  value={form.program}
                  onChange={(e) => handleChange("program", e.target.value)}
                >
                  <option value="" disabled>Select Program</option>
                  {programs.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="uc-chevron" />
              </div>
            </div>

            <div className="uc-field">
              <label>Update Semester</label>
              <div className="uc-select-wrapper">
                <select
                  className="uc-select"
                  value={form.semester}
                  onChange={(e) => handleChange("semester", e.target.value)}
                >
                  <option value="" disabled>Select Semester</option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="uc-chevron" />
              </div>
            </div>
          </div>

          {/* Row 2: Course ID */}
          <div className="uc-field">
            <label>Updated Course ID</label>
            <input
              className="uc-input"
              type="text"
              placeholder="e.g., MCA-201"
              value={form.courseId}
              onChange={(e) => handleChange("courseId", e.target.value)}
            />
          </div>

          {/* Row 3: Course Name */}
          <div className="uc-field">
            <label>Updated Course Name</label>
            <input
              className="uc-input"
              type="text"
              placeholder="e.g., Advanced Database Systems"
              value={form.courseName}
              onChange={(e) => handleChange("courseName", e.target.value)}
            />
          </div>

          {/* Row 4: Credits + Status */}
          <div className="uc-row">
            <div className="uc-field">
              <label>Update Credits</label>
              <input
                className="uc-input"
                type="number"
                min={1}
                placeholder="e.g., 4"
                value={form.credits}
                onChange={(e) => handleChange("credits", e.target.value)}
              />
            </div>

            <div className="uc-field">
              <label>Status</label>
              <div className="uc-status-group">
                <label className="uc-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={form.status === "Active"}
                    onChange={() => handleChange("status", "Active")}
                  />
                  Active
                </label>
                <label className="uc-radio-label">
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={form.status === "Inactive"}
                    onChange={() => handleChange("status", "Inactive")}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button className="uc-submit-btn" onClick={handleSubmit}>
            Update Course Details
          </button>

        </div>
      </div>
    </div>
  );
};

export default updateCourse;