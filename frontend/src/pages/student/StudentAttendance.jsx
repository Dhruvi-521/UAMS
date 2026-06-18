import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./attendance.css";

const COLORS = [
  "#4A90E2",
  "#50C878",
  "#FFB347",
  "#9B59B6",
  "#FF6B6B",
  "#00C2A8",
  "#3D5AFE",
  "#FF8A65",
];

const StudentAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/attendance/student/my-attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("Attendance:", data);

      const grouped = {};

      data.forEach((record) => {
        const courseId = record.course._id;

        if (!grouped[courseId]) {
          grouped[courseId] = {
            id: courseId,
            name: record.course.courseName,
            total: 0,
            present: 0,
          };
        }

        grouped[courseId].total++;

        if (record.status === "Present") {
          grouped[courseId].present++;
        }
      });

      const result = Object.values(grouped).map((subject, index) => ({
        ...subject,
        absent: subject.total - subject.present,
        percent:
          subject.total > 0
            ? Math.round((subject.present / subject.total) * 100)
            : 0,
        color: COLORS[index % COLORS.length],
      }));

      setSubjects(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalClasses = subjects.reduce((sum, sub) => sum + sub.total, 0);

  const totalPresent = subjects.reduce((sum, sub) => sum + sub.present, 0);

  const totalAbsent = totalClasses - totalPresent;

  const overallPercent =
    totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;

  if (loading) {
    return (
      <div className="dashboard-container">
        <h2 className="page-title">Student Attendance</h2>
        <p>Loading attendance...</p>
      </div>
    );
  }
  return (
    <div className="dashboard-containe  r">
      <h2 className="page-title">Student Attendance</h2>

      {/* Row 1: Summary Cards */}
      <div className="summary-grid">
        <div className="card summary-card overall">
          <h3>Overall Attendance %</h3>
          <div className="stat-value">{overallPercent}%</div>
          <p>Consistent attendance is key.</p>
        </div>
        <div className="card summary-card present">
          <h3>Total Present Days</h3>
          <div className="stat-value">
            {totalPresent} / {totalClasses}
          </div>
          <p>Total days present this semester.</p>
        </div>
        <div className="card summary-card absent">
          <h3>Total Absent Days</h3>
          <div className="stat-value">{totalAbsent}</div>
          <p>Total classes missed.</p>
        </div>
      </div>

      {/* Row 2: Circular Progress Grid */}
      <div className="card progress-section">
        <h3>Subject-wise Attendance Progress</h3>
        <div className="progress-grid">
          {subjects.map((sub) => (
            <div key={sub.id} className="progress-item">
              <div
                className="circular-progress"
                style={{
                  background: `conic-gradient(${sub.color} ${sub.percent * 3.6}deg, #ededed 0deg)`,
                }}
              >
                <div className="inner-circle">
                  <span>{sub.percent}%</span>
                </div>
              </div>
              <h4>{sub.name}</h4>
              <p>
                {sub.present}/{sub.total} Classes
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Attendance Table */}
      <div className="card table-section">
        <h3>Subject-wise Attendance</h3>
        <div className="responsive-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total Classes</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr
                  key={sub.id}
                  onClick={() => navigate(`/student/attendance/${sub.id}`)}
                  className="clickable-row"
                >
                  <td data-label="Subject">
                    <strong>{sub.name}</strong>
                  </td>
                  <td data-label="Total Classes">{sub.total}</td>
                  <td data-label="Present">{sub.present}</td>
                  <td data-label="Absent">{sub.absent}</td>
                  <td
                    data-label="Attendance %"
                    style={{ color: sub.color, fontWeight: "bold" }}
                  >
                    {sub.percent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
