import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import OTPPage from "./components/OTPPage";
import AccountSummary from "./components/AccountSummary";
import Transactions from "./components/Transactions";
import TransferMoney from "./components/TransferMoney";

const CORRECT_ACCOUNT = "1234567890";
const CORRECT_PASSWORD = "12345";
const CORRECT_OTP = "1234";

function App() {
  const [step, setStep] = useState<"login" | "otp" | "summary" | "transactions" | "transfer" | "fail">("login");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = (acc: string, pass: string) => {
    setAccount(acc);
    setPassword(pass);
    if (acc === CORRECT_ACCOUNT && pass === CORRECT_PASSWORD) {
      setStep("otp");
    } else {
      setStep("fail");
    }
  };

  const handleOtp = (enteredOtp: string) => {
    setOtp(enteredOtp);
    if (enteredOtp === CORRECT_OTP) {
      setStep("summary");
    } else {
      setStep("fail");
    }
  };

  const handleRetry = () => {
    setStep("login");
    setAccount("");
    setPassword("");
    setOtp("");
  };

  return (
    <>
      {step === "login" && (
        <LoginPage onLogin={handleLogin} />
      )}
      {step === "otp" && (
        <OTPPage onSuccess={() => setStep("summary")} />
      )}
      {step === "summary" && (
        <AccountSummary
          onViewTransactions={() => setStep("transactions")}
          onTransferMoney={() => setStep("transfer")}
        />
      )}
      {step === "transactions" && (
        <Transactions onBack={() => setStep("summary")} />
      )}
      {step === "transfer" && (
        <TransferMoney onBack={() => setStep("summary")} />
      )}
      {step === "fail" && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      height: "100vh",
      width: "100vw",
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
      <h2 style={{ color: "red", textAlign: "center", marginBottom: 24 }}>Unsuccessful Login</h2>
      <button
        onClick={handleRetry}
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
        }}
      >
        Try Again
      </button>
    </div>
  </div>
)}
    </>
  );
}

export default App;