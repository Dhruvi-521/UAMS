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
import axios from "axios";

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

  const [materials, setMaterials] =
    useState([]);

  const [materialTitle,
    setMaterialTitle] =
    useState("");

  const [materialDescription,
    setMaterialDescription] =
    useState("");

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/faculty-course/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCoursesData(response.data);
    } catch (error) {
      console.error(
        "Error fetching courses:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterials = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/materials/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMaterials(response.data);
    } catch (error) {
      console.error(
        "Error fetching materials:",
        error
      );
    }
  };

  const uploadMaterial = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "title",
        materialTitle
      );

      formData.append(
        "description",
        materialDescription
      );

      formData.append(
        "courseId",
        selectedCourse._id
      );

      formData.append(
        "file",
        selectedFile
      );

      await axios.post(
        "http://localhost:5000/api/materials/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Material uploaded successfully"
      );

      setMaterialTitle("");
      setMaterialDescription("");
      setSelectedFile(null);

      fetchMaterials(
        selectedCourse._id
      );

      setShowUpload(false);
    } catch (error) {
      console.error(
        "Upload Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Upload failed"
      );
    }
  };

  const deleteMaterial = async (
    materialId
  ) => {
    try {
      const token = localStorage.getItem("token");

      const confirmDelete =
        window.confirm(
          "Delete this material?"
        );

      if (!confirmDelete) return;

      await axios.delete(
        `http://localhost:5000/api/materials/${materialId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMaterials(
        selectedCourse._id
      );
    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );
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
              value={materialTitle}
              onChange={(e) =>
                setMaterialTitle(
                  e.target.value
                )
              }
            />

            <input
              className="cc-input"
              placeholder="Description"
              value={materialDescription}
              onChange={(e) =>
                setMaterialDescription(
                  e.target.value
                )
              }
            />

            <input
              className="cc-input"
              type="file"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files[0]
                )
              }
            />

            <button
              className="cc-submit-btn"
              onClick={uploadMaterial}
            >
              Upload
            </button>
          </div>
        )}

        <div className="cc-mat-list">
          {materials.map((mat) => (
            <div className="cc-mat-row" key={mat.id}>
              <div className="cc-mat-icon-wrap">
                <FileText size={20} color="#2563eb" />
              </div>

              <div className="cc-mat-info">
                <span className="cc-mat-type">
                  {mat.type}
                </span>

                <span className="cc-mat-name">
                  {mat.title}
                </span>

                <span className="cc-mat-desc">
                  {mat.description}
                </span>
              </div>

              <div className="cc-mat-actions">
                <span className="cc-done-badge">
                  <CheckCircle size={13} /> Done
                </span>

                <a
                  href={`http://localhost:5000/${mat.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="cc-dl-btn"
                >
                  <Download size={13} />
                  Download
                </a>

                <button
                  className="cc-delete-btn"
                  onClick={() =>
                    deleteMaterial(mat._id)
                  }
                >
                  Delete
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
              onClick={() => {
                setSelectedCourse(course);

                fetchMaterials(course._id);
              }}>
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