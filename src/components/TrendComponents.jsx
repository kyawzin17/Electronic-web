import React from "react";
import "./Components.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import arduino from "../../public/docs/images/arduino.webp";
import led from "../../public/docs/images/led1.webp";
import resistor from "../../public/docs/images/resistor.webp";
import { useNavigate } from "react-router-dom";


export default function TrendComponents() {
    const navigate= useNavigate();

    const components= [
        {id: 1, name: "Arduino UNO R3", img: arduino, des: "Microcontroller Board", first: "5V", second: "ATmega328P", link: "/doc/microcontrollers/arduino" },
        {id: 2, name: "LED", img: led, des: "Light Emitting Diode", first: "2V", second: "20mA", link: "/doc/diodes/led"},
        {id: 3, name: "Resistor", img: resistor, des: "Limits current flow in circuits", first: "1k", second: "1/4W", link: "/doc/passives/resistor"},
    ]

    return (
        <div className="w-fit my-20 md:my-40 mx-auto">
                <h2 className="text-(--color) text-3xl font-semibold mb-3 md:mb-16">Trending Components</h2>
                <div className="flex justify-center items-center gap-4 flex-wrap-auto w-full">
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
                                        <span className="spec">{item.first}</span>
                                        <span className="spec">{item.second}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="w-50 h-60 px-4 py-3 bg-gray-900 rounded-lg flex flex-col justify-center items-center hover:border-4 border-(--primary)">
                        <FontAwesomeIcon icon={faPlus}  className="text-4xl text-(--primary) select-none cursor-pointer"/>
                        <h2 className="text-(--constantW) text-md">More to view...</h2>
                    </div>
                </div>
        </div>
    )
}