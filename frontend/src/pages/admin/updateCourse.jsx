import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import "./updateCourse.css";

const updateCourse = ({ onClose, course, onUpdated }) => {
  const [form, setForm] = useState({
    courseId: course?.courseId || "",
    courseName: course?.courseName || "",
    totalCredits: course?.totalCredits || "",
    status: course?.isActive ? "active" : "inactive",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        courseId: form.courseId,
        courseName: form.courseName,
        totalCredits: Number(form.totalCredits),
        isActive: form.status === "active",
      };

      await axios.put(
        `http://localhost:5000/api/courses/${course._id}`,
        dataToSend
      );

      alert("Course Updated Successfully");

      if (onUpdated) onUpdated(); // 🔥 refresh table

      onClose();

    } catch (error) {
      console.log(error);
      alert("Error updating course");
    }
  };

  return (
    <div className="uc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="uc-modal">

        <div className="uc-header">
          <h2>Update Course</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="uc-form">

          <div className="uc-field">
            <label>Course ID</label>
            <input
              className="uc-input"
              value={form.courseId}
              onChange={(e) => handleChange("courseId", e.target.value)}
            />
          </div>

          <div className="uc-field">
            <label>Course Name</label>
            <input
              className="uc-input"
              value={form.courseName}
              onChange={(e) => handleChange("courseName", e.target.value)}
            />
          </div>

          <div className="uc-field">
            <label>Credits</label>
            <input
              type="number"
              className="uc-input"
              value={form.totalCredits}
              onChange={(e) => handleChange("totalCredits", e.target.value)}
            />
          </div>

          <div className="uc-field">
            <label>Status</label>
            <select
              className="uc-select"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button className="uc-submit-btn" onClick={handleSubmit}>
            Update Course
          </button>

        </div>
      </div>
    </div>
  );
};

export default updateCourse;