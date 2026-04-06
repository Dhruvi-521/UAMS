import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import "./AddDepartment.css";
import axios from "axios";

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    DepartmentName: "",
    HeadOfDepartment: "",
    StartDate: "",
    isActive: false,
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/add-department",
        formData
      );

      console.log(res.data);
      alert("Department Added Successfully");

    } catch (error) {
      console.log(error);
      alert("Error adding department");
    }
  };

  return (
    <div className="add-form">
      <div className="add-form__group">
        <label className="add-form__label" htmlFor="departmentName">
          Department Name
        </label>
        <input
          id="departmentName"
          name="DepartmentName"
          type="text"
          className="add-form__input"
          placeholder="Enter department name"
          value={formData.DepartmentName}
          onChange={handleChange}
        />
      </div>
      <div className="add-form__group">
        <label className="add-form__label" htmlFor="departmentName">
          Heade of Department
        </label>
        <input
          id="departmentName"
          name="HeadOfDepartment"
          type="text"
          className="add-form__input"
          placeholder="Heade of Department"
          value={formData.HeadOfDepartment}
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
            name="StartDate"
            type="date"
            className="add-form__input add-form__input--date"
            placeholder="Start Date"
            value={formData.StartDate}
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
              name="isActive"
              value="true"
              className="add-form__radio"
              checked={formData.isActive === true}
              onChange={() => setFormData(prev => ({ ...prev, isActive: true }))}
            />
            <span className="add-form__radio-custom"></span>
            Active
          </label>
          <label className="add-form__radio-label">
            <input
              type="radio"
              name="isActive"
              value="false"
              checked={formData.isActive === false}
              onChange={() => setFormData(prev => ({ ...prev, isActive: false }))}
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