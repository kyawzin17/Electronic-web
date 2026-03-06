import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Dynamic route အတွက်
import { useAppContext } from "../hooks/useAppContext";
import MarkdownView from "../components/MarkdownView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import RightSidebar from "../components/RightSideBar";

export default function Docs() {
    const { headerHeight } = useAppContext();
   const { category: activeCategory, fileName = "resistor" } = useParams(); // URL parameter ကနေ ယူမယ်၊ default က resistor
    const navigate = useNavigate();
    const [content, setContent] = useState("");

  const [headings, setHeadings] = useState([]);

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

    const [ openCategory, setOpenCategory ]= useState( activeCategory || "passives" ); // Sidebar category open/close state
    
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

    ];

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
        <section className="w-full h-auto mx-auto grid grid-cols-5 gap-1 lg:gap-6 xl:gap-8">
            {/* Left Sidebar */}
            <div className="sticky bg-soft overflow-y-auto hidden lg:flex flex-col items-start gap-4 py-10"
                 style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>
                    {categories.map((cat) => (
                        <div key={cat} className="flex flex-col w-full">
                        {/* Category Header (Dropdown Button) */}
                        <button
                            onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all 
                            ${openCategory === cat ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
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
                        {openCategory === cat && (
                            <div className="flex flex-col ml-4 mt-1 border-l border-slate-200 dark:border-slate-700">
                            {docArray
                                .filter(item => item.category === cat)
                                .map(item => (
                                <Link
                                    key={item.slug}
                                    to={`/doc/${item.category}/${item.slug}`}
                                    className={`pl-4 py-1.5 text-sm transition-all border-l-2 -ml-[1px]
                                    ${fileName === item.slug 
                                        ? "border-purple-500 text-purple-600 font-bold" 
                                        : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}
                                >
                                    {item.name}
                                </Link>
                                ))}
                            </div>
                        )}
                        </div>
                    ))}
                {/* <div className="w-full flex flex-col gap-2 px-2.5">
                    <span className="text-md text-text-main font-semibold">Documentation</span>
                    <div className="w-full h-auto ps-2 flex flex-col gap-1 border-l-2 border-text-secondary">
                        {categories.map((item) => (
                            <Link
                                key={item.slug}
                                to={`/doc/${item.category}/${item.slug}`}
                                className={`w-full px-2 py-1 rounded-md transition-all ${
                                    // fileName ရော category ရော တူမှ active color ပေးမယ်
                                    fileName === item.slug && category === item.category 
                                        ? "bg-border text-text-main" 
                                        : "text-text-secondary hover:bg-bg"
                                } font-semibold text-md`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Main Content */}
            <div className="h-auto bg-bg py-6 md:py-8 lg:py-10 col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen">
                <MarkdownView markdown={content} />
                
                <div className="w-full h-0.5 bg-border my-8"></div>

                {/* Dynamic Pagination Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        {prevDoc && (
                            <button 
                                onClick={() => navigate(`/doc/${prevDoc.category}/${prevDoc.slug}`)}
                                className="px-4 py-2 border-2 border-text-main text-text-main rounded-lg shadow hover:bg-text-main hover:text-bg transition-all"
                            >
                                ← {prevDoc.name}
                            </button>
                        )}
                    </div>
                    <div>
                        {nextDoc && (
                            <button 
                                onClick={() => navigate(`/doc/${nextDoc.category}/${nextDoc.slug}`)}
                                className="px-4 py-2 border-2 border-text-main text-text-main rounded-lg shadow hover:bg-text-main hover:text-bg transition-all"
                            >
                                {nextDoc.name} →
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Optional/TOC) */}
            <RightSidebar headings={headings} />
        </section>
    );
}