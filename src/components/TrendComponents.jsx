import React, { useEffect, useRef } from "react";
import "./Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import arduino from "../../public/docs/images/arduino.webp";
import led from "../../public/docs/images/led1.webp";
import resistor from "../../public/docs/images/resistor.webp";
import capactior from "../../public/docs/images/capacitor.webp";
import transistor from "../../public/docs/images/transistor.webp";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrendComponents() {
    const navigate= useNavigate();
    const trendRef= useRef();
    const headerRef= useRef();
    const comRef= useRef();

    useEffect(() => {

        gsap.fromTo(
            comRef.current,
            {
                y: 70,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: trendRef.current,
                    start: "top 80%",
                    toggleActions: 'play none none reverse',
                }
            }
        );

        gsap.fromTo(
            headerRef.current,
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                duration: 0.8,
                opacity: 1,
                ease: "power1.out",
                delay: 0.1,
                scrollTrigger: {
                    trigger: trendRef.current,
                    start: "top 80%",
                    toggleActions: 'play none none reverse',
                }
            }
        )
    }, []);

    const components= [
        {id: 1, name: "Arduino UNO R3", img: arduino, des: "Microcontroller Board", first: "5V", second: "ATmega328P", link: "/doc/microcontrollers/arduino" },
        {id: 2, name: "LED", img: led, des: "Light Emitting Diode", first: "2V", second: "20mA", link: "/doc/diodes/led"},
        {id: 3, name: "Resistor", img: resistor, des: "Limits current flow in circuits", first: "1k", second: "1/4W", link: "/doc/passives/resistor"},
    ]

    return (
        <div ref={trendRef} className="w-fit my-20 md:my-30 mx-auto">
                <h2 ref={headerRef} className="text-(--color) text-3xl font-semibold mb-6 md:mb-16">Trending Components</h2>
                <div ref={comRef} className="flex justify-center items-center gap-4 flex-wrap w-full">
                    {
                        components.map((item) => (
                            <div key={item.id} className="component-card" data-component={item.name} onClick={() => navigate(`${item.link}`)}>
                                <div className="card-image">
                                    <img src={item.img} alt={item.name} className="component-img" />
                                </div>
                                <div className="card-content">
                                    <h3 className="component-title">{item.name}</h3>
                                    <p className="component-description">{item.des}</p>
                                    <div className="component-specs">
                                        <span className="spec bg-accent/20 text-accent border-1 border-accent/40">{item.first}</span>
                                        <span className="spec bg-accent/20 text-accent border-1 border-accent/40">{item.second}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div onClick={() => navigate("/doc/components")} className="relative w-70 h-80 px-4 py-3 bg-card rounded-lg flex flex-col justify-center items-center border-3 border-border hover:border-4 transition duration-300 ease-linear hover:border-primary">
                        <FontAwesomeIcon icon={faPlus}  className="text-4xl z-10 text-primary select-none cursor-pointer"/>
                        <h2 className="text-text-main text-md z-10">More to view...</h2>
                        <img src={arduino} alt="Arduino" className="absolute w-15 top-10 left-15 z-9" />
                        <img src={led} alt="LED" className="absolute w-5 top-14 right-16 rotate-45 z-9" />
                        <img src={resistor} alt="Resistor" className="absolute w-15 bottom-20 left-20 z-9" />
                        <img src={capactior} alt="Capacitor" className="absolute w-15 bottom-35 left-4 z-9" />
                        <img src={transistor} alt="Transistor" className="absolute w-15 bottom-11 right-10 z-9" />
                    </div>
                </div>
        </div>
    )
}