import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Dynamic route အတွက်
import { useAppContext } from "../hooks/useAppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faMicrochip, faSearch } from '@fortawesome/free-solid-svg-icons';
import RightSidebar from "../components/RightSideBar";
import MobileLeftSidebar from "../components/MobileLeftSidebar";
import LearnSidebarMode from "../components/LearnSidebarMode";
// ၁။ ဒါကို file ရဲ့ ထိပ်ဆုံးမှာ ထားပါ
const allLessons = import.meta.glob('../learns/**/*.mdx');

interface FormattedHeading {
    title: string;
    id: string;
}

export default function Learn() {
    const [ActiveComp, setActiveComp] = useState<React.FC | null>(null);

    const { headerHeight } = useAppContext();
    
   const { category: activeCategory, fileName } = useParams<{ category: string; fileName: string | undefined }>(); // URL parameter ကနေ ယူမယ်၊ default က resistor
    const navigate = useNavigate();
    const [content, setContent] = useState<string>("");
  const [headings, setHeadings] = useState<FormattedHeading[]>([] as FormattedHeading[]);
  const [activeId, setActiveId] = useState<string>("");

  const [searchTerm, setSearchTerm]= useState<string>("");
  
 // useEffect ထဲမှာ ဒါကို ထည့်ကြည့်ပါ
// useEffect(() => {
//   console.log("Vite ထဲရှိသော လမ်းကြောင်းများ:", Object.keys(allLessons));
//   console.log("သင် ခေါ်နေသော လမ်းကြောင်း:", `../learns/${activeCategory}/${fileName}.mdx`);
// }, [activeCategory, fileName]);
useEffect(() => {
  const loadFile = async () => {
    // ၂။ fileName မပါရင် ဘာမှမလုပ်ဘဲ ပြန်ထွက်မယ်
    if (!fileName) return;

    // ၃။ လမ်းကြောင်း တည်ဆောက်ခြင်း
    const categoryPath = activeCategory ? `${activeCategory}/` : "";
    const path = `../learns/${categoryPath}${fileName}.mdx`;
    if (allLessons[path]) {
      try {
        const mod: any = await allLessons[path]();
        // ၄။ Component ကို state ထဲ ထည့်ခြင်း
        setActiveComp(() => mod.default);
      } catch (err) {
        console.error("MDX load လုပ်ရာတွင် error တက်သည်:", err);
        setActiveComp(null);
      }
    } else {
      console.warn("File ရှာမတွေ့ပါ:", path);
      setActiveComp(null);
    }
  };

  loadFile();
}, [activeCategory, fileName]);


  useEffect(() => {
  // MDX Component က screen ပေါ်မှာ render ဖြစ်ပြီးတဲ့အထိ ခဏစောင့်ဖို့ timer သုံးရပါမယ်
  const timer = setTimeout(() => {
    // 1. 'article' tag ထဲမှာရှိတဲ့ h3 အားလုံးကို ရှာမယ်
    // (သင့်ရဲ့ MDX content ကို article tag နဲ့ အုပ်ထားဖို့ လိုပါမယ်)
    const headingElements = document.querySelectorAll("article h2");

    const formattedHeadings: FormattedHeading[] = Array.from(headingElements).map((el) => {
      const title = el.textContent || "";
      
      // 2. ID မရှိသေးရင် Title ကို အခြေခံပြီး ID တစ်ခု တည်ဆောက်မယ်
      // (Right Sidebar က လှမ်းနှိပ်ရင် သွားလို့ရအောင်လို့ပါ)
      const id = el.id || title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      if (!el.id) el.id = id; // DOM element မှာ id သွားထည့်ပေးလိုက်တာပါ

      return { title, id };
    });

    setHeadings(formattedHeadings);
  }, 100); // 100ms ခန့် စောင့်ရင် လုံလောက်ပါတယ်

  return () => clearTimeout(timer);
}, [ActiveComp, fileName]); // Component အသစ်ပြောင်းတိုင်း ဒါမှမဟုတ် file ပြောင်းတိုင်း run မယ်

    const [ openCategory, setOpenCategory ]= useState<string | null>( activeCategory || "components" ); // Sidebar category open/close state
    
    // Learning list
    const learningArray: {
        name: string;
        slug: string;
        category: string;
    }[]= [
        { name: "Resistor", slug: "resistor", category: "Chapter-1" },
        { name: "Variable Resistor", slug: "variableResistor", category: "Chapter-1" },
        { name: "Capacitor", slug: "capacitor", category: "Chapter-1" },
        { name: "Inductor", slug: "inductor", category: "Chapter-1" },
        { name: "Diode", slug: "diode", category: "Chapter-1" },
        { name: "Transistor", slug: "transistor", category: "Chapter-1" },
        { name: "Integrated Circuit", slug: "integrated-circuit", category: "Chapter-1" },
        { name: "Potentiometer", slug: "potentiometer", category: "Chapter-1" },
        { name: "Rheostat", slug: "rheostat", category: "Chapter-1" },
        { name: "Timmer", slug: "timmer", category: "Chapter-1" },
        { name: "Ferrite Bead", slug: "ferriteBead", category: "Chapter-1" },
        { name: "Choke Coil", slug: "chokeCoil", category: "Chapter-1" },
        { name: "Transformer", slug: "transformer", category: "Chapter-1" },
        { name: "Step-up Transformer", slug: "stepUpTransformer", category: "Chapter-1" },
        { name: "Step-down Transformer", slug: "stepDownTransformer", category: "Chapter-1" },
        { name: "Autotransformer", slug: "autoTransformer", category: "Chapter-1" },
    ];

    const componentsForSidebar= [
        {id: "chapter-1", name: "Chapter 1"},
        {id: "chapter-2", name: "Chapter 2"},
        {id: "chapter-3", name: "Chapter 3"},
        {id: "chapter-4", name: "Chapter 4"},
        {id: "chapter-5", name: "Chapter 5"},
        {id: "chapter-6", name: "Chapter 6"},
        {id: "chapter-7", name: "Chapter 7"},
    ]
    //Doc page Components section scroll logic
    useEffect(() => {
  // MDX content တွေ DOM ထဲ ရောက်အောင် ခဏစောင့်မယ်
  const timer = setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Intersecting ဖြစ်နေတဲ့ element တွေထဲကမှ screen ရဲ့ အပေါ်ပိုင်းနဲ့ အနီးဆုံး တစ်ခုကိုပဲ ယူမယ်
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
         rootMargin: '-20% 0px -60% 0px',
         threshold: [0.1, 0.5, 0.9]
      }
    );

    // Sidebar မှာရှိတဲ့ headings id တွေကို လိုက်ကြည့်ခိုင်းမယ်
    headings.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, 500); // MDX render ကာလ

  return () => clearTimeout(timer);
}, [headings, ActiveComp]); // Content ပြောင်းတိုင်း ပြန် run မယ်

    const categories = [...new Set(learningArray.map(item => item.category))];

    // လက်ရှိ ရောက်နေတဲ့ index ကို ရှာမယ်
    const currentIndex = learningArray.findIndex(item => item.slug === fileName);
    const prevDoc = learningArray[currentIndex - 1];
    const nextDoc = learningArray[currentIndex + 1];

    return (
        <section className="w-full relative h-auto grid grid-cols-5 gap-1 lg:gap-6 xl:gap-8">
            
             <MobileLeftSidebar categories={categories} docArray={learningArray} openCategory={openCategory} setOpenCategory={setOpenCategory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* Left Sidebar */}
            <div className="sticky bg-soft overflow-y-auto hidden lg:flex flex-col items-start gap-4"
                 style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>                   
                     <LearnSidebarMode />
                     {/* Search Bar */}
                    <div className="w-full px-3 mb-1">
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
    
                    {categories.map((cat) => {
                        const hasMatchingItems = learningArray
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
                            {learningArray
                                .filter(item => item.category === cat)
                                .filter(item => searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(item => {
                                    const isHighlighted = searchTerm !== "" && item.name.toLowerCase().includes(searchTerm.toLowerCase());
                                    return (
                                        <Link
                                            key={item.slug}
                                            to={`/doc/learning/${item.category}/${item.slug}`}
                                            className={`pl-4 py-1.5 text-sm transition-all border-l-2 -ml-1
                                            ${fileName === item.slug 
                                                ? "border-purple-500 text-purple-600 font-bold" 
                                                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}
                                            ${isHighlighted ? "bg-yellow-100 dark:bg-yellow-900/20" : ""}`}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                                {learningArray
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
                    <div className="bg-bg/80 py-6 md:py-8 lg:py-10 px-6 col-span-5 lg:col-span-4 xl:col-span-3 min-h-screen overflow-x-hidden">
                        {ActiveComp ? 
                        <article className="prose prose-slate max-w-none text-md text-text-main/90">
                            <ActiveComp />
                        </article>
                         : <p>Loading or File Not Found...</p>}
                        <div className="w-full h-0.5 bg-border my-8"></div>
                        {/* Dynamic Pagination Buttons */}
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                {prevDoc && (
                                    <button 
                                        onClick={() => navigate(`/doc/${prevDoc.category}/${prevDoc.slug}`)}
                                        className="px-2 py-1 md:px-4 md:py-2 ms-2 text-sm md:text-base border md:border-2 border-text-main text-text-main rounded-lg shadow hover:bg-text-main hover:text-bg transition-all"
                                    >
                                        ← {prevDoc.name}
                                    </button>
                                )}
                            </div>
                            <div>
                                {nextDoc && (
                                    <button 
                                        onClick={() => navigate(`/doc/${nextDoc.category}/${nextDoc.slug}`)}
                                        className="px-2 py-1 md:px-4 md:py-2 me-2 text-sm md:text-base border md:border-2 border-text-main text-text-main rounded-lg shadow hover:bg-text-main hover:text-bg transition-all"
                                    >
                                        {nextDoc.name} →
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                {/* Right Sidebar (Optional/TOC) */}
                    {!fileName 
                    ?
                     <aside className="sticky overflow-y-auto bg-soft hidden xl:block py-12 px-4"
                                    style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}>
                        <p className="text-base font-semibold text-text-main uppercase tracking-widest mb-4">
                            On this page
                        </p>  
                        <nav>
                            <ul className="space-y-3 text-[13px] border-l border-slate-200 dark:border-slate-800">
                            {componentsForSidebar.map((item: any) => (
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