import React, { useState } from "react";

interface LoginPageProps {
  onLogin: (account: string, password: string) => void;
}

const navButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#222",
  fontWeight: 600,
  fontSize: 16,
  margin: "0 16px",
  cursor: "pointer",
  padding: "8px 0",
  borderRadius: 4,
  transition: "background 0.2s",
  fontFamily: "Inter, Arial, sans-serif",
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- for eye icon
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: only allow 1234567890/12345 for demo
    if (account === "1234567890" && password === "12345") {
      setError(null);
      onLogin(account, password);
    } else {
      setError("Invalid account number or password.");
    }
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter, Arial, sans-serif" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          width: "100%",
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxSizing: "border-box",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 22, color: "#222", fontFamily: "Inter, Arial, sans-serif" }}>
          Finance First Bank
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={navButtonStyle}>Personal</button>
          <button style={navButtonStyle}>Business</button>
          <button style={navButtonStyle}>Wealth Management</button>
          <button
            style={{
              background: "#e5e7eb",
              color: "#222",
              fontWeight: 700,
              fontSize: 16,
              padding: "8px 24px",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              marginLeft: 16,
              fontFamily: "Inter, Arial, sans-serif",
            }}
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Login Form */}
      <div style={{ maxWidth: 500, margin: "60px auto 0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40, fontFamily: "Inter, Arial, sans-serif" }}>Welcome to Finance First bank</h1>
        {/* Headings above dialog */}
        <div style={{ textAlign: "left", marginBottom: 8, marginLeft: 4, fontWeight: 600, fontSize: 16, fontFamily: "Inter, Arial, sans-serif" }}>
          Username
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={account}
            onChange={e => setAccount(e.target.value)}
            style={inputStyle}
            required
            maxLength={10}
          />
          <div style={{ textAlign: "left", marginBottom: 8, marginLeft: 4, fontWeight: 600, fontSize: 16, fontFamily: "Inter, Arial, sans-serif" }}>
            Password
          </div>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, marginBottom: 0, paddingRight: 40 }}
              required
            />
            <span
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#888",
                fontSize: 20,
                userSelect: "none"
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>
          <div style={{ textAlign: "right", marginBottom: 24 }}>
            <a
              href="#"
              style={{
                color: "#64748b",
                fontSize: 15,
                textDecoration: "underline",
                fontFamily: "Inter, Arial, sans-serif",
              }}
            >
              Forgot Password?
            </a>
          </div>
          {error && (
            <div
              style={{
                background: "#fff0f0",
                color: "#d32f2f",
                border: "1px solid #ffcdd2",
                borderRadius: 8,
                padding: "12px 0",
                marginBottom: 24,
                fontWeight: 600,
                fontFamily: "Inter, Arial, sans-serif",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "60%",
              background: "#e5e7eb",
              color: "#222",
              fontWeight: 700,
              fontSize: 18,
              padding: "12px 0",
              border: "none",
              borderRadius: 16,
              cursor: "pointer",
              margin: "0 auto",
              display: "block",
              marginBottom: 40,
              fontFamily: "Inter, Arial, sans-serif",
            }}
          >
            Log In
          </button>
        </form>
      </div>

      {/* Why Choose Us Section */}
      <div style={{ maxWidth: 900, margin: "60px auto 0 auto" }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 32, fontFamily: "Inter, Arial, sans-serif" }}>Why Choose Us?</h2>
        <div style={{ display: "flex", gap: 24 }}>
          <div
            style={featureCardStyle}
            className="feature-card"
          >
            <span style={{ fontSize: 22, marginRight: 10 }}>🛡️</span>
            <span style={{ fontWeight: 700 }}>Secure Transactions</span>
          </div>
          <div
            style={featureCardStyle}
            className="feature-card"
          >
            <span style={{ fontSize: 22, marginRight: 10 }}>$</span>
            <span style={{ fontWeight: 700 }}>Competitive Rates</span>
          </div>
          <div
            style={featureCardStyle}
            className="feature-card"
          >
            <span style={{ fontSize: 22, marginRight: 10 }}>⏰</span>
            <span style={{ fontWeight: 700 }}>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "18px 16px",
  marginBottom: 20,
  borderRadius: 12,
  border: "1px solid #d1d5db",
  background: "#f3f4f6",
  fontSize: 18,
  fontWeight: 500,
  outline: "none",
  boxSizing: "border-box",
  textAlign: "left",
  fontFamily: "Inter, Arial, sans-serif",
};

const featureCardStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "24px 32px",
  fontSize: 18,
  boxSizing: "border-box",
  fontFamily: "Inter, Arial, sans-serif",
};

// Add this at the bottom of the file (or in your CSS file)
const style = document.createElement("style");
style.innerHTML = `
  .feature-card {
    transition: transform 0.2s cubic-bezier(.4,2,.6,1);
    will-change: transform;
  }
  .feature-card:hover {
    transform: scale(1.07);
    box-shadow: 0 4px 24px 0 rgba(33,150,243,0.10);
    z-index: 1;
  }
`;
document.head.appendChild(style);

export default LoginPage;