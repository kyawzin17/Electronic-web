
const LEDIcon= () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-auto stroke-text-main"
      viewBox="0 0 300 100" // Adjust as needed
      fill="none" 
      strokeWidth="3"
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Anode Label */}
      <text x="50" y="40" fontSize="16" className="fill-text-main"  stroke="none">
        Anode
      </text>

      {/* Diode Symbol */}
      <line x1="70" y1="50" x2="150" y2="50" />
      <polygon points="150,30 150,70 190,50" />
      <line x1="190" y1="30" x2="190" y2="70" />
      <line x1="190" y1="50" x2="270" y2="50" />

      {/* Light Emission Arrows */}
      <line x1="180" y1="30" x2="189" y2="16" />
      <polyline points="170,14 179,12 180,21" />

      <line x1="170" y1="26" x2="179" y2="12" />
      <polyline points="183,15 191,14 192,22" />

      {/* Cathode Label */}
      <text x="235" y="40" fontSize="16" className="fill-text-main"  stroke="none">
        Cathode
      </text>
    </svg>
  );
};

export default LEDIcon;