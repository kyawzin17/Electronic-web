import { useState } from 'react';

const LanguageToggle = () => {
  const [language, setLanguage] = useState<'EN' | 'MM'>('EN');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'MM' : 'EN'));
    // ဤနေရာတွင် i18n logic သို့မဟုတ် context state ပြောင်းလဲမှုကို ထည့်သွင်းနိုင်သည်
  };

  return (
    <div className="flex items-center gap-3 absolute right-[2%] top-[2%] cursor-pointer">
      <button
        onClick={toggleLanguage}
        className="group relative flex items-center bg-card/80 backdrop-blur-md border-2 border-slate-700/50 p-1 rounded-full w-20 h-10 transition-all duration-300 hover:border-cyan-500/60 shadow-inner"
      >
        {/* Toggle Slider */}
        <div
          className={`absolute top-1 bottom-1 w-8 h-8 rounded-full transition-all duration-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] ${
            language === 'EN' 
            ? 'left-1 bg-linear-to-br from-cyan-500 to-blue-600' 
            : 'left-[calc(100%-2.25rem)] bg-linear-to-br from-yellow-500 to-orange-600'
          }`}
        >
          <span className="text-[10px] font-black text-white">
            {language}
          </span>
        </div>

        {/* Background Labels */}
        <div className="flex justify-between w-full px-2 text-[10px] font-bold select-none pointer-events-none">
          <span className={`transition-opacity duration-300 ${language === 'MM' ? 'opacity-100 text-text-secondary' : 'opacity-0'}`}>EN</span>
          <span className={`transition-opacity duration-300 ${language === 'EN' ? 'opacity-100 text-text-secondary' : 'opacity-0'}`}>MM</span>
        </div>
      </button>
    </div>
  );
};

export default LanguageToggle;