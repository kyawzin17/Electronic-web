import { useRef } from "react";
import "./Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import arduino from "../../public/docs/images/arduino.webp";
import led from "../../public/docs/images/led1.webp";
import resistor from "../../public/docs/images/resistor.webp";
import capactior from "../../public/docs/images/capacitor.webp";
import transistor from "../../public/docs/images/transistor.webp";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TrendComponents() {
    const navigate= useNavigate();
    const trendRef= useRef<HTMLDivElement>(null);
    const headerRef= useRef<HTMLDivElement>(null);
    const comRef= useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from( comRef.current,{
                y: 70,
                opacity: 0,
                duration: 0.8,
                ease: "back.out",
                scrollTrigger: {
                    trigger: comRef.current,
                    start: "top 70%",
                }
            }
        );
        gsap.from(headerRef.current,
            {
                x: 70,
                duration: 0.8,
                opacity: 0,
                ease: "back.out",
                delay: 0.1,
                scrollTrigger: {
                    trigger: trendRef.current,
                    start: "top 70%",
                }
            }
        )
    }, {});

    const components= [
        {id: 1, name: "Arduino UNO R3", img: arduino, des: "Microcontroller Board", first: "5V", second: "ATmega328P", link: "/doc/microcontrollers/arduino" },
        {id: 2, name: "LED", img: led, des: "Light Emitting Diode", first: "2V", second: "20mA", link: "/doc/diodes/led"},
        {id: 3, name: "Resistor", img: resistor, des: "Limits current flow in circuits", first: "1k", second: "1/4W", link: "/doc/passives/resistor"},
    ]

    return (
        <div ref={trendRef} className="w-fit my-4 md:my-20 mx-auto px-6">
                <h2 ref={headerRef} className="text-text-main text-3xl font-semibold mb-10 md:mb-20 border-l-4 border-secondary px-2">Trending Components</h2>
                <div ref={comRef} className="flex justify-center items-center gap-4 flex-wrap w-full">
                    {
                        components.map((item) => (
                            <motion.div 
                                whileHover={{ y: -10, scale: 1.02}} 
                                transition={{ duration: 0.6, ease: "backOut"}} 
                                 key={item.id} className="component-card" data-component={item.name} onClick={() =>  navigate(`${item.link}`)}>
                                <div className="card-image">
                                    <img src={item.img} alt={item.name} className="component-img" />
                                </div>
                                <div className="card-content">
                                    <h4 className="component-title">{item.name}</h4>
                                    <p className="component-description">{item.des}</p>
                                    <div className="component-specs">
                                        <span className="spec bg-accent/20 text-accent border border-accent/40">{item.first}</span>
                                        <span className="spec bg-accent/20 text-accent border border-accent/40">{item.second}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                    <motion.div 
                                whileHover={{ y: -10, scale: 1.02}} 
                                transition={{ duration: 0.4, ease: "backOut"}} 
                                 onClick={() => navigate("/doc/components")} 
                            className="relative component-card bg-card flex flex-col justify-center items-center">
                        <FontAwesomeIcon icon={faPlus}  className="text-4xl z-10 text-primary select-none cursor-pointer"/>
                        <h2 className="text-text-main text-md z-10">More to view...</h2>
                        <img src={arduino} alt="Arduino" className="absolute w-15 top-10 left-15 z-9" />
                        <img src={led} alt="LED" className="absolute w-5 top-14 right-16 rotate-45 z-9" />
                        <img src={resistor} alt="Resistor" className="absolute w-15 bottom-20 left-20 z-9" />
                        <img src={capactior} alt="Capacitor" className="absolute w-15 bottom-35 left-4 z-9" />
                        <img src={transistor} alt="Transistor" className="absolute w-15 bottom-11 right-10 z-9" />
                    </motion.div>
                </div>
        </div>
    )
}