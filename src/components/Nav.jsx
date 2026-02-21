import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Link } from "react-router-dom";

import "../App.css";

export default function Nav() {
     const [leftBar, setLeftBar]= useState(0);
     const [width, setWidth]= useState(0);

     const itemRef= useRef({});

     const { active, setActive }= useAppContext();
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

// Update active item position on active change
useEffect(() => {
    itemActive();
}, [active]);


    return (
        <nav className="flex justify-center items-center gap-4 text-lg font-medium font-serif tr">
          <Link ref={(el) => itemRef.current["home"] = el} to="/" onClick={() => setActive("home")} className={`text-(--color) mx-2 hover:text-primary tr ${active === "home" ? "active" : ""}`}>Home</Link>
          <Link ref={(el) => itemRef.current["about"] = el} to="/about" onClick={() => setActive("about")} className={`text-(--color) mx-2 hover:text-primary tr ${active === "about" ? "active" : ""}`}>About</Link>
          <Link ref={(el) => itemRef.current["doc"] = el} to="/doc" onClick={() => setActive("doc")} className={`text-(--color) mx-2 hover:text-primary tr ${active === "doc" ? "active" : ""}`}>Doc</Link>
          <Link ref={(el) => itemRef.current["project"] = el} to="/project" onClick={() => setActive("project")} className={`text-(--color) mx-2 hover:text-primary tr ${active === "project" ? "active" : ""}`}>Project</Link>
          <div className="h-0.5 bg-(--text-main) rounded-md tr absolute bottom-0.5 tr" style={{width: `${width}px`, left: `${leftBar}px`}}>

          </div>
        </nav>
    )
}