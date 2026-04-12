import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function DeleteProgram() {
    const [programs, setPrograms] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    // const [facultyList, setFacultyList] = useState([]);
    const [formData, setFormData] = useState({
        DepartmentName: "",
    });

    // GET DEPARTMENT DATA FROM DB
    useEffect(() => { fetchPrograms(); }, []);
    const fetchPrograms = async () => { 
        try { const res = await axios.get("http://localhost:5000/api/programs"); 
            setPrograms(res.data); 
        } 
        catch (error) { 
            console.error("Error fetching programs:", error); 
        } 
    };



    const selectedDept = programs.find(d => d._id === selectedId);

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
       if (!selectedId) { alert("Please select a program"); return; } 
       const confirmDelete = window.confirm( "Are you sure you want to delete this program?" ); 
       if (!confirmDelete) return;

       try { 
        setLoading(true); 
        await axios.delete( `http://localhost:5000/api/delete-programs/${selectedId}` ); 
        alert("Program deleted successfully"); 
        // ✅ Update UI instantly 
        setPrograms(prev => prev.filter(program => program._id !== selectedId) ); 
        setSelectedId(""); 
    } 
    catch (error) { 
            console.error("Delete error:", error); alert( error.response?.data?.message || "Error deleting program" ); 
        } 
    finally{ 
            setLoading(false); 
        }
    };
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
                `http://localhost:5000/api/delete-programs/${selectedId}`,
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
                    Select Program
                </label>
                <div className="update-form__select-wrapper">
                    <select
                        id="selectDepartment"
                        className="update-form__select"
                        value={selectedId}
                        onChange={e => handleSelect(e.target.value)}
                    >
                        <option value="" disabled>Select a department</option>
                        {programs.map(dept => (
                            <option key={dept._id} value={dept._id}>
                                {dept.programName}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={18} className="update-form__select-icon" />
                </div>
            </div>


            <div className="update-form__actions">
                <button className="update-form__submit-btn" onClick={handleDelete}>
                    Delete Program
                </button>
                <button className="update-form__cancel-btn">
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteProgram
