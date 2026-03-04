import React, { useState } from "react";
import "./Login.css";

export default function Login() {
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="uams-root">

            {/* ── Page wrapper ── */}
            <div className="uams-container">

                {/* HEADER */}
                <header className="uams-header">
                    <div className="logo-section">
                        <img src="src\assets\common\skips_logo.png" />
                    </div>

                    <div className="header-divider"></div>

                    <div className="portal-info">
                        <div className="portal-title">ACADEMIC MANAGEMENT SYSTEM (UAMS)</div>
                        <div className="portal-subtitle">STUDENT &amp; FACULTY PORTAL</div>
                    </div>
                </header>

                {/* MAIN */}
                <main className="uams-main">
                    <div className="login-card">
                        <h2 className="card-title">Welcome to UAMS Portal</h2>
                        <p className="card-desc">Enter your credentials to access your account.</p>

                        <form className="login-form" onSubmit={handleSubmit}>

                            {/* Student/Faculty ID */}
                            <div className="input-group">
                                <span className="input-icon">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className="uams-input"
                                    placeholder="Student/Faculty ID"
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    autoComplete="username"
                                />
                            </div>

                            {/* Password */}
                            <div className="input-group">
                                <span className="input-icon">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="uams-input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {/* Remember Me */}
                            <div className="remember-row">
                                <label className="remember-label">
                                    <input
                                        type="checkbox"
                                        className="remember-checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className="checkmark"></span>
                                    Remember Me
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className={`login-btn${loading ? " loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? <span className="spinner"></span> : "LOG IN"}
                            </button>
                        </form>

                        <div className="card-footer">
                            <a href="#forgot" className="footer-link">Forgot Password?</a>
                            <a href="#request" className="footer-link">Request Access</a>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}