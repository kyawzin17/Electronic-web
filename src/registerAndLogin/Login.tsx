import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../pages/page.css";
import { useAppContext } from "../hooks/useAppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import GoogleAuthButton from "./GoogleAuthButton";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setUser, setLogin }= useAppContext()
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        if (!email || !password) {
            // Handle validation errors
            alert("Please enter email and password");
            return;
        }

        // Login logic
        try {
            
            const response = await fetch("http://localhost:3335/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Store the token in localStorage
                console.log(data);
                setLogin(true);
                setUser(data.noPassword || []);
                navigate("/auth/profile");
            } else {
                console.error("Login failed");
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            // Handle login errors
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}  className="w-full h-screen flex flex-col justify-center items-center bg-bg px-12">

            <div className="w-100 h-auto pb-6 bg-card border-2 border-text-muted rounded-lg relative">
                <button onClick={() => navigate("/")} className="absolute top-1.5 left-0.5">
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='font-bold text-2xl md:text-3xl text-bg dark:text-text-secondary hover:-translate-y-1 hover:text-bg/90 dark:hover:text-text-main cursor-pointer duration-75' />
                </button>
                <div className="login-image">

                </div>
                <div className="p-0 -mt-8 mb-6 w-full text-center">
                    <h1 className="text-4xl mb-1 font-serif font-bold text-text-main text-shadow text-shadow-text-secondary">Login</h1>
                    <p className="text-md font-serif text-secondary">Welcome Back To RD Electronic!</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input type="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            id="email"
                            placeholder="Enter your email"
                            required
                            className="w-80 h-10 mb-4 p-2 rounded bg-transparent text-text-main border border-text-muted focus:outline-none focus:border-blue-500"/>
                    <input type="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            id="password" 
                            required
                            placeholder="Enter your password"
                            className="w-80 h-10 mb-4 p-2 rounded bg-transparent text-text-main border border-text-muted focus:outline-none focus:border-blue-500"/>
                    <div className="w-80 h-10 -mt-4 text-right">
                        <span className="text-text-muted text-sm">Forgot your password?</span>
                    </div>
                    <button type="submit"
                            className="w-80 h-10 mt-2 bg-primary/80 rounded text-text-main font-serif font-bold hover:bg-primary/90 transition duration-300">
                                Login
                    </button>
                </form>
                <GoogleAuthButton />
                <div className="w-full mb-5">
                    <div className="w-full text-center">
                        <p className="text-text-muted">Don't have an account? <Link to="/auth/register" className="text-blue-600 font-semibold hover:underline">Sign Up!</Link></p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}