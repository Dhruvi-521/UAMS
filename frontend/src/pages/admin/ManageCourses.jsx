import { CalendarDays, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import Departments from "./Departments";
import "./ManageCourses.css";
import Programs from "./Programs";
import Semesters from "./Semesters";
import AddCourse from "./addCourse";
import UpdateCourse from "./updateCourse";

const courseNames = [
  "Web Development", "Database Systems", "Software Engineering",
  "Algorithms", "Operating Systems", "Data Structures",
  "Computer Networks", "Machine Learning",
];

const coursesData = {};
[...Array(6)].forEach((_, si) => {
  coursesData[si + 1] = courseNames.map((name, ci) => ({
    id: ci + 1,
    code: `CSCI${101 + ci}`,
    name,
    credits: [4, 3, 3, 3, 3, 4, 3, 4][ci],
    status: 'Active',
    instructor: name === "Algorithms" ? "Algorithms" : "Professons",
  }));
});

const CoursesPage = ({ department, program, semester, onBack, onAddCourse, onEditCourse }) => {  // ← onEditCourse added
  const [search, setSearch] = useState("");
  const courses = (coursesData[semester.number] || coursesData[1]).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => onBack("departments")}>Departments</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={() => onBack("programs")}>{department.name}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={() => onBack("semesters")}>{program.name}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-active">{semester.name}</span>
      </div>

      <h1 className="page-title">{program.name} - {semester.name} Courses</h1>

      <div className="courses-top-bar">
        <div className="search-wrapper full-width">
          <Search size={16} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search Courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="add-btn timetable-btn">
          <CalendarDays size={18} /> Create Time Table
        </button>
      </div>

      <div className="courses-action-bar">
        <div className="program-badge">
          <span className="program-badge-icon">📘</span>
          {program.name}
        </div>
        <button className="add-btn" onClick={onAddCourse}>
          <Plus size={16} /> Add Course
        </button>
      </div>

      <div className="table-container">
        <div className="table-scroll">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Name</th>
                <th>Credits</th>
                <th>Status</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td className="muted">{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>{course.status}</td>
                  <td>{course.instructor}</td>
                  <td className="action-td">
                    <button className="icon-btn" onClick={() => onEditCourse(course)}>  {/* ← wired */}
                      <Pencil size={16} /> Edit
                    </button>
                    <button className="icon-btn"><Trash2 size={16} /> Delete</button>
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

const ManageCourses = () => {
  const [page, setPage] = useState("departments");
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedProg, setSelectedProg] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  
  const handleSelectDepartment = (dept) => {
    setSelectedDept(dept);
    setPage("programs");
  };

  const handleSelectProgram = (prog) => {
    setSelectedProg(prog);
    setPage("semesters");
  };

  const handleSelectSemester = (sem) => {
    setSelectedSem(sem);
    setPage("courses");
  };

  const handleBack = (target) => {
    setPage(target);
  };

  return (
    <>
      {page === "departments" && (
        <Departments onSelectDepartment={handleSelectDepartment} />
      )}
      {page === "programs" && selectedDept && (
        <Programs
          department={selectedDept}
          onSelectProgram={handleSelectProgram}
          onBack={() => handleBack("departments")}
        />
      )}
      {page === "semesters" && selectedDept && selectedProg && (
        <Semesters
          department={selectedDept}
          program={selectedProg}
          onSelectSemester={handleSelectSemester}
          onBack={() => handleBack("programs")}
          onBackToDepartments={() => handleBack("departments")}
        />
      )}
      {page === "courses" && selectedDept && selectedProg && selectedSem && (
        <CoursesPage
          department={selectedDept}
          program={selectedProg}
          semester={selectedSem}
          onBack={handleBack}
          onAddCourse={() => setShowAddCourse(true)}
          onEditCourse={(course) => setEditCourse(course)} 
        />
      )}

      {showAddCourse && (
        <AddCourse
          onClose={() => setShowAddCourse(false)}
          onSubmit={(data) => console.log("New course:", data)}
        />
      )}

      {editCourse && (
        <UpdateCourse
        course={editCourse}
        onClose={()=>setEditCourse(null)}
        onSubmit={(data)=> console.log("Updated Course: ",data)}
        />
      )

      }
    </>
  );
};

export default ManageCourses;