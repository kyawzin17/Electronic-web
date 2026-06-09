import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

export default function PasswordFill() {
    
    const [password, setPassword] = useState<string>("");
    const { setUser, setLogin } = useAppContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Handle password submission logic here
            const passwordValue = password.trim();
            if (!passwordValue) {
                // Handle validation error
                alert("Please enter password");
                return;
            }
            // OTP submission logic
            const apiUrl = import.meta.env.VITE_API_URL + "http://localhost:3335";
            const response = await fetch(`${apiUrl}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: passwordValue }),
            });
            const data = await response.json();
            if (data.success) {
                // Handle success
                alert("Registration successful!");
                setUser(data.user || []);
                window.location.href = "/auth";
                setLogin(true);
            } else {
                // Handle error
                alert(data.message || "Registration failed");
            }
        };
    
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <h1 className="text-3xl font-bold">Password Fill</h1>
            <form className="mt-4" onSubmit={handleSubmit}>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                <button type="submit" className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Submit</button>
            </form>
        </div>
    )
}