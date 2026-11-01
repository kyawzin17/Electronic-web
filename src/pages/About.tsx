import AboutInformation from "../abouts/AboutInformation";
import profile from "../../public/assets/profile.webp";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../homes/LanguageToogle";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);
const pageContent = {
  EN: {
    badge: "Red Dragon Electronic ⚡",
    title: "Empowering Myanmar’s Makers, One Circuit at a Time!",
    subtitle: "Master electronics with high-quality Burmese documentation, hands-on DIY projects, and interactive circuit simulations you can run right in your browser.",
    report: "Report",
    userGuide: "User Guide",
    aboutTitle: "About Red Dragon Electronics",
    aboutDescription: "We bring practical and easy-to-follow electronics learning resources together in one place for everyone taking their first steps into the world of electronics.",
    founded: "Founded",
    components: "Components Documented",
    free: "Free & Open Source",
    makerTitle: "Meet the Maker",
    makerQuote: "“Technology is best when it brings people together and helps them create.”",
    makerDescription: "I'm Kyaw Zin Win, a full stack web developer and electronics enthusiast. I enjoy turning complex technical topics into simple, accessible documentation so more people can learn and build.",
  },
  MM: {
    badge: "Red Dragon အီလက်ထရောနစ် ⚡",
    title: "မြန်မာ့နည်းပညာရှင်သစ်များအတွက် အီလက်ထရောနစ် သင်ယူမှု ပလက်ဖောင်း!",
    subtitle: "မြန်မာဘာသာဖြင့် ရေးသားထားသော သင်ခန်းစာများ၊ လက်တွေ့ DIY Project များနှင့် Browser ထဲမှာတင် စမ်းသပ်နိုင်သော Circuit Simulator တို့ဖြင့် အီလက်ထရောနစ်ပညာကို လေ့လာလိုက်ပါ။",
    report: "မှတ်ချက်ရေးရန်",
    userGuide: "အသုံးပြုနည်း",
    aboutTitle: "Red Dragon Electronics အကြောင်း",
    aboutDescription: "အီလက်ထရောနစ်လောကထဲသို့ စတင်ဝင်ရောက်လေ့လာသူတိုင်းအတွက် စနစ်ကျပြီး လက်တွေ့အသုံးချနိုင်သော သင်ခန်းစာများနှင့် လမ်းညွှန်ချက်များကို တစ်နေရာတည်းတွင် စုစည်းပေးထားပါသည်။",
    founded: "စတင်တည်ထောင်သည့်နှစ်",
    components: "မှတ်တမ်းပြုစုထားသော Components",
    free: "အခမဲ့နှင့် Open Source",
    makerTitle: "ဖန်တီးသူနှင့် မိတ်ဆက်ခြင်း",
    makerQuote: "“နည်းပညာဆိုတာ လူတွေကို ပေါင်းစည်းပေးပြီး ဖန်တီးနိုင်စွမ်းကို မြှင့်တင်ပေးတဲ့အခါ အကောင်းဆုံးဖြစ်ပါတယ်။”",
    makerDescription: "ကျွန်တော် ကျော်ဇင်ဝင်းပါ။ Full Stack Web Developer တစ်ယောက်ဖြစ်သလို Electronics ဝါသနာရှင်တစ်ယောက်လည်း ဖြစ်ပါတယ်။ ရှုပ်ထွေးတဲ့ နည်းပညာအကြောင်းအရာတွေကို လူတိုင်းနားလည်လွယ်တဲ့ Documentation တွေအဖြစ် ပြောင်းလဲပေးရတာကို နှစ်သက်ပါတယ်။",
  },
} as const;
       
export default function About() {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const content = language === "EN" ? pageContent.EN : pageContent.MM;

  useGSAP(() => {
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
  });

  return (
    <main className="min-h-screen w-full overflow-hidden bg-bg text-text-main py-4">
      <div className="relative z-30 h-12 flex flex-row justify-end items-center px-4 sm:px-6 md:px-8">
        <LanguageToggle />
      </div>


      <section className="relative flex w-full flex-col items-center justify-center px-4 py-6 md:py-10">
         <div className="floating-shape absolute top-32 left-10 w-4 h-4 border border-cyan-500/50 rotate-45"></div>
                     <div className="floating-shape absolute bottom-22 left-1/4 w-5 h-1 bg-cyan-400/50 -rotate-12"></div>
                     <wokwi-led className="floating-shape absolute bottom-26 right-[12%] -rotate-12" color='red' value={true}></wokwi-led>
                     <wokwi-resistor className="floating-shape absolute top-18 left-[20%] -rotate-12"></wokwi-resistor>
                     <div className="floating-shape absolute top-3/4 right-20 w-3 h-3 bg-purple-500/50 rounded-full"></div>


                 <div className="flex max-w-220 justify-between items-end px-3 md:px-0">
                     <div className="w-full h-auto flex flex-col items-center text-center font-serif py-5 px-3 rounded-lg gap-1">
                         <h6 className="w-fit text-main text-xs md:text-sm rounded-lg border-primary border-3 py-px px-2 mb-0.5 md:mb-1">{content.badge}</h6>
                         <h2 className={`${language === "MM" ? "leading-mm-relaxed text-3xl md:text-5xl" : "line-height-2 text-3xl md:text-5xl" } text-shadow-lg/25 font-bold bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent mb-px md:mb-0.5 line-height-1.5`}>{content.title}</h2>
                         <p className="text-sm md:text-base text-text-muted mb-2 md:mb-4">{content.subtitle}</p>
                         <div className="flex gap-6 p-3">
                             <button onClick={() => navigate("/report")}
                                      className="px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-(--primary) to-(--secondary)
                                              text-bg text-base rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">{content.report}</button>
                             <button onClick={() => navigate("/circuit/user-guide")}
                                      className="px-3 py-1.5 text-base md:px-4 md:py-2 border border-(--secondary) text-(--secondary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">
                                        {content.userGuide}
                              </button>
                         </div>
                     </div>
                 </div> 
      </section>

      <div className="mx-auto max-w-5xl space-y-12 py-6 md:space-y-20 md:py-8">
        <div className="space-y-12 px-4 sm:px-6">
          <section className="grid gap-5 text-center sm:grid-cols-3" aria-label="Project statistics">
            <div className="rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary">
              <h3 className="text-3xl font-bold text-primary">2026</h3>
              <p className="mt-2 text-sm text-text-secondary">{content.founded}</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-secondary">
              <h3 className="text-3xl font-bold text-secondary">100+</h3>
              <p className="mt-2 text-sm text-text-secondary">{content.components}</p>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
              <h3 className="text-3xl font-bold text-accent">100%</h3>
              <p className="mt-2 text-sm text-text-secondary">{content.free}</p>
            </div>
          </section>
        </div>

        <AboutInformation />

        {/* Developer Section */}
        <section className="bg-linear-to-br from-soft to-card p-8 mx-6 rounded-3xl border-3 border-border flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary transition-all">
          <div className="w-40 h-40 md:h-48 md:w-80 rounded-full md:rounded-2xl overflow-hidden hover:border-3 flex items-start justify-center text-4xl font-bold shadow-2xl hover:shadow-secondary/40 hover:-translate-y-0.5 hover:border-secondary transition-all">
            <img src={profile} alt="Project creator portrait" className="w-full bg-transparent object-cover rounded-full bg-top" />
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{content.makerTitle}</h2>
            <p className="text-text-secondary italic">{content.makerQuote}</p>
            <p className={`text-text-muted ${language === "MM" ? "leading-mm-relaxed" : "leading-7"}`}>
              {content.makerDescription}
            </p>
          </div>
        </section>

        <div className="flex w-full justify-end px-6 pb-6">
          <div className="flex items-end gap-px">
            <h2 className="border-2 border-dotted border-border bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-3xl font-bold text-transparent md:text-4xl">RD</h2>
            <p className="font-serif text-base text-text-main">electronic!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
