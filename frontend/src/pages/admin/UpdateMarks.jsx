import React, { useState } from 'react';
import './UpdateMarks.css';

const UpdateMarks = () => {
  const [students, setStudents] = useState([
    { id: '101', name: 'Rahul Sharma', s1: 78, s2: 85, s3: 92, editing: false },
    { id: '102', name: 'Ananya Singh', s1: 65, s2: 74, s3: 80, editing: false },
  ]);

  const calculateResults = (s1, s2, s3) => {
    const total = Number(s1) + Number(s2) + Number(s3);
    const per = (total / 3).toFixed(1);
    let grade = 'F';
    if (per >= 90) grade = 'A+';
    else if (per >= 80) grade = 'A';
    else if (per >= 70) grade = 'B';
    const status = per >= 40 ? 'Pass' : 'Fail';
    return { total, per, grade, status };
  };

  const handleEdit = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, editing: true } : s));
  };

  const handleSave = (id, newS1, newS2, newS3) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, s1: newS1, s2: newS2, s3: newS3, editing: false } : s
    ));
  };

  return (
    <div className="update-marks-container">
      <div className="card selection-row">
        <select><option>BCA</option></select>
        <select><option>Semester 4</option></select>
        <select><option>Mid Sem</option></select>
      </div>

      <div className="card table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>S1</th><th>S2</th><th>S3</th><th>Total</th><th>%</th><th>Grade</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const res = calculateResults(s.s1, s.s2, s.s3);
                return (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    {s.editing ? (
                      <>
                        <td><input type="number" defaultValue={s.s1} id={`s1-${s.id}`} /></td>
                        <td><input type="number" defaultValue={s.s2} id={`s2-${s.id}`} /></td>
                        <td><input type="number" defaultValue={s.s3} id={`s3-${s.id}`} /></td>
                      </>
                    ) : (
                      <><td>{s.s1}</td><td>{s.s2}</td><td>{s.s3}</td></>
                    )}
                    <td>{res.total}</td><td>{res.per}%</td><td>{res.grade}</td>
                    <td><span className={`badge ${res.status.toLowerCase()}`}>{res.status}</span></td>
                    <td>
                      {s.editing ? (
                        <button className="btn-save" onClick={() => handleSave(
                          s.id, 
                          document.getElementById(`s1-${s.id}`).value,
                          document.getElementById(`s2-${s.id}`).value,
                          document.getElementById(`s3-${s.id}`).value
                        )}>Save</button>
                      ) : (
                        <button className="btn-edit" onClick={() => handleEdit(s.id)}>Edit</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card"><span>Total Students</span><strong>120</strong></div>
        <div className="summary-card"><span>Avg %</span><strong className="text-blue">76.5%</strong></div>
        <div className="summary-card"><span>Pass %</span><strong className="text-green">85%</strong></div>
        <div className="summary-card"><span>Fail %</span><strong className="text-red">15%</strong></div>
      </div>
    </div>
  );
};

export default UpdateMarks;