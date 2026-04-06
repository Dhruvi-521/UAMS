import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import AddExcelStudent from "./addExcelStudent";
import AddManualStudent from "./addManualStudent";
import "./addStudent.css";

export default function AddStudent({ onBack }) {
    const [activeTab, setActiveTab] = useState("excel");

    return (
        <div className="as-wrapper">
            <div className="as-header">
                <button className="as-back-btn" onClick={onBack}>
                    <ArrowLeft size={16} /> Back
                </button>
                <h1 className="as-title">Add Student</h1>
            </div>

            <div className="as-tabs">
                <button
                    className={`as-tab${activeTab === "excel" ? " active" : ""}`}
                    onClick={() => setActiveTab("excel")}
                >
                    Upload via Excel
                </button>
                <button
                    className={`as-tab${activeTab === "manual" ? " active" : ""}`}
                    onClick={() => setActiveTab("manual")}
                >
                    Add Manually
                </button>
            </div>

            <div className="as-content">
                {activeTab === "excel" ? <AddExcelStudent /> : <AddManualStudent />}
            </div>
        </div>
    );
}