import { useState } from "react";
import { X } from "lucide-react";
import AddDepartment from "./AddDepartment";
import UpdateDepartment from "./UpdateDepartment";
import "./AddDepartment.css";

const ManageDepartmentModel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Manage Department</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === "add" ? "modal-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Department
          </button>
          <button
            className={`modal-tab-btn ${activeTab === "update" ? "modal-tab-btn--active" : ""}`}
            onClick={() => setActiveTab("update")}
          >
            Update Department
          </button>
        </div>

        <div className="modal-body">
          {activeTab === "add" ? <AddDepartment /> : <UpdateDepartment />}
        </div>
      </div>
    </div>
  );
};

export default ManageDepartmentModel;