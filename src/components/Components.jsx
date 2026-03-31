import React from "react";
import Resistor from "../../public/docs/images/resistor.webp";
import Capacitor from "../../public/docs/images/capacitor.webp";
import Inductor from "../../public/docs/images/inductor.webp";
import Vreg from "../../public/docs/images/transistor.webp";
import Led from "../../public/docs/images/led1.webp";
import Arduino from "../../public/docs/images/arduino.webp";
import Diode from "../../public/docs/images/diode.webp";
import Ic from "../../public/docs/images/ic.webp";
import Npn from "../../public/docs/images/npn.webp";
import BjtTransistor from "../../public/docs/images/bjt-transistor.webp";
import Mosfet from "../../public/docs/images/mosfet.webp";
import PhotoDiode from "../../public/docs/images/photo-diode.webp";
import OAmpfil from "../../public/docs/images/o-ampfil.webp";
import Fuse from "../../public/docs/images/fuse.webp";
import Relay from "../../public/docs/images/relay.webp";
import { useNavigate } from "react-router-dom";

export default function Components() {

    const navigate= useNavigate();
    // const components= [
    //  
    // { name: "Potentiometer", url: Pot, about: "Variable Resistance for Control", des: "Types: Linear, Logarithmic (B10K)" },

    // { name: "Optocoupler", url: Opto, about: "Electrical Isolation between Circuits", des: "Model: PC817" },

    // 
    // { name: "Logic Gates", url: Gate, about: "Digital Logic Operations", des: "74HC series (AND, OR, NOT)" },

    //  // --- Protection & Switching ---
    // { name: "Tactile Switch", url: Switch, about: "Momentary User Input", des: "Sizes: 6x6mm, 12x12mm" },
    // 
    // 
    // { name: "Crystal Oscillator", url: Crystal, about: "Precise Clock Frequency for MCUs", des: "Values: 16MHz, 32.768kHz" }


    
    // ]

    const passives= [
            { name: "Resistor", url: Resistor, link: "/doc/passives/resistor", about: "Limit Current and Voltage Division", des: "Values: 100Ω, 1kΩ, 10kΩ, 1/4W" },
            { name: "Capacitor", url: Capacitor, link: "/doc/passives/capacitor", about: "Energy Storage, Filtering and Coupling", des: "Values: 10uF, 0.1uF, 22pF" },
            { name: "Diode", url: Diode, link: "/doc/passives/diode", about: "One-way Current Flow (Rectification)", des: "Models: 1N4007, 1N4148" },
            { name: "Inductor", url: Inductor, link: "/doc/passives/inductor", about: "Magnetic Energy Storage and RF Filtering", des: "Values: 10uH, 100uH, 1mH" },
    ]

    const diodes= [
            { name: "LED", url: Led, link: "/doc/diodes/led", about: "Visual Indicators and Illumination", des: "Colors: Red, Green, Blue, RGB" },
            { name: "Photodiode", url: PhotoDiode, link: "/doc/diodes/photo", about: "Light Detection", des: "Usage: IR Receivers, Lux Meters" },
    ]

    const transistors= [
            { name: "BJT Transistor",url: BjtTransistor, link: "/doc/transistors/bipolarJunction", about: "Switching and Signal Amplification", des: "Models: BC547 (NPN), BC557 (PNP)" },
            { name: "MOSFET", url: Mosfet, link: "/doc/transistors/mosfet", about: "High-speed Power Switching", des: "Models: IRF540N, 2N7000" },
    ]

    const analogIcs= [
            { name: "Voltage Regulator", url: Vreg, link: "/doc/analogIc/voltageRegulator", about: "Stable Power Supply Output", des: "Models: 7805 (5V), LM1117 (3.3V)" },
            { name: "555 Timer", url: Ic, link: "/doc/analogIc/555Timer", about: "Pulse Generation and Timing", des: "Modes: Astable, Monostable" },
            { name: "Operational Amplifier", url: OAmpfil, link: "/doc/analogIc/operationalAmplifier", about: "Signal Conditioning and Math Ops", des: "Models: LM358, UA741" },
    ]

    const microcontrollers= [
         { name: "Arduino UNO", url: Arduino, link: "/doc/microcontrollers/arduino", about: "Something, arduino use to write code with ide", des: "Models: R3, uno board"},    ]

    const interfaces= [
        { name: "Relay", url: Relay, link: "/doc/interfaces/relay", about: "Low Power controls High Power AC/DC", des: "Coil: 5V, 12V | Load: 10A" },
    ]
   
    const protections= [
        { name: "Fuse", url: Fuse, link: "/doc/protections/fuse", about: "Overcurrent Protection", des: "Types: Glass, Resettable (PTC)" },
    ]

const ComponentsCard= ({header, array}) => {
    return (
    <div id={header.toLowerCase()} className="w-full h-auto flex flex-wrap justify-center gap-6 py-6 scroll-mt-4">
                <h2 className="w-full text-start text-2xl font-bold text-text-main uppercase tracking-widest mb-6 ms-4 hover:text-primary transition-colors duration-300 mt-12">
                    {header}
                </h2>
            { array.map((item, index) => (
                <div key={index} onClick={() => navigate(item.link)} className="relative hover:-translate-y-2 w-60 h-80 bg-card rounded-xl border border-border px-3.5 py-4 flex flex-col items-center justify-between overflow-hidden shadow-2xl transition-all hover:border-primary group">
                
                    <div className="relative w-full h-[57%] flex justify-center items-center">
                    {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-purple-600/12 blur-3xl rounded-full"></div>
                        
                        <img loading="lazy" src={item.url} alt={item.name} style={{ objectFit: "contain", filter: "brightness(1.2) contrast(1.1)"}} className="w-[94%] h-full overflow-hidden" />                </div>

                    {/* Text Section */}
                    <div className="w-full h-[42%] flex flex-col items-center justify-between gap-1">
                        <h2 className="text-tex-main text-md text-center font-bold tracking-widest uppercase group-hover:text-primary transition-colors">
                            {item.name}
                        </h2>
                    
                        <p className="text-text-secondary text-center text-base fond-medium leading-relaxed mb-1 line-clamp-2">
                            {item.about}
                        </p>

                        {/* Specs/Key Parameters Section */}
                        <div className="w-full">
                            <p className="text-text-muted text-center text-xs font-semibold mb-2 uppercase tracking-tighter">
                                {item.des}
                            </p>
                        </div>

                        {/* Corner Accent (Optional for extra detail) */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-xl"></div>
                    </div>
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
                </div>
             )
            )}
            </div>
        )
}
    return (
        <div className="w-full min-h-screen">
            <ComponentsCard header={"Passives"} array={passives} />
            <ComponentsCard header={"Diodes"} array={diodes} />
            <ComponentsCard header={"Transistors"} array={transistors} />
            <ComponentsCard header={"AnalogICs"} array={analogIcs} />
            <ComponentsCard header={"Microcontrollers"} array={microcontrollers} />
            <ComponentsCard header={"Protections"} array={protections} />
            <ComponentsCard header={"Interfaces"} array={interfaces} />
        </div>
    )
}