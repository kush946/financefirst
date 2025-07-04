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
  fontSize: 16,
  fontFamily: "Roboto, Arial, sans-serif", // changed font
};

const navButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#222",
  fontWeight: 600,
  fontSize: 14,
  margin: "0 16px",
  cursor: "pointer",
  padding: "8px 0",
  borderRadius: 4,
  transition: "background 0.2s",
  fontFamily: "Roboto, Arial, sans-serif", // changed font
};

const menuSidebarStyle: React.CSSProperties = {
  width: 220,
  minHeight: "calc(100vh - 64px)",
  background: "#fff",
  borderRight: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "24px 0 0 0",
  fontFamily: "Roboto, Arial, sans-serif", // changed font
};

const menuItemStyle: React.CSSProperties = {
  width: "100%",
  background: "none",
  border: "none",
  color: "#222",
  fontWeight: 600,
  fontSize: 15,
  padding: "14px 32px",
  borderRadius: 0,
  cursor: "pointer",
  marginBottom: 4,
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  gap: 14,
  transition: "background 0.15s",
  fontFamily: "Roboto, Arial, sans-serif", // changed font
};

const menuItemActiveStyle: React.CSSProperties = {
  ...menuItemStyle,
  background: "#f3f4f6",
  color: "#2196f3",
  borderLeft: "4px solid #2196f3",
  fontWeight: 700,
};

// Utility to generate dummy statement data for 1 year
const generateStatementData = () => {
  const data = [];
  const today = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    data.push({
      month: d.toLocaleString("default", { month: "long", year: "numeric" }),
      credits: (Math.random() * 5000 + 1000).toFixed(2),
      debits: (Math.random() * 4000 + 500).toFixed(2),
      closingBalance: (Math.random() * 10000 + 2000).toFixed(2),
    });
  }
  return data;
};

// Download as Excel (CSV)
function downloadExcel() {
  const data = generateStatementData();
  const header = "Month,Credits,Debits,Closing Balance\n";
  const rows = data
    .map(
      (row) =>
        `${row.month},${row.credits},${row.debits},${row.closingBalance}`
    )
    .join("\n");
  const csv = header + rows;
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "statement.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// Download as PDF (simple table using jsPDF)
function downloadPDF() {
  // Only import jsPDF if user clicks PDF
  import("jspdf").then(({ jsPDF }) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Account Statement (Past 1 Year)", 14, 16);
    doc.setFont("helvetica", "normal");
    const data = generateStatementData();
    let y = 28;
    doc.setFontSize(12);
    doc.text("Month", 14, y);
    doc.text("Credits", 64, y);
    doc.text("Debits", 104, y);
    doc.text("Closing Balance", 144, y);
    y += 8;
    data.forEach((row) => {
      doc.text(row.month, 14, y);
      doc.text(row.credits, 64, y);
      doc.text(row.debits, 104, y);
      doc.text(row.closingBalance, 144, y);
      y += 8;
    });
    doc.save("statement.pdf");
  });
}

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
        borderBottom: "1px solid rgb(233, 233, 234)",
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
      <div style={{ fontWeight: 700, fontSize: 20, color: "#222", fontFamily: "Inter, Arial, sans-serif" }}>
        Finance First Bank
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button style={navButtonStyle}>Home</button>
        <button style={navButtonStyle}>Services</button>
        <button style={navButtonStyle}>Loans</button>
        <button style={navButtonStyle}>Investment</button>
        <button style={navButtonStyle}>Profile</button>
        <button style={navButtonStyle}>About us</button>
      </div>
    </nav>

    {/* Main Layout */}
    <div
      style={{
        display: "flex",
        maxWidth: 1100,
        margin: "1 auto 40px auto",
        fontFamily: "Inter, Arial, sans-serif",
        alignItems: "flex-start",
      }}
    >
      {/* Sidebar Menu */}
      <aside style={{ ...menuSidebarStyle, width: 200, padding: "24px 0 0 0" }}>
        <button style={{ ...menuItemActiveStyle, borderLeft: "4px solid #2196f3", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginBottom: 10, marginLeft: 0 }}>
          <span>🏠</span> Dashboard
        </button>
        <div style={{ marginTop: 32, width: "100%" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 8, fontWeight: 600, paddingLeft: 32 }}>
            QUICK LINKS
          </div>
          <button
            onClick={onViewTransactions}
            style={{
              ...menuItemStyle,
              fontSize: 14,
              padding: "14px 32px",
              marginBottom: 10,
              background: "none",
              color: "#222",
              borderLeft: "4px solid transparent",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span>🧾</span> View Recent Transactions
          </button>
          <button
            onClick={() => {
              // Show download options
              const format = window.prompt(
                "Download statement for past 1 year as:\nType 'excel' or 'pdf'",
                "excel"
              );
              if (!format) return;
              if (format.toLowerCase() === "excel") downloadExcel();
              else if (format.toLowerCase() === "pdf") downloadPDF();
              else alert("Invalid format. Please type 'excel' or 'pdf'.");
            }}
            style={{
              ...menuItemStyle,
              fontSize: 14,
              padding: "14px 32px",
              marginBottom: 10,
              background: "none",
              color: "#222",
              borderLeft: "4px solid transparent",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span>⬇️</span> Download Statement
          </button>
          <button
            onClick={onTransferMoney}
            style={{
              ...menuItemStyle,
              fontSize: 14,
              padding: "14px 32px",
              marginBottom: 10,
              background: "none",
              color: "#222",
              borderLeft: "4px solid transparent",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span>💸</span> Transfer Money
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Greeting Section */}
        <div style={{ maxWidth: 700, margin: "32px auto 0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, fontFamily: "Inter, Arial, sans-serif" }}>
            Hello Kush! 👋
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", marginBottom: 24, fontFamily: "Inter, Arial, sans-serif" }}>
            Welcome back to FinanceFirst. Here’s a summary of your accounts.
          </p>
        </div>

        {/* Account Summary Content */}
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "32px 24px",
            background: "#f8fafc",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0, 0, 0, 0.04)",
            fontFamily: "Roboto, Arial, sans-serif", // changed font
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: "#555", fontWeight: 500, fontSize: 16, fontFamily: "Inter, Arial, sans-serif" }}>Total Balance</div>
            <div style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 0 0", fontFamily: "Inter, Arial, sans-serif" }}>
              {accountData.balance}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, fontFamily: "Inter, Arial, sans-serif" }}>Linked Accounts</div>
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
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                <div style={iconStyle}>🏦</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontFamily: "Inter, Arial, sans-serif", marginBottom: 8 }}>{acc.type}</div>
                  <div style={{ color: "#64748b", fontSize: 15, fontFamily: "Inter, Arial, sans-serif" }}>
                    Account Number: {acc.number}
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 16, fontFamily: "Inter, Arial, sans-serif" }}>{acc.balance}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, fontFamily: "Inter, Arial, sans-serif" }}>Credit Card</div>
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
                  fontFamily: "Inter, Arial, sans-serif",
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
                  <div style={{ fontWeight: 600, fontFamily: "Inter, Arial, sans-serif", marginBottom: 8 }}>{cc.type}</div>
                  <div style={{ color: "#64748b", fontSize: 15, fontFamily: "Inter, Arial, sans-serif" }}>
                    Card Number: {cc.number} | Credit Limit: {cc.limit} | Available: {cc.available}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, fontFamily: "Inter, Arial, sans-serif" }}>Fixed Deposits</div>
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
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                <div style={iconStyle}>💲</div>
                <div>
                  <div style={{ fontWeight: 600, fontFamily: "Inter, Arial, sans-serif", marginBottom: 8}}>{fd.type}</div>
                  <div style={{ color: "#64748b", fontSize: 15, fontFamily: "Inter, Arial, sans-serif" }}>
                    FD Number: {fd.number} | Amount: {fd.amount} | Maturity Date: {fd.maturity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

export default AccountSummary;