import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Grades.css';

const Grades = () => {
  const [student, setStudent] = useState(null);
  const [gradeData, setGradeData] = useState([]);
  const [marksInfo, setMarksInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allMarks, setAllMarks] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/marks/my-marks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudent(response.data.student);

        const marksArray = response.data.data || [];

        setAllMarks(marksArray);

        if (marksArray.length > 0) {
          setSelectedExam(marksArray[0].examType);
        }

      } catch (error) {
        console.error("Error fetching marks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  useEffect(() => {
    if (!selectedExam || !allMarks.length) return;

    const selectedRecord = allMarks.find(
      mark => mark.examType === selectedExam
    );

    if (selectedRecord) {
      setMarksInfo(selectedRecord);
      setGradeData(selectedRecord.subjects || []);
    }
  }, [selectedExam, allMarks]);


  // Calculate Total Marks
  const totalMarks =
    gradeData.reduce(
      (acc, curr) => acc + curr.marksObtained,
      0
    );

  const maxPossible = gradeData.length * 50;

  const currentGPA = marksInfo
    ? ((marksInfo.percentage / 100) * 4).toFixed(2)
    : 0;
  if (loading) {
    return <h2>Loading Marks...</h2>;
  }

  const cumulativeGPA =
    allMarks.length > 0
      ? (
        allMarks.reduce(
          (sum, mark) =>
            sum + ((mark.percentage / 100) * 4),
          0
        ) / allMarks.length
      ).toFixed(2)
      : 0;

  const handleDownloadReport = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/marks/download-report/${marksInfo._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `${marksInfo.examType}-Result.pdf`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grades-page">
      <div className="grades-container">
        {/* Page Header */}
        <header className="page-header">
          <div className="header-text">
            <h1>My Grades</h1>
            <p>
              {marksInfo?.examType || "Exam"} Examination Results
            </p>
          </div>
          {/* <div className="header-actions">
            <button className="btn btn-secondary">Download Report</button>
            <button className="btn btn-secondary">Notification</button>
          </div> */}
        </header>

        {/* Student Info Card */}
        <div className="student-info-card">

          <div className="info-details">
            <p>
              <strong>Student Name:</strong>{" "}
              {student?.firstName} {student?.middleName} {student?.lastName}
            </p>
            <span className="divider">|</span>
            <p>
              <strong>Student ID:</strong>{" "}
              {student?.studentId}
            </p>
            <span className="divider">|</span>
            <p>
              <strong>Semester:</strong>{" "}
              {marksInfo?.semester}
            </p>
          </div>
        </div>

        <div className="exam-tabs">
          {allMarks.map((mark) => (
            <button
              key={mark._id}
              className={
                selectedExam === mark.examType
                  ? "exam-tab active-tab"
                  : "exam-tab"
              }
              onClick={() =>
                setSelectedExam(mark.examType)
              }
            >
              {mark.examType}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <div className="table-section">
            <div className="card">
              <div className="table-responsive">
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Course Title</th>
                      <th className="text-center">
                        {marksInfo?.examType} Marks (Out of 50)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeData.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <span className="course-icon">📘</span>
                          {item.courseName}
                        </td>

                        <td className="text-center font-bold">
                          {item.marksObtained}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Total Marks Row */}
                  <tfoot>
                    <tr className="total-row">
                      <td>Total Marks Obtained</td>

                      <td className="text-center">
                        <span className="total-badge">
                          {totalMarks} / {maxPossible}
                        </span>

                        <br />

                        <small>
                          Grade: {marksInfo?.grade}
                          {" | "}
                          Percentage: {marksInfo?.percentage}%
                          {" | "}
                          Status: {marksInfo?.status}
                        </small>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* GPA Summary Card */}
          <aside className="summary-section">
            <div className="card gpa-card">
              <h3>Academic Standings</h3>
              <div className="gpa-item">
                <div className="gpa-label">
                  <span>Current Semester GPA:</span>
                  <strong>{currentGPA}</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{
                    width: `${(currentGPA / 4) * 100}%`
                  }}></div>
                </div>  
              </div>

              <div className="gpa-item">
                <div className="gpa-label">
                  <span>Cumulative GPA:</span>
                  <strong>{cumulativeGPA}</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{
                    width: `${(cumulativeGPA / 4) * 100}%`
                  }}></div>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleDownloadReport}
                >
                  Download Report
                </button>
                {/* <button className="btn btn-outline">Contact Advisor</button> */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Grades;