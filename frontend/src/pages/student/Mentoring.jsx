import { useEffect, useState } from "react";
import axios from "axios";
import "./Mentoring.css";


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

function FacultyCard({ slot, onBooked }) {

    const [loading, setLoading] = useState(false);

    const handleBook = async () => {
        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/mentoring/book-slot",
                {
                    slotId: slot._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            onBooked();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Booking failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fcard fcard--open">

            <div className="fcard__hdr">
                <div className="fcard__hdr-info">

                    <span className="fcard__name">
                        {slot.faculty?.firstName} {slot.faculty?.lastName}
                    </span>

                    <span className="fcard__meta">
                        Program : {slot.program?.programName}
                    </span>

                    <span className="fcard__meta">
                        Semester : {slot.semester}
                    </span>

                </div>
            </div>

            <div className="fcard__panel">

                <div className="fcard__selected-label">
                    Date :
                    <span className="fcard__selected-val">
                        {" "}
                        {new Date(slot.date)
                            .toISOString()
                            .split("T")[0]}
                    </span>
                </div>

                <div className="fcard__selected-label">
                    Time :
                    <span className="fcard__selected-val">
                        {" "}
                        {slot.startTime} - {slot.endTime}
                    </span>
                </div>

                <button
                    className="fcard__book-btn"
                    onClick={handleBook}
                    disabled={loading}
                >
                    <CalIcon />
                    {loading ? "BOOKING..." : "BOOK SLOT"}
                </button>

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
                            
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id} className={b.status === "Cancelled" ? "row--cancelled" : ""}>
                                <td>{b.faculty?.firstName} {b.faculty?.lastName}</td>
                                <td> {new Date(b.date)
                                    .toISOString()
                                    .split("T")[0]}</td>
                                <td>{b.startTime} - {b.endTime}</td>
                                <td>
                                    <span className={`sbadge sbadge--${b.status.toLowerCase()}`}>
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="bsec__mob">
                {bookings.map((b) => (
                    <div className={`bsec__mob-card${b.status === "Cancelled" ? " bsec__mob-card--cancelled" : ""}`} key={b._id}>
                       {[
  [
    "Faculty",
    `${b.faculty?.firstName || ""} ${b.faculty?.lastName || ""}`
  ],
  [
    "Date",
    new Date(b.date).toISOString().split("T")[0]
  ],
  [
    "Time",
    `${b.startTime} - ${b.endTime}`
  ]
].map(([k, v]) => (
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
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSlots = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/mentoring/student/available-slots",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSlots(response.data.slots);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots();
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/mentoring/student/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBookings(response.data.slots);

        } catch (error) {
            console.error(error);
        }
    };

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
                        {slots.length === 0 && (
                            <p>No mentoring slots available.</p>
                        )}
                        {slots.map((slot) => (
                            <FacultyCard
                                key={slot._id}
                                slot={slot}
                                onBooked={() => {
                                    fetchSlots();
                                    fetchBookings();
                                }}
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