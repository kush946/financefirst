import React, { useState } from "react";

type Step = "form" | "confirm" | "success";

interface TransferMoneyProps {
  onBack: () => void;
}

const transferMethods = ["NEFT", "RTGS", "IMPS"];

const initialForm = {
  fromAccount: "",
  toAccount: "",
  ifsc: "",
  amount: "",
  method: "NEFT",
  email: "user@email.com", // Simulated user email
};

const generateRef = () => "TXN" + Math.floor(Math.random() * 1000000000);

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
};

const TransferMoney: React.FC<TransferMoneyProps> = ({ onBack }) => {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState(initialForm);
  const [refNo, setRefNo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirm");
  };

  const handleConfirm = () => {
    setRefNo(generateRef());
    setStep("success");
    setTimeout(() => {
      alert(
        `Email sent to ${form.email}:\nTransfer of ₹${form.amount} to ${form.toAccount} successful.\nReference: ${refNo || "pending"}`
      );
    }, 500);
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
        <div style={{ fontWeight: 700, fontSize: 18, color: "#222", fontFamily: "Inter, Arial, sans-serif" }}>
          FinanceFirst
        </div>
        <div style={{ flex: 1 }} />
        <button style={{
          background: "#e5e7eb",
          color: "#222",
          fontWeight: 600,
          fontSize: 14,
          padding: "8px 24px",
          border: "none",
          borderRadius: 20,
          cursor: "pointer",
          fontFamily: "Inter, Arial, sans-serif",
        }}>Help</button>
      </nav>

      <div style={{ maxWidth: 500, margin: "48px auto 0 auto", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "Inter, Arial, sans-serif" }}>
        <button
          onClick={onBack}
          style={{
            background: "#e5e7eb",
            color: "#222",
            fontWeight: 600,
            fontSize: 14,
            padding: "8px 24px",
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            marginBottom: 32,
            alignSelf: "flex-start",
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          Back to Dashboard
        </button>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, textAlign: "center", fontFamily: "Inter, Arial, sans-serif" }}>Transfer money</h1>

        {step === "form" && (
          <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <select
              name="fromAccount"
              value={form.fromAccount}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select account</option>
              <option value="1234567890">Checking Account (1234567890)</option>
              <option value="0987654321">Savings Account (0987654321)</option>
            </select>
            <input
              name="toAccount"
              value={form.toAccount}
              onChange={handleChange}
              placeholder="To Account Number"
              required
              style={inputStyle}
            />
            <input
              name="ifsc"
              value={form.ifsc}
              onChange={handleChange}
              placeholder="IFSC Code"
              required
              style={inputStyle}
            />
            <input
              name="amount"
              type="number"
              min="1"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount (₹)"
              required
              style={inputStyle}
            />
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              style={inputStyle}
            >
              {transferMethods.map(m => <option key={m}>{m}</option>)}
            </select>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#189dfb",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "12px 0",
                border: "none",
                borderRadius: 24,
                cursor: "pointer",
                marginTop: 12,
                textAlign: "center",
                fontFamily: "Inter, Arial, sans-serif",
              }}
            >
              Continue
            </button>
          </form>
        )}

        {step === "confirm" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", width: "100%", textAlign: "center", fontFamily: "Inter, Arial, sans-serif" }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 18 }}>Confirm Transfer</h3>
            <p style={{ fontSize: 15 }}><strong>From:</strong> {form.fromAccount}</p>
            <p style={{ fontSize: 15 }}><strong>To:</strong> {form.toAccount}</p>
            <p style={{ fontSize: 15 }}><strong>IFSC:</strong> {form.ifsc}</p>
            <p style={{ fontSize: 15 }}><strong>Amount:</strong> ₹{form.amount}</p>
            <p style={{ fontSize: 15 }}><strong>Method:</strong> {form.method}</p>
            <button
              onClick={handleConfirm}
              style={{
                width: "100%",
                background: "#189dfb",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "10px 0",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                marginBottom: 10,
                marginTop: 18,
                textAlign: "center",
                fontFamily: "Inter, Arial, sans-serif",
              }}
            >
              Confirm & Transfer
            </button>
            <button
              onClick={() => setStep("form")}
              style={{
                width: "100%",
                background: "#e5e7eb",
                color: "#222",
                fontWeight: 600,
                fontSize: 14,
                padding: "10px 0",
                border: "none",
                borderRadius: 16,
                cursor: "pointer",
                textAlign: "center",
                fontFamily: "Inter, Arial, sans-serif",
              }}
            >
              Back
            </button>
          </div>
        )}

        {step === "success" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", width: "100%", textAlign: "center", fontFamily: "Inter, Arial, sans-serif" }}>
            <h3 style={{ color: "#189dfb", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Transfer Successful!</h3>
            <p style={{ fontSize: 15 }}><strong>Reference No:</strong> {refNo}</p>
            <p style={{ fontSize: 15 }}>An email notification has been sent to your registered email.</p>
            <button
              onClick={onBack}
              style={{
                width: "100%",
                background: "#189dfb",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "10px 0",
                border: "none",
                borderRadius: 20,
                cursor: "pointer",
                marginTop: 18,
                textAlign: "center",
                fontFamily: "Inter, Arial, sans-serif",
              }}
            >
              Back to Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  marginBottom: 16,
  borderRadius: 16,
  border: "1px solid #d1d5db",
  background: "#f8fafc",
  fontSize: 15,
  fontWeight: 500,
  outline: "none",
  boxSizing: "border-box",
  textAlign: "center",
  fontFamily: "Inter, Arial, sans-serif",
};

export default TransferMoney;