import React from "react";

const SearchBar = () => {

  return (
    <div className="max-w-2xl mx-auto mb-16 relative group">
      {/* Search Input Container */}
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-6 text-[var(--text-muted)] group-focus-within:text-[var(--primary)] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input 
          type="text" 
          placeholder="Search projects (e.g. Arduino, Sensor, IoT...)"
          className="w-full pl-16 pr-24 py-5 bg-[var(--bg-card)] border-2 border-[var(--border)] rounded-[2rem] text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)] shadow-lg transition-all placeholder:text-[var(--text-muted)]"
        />

        {/* Shortcut Hint */}
        <div className="absolute right-6 flex gap-1 items-center bg-[var(--bg-soft)] px-2 py-1 rounded-lg border border-[var(--border)]">
          <span className="text-[10px] font-bold text-[var(--text-muted)]">CTRL</span>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">K</span>
        </div>
      </div>

      {/* Popular Tags (Quick Filters) */}
      <div className="flex gap-3 mt-4 px-4 overflow-x-auto no-scrollbar">
        {['Arduino', 'ESP32', 'PCB', 'IoT'].map(tag => (
          <button key={tag} className="text-xs font-medium px-4 py-1.5 rounded-full bg-[var(--bg-soft)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all">
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;