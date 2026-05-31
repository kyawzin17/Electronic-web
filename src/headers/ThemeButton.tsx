import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faDesktop, faCheck } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme: currentTheme, setTheme: updateTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { id: 'light', name: 'Light', icon: faSun },
    { id: 'dark', name: 'Dark', icon: faMoon },
    { id: 'auto', name: 'Auto', icon: faDesktop },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-blue-500 transition-all flex items-center justify-center min-w-[40px]"
      >
        {currentTheme === 'light' && <FontAwesomeIcon icon={faSun} className="text-orange-500 text-lg" />}
        {currentTheme === 'dark' && <FontAwesomeIcon icon={faMoon} className="text-blue-400 text-lg" />}
        {currentTheme === 'auto' && <FontAwesomeIcon icon={faDesktop} className="text-slate-500 text-lg" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-20 overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  updateTheme(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors
                  ${currentTheme === opt.id 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-medium' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={opt.icon} className="w-4" />
                  {opt.name}
                </div>
                {currentTheme === opt.id && <FontAwesomeIcon icon={faCheck} className="text-[10px]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}