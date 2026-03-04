import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard.jsx";
import ManageCourses from "../pages/admin/ManageCourses.jsx";
import ManageFaculty from "../pages/admin/ManageFaculty.jsx";
import ManageStudents from "../pages/admin/ManageStudent.jsx";
import Login from "../pages/auth/Login.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<ManageStudents />} />
      <Route path="/admin/faculty" element={<ManageFaculty />} />
      <Route path="/admin/courses" element={<ManageCourses />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default AppRoutes;