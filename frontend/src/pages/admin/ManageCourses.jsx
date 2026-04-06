import axios from "axios";
import { CalendarDays, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Departments from "./Departments";
import "./ManageCourses.css";
import Programs from "./Programs";
import Semesters from "./Semesters";
import AddCourse from "./addCourse";
import UpdateCourse from "./updateCourse";

/* ===========================
   ✅ COURSES PAGE (UPDATED)
=========================== */
const CoursesPage = ({ department, program, semester, onBack, onAddCourse, onEditCourse }) => {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (program?._id && semester?.number) {
      fetchCourses();
    }
  }, [program, semester]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/courses/${program._id}/${semester.number}`
      );
      setCourses(res.data);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  const filteredCourses = courses.filter(c =>
    c.courseName?.toLowerCase().includes(search.toLowerCase()) ||
    c.courseId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={() => onBack("departments")}>Departments</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={() => onBack("programs")}>{department.DepartmentName}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-link" onClick={() => onBack("semesters")}>{program.programName}</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-active">Semester {semester.number}</span>
      </div>

      <h1 className="page-title">
        {program.programName} - Semester {semester.number} Courses
      </h1>

      {/* Top Bar */}
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

      {/* Action Bar */}
      <div className="courses-action-bar">
        <div className="program-badge">
          📘 {program.programName}
        </div>

        <button className="add-btn" onClick={onAddCourse}>
          <Plus size={16} /> Add Course
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-scroll">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Name</th>
                <th>Credits</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <tr key={course._id}>
                    <td>{course.courseId}</td>
                    <td>{course.courseName}</td>
                    <td>{course.totalCredits}</td>
                    <td>{course.isActive ? "Active" : "Inactive"}</td>
                    <td className="action-td">
                      <button className="icon-btn" onClick={() => onEditCourse(course)}>
                        <Pencil size={16} /> Edit
                      </button>
                      <button className="icon-btn">
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   ✅ MAIN COMPONENT
=========================== */
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

      {/* ✅ ADD COURSE */}
      {showAddCourse && (
        <AddCourse
          onClose={() => setShowAddCourse(false)}
          semesterData={{
            programId: selectedProg._id,
            programName: selectedProg.programName,
            number: selectedSem.number,
          }}
        />
      )}

      {/* ✅ UPDATE COURSE */}
      {editCourse && (
        <UpdateCourse
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onUpdated={() => {
            setEditCourse(null);
            // 🔥 refresh data without reload
            setPage("courses");
          }}
        />
      )}
    </>
  );
};

export default ManageCourses;