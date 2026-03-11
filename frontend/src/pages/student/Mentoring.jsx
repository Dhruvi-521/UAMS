import { useState } from "react";
import "./Mentoring.css";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FACULTY_LIST = [
    {
        id: 1,
        name: "Dr. Bhavin Shah",
        topic: "Data Structures",
        experience: "8 years of experience",
        style: "Structured & Supportive",
        dates: ["12/12/2026", "13/12/2026", "14/12/2026"],
        slots: [
            { time: "8:00 – 8:30", disabled: false },
            { time: "8:30 – 9:00", disabled: true },
            { time: "9:00 – 9:30", disabled: false },
            { time: "9:30 – 10:00", disabled: false },
            { time: "10:00 – 10:30", disabled: true },
            { time: "10:30 – 11:00", disabled: false },
        ],
    },
    {
        id: 2,
        name: "Dr. Rahul Vaghela",
        topic: "Algorithms",
        experience: "11 years of experience",
        style: "Interactive & Problem-Solving",
        dates: ["12/12/2026", "13/12/2026", "14/12/2026"],
        slots: [
            { time: "8:00 – 8:30", disabled: true },
            { time: "8:30 – 9:00", disabled: false },
            { time: "9:00 – 9:30", disabled: false },
            { time: "9:30 – 10:00", disabled: true },
            { time: "10:00 – 10:30", disabled: false },
            { time: "10:30 – 11:00", disabled: false },
        ],
    },
    {
        id: 3,
        name: "Dr. Meera Patel",
        topic: "Operating Systems",
        experience: "17 years of experience",
        style: "Analytical & Theory-Focused",
        dates: ["12/12/2026", "13/12/2026", "14/12/2026"],
        slots: [
            { time: "8:00 – 8:30", disabled: false },
            { time: "8:30 – 9:00", disabled: false },
            { time: "9:00 – 9:30", disabled: true },
            { time: "9:30 – 10:00", disabled: false },
            { time: "10:00 – 10:30", disabled: false },
            { time: "10:30 – 11:00", disabled: true },
        ],
    },
];

const INITIAL_BOOKINGS = [
    { id: 1, faculty: "Dr. Bhavin Shah", date: "12/02/2026", time: "9:00 – 9:30", status: "Booked" },
    { id: 2, faculty: "Dr. Rahul Vaghela", date: "12/03/2026", time: "10:00 – 10:30", status: "Pending" },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function CalIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
    );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
// A simple inline modal for cancel confirmation

function ConfirmDialog({ booking, onConfirm, onCancel }) {
    return (
        <div className="mentoring-page">

            <div className="dialog-overlay" role="dialog" aria-modal="true">
                <div className="dialog">
                    <div className="dialog__icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <h3 className="dialog__title">Cancel Booking?</h3>
                    <p className="dialog__body">
                        Are you sure you want to cancel the slot with&nbsp;
                        <strong>{booking.faculty}</strong> on&nbsp;
                        <strong>{booking.date}</strong> at&nbsp;
                        <strong>{booking.time}</strong>?
                    </p>
                    <div className="dialog__actions">
                        <button className="dialog__btn dialog__btn--ghost" onClick={onCancel}>
                            Keep Slot
                        </button>
                        <button className="dialog__btn dialog__btn--danger" onClick={onConfirm}>
                            Yes, Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── FacultyCard ──────────────────────────────────────────────────────────────

function FacultyCard({ faculty, isOpen, onToggle, onBook }) {
    const [selDate, setSelDate] = useState(faculty.dates[0]);
    const [selSlot, setSelSlot] = useState(null);

    const pickDate = (d) => { setSelDate(d); setSelSlot(null); };

    const handleBook = () => {
        if (!selSlot) { alert("Please select a time slot first."); return; }
        onBook({ faculty: faculty.name, date: selDate, time: selSlot });
        setSelSlot(null);
    };

    return (
        <div className="mentoring-page">

            <div className={`fcard${isOpen ? " fcard--open" : ""}`}>

                {/* Card header — toggles accordion */}
                <div className="fcard__hdr">
                    <div className="fcard__hdr-info">
                        <span className="fcard__name">{faculty.name}</span>
                        <span className="fcard__meta">Topic: {faculty.topic}</span>
                        <span className="fcard__meta">{faculty.experience}</span>
                    </div>
                </div>

                {/* Expanded panel */}
                <div className="fcard__panel">

                    {/* DATE SELECTION */}
                    <div className="fcard__block">
                        <p className="fcard__block-label">Select Date</p>
                        <div className="pill-row">
                            {faculty.dates.map((d) => (
                                <button key={d} onClick={() => pickDate(d)}
                                    className={`pill pill--date${selDate === d ? " pill--on" : ""}`}>
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TIME SLOT SELECTION */}
                    <div className="fcard__block">
                        <p className="fcard__block-label">Select Slot</p>
                        <div className="pill-row">
                            {faculty.slots.map((s) => (
                                <button key={s.time} disabled={s.disabled}
                                    onClick={() => !s.disabled && setSelSlot(s.time)}
                                    className={`pill${s.disabled ? " pill--off" : ""}${selSlot === s.time ? " pill--on" : ""}`}>
                                    {s.time}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MENTORING STYLE */}
                    <p className="fcard__style">
                        <strong>Mentoring Style:</strong> {faculty.style}
                    </p>

                    {/* SLOT SUMMARY */}
                    <div className="fcard__selected-label">
                        Slot&nbsp;
                        {selSlot
                            ? <span className="fcard__selected-val">{selDate} &nbsp;|&nbsp; {selSlot}</span>
                            : <span className="fcard__selected-placeholder">—</span>
                        }
                    </div>

                    {/* BOOK BUTTON */}
                    <button className="fcard__book-btn" onClick={handleBook}>
                        <CalIcon /> BOOK SLOT
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── BookingsTable ────────────────────────────────────────────────────────────
// Receives onCancel handler to trigger confirmation dialog from parent

function BookingsTable({ bookings, onCancelRequest }) {
    return (
        <section className="bsec">
            <p className="bsec__label">SLOTS BOOKED</p>

            {/* Desktop table */}
            <div className="bsec__tbl-wrap">
                <table className="bsec__tbl">
                    <thead>
                        <tr>
                            <th>Faculty <span>⇅</span></th>
                            <th>Date <span>⇅</span></th>
                            <th>Time <span>⇅</span></th>
                            <th>Status <span>⇅</span></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className={b.status === "Cancelled" ? "row--cancelled" : ""}>
                                <td>{b.faculty}</td>
                                <td>{b.date}</td>
                                <td>{b.time}</td>
                                <td>
                                    <span className={`sbadge sbadge--${b.status.toLowerCase()}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td>
                                    {/* Only show Cancel button if slot is not already cancelled */}
                                    {b.status !== "Cancelled" ? (
                                        <button
                                            className="cancel-btn"
                                            onClick={() => onCancelRequest(b)}
                                            title="Cancel this booking"
                                        >
                                            <TrashIcon /> Cancel
                                        </button>
                                    ) : (
                                        <span className="cancelled-label">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="bsec__mob">
                {bookings.map((b) => (
                    <div className={`bsec__mob-card${b.status === "Cancelled" ? " bsec__mob-card--cancelled" : ""}`} key={b.id}>
                        {[["Faculty", b.faculty], ["Date", b.date], ["Time", b.time]].map(([k, v]) => (
                            <div className="bsec__mob-row" key={k}>
                                <span className="bsec__mob-key">{k}</span>
                                <span className="bsec__mob-val">{v}</span>
                            </div>
                        ))}
                        <div className="bsec__mob-row">
                            <span className="bsec__mob-key">Status</span>
                            <span className={`sbadge sbadge--${b.status.toLowerCase()}`}>{b.status}</span>
                        </div>
                        {b.status !== "Cancelled" && (
                            <div className="bsec__mob-row">
                                <span className="bsec__mob-key">Action</span>
                                <button className="cancel-btn" onClick={() => onCancelRequest(b)}>
                                    <TrashIcon /> Cancel
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Mentoring() {
    const [openId, setOpenId] = useState(null);
    const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

    // cancelTarget holds the booking object being confirmed, or null when dialog is hidden
    const [cancelTarget, setCancelTarget] = useState(null);

    const toggle = (id) => setOpenId((p) => (p === id ? null : id));

    // Add new booking with Pending status
    const handleBook = (entry) => {
        setBookings((p) => [...p, { id: Date.now(), ...entry, status: "Pending" }]);
    };

    // Open the confirmation dialog for a specific booking
    const handleCancelRequest = (booking) => setCancelTarget(booking);

    // Confirmed: mark status as "Cancelled"
    const handleCancelConfirm = () => {
        setBookings((p) =>
            p.map((b) => b.id === cancelTarget.id ? { ...b, status: "Cancelled" } : b)
        );
        setCancelTarget(null);
    };

    // User clicked "Keep Slot" — close dialog without changes
    const handleCancelAbort = () => setCancelTarget(null);

    return (
        <div className="mentoring-page">
            <div className="mp">

                {/* Confirmation dialog (rendered on top when cancelTarget is set) */}
                {cancelTarget && (
                    <ConfirmDialog
                        booking={cancelTarget}
                        onConfirm={handleCancelConfirm}
                        onCancel={handleCancelAbort}
                    />
                )}

                <main className="mp__body">

                    {/* Page heading */}
                    <div className="mp__page-hd">
                        <h2>MENTORING SLOT BOOKING &nbsp;&#128197;</h2>
                    </div>

                    {/* Faculty grid label */}
                    <p className="mp__grid-label">FACULTY SELECTION</p>

                    {/* 3-column faculty card grid */}
                    <div className="mp__grid">
                        {FACULTY_LIST.map((f) => (
                            <FacultyCard
                                key={f.id}
                                faculty={f}
                                isOpen={true}
                                onBook={handleBook}
                            />
                        ))}
                    </div>

                    {/* Booked slots table with cancel action */}
                    <BookingsTable bookings={bookings} onCancelRequest={handleCancelRequest} />

                </main>
            </div>
        </div>
    );
}