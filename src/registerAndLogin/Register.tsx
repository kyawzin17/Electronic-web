import React, { useState } from "react";
import "../pages/page.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.tsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton.tsx";
import { toast } from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();
     const api=import.meta.env.VITE_API_URL_PRODUCTION;


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
            const response = await fetch(`${api}/otp`, {
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
                 toast.error('Register failed!', {
                    duration: 4000, 
                    style: {
                        fontFamily: 'sans-serif',
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                    },
                    });
                return false;
            }

            const data= await response.json();
            setGlobalMessage("Register success!");
             toast.success(data.message || 'Register success!', {
                duration: 4000, 
                style: {
                    fontFamily: 'sans-serif',
                    borderRadius: '12px',
                    background: '#333',
                    color: '#fff',
                },
                });
            localStorage.setItem("otpEmail", data?.email || '');
            navigate("/auth/otp-fill", {state: {email: email, name: name}});
            setLogin(true);
        } catch (error) {
            console.error("Register error:", error);
            // Handle register errors
            toast.error('Register failed!', {
                duration: 4000, 
                style: {
                    fontFamily: 'sans-serif',
                    borderRadius: '12px',
                    background: '#333',
                    color: '#fff',
                },
                });
            return false;
        }
        setGlobalMessage("");
        setLogin(true);
    }
           
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-12"
        >
            <div className="w-full max-w-md h-auto pb-8 bg-card/80 backdrop-blur-md border border-text-muted/30 rounded-2xl relative overflow-hidden shadow-2xl">
                
                {/* Back Button */}
                <button onClick={() => navigate("/")} className="absolute top-3 left-3 z-10">
                    <FontAwesomeIcon 
                        icon={faCircleArrowLeft} 
                        className='font-bold text-2xl md:text-3xl text-white/80 hover:text-white drop-shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer' 
                    />
                </button>
                
                {/* Image Section */}
                <div className="register-image w-full h-40 sm:h-48 bg-cover bg-center">
                    {/* CSS မှာ .register-image background ပေးထားတယ်လို့ ယူဆပါတယ် */}
                    <div className="w-full h-full bg-linear-to-t from-card/90 to-transparent"></div>
                </div>

                {/* Header Section */}
                <div className="px-8 pt-2 mb-6 w-full text-center">
                    <h1 className="text-4xl mb-2 font-bold text-text-main tracking-wider drop-shadow-lg">Register!</h1>
                    <p className="text-sm font-medium text-secondary">Create Your Account!</p>
                </div>

                {/* Form Section */}
                <form className="flex flex-col items-center px-8" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter your full name..."
                        required
                        className="w-full h-11 mb-4 px-4 rounded-lg bg-bg/50 text-text-main border border-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200"
                    />
                    
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email..."
                        required
                        className="w-full h-11 mb-4 px-4 rounded-lg bg-bg/50 text-text-main border border-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200"
                    /> 
                    
                    <button 
                        type="submit"
                        disabled={!name || !email}
                        className="w-full h-11 mt-2 bg-primary rounded-lg text-white font-bold tracking-wide hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                        Register
                    </button>
                </form>

                {/* Google Auth */}
                <div className="px-8 mt-6">
                    <GoogleAuthButton />
                </div>
                
                {/* Footer Link */}
                <div className="w-full mt-6 text-center">
                    <p className="text-text-muted text-sm">
                        Already have an account? <Link to="/auth/login" className="text-secondary font-semibold hover:text-primary hover:underline transition-colors">Login</Link>
                    </p>
                </div>

            </div>
        </motion.div>
    )
}