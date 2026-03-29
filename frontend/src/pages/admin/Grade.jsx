import React, { useState } from 'react';
import AddMarks from './AddMarks';
import UpdateMarks from './UpdateMarks';
import './Grade.css';

const Grade = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="grade-container">
      <header className="grade-header">
        <h1>Grade Management</h1>
        <p>Add and update student marks</p>
      </header>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Marks
        </button>
        <button 
          className={`tab-btn ${activeTab === 'update' ? 'active' : ''}`}
          onClick={() => setActiveTab('update')}
        >
          Update Marks
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'add' ? <AddMarks /> : <UpdateMarks />}
      </div>
    </div>
  );
};

export default Grade;