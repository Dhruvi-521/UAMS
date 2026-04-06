import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronRight,
  BookMarked,
  Layers,
  Monitor,
  GraduationCap,
  Users
} from "lucide-react";
import axios from "axios";
import "./Programs.css";
import ManageProgramModal from "./ManageProgramModal";

const progIcons = [BookMarked, Layers, Monitor, GraduationCap, Users];

const Programs = ({ department, onSelectProgram, onBack }) => {
  const [search, setSearch] = useState("");
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch programs based on department
  useEffect(() => {
    if (department?._id) {
      fetchPrograms();
    }
  }, [department]);

  const fetchPrograms = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/programs/${department._id}`
      );
      setPrograms(res.data);
    } catch (error) {
      console.log("Error fetching programs:", error);
    }
  };

  // ✅ Search filter
  const filteredPrograms = programs.filter((p) =>
    p.programName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>
          Departments
        </span>
        <ChevronRight size={14} />
        <span className="breadcrumb-active">
          {department.DepartmentName}
        </span>
      </div>

      <div className="top-row">
        <h1 className="page-title">
          {department.DepartmentName} Programs
        </h1>

        <div className="top-right">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search Programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Manage Program
          </button>
        </div>
      </div>

      <div className="divider" />

      {/* ✅ Program Cards */}
      <div className="card-grid">
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((prog, idx) => {
            const Icon = progIcons[idx % progIcons.length];

            return (
              <div
                key={prog._id}
                className="card"
                onClick={() => onSelectProgram(prog)}
              >
                <div className="icon-box">
                  <Icon size={22} color="#2563eb" />
                </div>

                <div className="card-name">{prog.programName}</div>

                <div className="card-meta">
                  {prog.totalCredit} credits
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No programs found
          </p>
        )}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <ManageProgramModal
          onClose={() => {
            setShowModal(false);
            fetchPrograms(); // 🔥 refresh after add
          }}
        />
      )}
    </div>
  );
};

export default Programs;