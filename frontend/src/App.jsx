// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="full-page-wrapper">
        {/* 1. Navbar is on top, spanning 100% width */}
        <Navbar />

        <div className="bottom-section">
          {/* 2. Sidebar is on the left, below the navbar */}
          <Sidebar />

          {/* 3. Page content is on the right of the sidebar */}
          <main className="page-content">
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;