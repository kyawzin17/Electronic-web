import { useEffect, useRef, useState } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../headers/MainSearchBar";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faBars, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../hooks/useAppContext";
import Nav from "../headers/Nav";
import ThemeButton from "../headers/ThemeButton";

export default function Header() {
  
   const navigate= useNavigate();
    const { menu, setMenu, rightMenu, setRightMenu, login, user, setHeaderHeight }= useAppContext();    
    const headerRef= useRef<HTMLElement | null>(null);
    const location= useLocation();
    const isDocActive= location.pathname.startsWith('/doc');
    const [ scrollHeader, setHeaderScroll ]= useState<boolean>(false);

    useEffect(() => {
        const height= headerRef.current?.offsetHeight || 0;
        setHeaderHeight(height);

        const handleScroll= () => { 
          if (window.scrollY > 10) {
            setHeaderScroll(true);
          } else {
            setHeaderScroll(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
    }, []);

 return (
    <header ref={headerRef} className="px-3 border-b border-text-main/10 md:px-6 lg:px-10 py-2 flex justify-between items-center z-100 sticky top-0 left-0 transition duration-100 backdrop-blur-md">
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

      <div className="flex gap-8 items-end">
        <div onClick={() => navigate("/")} className="w-18 lg:w-18 overflow-visible" >
          <img src="/RDE-logo.svg" alt="Logo" className="w-full h-full object-cover object-center" />
          {/* <h2 className="header-logo text-shadow-lg/20">RD</h2>
          <p className="text-text-main font-serif text-base lg:text-sm -mt-4 lg:mt-0 lg:-ml-1 lg:mb-2">electronic!</p> */}
        </div>

        <div className="hidden lg:block">
            <Nav />
        </div>
      </div>
        
      <div className="flex gap-4 items-center ">
        <SearchBar />
        { login ?
              <Link to="/auth/profile">
                  <div className="w-12 h-12 cursor-pointer rounded-full bg-soft border-2 border-blue-500 overflow-hidden flex items-center justify-center text-3xl font-bold text-text-main/90">
                  {user ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    user!.name.charAt(0).toUpperCase()
                  )}
                </div>
              </Link>
            :
        <button className={`bg-primary hidden lg:block px-4 py-2 rounded-lg shadow hover:bg-primary/80 transition duration-100 ${login ? "hidden" : "block"}`}>
            <Link to="/auth/login" className="text-white font-serif font-semibold">
              Login
            </Link>
        </button>
}        <div className={`w-px h-8 font-semibold font-serif border border-(--text-primary) rounded-2xl mx-px ${login ? "block" : "hidden lg:block"}`}></div>
      <ThemeButton />
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