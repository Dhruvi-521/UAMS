import { Book03Icon, MentorIcon, NoteIcon } from 'hugeicons-react';
import { BadgeQuestionMark, LayoutDashboard, Menu, X ,  UserStar} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';


const StudentSidebar = () => {
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
        <NavLink to="/student/dashboard" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <LayoutDashboard size={24} className="menu-icon" />

          {isOpen && <span className="link-text">Dashboard</span>}
        </NavLink>

        <NavLink to="/student/mentoring" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <MentorIcon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Mentoring</span>}
        </NavLink>

        <NavLink to="/student/Materials" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <Book03Icon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Materials</span>}
        </NavLink>

        <NavLink to="/student/grades" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <NoteIcon size={24} className="menu-icon" />
          {isOpen && <span className="link-text">My Grades</span>}
        </NavLink>

        <NavLink to="/student/attendance" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
          <UserStar size={24} className="menu-icon" />
          {isOpen && <span className="link-text">Attendance</span>}
        </NavLink>
        

      </nav>
    </div>
  );
};

export default StudentSidebar;