import React, { useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap, animate } from 'framer-motion';

const AboutInformation: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseX = useMotionValue(0);
  
  // အမြန်နှုန်းကို ထိန်းချုပ်ဖို့ Motion Value အသစ်တစ်ခု ဖန်တီးပါမယ် (1 = ပုံမှန်အမြန်နှုန်း၊ 0 = ရပ်သွားသည်)
  const speedMultiplier = useMotionValue(1);

  // Hover ဖြစ်/မဖြစ် အပေါ်မူတည်ပြီး အမြန်နှုန်းကို ဖြည်းဖြည်းချင်း အတိုး/အလျှော့ လုပ်ပါမယ်
  useEffect(() => {
    if (isHovered) {
      // Hover လုပ်ရင် အရှိန်ကို 0.8 စက္ကန့်အတွင်း ဖြည်းဖြည်းချင်း 0 ထိ လျှော့ချမယ် (ရပ်သွားမယ်)
      animate(speedMultiplier, 0, { duration: 0.8, ease: "easeOut" });
    } else {
      // Hover ပြန်ခွာရင် အရှိန်ကို 0.8 စက္ကန့်အတွင်း ဖြည်းဖြည်းချင်း 1 ထိ ပြန်တင်မယ် (ပြန်သွားမယ်)
      animate(speedMultiplier, 1, { duration: 0.8, ease: "easeIn" });
    }
  }, [isHovered, speedMultiplier]);

  useAnimationFrame((time, delta) => {
    // လက်ရှိ အမြန်နှုန်း (speedMultiplier.get()) နဲ့ မြှောက်ပေးလိုက်တဲ့အတွက် ဖြည်းဖြည်းချင်း ရပ်သွား/စသွား ပါလိမ့်မယ်
    const moveBy = 1.5 * (delta / 16) * speedMultiplier.get(); 
    baseX.set(baseX.get() - moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-1200, 0, v)}px`);

  const exploreData = [
    {
      id: 1,
      icon: "📚",
      title: "ပြည့်စုံသော Components မှတ်တမ်းများ",
      subtitle: "(Comprehensive Docs)",
      description: "အီလက်ထရောနစ် ပစ္စည်း (၁၀၀) ကျော်ရဲ့ အလုပ်လုပ်ပုံ၊ အသုံးပြုနည်းနဲ့ အရေးကြီးတဲ့ အချက်အလက် အနှစ်ချုပ်များကို မိခင်ဘာသာစကား (မြန်မာလို) ဖြင့် လွယ်ကူရှင်းလင်းစွာ ရှာဖွေဖတ်ရှုနိုင်ပါတယ်။"
    },
    {
      id: 2,
      icon: "🗺️",
      title: "အဆင့်ဆင့် လေ့လာနိုင်သော လမ်းညွှန်",
      subtitle: "(Step-by-Step Learning)",
      description: "အီလက်ထရောနစ်ပညာကို သုညမှစတင်မယ့်သူ (Beginner) မှသည် ကျွမ်းကျင်သူ (Senior) အဆင့်ထိ Chapter အလိုက် အသေးစိတ် စနစ်တကျ လေ့လာနိုင်အောင် လမ်းပြမြေပုံ ဆွဲပေးထားပါတယ်။"
    },
    {
      id: 3,
      icon: "🛠️",
      title: "လက်တွေ့ ပရောဂျက်များ",
      subtitle: "(Hands-on Projects)",
      description: "ပရောဂျက်တစ်ခုချင်းစီအတွက် Circuit Board ဆက်သွယ်နည်းကစလို့၊ Code ရေးသားနည်းအဆုံး အဆင့်တိုင်းကို ကိုယ်တိုင်လိုက်လုပ်နိုင်အောင် အစအဆုံး (Step-by-step) လက်တွေ့ လမ်းညွှန်ပြသထားပါတယ်။"
    }
  ];

  const duplicatedData = [...exploreData, ...exploreData];

  return (
    <section className="py-12 w-full overflow-hidden flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-text-main/90 mb-12 text-center">
        👉 ဘာတွေ လေ့လာနိုင်မလဲ?
      </h2>

      <div 
        className="flex w-full overflow-hidden group relative" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        <motion.div 
          className="flex space-x-6 min-w-max"
          style={{ x }} 
        >
          {duplicatedData.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-95 bg-card border border-slate-800 rounded-2xl py-8 px-2 flex flex-col items-center text-center transition-colors duration-300 hover:border-purple-500/50 hover:bg-soft"
            >
              <div className="text-5xl mb-6">{item.icon}</div>
              <h3 className="text-lg font-bold text-text-main mb-1">{item.title}</h3>
              <p className="text-sm font-semibold text-primary mb-4 tracking-wide">{item.subtitle}</p>
              <p className="text-text-secondary text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-card to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-card to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default AboutInformation;