import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './AddMarks.css';

const AddMarks = () => {
  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [selection, setSelection] = useState({ dept: '', sem: '', exam: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        // Read the file (works for .xlsx and .csv)
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setFileData(parsedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handlePreview = () => {
    if (selection.dept && selection.sem && selection.exam && fileData.length > 0) {
      setIsPreview(true);
    } else {
      alert("Please select Department, Semester, Exam Type, and upload the file.");
    }
  };

  const handleConfirm = () => {
    alert(`Success! ${fileData.length} student records have been uploaded to ${selection.dept} Semester ${selection.sem}.`);
    setIsPreview(false);
    setFileName("");
    setFileData([]);
  };

  return (
    <div className="card add-marks-card">
      {/* Dropdown Selectors */}
      <div className="selection-row">
        <div className="select-group">
          <label>Department</label>
          <select value={selection.dept} onChange={(e) => setSelection({...selection, dept: e.target.value})}>
            <option value="">Select Dept</option>
            <option value="BCA">BCA</option>
            <option value="MScIT">MScIT</option>
            <option value="BBA">BBA</option>
          </select>
        </div>
        <div className="select-group">
          <label>Semester</label>
          <select value={selection.sem} onChange={(e) => setSelection({...selection, sem: e.target.value})}>
            <option value="">Select Sem</option>
            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="select-group">
          <label>Exam Type</label>
          <select value={selection.exam} onChange={(e) => setSelection({...selection, exam: e.target.value})}>
            <option value="">Select Exam</option>
            <option value="Mid Sem">Mid Sem</option>
            <option value="Final">Final</option>
            <option value="Unit Test">Unit Test</option>
          </select>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="upload-section">
        <div className={`drop-zone ${fileName ? 'active-file' : ''}`}>
          <div className="upload-icon">📄</div>
          <p>{fileName ? `File Ready: ${fileName}` : "Drag & drop your Marks.xlsx here or"}</p>
          <input type="file" id="fileInput" hidden accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
          <label htmlFor="fileInput" className="btn-upload-label">
            {fileName ? "Change File" : "Upload Excel File"}
          </label>
        </div>
        <button className="btn-primary-preview" onClick={handlePreview}>
          Upload & Preview
        </button>
      </div>

      {/* Table Preview Section */}
      {isPreview && (
        <div className="preview-container animate-fade-in">
          <div className="table-header-info">
            <span>Showing {fileData.length} Students</span>
            <span className="file-tag">Excel Preview</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Sub 1</th>
                  <th>Sub 2</th>
                  <th>Sub 3</th>
                  <th>Total</th>
                  <th>%</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fileData.map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row["Student ID"]}</strong></td>
                    <td>{row["Student Name"]}</td>
                    <td>{row["Subject 1"]}</td>
                    <td>{row["Subject 2"]}</td>
                    <td>{row["Subject 3"]}</td>
                    <td>{row["Total"]}</td>
                    <td>{row["Percentage"]}</td>
                    <td><span className="grade-txt">{row["Grade"]}</span></td>
                    <td>
                      <span className={`badge ${row["Status"]?.toLowerCase()}`}>
                        {row["Status"]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="action-footer">
            <button className="btn-confirm" onClick={handleConfirm}>Confirm Upload</button>
            <button className="btn-cancel" onClick={() => setIsPreview(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMarks;