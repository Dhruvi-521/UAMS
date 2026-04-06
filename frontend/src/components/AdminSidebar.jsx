import { Note03Icon, StudentsIcon } from 'hugeicons-react';
import { BookOpen, ChartLine, Cog, LayoutDashboard, Menu, ReceiptIndianRupee, UserRound, X , GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}

      </button>

      {/* <div className="logo-section">
        {isOpen && <h2 className="logo-text">Welcome Admin</h2>}
      </div> */}

      <nav className="menu-links">
        <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <LayoutDashboard size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Dashboard</span>}
        </NavLink>

        <NavLink to="/admin/students" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <StudentsIcon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Students</span>}
        </NavLink>

        <NavLink to="/admin/faculty" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <UserRound size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Faculty</span>}
        </NavLink>

        <NavLink to="/admin/courses" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <BookOpen size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Courses</span>}
        </NavLink>

        <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <GraduationCap size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Grade</span>}
        </NavLink>

        {/* <NavLink to="/admin/payroll" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <ReceiptIndianRupee size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Payroll</span>}
        </NavLink> */}

        {/* <NavLink to="/admin/leaves" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <Note03Icon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Leave</span>}
        </NavLink> */}

        <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <ChartLine size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Reports</span>}
        </NavLink>




      </nav>
    </div>
  );
};

export default Sidebar;