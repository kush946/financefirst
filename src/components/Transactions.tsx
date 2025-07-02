import React, { useState } from "react";

// Sample transactions data (updated to match screenshot)
const transactions = [
  { id: 1, date: "2024-07-24", amount: 25.0, type: "Purchase", status: "Completed", description: "Online store purchase" },
  { id: 2, date: "2024-07-23", amount: 150.0, type: "Transfer", status: "Completed", description: "Transfer to Savings" },
  { id: 3, date: "2024-07-22", amount: 50.0, type: "Purchase", status: "Completed", description: "Grocery store" },
  { id: 4, date: "2024-07-21", amount: 200.0, type: "Deposit", status: "Completed", description: "Salary deposit" },
  { id: 5, date: "2024-07-20", amount: 30.0, type: "Purchase", status: "Completed", description: "Coffee shop" },
];

const transactionTypes = ["All types", "Purchase", "Transfer", "Deposit"];
const statuses = ["All statuses", "Completed", "Pending"];

function downloadCSV(data: typeof transactions) {
  const csvRows = [
    ["Date", "Amount", "Type", "Status", "Description"],
    ...data.map(t =>
      [t.date, t.amount, t.type, t.status, t.description].join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  window.URL.revokeObjectURL(url);
}

const Transactions: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [filters, setFilters] = useState({
    type: "All types",
    status: "All statuses",
    from: "",
    to: "",
  });

  const filtered = transactions.filter(t => {
    const matchType = filters.type === "All types" || t.type === filters.type;
    const matchStatus = filters.status === "All statuses" || t.status === filters.status;
    const matchFrom = !filters.from || t.date >= filters.from;
    const matchTo = !filters.to || t.date <= filters.to;
    return matchType && matchStatus && matchFrom && matchTo;
  });

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
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
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>
          FinanceFirst
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <button style={navButtonStyle}>Accounts</button>
          <button style={navButtonStyle}>Payments</button>
          <button style={navButtonStyle}>Cards</button>
          <button style={navButtonStyle}>Transfers</button>
          <button style={navButtonStyle}>Investments</button>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "#f3f4f6",
            display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 16
          }}>
            <span role="img" aria-label="bell">🔔</span>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "#f3f4f6",
            display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12
          }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="profile" style={{ width: 28, height: 28, borderRadius: "50%" }} />
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: "32px 0 24px 0" }}>Recent Transactions</h1>
          <button
            onClick={onBack}
            style={{
              background: "#e5e7eb",
              color: "#222",
              fontWeight: 600,
              fontSize: 16,
              padding: "8px 24px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Back to Summary
          </button>
        </div>

        {/* Filter Section */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Filter</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: "#64748b", fontSize: 15 }}>From</label>
              <input
                type="date"
                value={filters.from}
                onChange={e => setFilters(f => ({ ...f, from: e.target.value }))}
                style={filterInputStyle}
              />
            </div>
            <div>
              <label style={{ color: "#64748b", fontSize: 15 }}>To</label>
              <input
                type="date"
                value={filters.to}
                onChange={e => setFilters(f => ({ ...f, to: e.target.value }))}
                style={filterInputStyle}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <select
              value={filters.type}
              onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
              style={filterInputStyle}
            >
              {transactionTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select
              value={filters.status}
              onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
              style={filterInputStyle}
            >
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button
              onClick={() => downloadCSV(filtered)}
              style={{
                background: "#e5e7eb",
                color: "#222",
                fontWeight: 600,
                fontSize: 16,
                padding: "8px 24px",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginLeft: "auto"
              }}
            >
              Download
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          overflow: "hidden",
          marginBottom: 32,
        }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={tdStyle}>{formatDate(t.date)}</td>
                  <td style={tdStyle}>${t.amount.toFixed(2)}</td>
                  <td style={tdStyle}>{t.type}</td>
                  <td style={tdStyle}>
                    <span style={{
                      background: "#e5e7eb",
                      borderRadius: 8,
                      padding: "4px 16px",
                      fontWeight: 600,
                      fontSize: 15,
                    }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: "#3b82f6" }}>{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={onBack}
          style={{
            background: "#e5e7eb",
            color: "#222",
            fontWeight: 700,
            fontSize: 16,
            padding: "10px 28px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: 32,
            marginTop: 0,
            display: "block"
          }}
        >
          Back to Summary
        </button>
      </div>
    </div>
  );
};

// Styles
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

const filterInputStyle: React.CSSProperties = {
  width: 180,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#f8fafc",
  fontSize: 16,
  marginTop: 4,
};

const thStyle: React.CSSProperties = {
  padding: "16px 12px",
  fontWeight: 700,
  fontSize: 16,
  color: "#222",
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 12px",
  fontWeight: 500,
  fontSize: 15,
  color: "#222",
  background: "#fff",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

export default Transactions;