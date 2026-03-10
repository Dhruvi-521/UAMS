import { useState } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  Layers,
} from "lucide-react";
import "./Mentoring.css";

/* ─────────────────────────────────────────────────────
   Static sample data for the bookings table
───────────────────────────────────────────────────── */
const SAMPLE_BOOKINGS = [
  {
    id: 1,
    time: "08:00 AM - 08:30 AM",
    studentName: "John Doe",
    studentId: "2026IT001",
    program: "BCA",
    status: "BOOKED",
  },
  {
    id: 2,
    time: "08:30 AM - 09:00 AM",
    studentName: "Jane Smith",
    studentId: "2026CS005",
    program: "BCA",
    status: "BOOKED",
  },
  {
    id: 3,
    time: "09:30 AM - 10:00 AM",
    studentName: "Alex Jones",
    studentId: "2026IT012",
    program: "BCA",
    status: "BOOKED",
  },
  {
    id: 4,
    time: "10:30 AM - 11:00 AM",
    studentName: "Maria Garcia",
    studentId: "2026BUS303",
    program: "BCA",
    status: "RESCHEDULED",
  },
  {
    id: 5,
    time: "11:30 AM - 12:00 PM",
    studentName: "David Chen",
    studentId: "2026ENG404",
    program: "BCA",
    status: "BOOKED",
  },
];

const PROGRAMS = ["BCA", "MScIT", "MBA", "BBA", "BSc CS"];
const SEMESTERS_CREATE = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
const SEMESTERS_VIEW = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

/* ─────────────────────────────────────────────────────
   Helper: Status Badge
───────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const cls =
    status === "BOOKED"
      ? "badge badge-booked"
      : status === "RESCHEDULED"
      ? "badge badge-rescheduled"
      : "badge badge-cancelled";
  return <span className={cls}>{status}</span>;
}

/* ─────────────────────────────────────────────────────
   Component 1: CreateSlotForm
───────────────────────────────────────────────────── */
function CreateSlotForm({ onSwitchTab }) {
  const [program, setProgram] = useState("BCA");
  const [semester, setSemester] = useState("Sem 2");
  const [date, setDate] = useState("2026-10-26");
  const [slotOpen, setSlotOpen] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:30");
  const [slots, setSlots] = useState([]);

  // NEW: opened/confirmed slots state
  const [openedSlots, setOpenedSlots] = useState([]);
  const [slotOpened, setSlotOpened] = useState(false);

  // Format date for display
  const formatDate = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
  };

  // Convert 24h "HH:MM" → "H:MM AM/PM"
  const to12h = (t) => {
    if (!t) return "";
    const [hh, mm] = t.split(":");
    const h = parseInt(hh);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${mm} ${suffix}`;
  };

  const handleAddSlot = () => {
    if (!date || !startTime || !endTime) return;
    setSlots((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: formatDate(date),
        start: to12h(startTime),
        end: to12h(endTime),
        program,
        semester,
      },
    ]);
  };

  const handleRemoveSlot = (id) =>
    setSlots((prev) => prev.filter((s) => s.id !== id));

  // NEW: Handle Open Slot — finalise all pending slots
  const handleOpenSlot = () => {
    if (slots.length === 0) return;
    setOpenedSlots((prev) => [
      ...prev,
      ...slots.map((s) => ({ ...s, openedAt: new Date().toLocaleTimeString() })),
    ]);
    setSlots([]);
    setSlotOpened(true);
  };

  return (
    <div>
      {/* ── Configure Card ── */}
      <div className="card">
        <div className="card-title">CONFIGURE &amp; DEFINE SLOTS</div>

        {/* Program + Semester */}
        <div className="form-row">
          <div className="form-group">
            <label>Program</label>
            <div className="select-wrap">
              <select
                className="select-field"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                {PROGRAMS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>

          <div className="form-group">
            <label>Semester</label>
            <div className="select-wrap">
              <select
                className="select-field"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {SEMESTERS_CREATE.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Date Picker</label>
          <div className="input-wrap">
            <Calendar className="icon-left" size={16} />
            <input
              type="date"
              className="input-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ paddingLeft: "2.4rem" }}
            />
          </div>
        </div>

        {/* ── Define Individual Slot Time Sub-Card ── */}
        <div className="sub-card" style={{ marginTop: "1.25rem" }}>
          <div
            className="sub-card-header"
            onClick={() => setSlotOpen((v) => !v)}
          >
            <span className="sub-card-title">DEFINE INDIVIDUAL SLOT TIME</span>
            <button
              className={`chevron-btn ${slotOpen ? "open" : ""}`}
              aria-label="Toggle slot time section"
            >
              {slotOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {slotOpen && (
            <div className="sub-card-body">
              {/* Read-only date display */}
              <div className="date-display">
                <Calendar size={16} color="#2563eb" />
                <span>{date ? `[${formatDate(date)}]` : "No date selected"}</span>
              </div>

              {/* Start / End Time */}
              <div className="time-row">
                <div className="time-group">
                  <label>Set Start Time</label>
                  <div className="input-wrap">
                    <Clock className="icon-left" size={16} />
                    <input
                      type="time"
                      className="input-full"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      style={{ paddingLeft: "2.4rem" }}
                    />
                  </div>
                </div>

                <div className="time-group">
                  <label>Set End Time</label>
                  <div className="input-wrap">
                    <Clock className="icon-left" size={16} />
                    <input
                      type="time"
                      className="input-full"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      style={{ paddingLeft: "2.4rem" }}
                    />
                  </div>
                </div>
              </div>

              {/* Add Slot Button */}
              <button className="btn-primary" onClick={handleAddSlot}>
                ADD SLOT TO DAILY LIST
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Daily Slots Preview ── */}
      {slots.length > 0 && (
        <div className="card">
          <div className="card-title">DAILY SLOT LIST</div>
          <div className="table-scroll">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TIME</th>
                  <th>PROGRAM</th>
                  <th>SEMESTER</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id}>
                    <td>{slot.date}</td>
                    <td>
                      {slot.start} – {slot.end}
                    </td>
                    <td>{slot.program}</td>
                    <td>{slot.semester}</td>
                    <td>
                      <button
                        className="icon-btn"
                        onClick={() => handleRemoveSlot(slot.id)}
                        title="Remove slot"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── OPEN SLOT — Final Confirm Button ── */}
          <button className="btn-open-slot" onClick={handleOpenSlot}>
            <CheckCircle size={18} />
            OPEN SLOT
          </button>
        </div>
      )}

      {/* ── Opened Slots Summary Panel ── */}
      {openedSlots.length > 0 && (
        <div className="card opened-slots-card">
          <div className="opened-slots-header">
            <div className="opened-slots-title-row">
              <Layers size={20} color="#1e3a8a" />
              <span className="card-title" style={{ marginBottom: 0 }}>
                OPENED SLOTS SUMMARY
              </span>
            </div>
            <div className="slot-count-badge">
              {openedSlots.length} Slot{openedSlots.length !== 1 ? "s" : ""} Open
            </div>
          </div>

          <div className="slot-pills-grid">
            {openedSlots.map((slot, idx) => (
              <div className="slot-pill" key={slot.id}>
                <div className="slot-pill-number">#{idx + 1}</div>
                <div className="slot-pill-body">
                  <div className="slot-pill-time">
                    <Clock size={13} color="#2563eb" />
                    {slot.start} – {slot.end}
                  </div>
                  <div className="slot-pill-meta">
                    {slot.date} &nbsp;·&nbsp; {slot.program} &nbsp;·&nbsp; {slot.semester}
                  </div>
                </div>
                <span className="slot-pill-status">OPEN</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Component 2: ViewBookingsTable
───────────────────────────────────────────────────── */
function ViewBookingsTable() {
  const [program, setProgram] = useState("BCA");
  const [semester, setSemester] = useState("Semester 1");
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS);

  const handleRemove = (id) =>
    setBookings((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="view-bookings-page">
      <div className="card">
        <div className="page-title">
          Mentoring Slot Booking System – View Booked Slots
        </div>

        {/* Filters */}
        <div className="filters-row">
          <div className="filter-group">
            <label>Program</label>
            <div className="select-wrap">
              <select
                className="select-field"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                {PROGRAMS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>

          <div className="filter-group">
            <label>Semester</label>
            <div className="select-wrap">
              <select
                className="select-field"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {SEMESTERS_VIEW.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>

          <div className="date-badge">
            OCT 26, 2026&nbsp;&nbsp;
            <Calendar size={18} color="#2563eb" />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="table-card">
          <div className="table-card-title">Booked Mentoring Slots</div>
          <div className="table-scroll">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Program</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}
                    >
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id}>
                      <td style={{ whiteSpace: "nowrap" }}>{b.time}</td>
                      <td>{b.studentName}</td>
                      <td>{b.studentId}</td>
                      <td>{b.program}</td>
                      <td>
                        <StatusBadge status={b.status} />
                      </td>
                      <td>
                        <div className="action-cell">
                          <button
                            className="icon-btn"
                            title="Cancel booking"
                            onClick={() => handleRemove(b.id)}
                          >
                            <X size={15} />
                          </button>
                          <button
                            className="icon-btn"
                            title="Delete record"
                            onClick={() => handleRemove(b.id)}
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Root App — wires the two components with tab nav
───────────────────────────────────────────────────── */
export default function Mentoring() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="app-shell">
      {/* Tab Navigation */}
      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === "create" ? "active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create Slot (form)
        </button>
        <button
          className={`tab-btn ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View Bookings
        </button>
      </div>

      {/* Render active panel */}
      {activeTab === "create" ? (
        <CreateSlotForm onSwitchTab={() => setActiveTab("view")} />
      ) : (
        <ViewBookingsTable />
      )}
    </div>
  );
}
