import React, { useState } from 'react';

const DiodeSimulator: React.FC = () => {
  // false = Reverse Bias (Blocked), true = Forward Bias (Allowed)
  const [isForwardBias, setIsForwardBias] = useState<boolean>(true);

  const togglePolarity = () => {
    setIsForwardBias(!isForwardBias);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      border: '2px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center'
    }}>
      <h2>Diode Working Mechanism Simulator</h2>
      <p style={{ color: '#555' }}>
        Battery Direction ကို ပြောင်းလဲပြီး Diode ရဲ့ အလုပ်လုပ်ပုံကို လေ့လာကြည့်ပါ။
      </p>

      {/* --- CSS Animation Static Styles --- */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .moving-current {
          stroke-dasharray: 8, 12;
          animation: dash 1.5s linear infinite;
        }
      `}</style>

      {/* --- Simulator Canvas (SVG) --- */}
      <svg width="500" height="250" viewBox="0 0 500 250" style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}>
        
        {/* Circuit Wires Base (အနောက်က ပတ်လမ်းအမည်းလိုင်း) */}
        <path d="M 100 125 L 180 125" stroke="#333" strokeWidth="4" fill="none" />
        <path d="M 220 125 L 360 125" stroke="#333" strokeWidth="4" fill="none" />
        <path d="M 100 125 L 100 200 L 400 200 L 400 125 L 390 125" stroke="#333" strokeWidth="4" fill="none" />

        {/* --- CURRENT FLOW ANIMATION (CSS Dash Array Moving Effect) --- */}
        {/* Forward Bias ဖြစ်မှ Current လိုင်းတွေ ရွေ့လျားပြေးနေမှာဖြစ်ပါတယ် */}
        {isForwardBias && (
          <g fill="none" stroke="#2ecc71" strokeWidth="4" strokeLinecap="round">
            {/* Battery (+) မှ ထွက်လာပြီး ပတ်လမ်းအတိုင်းစီးဆင်းမည့် လိုင်းများ */}
            <path d="M 220 200 L 100 200 L 100 125 L 180 125" className="moving-current" />
            <path d="M 220 125 L 360 125" className="moving-current" />
            <path d="M 378 125 L 400 125 L 400 200 L 245 200" className="moving-current" />
          </g>
        )}

        {/* --- DIODE SYMBOL --- */}
        <g transform="translate(180, 95)">
          {/* Triangle pointing Right */}
          <polygon points="0,5 0,55 40,30" fill={isForwardBias ? "#2ecc71" : "#e74c3c"} stroke="#333" strokeWidth="3" />
          {/* Cathode Bar */}
          <line x1="40" y1="5" x2="40" y2="55" stroke="#333" strokeWidth="4" />
          
          {/* Diode Labels */}
          <text x="-25" y="2" fontSize="12" fontWeight="bold" fill="#333">Anode (+)</text>
          <text x="45" y="2" fontSize="12" fontWeight="bold" fill="#333">Cathode (-)</text>
        </g>

        {/* --- BATTERY (Direction changes based on state) --- */}
        <g transform="translate(220, 185)">
          {isForwardBias ? (
            /* Forward Bias: Long line (Plus) on Left, Short line (Minus) on Right */
            <>
              <line x1="0" y1="0" x2="0" y2="30" stroke="#333" strokeWidth="6" />
              <line x1="25" y1="7" x2="25" y2="23" stroke="#333" strokeWidth="3" />
              <text x="-15" y="-5" fontSize="14" fill="green" fontWeight="bold">+</text>
              <text x="30" y="-5" fontSize="14" fill="red" fontWeight="bold">-</text>
            </>
          ) : (
            /* Reverse Bias: Short line (Minus) on Left, Long line (Plus) on Right */
            <>
              <line x1="0" y1="7" x2="0" y2="23" stroke="#333" strokeWidth="3" />
              <line x1="25" y1="0" x2="25" y2="30" stroke="#333" strokeWidth="6" />
              <text x="-10" y="-5" fontSize="14" fill="red" fontWeight="bold">-</text>
              <text x="20" y="-5" fontSize="14" fill="green" fontWeight="bold">+</text>
            </>
          )}
          <text x="-5" y="45" fontSize="12" fontFamily="sans-serif" fill="#333">Battery</text>
        </g>

        {/* --- LED / BULB (Glows if Forward Bias) --- */}
        <g transform="translate(360, 110)">
          <circle cx="15" cy="15" r="18" 
            fill={isForwardBias ? "#f1c40f" : "#bdc3c7"} 
            stroke="#333" strokeWidth="3" 
            style={{ transition: 'fill 0.3s ease' }}
          />
          <text x="-5" y="-12" fontSize="12" fill="#333">LED Bulb</text>
          
          {/* Light Rays if Glowing */}
          {isForwardBias && (
            <g stroke="#f39c12" strokeWidth="2">
              <line x1="15" y1="-8" x2="15" y2="-15" />
              <line x1="-5" y1="5" x2="-12" y2="0" />
              <line x1="35" y1="5" x2="42" y2="0" />
            </g>
          )}
        </g>
      </svg>

      {/* --- STATUS INFORMATION --- */}
      <div style={{
        marginTop: '15px',
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: isForwardBias ? '#2ecc71' : '#e74c3c',
        transition: 'background-color 0.3s ease'
      }}>
        {isForwardBias 
          ? "FORWARD BIAS: Current စီးဆင်းနေပါတယ် (Light ON)" 
          : "REVERSE BIAS: Current ကို ပိတ်ဆို့ထားပါတယ် (Light OFF)"
        }
      </div>

      {/* --- CONTROL BUTTON --- */}
      <button 
        onClick={togglePolarity}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          borderRadius: '5px',
          border: '1px solid #333',
          backgroundColor: '#34495e',
          color: '#fff',
        }}
      >
        Battery Direction ပြောင်းရန်
      </button>
    </div>
  );
};

export default DiodeSimulator;