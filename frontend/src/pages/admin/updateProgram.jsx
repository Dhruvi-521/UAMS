import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import "./updateProgram.css";

const programOptions = [
  { value: "cs-bsc", label: "Computer Science - B.Sc." },
  { value: "bca", label: "BCA" },
  { value: "mscit", label: "MScIT" },
  { value: "btech", label: "B.Tech" },
  { value: "bba", label: "BBA" },
  { value: "mba", label: "MBA" },
];

const departmentOptions = [
  { value: "sob", label: "School of Business" },
  { value: "soc", label: "School of Computer" },
];

const programDefaults = {
  "cs-bsc": {
    departmentName: "Engineering & Technology",
    programName: "Computer Science - B.Sc.",
    totalYears: "4 Year",
    totalCreditHour: "140",
    startDate: "2023-09-01",
    status: "active",
  },
};


const updateProgram = ({ onClose }) => {
  const [selectedProgram, setSelectedProgram] = useState("cs-bsc");
  const [formData, setFormData] = useState(
    programDefaults["cs-bsc"] || {
      departmentName: "",
      programName: "",
      totalYears: "2 Year",
      totalCreditHour: "",
      startDate: "",
      status: "active",
    }
  );

  const handleProgramSelect = (value) => {
    setSelectedProgram(value);
    setFormData(
      programDefaults[value] || {
        departmentName: "",
        programName: "",
        totalYears: "2 Year",
        totalCreditHour: "",
        startDate: "",
        status: "active",
      }
    );
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Update Program:", { selectedProgram, ...formData });
    onClose();
  };

  return (
    <div className="up-form">
      {/* Select Program to Update */}
      <div className="up-field">
        <label className="up-label">Select Program to Update</label>
        <div className="up-select-wrapper">
          <select
            className="up-select"
            value={selectedProgram}
            onChange={(e) => handleProgramSelect(e.target.value)}
          >
            {programOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="up-select-icon" />
        </div>
      </div>

      <div className="up-field">
        <label className="up-label">Updated Department</label>
        <div className="up-select-wrapper">
          <select
            className="up-select"
            value={selectedProgram}
            onChange={(e) => handleProgramSelect(e.target.value)}
          >
            {departmentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="up-select-icon" />
        </div>
      </div>

      {/* Department Name */}
      {/* <div className="up-field">
        <label className="up-label">Department Name</label>
        <input
          className="up-input"
          type="text"
          value={formData.departmentName}
          onChange={(e) => handleChange("departmentName", e.target.value)}
        />
      </div> */}

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

      {/* Total Years + Credit Hour side by side */}
      <div className="up-row">
        <div className="up-field up-field--half">
          <label className="up-label">Total Years Program</label>
          <div className="up-select-wrapper">
            <select
              className="up-select"
              value={formData.totalYears}
              onChange={(e) => handleChange("totalYears", e.target.value)}
            >
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
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

      {/* Start Date */}
      {/* <div className="up-field">
        <label className="up-label">Start Date</label>
        <div className="up-date-wrapper">
          <Calendar size={16} className="up-date-icon" />
          <input
            className="up-input up-input--date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>
      </div> */}

      {/* Status */}
      <div className="up-field">
        <label className="up-label">Status</label>
        <div className="up-radio-group">
          <label className="up-radio-label">
            <input
              type="radio"
              name="up-status"
              value="active"
              checked={formData.status === "active"}
              onChange={() => handleChange("status", "active")}
              className="up-radio"
            />
            Active
          </label>
          <label className="up-radio-label">
            <input
              type="radio"
              name="up-status"
              value="inactive"
              checked={formData.status === "inactive"}
              onChange={() => handleChange("status", "inactive")}
              className="up-radio"
            />
            Inactive
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="up-footer">
        <button className="up-submit-btn" onClick={handleSubmit}>
          Update Program
        </button>
      </div>
    </div>
  );
};

export default updateProgram;