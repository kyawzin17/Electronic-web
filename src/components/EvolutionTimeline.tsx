import { motion } from "framer-motion";
import TimelineImg from "../../public/assets/historyTimeline.webp"

const EvolutionTimeline = () => {
  const timelineData = [
    { year: "1897", title: "အီလက်ထရွန်ကို ရှာဖွေတွေ့ရှိခြင်း", desc: "J.J. Thomson မှ ရှာဖွေတွေ့ရှိခဲ့ပြီး လေဟာနယ်ပြွန်များအတွက် အခြေခံဖြစ်ခဲ့သည်။" },
    { year: "1947", title: "ပထမဆုံး ထရန်စစ်စတာ", desc: "လေဟာနယ်ပြွန်များနေရာတွင် အစားထိုးခဲ့ပြီး အီလက်ထရွန်နစ်ခေတ်သစ်ကို စတင်ခဲ့သည်။" },
    { year: "1958", title: "ပေါင်းစပ်ဆားကစ် (IC)", desc: "ထရန်စစ်စတာများကို ချစ်ပ်ပြားတစ်ခုတည်းပေါ်တွင် ပေါင်းစပ်ထည့်သွင်းနိုင်ခဲ့သည်။" },
    { year: "1971", title: "မိုက်ခရိုပရိုဆက်ဆာ", desc: "ခေတ်သစ် အီလက်ထရွန်နစ် ပစ္စည်းများ၏ အဓိက ဦးနှောက်အဖြစ် အသုံးပြုလာခဲ့သည်။" },
  ];

  return (
    <motion.div 
                initial={{ y: 70, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1}}
                whileHover={{ y: -10, scale: 1.03 }} 
                transition={{ duration: 0.6, ease: "backOut"}} className="p-6 rounded-2xl bg-card backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
      <h2 className="text-xl font-bold text-secondary dark:text-cyan-400 mb-8 text-center tracking-wide">
        အီလက်ထရွန်နစ်နည်းပညာ တိုးတက်ပြောင်းလဲလာမှု သမိုင်းကြောင်း
      </h2>
      
      <div className="relative border-l-2 border-cyan-500/50 ml-4 space-y-8">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6">
            {/* Glowing Dot */}
            <div className="absolute -left-2.5 top-1 w-4 h-4 bg-secondary dark:bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
            
            <h3 className="text-lg font-semibold text-text-main">
              <span className="dark:text-cyan-300 text-secondary mr-2">{item.year}:</span> 
              {item.title}
            </h3>
            <p className="text-text-main/70 text-sm mt-1 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full mt-4 h-auto rounded-2xl overflow-hidden border-3 dark:border-cyan-300 border-secondary">
        <img src={TimelineImg} alt="Timeline Image" className="w-full h-auto" />
      </div>
    </motion.div>
  );
};

export default EvolutionTimeline;