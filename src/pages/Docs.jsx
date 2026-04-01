import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Dynamic route အတွက်
import { useAppContext } from "../hooks/useAppContext";
import MarkdownView from "../components/MarkdownView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faMicrochip, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import RightSidebar from "../components/RightSideBar";
import Components from "../components/Components";
import MobileLeftSidebar from "../components/MobileLeftSidebar";

export default function Docs() {
    const { headerHeight, menu, setMenu } = useAppContext();
   const { category: activeCategory, fileName } = useParams(); // URL parameter ကနေ ယူမယ်၊ default က resistor
    const navigate = useNavigate();
    const [content, setContent] = useState("");
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [searchTerm, setSearchTerm]= useState("");
  

  useEffect(() => {
    // Markdown မှ h2 ခေါင်းစဉ်များကို ဆွဲထုတ်ခြင်း
    const rawHeadings = content.match(/^###\s+(.*)$/gm) || [];
    const formattedHeadings = rawHeadings.map(h => {
      const title = h.replace(/^###\s+/, '');
      const id = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return { title, id };
    });
    setHeadings(formattedHeadings);
  
  }, [content]);

    const [ openCategory, setOpenCategory ]= useState( activeCategory || "components" ); // Sidebar category open/close state
    
    // Documentation list ကို အရင်ဆုံး တစ်ခါတည်း ပြင်ဆင်ထားမယ် (အနာဂတ်မှာ API ကနေ ယူနိုင်ပါတယ်)
    const docArray = [
        { name: "Resistor", slug: "resistor", category: "passives" },
        { name: "Variable Resistor", slug: "variableResistor", category: "passives" },
        { name: "Capacitor", slug: "capacitor", category: "passives" },
        { name: "Inductor", slug: "inductor", category: "passives" },
        { name: "Diode", slug: "diode", category: "passives" },
        { name: "Transistor", slug: "transistor", category: "passives" },
        { name: "Integrated Circuit", slug: "integrated-circuit", category: "passives" },
        { name: "Potentiometer", slug: "potentiometer", category: "passives" },
        { name: "Rheostat", slug: "rheostat", category: "passives" },
        { name: "Timmer", slug: "timmer", category: "passives" },
        { name: "Ferrite Bead", slug: "ferriteBead", category: "passives" },
        { name: "Choke Coil", slug: "chokeCoil", category: "passives" },
        { name: "Transformer", slug: "transformer", category: "passives" },
        { name: "Step-up Transformer", slug: "stepUpTransformer", category: "passives" },
        { name: "Step-down Transformer", slug: "stepDownTransformer", category: "passives" },
        { name: "Autotransformer", slug: "autoTransformer", category: "passives" },

        { name: "PN Junction", slug: "pnJunction", category: "diodes" },
        { name: "Rectifier Diode", slug: "rectifier", category: "diodes" },
        { name: "Fast Recovery Diode", slug: "fastRecovery", category: "diodes" },
        { name: "Schottky Diode", slug: "schottky", category: "diodes" },
        { name: "Zener Diode", slug: "zener", category: "diodes" },
        { name: "TVS Diode", slug: "tvs", category: "diodes" },
        { name: "Varactor Diode", slug: "varactor", category: "diodes" },
        { name: "LED", slug: "led", category: "diodes" },
        { name: "High Power Diode", slug: "highPower", category: "diodes" },
        { name: "Infrared Diode", slug: "infrared", category: "diodes" },
        { name: "Laser Diode", slug: "laser", category: "diodes" },
        { name: "Photodiode", slug: "photo", category: "diodes" },
        { name: "Avalanche Diode", slug: "avalanche", category: "diodes" },
        { name: "Bridge Rectifier", slug: "bridgeRectifier", category: "diodes" },

        { name: "Bipolar Junction Transistor", slug: "bipolarJunction", category: "transistors" },
        { name: "NPN Transistor", slug: "npn", category: "transistors" },
        { name: "PNP Transistor", slug: "pnp", category: "transistors" },
        { name: "Darlington Pair", slug: "darlingtonPair", category: "transistors" },
        { name: "MOSFET", slug: "mosfet", category: "transistors" },
        { name: "N-channel MOSFET", slug: "nChannelMosfet", category: "transistors" },
        { name: "P-channel MOSFET", slug: "pChannelMosfet", category: "transistors" },
        { name: "JFET", slug: "jfet", category: "transistors" },
        { name: "IGBT", slug: "igbt", category: "transistors" },
        { name: "SCR", slug: "scr", category: "transistors" },
        { name: "TRIAC", slug: "triac", category: "transistors" },
        { name: "DIAC", slug: "diac", category: "transistors" },
        { name: "UJT", slug: "ujt", category: "transistors" },
        { name: "Phototransistor", slug: "photoTransistor", category: "transistors" },
        { name: "Optocoupler", slug: "optocoupler", category: "transistors" },

        { name: "Operational Amplifier", slug: "operationalAmplifier", category: "analogIc" },
        { name: "Instrumentation Amplifier", slug: "instrumentationAmplifier", category: "analogIc" },
        { name: "Voltage Comparator", slug: "voltageComparator", category: "analogIc" },
        { name: "555 Timer IC", slug: "555Timer", category: "analogIc" },
        { name: "Audio Power Amplifier IC", slug: "audioPowerAmplifier", category: "analogIc" },
        { name: "Voltage Regulator", slug: "voltageRegulator", category: "analogIc" },
        { name: "Linear Regulator", slug: "linearRegulator", category: "analogIc" },
        { name: "Switching Regulator", slug: "switchingRegulator", category: "analogIc" },
        { name: "LDO Regulator", slug: "ldor", category: "analogIc" },
        { name: "PWM Controller", slug: "pwmc", category: "analogIc" },

        { name: "AND Gate", slug: "andGate", category: "digitalIc" },
        { name: "OR Gate", slug: "orGate", category: "digitalIc" },
        { name: "NOT Gate", slug: "notGate", category: "digitalIc" },
        { name: "NAND Gate", slug: "nandGate", category: "digitalIc" },
        { name: "NOR Gate", slug: "norGate", category: "digitalIc" },
        { name: "XOR Gate", slug: "xorGate", category: "digitalIc" },
        { name: "XNOR Gate", slug: "xnorGate", category: "digitalIc" },
        { name: "Flip-Flop", slug: "flipFlop", category: "digitalIc" }, 
        { name: "Latch", slug: "latch", category: "digitalIc" },
        { name: "Counter", slug: "counter", category: "digitalIc" },
        { name: "Shift Register", slug: "shiftRegister", category: "digitalIc" },
        { name: "Encoder", slug: "encoder", category: "digitalIc" },
        { name: "Decoder", slug: "decoder", category: "digitalIc" },
        { name: "Multiplexer", slug: "multiplexer", category: "digitalIc" },
        { name: "Demultiplexer", slug: "demultiplexer", category: "digitalIc" },

        { name: "Microcontroller", slug: "microcontroller", category: "microcontrollers" },
        { name: "Microprocessor", slug: "microprocessor", category: "microcontrollers" },
        { name: "Arduino", slug: "arduino", category: "microcontrollers" },
        { name: "ESP8266", slug: "esp8266", category: "microcontrollers" },
        { name: "ESP32", slug: "esp32", category: "microcontrollers" },
        { name: "Raspberry Pi", slug: "raspberryPi", category: "microcontrollers" },
        { name: "STM32", slug: "stm32", category: "microcontrollers" },
        { name: "Pictroncontroller", slug: "picMicroncontroller", category: "microcontrollers" },
        { name: "EEPROM", slug: "eeprom", category: "microcontrollers" },
        { name: "Flash Memory", slug: "flashMemory", category: "microcontrollers" },
        { name: "SRAM", slug: "sram", category: "microcontrollers" },
        { name: "RTC Module", slug: "rtcModule", category: "microcontrollers" },

        { name: "Temperature Sensor", slug: "temperatureSensor", category: "sensors" },
        { name: "Humidity Sensor", slug: "humiditySensor", category: "sensors" },
        { name: "Pressure Sensor", slug: "pressureSensor", category: "sensors" },
        { name: "Ultrasonic Sensor", slug: "ultrasonicSensor", category: "sensors" },
        { name: "PIR Sensor", slug: "pirSensor", category: "sensors" },
        { name: "Gas Sensor", slug: "gasSensor", category: "sensors" },
        { name: "IR Sensor", slug: "irSensor", category: "sensors" },
        { name: "Hall Effect Sensor", slug: "hallEffectSensor", category: "sensors" },
        { name: "Accelerometer", slug: "accelerometer", category: "sensors" },
        { name: "Gyroscope", slug: "gyroscope", category: "sensors" },
        { name: "Magnetometer", slug: "magnetometer", category: "sensors" },
        { name: "Light Sensor", slug: "lightSensor", category: "sensors" },
        { name: "Load Cell", slug: "loadCell", category: "sensors" },
        { name: "Proximity Sensor", slug: "proximitySensor", category: "sensors" },

        { name: "Battery", slug: "battery", category: "powers" },
        { name: "Lithium Ion Battery", slug: "lithiumIon", category: "powers" },
        { name: "Lithium Ion Polymer Battery", slug: "lithiumIonPolymer", category: "powers" },
        { name: "Solar Panel", slug: "solarPanel", category: "powers" },
        { name: "Power Supply", slug: "powerSupply", category: "powers" },
        { name: "Switched Mode Power Supply", slug: "switchedMode", category: "powers" },
        { name: "DC-DC Converter", slug: "dcdcConverter", category: "powers" },
        { name: "Inverter", slug: "inverter", category: "powers" },
        { name: "Uninterruptible Power Supply", slug: "ups", category: "powers" },
        { name: "Battery Management System", slug: "bms", category: "powers" },

        { name: "Fuse", slug: "fuse", category: "protections" },
        { name: "Resettable Fuse", slug: "resettableFuse", category: "protections" },
        { name: "Circuit Breaker", slug: "circuitBreaker", category: "protections" },
        { name: "Varistor", slug: "varistor", category: "protections" },
        { name: "TVS Diode", slug: "tvsDiode", category: "protections" },
        { name: "Surge Protector", slug: "surgeProtector", category: "protections" },
        { name: "ESD Protector", slug: "esd", category: "protections" },

        { name: "Relay", slug: "relay", category: "interfaces" },
        { name: "Solid State Relay", slug: "solidStateRelay", category: "interfaces" },
        { name: "Push Button", slug: "pushButton", category: "interfaces" },
        { name: "Toggle Switch", slug: "toggleSwitch", category: "interfaces" },
        { name: "DIP Switch", slug: "dipSwitch", category: "interfaces" },
        { name: "Rotary Encoder", slug: "rotaryEncoder", category: "interfaces" },
        { name: "Buzzer", slug: "buzzer", category: "interfaces" },
        { name: "Piezo Buzzer", slug: "piezoBuzzer", category: "interfaces" },
        { name: "Crystal Oscillator", slug: "crystalOscillator", category: "interfaces" },
        { name: "Quartz Crystal", slug: "quartzCrystal", category: "interfaces" },
        { name: "LCD", slug: "lcd", category: "interfaces" },
        { name: "OLED", slug: "oled", category: "interfaces" },
        { name: "7 Segment", slug: "7Segment", category: "interfaces" },
        { name: "Electric Motor", slug: "electricMotor", category: "interfaces" },
        { name: "Servo Motor", slug: "servoMotor", category: "interfaces" },
        { name: "Stepper Motor", slug: "stepperMotor", category: "interfaces" },

    ];

    const componentsForSidebar= [
        {id: "passives", name: "Passives"},
        {id: "diodes", name: "Diodes"},
        {id: "transistors", name: "Transistors"},
        {id: "analogics", name: "Analog ICs"},
        {id: "microcontrollers", name: "Microcontrollers"},
        {id: "protections", name: "Protections"},
        {id: "interfaces", name: "Interfaces"},
    ]

    //Doc page Components section scroll logic
    useEffect(() => {
        // မျက်နှာပြင်ပေါ် ရောက်/မရောက် စောင့်ကြည့်မည့် logic
        const observer = new IntersectionObserver(
      (entries) => {
        // Screen ထဲကို ဝင်လာတဲ့ (Intersecting ဖြစ်တဲ့) အရာတွေကိုပဲ စစ်မယ်
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
          setActiveId(visibleEntries[0].target.id);
      },
       { 
         rootMargin: '-20% 0px -60% 0px',
         threshold: [0.1, 0.5, 0.9]
       }

    );
        // Heading တစ်ခုချင်းစီကို လိုက်ကြည့်ခိုင်းခြင်း
        componentsForSidebar.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) observer.observe(element);
        });
    
        return () => observer.disconnect();
      }, [componentsForSidebar]);

    const categories = [...new Set(docArray.map(item => item.category))];

    // လက်ရှိ ရောက်နေတဲ့ index ကို ရှာမယ်
    const currentIndex = docArray.findIndex(item => item.slug === fileName);
    const prevDoc = docArray[currentIndex - 1];
    const nextDoc = docArray[currentIndex + 1];

    useEffect(() => {
        // File path ကို public folder အောက်ကနေ တိုက်ရိုက် fetch လုပ်မယ်
        const fetchPath = `/docs/${activeCategory}/${fileName}.md`;
        fetch(fetchPath)
            .then(res => {
                if (!res.ok) throw new Error("File not found");
                return res.text();
            })
            .then(text => setContent(text))
            .catch(err => {
                console.error("Error fetching markdown:", err);
                setContent("# Error\nဒီစာမျက်နှာကို ရှာမတွေ့ပါဘူး။");
            });
            
        // စာမျက်နှာအသစ်ရောက်တိုင်း အပေါ်ဆုံးကို ပြန်တင်ပေးမယ်
        window.scrollTo(0, 0);
    }, [fileName]);

    return (
        <section className="w-full relative h-auto grid grid-cols-5 gap-1 lg:gap-6 xl:gap-8">
            
             <MobileLeftSidebar categories={categories} docArray={docArray} openCategory={openCategory} setOpenCategory={setOpenCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* Left Sidebar */}
            <div className="sticky bg-soft overflow-y-auto hidden lg:flex flex-col items-start gap-4 py-10"
                 style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>
                     {/* Search Bar */}
                    <div className="w-full px-3 mb-2">
                        <div className="relative">
                            <FontAwesomeIcon 
                                icon={faSearch} 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-sm"
                            />
                            <input
                                type="text"
                                placeholder="Search components..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg bg-bg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            setOpenCategory("components");
                            navigate("/doc/components")}}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all 
                            ${openCategory === "components" ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}>
                                <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMicrochip} size="xs" />
                            <span className="capitalize font-bold text-sm">Components</span>
                            </div>
                        </button>
                    {categories.map((cat) => {
                        const hasMatchingItems = docArray
                            .filter(item => item.category === cat)
                            .some(item => searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()));
                        
                        const shouldShowCategory = searchTerm === "" || hasMatchingItems;
                        const shouldAutoExpand = searchTerm !== "" && hasMatchingItems;
                        
                        if (!shouldShowCategory) return null;
                        
                        return (
                        <div key={cat} className="flex flex-col w-full">
                        {/* Category Header (Dropdown Button) */}
                        <button
                            onClick={() =>  
                                setOpenCategory(openCategory === cat ? null : cat)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all 
                            ${(openCategory === cat || shouldAutoExpand) ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                        >
                            <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMicrochip} size="xs" />
                            <span className="capitalize font-bold text-sm">{cat}</span>
                            </div>
                            <FontAwesomeIcon 
                            icon={openCategory === cat ? faChevronDown : faChevronRight} 
                            className="text-[10px]" 
                            />
                        </button>

                        {/* Sub-menu items (Dropdown Content) */}
                        {(openCategory === cat || shouldAutoExpand) && (
                            <div className="flex flex-col ml-4 mt-1 border-l border-slate-200 dark:border-slate-700">
                            {docArray
                                .filter(item => item.category === cat)
                                .filter(item => searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(item => {
                                    const isHighlighted = searchTerm !== "" && item.name.toLowerCase().includes(searchTerm.toLowerCase());
                                    return (
                                        <Link
                                            key={item.slug}
                                            to={`/doc/${item.category}/${item.slug}`}
                                            className={`pl-4 py-1.5 text-sm transition-all border-l-2 -ml-[1px]
                                            ${fileName === item.slug 
                                                ? "border-purple-500 text-purple-600 font-bold" 
                                                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}
                                            ${isHighlighted ? "bg-yellow-100 dark:bg-yellow-900/20" : ""}`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                                {docArray
                                    .filter(item => item.category === cat)
                                    .filter(item => searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                    <div className="pl-4 py-2 text-sm text-slate-400 italic">
                                        No components found
                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                    );})}
                
            </div>

            {/* Main Content */}
                {
                    !fileName
                    ?
                    <div className="bg-bg py-6 md:py-8 lg:py-10 col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen overflow-x-hidden">
                        <Components/>
                    </div>
                    :
                    <div className="bg-bg py-6 md:py-8 lg:py-10 col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen overflow-x-hidden">
                        <MarkdownView markdown={content} />
                        <div className="w-full h-0.5 bg-border my-8"></div>

                        {/* Dynamic Pagination Buttons */}
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                {prevDoc && (
                                    <button 
                                        onClick={() => navigate(`/doc/${prevDoc.category}/${prevDoc.slug}`)}
                                        className="px-2 py-1 md:px-4 md:py-2 ms-2 text-sm md:text-base md:text-lg border-1 md:border-2 border-text-main text-text-main rounded-lg shadow hover:bg-text-main hover:text-bg transition-all"
                                    >
                                        ← {prevDoc.name}
                                    </button>
                                )}
                            </div>
                            <div>
                                {nextDoc && (
                                    <button 
                                        onClick={() => navigate(`/doc/${nextDoc.category}/${nextDoc.slug}`)}
                                        className="px-2 py-1 md:px-4 md:py-2 me-2 text-sm md:text-base md:text-lg border-1 md:border-2 border-text-main text-text-main rounded-lg shadow hover:bg-text-main hover:text-bg transition-all"
                                    >
                                        {nextDoc.name} →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                }
                {/* Right Sidebar (Optional/TOC) */}
                    {!fileName 
                    ?
                     <aside className="sticky overflow-y-auto bg-soft hidden xl:block py-12 px-4"
                                    style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>
                        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest mb-4">
                            On this page
                        </h3>  
                        <nav>
                            <ul className="space-y-3 text-[13px] border-l border-slate-200 dark:border-slate-800">
                            {componentsForSidebar.map((item) => (
                                <li key={item.id} onClick={() => setActiveId(item.id)}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block pl-4 -ml-px border-l-2 transition-all duration-200 ${
                                    activeId === item.id
                                        ? "border-purple-500 text-purple-600 dark:text-purple-400 font-bold"
                                        : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                                    }`}
                                >
                                    {item.name}
                                </a>
                                </li>
                            ))}
                            </ul>
                        </nav>
                    </aside>
                    :
                    <RightSidebar headings={headings} />}
                    
                
        </section>
    );
}