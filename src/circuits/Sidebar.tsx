import React, { useState, useEffect } from 'react';
import '@wokwi/elements';

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // --- အစိတ်အပိုင်း ၂၀ စာရင်း ---
  const allComponents = [
    { type: 'arduino', name: 'Arduino Uno', tag: 'wokwi-arduino-uno', props: {}, scale: 0.12, yOffset: '-15px' },
    { type: 'mega', name: 'Arduino Mega', tag: 'wokwi-arduino-mega', props: {}, scale: 0.08, yOffset: '-10px' },
    { type: 'nano', name: 'Arduino Nano', tag: 'wokwi-arduino-nano', props: {}, scale: 0.25, yOffset: '0px' },
    { type: 'led-red', name: 'Red LED', tag: 'wokwi-led', props: { color: 'red' }, scale: 0.8, yOffset: '0px' },
    { type: 'led-green', name: 'Green LED', tag: 'wokwi-led', props: { color: 'green' }, scale: 0.8, yOffset: '0px' },
    { type: 'led-blue', name: 'Blue LED', tag: 'wokwi-led', props: { color: 'blue' }, scale: 0.8, yOffset: '0px' },
    { type: 'resistor', name: 'Resistor', tag: 'wokwi-resistor', props: { value: '1000' }, scale: 0.6, yOffset: '0px' },
    { type: 'pushbutton', name: 'Pushbutton', tag: 'wokwi-pushbutton', props: { color: 'red' }, scale: 0.5, yOffset: '0px' },
    { type: 'potentiometer', name: 'Potentiometer', tag: 'wokwi-potentiometer', props: {}, scale: 0.4, yOffset: '0px' },
    { type: 'slide-switch', name: 'Slide Switch', tag: 'wokwi-slide-switch', props: {}, scale: 0.6, yOffset: '0px' },
    { type: '7segment', name: '7-Segment', tag: 'wokwi-7segment', props: {}, scale: 0.4, yOffset: '0px' },
    { type: 'lcd1602', name: 'LCD 1602', tag: 'wokwi-lcd1602', props: {}, scale: 0.15, yOffset: '0px' },
    { type: 'neopixel', name: 'NeoPixel', tag: 'wokwi-neopixel', props: {}, scale: 0.6, yOffset: '0px' },
    { type: 'buzzer', name: 'Buzzer', tag: 'wokwi-buzzer', props: {}, scale: 0.5, yOffset: '0px' },
    { type: 'servo', name: 'Servo Motor', tag: 'wokwi-servo', props: {}, scale: 0.2, yOffset: '0px' },
    { type: 'hc-sr04', name: 'Ultrasonic Sensor', tag: 'wokwi-hc-sr04', props: {}, scale: 0.2, yOffset: '0px' },
    { type: 'membrane-keypad', name: 'Keypad', tag: 'wokwi-membrane-keypad', props: {}, scale: 0.15, yOffset: '0px' },
  ];

  // Search filter လုပ်ခြင်း
  const filteredComponents = allComponents.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <aside className="w-80 bg-[#0f172a] text-white h-screen shadow-2xl border-r border-slate-800 flex flex-col z-50">
      <div className="p-6 pb-2">
        <h2 className="text-xl font-bold mb-6 text-cyan-400 tracking-tight">
          အစိတ်အပိုင်းများ
        </h2>

        {/* --- Search Bar --- */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="ရှာဖွေရန်..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:border-cyan-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="w-4 h-4 absolute left-3 top-2.5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* --- Components List --- */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        <div className="flex flex-col gap-4">
          {filteredComponents.length > 0 ? (
            filteredComponents.map((comp) => (
              <div
                key={comp.type}
                className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl p-3 cursor-grab active:cursor-grabbing hover:border-cyan-500/50 hover:bg-slate-800 transition-all h-32 flex flex-col items-center justify-center shadow-sm"
                onDragStart={(event) => onDragStart(event, comp.type)}
                draggable
              >
                <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pointer-events-none">
                  <div 
                    style={{ 
                      transform: `scale(${comp.scale}) translateY(${comp.yOffset})`,
                      transformOrigin: 'center center',
                    }}
                  >
                    {React.createElement(comp.tag, { ...comp.props })}
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <div className="text-[13px] font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">
                    {comp.name}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500 text-sm italic">
              ရှာမတွေ့ပါ...
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-900/80 border-t border-slate-800">
        <p className="text-[10px] text-slate-500 text-center font-medium">
          Total Components: {filteredComponents.length}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;