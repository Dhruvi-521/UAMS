import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FacultySidebar from "../components/FacultySidebar";
import { useAuth } from "../context/AuthContext";

const FacultyLayout = () => {
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
        <FacultySidebar />
        <main style={{ flex: 1, overflow: "auto", padding: "1rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
