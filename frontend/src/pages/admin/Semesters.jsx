import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import "./Semesters.css";

const generateSemesters = (count = 6) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1, number: i + 1, name: `Semester ${i + 1}`, courses: 6, credits: 18,
  }));

const semestersData = {
  1: generateSemesters(6),
  2: generateSemesters(4),
  3: generateSemesters(4),
  4: generateSemesters(6),
  5: generateSemesters(3),
};

const Semesters = ({ department, program, onSelectSemester, onBack, onBackToDepartments }) => {
  const [search, setSearch] = useState("");
  const semesters = (semestersData[program.id] || generateSemesters(6)).filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBackToDepartments}>Departments</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={onBack}>{department.shortName}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-active">{program.name}</span>
      </div>
      <div className="top-row">
        <h1 className="page-title">{program.name} Semesters Structure</h1>
        <div className="top-right">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search semester"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* <button className="add-btn">
            <Plus size={16} /> Add Semester
          </button> */}
        </div>
      </div>
      <div className="divider" />
      <div className="card-grid">
        {semesters.map(sem => (
          <div key={sem.id} className="card" onClick={() => onSelectSemester(sem)}>
            <div className="num-badge">{sem.number}</div>
            <div className="sem-name">{sem.name}</div>
            <div className="card-meta">
              {sem.courses} Courses <span className="dot">•</span> {sem.credits} Credits
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Semesters;