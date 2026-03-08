import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login.jsx";

/* All Layouts*/
import AdminLayout from "../layouts/AdminLayout.jsx";
import FacultyLayout from "../layouts/FacultyLayout.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";

/*Admin Pages*/
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import Leaves from "../pages/admin/Leaves.jsx";
import ManageCourses from "../pages/admin/ManageCourses.jsx";
import ManageFaculty from "../pages/admin/ManageFaculty.jsx";
import ManageStudents from "../pages/admin/ManageStudent.jsx";
import Payroll from "../pages/admin/Payroll.jsx";
import Reports from "../pages/admin/Reports.jsx";
import ReportsAnalysis from "../pages/admin/ReportsAnalysis.jsx";
import Setting from "../pages/admin/Setting.jsx";
 
/* Faculty Pages*/
import FacultyCourses from "../pages/faculty/Courses.jsx";
import FacultyDashboard from "../pages/faculty/FacultyDashboard.jsx";
import LeavePayroll from '../pages/faculty/LeavePayroll.jsx';
import Mentoring from '../pages/faculty/Mentoring.jsx';
import FacultyReports from '../pages/faculty/Reports.jsx';
import FacultySettings from '../pages/faculty/Settings.jsx';
import Students from "../pages/faculty/Students.jsx";

/* Student Pages*/
import StudentGrades from '../pages/student/Grades.jsx';
import StudentHelp from '../pages/student/Help.jsx';
import Materials from '../pages/student/Materials.jsx';
import MaterialDetails from '../pages/student/MaterialDetails.jsx';
import StudentMentoring from '../pages/student/Mentoring.jsx';
import StudentDashboard from '../pages/student/StudentDashboard.jsx';

const Placeholder = ({ title }) => (
  <div style={{ padding: "2rem" }}>
    <h2>{title}</h2>
    <p>This page is under construction.</p>
  </div>
);

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to="/login" replace />;
  return children;
};

const InnerRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="students"  element={<ManageStudents />} />
      <Route path="faculty"   element={<ManageFaculty />} />
      <Route path="courses"   element={<ManageCourses />} />
      <Route path="payroll"   element={<Payroll title="Payroll" />} />
      <Route path="leaves"    element={<Leaves title="Leave" />} />
      <Route path="reports" element={<ReportsAnalysis />} />
      <Route path="reports/:reportId" element={<Reports />} />
      <Route path="settings"  element={<Setting title="Settings" />} />
    </Route>

    <Route path="/faculty" element={<ProtectedRoute allowedRole="faculty"><FacultyLayout /></ProtectedRoute>}>
      <Route path="dashboard"     element={<FacultyDashboard title="Faculty Dashboard" />} />
      <Route path="students"      element={<Students title="Students" />} />
      <Route path="courses"       element={<FacultyCourses  title="Courses" />} />
      <Route path="mentoring"     element={<Mentoring title="Mentoring" />} />
      <Route path="leave-payroll" element={<LeavePayroll title="Leave & Payroll" />} />
      <Route path="reports"       element={<FacultyReports title="Reports" />} />
      <Route path="settings"      element={<FacultySettings title="Settings" />} />
    </Route>

    <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<StudentDashboard title="Student Dashboard" />} />
      <Route path="mentoring" element={<StudentMentoring title="Mentoring" />} />
      <Route path="materials" element={<Materials />} />
      <Route path="materials/:materialsId" element={<MaterialDetails />} />
      <Route path="grades"    element={<StudentGrades title="My Grades" />} />
      <Route path="help"      element={<StudentHelp title="Help" />} />
    </Route>
  </Routes>
);

const AppRoutes = () => (
  <AuthProvider>
    <InnerRoutes />
  </AuthProvider>
);

export default AppRoutes;