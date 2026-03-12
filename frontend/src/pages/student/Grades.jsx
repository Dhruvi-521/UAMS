import React from 'react';
import './Grades.css';

const Grades = () => {
  const gradeData = [
    { id: 1, title: 'Basics of Mathematics', marks: 21, icon: '📖' },
    { id: 2, title: 'Communication Skills – I', marks: 37, icon: '💬' },
    { id: 3, title: 'Fundamentals of Web Programming', marks: 41, icon: '🌐' },
    { id: 4, title: 'Linux Fundamentals', marks: 20, icon: '🐧' },
    { id: 5, title: 'Python Programming', marks: 37, icon: '🐍' },
    { id: 6, title: 'Relational Database Management System', marks: 33, icon: '🗄️' },
    { id: 7, title: 'Statistics for Data Science using Spreadsheets', marks: 36, icon: '📊' },
  ];

  // Calculate Total Marks
  const totalMarks = gradeData.reduce((acc, curr) => acc + curr.marks, 0);
  const maxPossible = gradeData.length * 50;

  return (
    <div className="grades-page">
      <div className="grades-container">
        {/* Page Header */}
        <header className="page-header">
          <div className="header-text">
            <h1>My Grades</h1>
            <p>End Semester Examination Results</p>
          </div>
          {/* <div className="header-actions">
            <button className="btn btn-secondary">Download Report</button>
            <button className="btn btn-secondary">Notification</button>
          </div> */}
        </header>

        {/* Student Info Card */}
        <div className="student-info-card">
          <div className="avatar">
            <img src="https://via.placeholder.com/50" alt="Student Avatar" />
          </div>
          <div className="info-details">
            <p><strong>Student Name:</strong> John Doe</p>
            <span className="divider">|</span>
            <p><strong>Student ID:</strong> SI2345</p>
            <span className="divider">|</span>
            <p><strong>Semester:</strong> 4 (Fall 2023)</p>
          </div>
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
                      <th className="text-center">End Sem Marks (Out of 50)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="course-icon">{item.icon}</span>
                          {item.title}
                        </td>
                        <td className="text-center font-bold">{item.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Total Marks Row */}
                  <tfoot>
                    <tr className="total-row">
                      <td>Total Marks Obtained</td>
                      <td className="text-center">
                        <span className="total-badge">{totalMarks} / {maxPossible}</span>
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
                  <strong>3.65</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="gpa-item">
                <div className="gpa-label">
                  <span>Cumulative GPA:</span>
                  <strong>3.78</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>

              <div className="summary-actions">
                <button className="btn btn-primary">Download Report</button>
                <button className="btn btn-outline">Contact Advisor</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Grades;