/**
 * Route: /student/materials/:materialsId
 * Reads materialsId via useParams()
 */

import { useParams, useNavigate } from "react-router-dom";
import {
  useState,
  useEffect
} from "react";

import axios from "axios";
import "./MaterialDetails.css";


/* ── Icons ── */
const FileIcon = () => (
  <svg className="md-file-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#fff" opacity=".92" />
    <polyline points="14 2 14 8 20 8" fill="none" stroke="#a8d4f5" strokeWidth="1.4" />
    <line x1="8" y1="13" x2="16" y2="13" stroke="#a8d4f5" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="8" y1="17" x2="13" y2="17" stroke="#a8d4f5" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BackIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

/* ── Download helper ── */


/* ── Component ── */
export default function MaterialDetails() {
  const { materialsId } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] =
    useState(null);

  const [materials, setMaterials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const token =
        sessionStorage.getItem("token");

      const response =
        await axios.get(
          `http://localhost:5000/api/materials/course/${materialsId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setMaterials(response.data);

      if (
        response.data &&
        response.data.length > 0
      ) {
        setCourse(
          response.data[0].courseId
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="md-page">
        Loading Materials...
      </div>
    );
  }

  const doneCount = materials.length;
  const pct = materials.length > 0 ? 100 : 0;

  return (
    <div className="md-page">

      {/* Breadcrumb */}
      <nav className="md-breadcrumb">
        <button className="md-back-btn" onClick={() => navigate("/student/materials")}>
          <BackIcon /> Back
        </button>
        <span className="md-sep">/</span>
        <span className="md-bc-course">
          {course?.courseId}
        </span>
        <span className="md-sep">/</span>
        <span className="md-bc-current">Notes</span>
      </nav>

      {/* Course header */}
      <div className="md-course-header" style={{ borderLeftColor: "#7c6fe0" }}>
        <div className="md-header-info">
          <h1 className="md-course-title">
            {course?.courseId} {course?.courseName}
          </h1>
          <p className="md-course-batch">
            Semester {course?.semesterNumber}
          </p>
        </div>
        <div className="md-header-right">
          <div className="md-prog-track">
            <div className="md-prog-fill" style={{ width: `${pct}%`, background: "#7c6fe0" }} />
          </div>
          <span className="md-prog-label">{pct}% complete</span>
        </div>
      </div>

      {/* Notes section */}
      <section className="md-section">
        <div className="md-section-head">
          <span className="md-section-arrow">&#8250;</span>
          <h2 className="md-section-title">Notes</h2>
        </div>

        <div className="md-notes-list">
          {materials.length === 0 && (
            <p className="md-empty">No materials available yet.</p>
          )}

          {materials.map((note) => (
            <div key={note._id} className="md-note-row">
              {/* Left */}
              <div className="md-note-left">
                <div className="md-file-icon">
                  <FileIcon />
                </div>
                <div className="md-note-meta">
                  <span className="md-note-type">{note.type}</span>
                  <a
                    className="md-note-title"
                    href={`http://localhost:5000/${note.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {note.title}
                  </a>
                  {note.description && <span className="md-note-desc">{note.description}</span>}
                </div>
              </div>

              {/* Right */}
              <div className="md-note-right">
                {note.done ? (
                  <button
                    className="md-btn md-btn-download"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/${note.filePath}`,
                        "_blank"
                      )
                    }
                  >
                    <DownloadIcon /> Download
                  </button>
                ) : (
                  <button
                    className="md-btn md-btn-download"
                    onClick={() =>
                      window.open(
                        `http://localhost:5000/${note.filePath}`,
                        "_blank"
                      )
                    }
                    title="Download"
                  >
                    <DownloadIcon /> Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
