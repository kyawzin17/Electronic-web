import React, { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch, faMicrochip, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MobileLeftSidebar({categories, docArray, openCategory, setOpenCategory, searchTerm, setSearchTerm}) {
    const { menu, setMenu} = useAppContext();
    const { category: activeCategory, fileName } = useParams(); // URL parameter ကနေ ယူမယ်၊ default က resistor
    const navigate = useNavigate();

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup function to restore scroll on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menu]);

    if (!menu) return null;

    return (
    <div className="fixed duration-900 inset-0 z-101 lg:hidden">
        {/* Overlay */}
        <div 
            className="absolute inset-0 bg-black/50 transition-opacity duration-300" 
            onClick={() => setMenu(false)}
        ></div>
        
        {/* Menu Container */}
        <div className="absolute left-0 top-0 h-full w-80 bg-soft shadow-lg transform transition-transform duration-300 translate-x-0">
            {/* Header */}
            <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-semibold text-text-main">Menu</h3>
                <button 
                    onClick={() => setMenu(false)}
                    className="p-2 rounded-md hover:bg-border transition-colors"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-text-main" />
                </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100% - 73px)' }}>
                        {/* Search Bar */}
                        <div className="mb-4 mt-4">
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
                        
                        {/* Components Button */}
                        <button 
                            onClick={() => {
                                setOpenCategory("components");
                                navigate("/doc/components");
                                setMenu(false);
                            }}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all mb-2
                                ${openCategory === "components" ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faMicrochip} size="xs" />
                                    <span className="capitalize font-bold text-sm">Components</span>
                                </div>
                            </button>
                        
                        {/* Categories */}
                        {categories.map((cat) => {
                            const hasMatchingItems = docArray
                                .filter(item => item.category === cat)
                                .some(item => searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()));
                            
                            const shouldShowCategory = searchTerm === "" || hasMatchingItems;
                            const shouldAutoExpand = searchTerm !== "" && hasMatchingItems;
                            
                            if (!shouldShowCategory) return null;
                            
                            return (
                                <div key={cat} className="flex flex-col w-full mb-2">
                                    <button
                                        onClick={() => setOpenCategory(openCategory === cat ? null : cat)}
                                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all 
                                        ${(openCategory === cat || shouldAutoExpand) ? "bg-slate-100 dark:bg-slate-800 text-purple-500" : "text-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faMicrochip} size="xs" />
                                            <span className="capitalize font-bold text-sm">{cat}</span>
                                        </div>
                                        <FontAwesomeIcon 
                                            icon={(openCategory === cat || shouldAutoExpand) ? faChevronDown : faChevronRight} 
                                            className="text-[10px]" 
                                        />
                                    </button>

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
                                                            onClick={() => setMenu(false)}
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
                            );
                        })}
</div>
                    </div>
                </div>
    )
}