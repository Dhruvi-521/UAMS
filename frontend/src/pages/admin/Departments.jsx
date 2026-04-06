import { useState } from "react";
import { Search, Plus, Monitor, Briefcase, FlaskConical, BookOpen } from "lucide-react";
import "./Departments.css";
import Modal from "./ManageDepartmentModel";

const departmentsData = [
  { id: 1, name: "School of Computer Science", shortName: "SCS", description: "6 Programs. Computation", subtitle: "School of Computer Science", programCount: 5 },
  { id: 2, name: "School of Business", shortName: "SOB", description: "2 Productallor Geographic", subtitle: "School of Business", programCount: 3 },
  { id: 3, name: "School of Sciences", shortName: "SOS", description: "4 Programs. Natural Sciences", subtitle: "School of Sciences", programCount: 4 },
  { id: 4, name: "School of Arts", shortName: "SOA", description: "2 Programs. Liberal Arts", subtitle: "School of Arts", programCount: 2 },
];

const deptIcons = { 1: Monitor, 2: Briefcase, 3: FlaskConical, 4: BookOpen };

const Departments = ({ onSelectDepartment }) => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = departmentsData.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
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
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Manage Department
        </button>
      </div>
      <div className="card-grid">
        {filtered.map(dept => {
          const Icon = deptIcons[dept.id] || Monitor;
          return (
            <div key={dept.id} className="card" onClick={() => onSelectDepartment(dept)}>
              <div className="card-header">
                <div className="icon-box">
                  <Icon size={24} color="#2563eb" />
                </div>
                <span className="card-title">{dept.name}</span>
              </div>
              <div className="programs-label">
                Programs <span className="program-count">({dept.programCount})</span>
              </div>
              <div className="card-desc">
                {dept.description}<br />{dept.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Departments;