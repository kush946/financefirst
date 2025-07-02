import React, { useState } from "react";

interface LoginPageProps {
  onLogin: (account: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        minHeight: "100vh",
        background: `url("/bank-bg.jpg") no-repeat center center fixed`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          width: 380,
          background: "rgba(24,27,32,0.92)",
          borderRadius: 16,
          boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
          marginLeft: "60px",
          padding: "32px 24px",
        }}
      >
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: 32,
            fontWeight: 700,
            fontSize: 28,
          }}
        >
          Welcome
        </h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onLogin(account, password);
          }}
        >
          <label style={{ color: "#ccc", fontSize: 18, fontWeight: 500 }}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={account}
            onChange={e => setAccount(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 12px",
              margin: "8px 0 20px 0",
              borderRadius: 8,
              border: "none",
              background: "#23262b",
              color: "#fff",
              fontSize: 16,
            }}
            required
            maxLength={10}
          />
          <label style={{ color: "#ccc", fontSize: 18, fontWeight: 500 }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 12px",
              margin: "8px 0 10px 0",
              borderRadius: 8,
              border: "none",
              background: "#23262b",
              color: "#fff",
              fontSize: 16,
            }}
            required
          />
          <div style={{ marginBottom: 24 }}>
            <a
              href="#"
              style={{
                color: "#b3b3b3",
                fontSize: 15,
                textDecoration: "underline",
              }}
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2196f3",
              color: "#fff",
              fontWeight: 600,
              fontSize: 20,
              padding: "14px 0",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              marginBottom: 24,
            }}
          >
            Log in
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <a
            href="#"
            style={{
              color: "#b3b3b3",
              fontSize: 16,
              textDecoration: "underline",
            }}
          >
            Don’t have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;