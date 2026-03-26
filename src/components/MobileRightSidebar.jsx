import { useAppContext } from "../hooks/useAppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function MobileRightSidebar() {
    const { rightMenu, setRightMenu, active, setActive, login, setLogin } = useAppContext();

    // Lock body scroll when right menu is open
    useEffect(() => {
        if (rightMenu) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [rightMenu]);

    // Lock body scroll when right menu is open
    useEffect(() => {
        if (rightMenu) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [rightMenu]);

    return (
            <div className={`fixed inset-0 z-101 lg:hidden ${rightMenu ? 'block' : 'hidden'}`}>
                {/* Backdrop that prevents all background interaction */}
                <div 
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${rightMenu ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setRightMenu(false)}
                ></div>
                
                {/* Menu panel */}
                <div className={`absolute right-0 top-0 h-full w-80 bg-soft shadow-lg transform transition-transform duration-300 ${rightMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4 border-b border-border">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-text-main">Menu & TOC</h3>
                            <button 
                                onClick={() => setRightMenu(false)}
                                className="p-2 rounded-md hover:bg-border transition-colors"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-text-main" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
                        {/* Navigation Menu */}
                        <div className="mb-6">
                            <h4 className="text-sm font-bold text-text-main uppercase tracking-widest mb-3">Navigation</h4>
                            <nav className="flex flex-col gap-2">
                                <Link 
                                    to="/" 
                                    onClick={() => {
                                        setRightMenu(false);
                                        setActive("home")
                                    }}
                                    className={`px-3 py-2 rounded-md transition-all ${active === "home" ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                                >
                                    Home
                                </Link>
                                <Link 
                                    to="/about" 
                                    onClick={() => {
                                        setRightMenu(false);
                                        setActive("about")
                                    }}
                                    className={`px-3 py-2 rounded-md transition-all ${active === "about" ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                                >
                                    About
                                </Link>
                                <Link 
                                    to="/doc/components" 
                                    onClick={() => {
                                        setRightMenu(false);
                                        setActive("doc")
                                    }}
                                    className={`px-3 py-2 rounded-md transition-all ${active === "doc" ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                                >
                                    Documentation
                                </Link>
                                <Link 
                                    to="/project" 
                                    onClick={() => {
                                        setRightMenu(false)
                                        setActive("project")
                                    }}
                                    className={`px-3 py-2 rounded-md transition-all ${active === "project" ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                                >
                                    Projects
                                </Link>
                            </nav>
                        </div>

                        {/* Table of Contents
                        {headings.length > 0 && (
                            <div>
                                <h4 className="text-sm font-bold text-text-main uppercase tracking-widest mb-3">On this page</h4>
                                <nav>
                                    <ul className="space-y-2 text-sm border-l border-slate-200 dark:border-slate-800">
                                        {headings.map((heading) => (
                                            <li key={heading.id}>
                                                <a
                                                    href={`#${heading.id}`}
                                                    onClick={() => setRightMenu(false)}
                                                    className="block pl-4 -ml-px border-l-2 border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-all duration-200 hover:border-purple-500"
                                                >
                                                    {heading.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        )} */}

                        {/* Login/Profile Section */}
                        <div className="mt-6 pt-4 border-t border-border">
                            {!login ? (
                                <Link 
                                    to="/login" 
                                    onClick={() => setRightMenu(false)}
                                    className="w-full bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary/80 transition duration-100 font-serif font-semibold text-center block"
                                >
                                    Login
                                </Link>
                            ) : (
                                <div className="text-center text-text-secondary">
                                    <p className="text-sm">Welcome back!</p>
                                    <button 
                                        onClick={() => {
                                            setLogin(false);
                                            setRightMenu(false);
                                        }}
                                        className="text-sm text-red-500 hover:text-red-600 mt-1"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
    )
}