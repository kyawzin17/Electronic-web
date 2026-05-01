import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import HumanImg from "../../public/docs/images/human-test.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ElectronicsInfoSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const mmRef = useRef(null);
  const enRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 76%",
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      mmRef.current,
      { y: -80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      enRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: el,
          start: "top 72%",
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg text-text-main py-4 md:py-20 px-6 md:px-12 font-padauk"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-cyan-400 pl-4"
        >
          Why Electronics Matters
        </h2>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Myanmar */}
          <motion.div 
                whileHover={{ y: -10, scale: 1.03 }} 
                transition={{ duration: 0.6, ease: "backOut"}}
            ref={mmRef}
            className="bg-card backdrop-blur p-6 rounded-xl transition-shadow duration-300 ease-linear shadow-md hover:shadow-lg shadow-text-muted/40 hover:border-2 hover:border-text-muted/50"
          >
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              🔌 အီလက်ထရွန်းနစ် ပညာကို လေ့လာသင့်သည့် အကြောင်း
            </h3>
            <p className="text-text-main space-y-5 text-base md:text-lg font-light font-padauk leading-mm-relaxed">
              ယနေ့ခေတ်တွင် အသုံးပြုနေသော နည်းပညာအများစု၏
              အခြေခံအုတ်မြစ်မှာ အီလက်ထရွန်းနစ်ပညာဖြစ်သည်။
              စမတ်ဖုန်းများ၊ ကွန်ပျူတာများ၊ ဆက်သွယ်ရေးစနစ်များမှစ၍
              နေ့စဉ်ဘဝနှင့် ချိတ်ဆက်နေသော နည်းပညာအားလုံးတွင်
              အီလက်ထရွန်းနစ်အခြေခံသဘောတရားများ ပါဝင်လျက်ရှိသည်။
              <br /><br />
              အီလက်ထရွန်းနစ်ပညာကို လေ့လာခြင်းသည်
              စက်ပစ္စည်းများ၏ အလုပ်လုပ်ပုံကို နားလည်နိုင်စေရုံသာမက
              ပြဿနာများကို သဘောတရားအရ စဉ်းစားဖြေရှင်းနိုင်စွမ်းနှင့်
              နည်းပညာအသစ်များ ဖန်တီးနိုင်စွမ်းကို တိုးတက်စေသည်။
            </p>
          </motion.div>

          {/* Image */}
          <motion.div 
                whileHover={{ y: -10, scale: 1.02 }} 
                transition={{ duration: 0.6, ease: "backOut"}} ref={enRef} className="bg-transparent rounded-xl w-full overflow-hidden shadow-md shadow-primary/70 border-6 border-zinc-50">
              <img src={HumanImg} alt='Circuit Marking dig!' className="w-full h-auto"/>
          </motion.div>
          {/* English */}
          {/* <div
            ref={enRef}
            className="bg-card backdrop-blur p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              ⚡ Why Study Electronics?
            </h3>
            <p className="text-text-main space-y-4 text-lg leading-relaxed">
              Electronics forms the foundation of most modern technologies.
              From smartphones and computers to communication networks and
              industrial automation, electronic principles power the systems
              we rely on every day.
              <br /><br />
              Studying electronics helps us understand how devices function,
              strengthens analytical problem-solving skills, and builds the
              technical expertise required to innovate in a technology-driven
              world.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}