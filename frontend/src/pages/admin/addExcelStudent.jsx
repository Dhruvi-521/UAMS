import { useState, useRef } from "react";
import { Upload, Pencil, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import "./addExcelStudent.css";

const PROGRAMS = ["Computer Science (B.Sc.)", "Mathematics (B.Sc.)", "Physics (B.Sc.)", "Engineering (B.Tech.)"];
const SEMESTERS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

const sampleStudents = [
    { name: "Emily Davis", gender: "Female", email: "emily.d@email.com", mobile: "123-456-7890", program: "Comp Science", semester: "Semester 1", batch: "2025-27" },
    { name: "Michael Brown", gender: "Male", email: "m.brown88@email.com", mobile: "987-654-3210", program: "Comp Science", semester: "Semester 1", batch: "2025-27" },
    { name: "Sophia Green", gender: "Female", email: "sophia.green@email.com", mobile: "555-123-4567", program: "Comp Science", semester: "Semester 1", batch: "2025-27" },
];

export default function AddExcelStudent() {
    const [program, setProgram] = useState(PROGRAMS[0]);
    const [semester, setSemester] = useState(SEMESTERS[0]);
    const [batch, setBatch] = useState("2025-27");
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState("");
    const [students, setStudents] = useState(sampleStudents);
    const [page, setPage] = useState(1);
    const fileRef = useRef();
    const totalPages = 2;

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

    const deleteStudent = (idx) => setStudents(prev => prev.filter((_, i) => i !== idx));

    return (
        <div className="aes-card">
            {/* Filters Row */}
            <div className="aes-filters">
                <div className="aes-field">
                    <label className="aes-label">Select Program</label>
                    <select className="aes-select" value={program} onChange={e => setProgram(e.target.value)}>
                        {PROGRAMS.map(p => <option key={p}>{p}</option>)}
                    </select>
                </div>
                <div className="aes-field">
                    <label className="aes-label">Select Semester</label>
                    <select className="aes-select" value={semester} onChange={e => setSemester(e.target.value)}>
                        {SEMESTERS.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
                <div className="aes-field">
                    <label className="aes-label">Batch Number (e.g., 2025-27)</label>
                    <input className="aes-input" value={batch} onChange={e => setBatch(e.target.value)} placeholder="e.g. 2025-27" />
                </div>
            </div>

            {/* Upload Zone */}
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
                    <Upload size={28} className="aes-upload-icon" />
                    {fileName
                        ? <p className="aes-drop-text"><strong>{fileName}</strong> selected</p>
                        : <p className="aes-drop-text">Drag & Drop Excel File or <span className="aes-browse">Browse</span></p>
                    }
                </div>
            </div>

            {/* Table */}
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
                                    <div className="aes-actions">
                                        <button className="aes-act-btn edit"><Pencil size={14} /></button>
                                        <button className="aes-act-btn del" onClick={() => deleteStudent(i)}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="aes-pagination">
                <span className="aes-page-info">Showing 1-10 of 100 students</span>
                <div className="aes-page-btns">
                    <button className="aes-page-btn" onClick={() => setPage(1)} disabled={page === 1}><ChevronsLeft size={14} /></button>
                    <button className="aes-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={14} /></button>
                    {[1, 2].map(n => (
                        <button key={n} className={`aes-page-btn${page === n ? " active" : ""}`} onClick={() => setPage(n)}>{n}</button>
                    ))}
                    <button className="aes-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight size={14} /></button>
                    <button className="aes-page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}><ChevronsRight size={14} /></button>
                </div>
            </div>

            {/* Footer Button */}
            <div className="aes-footer">
                <button className="aes-submit-btn">Add All Students</button>
            </div>
        </div>
    );
}