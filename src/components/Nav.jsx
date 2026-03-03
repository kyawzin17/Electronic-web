import React, { useState, useRef, useEffect, use } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Link, useLocation } from "react-router-dom";

import "../App.css";

export default function Nav() {
     const [leftBar, setLeftBar]= useState(0);
     const [width, setWidth]= useState(0);
     const location= useLocation();

      // Update active item based on URL path

     const itemRef= useRef({});

     const { active, setActive }= useAppContext();

     const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Doc', path: '/doc/passives/resistor' },
    { name: 'Project', path: '/project' },
  ];
     // Get active item position
const itemActive= () => {
        const element= itemRef.current[active];
        if(element) {
            const leftE= element.offsetLeft;
            const widthE= element.offsetWidth;
             setWidth(widthE);
            setLeftBar(leftE);
        }
    }

useEffect(() => {
    const path= location.pathname.split("/")[1]; // Get first segment of path
    const activeLink= navLinks.find(link => link.path.includes(path));
    if(activeLink) {
        setActive(activeLink.name.toLowerCase());
    }
}, []);

// Update active item position on active change
useEffect(() => {
    itemActive();
}, [active]);


    return (
        <nav className="flex justify-center items-center gap-4 text-lg font-medium font-serif tr relative">
            {navLinks.map((item) => {
                return (
                <Link 
                    key={item.name}
                    ref={(el) => itemRef.current[item.name.toLowerCase()] = el}
                    to={item.path}
                    onClick={() => setActive(item.name.toLowerCase())}
                    className={`text-(--color) mx-2 hover:text-primary tr ${active === item.name.toLowerCase() ? "active" : ""}`}
                >
                    {item.name}
                </Link>
            )})}
          <div className="h-0.5 bg-(--text-main) rounded-md tr absolute bottom-0.5 tr" style={{width: `${width}px`, left: `${leftBar}px`}}>

          </div>
        </nav>
    )
}