import { X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./addCourse.css";

const defaultForm = {
  programId: "",
  semesterNumber: "",
  courseId: "",
  courseName: "",
  totalCredits: "",
  startDate: "",
  status: "inactive",
};

// Added onUpdated to the props destructured here
const AddCourse = ({ onClose, semesterData, onUpdated }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (semesterData) {
      setForm((prev) => ({
        ...prev,
        programId: semesterData.programId,
        semesterNumber: semesterData.number,
      }));
    }
  }, [semesterData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        programId: form.programId,
        semesterNumber: form.semesterNumber,
        courseId: form.courseId,
        courseName: form.courseName,
        totalCredits: Number(form.totalCredits),
        isActive: form.status === "active",
      };

      if (form.startDate) {
        dataToSend.StartDate = form.startDate;
      }

      await axios.post("http://localhost:5000/api/courses", dataToSend);

      alert("Course Added Successfully");
      
      // 🔥 Tell the parent to refresh the list
      if (onUpdated) onUpdated(); 
      
      onClose();

    } catch (error) {
      console.log(error);
      alert("Error adding course");
    }
  };

  return (
    <div className="ac-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ac-modal">
        <div className="ac-header">
          <h2 className="ac-header-title">Manage Course</h2>
          <button className="ac-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="ac-body">
          <p className="ac-subtitle">Add Course Details</p>

          <div className="ac-row">
            <div className="ac-field">
              <label className="ac-label">Program</label>
              <input className="ac-input" value={semesterData?.programName} readOnly />
            </div>

            <div className="ac-field">
              <label className="ac-label">Semester</label>
              <input className="ac-input" value={`Semester ${semesterData?.number}`} readOnly />
            </div>
          </div>

          <div className="ac-field">
            <label className="ac-label">Course ID</label>
            <input className="ac-input" type="text" name="courseId" value={form.courseId} onChange={handleChange} />
          </div>

          <div className="ac-field">
            <label className="ac-label">Course Name</label>
            <input className="ac-input" type="text" name="courseName" value={form.courseName} onChange={handleChange} />
          </div>

          <div className="ac-row">
            <div className="ac-field">
              <label className="ac-label">Total Credits</label>
              <input className="ac-input" type="number" name="totalCredits" value={form.totalCredits} onChange={handleChange} />
            </div>

            <div className="ac-field">
              <label className="ac-label">Start Date</label>
              <div className="ac-date-wrapper">
                <input className="ac-input" type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                <Calendar size={16} className="ac-date-icon" />
              </div>
            </div>
          </div>

          <div className="ac-radio-group">
            <label>
              <input type="radio" name="status" value="active" checked={form.status === "active"} onChange={handleChange} /> Active
            </label>
            <label>
              <input type="radio" name="status" value="inactive" checked={form.status === "inactive"} onChange={handleChange} /> Inactive
            </label>
          </div>

          <button className="ac-submit-btn" onClick={handleSubmit}>Add Course</button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;