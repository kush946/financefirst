import React, { useState } from 'react';

interface OTPPageProps {
    onSuccess: () => void;
}

const OTPPage: React.FC<OTPPageProps> = ({ onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '1234') {
            setMessage('Login successful!');
            setTimeout(onSuccess, 800); // short delay to show message
        } else {
            setMessage('Login unsuccessful. Please try again.');
        }
    };

    return (
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
                <h2
                    style={{
                        color: "#fff",
                        textAlign: "center",
                        marginBottom: 32,
                        fontWeight: 700,
                        fontSize: 28,
                    }}
                >
                    OTP Verification
                </h2>
                <form onSubmit={handleSubmit}>
                    <label style={{ color: "#ccc", fontSize: 18, fontWeight: 500 }}>Enter OTP</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
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
                        maxLength={4}
                        required
                    />
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
                        Submit
                    </button>
                </form>
                {message && (
                    <p style={{
                        color: message.includes('successful') ? "#4caf50" : "#f44336",
                        textAlign: "center",
                        marginTop: 16,
                        fontWeight: 500,
                        fontSize: 16,
                    }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default OTPPage;