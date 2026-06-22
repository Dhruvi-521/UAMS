import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./attendance.css";

const SubjectAttendanceDetails = () => {
  const { subjectId } = useParams();

  const navigate = useNavigate();

  const [historyData, setHistoryData] = useState([]);

  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const courseName = location.state?.courseName || "Attendance History";

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/attendance/student/course/${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setHistoryData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2>Loading Attendance...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Dashboard
      </button>

      <h2 className="page-title">{courseName} - Attendance History</h2>

      <div className="history-grid">
        {historyData.map((item) => (
          <div
            key={item._id}
            className={`history-card ${item.status.toLowerCase()}`}
          >
            <div className="history-info">
              <span className="date-text">
                {new Date(item.attendanceDate).toLocaleDateString()}
              </span>

              <span className={`status-badge ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectAttendanceDetails;
