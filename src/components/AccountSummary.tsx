import React from "react";

const accountData = {
  balance: "$12,345.67",
  accounts: [
    { type: "Checking Account", number: "1234567890", balance: "$5,678.90" },
    { type: "Savings Account", number: "0987654321", balance: "$6,666.77" },
  ],
  creditCards: [
    {
      type: "Platinum Card",
      number: "**** **** **** 1234",
      limit: "$10,000",
      available: "$7,500",
    },
  ],
  fixedDeposits: [
    {
      type: "Fixed Deposit 1",
      number: "FD12345",
      amount: "$5,000",
      maturity: "2024-12-31",
    },
    {
      type: "Fixed Deposit 2",
      number: "FD67890",
      amount: "$10,000",
      maturity: "2025-06-30",
    },
  ],
};

interface AccountSummaryProps {
  onViewTransactions: () => void;
  onTransferMoney: () => void;
}

const iconStyle = {
  width: 36,
  height: 36,
  background: "#f3f4f6",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: 16,
  fontSize: 22,
};

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

const AccountSummary: React.FC<AccountSummaryProps> = ({
  onViewTransactions,
  onTransferMoney,
}) => (
  <>
    {/* Navigation Bar */}
    <nav
  style={{
    width: "100%",
    background: "#fff",
    borderBottom: "1px solidrgb(233, 233, 234)",
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
    <button style={navButtonStyle}>Home</button>
    <button style={navButtonStyle}>Services</button>
    <button style={navButtonStyle}>Loans</button>
    <button style={navButtonStyle}>Investment</button>
    <button style={navButtonStyle}>Profile</button>
    <button style={navButtonStyle}>About</button>
  </div>
</nav>

    {/* Main Content */}
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "40px 32px",
        background: "#f8fafc",
        borderRadius: 16,
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Account Summary</h1>
        <a
          href="#"
          style={{
            color: "#3b82f6",
            fontSize: 15,
            textDecoration: "underline",
            marginTop: 4,
            display: "inline-block",
          }}
        >
          View your account balances and recent transactions
        </a>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "#555", fontWeight: 500, fontSize: 18 }}>Total Balance</div>
        <div style={{ fontSize: 32, fontWeight: 700, margin: "8px 0 0 0" }}>
          {accountData.balance}
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Linked Accounts</div>
        {accountData.accounts.map((acc) => (
          <div
            key={acc.number}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              background: "#fff",
              borderRadius: 8,
              padding: "12px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            <div style={iconStyle}>🏦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{acc.type}</div>
              <div style={{ color: "#64748b", fontSize: 15 }}>
                Account Number: {acc.number}
              </div>
            </div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{acc.balance}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Credit Card</div>
        {accountData.creditCards.map((cc) => (
          <div
            key={cc.number}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              background: "#fff",
              borderRadius: 8,
              padding: "12px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            <div style={iconStyle}>
              <img
                src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                alt="card"
                style={{ width: 28, height: 28 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{cc.type}</div>
              <div style={{ color: "#64748b", fontSize: 15 }}>
                Card Number: {cc.number} | Credit Limit: {cc.limit} | Available: {cc.available}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 12 }}>Fixed Deposits</div>
        {accountData.fixedDeposits.map((fd) => (
          <div
            key={fd.number}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              background: "#fff",
              borderRadius: 8,
              padding: "12px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
            }}
          >
            <div style={iconStyle}>💲</div>
            <div>
              <div style={{ fontWeight: 600 }}>{fd.type}</div>
              <div style={{ color: "#64748b", fontSize: 15 }}>
                FD Number: {fd.number} | Amount: {fd.amount} | Maturity Date: {fd.maturity}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
        <button
          onClick={onViewTransactions}
          style={{
            flex: 1,
            background: "#e5e7eb",
            color: "#222",
            fontWeight: 600,
            fontSize: 16,
            padding: "14px 0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          View Recent Transactions
        </button>
        <button
          style={{
            flex: 1,
            background: "#f1f5f9",
            color: "#222",
            fontWeight: 600,
            fontSize: 16,
            padding: "14px 0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          Download Statement
        </button>
        <button
          onClick={onTransferMoney}
          style={{
            flex: 1,
            background: "#2196f3",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            padding: "14px 0",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          Transfer Money
        </button>
      </div>
    </div>
  </>
);

export default AccountSummary;