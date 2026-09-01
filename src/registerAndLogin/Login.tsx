import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../pages/page.css";
import { useAppContext } from "../hooks/useAppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import GoogleAuthButton from "./GoogleAuthButton";
import { toast } from "react-hot-toast";



export default function Login() {
    const navigate = useNavigate();
    const api=import.meta.env.VITE_API_URL_PRODUCTION;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setUser, setLogin }= useAppContext()
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        if (!email || !password) {
            // Handle validation errors
            toast.error("Please enter email and password", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
            
            return;
        }

        // Login logic
        try {
            
            const response = await fetch(`${api}/login`, {
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
                toast.success(data.message || "Login successful", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
                setUser(data.noPassword || []);
                navigate("/");
            } else {
                toast.error("Login failed", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
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
            transition={{ duration: 0.5 }}  
            className="w-full min-h-screen flex flex-col font-mono justify-center items-center px-4 sm:px-12"
        >
            {/* Card Container (w-100 အစား max-w-md နဲ့ overflow-hidden သုံးထားပါတယ်) */}
            <div className="w-full max-w-md h-auto pb-8 bg-card/80 backdrop-blur-md border border-text-muted/30 rounded-2xl relative overflow-hidden shadow-2xl">
                
                {/* Back Button */}
                <button onClick={() => navigate("/")} className="absolute top-3 left-3 z-10">
                    <FontAwesomeIcon 
                        icon={faCircleArrowLeft} 
                        className='font-bold text-2xl md:text-3xl text-white/80 hover:text-white drop-shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer' 
                    />
                </button>
                
                {/* Image Section */}
                <div className="login-image w-full h-40 sm:h-48 bg-cover bg-center">
                    {/* CSS မှာ .login-image background ပေးထားတယ်လို့ ယူဆပါတယ် */}
                    <div className="w-full h-full bg-linear-to-t from-card/90 to-transparent"></div>
                </div>

                {/* Header Section */}
                <div className="px-8 pt-2 mb-6 w-full text-center">
                    <h1 className="text-4xl mb-2 font-bold text-text-main tracking-wider drop-shadow-lg">Login</h1>
                    <p className="text-sm font-medium text-secondary">Welcome Back To RD Electronic!</p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="flex flex-col items-center px-8">
                    
                    <input 
                        type="email"
                        value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                        id="email"
                        placeholder="Enter your email"
                        required
                        className="w-full h-11 mb-4 px-4 rounded-lg bg-bg/50 text-text-main border border-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200"
                    />
                    
                    <input 
                        type="password"
                        value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                        id="password" 
                        required
                        placeholder="Enter your password"
                        className="w-full h-11 mb-2 px-4 rounded-lg bg-bg/50 text-text-main border border-text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200"
                    />
                    
                    <div className="w-full flex justify-end mb-5">
                        <span className="text-text-muted text-xs sm:text-sm hover:text-primary transition-colors cursor-pointer">
                            Forgot your password?
                        </span>
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full h-11 bg-primary rounded-lg text-white font-bold tracking-wide hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                {/* Google Auth & Divider */}
                <div className="px-8 mt-6">
                    {/* <GoogleAuthButton /> ထဲမှာ Divider ပါပြီးသားဆိုရင် ဒီအတိုင်းထားပါ။ 
                        မပါဘူးဆိုရင် အောက်ကလို Divider လေးထည့်ပေးပါ။ */}
                    {/* <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-text-muted/30"></div>
                        <span className="px-3 text-text-muted text-sm">Or continue with</span>
                        <div className="flex-grow border-t border-text-muted/30"></div>
                    </div> */}
                    <GoogleAuthButton />
                </div>

                {/* Footer Link */}
                <div className="w-full mt-6 text-center">
                    <p className="text-text-muted text-sm">
                        Don't have an account? <Link to="/auth/register" className="text-secondary font-semibold hover:text-primary hover:underline transition-colors">Sign Up!</Link>
                    </p>
                </div>

            </div>
        </motion.div>
    )
}