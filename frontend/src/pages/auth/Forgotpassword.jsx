import React, { useEffect, useRef, useState } from "react";
import "./ForgotPassword.css";

/* ─────────────────────────────────────────────
   STEP CONSTANTS
───────────────────────────────────────────── */
const STEP_EMAIL = "email";
const STEP_OTP   = "otp";
const STEP_RESET = "reset";
const STEP_DONE  = "done";

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ForgotPassword({ onClose }) {
    const [step, setStep]               = useState(STEP_EMAIL);
    const [animating, setAnimating]     = useState(false);

    /* Email step */
    const [email, setEmail]             = useState("");
    const [emailError, setEmailError]   = useState("");
    const [emailLoading, setEmailLoading] = useState(false);

    /* OTP step */
    const [otp, setOtp]                 = useState(["", "", "", ""]);
    const [otpError, setOtpError]       = useState("");
    const [otpLoading, setOtpLoading]   = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend]     = useState(false);
    const otpRefs                       = [useRef(), useRef(), useRef(), useRef()];

    /* Reset step */
    const [newPassword, setNewPassword]       = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew]               = useState(false);
    const [showConfirm, setShowConfirm]       = useState(false);
    const [resetError, setResetError]         = useState("");
    const [resetLoading, setResetLoading]     = useState(false);

    /* ── Resend countdown ── */
    useEffect(() => {
        if (step !== STEP_OTP) return;
        setResendTimer(30);
        setCanResend(false);
        const interval = setInterval(() => {
            setResendTimer(t => {
                if (t <= 1) { clearInterval(interval); setCanResend(true); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [step]);

    /* ── Step transition helper ── */
    const goTo = (nextStep) => {
        setAnimating(true);
        setTimeout(() => {
            setStep(nextStep);
            setAnimating(false);
        }, 320);
    };

    /* ── Email validation ── */
    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    /* ── STEP 1: Get OTP ── */
    const handleGetOtp = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid college email address.");
            return;
        }
        setEmailError("");
        setEmailLoading(true);
        setTimeout(() => {
            setEmailLoading(false);
            goTo(STEP_OTP);
        }, 1800);
    };

    /* ── STEP 2: OTP input handlers ── */
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value.slice(-1);
        setOtp(updated);
        setOtpError("");
        if (value && index < 3) otpRefs[index + 1].current?.focus();
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
        if (!pasted) return;
        const updated = ["", "", "", ""];
        [...pasted].forEach((ch, i) => { updated[i] = ch; });
        setOtp(updated);
        const lastFilled = Math.min(pasted.length, 3);
        otpRefs[lastFilled].current?.focus();
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const entered = otp.join("");
        if (entered.length < 4) {
            setOtpError("Please enter the complete 4-digit OTP.");
            return;
        }
        setOtpLoading(true);
        setTimeout(() => {
            setOtpLoading(false);
            /* In production: validate OTP against backend */
            goTo(STEP_RESET);
        }, 1800);
    };

    const handleResend = () => {
        if (!canResend) return;
        setOtp(["", "", "", ""]);
        setOtpError("");
        setResendTimer(30);
        setCanResend(false);
        const interval = setInterval(() => {
            setResendTimer(t => {
                if (t <= 1) { clearInterval(interval); setCanResend(true); return 0; }
                return t - 1;
            });
        }, 1000);
        otpRefs[0].current?.focus();
    };

    /* ── STEP 3: Password validation ── */
    const passwordRules = (pwd) => pwd.length >= 8;
    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const resetValid = passwordRules(newPassword) && passwordsMatch;

    const handleReset = (e) => {
        e.preventDefault();
        if (!passwordRules(newPassword)) {
            setResetError("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setResetError("Passwords do not match.");
            return;
        }
        setResetError("");
        setResetLoading(true);
        setTimeout(() => {
            setResetLoading(false);
            goTo(STEP_DONE);
        }, 1800);
    };

    /* ── Step progress indicator ── */
    const stepIndex = { [STEP_EMAIL]: 0, [STEP_OTP]: 1, [STEP_RESET]: 2, [STEP_DONE]: 2 };

    /* ── Backdrop click closes modal ── */
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="fp-overlay" onClick={handleBackdropClick}>
            <div className={`fp-card ${animating ? "fp-card--exit" : "fp-card--enter"}`}>

                {/* Close button */}
                <button className="fp-close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Progress dots */}
                {step !== STEP_DONE && (
                    <div className="fp-steps">
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <div className={`fp-step-dot ${stepIndex[step] >= i ? "fp-step-dot--active" : ""} ${stepIndex[step] > i ? "fp-step-dot--done" : ""}`}>
                                    {stepIndex[step] > i ? (
                                        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="white" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : i + 1}
                                </div>
                                {i < 2 && (
                                    <div className={`fp-step-line ${stepIndex[step] > i ? "fp-step-line--done" : ""}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* ══ STEP 1: EMAIL ══ */}
                {step === STEP_EMAIL && (
                    <div className="fp-body">
                        <div className="fp-icon-wrap fp-icon-wrap--blue">
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <h2 className="fp-title">Forgot Password?</h2>
                        <p className="fp-desc">Enter your college email and we'll send you a verification code.</p>

                        <form className="fp-form" onSubmit={handleGetOtp}>
                            <div className="fp-field-label">College Email ID</div>
                            <div className={`fp-input-group ${emailError ? "fp-input-group--error" : ""}`}>
                                <span className="fp-input-icon">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    className="fp-input"
                                    placeholder="yourname@university.edu"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                                    autoFocus
                                />
                            </div>
                            {emailError && <p className="fp-error">{emailError}</p>}

                            <button
                                type="submit"
                                className={`fp-btn${emailLoading ? " fp-btn--loading" : ""}`}
                                disabled={emailLoading || !email}
                            >
                                {emailLoading ? <span className="fp-spinner" /> : "Get OTP"}
                            </button>
                        </form>

                        <div className="fp-back-row">
                            <button className="fp-back-link" onClick={onClose}>
                                ← Back to Login
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 2: OTP ══ */}
                {step === STEP_OTP && (
                    <div className="fp-body">
                        <div className="fp-icon-wrap fp-icon-wrap--indigo">
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="fp-title">Enter OTP</h2>
                        <p className="fp-desc">
                            We've sent a 4-digit code to<br />
                            <strong className="fp-email-highlight">{email}</strong>
                        </p>

                        <form className="fp-form" onSubmit={handleVerifyOtp}>
                            <div className="fp-otp-row" onPaste={handleOtpPaste}>
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={otpRefs[i]}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className={`fp-otp-box ${digit ? "fp-otp-box--filled" : ""} ${otpError ? "fp-otp-box--error" : ""}`}
                                        value={digit}
                                        onChange={e => handleOtpChange(i, e.target.value)}
                                        onKeyDown={e => handleOtpKeyDown(i, e)}
                                        autoFocus={i === 0}
                                    />
                                ))}
                            </div>
                            {otpError && <p className="fp-error fp-error--center">{otpError}</p>}

                            <div className="fp-resend-row">
                                {canResend ? (
                                    <button type="button" className="fp-resend-btn" onClick={handleResend}>
                                        Resend OTP
                                    </button>
                                ) : (
                                    <span className="fp-resend-timer">
                                        Resend in <strong>{resendTimer}s</strong>
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`fp-btn${otpLoading ? " fp-btn--loading" : ""}`}
                                disabled={otpLoading || otp.join("").length < 4}
                            >
                                {otpLoading ? <span className="fp-spinner" /> : "Verify OTP"}
                            </button>
                        </form>

                        <div className="fp-back-row">
                            <button className="fp-back-link" onClick={() => goTo(STEP_EMAIL)}>
                                ← Change Email
                            </button>
                        </div>
                    </div>
                )}

                {/* ══ STEP 3: RESET PASSWORD ══ */}
                {step === STEP_RESET && (
                    <div className="fp-body">
                        <div className="fp-icon-wrap fp-icon-wrap--green">
                            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h2 className="fp-title">Reset Password</h2>
                        <p className="fp-desc">Create a strong new password for your account.</p>

                        <form className="fp-form" onSubmit={handleReset}>

                            {/* New Password */}
                            <div>
                                <div className="fp-field-label">New Password</div>
                                <div className={`fp-input-group ${resetError && !passwordRules(newPassword) ? "fp-input-group--error" : newPassword && passwordRules(newPassword) ? "fp-input-group--success" : ""}`}>
                                    <span className="fp-input-icon">
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showNew ? "text" : "password"}
                                        className="fp-input"
                                        placeholder="Min. 8 characters"
                                        value={newPassword}
                                        onChange={e => { setNewPassword(e.target.value); setResetError(""); }}
                                        autoFocus
                                    />
                                    <button type="button" className="fp-eye-btn" onClick={() => setShowNew(!showNew)} tabIndex={-1}>
                                        {showNew ? (
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
                                {/* Strength bar */}
                                {newPassword && (
                                    <div className="fp-strength-bar">
                                        <div className={`fp-strength-fill fp-strength-fill--${newPassword.length < 6 ? "weak" : newPassword.length < 10 ? "medium" : "strong"}`} />
                                        <span className={`fp-strength-label fp-strength-label--${newPassword.length < 6 ? "weak" : newPassword.length < 10 ? "medium" : "strong"}`}>
                                            {newPassword.length < 6 ? "Weak" : newPassword.length < 10 ? "Good" : "Strong"}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <div className="fp-field-label">Confirm Password</div>
                                <div className={`fp-input-group ${confirmPassword && !passwordsMatch ? "fp-input-group--error" : confirmPassword && passwordsMatch ? "fp-input-group--success" : ""}`}>
                                    <span className="fp-input-icon">
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        className="fp-input"
                                        placeholder="Re-enter your password"
                                        value={confirmPassword}
                                        onChange={e => { setConfirmPassword(e.target.value); setResetError(""); }}
                                    />
                                    <button type="button" className="fp-eye-btn" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                                        {showConfirm ? (
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
                                {/* Match indicator */}
                                {confirmPassword && (
                                    <p className={`fp-match-msg ${passwordsMatch ? "fp-match-msg--ok" : "fp-match-msg--no"}`}>
                                        {passwordsMatch ? (
                                            <>
                                                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                                &nbsp;Passwords match
                                            </>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                &nbsp;Passwords do not match
                                            </>
                                        )}
                                    </p>
                                )}
                            </div>

                            {resetError && <p className="fp-error">{resetError}</p>}

                            <button
                                type="submit"
                                className={`fp-btn${resetLoading ? " fp-btn--loading" : ""}${!resetValid ? " fp-btn--disabled" : ""}`}
                                disabled={resetLoading || !resetValid}
                            >
                                {resetLoading ? <span className="fp-spinner" /> : "Reset Password"}
                            </button>
                        </form>
                    </div>
                )}

                {/* ══ STEP 4: SUCCESS ══ */}
                {step === STEP_DONE && (
                    <div className="fp-body fp-body--success">
                        <div className="fp-success-ring">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="fp-title fp-title--success">Password Reset!</h2>
                        <p className="fp-desc fp-desc--success">
                            Your password has been updated successfully.<br />
                            You can now log in with your new password.
                        </p>
                        <button className="fp-btn" onClick={onClose}>
                            Back to Login
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}