import { ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./updateCourse.css";

const UpdateCourse = ({ onClose, course, onUpdated }) => {
  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    totalCredits: "",
    status: "active",
  });

  // Sync form state when the 'course' prop changes or component opens
  useEffect(() => {
    if (course) {
      setForm({
        courseId: course.courseId || "",
        courseName: course.courseName || "",
        totalCredits: course.totalCredits || "",
        status: course.isActive ? "active" : "inactive",
      });
    }
  }, [course]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!form.courseId || !form.courseName) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const dataToSend = {
        courseId: form.courseId,
        courseName: form.courseName,
        totalCredits: Number(form.totalCredits),
        isActive: form.status === "active",
      };

      const res = await axios.put(
        `http://localhost:5000/api/courses/${course._id}`,
        dataToSend
      );

      if (res.status === 200) {
        alert("Course Updated Successfully");
        
        // 1. Tell the parent to refetch data or update state
        if (onUpdated) {
          await onUpdated(); 
        }

        // 2. Close the modal
        onClose();
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert(error.response?.data?.message || "Error updating course");
    }
  };

  return (
    <div className="uc-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="uc-modal">
        <div className="uc-header">
          <h2>Update Course</h2>
          <button className="uc-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="uc-form">
          <div className="uc-field">
            <label className="uc-label">Course ID</label>
            <input
              className="uc-input"
              type="text"
              value={form.courseId}
              onChange={(e) => handleChange("courseId", e.target.value)}
            />
          </div>

          <div className="uc-field">
            <label className="uc-label">Course Name</label>
            <input
              className="uc-input"
              type="text"
              value={form.courseName}
              onChange={(e) => handleChange("courseName", e.target.value)}
            />
          </div>

          <div className="uc-field">
            <label className="uc-label">Credits</label>
            <input
              className="uc-input"
              type="number"
              value={form.totalCredits}
              onChange={(e) => handleChange("totalCredits", e.target.value)}
            />
          </div>

          <div className="uc-field">
            <label className="uc-label">Status</label>
            <div className="uc-select-wrapper">
              <select
                className="uc-select"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown size={16} className="uc-select-icon" />
            </div>
          </div>

          <div className="uc-footer">
            <button className="uc-submit-btn" onClick={handleSubmit}>
              Update Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;