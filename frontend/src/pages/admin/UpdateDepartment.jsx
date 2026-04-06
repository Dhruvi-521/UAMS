import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./UpdateDepartment.css";

const departmentOptions = [
  { id: 1, name: "Engineering Department", code: "ENG-001", head: "Dr. Amelia Chen" },
  { id: 2, name: "School of Business", code: "BUS-002", head: "Prof. James Reed" },
  { id: 3, name: "School of Sciences", code: "SCI-003", head: "Dr. Priya Sharma" },
  { id: 4, name: "School of Arts", code: "ART-004", head: "Dr. Lucas Morin" },
];

const UpdateDepartment = () => {
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("active");

  const selectedDept = departmentOptions.find(d => d.id === parseInt(selectedId));

  const handleSubmit = () => {
    console.log("Update Department:", { selectedDept, status });
  };

  return (
    <div className="update-form">
      <div className="update-form__group">
        <label className="update-form__label" htmlFor="selectDepartment">
          Select Department to Update
        </label>
        <div className="update-form__select-wrapper">
          <select
            id="selectDepartment"
            className="update-form__select"
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
          >
            <option value="" disabled>Select a department</option>
            {departmentOptions.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
          <ChevronDown size={18} className="update-form__select-icon" />
        </div>
      </div>

      {selectedDept && (
        <div className="update-form__info-grid">
          <div className="update-form__info-item">
            <span className="update-form__info-label">Department Name</span>
            <input
              type="text"
              className="update-form__input"
              defaultValue={selectedDept.name}
            />
          </div>
          {/* <div className="update-form__info-item">
            <span className="update-form__info-label">Head of Department</span>
            <input
              type="text"
              className="update-form__input"
              value={selectedDept.code}
            />
          </div> */}
          <div className="update-form__info-item">
            <span className="update-form__info-label">Head of Department</span>
            <div className="update-form__select-wrapper">
              <select className="update-form__select" defaultValue={selectedDept.head}>
                <option>{selectedDept.head}</option>
              </select>
              <ChevronDown size={18} className="update-form__select-icon" />
            </div>
          </div>
        </div>
      )}

      <div className="update-form__group">
        <div className="update-form__radio-group">
          <label className="update-form__radio-label">
            <input
              type="radio"
              name="update-status"
              value="active"
              className="update-form__radio"
              checked={status === "active"}
              onChange={() => setStatus("active")}
            />
            <span className="update-form__radio-custom"></span>
            Active
          </label>
          <label className="update-form__radio-label">
            <input
              type="radio"
              name="update-status"
              value="inactive"
              className="update-form__radio"
              checked={status === "inactive"}
              onChange={() => setStatus("inactive")}
            />
            <span className="update-form__radio-custom"></span>
            Inactive
          </label>
        </div>
      </div>

      <div className="update-form__actions">
        <button className="update-form__submit-btn" onClick={handleSubmit}>
          Save Changes
        </button>
        <button className="update-form__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateDepartment;