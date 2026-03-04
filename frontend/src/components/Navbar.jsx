// src/components/Navbar.jsx
import skipsLogo from '../assets/common/Skips-logo.png';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src={skipsLogo} alt="SKIPS Logo" className="nav-logo" />
        <h1 className="university-name">SKIPS UNIVERSITY</h1>
      </div>
      <div className="nav-user">
        <div className="user-profile">
          {/* <span className="user-name">Admin</span> */}
          <div className="avatar">👤</div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
