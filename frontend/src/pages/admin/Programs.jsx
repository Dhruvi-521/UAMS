import { useState } from "react";
import { Search, Plus, ChevronRight, BookMarked, Layers, Monitor, GraduationCap, Users } from "lucide-react";
import "./Programs.css";

const programsData = {
  1: [
    { id: 1, name: "BCA", credits: 10, students: 7 },
    { id: 2, name: "MScIT", credits: 47, students: 9 },
    { id: 3, name: "IMScIT", credits: 40, students: 6 },
    { id: 4, name: "B.Tech", credits: 17, students: 11 },
    { id: 5, name: "B. Turn of B.Tech", credits: 20, students: 1 },
  ],
  2: [
    { id: 6, name: "BBA", credits: 12, students: 15 },
    { id: 7, name: "MBA", credits: 36, students: 22 },
    { id: 8, name: "PGDM", credits: 30, students: 8 },
  ],
  3: [
    { id: 9, name: "B.Sc Physics", credits: 15, students: 10 },
    { id: 10, name: "B.Sc Chemistry", credits: 15, students: 8 },
    { id: 11, name: "M.Sc Physics", credits: 24, students: 5 },
    { id: 12, name: "M.Sc Chemistry", credits: 24, students: 4 },
  ],
  4: [
    { id: 13, name: "B.A English", credits: 10, students: 12 },
    { id: 14, name: "B.A History", credits: 10, students: 9 },
  ],
};

const progIcons = [BookMarked, Layers, Monitor, GraduationCap, Users];

const Programs = ({ department, onSelectProgram, onBack }) => {
  const [search, setSearch] = useState("");
  const programs = (programsData[department.id] || []).filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Departments</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-active">{department.name}</span>
      </div>
      <div className="top-row">
        <h1 className="page-title">{department.name} Programs</h1>
        <div className="top-right">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search Programs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="add-btn">
            <Plus size={16} /> Add Program
          </button>
        </div>
      </div>
      <div className="divider" />
      <div className="card-grid">
        {programs.map((prog, idx) => {
          const Icon = progIcons[idx % progIcons.length];
          return (
            <div key={prog.id} className="card" onClick={() => onSelectProgram(prog)}>
              <div className="icon-box">
                <Icon size={22} color="#2563eb" />
              </div>
              <div className="card-name">{prog.name}</div>
              <div className="card-meta">
                {prog.credits} credits <span className="dot">•</span> {prog.students} students
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Programs;