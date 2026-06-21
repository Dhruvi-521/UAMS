import axios from "axios";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import "./Mentoring.css";


const SEMESTERS_CREATE = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const SEMESTERS_VIEW = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];



function StatusBadge({ status }) {
  const cls =
    status === "BOOKED" ? "badge badge-booked"
      : status === "RESCHEDULED" ? "badge badge-rescheduled"
        : status === "OPEN" ? "badge badge-open"
          : "badge badge-cancelled";
  return <span className={cls}>{status}</span>;
}

/* ── CreateSlotForm ─────────────────────────────────── */
function CreateSlotForm({ onSlotsOpened }) {
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [date, setDate] = useState("2026-10-26");
  const [slotOpen, setSlotOpen] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:30");
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/programs"
      );

      setPrograms(response.data);

      if (response.data.length > 0) {
        setProgram(response.data[0]._id);
      }

    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    const selectedProgram = programs.find(
      p => p._id === program
    );

    setSlots(prev => [...prev, {
      id: Date.now(),

      program, // keep ID for backend

      programName: selectedProgram?.programName || "",

      semester,
      date,
      startTime,
      endTime,

      displayDate: formatDate(date),
      displayTime: `${to12h(startTime)} - ${to12h(endTime)}`
    }]);
  };

  const handleRemoveSlot = (id) => setSlots(prev => prev.filter(s => s.id !== id));

  const handleOpenSlot = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/mentoring/create-slots",
        {
          slots: slots.map(slot => ({
            program: slot.program,
            semester: Number(slot.semester),
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

      setSlots([]);

      onSlotsOpened();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Error creating slots"
      );
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-title">CONFIGURE &amp; DEFINE SLOTS</div>
        <div className="form-row">
          <div className="form-group">
            <label>Program</label>
            <div className="select-wrap">
              <select
                className="select-field"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option value="">Select Program</option>

                {programs.map((prog) => (
                  <option
                    key={prog._id}
                    value={prog._id}
                  >
                    {prog.programName}
                  </option>
                ))}
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
                    <td>{slot.startTime} – {slot.endTime}</td>
                    <td>{slot.programName}</td>
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

    </div>
  );
}

/* ── ViewBookingsTable ──────────────────────────────── */
function ViewBookingsTable({ programs, openedSlots, onRemoveSlot }) {
  const [filterProgram, setFilterProgram] = useState("All");
  const [filterSemester, setFilterSemester] = useState("All");
  // const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState("");



  // Filter rows based on selected program & semester
  const filteredRows = openedSlots.filter(row => {
    const programMatch =
      filterProgram === "All" ||
      row.program?.programName === filterProgram;
    const semesterMatch = filterSemester === "All" || row.semester === filterSemester;
    return programMatch && semesterMatch;
  });

  const bookedCount = filteredRows.filter(r => r.status === "BOOKED").length;
  const openCount = filteredRows.filter(r => r.status === "OPEN").length;

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
              <select
                className="select-field"
                value={filterProgram}
                onChange={(e) => setFilterProgram(e.target.value)}
              >
                <option value="">Select Program</option>

                {programs.map(program => (
                  <option
                    key={program._id}
                    value={program.programName}
                  >
                    {program.programName}
                  </option>
                ))}
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
                    <tr key={row._id} className={row.status === "OPEN" ? "row-open" : ""}>
                      <td style={{ whiteSpace: "nowrap" }}>{new Date(row.date).toISOString().split("T")[0]}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.startTime} – {row.endTime}</td>
                      <td>
                        {
                          row.student
                            ? `${row.student.firstName} ${row.student.lastName}`
                            : "Awaiting Booking"
                        }
                      </td>
                      <td>
                        {
                          row.student
                            ? row.student.studentId
                            : "-"
                        }
                      </td>
                      <td>{row.program?.programName}</td>
                      <td>Semester {row.semester}</td>
                      <td><StatusBadge status={row.status} /></td>
                      <td>
                        <div className="action-cell">
                          <button className="icon-btn" title="Remove slot" onClick={() => onRemoveSlot(row._id)}>
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
  const [activeTab, setActiveTab] = useState("create");
  const [openedSlots, setOpenedSlots] = useState([]);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {

    const fetchPrograms = async () => {

      const response = await axios.get(
        "http://localhost:5000/api/programs"
      );

      setPrograms(response.data);
    };

    fetchPrograms();

  }, []);

  const fetchFacultySlots = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/mentoring/my-slots",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOpenedSlots(response.data.slots);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFacultySlots();
  }, []);


  const handleRemoveSlot = async (slotId) => {
    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/mentoring/${slotId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchFacultySlots();

    } catch (error) {
      console.error(error);
    }
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
        ? <CreateSlotForm
          onSlotsOpened={fetchFacultySlots}
        />
        : <ViewBookingsTable
          programs={programs}
          openedSlots={openedSlots}
          onRemoveSlot={handleRemoveSlot}
        />}
    </div>
  );
}
