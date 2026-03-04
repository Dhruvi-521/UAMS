import { BookOpen, LayoutDashboard, Menu, UserRound, Users, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { MentorIcon } from 'hugeicons-react';


const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
        
      </button>

      <div className="logo-section">
        {isOpen && <h2 className="logo-text">Welcome Student</h2>}
      </div>

      <nav className="menu-links">
        <NavLink to="/student/dashboard" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <LayoutDashboard size={24} className="menu-icon" />
         
          {isOpen && <span className="link-text">Dashboard</span>}
        </NavLink>
        
        <NavLink to="/student/courses" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <BookOpenText size={24} className="menu-icon"/>
          {isOpen && <span className="link-text">Students</span>}
        </NavLink>

        <NavLink to="/student/mentoring" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <MentorIcon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Mentoring</span>}
        </NavLink>
        
        <NavLink to="/student/mentoring" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <MentorIcon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Mentoring</span>}
        </NavLink>


      </nav>
    </div>
  );
};

export default StudentSidebar;