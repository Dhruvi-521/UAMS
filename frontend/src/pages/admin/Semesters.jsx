import { useState } from "react";
import { Search, ChevronRight, Plus } from "lucide-react";
import "./Semesters.css";
import AddCourse from "./addCourse";

// ✅ Dynamic Semester Generator
const generateSemesters = (years = 3) => {
  const totalSemesters = years * 2;

  return Array.from({ length: totalSemesters }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    name: `Semester ${i + 1}`,
    courses: 6,
    credits: 18,
  }));
};

const Semesters = ({
  department,
  program,
  onSelectSemester,
  onBack,
  onBackToDepartments
}) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const semesters = generateSemesters(program.totalYearsProgram).filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBackToDepartments}>
          Departments
        </span>
        <ChevronRight size={14} />

        <span className="breadcrumb-link" onClick={onBack}>
          {department.DepartmentName}
        </span>
        <ChevronRight size={14} />

        <span className="breadcrumb-active">
          {program.programName}
        </span>
      </div>

      <div className="top-row">
        <h1 className="page-title">
          {program.programName} Semesters Structure
        </h1>

        <div className="top-right">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search semester"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="card-grid">
        {semesters.map((sem) => (
          <div
            key={sem.id}
            className="card"
            onClick={() =>
              onSelectSemester({
                ...sem,
                programId: program._id,
                programName: program.programName,
              })
            }
          >
            <div className="num-badge">{sem.number}</div>
            <div className="sem-name">{sem.name}</div>

            <div className="card-meta">
              {sem.courses} Courses <span className="dot">•</span>{" "}
              {sem.credits} Credits
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Add Course Modal */}
      {showModal && (
        <AddCourse
          semesterData={selectedSemester}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Semesters;