import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function DeleteDepartment() {
    const [departments, setDepartments] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [status, setStatus] = useState(true);
    // const [facultyList, setFacultyList] = useState([]);
    const [formData, setFormData] = useState({
        DepartmentName: "",
    });

    // GET DEPARTMENT DATA FROM DB
    useEffect(() => {
        axios.get("http://localhost:5000/api/departments")
            .then(res => setDepartments(res.data))
            .catch(err => console.log(err));
    }, []);



    const selectedDept = departments.find(d => d._id === selectedId);

    // HANDLE SELECT
    const handleSelect = (id) => {
        setSelectedId(id);
        // if (dept) {
        //     setFormData({
        //         DepartmentName: dept.DepartmentName
        //     });
        //     setStatus(dept.isActive);
        // }
    };

    // Delete Department Data
    const handleDelete = async () => { 
        if (!selectedId) { alert("Please select a department"); return; } const confirmDelete = window.confirm( "Are you sure you want to delete this department?" ); if (!confirmDelete) return; try { await axios.delete( `http://localhost:5000/api/delete-department/${selectedId}` ); alert("Department deleted successfully");

         // ✅ Update UI after delete 
         setDepartments(prev => prev.filter(dept => dept._id !== selectedId) ); setSelectedId(""); } catch (error) { console.log(error); alert("Error deleting department"); } };
    // HANDLE CHANGE
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

  // UPDATE API
  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/delete-department/${selectedId}`,
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


      <div className="update-form__actions">
        <button className="update-form__submit-btn" onClick={handleDelete}>
         Delete Department
        </button>
        <button className="update-form__cancel-btn">
          Cancel
        </button>
      </div>
    </div>
    )
}

export default DeleteDepartment
