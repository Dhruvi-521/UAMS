import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, Calendar } from "lucide-react";
import "./addProgram.css";

const addProgram = ({ onClose }) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    programName: "",
    totalYears: "2 Year",
    totalCreditHour: "",
    startDate: "",
    status: "inactive",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  try {
    // convert data for backend
    const dataToSend = {
      programName: formData.programName,
      departmentName: formData.departmentName, // now this is _id
      totalYearsProgram: parseInt(formData.totalYears),
      totalCredit: Number(formData.totalCreditHour),
      isActive: formData.status === "active"
    };

    // remove empty date
    if (formData.startDate) {
      dataToSend.StartDate = formData.startDate;
    }

    const res = await axios.post(
      "http://localhost:5000/api/programs",
      dataToSend
    );

    console.log(res.data);
    alert("Program Added Successfully");

    onClose();

  } catch (error) {
    console.log(error);
    alert("Error adding program");
  }
};

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="ap-form">
      {/* Department Name */}
      {/* <div className="ap-field">
        <label className="ap-label">Department Name</label>
        <input
          className="ap-input"
          type="text"
          placeholder=""
          value={formData.departmentName}
          onChange={(e) => handleChange("departmentName", e.target.value)}
        />
      </div> */}

      <div className="ap-select-wrapper">
        <select
          className="ap-select"
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
        <ChevronDown size={16} className="ap-select-icon" />
      </div>

      {/* Program Name */}
      <div className="ap-field">
        <label className="ap-label">Program Name</label>
        <input
          className="ap-input"
          type="text"
          placeholder=""
          value={formData.programName}
          onChange={(e) => handleChange("programName", e.target.value)}
        />
      </div>

      {/* Total Years Program */}
      <div className="ap-field">
        <label className="ap-label">Total Years Program</label>
        <div className="ap-select-wrapper">
          <select
            className="ap-select"
            value={formData.totalYears}
            onChange={(e) => handleChange("totalYears", e.target.value)}
          >
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
            <option value="4 Year">4 Year</option>
            <option value="5 Year">5 Year</option>
          </select>
          <ChevronDown size={16} className="ap-select-icon" />
        </div>
      </div>

      {/* Total Credit Hour */}
      <div className="ap-field">
        <label className="ap-label">Total Credit Hour</label>
        <input
          className="ap-input"
          type="number"
          placeholder=""
          value={formData.totalCreditHour}
          onChange={(e) => handleChange("totalCreditHour", e.target.value)}
        />
      </div>

      {/* Start Date */}
      <div className="ap-field">
        <label className="ap-label">Start Date</label>
        <div className="ap-date-wrapper">
          <Calendar size={16} className="ap-date-icon" />
          <input
            className="ap-input ap-input--date"
            type="date"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>
      </div>

      {/* Status */}
      <div className="ap-field">
        <label className="ap-label">Status</label>
        <div className="ap-radio-group">
          <label className="ap-radio-label">
            <input
              type="radio"
              name="ap-status"
              value="active"
              checked={formData.status === "active"}
              onChange={() => handleChange("status", "active")}
              className="ap-radio"
            />
            Active
          </label>
          <label className="ap-radio-label">
            <input
              type="radio"
              name="ap-status"
              value="inactive"
              checked={formData.status === "inactive"}
              onChange={() => handleChange("status", "inactive")}
              className="ap-radio"
            />
            Inactive
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="ap-footer">
        <button className="ap-submit-btn" onClick={handleSubmit}>
          Add Program
        </button>
      </div>
    </div>
  );
};

export default addProgram;