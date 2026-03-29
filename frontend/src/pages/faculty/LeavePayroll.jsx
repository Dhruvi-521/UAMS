import React, { useState } from "react";
import "./LeavePayroll.css";

const leaveBalances = [
  { type: "Casual Leave", used: 8, total: 12, icon: "☀️", color: "card-blue" },
  { type: "Sick Leave", used: 5, total: 10, icon: "🏥", color: "card-green" },
  { type: "Earned Leave", used: 12, total: 20, icon: "💼", color: "card-purple" },
];

const leaveHistory = [
  { id: 101, type: "Sick Leave", from: "10 Jan 2024", to: "12 Jan 2024", days: 3, status: "Approved" },
  { id: 102, type: "Casual Leave", from: "20 Feb 2024", to: "21 Feb 2024", days: 2, status: "Pending" },
  { id: 103, type: "Earned Leave", from: "5 Mar 2024", to: "8 Mar 2024", days: 4, status: "Rejected" },
];

const salaryBreakdown = [
  { label: "Basic Salary", amount: 40000, type: "credit" },
  { label: "HRA", amount: 8000, type: "credit" },
  { label: "DA", amount: 4000, type: "credit" },
  { label: "DA (Deduction)", amount: 4000, type: "credit" },
  { label: "PF", amount: 2000, type: "debit" },
  { label: "Tax", amount: 3000, type: "debit" },
  { label: "Leave Deduction", amount: 1000, type: "debit" },
];

const payrollHistory = [
  { month: "March", year: 2024, net: 52000, status: "Paid" },
  { month: "February", year: 2024, net: 50000, status: "Paid" },
  { month: "January", year: 2024, net: 48000, status: "Paid" },
];

const statusClass = (status) => {
  if (status === "Approved") return "badge badge-approved";
  if (status === "Pending") return "badge badge-pending";
  if (status === "Rejected") return "badge badge-rejected";
  return "badge";
};

export default function LeavePayroll() {
  const [activeTab, setActiveTab] = useState("leave");
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleFormChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Leave application submitted!");
    setLeaveForm({ leaveType: "", fromDate: "", toDate: "", reason: "" });
  };

  return (
    <div className="leave-payroll-root">
      <div className="dashboard-wrapper">

        {/* Tab Navigation */}
        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "leave" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("leave")}
          >
            Leave Management
          </button>
          <button
            className={`tab-btn ${activeTab === "payroll" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("payroll")}
          >
            Payroll
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">

          {/* ── LEAVE TAB ── */}
          {activeTab === "leave" && (
            <div className="tab-panel fade-in">

              {/* Leave Balance Cards */}
              <section className="section">
                <h2 className="section-title">Leave Balance</h2>
                <div className="leave-cards-grid">
                  {leaveBalances.map((leave) => (
                    <div key={leave.type} className={`leave-card ${leave.color}`}>
                      <div className="leave-card-top">
                        {/* <span className="leave-icon">{leave.icon}</span> */}
                        <span className="leave-type">{leave.type}</span>
                      </div>
                      <div className="leave-count">
                        {leave.used}
                        <span className="leave-total"> / {leave.total}</span>
                      </div>
                      <div className="leave-bar">
                        <div
                          className="leave-bar-fill"
                          style={{ width: `${(leave.used / leave.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Apply for Leave */}
              <section className="section">
                <h2 className="section-title">Apply for Leave</h2>
                <div className="form-card">
                  <form className="leave-form" onSubmit={handleSubmit}>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="leaveType">Leave Type</label>
                        <select
                          id="leaveType"
                          name="leaveType"
                          value={leaveForm.leaveType}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Select Leave Type</option>
                          <option value="casual">Casual Leave</option>
                          <option value="sick">Sick Leave</option>
                          <option value="earned">Earned Leave</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row two-col">
                      <div className="form-group">
                        <label htmlFor="fromDate">From Date</label>
                        <input
                          type="date"
                          id="fromDate"
                          name="fromDate"
                          value={leaveForm.fromDate}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="toDate">To Date</label>
                        <input
                          type="date"
                          id="toDate"
                          name="toDate"
                          value={leaveForm.toDate}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="reason">Reason</label>
                        <textarea
                          id="reason"
                          name="reason"
                          rows={3}
                          placeholder="Briefly describe the reason..."
                          value={leaveForm.reason}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        Submit Application
                      </button>
                    </div>

                  </form>
                </div>
              </section>

              {/* Leave History */}
              <section className="section">
                <h2 className="section-title">Leave History</h2>
                <div className="table-card">
                  <div className="table-scroll">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Leave ID</th>
                          <th>Type</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>Days</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveHistory.map((row) => (
                          <tr key={row.id}>
                            <td className="row-id">#{row.id}</td>
                            <td><strong>{row.type}</strong></td>
                            <td>{row.from}</td>
                            <td>{row.to}</td>
                            <td>{row.days}</td>
                            <td>
                              <span className={statusClass(row.status)}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* ── PAYROLL TAB ── */}
          {activeTab === "payroll" && (
            <div className="tab-panel fade-in">

              {/* Salary Summary + Breakdown */}
              <section className="section">
                <h2 className="section-title">Salary Breakdown</h2>
                <div className="payroll-top-grid">

                  {/* Summary Card */}
                  <div className="salary-summary-card">
                    <p className="summary-label">Salary Summary</p>
                    <p className="summary-amount">₹52,000</p>
                    <p className="summary-sub">Net take-home for March 2024</p>
                  </div>

                  {/* Breakdown Grid */}
                  <div className="breakdown-grid">
                    {salaryBreakdown.map((item) => (
                      <div key={item.label} className="breakdown-item">
                        <span className="breakdown-label">{item.label}</span>
                        <span className={`breakdown-value ${item.type}`}>
                          {item.type === "debit" ? "−" : "+"}₹{item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* Payroll History */}
              <section className="section">
                <h2 className="section-title">Payroll History</h2>
                <div className="table-card">
                  <div className="table-scroll">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Year</th>
                          <th>Net Salary</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payrollHistory.map((row) => (
                          <tr key={`${row.month}-${row.year}`}>
                            <td>{row.month}</td>
                            <td>{row.year}</td>
                            <td className="salary-cell">
                              ₹{row.net.toLocaleString()}
                            </td>
                            <td>
                              <span className="badge badge-approved">
                                {row.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn-download">
                                ⬇ Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}