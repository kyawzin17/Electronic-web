import React, { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

const OtpFill = () => {
    const [otp, setOtp] = useState("");
    const { setUser }= useAppContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle OTP submission logic here
        const loginEmail = localStorage.getItem("otpEmail");
        if (!loginEmail) {
            // Handle error
            return;
        }
        const otpValue = otp.trim();
        if (!otpValue) {
            // Handle validation error
            alert("Please enter OTP");
            return;
        }
        // OTP submission logic
        const apiUrl = import.meta.env.VITE_API_URL + "http://localhost:3335";
        const response = await fetch(`${apiUrl}/api/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp: otpValue, email: loginEmail }),
        });
        const data = await response.json();
        if (data.success) {
            // Handle success
            alert("OTP verification successful!");
            setUser(data.user || []);
            window.location.href = "/password-fill";
            localStorage.removeItem("otpEmail");
        } else {
            // Handle error
            alert(data.message || "OTP verification failed");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">OTP Fill</h1>
            <form className="mt-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="submit" className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Submit</button>
            </form>
        </div>
    )
}

export default OtpFill;