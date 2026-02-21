import React, { use, useEffect, useRef, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSun, faMoon, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../hooks/useAppContext";
import useTheme from "../hooks/useTheme";
import Nav from "./Nav";

export default function Header() {
   
    //Context
    const { globalMessage, setGlobalMessage, menu, setMenu, active, setActive, login, setLogin, headerHeight, setHeaderHeight }= useAppContext();
    const { theme, toggleTheme }= useTheme();

    const headerRef= useRef();

    useEffect(() => {
        const height= headerRef.current.offsetHeight;
        setHeaderHeight(height);
    }, []);

 return (
    <header ref={headerRef} className="bg-card/80 px-3 md:px-5 lg:px-10 py-1 h-15 flex justify-between items-center z-100 sticky top-0 left-0 tr border-b-2 border-border shadow-md">
      <div className="flex gap-1 items-end">
        <h2 className="header-logo text-shadow-lg/30">RD</h2>
        <div className="hidden md:block">
          <Nav />
        </div>
      </div>

      <div className="flex gap-3 items-center ">
        <button className={`bg-(--secondary) text-(--color) px-4 py-2 rounded-lg shadow hover:scale-104 transition duration-100 ${login ? "hidden" : "block"}`}><Link to="/login" className="text-(--color)">Login</Link></button>
        <div className={`w-px h-8 border border-(--color) rounded-2xl mx-px ${login ? "hidden" : "block"}`}></div>
      <div onClick={toggleTheme} className={`relative w-18.5 h-8.5 flex justify-between items-center rounded-2xl cursor-pointer bg-(--color) shadow-md shadow-gray-500 tr`}>
          <div className={`absolute top-[50%] text-center py-1 -translate-y-1/2 ${theme === "dark" ? "bg-[#222] shadow-sm shadow-white translate-x-11" : "bg-[#fff] shadow-sm shadow-white translate-x-0.5"} w-7 h-7 rounded-full tr box-shadow-[0px 0px 6px var(--primary)]`}>
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} className={`${theme === "dark" ? "text-[#A07CFE]" : "text-[#FF9900]"} text-shadow-[0px 0px 4px #E2E2E2] text-xl hover:scale-115 tr cursor-pointer `}/>
          </div>
          <FontAwesomeIcon icon={faSun} className="text-[#FF9900] text-lg mx-2 hover:scale-115 tr cursor-pointer" />
          <div className={`w-px h-7 border ${theme === "dark" ? "border-[#A07CFE]" : "border-[#FF9900]"}`}></div>
          <FontAwesomeIcon icon={faMoon} className="text-[#A07CFE] text-shadow-md text-shadow-[#0057FF] text-lg mx-2 hover:scale-115 tr cursor-pointer" />
        </div>
        <div className={`w-px h-8 border border-(--text-primary) rounded-2xl mx-px ${login ? "block" : "hidden"}`}></div>
        {/* <div className={`flex -space-x-1 overflow-hidden ${login ? "block" : "hidden"}`}>
          <Link to="/profile">
                      <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="inline-block size-9 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
          </Link>
        </div> */}
      {/* <div className="block lg:hidden text-(--color)" onClick={() => setMenu(true)}>
        <FontAwesomeIcon icon={faBars} size="xl" />
      </div> */}
      </div>
    </header>
 )
}