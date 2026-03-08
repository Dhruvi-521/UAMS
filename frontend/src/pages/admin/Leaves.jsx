import {
  AlertTriangle,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Plane,
  Search,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import "./Leaves.css";

// ─── Sample Data ───────────────────────────────────────────────
const initialData = [
  { id: 120, name: "John Doe", empId: "UAMS0123", type: "Sick",     dates: "Oct 12-14", duration: "3 Days", status: "Pending"  },
  { id: 192, name: "John Doe", empId: "UAMS0Y23", type: "Vacation", dates: "Oct 12-14", duration: "3 Days", status: "Approved" },
  { id: 132, name: "John Doe", empId: "UAMS0123", type: "Vacation", dates: "Oct 12-14", duration: "3 Days", status: "Approved" },
  { id: 174, name: "John Doe", empId: "UAMS0123", type: "Casual",   dates: "Oct 12-14", duration: "3 Days", status: "Rejected" },
  { id: 167, name: "John Doe", empId: "UAMS0123", type: "Casual",   dates: "Oct 12-14", duration: "3 Days", status: "Rejected" },
  { id: 198, name: "John Doe", empId: "UAMS0123", type: "Casual",   dates: "Oct 12-14", duration: "3 Days", status: "Pending"  },
];

// ─── Avatar Component ──────────────────────────────────────────
const Avatar = ({ name }) => {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div className="leave-avatar">
      <span className="leave-avatar-initials">{initials}</span>
    </div>
  );
};

// ─── Status Badge Component ────────────────────────────────────
const StatusBadge = ({ status }) => {
  const classMap = {
    Pending:  "badge badge-pending",
    Approved: "badge badge-approved",
    Rejected: "badge badge-rejected",
  };
  return <span className={classMap[status] || "badge"}>{status}</span>;
};

// ─── Main Component ────────────────────────────────────────────
const Leaves = () => {
  const [data, setData]           = useState(initialData);
  const [search, setSearch]       = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [employee, setEmployee]   = useState("");
  const [tooltip, setTooltip]     = useState({ id: null, action: null });

  const handleAction = (id, action) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: action === "approve" ? "Approved" : "Rejected" }
          : item
      )
    );
  };

  const pending  = data.filter((d) => d.status === "Pending").length;
  const approved = data.filter((d) => d.status === "Approved").length;
  const rejected = data.filter((d) => d.status === "Rejected").length;

  const filtered = data.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      String(item.id).includes(search) ||
      item.empId.toLowerCase().includes(search.toLowerCase());
    const matchType = leaveType ? item.type === leaveType : true;
    const matchEmp  = employee  ? item.name === employee  : true;
    return matchSearch && matchType && matchEmp;
  });

  return (
    <div className="lm-page">

      {/* ── Header ── */}
      <header className="lm-header">
        <h1 className="lm-title">LEAVE MANAGEMENT</h1>
        {/* <div className="lm-credits">
          <small>Credits</small>
          <div className="lm-credits-inner">
            Lucide React <span>⚛</span>
          </div>
        </div> */}
      </header>

      {/* ── Body ── */}
      <div className="lm-body">

        {/* Top Action Buttons */}
        <div className="lm-actions">
          <button className="btn-apply">
            <Plane size={16} /> Apply for Leave
          </button>
          <button className="btn-approve-main">
            <ClipboardCheck size={16} /> Approve Requests
          </button>
        </div>

        {/* Main Card */}
        <div className="lm-card">
          <div className="lm-card-title">Leave Requests Overview</div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-item stat-pending">
              <Clock size={22} color="#d69e2e" />
              <div>
                <div className="stat-number">{String(pending).padStart(3, "0")}</div>
                <div className="stat-label">Pending Requests</div>
              </div>
            </div>
            <div className="stat-item stat-approved">
              <Users size={22} color="#38a169" />
              <div>
                <div className="stat-number">{String(approved).padStart(2, "0")}</div>
                <div className="stat-label">Approved Requests</div>
              </div>
            </div>
            <div className="stat-item stat-rejected">
              <AlertTriangle size={22} color="#e53e3e" />
              <div>
                <div className="stat-number">{String(rejected).padStart(2, "0")}</div>
                <div className="stat-label">Rejected Stats</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filter-row">
            <div className="search-wrap">
              <Search size={15} className="search-icon" />
              <input
                className="search-input"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="select-wrap">
              <select
                className="filter-select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="">Leave Type</option>
                <option value="Sick">Sick</option>
                <option value="Vacation">Vacation</option>
                <option value="Casual">Casual</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
            <div className="select-wrap">
              <select
                className="filter-select"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
              >
                <option value="">Employee</option>
                <option value="John Doe">John Doe</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
          </div>

          {/* Table */}
          <div className="leave-table-wrap">
            <table className="leave-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Employee Name</th>
                  <th>Leave Type</th>
                  <th>Dates</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "#a0aec0", padding: "24px" }}>
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>
                        <div className="emp-cell">
                          <Avatar name={row.name} />
                          <div>
                            <div className="emp-name">{row.name}</div>
                            <div className="emp-id">{row.empId}</div>
                          </div>
                        </div>
                      </td>
                      <td>{row.type}</td>
                      <td>{row.dates}</td>
                      <td>{row.duration}</td>
                      <td><StatusBadge status={row.status} /></td>
                      <td>
                        <div className="action-btns">

                          {/* Reject Button */}
                          <div
                            className="tooltip-wrap"
                            onMouseEnter={() => setTooltip({ id: row.id, action: "reject" })}
                            onMouseLeave={() => setTooltip({ id: null, action: null })}
                          >
                            <button
                              className="action-btn-reject"
                              onClick={() => handleAction(row.id, "reject")}
                            >
                              <X size={12} color="#fff" />
                            </button>
                            {tooltip.id === row.id && tooltip.action === "reject" && (
                              <div className="tooltip-box">Reject Request</div>
                            )}
                          </div>

                          {/* Approve Button */}
                          <div
                            className="tooltip-wrap"
                            onMouseEnter={() => setTooltip({ id: row.id, action: "approve" })}
                            onMouseLeave={() => setTooltip({ id: null, action: null })}
                          >
                            <button
                              className="action-btn-approve-row"
                              onClick={() => handleAction(row.id, "approve")}
                            >
                              {/* <Check size={16} color="#fff" /> */}
                              <Check size={12 }/>
                            </button>
                            {tooltip.id === row.id && tooltip.action === "approve" && (
                              <div className="tooltip-box">Approve Request</div>
                            )}
                          </div>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="lm-footer">
          Built with UAMS Component Library | Featuring{" "}
          <a href="https://lucide.dev" target="_blank" rel="noreferrer">
            Lucide React Icons
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Leaves;