import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Materials.css";

/* ── Sample Data ── */


/* ── SVG Patterns ── */
const Pattern = ({ type, patternColor }) => {
  const a = patternColor + "66";
  const b = patternColor + "99";

  switch (type) {
    case "circles":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="32" fill={a} />
          <circle cx="90" cy="65" r="25" fill={b} />
          <circle cx="150" cy="28" r="20" fill={a} />
          <circle cx="185" cy="85" r="35" fill={b} />
          <circle cx="60" cy="108" r="18" fill={a} />
          <circle cx="120" cy="100" r="14" fill={b} />
        </svg>
      );
    case "octagons":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <polygon points="55,8 95,8 115,28 115,72 95,92 55,92 35,72 35,28" fill={a} />
          <polygon points="140,4 172,4 188,20 188,56 172,72 140,72 124,56 124,20" fill={b} />
          <polygon points="10,90 38,90 52,104 52,124 38,138 10,138 -4,124 -4,104" fill={a} />
        </svg>
      );
    case "triangles":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <polygon points="110,4 158,88 62,88" fill={a} />
          <polygon points="185,8 220,72 150,72" fill={b} />
          <polygon points="30,18 68,88 -8,88" fill={a} />
          <polygon points="85,62 118,118 52,118" fill={b} />
        </svg>
      );
    case "hexagons":
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <polygon points="62,10 88,10 101,32 88,54 62,54 49,32" fill={a} />
          <polygon points="138,18 164,18 177,40 164,62 138,62 125,40" fill={b} />
          <polygon points="18,68 44,68 57,90 44,112 18,112 5,90" fill={a} />
          <polygon points="168,72 194,72 207,94 194,116 168,116 155,94" fill={b} />
        </svg>
      );
    default: // squares
      return (
        <svg className="sm-pattern" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="44" height="44" rx="5" fill={a} />
          <rect x="28" y="28" width="44" height="44" rx="5" fill={b} />
          <rect x="118" y="4" width="54" height="54" rx="5" fill={a} />
          <rect x="140" y="26" width="54" height="54" rx="5" fill={b} />
          <rect x="64" y="72" width="38" height="38" rx="5" fill={a} />
          <rect x="162" y="78" width="34" height="34" rx="5" fill={b} />
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

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("course name");
  const [view, setView] = useState("Card");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Get logged in student's profile
      const profileResponse = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const profileData = await profileResponse.json();

      const programId = profileData.profile.program;
      const semesterNumber = profileData.profile.semester;

      console.log("Program ID:", programId);
      console.log("Semester:", semesterNumber);

      // Get courses using program and semester
      const courseResponse = await fetch(
        `http://localhost:5000/api/courses/${programId}/${semesterNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const courseData = await courseResponse.json();

      console.log("Courses:", courseData);

      setCourses(courseData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const batches = ["All"];

  const visible = courses
    .filter((c) => {
      const q = search.toLowerCase();

      return (
        c.courseName?.toLowerCase().includes(q) ||
        c.courseId?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) =>
      sortBy === "code"
        ? a.courseId.localeCompare(b.courseId)
        : a.courseName.localeCompare(b.courseName)
    );

  if (loading) {
    return (
      <div className="sm-page">
        <h2>Loading Courses...</h2>
      </div>
    );
  }

  return (
    <div className="sm-page">
      {/* Toolbar */}
      <div className="sm-toolbar">
        {/* Filter */}
        <div className="sm-ctl sm-filter">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {batches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <span className="sm-chevron">▾</span>
        </div>

        {/* Search */}
        <div className="sm-ctl sm-search">
          <svg
            className="sm-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#aaa"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="course name">
              Sort by course name
            </option>
            <option value="code">
              Sort by code
            </option>
          </select>
          <span className="sm-chevron">▾</span>
        </div>

        {/* View Toggle */}
        <div className="sm-view-toggle">
          {["Card", "List"].map((m) => (
            <button
              key={m}
              className={view === m ? "active" : ""}
              onClick={() => setView(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Grid/List */}
      <div
        className={`sm-grid ${view === "List" ? "sm-list-view" : ""
          }`}
      >
        {visible.length === 0 && (
          <p className="sm-empty">
            No courses found for your semester.
          </p>
        )}

        {visible.map((course, index) => (
          <article
            key={course._id}
            className="sm-card"
            onClick={() =>
              navigate(
                `/student/materials/${course.courseId}`
              )
            }
            tabIndex={0}
            role="button"
            aria-label={`Open ${course.courseName}`}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              navigate(
                `/student/materials/${course.courseId}`
              )
            }
          >
            {/* Banner */}
            <div
              className="sm-banner"
              style={{
                background:
                  [
                    "#7c6fe0",
                    "#3dd6c8",
                    "#4a90d9",
                    "#9b8fe0",
                    "#2ecc71",
                  ][index % 5],
              }}
            >
              <Pattern
                type={[
                  "circles",
                  "octagons",
                  "triangles",
                  "squares",
                  "hexagons",
                ][index % 5]}
                patternColor="#ffffff55"
              />
            </div>

            {/* Body */}
            <div className="sm-card-body">
              <span className="sm-card-title">
                {course.courseId} {course.courseName}
              </span>

              <p className="sm-card-batch">
                Semester {course.semesterNumber}
              </p>

              <ProgressBar
                value={0}
                color="#7c6fe0"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
