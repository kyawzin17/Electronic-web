import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./page.css";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const loginSummit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <div className="w-100 h-auto pb-6 bg-[#111111] rounded-lg">
            <div className="login-image">

            </div>
            <div className="p-0 -mt-10 w-full text-center">
                <h1 className="text-4xl mb-2 font-bold">Login</h1>
                <p className="text-lg text-gray-400 mb-2">Welcome Back to TechZone!</p>
            </div>
            <form onSubmit={loginSummit} className="flex flex-col items-center">
                <input type="text"
                        ref={emailRef}
                         placeholder="Email or Phone"
                          className="w-80 h-10 mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"/>
                <input type="password"
                        ref={passwordRef}
                         placeholder="Password"
                          className="w-80 h-10 mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"/>
                <div className="w-80 h-10 -mt-4 text-right">
                    <span className="text-gray-400 text-sm">Forgot your password?</span>
                </div>
                <button type="submit"
                         className="w-80 h-10 bg-blue-600 rounded text-white font-bold hover:bg-blue-700 transition duration-300">
                            Login
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
                    <p className="text-gray-400">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </div>
    </div>
    )
}