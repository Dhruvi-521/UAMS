import { useState } from "react";
import { Calendar } from "lucide-react";
import "./AddDepartment.css";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    headofDepartment:"",
    startDate: "",
    status: "inactive",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Add Department:", formData);
  };

  return (
    <div className="add-form">
      <div className="add-form__group">
        <label className="add-form__label" htmlFor="departmentName">
          Department Name
        </label>
        <input
          id="departmentName"
          name="departmentName"
          type="text"
          className="add-form__input"
          placeholder="Enter department name"
          value={formData.departmentName}
          onChange={handleChange}
        />
      </div>
      <div className="add-form__group">
        <label className="add-form__label" htmlFor="departmentName">
          Heade of Department
        </label>
        <input
          id="departmentName"
          name="headofDepartment"
          type="text"
          className="add-form__input"
          placeholder="Heade of Department"
          value={formData.headofDepartment}
          onChange={handleChange}
        />
      </div>

      <div className="add-form__group">
        <label className="add-form__label" htmlFor="startDate">
          Start Date
        </label>
        <div className="add-form__date-wrapper">
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="add-form__input add-form__input--date"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <Calendar size={18} className="add-form__date-icon" />
        </div>
      </div>

      <div className="add-form__group">
        <div className="add-form__radio-group">
          <label className="add-form__radio-label">
            <input
              type="radio"
              name="status"
              value="active"
              className="add-form__radio"
              checked={formData.status === "active"}
              onChange={handleChange}
            />
            <span className="add-form__radio-custom"></span>
            Active
          </label>
          <label className="add-form__radio-label">
            <input
              type="radio"
              name="status"
              value="inactive"
              className="add-form__radio"
              checked={formData.status === "inactive"}
              onChange={handleChange}
            />
            <span className="add-form__radio-custom"></span>
            Inactive
          </label>
        </div>
      </div>

      <button className="add-form__submit-btn" onClick={handleSubmit}>
        Add Department
      </button>
    </div>
  );
};

export default AddDepartment;