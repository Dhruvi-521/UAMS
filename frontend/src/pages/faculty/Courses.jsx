import { useState, useEffect } from "react";
import {
  GraduationCap,
  FileText,
  Upload,
  ArrowLeft,
  Search,
  Download,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import "./Courses.css";

const materialsData = [
  {
    id: 1,
    type: "FILE",
    name: "Unit 1",
    desc: "Number systems & binary arithmetic",
    status: "Done",
  },
  {
    id: 2,
    type: "FKS",
    name: "Unit 2",
    desc: "Boolean algebra & logic gates",
    status: "Done",
  },
  {
    id: 3,
    type: "FKE",
    name: "Unit 3",
    desc: "CPU architecture & memory",
    status: "Done",
  },
  {
    id: 4,
    type: "FKE",
    name: "Unit 4",
    desc: "I/O and storage systems",
    status: "Done",
  },
];

const cardColors = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [search, setSearch] = useState("");

  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/faculty-course/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setCoursesData(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // MATERIAL PAGE
  // ===========================
  if (selectedCourse) {
    return (
      <div className="cc-container">
        <div className="cc-breadcrumb">
          <button
            className="cc-back-btn"
            onClick={() => {
              setSelectedCourse(null);
              setShowUpload(false);
            }}
          >
            <ArrowLeft size={15} /> Back
          </button>

          <span className="cc-crumb">My Courses</span>

          <ChevronRight size={13} className="cc-crumb-sep" />

          <span className="cc-crumb">{selectedCourse.courseId}</span>

          <ChevronRight size={13} className="cc-crumb-sep" />

          <span className="cc-crumb active">Materials</span>
        </div>

        <div className="cc-mat-header">
          <div>
            <div className="cc-mat-title-row">
              <span className="cc-mat-code">
                {selectedCourse.courseId}
              </span>

              <span className="cc-mat-course-title">
                {selectedCourse.courseName}
              </span>
            </div>

            <div className="cc-mat-progress-row">
              <div className="cc-progress-track">
                <div
                  className="cc-progress-fill"
                  style={{ width: "100%" }}
                />
              </div>

              <span className="cc-progress-label">
                Semester {selectedCourse.semesterNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="cc-notes-bar">
          <div className="cc-notes-tab">
            <FileText size={14} /> Notes
          </div>

          <button
            className="cc-upload-btn"
            onClick={() => setShowUpload(!showUpload)}
          >
            <Upload size={14} /> + UPLOAD NEW MATERIAL
          </button>
        </div>

        {showUpload && (
          <div className="cc-upload-form">
            <h4>Upload New Material</h4>

            <input
              className="cc-input"
              placeholder="Material Title"
            />

            <input
              className="cc-input"
              placeholder="Description"
            />

            <input
              className="cc-input"
              type="file"
            />

            <button className="cc-submit-btn">
              Upload
            </button>
          </div>
        )}

        <div className="cc-mat-list">
          {materialsData.map((mat) => (
            <div className="cc-mat-row" key={mat.id}>
              <div className="cc-mat-icon-wrap">
                <FileText size={20} color="#2563eb" />
              </div>

              <div className="cc-mat-info">
                <span className="cc-mat-type">
                  {mat.type}
                </span>

                <span className="cc-mat-name">
                  {mat.name}
                </span>

                <span className="cc-mat-desc">
                  {mat.desc}
                </span>
              </div>

              <div className="cc-mat-actions">
                <span className="cc-done-badge">
                  <CheckCircle size={13} /> Done
                </span>

                <button className="cc-dl-btn">
                  <Download size={13} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ===========================
  // COURSES PAGE
  // ===========================
  const filtered = coursesData.filter(
    (course) =>
      course.courseName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      course.courseId
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="cc-container">
      <div className="cc-page-header">
        <h1 className="cc-page-title">
          <GraduationCap
            size={24}
            style={{
              marginRight: 8,
              verticalAlign: "middle",
            }}
          />
          My Courses
        </h1>

        <div className="cc-search-wrap">
          <Search
            size={15}
            className="cc-search-icon"
          />

          <input
            className="cc-search"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <div className="cc-course-grid">
          {filtered.map((course, i) => (
            <div
              className="cc-course-card"
              key={course._id}
              onClick={() => setSelectedCourse(course)}
            >
              <div
                className="cc-course-thumb"
                style={{
                  background:
                    cardColors[i % cardColors.length],
                }}
              />

              <div className="cc-course-body">
                <span className="cc-course-code">
                  {course.courseId}
                </span>

                <p className="cc-course-name">
                  {course.courseName}
                </p>

                <span className="cc-course-tag">
                  Semester {course.semesterNumber}
                </span>

                <div
                  className="cc-progress-track"
                  style={{ marginTop: 10 }}
                >
                  <div
                    className="cc-progress-fill"
                    style={{ width: "100%" }}
                  />
                </div>

                <span className="cc-progress-pct">
                  {course.totalCredits} Credits
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}