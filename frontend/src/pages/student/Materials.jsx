import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Materials.css";

/* ── Sample Data ── */
const ALL_COURSES = [
  {
    id: "intro-programming",
    code: "242301101",
    name: "Introduction to Programming & Problem Solving",
    batch: "FYBCA_Dual",
    progress: 75,
    color: "#7c6fe0",
    patternColor: "#6558d0",
    pattern: "circles",
  },
  {
    id: "programming-practicals",
    code: "242301102",
    name: "Programming – Practicals",
    batch: "FYBCA_Dual",
    progress: 27,
    color: "#3dd6c8",
    patternColor: "#2bbfb2",
    pattern: "octagons",
  },
  {
    id: "computer-organization",
    code: "242301103",
    name: "Fundamentals of Computer Organization",
    batch: "FYBCA_Dual",
    progress: 75,
    color: "#4a90d9",
    patternColor: "#3a7fc8",
    pattern: "triangles",
  },
  {
    id: "web-technologies",
    code: "242301104",
    name: "Web Technologies",
    batch: "FYBCA_Dual",
    progress: 60,
    color: "#9b8fe0",
    patternColor: "#8a7ecf",
    pattern: "squares",
  },
  {
    id: "web-technologies-practicals",
    code: "242301105",
    name: "Web Technologies – Practicals",
    batch: "FYBCA_Dual",
    progress: 40,
    color: "#b0b8c1",
    patternColor: "#9aa3ac",
    pattern: "hexagons",
  },
  {
    id: "publishing-multimedia",
    code: "242301106",
    name: "Publishing & Multimedia Tools",
    batch: "FYBCA_Dual",
    progress: 50,
    color: "#2ecc71",
    patternColor: "#26b864",
    pattern: "squares",
  },
];

/* ── SVG Patterns ── */
const Pattern = ({ type, patternColor }) => {
  const a = patternColor + "66";
  const b = patternColor + "99";

  switch (type) {
    case "circles":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35"  cy="35"  r="32" fill={a} />
          <circle cx="90"  cy="65"  r="25" fill={b} />
          <circle cx="150" cy="28"  r="20" fill={a} />
          <circle cx="185" cy="85"  r="35" fill={b} />
          <circle cx="60"  cy="108" r="18" fill={a} />
          <circle cx="120" cy="100" r="14" fill={b} />
        </svg>
      );
    case "octagons":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <polygon points="55,8 95,8 115,28 115,72 95,92 55,92 35,72 35,28"  fill={a} />
          <polygon points="140,4 172,4 188,20 188,56 172,72 140,72 124,56 124,20" fill={b} />
          <polygon points="10,90 38,90 52,104 52,124 38,138 10,138 -4,124 -4,104" fill={a} />
        </svg>
      );
    case "triangles":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <polygon points="110,4 158,88 62,88"  fill={a} />
          <polygon points="185,8 220,72 150,72" fill={b} />
          <polygon points="30,18 68,88 -8,88"  fill={a} />
          <polygon points="85,62 118,118 52,118" fill={b} />
        </svg>
      );
    case "hexagons":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <polygon points="62,10 88,10 101,32 88,54 62,54 49,32"  fill={a} />
          <polygon points="138,18 164,18 177,40 164,62 138,62 125,40" fill={b} />
          <polygon points="18,68 44,68 57,90 44,112 18,112 5,90"   fill={a} />
          <polygon points="168,72 194,72 207,94 194,116 168,116 155,94" fill={b} />
        </svg>
      );
    default: // squares
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <rect x="8"   y="8"   width="44" height="44" rx="5" fill={a} />
          <rect x="28"  y="28"  width="44" height="44" rx="5" fill={b} />
          <rect x="118" y="4"   width="54" height="54" rx="5" fill={a} />
          <rect x="140" y="26"  width="54" height="54" rx="5" fill={b} />
          <rect x="64"  y="72"  width="38" height="38" rx="5" fill={a} />
          <rect x="162" y="78"  width="34" height="34" rx="5" fill={b} />
        </svg>
      );
  }
};

/* ── Progress Bar ── */
const ProgressBar = ({ value, color }) => (
  <div className="sm-progress-wrap">
    <div className="sm-progress-track">
      <div className="sm-progress-fill" style={{ width: `${value}%`, background: color }} />
    </div>
    <span className="sm-progress-label">{value}% complete</span>
  </div>
);

/* ── Main Component ── */
export default function Materials() {
  const navigate = useNavigate();
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");
  const [sortBy, setSortBy]   = useState("course name");
  const [view,   setView]     = useState("Card");

  const batches = ["All", ...new Set(ALL_COURSES.map((c) => c.batch))];

  const visible = ALL_COURSES
    .filter((c) => {
      const q = search.toLowerCase();
      return (
        (filter === "All" || c.batch === filter) &&
        (c.name.toLowerCase().includes(q) || c.code.includes(q))
      );
    })
    .sort((a, b) =>
      sortBy === "progress"
        ? b.progress - a.progress
        : sortBy === "code"
        ? a.code.localeCompare(b.code)
        : a.name.localeCompare(b.name)
    );

  return (
    <div className="sm-page">
      {/* ── Toolbar ── */}
      <div className="sm-toolbar">
        {/* Filter */}
        <div className="sm-ctl sm-filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {batches.map((b) => <option key={b}>{b}</option>)}
          </select>
          <span className="sm-chevron">▾</span>
        </div>

        {/* Search */}
        <div className="sm-ctl sm-search">
          <svg className="sm-search-icon" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="sm-ctl sm-sort">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="course name">Sort by course name</option>
            <option value="progress">Sort by progress</option>
            <option value="code">Sort by code</option>
          </select>
          <span className="sm-chevron">▾</span>
        </div>

        {/* View toggle */}
        <div className="sm-view-toggle">
          {["Card", "List"].map((m) => (
            <button
              key={m}
              className={view === m ? "active" : ""}
              onClick={() => setView(m)}
            >
              {m}
              {/* <span className="sm-chevron">▾</span> */}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid / List ── */}
        <div className={`sm-grid ${view === "List" ? "sm-list-view" : ""}`}>        
          {visible.length === 0 && (
          <p className="sm-empty">No courses match your search.</p>
        )}
        {visible.map((course) => (
          <article
            key={course.id}
            className="sm-card"
            onClick={() => navigate(`/student/materials/${course.id}`)}
            tabIndex={0}
            role="button"
            aria-label={`Open ${course.name}`}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/student/materials/${course.id}`)}
          >
            {/* Banner */}
            <div className="sm-banner" style={{ background: course.color }}>
              <Pattern type={course.pattern} patternColor={course.patternColor} />
            </div>

            {/* Body */}
            <div className="sm-card-body">
              <span
                className="sm-card-title"
                onClick={() => navigate(`/student/materials/${course.id}`)}
                >
                {course.code} {course.name}
              </span>
              <p className="sm-card-batch">{course.batch}</p>
              <ProgressBar value={course.progress} color={course.color} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
