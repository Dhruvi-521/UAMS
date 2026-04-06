import { useState, useEffect } from "react";
import { Search, Plus, Monitor } from "lucide-react";
import axios from "axios";
import "./Departments.css";
import Modal from "./ManageDepartmentModel";

const Departments = ({ onSelectDepartment }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentsData, setDepartmentsData] = useState([]);

  // ✅ Fetch departments from backend
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments");
      setDepartmentsData(res.data);
    } catch (error) {
      console.log("Error fetching departments:", error);
    }
  };

  // ✅ Search filter
  const filtered = departmentsData.filter((d) =>
    d.DepartmentName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1 className="dp-page-title">Departments</h1>

      <div className="top-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search Departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Manage Department
        </button>
      </div>

      {/* ✅ Cards */}
      <div className="card-grid">
        {filtered.length > 0 ? (
          filtered.map((dept, index) => {
            const Icon = Monitor; // default icon

            return (
              <div
                key={index}
                className="card"
                onClick={() => onSelectDepartment(dept)}
              >
                <div className="card-header">
                  <div className="icon-box">
                    <Icon size={24} color="#2563eb" />
                  </div>
                  <span className="card-title">
                    {dept.DepartmentName}
                  </span>
                </div>

                <div className="programs-label">
                  Status:{" "}
                  <span className="program-count">
                    {dept.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="card-desc">
                  HOD: {dept.HeadOfDepartment || "N/A"} <br />
                  Start Date:{" "}
                  {dept.StartDate
                    ? new Date(dept.StartDate).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No departments found
          </p>
        )}
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            fetchDepartments(); // 🔥 refresh after add
          }}
        />
      )}
    </div>
  );
};

export default Departments;