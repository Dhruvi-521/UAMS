import { useState, useRef, useEffect } from "react";
import { Upload, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import "./addExcelStudent.css";
import axios from 'axios';
import * as XLSX from "xlsx"; // ✅ NEW

const PROGRAMS = ["Computer Science (B.Sc.)", "Mathematics (B.Sc.)", "Physics (B.Sc.)", "Engineering (B.Tech.)"];
const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

const initialForm = {
    program: ""
};

export default function AddExcelStudent() {
    const [program, setProgram] = useState([]);
    const [form, setForm] = useState(initialForm);

    const [semester, setSemester] = useState(SEMESTERS[0]);
    const [batch, setBatch] = useState("2025-27");
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState("");

    const [students, setStudents] = useState([]);
    const [studentsRaw, setStudentsRaw] = useState([]); // ✅ FULL DATA

    const [page, setPage] = useState(1);
    const fileRef = useRef();
    const totalPages = 2;

    useEffect(() => {
        axios.get("http://localhost:5000/api/programs")
            .then(res => setProgram(res.data))
            .catch(err => console.log(err));

        axios.get("http://localhost:5000/api/students")
            .then(res => {
                const formatted = res.data.map((s) => ({
                    name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
                    gender: s.gender || "",
                    universityEmail: s.universityEmail || "",
                    personalEmail: s.personalEmail || "",
                    program: s.program?.programName || "",
                    semester: s.semester || "",
                    batch: s.batch || "",
                    division: s.division || ""
                }));

                setStudents(formatted);
            })
            .catch(err => console.log(err));
    }, []);

    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setFileName(file.name);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    };

    const deleteStudent = (idx) =>
        setStudents(prev => prev.filter((_, i) => i !== idx));

    // ============================
    // ✅ PREVIEW EXCEL (NEW)
    // ============================
    const handlePreview = () => {
        const file = fileRef.current.files[0];

        if (!file) {
            alert("Please select file");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet);

            const formatted = rows.map((row) => ({
                name: `${row.firstName || ""} ${row.lastName || ""}`.trim(),
                gender: row.gender || "",
                personalEmail:
                    row.personalEmail ||
                    row["Personal Email"] ||
                    row.personal_email ||
                    "",
                universityEmail:
                    row.universityEmail ||
                    row["University Email"] ||
                    "",
                mobile: row.mobile || "",
                program: program.find(p => p._id === form.program)?.programName || "",
                semester: semester,
                batch: batch,
                division: row.division || ""
            }));

            setStudents(formatted); // 🔥 SHOW IN TABLE
        };

        reader.readAsArrayBuffer(file);
    };

    // ============================
    // ✅ UPLOAD TO BACKEND
    // ============================
    const handleUpload = async () => {
        if (!fileRef.current.files[0]) {
            alert("Please select file");
            return;
        }

        if (!form.program || !semester || !batch) {
            alert("Please select Program, Semester and Batch");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", fileRef.current.files[0]);
            formData.append("program", form.program);
            formData.append("semester", semester);
            formData.append("batch", batch);

            const res = await axios.post(
                "http://localhost:5000/api/students/upload-excel",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.data.success) {
                alert(`Uploaded ${res.data.count} students successfully`);

                const updated = await axios.get("http://localhost:5000/api/students");

                 setStudentsRaw(updated.data); // ✅ IMPORTANT
                 
                const formatted = updated.data.map((s) => ({
                    name: `${s.firstName || ""} ${s.lastName || ""}`.trim(),
                    gender: s.gender || "",
                    universityEmail: s.universityEmail || "",
                    personalEmail: s.personalEmail || "",
                    mobile: s.mobile || "",
                    program: s.program?.programName || "",
                    semester: s.semester || "",
                    batch: s.batch || "",
                    division: s.division || ""
                }));

                setStudents(formatted);

                fileRef.current.value = "";
                setFileName("");
            }

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <div className="aes-card">

            <div className="aes-filters">
                <div className="aes-field">
                    <label className="aes-label">Select Program</label>
                    <select
                        className="aes-select"
                        value={form.program}
                        onChange={set("program")}>

                        <option value="">-- Select Program --</option>
                        {program.map((prog) => (
                            <option key={prog._id} value={prog._id}>
                                {prog.programName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="aes-field">
                    <label className="aes-label">Select Semester</label>
                    <input className="aes-input" type="text" onChange={e => setSemester(e.target.value)} placeholder="Eg: 1" />
                </div>

                <div className="aes-field">
                    <label className="aes-label">Batch</label>
                    <input className="aes-input" type="text" onChange={e => setBatch(e.target.value)} placeholder="Eg: 2025-26" />
                </div>
            </div>

            <div className="aes-upload-section">
                <label className="aes-upload-label">Upload Excel File</label>
                <div
                    className={`aes-dropzone${dragging ? " dragging" : ""}${fileName ? " has-file" : ""}`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current.click()}
                >
                    <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: "none" }} onChange={handleFileChange} />
                    <Upload size={28} />
                    {fileName ? <p>{fileName}</p> : <p>Upload Excel</p>}
                </div>
            </div>

            <div className="aes-table-wrap">
                <table className="aes-table">
                    <thead>
                        <tr>
                            <th>Name</th><th>Gender</th><th>Email</th>
                            <th>Mobile</th><th>Program</th><th>Semester</th>
                            <th>Batch</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, i) => (
                            <tr key={i}>
                                <td>{s.name}</td>
                                <td>{s.gender}</td>
                                <td>{s.email}</td>
                                <td>{s.mobile}</td>
                                <td>{s.program}</td>
                                <td>{s.semester}</td>
                                <td>{s.batch}</td>
                                <td>
                                    <button onClick={() => deleteStudent(i)}>
                                        <Trash2 size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ ONLY CHANGE: Added Upload File button */}
            <div className="aes-footer">
                <button className="aes-submit-btn" onClick={handlePreview}>
                    Upload File
                </button>

                <button className="aes-submit-btn" onClick={handleUpload}>
                    Add All Students
                </button>
            </div>
        </div>
    );
}