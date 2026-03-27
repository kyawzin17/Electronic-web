import React from "react";
import Resistor from "../../public/docs/images/resistor.webp";
import Capacitor from "../../public/docs/images/capacitor.webp";
import Vreg from "../../public/docs/images/transistor.webp";
import Led from "../../public/docs/images/led1.webp";
import Arduino from "../../public/docs/images/arduino.webp";
import Diode from "../../public/docs/images/diode.webp";
import Ic from "../../public/docs/images/ic.webp";
import Npn from "../../public/docs/images/npn.webp";
import Speaker from "../../public/docs/images/speaker.webp";

export default function Components() {

    // const components= [
    //  { name: "Inductor", url: Inductor, about: "Magnetic Energy Storage and RF Filtering", des: "Values: 10uH, 100uH, 1mH" },
    // { name: "Potentiometer", url: Pot, about: "Variable Resistance for Control", des: "Types: Linear, Logarithmic (B10K)" },

    // { name: "BJT Transistor", url: Transistor, about: "Switching and Signal Amplification", des: "Models: BC547 (NPN), BC557 (PNP)" },
    // { name: "MOSFET", url: Mosfet, about: "High-speed Power Switching", des: "Models: IRF540N, 2N7000" },

    // { name: "Photodiode", url: PhotoD, about: "Light Detection", des: "Usage: IR Receivers, Lux Meters" },
    // { name: "Optocoupler", url: Opto, about: "Electrical Isolation between Circuits", des: "Model: PC817" },

    // { name: "Operational Amplifier", url: OpAmp, about: "Signal Conditioning and Math Ops", des: "Models: LM358, UA741" },
    // { name: "Logic Gates", url: LogicIC, about: "Digital Logic Operations", des: "74HC series (AND, OR, NOT)" },

    //  // --- Protection & Switching ---
    // { name: "Tactile Switch", url: Switch, about: "Momentary User Input", des: "Sizes: 6x6mm, 12x12mm" },
    // { name: "Relay", url: Relay, about: "Low Power controls High Power AC/DC", des: "Coil: 5V, 12V | Load: 10A" },
    // { name: "Fuse", url: Fuse, about: "Overcurrent Protection", des: "Types: Glass, Resettable (PTC)" },
    // { name: "Crystal Oscillator", url: Crystal, about: "Precise Clock Frequency for MCUs", des: "Values: 16MHz, 32.768kHz" }


    
    // ]

    const components = [
    // --- Passives ---
    { name: "Resistor", url: Resistor, about: "Limit Current and Voltage Division", des: "Values: 100Ω, 1kΩ, 10kΩ, 1/4W" },
    { name: "Capacitor", url: Capacitor, about: "Energy Storage, Filtering and Coupling", des: "Values: 10uF, 0.1uF, 22pF" },
   

    // --- Semiconductors ---
    
    { name: "Diode", url: Diode, about: "One-way Current Flow (Rectification)", des: "Models: 1N4007, 1N4148" },
    

    // --- Optoelectronics ---
    { name: "LED", url: Led, about: "Visual Indicators and Illumination", des: "Colors: Red, Green, Blue, RGB" },
    

    // --- Integrated Circuits (ICs) ---
    { name: "555 Timer", url: Ic, about: "Pulse Generation and Timing", des: "Modes: Astable, Monostable" },
    { name: "Voltage Regulator", url: Vreg, about: "Stable Power Supply Output", des: "Models: 7805 (5V), LM1117 (3.3V)" },
    
    // ---Microcontroller ---
    { name: "Arduino UNO", url: Arduino, about: "Something, arduino use to write code with ide", des: "Models: R3, uno board"},
    { name: "Speaker", url: Speaker, about: "Speaker use to play sound", des: "Models: 8 Ohm, 16 Ohm"}
   
];
    return (
        <div className="w-full min-h-screen flex flex-wrap justify-center gap-6 py-6">
        
            {/* Card Container */}
            { components.map((item, index) => (
                <div key={index} className="relative hover:-translate-y-2 w-60 h-80 bg-card rounded-xl border border-border px-3.5 py-4 flex flex-col items-center justify-between overflow-hidden shadow-2xl transition-all hover:border-primary group">
                
                    <div className="relative w-full h-[57%] flex justify-center items-center">
                    {/* Background Glow Effect */}
                        <div className="absolute inset-0 bg-purple-600/12 blur-3xl rounded-full"></div>
                        
                        <img src={item.url} alt={item.name} style={{ objectFit: "contain", filter: "brightness(1.2) contrast(1.1)"}} className="w-[94%] h-full overflow-hidden" />                </div>

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