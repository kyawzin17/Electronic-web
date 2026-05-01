import React from 'react';

const EvolutionTimeline = () => {
  const timelineData = [
    { year: "1897", title: "အီလက်ထရွန်ကို ရှာဖွေတွေ့ရှိခြင်း", desc: "J.J. Thomson မှ ရှာဖွေတွေ့ရှိခဲ့ပြီး လေဟာနယ်ပြွန်များအတွက် အခြေခံဖြစ်ခဲ့သည်။" },
    { year: "1947", title: "ပထမဆုံး ထရန်စစ်စတာ", desc: "လေဟာနယ်ပြွန်များနေရာတွင် အစားထိုးခဲ့ပြီး အီလက်ထရွန်နစ်ခေတ်သစ်ကို စတင်ခဲ့သည်။" },
    { year: "1958", title: "ပေါင်းစပ်ဆားကစ် (IC)", desc: "ထရန်စစ်စတာများကို ချစ်ပ်ပြားတစ်ခုတည်းပေါ်တွင် ပေါင်းစပ်ထည့်သွင်းနိုင်ခဲ့သည်။" },
    { year: "1971", title: "မိုက်ခရိုပရိုဆက်ဆာ", desc: "ခေတ်သစ် အီလက်ထရွန်နစ် ပစ္စည်းများ၏ အဓိက ဦးနှောက်အဖြစ် အသုံးပြုလာခဲ့သည်။" },
  ];

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
      <h2 className="text-xl font-bold text-cyan-400 mb-8 text-center tracking-wide">
        အီလက်ထရွန်နစ်နည်းပညာ တိုးတက်ပြောင်းလဲလာမှု သမိုင်းကြောင်း
      </h2>
      
      <div className="relative border-l-2 border-cyan-500/50 ml-4 space-y-8">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6">
            {/* Glowing Dot */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
            
            <h3 className="text-lg font-semibold text-white">
              <span className="text-cyan-300 mr-2">{item.year}:</span> 
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm mt-1 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionTimeline;