import React, { useState } from "react";
import { useAppContext } from "../hooks/useAppContext"
import "../App.css";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard, faBookmark, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import ReadCard from "../components/cards/ReadCard";

export default function Home() {
    const [email, setEmail]= useState();
    const navigate= useNavigate();
    const {setActive}= useAppContext();
//absolute top-[50%] left-[50%] -translate-1/2 
    return (
        <section className="w-full mx-auto relative z-2 tr">
             {/* Hero div */}
            <div className="w-300 mx-auto flex justify-between items-center my-30 z-2">
                <div className="flex justify-center items-end">
                    <div className="w-170 h-auto flex flex-col font-serif py-5 px-3 rounded-lg">
                        <h6 className="text-gray-400 text-sm -mb-1">Red Dargon Electronic!</h6>
                        <h2 className="text-5xl text-shadow-lg/30 font-bold mb-4 bg-gradient-to-r from-(--secondary) to-(--primary) bg-clip-text text-transparent">Next-Gen Electronic for Makers & Engineers</h2>
                        <p className="text-md w-120 text-(--color) mb-6 opacity-80">Are you looking for reliable electrical knowledge and electrical stores(next version)? Then this website is for you. </p>
                        <div className="flex gap-6 p-3">
                            <button onClick={() => {
                                setActive("project");
                                navigate("/project")
                            }} className="px-5 py-2 bg-gradient-to-r from-(--primary) to-(--secondary)
                                             text-(--color) rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">Get Start</button>
                            <button onClick={() => {
                                setActive("doc");
                                navigate("/doc")
                            }} className="px-4 py-2 border border-(--primary) text-(--primary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">Learn More</button>
                        </div>
                    </div>
                </div>

                <div className="hero-img bg-[url(./image/micro.png)] bg-no-repeat bg-cover bg-center">
                </div>
            </div>
            {/* Information div */}
            <div className="w-full mx-auto h-auto py-30 flex justify-center flex-wrap gap-6 font-serif">
                    {/* <div className="w-84 h-65 flex flex-col items-center justify-center px-2 border border-(--primary) border-3 rounded-md drop-shadow-sm drop-shadow-cyan-500/50">
                        <FontAwesomeIcon icon={faAddressCard} className="text-(--color) text-5xl mb-3" />
                        <h2 className="text-(--color) text-2xl text-center mb-2">About Us</h2>
                        <p className="text-(--color) text-md text-center mb-4">Learn more about our company and our mission to provide high-quality electronic products.</p>
                        <button onClick={() => {
                                setActive("about");
                                navigate("/about")
                            }} className="bg-(--secondary) text-(--color) text-lg rounded-lg px-6 py-1.5 hover:scale-103 hover:text-(--bg) select-none cursor-pointer">About Us</button>
                    </div> */}
                
                <ReadCard icon={faAddressCard} title="About Us"
                             description="Learn more about our company and our mission to provide high-quality electronic products."
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
            <div className="w-screen h-70 my-20 z-3 flex items-center"> 
                <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="rdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: "#a855f7"}} />
                            <stop offset="100%" style={{stopColor: "#3b82f6"}} />
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

                    <rect x="450" y="80" width="170" height="150" fill="none" stroke="#22d3ee" strokeDasharray="4,4" opacity="0.5" />
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
            {/* Footer div */}
            <footer className="w-full py-30 px-30">
                <div className="mb-20 px-50">
                    <h1><span className="text-shadow-lg/30 text-6xl font-bold header-logo">Red Dargon</span><span  className="text-sm font-semibold"> Electronic!</span></h1>
                </div>
                <div className="w-full flex justify-center items-center gap-5">
                    <div className="w-55 text-(--color)">
                        <p className="py-8 text-sm">
                            Innovation at your fingertips.
                        </p>
                        <p className="text-sm">
                            Connecting makers and engineers with the fature of electronics.
                        </p>
                    </div>
                    <div className="w-px h-30 bg-(--primary) opacity-50"></div>
                    <div className="me-5">
                        <h2 className="text-md font-semibold text-(--primary) mb-2">EXPLORE</h2>
                        <h3 className="text-md text-(--color)">
                            Home
                        </h3>
                        <h3 className="text-md text-(--color)">
                            About Us
                        </h3>
                        <h3 className="text-md text-(--color)">
                            Documentation
                        </h3>
                        <h3 className="text-md text-(--color)">
                            Projects
                        </h3>
                    </div>
                    <div className="w-px h-30 bg-(--primary) opacity-50"></div>
                    <div className="me-5">
                        <h2 className="text-md font-semibold text-(--primary) mb-2">SUPPORT</h2>
                        <h3 className="text-md text-(--color)">
                            Contact Us
                        </h3>
                        <h3 className="text-md text-(--color)">
                            FAQ
                        </h3>
                        <h3 className="text-md text-(--color)">
                            Shipping & Returns
                        </h3>
                        <h3 className="text-md text-(--color)">
                            Privacy Policy
                        </h3>
                    </div>
                    <div className="w-px h-30 bg-(--primary) opacity-50"></div>
                    <div className="w-50">
                        <h2 className="text-md font-semibold text-(--primary) mb-2">CONNECT
                            <FontAwesomeIcon icon={faFacebook} size="lg" className="ms-3 me-1 select-none cursor-pointer hover:text-blue-700 hover:scale-105"/>
                            <FontAwesomeIcon icon={faGoogle} size="lg" className="select-none cursor-pointer hover:text-red-700 hover:scale-105"/>
                        </h2>
                        <p className="text-(--color) text-md">
                            Stay Updated
                        </p>
                        <input className="outline-3 outline-(--primary) rounded-sm text-(--color) text-md px-1 py-1 mt-2 mb-4"
                                placeholder="Your Email Addresss"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/> <br></br>
                        <button className='bg-(--primary) text-black px-8 py-1 rounded-sm ms-[50%] -translate-x-1/2 select-none cursor-pointer shadow transition duration-300 hover:shadow-[0_0_8px_var(--primary)] font-semibold'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </footer>
            <div className="border-t-2 border-(--primary) py-2 text-gray-400 text-md text-center">
                @2026 Red Dargon Electornic For you.
            </div>
        </section>
    )
}