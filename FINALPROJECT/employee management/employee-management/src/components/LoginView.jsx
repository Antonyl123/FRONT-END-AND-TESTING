import React, { useState } from "react";

// Hardcoded credentials — works without json-server
const CREDENTIALS = {
  admin: {
    id: 1,
    email: "admin@aurahr.com",
    password: "admin123",
    role: "admin",
    employeeId: 1,
    name: "John Anderson",
    jobRole: "HR Administrator",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  employee: {
    id: 2,
    email: "employee@aurahr.com",
    password: "employee123",
    role: "employee",
    employeeId: 101,
    name: "Sophia Miller",
    jobRole: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
};

export default function LoginView({ onLogin }) {
  const [activePortal, setActivePortal] = useState(null); // 'admin' | 'employee' | null
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectPortal = (portal) => {
    setActivePortal(portal);
    setEmail(CREDENTIALS[portal].email);
    setPassword(CREDENTIALS[portal].password);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = await onLogin(email, password, activePortal);
      if (!success) setError("Invalid email or password. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Background blobs */}
      <div style={{ ...styles.blob, top: "-120px", left: "-120px", background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)" }} />
      <div style={{ ...styles.blob, bottom: "-100px", right: "-100px", background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)" }} />
      <div style={{ ...styles.blob, top: "40%", right: "20%", background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)", width: 300, height: 300 }} />

      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.brandIcon}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 style={styles.brandName}>AuraHR</h1>
            <p style={styles.brandTagline}>Human Resource Management System</p>
          </div>
        </div>

        {!activePortal ? (
          /* ── Portal Selection Screen ── */
          <div style={styles.portalGrid}>
            <p style={styles.selectLabel}>Select your portal to continue</p>

            {/* Admin Portal Card */}
            <div style={styles.portalCard} onClick={() => selectPortal("admin")}>
              <div style={{ ...styles.portalIconRing, background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h2 style={styles.portalTitle}>Admin Portal</h2>
              <p style={styles.portalDesc}>
                Full system access — manage employees, approve leaves, update payroll &amp; control shifts.
              </p>
              <div style={styles.portalBadge}>
                <span style={{ ...styles.dot, background: "#6366f1" }} />
                HR Administrator Access
              </div>
              <button style={{ ...styles.portalBtn, background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                Enter Admin Portal
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" style={{ marginLeft: 8 }}>
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Employee Portal Card */}
            <div style={styles.portalCard} onClick={() => selectPortal("employee")}>
              <div style={{ ...styles.portalIconRing, background: "linear-gradient(135deg, #059669, #10b981)" }}>
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 style={styles.portalTitle}>Employee Portal</h2>
              <p style={styles.portalDesc}>
                Personal workspace — clock in/out, view payslips, request leaves &amp; check schedules.
              </p>
              <div style={styles.portalBadge}>
                <span style={{ ...styles.dot, background: "#10b981" }} />
                Employee Self-Service
              </div>
              <button style={{ ...styles.portalBtn, background: "linear-gradient(135deg, #059669, #10b981)" }}>
                Enter Employee Portal
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" style={{ marginLeft: 8 }}>
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* ── Login Form Screen ── */
          <div style={styles.formWrapper}>
            <button style={styles.backBtn} onClick={() => { setActivePortal(null); setError(""); }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Choose Portal
            </button>

            {/* Portal Header */}
            <div style={styles.formHeader}>
              <div style={{
                ...styles.formIconRing,
                background: activePortal === "admin"
                  ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                  : "linear-gradient(135deg, #059669, #10b981)"
              }}>
                {activePortal === "admin" ? (
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <div>
                <h2 style={styles.formTitle}>
                  {activePortal === "admin" ? "Admin Portal" : "Employee Portal"}
                </h2>
                <p style={styles.formSubtitle}>
                  {activePortal === "admin"
                    ? "Sign in with your administrator credentials"
                    : "Sign in with your employee credentials"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <svg style={styles.inputIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <svg style={styles.inputIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              {error && (
                <div style={styles.errorBox}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitBtn,
                  background: activePortal === "admin"
                    ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                    : "linear-gradient(135deg, #059669, #10b981)",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Signing in…" : `Sign in to ${activePortal === "admin" ? "Admin" : "Employee"} Portal`}
              </button>

              {/* Demo credentials hint */}
              <div style={styles.demoHint}>
                <span style={styles.demoLabel}>Demo credentials pre-filled</span>
                <div style={styles.demoRow}>
                  <span style={styles.demoKey}>Email:</span>
                  <code style={styles.demoVal}>{CREDENTIALS[activePortal].email}</code>
                </div>
                <div style={styles.demoRow}>
                  <span style={styles.demoKey}>Password:</span>
                  <code style={styles.demoVal}>{CREDENTIALS[activePortal].password}</code>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b3e 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px",
  },
  blob: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
  },
  container: {
    width: "100%",
    maxWidth: 860,
    position: "relative",
    zIndex: 1,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 40,
    justifyContent: "center",
  },
  brandIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
  },
  brandName: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  brandTagline: {
    margin: 0,
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.3px",
  },
  selectLabel: {
    textAlign: "center",
    color: "rgba(255,255,255,0.55)",
    fontSize: 15,
    marginBottom: 24,
    gridColumn: "1/-1",
  },
  portalGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
    alignItems: "start",
  },
  portalCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: "36px 32px",
    cursor: "pointer",
    transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
    backdropFilter: "blur(16px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 16,
  },
  portalIconRing: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
  },
  portalTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
  },
  portalDesc: {
    margin: 0,
    fontSize: 13.5,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 1.6,
  },
  portalBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    background: "rgba(255,255,255,0.06)",
    borderRadius: 999,
    padding: "6px 14px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block",
  },
  portalBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px 24px",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: "0.3px",
    marginTop: 4,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  },
  // Form screen
  formWrapper: {
    maxWidth: 460,
    margin: "0 auto",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 24,
    padding: "40px 40px 32px",
    backdropFilter: "blur(24px)",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    padding: 0,
    marginBottom: 28,
    transition: "color 0.2s",
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
  formIconRing: {
    width: 56,
    height: 56,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  },
  formTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: "#fff",
  },
  formSubtitle: {
    margin: "4px 0 0",
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: "0.3px",
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "14px 14px 14px 46px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 10,
    padding: "12px 16px",
    fontSize: 13,
    color: "#fca5a5",
  },
  submitBtn: {
    padding: "16px",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.3px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    transition: "opacity 0.2s, transform 0.1s",
    fontFamily: "inherit",
    marginTop: 4,
  },
  demoHint: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  demoLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  demoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  demoKey: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    width: 60,
  },
  demoVal: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    background: "rgba(255,255,255,0.08)",
    borderRadius: 6,
    padding: "2px 8px",
    fontFamily: "monospace",
  },
};