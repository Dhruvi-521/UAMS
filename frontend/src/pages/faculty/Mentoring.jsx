import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  Layers,
  UserCircle2,
  AlertCircle,
} from "lucide-react";
import "./Mentoring.css";

const PROGRAMS = ["BCA", "MScIT", "MBA", "BBA", "BSc CS"];
const SEMESTERS_CREATE = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
const SEMESTERS_VIEW   = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];

// Normalize "Sem 2" → "Semester 2" so filters match stored slots
const normalizeSem = (s) => s.replace(/^Sem\s+/, "Semester ");

const MOCK_STUDENTS = [
  { name: "John Doe",     id: "2026IT001" },
  { name: "Jane Smith",   id: "2026CS005" },
  { name: "Alex Jones",   id: "2026IT012" },
  { name: "Maria Garcia", id: "2026BUS303" },
  { name: "David Chen",   id: "2026ENG404" },
];

function StatusBadge({ status }) {
  const cls =
    status === "BOOKED"      ? "badge badge-booked"
  : status === "RESCHEDULED" ? "badge badge-rescheduled"
  : status === "OPEN"        ? "badge badge-open"
  :                            "badge badge-cancelled";
  return <span className={cls}>{status}</span>;
}

/* ── CreateSlotForm ─────────────────────────────────── */
function CreateSlotForm({ onSlotsOpened }) {
  const [program,     setProgram]     = useState("BCA");
  const [semester,    setSemester]    = useState("Sem 2");
  const [date,        setDate]        = useState("2026-10-26");
  const [slotOpen,    setSlotOpen]    = useState(true);
  const [startTime,   setStartTime]   = useState("09:00");
  const [endTime,     setEndTime]     = useState("09:30");
  const [slots,       setSlots]       = useState([]);
  const [openedSlots, setOpenedSlots] = useState([]);

  const formatDate = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
  };

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
    setSlots(prev => [...prev, {
      id: Date.now(),
      date: formatDate(date),
      start: to12h(startTime),
      end: to12h(endTime),
      program,
      semester: normalizeSem(semester),
    }]);
  };

  const handleRemoveSlot = (id) => setSlots(prev => prev.filter(s => s.id !== id));

  const handleOpenSlot = () => {
    if (slots.length === 0) return;
    const newOpened = slots.map(s => ({ ...s, studentName: null, studentId: null, status: "OPEN" }));
    setOpenedSlots(prev => [...prev, ...newOpened]);
    onSlotsOpened(newOpened);
    setSlots([]);
  };

  return (
    <div>
      <div className="card">
        <div className="card-title">CONFIGURE &amp; DEFINE SLOTS</div>
        <div className="form-row">
          <div className="form-group">
            <label>Program</label>
            <div className="select-wrap">
              <select className="select-field" value={program} onChange={e => setProgram(e.target.value)}>
                {PROGRAMS.map(p => <option key={p}>{p}</option>)}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>
          <div className="form-group">
            <label>Semester</label>
            <div className="select-wrap">
              <select className="select-field" value={semester} onChange={e => setSemester(e.target.value)}>
                {SEMESTERS_CREATE.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Date Picker</label>
          <div className="input-wrap">
            <Calendar className="icon-left" size={16} />
            <input type="date" className="input-full" value={date}
              onChange={e => setDate(e.target.value)} style={{ paddingLeft: "2.4rem" }} />
          </div>
        </div>

        <div className="sub-card" style={{ marginTop: "1.25rem" }}>
          <div className="sub-card-header" onClick={() => setSlotOpen(v => !v)}>
            <span className="sub-card-title">DEFINE INDIVIDUAL SLOT TIME</span>
            <button className={`chevron-btn ${slotOpen ? "open" : ""}`}>
              {slotOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          {slotOpen && (
            <div className="sub-card-body">
              <div className="time-row">
                <div className="time-group">
                  <label>Set Start Time</label>
                  <div className="input-wrap">
                    <Clock className="icon-left" size={16} />
                    <input type="time" className="input-full" value={startTime}
                      onChange={e => setStartTime(e.target.value)} style={{ paddingLeft: "2.4rem" }} />
                  </div>
                </div>
                <div className="time-group">
                  <label>Set End Time</label>
                  <div className="input-wrap">
                    <Clock className="icon-left" size={16} />
                    <input type="time" className="input-full" value={endTime}
                      onChange={e => setEndTime(e.target.value)} style={{ paddingLeft: "2.4rem" }} />
                  </div>
                </div>
              </div>
              <button className="btn-primary" onClick={handleAddSlot}>ADD SLOT TO DAILY LIST</button>
            </div>
          )}
        </div>
      </div>

      {slots.length > 0 && (
        <div className="card">
          <div className="card-title">DAILY SLOT LIST</div>
          <div className="table-scroll">
            <table className="bookings-table">
              <thead>
                <tr><th>DATE</th><th>TIME</th><th>PROGRAM</th><th>SEMESTER</th><th></th></tr>
              </thead>
              <tbody>
                {slots.map(slot => (
                  <tr key={slot.id}>
                    <td>{slot.date}</td>
                    <td>{slot.start} – {slot.end}</td>
                    <td>{slot.program}</td>
                    <td>{slot.semester}</td>
                    <td><button className="icon-btn" onClick={() => handleRemoveSlot(slot.id)}><X size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-open-slot" onClick={handleOpenSlot}>
            <CheckCircle size={18} /> OPEN SLOT
          </button>
        </div>
      )}

      {openedSlots.length > 0 && (
        <div className="card opened-slots-card">
          <div className="opened-slots-header">
            <div className="opened-slots-title-row">
              <Layers size={20} color="#1e3a8a" />
              <span className="card-title" style={{ marginBottom: 0 }}>OPENED SLOTS SUMMARY</span>
            </div>
            <div className="slot-count-badge">{openedSlots.length} Slot{openedSlots.length !== 1 ? "s" : ""} Open</div>
          </div>
          <div className="slot-pills-grid">
            {openedSlots.map((slot, idx) => (
              <div className="slot-pill" key={slot.id}>
                <div className="slot-pill-number">#{idx + 1}</div>
                <div className="slot-pill-body">
                  <div className="slot-pill-time"><Clock size={13} color="#2563eb" />{slot.start} – {slot.end}</div>
                  <div className="slot-pill-meta">{slot.date} &nbsp;·&nbsp; {slot.program} &nbsp;·&nbsp; {slot.semester}</div>
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

/* ── ViewBookingsTable ──────────────────────────────── */
function ViewBookingsTable({ openedSlots, onRemoveSlot }) {
  const [filterProgram,  setFilterProgram]  = useState("All");
  const [filterSemester, setFilterSemester] = useState("All");

  // Filter rows based on selected program & semester
  const filteredRows = openedSlots.filter(row => {
    const programMatch  = filterProgram  === "All" || row.program  === filterProgram;
    const semesterMatch = filterSemester === "All" || row.semester === filterSemester;
    return programMatch && semesterMatch;
  });

  const bookedCount = filteredRows.filter(r => r.status === "BOOKED").length;
  const openCount   = filteredRows.filter(r => r.status === "OPEN").length;

  const clearFilters = () => { setFilterProgram("All"); setFilterSemester("All"); };
  const hasFilters = filterProgram !== "All" || filterSemester !== "All";

  return (
    <div className="view-bookings-page">
      <div className="card">
        <div className="page-title">Mentoring Slot Booking System – View Booked Slots</div>

        {/* ── Filters row ── */}
        <div className="filters-row">
          <div className="filter-group">
            <label>Program</label>
            <div className="select-wrap">
              <select className="select-field" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
                <option value="All">All Programs</option>
                {PROGRAMS.map(p => <option key={p}>{p}</option>)}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>

          <div className="filter-group">
            <label>Semester</label>
            <div className="select-wrap">
              <select className="select-field" value={filterSemester} onChange={e => setFilterSemester(e.target.value)}>
                <option value="All">All Semesters</option>
                {SEMESTERS_VIEW.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="chevron-icon" size={15} />
            </div>
          </div>

          {/* Live summary pill */}
          <div className="filter-summary-pill">
            <span className="fps-total">{filteredRows.length} slot{filteredRows.length !== 1 ? "s" : ""}</span>
            {filteredRows.length > 0 && (
              <>
                <span className="fps-booked">✓ {bookedCount} booked</span>
                <span className="fps-open">● {openCount} open</span>
              </>
            )}
          </div>
        </div>

        {/* Active filter tags + clear */}
        {hasFilters && (
          <div className="active-filter-tags">
            {filterProgram !== "All" && (
              <span className="filter-tag">
                {filterProgram}
                <button className="filter-tag-x" onClick={() => setFilterProgram("All")}><X size={11} /></button>
              </span>
            )}
            {filterSemester !== "All" && (
              <span className="filter-tag">
                {filterSemester}
                <button className="filter-tag-x" onClick={() => setFilterSemester("All")}><X size={11} /></button>
              </span>
            )}
            <button className="btn-clear-all" onClick={clearFilters}>Clear all</button>
          </div>
        )}

        {/* ── Table ── */}
        <div className="table-card">
          <div className="table-card-title">Booked Mentoring Slots</div>
          <div className="table-scroll">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Program</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="empty-cell">
                      <div className="empty-state">
                        <AlertCircle size={28} color="#94a3b8" />
                        <span>
                          {openedSlots.length === 0
                            ? 'No slots opened yet. Go to "Create Slot" to open slots.'
                            : "No slots match the selected filters."}
                        </span>
                        {openedSlots.length > 0 && hasFilters && (
                          <button className="btn-reset-filter" onClick={clearFilters}>Reset Filters</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map(row => (
                    <tr key={row.id} className={row.status === "OPEN" ? "row-open" : ""}>
                      <td style={{ whiteSpace: "nowrap" }}>{row.date}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.start} – {row.end}</td>
                      <td>
                        {row.studentName
                          ? <span className="student-name-cell"><UserCircle2 size={15} color="#2563eb" />{row.studentName}</span>
                          : <span className="awaiting-text">— Awaiting Booking —</span>}
                      </td>
                      <td>
                        {row.studentId
                          ? <span className="student-id-pill">{row.studentId}</span>
                          : <span className="awaiting-text">—</span>}
                      </td>
                      <td>{row.program}</td>
                      <td>{row.semester}</td>
                      <td><StatusBadge status={row.status} /></td>
                      <td>
                        <div className="action-cell">
                          <button className="icon-btn" title="Remove slot" onClick={() => onRemoveSlot(row.id)}>
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

/* ── Root ───────────────────────────────────────────── */
export default function Mentoring() {
  const [activeTab,   setActiveTab]   = useState("create");
  const [openedSlots, setOpenedSlots] = useState([]);

  const handleSlotsOpened = (newSlots) => {
    setOpenedSlots(prev => [...prev, ...newSlots]);
  };

  useEffect(() => {
    const unbookedSlots = openedSlots.filter(s => s.status === "OPEN" && !s.studentName);
    if (unbookedSlots.length === 0) return;

    const timers = unbookedSlots.map(slot => {
      const delay = 3000 + Math.random() * 5000;
      return setTimeout(() => {
        const student = MOCK_STUDENTS[Math.floor(Math.random() * MOCK_STUDENTS.length)];
        setOpenedSlots(prev =>
          prev.map(s =>
            s.id === slot.id
              ? { ...s, studentName: student.name, studentId: student.id, status: "BOOKED" }
              : s
          )
        );
      }, delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [openedSlots.length]);

  const handleRemoveSlot = (slotId) => {
    setOpenedSlots(prev => prev.filter(s => s.id !== slotId));
  };

  return (
    <div className="app-shell">
      <div className="tab-nav">
        <button className={`tab-btn ${activeTab === "create" ? "active" : ""}`} onClick={() => setActiveTab("create")}>
          Create Slot
        </button>
        <button className={`tab-btn ${activeTab === "view" ? "active" : ""}`} onClick={() => setActiveTab("view")}>
          View Bookings
          {openedSlots.length > 0 && <span className="tab-badge">{openedSlots.length}</span>}
        </button>
      </div>

      {activeTab === "create"
        ? <CreateSlotForm onSlotsOpened={handleSlotsOpened} />
        : <ViewBookingsTable openedSlots={openedSlots} onRemoveSlot={handleRemoveSlot} />}
    </div>
  );
}
