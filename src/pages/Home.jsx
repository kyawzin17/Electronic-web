import React from "react";
import { useAppContext } from "../hooks/useAppContext"
import "../App.css";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard, faBookmark, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import ReadCard from "../components/cards/ReadCard";
import HeroCircle from "../components/HeroCircle";

export default function Home() {
    const navigate= useNavigate();
    const {setActive}= useAppContext();
//absolute top-[50%] left-[50%] -translate-1/2 
    return (
        <section className="w-full mx-auto relative z-2 tr">
            <HeroCircle />
             {/* Hero div */}
            <div className="w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-24 my-10 md:my-20 z-2">
                <div className="flex justify-between items-end px-3 md:px-0">
                    <div className="w-full md:w-160 h-auto flex flex-col items-center text-center md:text-start md:items-start font-serif py-5 px-3 rounded-lg gap-4 md:gap-px">
                        <h6 className="w-fit text-main text-sm rounded-lg border-primary border-3 py-px px-2">Red Dargon Electronic!⚡</h6>
                        <h2 className="text-4xl md:text-5xl text-shadow-lg/30 font-bold bg-gradient-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">Next-Gen Electronic for Makers & Engineers</h2>
                        <p className="text-sm md:text-base w-120 text-text-muted mb-4">Are you looking for reliable electrical knowledge and electrical stores(next version)? Then this website is for you. </p>
                        <div className="flex gap-6 p-3">
                            <button onClick={() => {
                                setActive("project");
                                navigate("/project")
                            }} className="px-5 py-2 bg-gradient-to-r from-(--primary) to-(--secondary)
                                             text-(--color) rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">Get Start</button>
                            <button onClick={() => {
                                setActive("doc");
                                navigate("/doc")
                            }} className="px-4 py-2 border border-(--secondary) text-(--secondary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">Learn More</button>
                        </div>
                    </div>
                </div>

                <div className="hero-img">
                    
                </div>
            </div>
            {/* Information div */}
            <div className="w-full mx-auto h-auto py-20 flex justify-center flex-wrap gap-6 font-serif">
                
                <ReadCard icon={faAddressCard} title="About Us"
                             description="Learn more about our website and our mission is to make electronic technology accessible to Myanmar."
                              buttonText="About Us"
                               buttonColor="primary"
                               onButtonClick={() => {
                                setActive("about");
                                navigate("/about")
                               }} />
                <ReadCard icon={faBookmark} title="Documentation"
                             description="How each electrical device works and what they are about."
                              buttonText="To Read"
                               buttonColor="primary"
                               onButtonClick={() => {
                                setActive("doc");
                                navigate("/doc")
                            }} />
                <ReadCard icon={faLightbulb} title="Creative Projects"
                             description="Simple and basic projects and projects with many uses."
                              buttonText="View Projects"
                               buttonColor="primary" 
                               onButtonClick={() => {
                                setActive("project");
                                navigate("/project")
                            }} />
            </div>
            {/* Animation div */}
            <div className="w-screen h-70 my-10 md:my-20 z-3 flex items-center"> 
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

            {/* Store div */}
            <div className="w-fit my-30 mx-auto">
                <h2 className="text-(--color) text-3xl font-semibold mb-3">Trending Components</h2>
                <div className="w-full h-auto flex justify-center items-center flex-wrap gap-4">
                    {/* {components.map((element) => {
                        return (<div key={element.id} className="w-60 h-70 px-4 py-3 bg-gray-900 rounded-lg flex flex-col justify-between hover:border-4 border-(--primary) popular-img">
                                <div className="w-full h-[80%] flex justify-center items-center">
                                    <img src={element.img} alt={element.name} className="w-full" />
                                </div>
                                <div>
                                    <h3 className="text-(--constantW) font-lg font-semibold">{element.name}</h3>
                                    <span className="text-(--primary) opacity-75 text-ms me-2">Price:</span><span className="text-(--primary) text-md font-semibold">{element.price}</span>
                                </div>
                            </div>)
                    })} */}
                    <div className="w-60 h-70 px-4 py-3 bg-gray-900 rounded-lg flex flex-col justify-center items-center hover:border-4 border-(--primary)">
                        <FontAwesomeIcon icon={faPlus}  className="text-4xl text-(--primary) select-none cursor-pointer"/>
                        <h2 className="text-(--constantW) text-md">More to view...</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}