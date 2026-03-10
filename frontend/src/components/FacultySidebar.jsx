import { MentorIcon, Note03Icon } from 'hugeicons-react';
import { ChartLine, Cog, LayoutDashboard, Menu, X , BookOpenText , ReceiptIndianRupee } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';


const FacultySidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
        
      </button>

      {/* <div className="logo-section">
        {isOpen && <h2 className="logo-text">Welcome Student</h2>}
      </div> */}

      <nav className="menu-links">
        <NavLink to="/faculty/dashboard" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <LayoutDashboard size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Dashboard</span>}
        </NavLink>
        
        <NavLink to="/faculty/students" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <BookOpenText size={24} className="menu-icon"/>
          {isOpen && <span className="link-text">Students</span>}
        </NavLink>

        <NavLink to="/faculty/courses" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <BookOpenText size={24} className="menu-icon"/>
          {isOpen && <span className="link-text">Courses</span>}
        </NavLink>

        <NavLink to="/faculty/mentoring" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <MentorIcon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Mentoring</span>}
        </NavLink>
        
        <NavLink to="/faculty/leave-payroll" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
           {/* <Note03Icon size={24} className="menu-icon"/> */}
          <ReceiptIndianRupee size={24} className="menu-icon"/>
          {isOpen && <span className="link-text">Leave & Payroll</span>}
        </NavLink>

        <NavLink to="/faculty/reports" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <ChartLine size={24} className="menu-icon"/>
          {isOpen && <span className="link-text">Reports</span>}
        </NavLink>

        <NavLink to="/faculty/settings" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <Cog size={24} className="menu-icon"/>
          {isOpen && <span className="link-text">Attendance</span>}
        </NavLink>
      </nav>
    </div>
  );
};

export default FacultySidebar;