import { X, ChevronDown, Calendar } from "lucide-react";
import { useState } from "react";
import "./addCourse.css";

const PROGRAMS = ["BCA", "MCA", "MScIT", "BBA", "ImscIT"];
const SEMESTERS = Array.from({ length: 10 }, (_, i) => i + 1);

const defaultForm = {
  program: "",
  semester: "",
  courseId: "",
  courseName: "",
  totalCredits: "",
  startDate: "",
  status: "inactive",
};

const addCourse = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(form);
    onClose();
  };

  return (
    <div className="ac-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ac-modal">
        {/* Header */}
        <div className="ac-header">
          <h2 className="ac-header-title">Manage course</h2>
          <button className="ac-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="ac-body">
          <p className="ac-subtitle">Add Course Details</p>

          {/* Row 1: Program + Semester */}
          <div className="ac-row">
            <div className="ac-field">
              <label className="ac-label">Select the Program</label>
              <div className="ac-select-wrapper">
                <select
                  className="ac-select"
                  name="program"
                  value={form.program}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select the Program</option>
                  {PROGRAMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="ac-select-icon" />
              </div>
            </div>

            <div className="ac-field">
              <label className="ac-label">Select the Semester</label>
              <div className="ac-select-wrapper">
                <select
                  className="ac-select"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select the Semester</option>
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="ac-select-icon" />
              </div>
            </div>
          </div>

          {/* Row 2: Course ID */}
          <div className="ac-row ac-single">
            <div className="ac-field">
              <label className="ac-label">Course ID</label>
              <input
                className="ac-input"
                type="text"
                name="courseId"
                placeholder="Course ID"
                value={form.courseId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3: Course Name */}
          <div className="ac-row ac-single">
            <div className="ac-field">
              <label className="ac-label">Course Name</label>
              <input
                className="ac-input"
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={form.courseName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 4: Total Credits + Start Date */}
          <div className="ac-row">
            <div className="ac-field">
              <label className="ac-label">Total Credits</label>
              <input
                className="ac-input"
                type="number"
                name="totalCredits"
                placeholder="e.g. 3"
                value={form.totalCredits}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div className="ac-field">
              <label className="ac-label">Start Date</label>
              <div className="ac-date-wrapper">
                <input
                  className="ac-input"
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                />
                <Calendar size={16} className="ac-date-icon" />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="ac-radio-group">
            <label className="ac-radio-label">
              <input
                type="radio"
                name="status"
                value="active"
                checked={form.status === "active"}
                onChange={handleChange}
              />
              Active
            </label>
            <label className="ac-radio-label">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={form.status === "inactive"}
                onChange={handleChange}
              />
              Inactive
            </label>
          </div>

          {/* Submit */}
          <button className="ac-submit-btn" onClick={handleSubmit}>
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default addCourse;