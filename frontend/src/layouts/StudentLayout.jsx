import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudentSidebar from "../components/StudentSidebar";
import { useAuth } from "../context/AuthContext";

const StudentLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar onLogout={handleLogout} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <StudentSidebar />
        <main style={{ flex: 1, overflow: "auto", padding: "1rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
