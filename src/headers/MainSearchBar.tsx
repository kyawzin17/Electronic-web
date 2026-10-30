import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { Search, Command, Star, X } from 'lucide-react';
import searchData from '../searchData.json'; 
import { Link } from 'react-router-dom';

const fuse = new Fuse(searchData, {
  keys: ['title', 'tags', 'category'], 
  threshold: 0.3,
});

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Search Component တစ်ခုလုံးကို ဆုပ်ကိုင်ဖို့ ref ဆောက်မယ်
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // နှိပ်လိုက်တဲ့ နေရာက Search Bar ရဲ့ အပြင်ဘက် ဖြစ်နေရင် Result တွေကို ရှင်းပစ်မယ်
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    // Document တစ်ခုလုံးမှာ Click Event တပ်မယ်
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ctrl + K သို့မဟုတ် Cmd + K နှိပ်ရင် ဖွင့်မယ်၊ Esc နှိပ်ရင် ပိတ်မယ်
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;
    setQuery(searchString);

    if (searchString) {
      const searchResults = fuse.search(searchString);
      setResults(searchResults.map(result => result.item));
    } else {
      setResults([]);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  // camelCase တွေကို ဖတ်ရလွယ်အောင် ပြောင်းပေးမယ့် Function
  const formatTitle = (text: string) => {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <>
      {/* အပြင်ဘက်က Trigger Button (Navbar မှာ ထားရန်) */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full max-w-md px-2 py-1.5 text-sm text-text-secondary bg-transparent rounded-lg hover:bg-text-secondary/10 md:border border-text-main/80 hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center text-text-main">
          <Search size={20} className="mr-0 md:mr-2 opacity-70" />
          <span className="hidden text-text-secondary md:block pe-6">Search . . .</span>
        </div>
        <kbd className="hidden md:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-text-main bg-transparent border border-text-main rounded">
          <Command size={12} /> K
        </kbd>
      </button>

      {/* Dark Mode Modal Overlay */}
      {isOpen && (
        <div className="fixed h-screen inset-0 z-100 p-3 backdrop-blur-md sm:p-6 dark:bg-slate-950/75 bg-slate-900/35 role='dialog' aria-modal='true' aria-labelledby='library-manager-title'">
          
          {/* Modal Container */}
          <div ref={searchContainerRef} className="relative w-full mx-auto max-w-2xl bg-bg rounded-xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
            
            {/* Search Input Header */}
            <div className="flex items-center px-4 py-4 border-b border-slate-700/60">
              <Search size={22} className="text-blue-500 mr-3" />
              <input
                type="text"
                placeholder="Search documentation"
                value={query}
                onChange={handleSearch}
                autoFocus
                className="flex-1 bg-transparent text-text-main/80 placeholder:text-text-secondary focus:outline-none text-lg"
              />
              <button 
                onClick={closeModal}
                className="ml-4 px-2 py-1 text-[10px] font-bold tracking-wider text-text-main/40 uppercase bg-text-card/80 border border-text-main/80 rounded hover:bg-text-secondary/10 hover:text-text-main transition-colors"
              >
                esc
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto max-h-[60vh]">
              {results.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold tracking-wide text-text-main/90 uppercase">
                    Documentation
                  </div>
                  <ul>
                    {results.map((item) => (
                      <li key={item.id} className="group border-b border-slate-800/50 last:border-0">
                        <Link 
                          to={`/docs${item.link}`} 
                          onClick={closeModal}
                          className="flex items-center justify-between px-4 py-3 hover:bg-blue-600 transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-text-main/80 group-hover:text-white">
                              {formatTitle(item.title)}
                            </div>
                            {item.category && (
                              <div className="text-xs text-text-secondary group-hover:text-blue-200 mt-0.5 capitalize">
                                {item.category}
                              </div>
                            )}
                          </div>
                          
                          {/* ညာဘက်က Icon လေးများ (ပုံထဲကအတိုင်း) */}
                          <div className="hidden group-hover:flex items-center space-x-3 text-blue-200">
                            <Star size={16} className="hover:text-text-main transition-colors" />
                            <X size={16} className="hover:text-text-main transition-colors" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                query && (
                  <div className="px-4 py-14 text-center text-text-secondary">
                    No results found for "<span className="text-text-main/50">{query}</span>"
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end px-4 py-3 bg-soft/80 border-t border-text-main/60">
              <span className="text-xs text-text-secondary flex items-center gap-1.5">
                Search by <strong className="text-text-main/50 font-semibold tracking-wide">RDE</strong>
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;