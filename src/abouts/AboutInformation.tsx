import React, { useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap, animate } from "framer-motion";
import { useAppContext } from "../hooks/useAppContext";

const AboutInformation: React.FC = () => {
  const { language } = useAppContext();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const baseX = useMotionValue(0);
  const speedMultiplier = useMotionValue(1);

  useEffect(() => {
    const controls = animate(speedMultiplier, isHovered ? 0 : 1, {
      duration: 0.8,
      ease: isHovered ? "easeOut" : "easeIn",
    });
    return () => controls.stop();
  }, [isHovered, speedMultiplier]);

  useAnimationFrame((_time, delta) => {
    const moveBy = 1.5 * (delta / 16) * speedMultiplier.get();
    baseX.set(baseX.get() - moveBy);
  });

  const x = useTransform(baseX, (value) => `${wrap(-1200, 0, value)}px`);

  const exploreData = language === "EN"
    ? [
        {
          id: 1,
          icon: "📚",
          title: "Comprehensive Component Docs",
          subtitle: "(Learn Every Component)",
          description: "Explore clear explanations, practical usage, and essential information for more than 100 electronic components.",
        },
        {
          id: 2,
          icon: "🗺️",
          title: "Step-by-Step Learning",
          subtitle: "(From Beginner to Advanced)",
          description: "Follow a structured learning path, organized by chapters, from your first electronics concepts to more advanced topics.",
        },
        {
          id: 3,
          icon: "🛠️",
          title: "Hands-on Projects",
          subtitle: "(Learn by Building)",
          description: "Build practical projects with step-by-step guidance, from wiring the circuit to writing and testing the code.",
        },
      ]
    : [
        {
          id: 1,
          icon: "📚",
          title: "Components Documentation များ",
          subtitle: "(အီလက်ထရောနစ်ပစ္စည်းများအကြောင်း)",
          description: "Electronic Components ၁၀၀ ကျော်ရဲ့ အလုပ်လုပ်ပုံ၊ အသုံးပြုပုံနဲ့ အရေးကြီးတဲ့ အချက်အလက်တွေကို မြန်မာဘာသာဖြင့် လွယ်ကူရှင်းလင်းစွာ လေ့လာနိုင်ပါတယ်။",
        },
        {
          id: 2,
          icon: "🗺️",
          title: "အဆင့်ဆင့် လေ့လာနိုင်သော သင်ခန်းစာများ",
          subtitle: "(Beginner မှ Advanced အထိ)",
          description: "အီလက်ထရောနစ်ပညာရပ်ကို အခြေခံမှစတင်ပြီး Chapter အလိုက် စနစ်တကျ လေ့လာနိုင်မယ့် Learning Path ကို စီစဉ်ပေးထားပါတယ်။",
        },
        {
          id: 3,
          icon: "🛠️",
          title: "လက်တွေ့ Project များ",
          subtitle: "(ကိုယ်တိုင်တည်ဆောက်ရင်း လေ့လာရန်)",
          description: "Circuit ချိတ်ဆက်ခြင်းမှ Code ရေးသားခြင်းနဲ့ စမ်းသပ်ခြင်းအထိ Project တစ်ခုချင်းစီကို အဆင့်လိုက် လက်တွေ့လုပ်ဆောင်နိုင်ပါတယ်။",
        },
      ];

  const duplicatedData = [...exploreData, ...exploreData];

  return (
    <section className="flex w-full flex-col items-center overflow-hidden py-12">
      <h2 className={`mb-12 px-4 text-center text-2xl font-bold text-text-main/90 md:text-3xl ${language === "MM" ? "leading-mm-relaxed" : ""}`}>
        {language === "EN" ? "👉 What can you learn here?" : "👉 ဒီ Website မှာ ဘာတွေ လေ့လာနိုင်မလဲ။"}
      </h2>

      <div
        className="group relative flex w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsHovered(false);
          }
        }}
      >
        <motion.div className="flex min-w-max space-x-6" style={{ x }}>
          {duplicatedData.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="flex w-80 flex-col items-center rounded-2xl border border-border bg-card px-4 py-8 text-center transition-colors duration-300 hover:border-purple-500/50 hover:bg-soft sm:w-95"
            >
              <div className="mb-6 text-5xl" aria-hidden="true">{item.icon}</div>
              <h3 className={`mb-1 text-lg font-bold text-text-main ${language === "MM" ? "leading-mm-relaxed" : ""}`}>{item.title}</h3>
              <p className="mb-4 text-sm font-semibold tracking-wide text-primary">{item.subtitle}</p>
              <p className={`text-base leading-relaxed text-text-secondary ${language === "MM" ? "leading-mm-relaxed" : ""}`}>
                {item.description}
              </p>
            </article>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-card to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-card to-transparent sm:w-24" />
      </div>
    </section>
  );
};

export default AboutInformation;
