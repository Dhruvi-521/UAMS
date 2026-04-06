import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import "./UpdateDepartment.css";

const UpdateDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState(true);
  // const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    DepartmentName: "",
    HeadOfDepartment: ""
  });

  // GET DEPARTMENT DATA FROM DB
  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.log(err));
  }, []);

  // GET FACULTY DATA FROM DB
  useEffect(() => {
    axios.get("http://localhost:5000/api/faculty")
      .then(res => setFacultyList(res.data))
      .catch(err => console.log(err));
  }, []);

  const selectedDept = departments.find(d => d._id === selectedId);

  // HANDLE SELECT
  const handleSelect = (id) => {
    setSelectedId(id);

    const dept = departments.find(d => d._id === id);
    if (dept) {
      setFormData({
        DepartmentName: dept.DepartmentName,
        HeadOfDepartment: dept.HeadOfDepartment
      });
      setStatus(dept.isActive);
    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // UPDATE API
  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/update-department/${selectedId}`,
        {
          ...formData,
          isActive: status
        }
      );

      alert("Department Updated Successfully");

    } catch (error) {
      console.log(error);
      alert("Error updating department");
    }
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
            onChange={e => handleSelect(e.target.value)}
          >
            <option value="" disabled>Select a department</option>
            {departments.map(dept => (
              <option key={dept._id} value={dept._id}>
                {dept.DepartmentName}
              </option>
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
              name="DepartmentName"
              className="update-form__input"
              value={formData.DepartmentName}
              onChange={handleChange}
            />
          </div>

          <div className="update-form__info-item">
            <span className="update-form__info-label">Head of Department</span>
            <div className="update-form__select-wrapper">
              <input
                type="text"
                name="HeadOfDepartment"
                className="update-form__input"
                value={formData.HeadOfDepartment}
                onChange={handleChange}
              />
              {/* <select
                name="HeadOfDepartment"
                className="update-form__select"
                value={formData.HeadOfDepartment}
                onChange={handleChange}
              >
                <option value="">Select HOD</option>
                {facultyList.map(fac => (
                  <option key={fac._id} value={`${fac.firstName} ${fac.lastName}`}>
                    {fac.firstName} {fac.lastName}
                  </option>
                ))}
              </select> */}
              {/* <ChevronDown size={18} className="update-form__select-icon" /> */}
            </div>
          </div>
        </div>
      )}

      <div className="update-form__group">
        <div className="update-form__radio-group">
          <label className="update-form__radio-label">
            <input
              type="radio"
              checked={status === true}
              onChange={() => setStatus(true)}
              className="update-form__radio"
            />
            <span className="update-form__radio-custom"></span>
            Active
          </label>

          <label className="update-form__radio-label">
            <input
              type="radio"
              checked={status === false}
              onChange={() => setStatus(false)}
              className="update-form__radio"
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