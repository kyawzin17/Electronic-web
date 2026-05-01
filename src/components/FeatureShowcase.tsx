import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBolt, FaRobot } from 'react-icons/fa';

// GSAP Plugin ကို Register လုပ်ခြင်း
gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Background Shapes Animation (အပေါ်အောက် ပေါလောပေါ်နေစေရန်)
    gsap.to('.floating-shape', {
      y: -20,
      rotation: '+=15',
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: 0.3,
    });

    // 2. Scroll Animation (Scroll ဆွဲချချိန်မှာ ပေါ်လာစေရန်)
    const sections = gsap.utils.toArray('.animate-section');
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%', // မျက်နှာပြင်ရဲ့ 80% ကို ရောက်ရင် စတင်မယ်
          },
        }
      );
    });
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#0b1121] py-24 px-6 overflow-hidden font-myanmar"
    >
      {/* Background Glow Effects (နောက်ခံ အရောင်လွင့်နေသည့် ပုံစံ) */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Floating Elements (နောက်ခံက ပျံဝဲနေတဲ့ ပုံစံငယ်လေးများ) */}
      <div className="floating-shape absolute top-32 left-10 w-4 h-4 border border-cyan-500/50 rotate-45"></div>
      <div className="floating-shape absolute top-1/2 right-20 w-3 h-3 bg-purple-500/50 rounded-full"></div>
      <div className="floating-shape absolute bottom-32 left-1/4 w-5 h-1 bg-cyan-400/50 -rotate-12"></div>

      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        
        {/* ================== SECTION 1: DOCUMENTATION ================== */}
        <div className="animate-section flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content (Left) */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#1e1b4b] p-3 rounded-xl border border-purple-500/30">
                <FaBolt className="text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 tracking-widest text-xs uppercase font-bold">DOCUMENTATION</p>
                <p className="text-purple-300 text-sm">သင်ခန်းစာများ</p>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.6]">
              အခြေခံမှ အဆင့်မြင့်အထိ စနစ်တကျလေ့လာပါ။
            </h2>

            <p className="text-slate-400 text-lg leading-[2] max-w-xl">
              မိုက်ခရိုကွန်ထရိုလာများ၊ ဆင်ဆာများ နှင့် Circuit design သင်ခန်းစာများကို မြန်မာလို လွယ်ကူစွာ ဖတ်ရှုနိုင်ပါသည်။ Code နမူနာများ၊ wiring diagram များကို Documentation page တွင် အပြည့်အစုံ လေ့လာပါ။
            </p>

            <button className="mt-4 px-6 py-3 rounded-lg border border-purple-500/50 text-purple-300 font-medium hover:bg-purple-500/10 transition-colors duration-300">
              သင်ခန်းစာများဖတ်ရန်
            </button>
          </div>

          {/* Tablet Mockup (Right) */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative group perspective-1000">
              {/* Mockup Container */}
              <div className="transform rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out 
                              border-[8px] border-slate-900 bg-slate-950 rounded-[1.5rem] overflow-hidden 
                              shadow-[0_0_50px_-10px_rgba(168,85,247,0.5)]">
                {/* Browser Header */}
                <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  <div className="mx-auto bg-slate-800 rounded-md w-1/2 h-4"></div>
                </div>
                {/* Placeholder for Documentation Image (Replace with your screenshot) */}
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Documentation Mockup" 
                  className="w-full aspect-[4/3] object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================== SECTION 2: PROJECTS ================== */}
        <div className="animate-section flex flex-col lg:flex-row-reverse items-center gap-16">
          {/* Text Content (Right) */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#083344] p-3 rounded-xl border border-cyan-500/30">
                <FaRobot className="text-cyan-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 tracking-widest text-xs uppercase font-bold">PROJECT SHOWCASE</p>
                <p className="text-cyan-300 text-sm">ပရောဂျက်များ</p>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.6]">
              လက်တွေ့အသုံးချ Project များဖြင့် လေ့ကျင့်ပါ။
            </h2>

            <p className="text-slate-400 text-lg leading-[2] max-w-xl">
              Wiring diagrams, component lists နဲ့ source code အပြည့်အစုံပါဝင်တဲ့ DIY project များကို တစ်ဆင့်ချင်းစီ လုပ်ဆောင်ကြည့်နိုင်ပါသည်။ သင့်စိတ်ကူးတွေကို အကောင်အထည်ဖော်ပါ။
            </p>

            <button className="mt-4 px-6 py-3 rounded-lg border border-cyan-500/50 text-cyan-300 font-medium hover:bg-cyan-500/10 transition-colors duration-300">
              ပရောဂျက်များကြည့်ရန်
            </button>
          </div>

          {/* Tablet Mockup (Left) */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="relative group perspective-1000">
              {/* Mockup Container */}
              <div className="transform -rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out 
                              border-[8px] border-slate-900 bg-slate-950 rounded-[1.5rem] overflow-hidden 
                              shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)]">
                {/* Browser Header */}
                <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  <div className="mx-auto bg-slate-800 rounded-md w-1/2 h-4"></div>
                </div>
                {/* Placeholder for Project Image (Replace with your screenshot) */}
                <img 
                  src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1000&auto=format&fit=crop" 
                  alt="Projects Mockup" 
                  className="w-full aspect-[4/3] object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureShowcase;