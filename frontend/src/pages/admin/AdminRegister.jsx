import { useState } from "react";
import "./AdminRegister.css";

/* ── Icon Components ── */
const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="adreg-input-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="adreg-input-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" className="adreg-input-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
    <circle cx="12" cy="8" r="2" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="adreg-input-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="adreg-input-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
    <polyline points="9,12 11,14 15,10" />
  </svg>
);

/* ── Main Component ── */
export default function AdminRegistration() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [ripple, setRipple] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Admin Registered Successfully");

      // ✅ Reset form after success
      setForm({
        username: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
      });

    } else {
      alert(data.message || "Something went wrong");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
};

  const handleButtonClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 650);
  };

  return (
    <div className="adreg-page-bg">
      <div className="adreg-card">

        {/* Logo */}
        <div className="adreg-logo-area">
          <div className="adreg-logo-ring">
            <ShieldIcon />
          </div>
        </div>

        <h1 className="adreg-title">Admin Registration</h1>
        <div className="adreg-divider" />

        <form className="adreg-form" onSubmit={handleSubmit}>

          {/* Username */}
          <div className="adreg-field-group">
            <label htmlFor="username">Username</label>
            <div className="adreg-input-wrap">
              <UserIcon />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter university-provided username"
                value={form.username}
                onChange={handleChange}
                className={form.username ? "adreg-has-value" : ""}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="adreg-field-group">
            <label htmlFor="password">Password</label>
            <div className="adreg-input-wrap">
              <LockIcon />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className={form.password ? "adreg-has-value" : ""}
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Full Name — 3 columns */}
          <div className="adreg-field-group">
            <label>Full Name</label>
            <div className="adreg-row-3">
              {["firstName", "middleName", "lastName"].map((field, i) => (
                <input
                  key={field}
                  name={field}
                  type="text"
                  placeholder={["First Name", "Middle Name", "Last Name"][i]}
                  value={form[field]}
                  onChange={handleChange}
                  className={form[field] ? "adreg-has-value" : ""}
                  style={{ paddingLeft: "14px" }}
                />
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="adreg-field-group">
            <label htmlFor="address">Address</label>
            <div className="adreg-input-wrap">
              <MapPinIcon />
              <textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                value={form.address}
                onChange={handleChange}
                className={form.address ? "adreg-has-value" : ""}
              />
            </div>
          </div>

          {/* Contact — 2 columns */}
          <div className="adreg-field-group">
            <label>Contact Info</label>
            <div className="adreg-row-2">
              <div className="adreg-input-wrap">
                <PhoneIcon />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className={form.phone ? "adreg-has-value" : ""}
                />
              </div>
              <div className="adreg-input-wrap">
                <MailIcon />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className={form.email ? "adreg-has-value" : ""}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="adreg-btn-register"
            onClick={handleButtonClick}
          >
            {ripple && (
              <span
                className="adreg-btn-ripple"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}
            Register
          </button>

        </form>
      </div>
    </div>
  );
}