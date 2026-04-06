import { useState } from "react";
import { X } from "lucide-react";
import AddProgram from "./addProgram";
import UpdateProgram from "./updateProgram";
import "./addProgram.css";

const ManageProgramModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="mpm-overlay" onClick={onClose}>
      <div className="mpm-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mpm-header">
          <h2 className="mpm-title">Manage Program</h2>
          <button className="mpm-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="mpm-tabs">
          <button
            className={`mpm-tab ${activeTab === "add" ? "mpm-tab--active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Program
          </button>
          <button
            className={`mpm-tab ${activeTab === "update" ? "mpm-tab--active" : ""}`}
            onClick={() => setActiveTab("update")}
          >
            Update Program
          </button>
        </div>

        {/* Tab Content */}
        <div className="mpm-body">
          {activeTab === "add" ? (
            <AddProgram onClose={onClose} />
          ) : (
            <UpdateProgram onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProgramModal;