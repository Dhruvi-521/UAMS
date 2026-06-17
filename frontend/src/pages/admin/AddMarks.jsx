import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './AddMarks.css';

const AddMarks = () => {
  const [fileData, setFileData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [selection, setSelection] = useState({ dept: '', sem: '', exam: '' });
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/programs"
        );

        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

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

  const handleConfirm = async () => {
    try {

      const response = await axios.post(
        "http://localhost:5000/api/marks/upload",
        {
          programId: selection.dept,
          semester: Number(selection.sem),
          examType: selection.exam,
          excelData: fileData,
        }
      );

      alert("Marks Uploaded Successfully");

      setIsPreview(false);
      setFileName("");
      setFileData([]);

      setSelection({
        dept: "",
        sem: "",
        exam: "",
      });

    } catch (error) {

      console.error("Upload Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to upload marks"
      );
    }
  };

  return (
    <div className="card add-marks-card">
      {/* Dropdown Selectors */}
      <div className="selection-row">
        <div className="select-group">
          <label>Program</label>
          <select
            value={selection.dept}
            onChange={(e) =>
              setSelection({
                ...selection,
                dept: e.target.value,
              })
            }
          >
            <option value="">Select Program</option>

            {programs.map((program) => (
              <option
                key={program._id}
                value={program._id}
              >
                {program.programName}
              </option>
            ))}
          </select>
        </div>
        <div className="select-group">
          <label>Semester</label>
          <select value={selection.sem} onChange={(e) => setSelection({ ...selection, sem: e.target.value })}>
            <option value="">Select Sem</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="select-group">
          <label>Exam Type</label>
          <select value={selection.exam} onChange={(e) => setSelection({ ...selection, exam: e.target.value })}>
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

                  {fileData.length > 0 &&
                    Object.keys(fileData[0])
                      .filter(
                        key =>
                          ![
                            "studentID",
                            "Total",
                            "Percentage",
                            "Grade",
                            "Status"
                          ].includes(key)
                      )
                      .map((subject, index) => (
                        <th key={index}>{subject}</th>
                      ))}

                  <th>Total</th>
                  <th>%</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fileData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{row.studentID}</strong>
                    </td>

                    {Object.keys(row)
                      .filter(
                        key =>
                          ![
                            "studentID",
                            "Total",
                            "Percentage",
                            "Grade",
                            "Status"
                          ].includes(key)
                      )
                      .map((subject, i) => (
                        <td key={i}>{row[subject]}</td>
                      ))}

                    <td>{row.Total}</td>
                    <td>{row.Percentage}</td>
                    <td>{row.Grade}</td>
                    <td>
                      <span className={`badge ${row.Status?.toLowerCase()}`}>
                        {row.Status}
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