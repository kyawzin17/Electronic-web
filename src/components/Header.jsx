import React, { use, useEffect, useRef, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSun, faMoon, faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../hooks/useAppContext";
import useTheme from "../hooks/useTheme";
import Nav from "./Nav";
import ThemeButton from "./ThemeButton";

export default function Header() {
   
    //Context
    const { globalMessage, setGlobalMessage, menu, setMenu, rightMenu, setRightMenu, active, setActive, login, setLogin, headerHeight, setHeaderHeight }= useAppContext();
    const { theme, toggleTheme }= useTheme();

    const headerRef= useRef();

    useEffect(() => {
        const height= headerRef.current.offsetHeight;
        setHeaderHeight(height);
    }, []);

 return (
    <header ref={headerRef} className="bg-soft/98 shadow-[0_1px_4px_var(--text-secondary)] px-3 md:px-6 lg:px-10 py-1 flex justify-between items-center z-100 sticky top-0 left-0 tr">
      {active === "doc" && 
      <button
       className="cursor-pointer block lg:hidden"
       onClick={
        () => {
          setMenu(!menu);
          setRightMenu(false);
       }}>
        <FontAwesomeIcon icon={faBars} size="xl"></FontAwesomeIcon>
      </button>
      }

      <div className={`flex lg:flex-row ${active === "doc" ? "flex-col items-center" : "flex-row items-end"} lg:gap-1 lg:items-end`}>
        <h2 className="header-logo text-shadow-lg/20">RD</h2>
        <p className="text-text-main font-serif text-base lg:text-sm -mt-4 lg:mt-0 lg:-ml-1 lg:mb-2">electronic!</p>
      </div>

      <div className="hidden lg:block">
          <Nav />
      </div>
        
      <div className="flex gap-4 items-center ">
        <button className={`bg-primary hidden lg:block px-4 py-2 rounded-lg shadow hover:bg-primary/80 transition duration-100 ${login ? "hidden" : "block"}`}><Link to="/login" className="text-white font-serif font-semibold">Login</Link></button>
        <div className={`w-px h-8 border hidden lg:block border-(--text-main) rounded-2xl mx-px ${login ? "hidden" : "block"}`}></div>

      <ThemeButton />
      {/* <div onClick={toggleTheme} className={`relative w-18.5 h-8.5 hidden lg:flex justify-between items-center rounded-2xl cursor-pointer bg-(--color) shadow-md shadow-gray-500 tr`}>
          <div className={`absolute top-[50%] text-center py-[3px] -translate-y-1/2 ${theme === "dark" ? "translate-x-11 border-primary shadow-[0_0_10px_var(--primary)]" : "translate-x-0.5 border-[#FF9900] shadow-[0_0_10px_var(--warning)]"} w-8 h-8 rounded-full tr border-3 bg-bg`}>
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} className={`${theme === "dark" ? "text-[#A07CFE]" : "text-[#FF9900]"} text-shadow-[0px 0px 4px #E2E2E2] text-xl hover:scale-115 tr cursor-pointer `}/>
          </div>
          <FontAwesomeIcon icon={faSun} className="text-[#FF9900] text-lg mx-2 hover:scale-115 tr cursor-pointer" />
          <div className={`w-px h-7 border ${theme === "dark" ? "border-[#A07CFE]" : "border-[#FF9900]"}`}></div>
          <FontAwesomeIcon icon={faMoon} className="text-[#A07CFE] text-shadow-md text-shadow-[#0057FF] text-lg mx-2 hover:scale-115 tr cursor-pointer" />
        </div> */}
        <div className={`w-px h-8 font-semibold font-serif border border-(--text-primary) rounded-2xl mx-px ${login ? "block" : "hidden"}`}></div>

        <button 
          className="cursor-pointer block lg:hidden"
          onClick={() => {
            setRightMenu(!rightMenu);
            setMenu(false);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} size="xl" className="text-text-main" />
        </button>
      </div>
    </header>
 )
}