import { useEffect, useRef } from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../hooks/useAppContext";
import Nav from "./Nav";
import ThemeButton from "./ThemeButton";

export default function Header() {
  
    const { menu, setMenu, rightMenu, setRightMenu, login, setHeaderHeight }= useAppContext();    
    const headerRef= useRef<HTMLElement | null>(null);
    const location= useLocation();
    const isDocActive= location.pathname.startsWith('/doc');

    useEffect(() => {
        const height= headerRef.current?.offsetHeight || 0;
        setHeaderHeight(height);
    }, []);

 return (
    <header ref={headerRef} className="bg-soft/98 shadow-[0_1px_4px_var(--text-secondary)] px-3 md:px-6 lg:px-10 py-1 flex justify-between items-center z-100 sticky top-0 left-0 tr">
      {isDocActive && 
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

      <div className={`flex lg:flex-row ${isDocActive ? "flex-col items-center" : "flex-row items-end"} lg:gap-1 lg:items-end`}>
        <h2 className="header-logo text-shadow-lg/20">RD</h2>
        <p className="text-text-main font-serif text-base lg:text-sm -mt-4 lg:mt-0 lg:-ml-1 lg:mb-2">electronic!</p>
      </div>

      <div className="hidden lg:block">
          <Nav />
      </div>
        
      <div className="flex gap-4 items-center ">
        <button className={`bg-primary hidden lg:block px-4 py-2 rounded-lg shadow hover:bg-primary/80 transition duration-100 ${login ? "hidden" : "block"}`}>
            <Link to="/login" className="text-white font-serif font-semibold">
              Login
            </Link>
        </button>
        <div className={`w-px h-8 border hidden lg:block border-(--text-main) rounded-2xl mx-px ${login ? "hidden" : "block"}`}></div>

      <ThemeButton />
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