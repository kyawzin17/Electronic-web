import React, { useState } from "react";
import "../pages/page.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.tsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton.tsx";
export default function Register() {
    const navigate = useNavigate();


    const [name, setName]= useState<string>("");
    const [email, setEmail]= useState<string>("");
    const {setLogin, setGlobalMessage}= useAppContext();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            setGlobalMessage("name, email required!");
            return false;
        }
        try {
            const response = await fetch("http://localhost:3335/api/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email
                }),
            });

            if (!response.ok) {
                setGlobalMessage("Register failed!");
                return false;
            }

            const data= await response.json();
            setGlobalMessage("Register success!");
            localStorage.setItem("otpEmail", data?.email || '');
            navigate("/auth/otp-fill", {state: {email: email, name: name}});
            setLogin(true);
        } catch (error) {
            console.error("Register error:", error);
            // Handle register errors
        }
        setGlobalMessage("");
        setLogin(true);
    }
           
    return (
        <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-screen flex flex-col justify-center items-center bg-bg">

        <div className="w-100 h-auto pb-6 bg-card border-2 border-text-muted rounded-lg relative">
            <button onClick={() => navigate("/")} className="absolute top-1.5 left-0.5">
                <FontAwesomeIcon icon={faCircleArrowLeft} className='font-bold text-2xl md:text-3xl text-bg dark:text-text-secondary hover:-translate-y-1 hover:text-bg/90 dark:hover:text-text-main cursor-pointer duration-75' />
            </button>
            <div className="register-image">
            </div>
            <div className="p-0 -mt-9 w-full text-center mb-6">
                <h1 className="text-4xl mb-1 font-serif font-bold text-text-main text-shadow text-shadow-text-secondary">Register!</h1>
                <p className="text-md font-serif text-secondary">Create Your Account!</p>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter your full name..."
                        required
                        className="w-80 h-10 mb-4 p-2 rounded bg-transparent text-text-main border border-text-muted focus:outline-none focus:border-blue-500"/>
                <input type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email..."
                        required
                        className="w-80 h-10 mb-4 p-2 rounded bg-transparent text-text-main border border-text-muted focus:outline-none focus:border-blue-500"/> 
                <button type="submit"
                            disabled={!name || !email}
                            className="w-80 h-10 mt-2 bg-primary/80 rounded text-text-main font-serif font-bold hover:bg-primary/90 transition duration-300">
                            Register
                </button>
            </form>

            <div className="w-full mb-5">
                <GoogleAuthButton />
                <div className="w-full text-center">
                    <p className="text-text-muted">Already have an account? <Link to="/auth" className="text-blue-600 font-semibold hover:underline">Login</Link></p>
                </div>
                </div>
        </div>
    </motion.div>
    )
}