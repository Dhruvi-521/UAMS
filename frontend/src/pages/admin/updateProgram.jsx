import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, Calendar } from "lucide-react";
import "./updateProgram.css";

const updateProgram = ({ onClose }) => {

  // 🔥 NEW STATES
  const [programs, setPrograms] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedProgram, setSelectedProgram] = useState("");

  const [formData, setFormData] = useState({
    departmentName: "",
    programName: "",
    totalYears: "2 Year",
    totalCreditHour: "",
    startDate: "",
    status: "active",
  });

  // ✅ FETCH PROGRAMS
  useEffect(() => {
    axios.get("http://localhost:5000/api/programs")
      .then(res => setPrograms(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ FETCH DEPARTMENTS
  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 SELECT PROGRAM
  const handleProgramSelect = (id) => {
    setSelectedProgram(id);

    const prog = programs.find(p => p._id === id);

    if (prog) {
      setFormData({
        departmentName: prog.departmentName?._id || "",
        programName: prog.programName,
        totalYears: prog.totalYearsProgram + " Year",
        totalCreditHour: prog.totalCredit,
        startDate: prog.StartDate?.substring(0,10),
        status: prog.isActive ? "active" : "inactive",
      });
    }
  };

  // HANDLE CHANGE (same)
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔥 SUBMIT (API CALL)
  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/programs/${selectedProgram}`,
        {
          programName: formData.programName,
          departmentName: formData.departmentName,
          totalYearsProgram: parseInt(formData.totalYears),
          totalCredit: parseInt(formData.totalCreditHour),
          StartDate: formData.startDate,
          isActive: formData.status === "active"
        }
      );

      alert("Program Updated Successfully");
      onClose();

    } catch (error) {
      console.log(error);
      alert("Error updating program");
    }
  };

  return (
    <div className="up-form">

      {/* ✅ UPDATED PROGRAM DROPDOWN */}
      <div className="up-field">
        <label className="up-label">Select Program to Update</label>
        <div className="up-select-wrapper">
          <select
            className="up-select"
            value={selectedProgram}
            onChange={(e) => handleProgramSelect(e.target.value)}
          >
            <option value="">Select Program</option>
            {programs.map((prog) => (
              <option key={prog._id} value={prog._id}>
                {prog.programName}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="up-select-icon" />
        </div>
      </div>

      {/* ✅ UPDATED DEPARTMENT DROPDOWN */}
      <div className="up-field">
        <label className="up-label">Updated Department</label>
        <div className="up-select-wrapper">
          <select
            className="up-select"
            value={formData.departmentName}
            onChange={(e) => handleChange("departmentName", e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.DepartmentName}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="up-select-icon" />
        </div>
      </div>

      {/* Program Name */}
      <div className="up-field">
        <label className="up-label">Updated Program Name</label>
        <input
          className="up-input"
          type="text"
          value={formData.programName}
          onChange={(e) => handleChange("programName", e.target.value)}
        />
      </div>

      {/* Years + Credit */}
      <div className="up-row">
        <div className="up-field up-field--half">
          <label className="up-label">Total Years Program</label>
          <div className="up-select-wrapper">
            <select
              className="up-select"
              value={formData.totalYears}
              onChange={(e) => handleChange("totalYears", e.target.value)}
            >
              <option value="2">2 Year</option>
              <option value="3">3 Year</option>
              <option value="4">4 Year</option>
              <option value="5">5 Year</option>
            </select>
            <ChevronDown size={16} className="up-select-icon" />
          </div>
        </div>

        <div className="up-field up-field--half">
          <label className="up-label">Total Credit Hour</label>
          <input
            className="up-input"
            type="number"
            value={formData.totalCreditHour}
            onChange={(e) => handleChange("totalCreditHour", e.target.value)}
          />
        </div>
      </div>

      {/* Status */}
      <div className="up-field">
        <label className="up-label">Status</label>
        <div className="up-radio-group">
          <label className="up-radio-label">
            <input
              type="radio"
              checked={formData.status === "active"}
              onChange={() => handleChange("status", "active")}
              className="up-radio"
            />
            Active
          </label>
          <label className="up-radio-label">
            <input
              type="radio"
              checked={formData.status === "inactive"}
              onChange={() => handleChange("status", "inactive")}
              className="up-radio"
            />
            Inactive
          </label>
        </div>
      </div>

      <div className="up-footer">
        <button className="up-submit-btn" onClick={handleSubmit}>
          Update Program
        </button>
      </div>
    </div>
  );
};

export default updateProgram;