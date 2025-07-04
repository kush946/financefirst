import React, { useState, useEffect, useRef } from 'react';

interface OTPPageProps {
    onSuccess: () => void;
}

const OTP_VALIDITY_SECONDS = 300; // 5 minutes
const RESEND_OTP_SECONDS = 120;   // 2 minutes

const OTPPage: React.FC<OTPPageProps> = ({ onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [otpTimer, setOtpTimer] = useState(OTP_VALIDITY_SECONDS);
    const [resendTimer, setResendTimer] = useState(RESEND_OTP_SECONDS);
    const [otpKey, setOtpKey] = useState(0); // to reset OTP input on resend

    const otpInterval = useRef<NodeJS.Timeout | null>(null);
    const resendInterval = useRef<NodeJS.Timeout | null>(null);

    // OTP validity timer
    useEffect(() => {
        if (otpTimer <= 0) return;
        otpInterval.current = setInterval(() => {
            setOtpTimer((t) => t - 1);
        }, 1000);
        return () => {
            if (otpInterval.current) clearInterval(otpInterval.current);
        };
    }, [otpTimer]);

    // Resend OTP timer
    useEffect(() => {
        if (resendTimer <= 0) return;
        resendInterval.current = setInterval(() => {
            setResendTimer((t) => t - 1);
        }, 1000);
        return () => {
            if (resendInterval.current) clearInterval(resendInterval.current);
        };
    }, [resendTimer]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (otpInterval.current) clearInterval(otpInterval.current);
            if (resendInterval.current) clearInterval(resendInterval.current);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otpTimer <= 0) {
            setMessage('OTP expired. Please resend OTP.');
            return;
        }
        if (otp === '1234') {
            setMessage('Login successful!');
            setTimeout(onSuccess, 800); // short delay to show message
        } else {
            setMessage('Login unsuccessful. Please try again.');
        }
    };

    const handleResend = () => {
        setOtp('');
        setMessage('A new OTP has been sent.');
        setOtpTimer(OTP_VALIDITY_SECONDS);
        setResendTimer(RESEND_OTP_SECONDS);
        setOtpKey((k) => k + 1); // reset input
    };

    // Helper to format seconds as mm:ss
    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
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
            </nav>

            {/* Greeting Section */}
            <div style={{ maxWidth: 500, margin: "100px auto 0 auto", textAlign: "center" }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, fontFamily: "Inter, Arial, sans-serif" }}>
                    Hello Kush! Please enter your 4-digit OTP
                </h1>
                <p style={{ fontSize: 18, color: "#64748b", marginBottom: 40, fontFamily: "Inter, Arial, sans-serif" }}>
                    We've sent a One Time Password to your registered mobile number/email id.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        key={otpKey}
                        type="password"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        style={inputStyle}
                        maxLength={4}
                        required
                        disabled={otpTimer <= 0}
                    />
                    <div style={{ marginBottom: 12, marginTop: -8, color: "#888", fontSize: 15 }}>
                        OTP valid for: <span style={{ color: otpTimer <= 20 ? "#d32f2f" : "#222", fontWeight: 600 }}>{formatTime(otpTimer)}</span>
                    </div>
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
                            cursor: otpTimer > 0 ? "pointer" : "not-allowed",
                            margin: "0 auto",
                            display: "block",
                            marginBottom: 16,
                            fontFamily: "Inter, Arial, sans-serif",
                            opacity: otpTimer > 0 ? 1 : 0.6,
                        }}
                        disabled={otpTimer <= 0}
                    >
                        Submit
                    </button>
                </form>
                <div style={{ marginBottom: 16 }}>
                    {resendTimer > 0 ? (
                        <span style={{ color: "#888", fontSize: 15 }}>
                            Resend OTP in <span style={{ fontWeight: 600 }}>{formatTime(resendTimer)}</span>
                        </span>
                    ) : (
                        <button
                            onClick={handleResend}
                            style={{
                                background: "#2196f3",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: 15,
                                padding: "8px 24px",
                                border: "none",
                                borderRadius: 16,
                                cursor: "pointer",
                                fontFamily: "Inter, Arial, sans-serif",
                            }}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>
                {message && (
                    <p
                        style={{
                            color:
                                message === "Login successful!"
                                    ? "#4caf50"
                                    : message === "A new OTP has been sent."
                                    ? "#388e3c"
                                    : "#d32f2f",
                            textAlign: "center",
                            marginTop: 8,
                            fontWeight: 500,
                            fontSize: 16,
                            fontFamily: "Inter, Arial, sans-serif",
                        }}
                    >
                        {message}
                    </p>
                )}
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

export default OTPPage;