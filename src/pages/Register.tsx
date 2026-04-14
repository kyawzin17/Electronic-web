import React, { useRef } from "react";
import "./page.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.tsx";
import { motion } from "framer-motion";

export default function Register() {


    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const {setLogin, setGlobalMessage}= useAppContext();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name= nameRef.current?.value || "";
        const email= emailRef.current?.value || "";
        const password= passwordRef.current?.value || "";

        if (!name || !email || !password) {
            setGlobalMessage("name, email and password required!");
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
                className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <div className="w-100 h-auto pb-6 bg-[#111111] rounded-lg">
            <div className="register-image">
            </div>
            <div className="p-0 -mt-10 w-full text-center">
                <h1 className="text-4xl mb-2 font-bold">Sign up!</h1>
                <p className="text-lg text-gray-400 mb-2">Create Your Account!</p>
            </div>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <input type="text"
                            ref={nameRef}
                            placeholder="Name"
                            className="w-80 h-10 mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"/>
                <input type="text"
                            ref={emailRef}
                            placeholder="Email"
                            className="w-80 h-10 mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"/> 
                <input type="password"
                            ref={passwordRef}
                            placeholder="Password"
                            className="w-80 h-10 mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"/>
                <button type="submit"
                            className="w-80 h-10 bg-blue-600 rounded text-white font-bold hover:bg-blue-700 transition duration-300">
                            Register
                </button>
            </form>
            <div className="w-full flex justify-center items-center mt-4 mb-2">
                <div className="h-px bg-gray-500 w-[40%]"></div>
                <span className="text-gray-400 mx-2">OR</span>
                <div className="h-px bg-gray-500 w-[40%]"></div>
            </div>
            <div className="w-full mb-5">
                <div className="flex justify-center mb-3">
                    <button className="w-66 h-10 bg-red-600 rounded text-white font-bold hover:bg-red-700 transition duration-300">
                        Continue with Google
                    </button>
                </div>
                <div className="w-full text-center">
                    <p className="text-gray-400">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
                </div>
                </div>
        </div>
    </motion.div>
    )
}