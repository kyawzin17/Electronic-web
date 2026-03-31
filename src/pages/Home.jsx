import React, { useRef } from "react";
import "../App.css";
import "./page.css";
import { useNavigate } from "react-router-dom";

import { faAddressCard, faBookmark, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import ReadCard from "../components/cards/ReadCard";
import HeroCircle from "../components/HeroCircle";
import Timeline from "../components/Timeline";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TrendComponents from "../components/TrendComponents";
import ElectronicsInfoSection from "../components/ElectronicsInfoSection";
import ElectronicHistory from "../components/ElectronicHistory";


gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
    const navigate= useNavigate();
    const containerRef= useRef(null);
    const cardRef= useRef([]);

   useGSAP(() => {
    gsap.fromTo(
        cardRef.current,
        {
            y: 70,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.3,
            duration: 0.5,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: 'play none none reverse',
            }
        }
    )
   }, { scope: containerRef})
    return (
        <section className="w-full relative z-2 transform transition duration-300">
            <HeroCircle />
             {/* Hero div */}
            <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-24 py-1 md:py-20 my-10 z-2">
                <div className="flex justify-between items-end px-3 md:px-0">
                    <div className="w-full md:w-160 h-auto flex flex-col items-center text-center md:text-start md:items-start font-serif py-5 px-3 rounded-lg gap-4 md:gap-px">
                        <h6 className="w-fit text-main text-xs md:text-sm rounded-lg border-primary border-3 py-px px-2">Red Dargon Electronic!⚡</h6>
                        <h2 className="text-3xl md:text-5xl text-shadow-lg/25 font-bold bg-gradient-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">Next-Gen Electronic for Makers & Engineers</h2>
                        <p className="text-sm md:text-base w-100 md:w-120 text-text-muted mb-4">Are you looking for reliable electrical knowledge and electrical stores(next version)? Then this website is for you. </p>
                        <div className="flex gap-6 p-3">
                            <button onClick={() => navigate("/project")}
                                     className="px-5 py-2 bg-gradient-to-r from-(--primary) to-(--secondary)
                                             text-(--color) rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">Get Start</button>
                            <button onClick={() => navigate("/doc/components")}
                                     className="px-4 py-2 border border-(--secondary) text-(--secondary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">Learn More</button>
                        </div>
                    </div>
                </div>

                <div className="hero-img w-70 h-60 sm:w-80 sm:h-70">
                    
                </div>
            </div>
            {/* Information div */}
            <div ref={containerRef} className="w-full mx-auto px-4 h-auto py-10 md:py-20 flex justify-center flex-wrap gap-6 font-serif">
                
                <ReadCard ref={(el) => cardRef.current[0] = el} icon={faAddressCard} title="About Us"
                             description="Learn more about our website and our mission is to make electronic technology accessible to Myanmar."
                              buttonText="About Us"
                               buttonColor="primary"
                               color="primary"
                               onButtonClick={() => navigate("/about")} 
                                />
                <ReadCard ref={(el) => cardRef.current[1] = el} icon={faBookmark} title="Documentation"
                             description="How each electrical device works and what they are about."
                              buttonText="To Read"
                               buttonColor="secondary"
                               color="secondary"
                               onButtonClick={() => navigate("/doc/components")}
                             />
                <ReadCard ref={(el) => cardRef.current[2] = el} icon={faLightbulb} title="Creative Projects"
                             description="Simple and basic projects and projects with many uses."
                              buttonText="View Projects"
                               buttonColor="accent"
                               color="accent"
                               onButtonClick={() => navigate("/project")} 
                             />
            </div>
            {/* Animation div */}
            <div className="w-screen h-70 my-4 md:my-20 z-3 flex items-center"> 
                <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="rdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: "var(--primary)"}} />
                            <stop offset="100%" style={{stopColor: "var(--secondary)"}} />
                        </linearGradient>

                        <radialGradient id="raGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#000" />
                            <stop offset="100%" stopColor="#33d3ee" />
                        </radialGradient>
                        <symbol id="resistor-model" viewBox="0 0 60 20">
                            <rect x="5" y="0" width="50" height="20" rx="4" className="resistor-body" />
                            <rect x="15" y="0" width="5" height="20" className="band-green" />
                            <rect x="25" y="0" width="5" height="20" className="band-black" />
                            <rect x="35" y="0" width="5" height="20" className="band-orange" />
                            <rect x="45" y="0" width="3" height="20" className="band-gold" />
                        </symbol>
                    </defs>

                    <path id="path1" className="wire" d="M 0 100 H 155 M 205 100 H 340 Q 340 100, 340 120 V 130 H 450" />
                    <path id="path2" className="wire" d="M 0 155 H 155 M 205 155 H 450" />
                    <path id="path3" className="wire" d="M 0 210 H 155 M 205 210 H 340 Q 340 210, 340 190 V 180 H 450" />
                    <line className="wire" x1="620" y1="155" x2="755" y2="155" />
                    <line className="wire" x1="765" y1="155" x2="920" y2="155" />

                    <use href="#resistor-model" x="150" y="90" width="60" height="20" />
                    <use href="#resistor-model" x="150" y="145" width="60" height="20" />
                    <use href="#resistor-model" x="150" y="200" width="60" height="20" />

                    <circle className="particle" r="2.5"><animateMotion dur="7s" repeatCount="indefinite" path="M 0 100 H 155 M 200 100 H 340 Q 340 100,340 120 V 130 H 450 Q 450 100, 450 80 H 620 V 155 H 950" /></circle> {/* t b t b  c c*/}
                    <circle className="particle" r="2.5"><animateMotion dur="7s" repeatCount="indefinite" path="M 0 210 H 155 M 200 210 H 340 Q 340 210, 340 187 V 180 H 450 Q 450 230, 450 230 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="7s" begin="1s" repeatCount="indefinite" path="M 0 100 H 155 M 200 100 H 340 Q 340 100,340 120 V 130 H 450 Q 450 100, 450 80 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="7s" begin="1s" repeatCount="indefinite" path="M 0 210 H 155 M 200 210 H 340 Q 340 210, 340 187 V 180 H 450 Q 450 230, 450 230 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="5s" begin="0.2s" repeatCount="indefinite" path="M 0 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="5s" begin="1.2s" repeatCount="indefinite" path="M 0 155 H 550" /></circle>

                    <rect x="450" y="80" width="170" height="150" fill="none" stroke="var(--line)" strokeDasharray="4,4" opacity="0.7" />
                    <text x="480" y="185" className="rd-text">RD</text>

                    <g transform="translate(760, 134)">
                        
                        <path className="led-main" d="M -10 10 V -5 A 10 10 0 1 1 10 -5 V 10 Z" />
                        <rect x="-6" y="10" width="1.5" height="12" fill="#334155" />
                        <rect x="5" y="10" width="1.5" height="12" fill="#334155" />
                    </g>
                    
                    <circle transform="translate(154, 100)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(154, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(154, 210)" fill="url(#raGradient)" className="circle-join" r="2.5" />

                    <circle transform="translate(207, 100)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(207, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(207, 210)" fill="url(#raGradient)" className="circle-join" r="2.5" />

                    <circle transform="translate(450, 130)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(450, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(450, 180)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(620, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(755, 155)" fill="url(#raGradient)" className="circle-join" r="2" />
                    <circle transform="translate(766, 155)" fill="url(#raGradient)" className="circle-join" r="2" />
                </svg>
            </div>
            {/* TrendComponents div */}
            <TrendComponents />
            <ElectronicsInfoSection />
            <ElectronicHistory />
            {/* Timeline design */}
            <Timeline />
        </section>
    )
}