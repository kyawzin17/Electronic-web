import { useRef, forwardRef } from "react";
import "../App.css";
import "./page.css";
import { useNavigate } from "react-router-dom";
import Legent from "../../public/assets/legend.webp";
import "@wokwi/elements";




import { faAddressCard, faBookmark, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import ReadCard from "../components/cards/ReadCard.tsx";
import HeroCircle from "../components/HeroCircle";
import Timeline from "../components/Timeline";
import LanguageToggle from "../components/LanguageToogle";
import FeatureShowcase from "../components/FeatureShowcase";


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TrendComponents from "../components/TrendComponents.tsx";
import ElectronicsInfoSection from "../components/ElectronicsInfoSection";
import ElectronicHistory from "../components/ElectronicHistory";
import { useAppContext } from "../hooks/useAppContext.tsx";


gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Content {
    EN: {
        badge: string;
        title: string;
        sub: string;
        btnPrimary: string;
        btnSecondary: string;
    };
    MM: {
        badge: string;
        title: string;
        sub: string;
        btnPrimary: string;
        btnSecondary: string;
    };
}

const Home= forwardRef<HTMLElement>(() => {
    const navigate= useNavigate();
    const containerRef= useRef<HTMLDivElement | null>(null);
    const cardRef= useRef<{ [key: string]: HTMLElement | null }>({}); 
    const imageRef= useRef<HTMLDivElement>(null);
    const {language}= useAppContext();

   useGSAP(() => {
    const tl= gsap.timeline({
                         scrollTrigger: { trigger: containerRef.current, start: "top 94%", toggleActions: "play none none reverse", },
                          defaults: { duration: 0.6, ease: "power2.out" } });
        
        tl.from( cardRef.current[0], { y: 70, delay: 0.2, opacity: 0 })
            .from( cardRef.current[1], { y: 70, opacity: 0 }, "-=0.4")
            .from( cardRef.current[2], { y: 70, opacity: 0 }, "-=0.4");

   }, { scope: containerRef});

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
    
    gsap.from(imageRef.current, {
        y: 70,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
        }
    })
   }, { });

   const content: Content = {
  EN: {
    badge: "Red Dragon Electronic ⚡",
    title: "Empowering Myanmar’s Makers, One Circuit at a Time.",
    sub: "Master electronics with high-quality Burmese documentation, hands-on DIY projects, and interactive circuit simulations you can run right in your browser.",
    btnPrimary: "Start Learning",
    btnSecondary: "Browse Projects"
  },
  MM: {
    badge: "Red Dragon အီလက်ထရောနစ် ⚡",
    title: "မြန်မာ့နည်းပညာရှင်သစ်များအတွက် အီလက်ထရောနစ် သင်ယူမှု ပလက်ဖောင်း",
    sub: "စနစ်တကျ ပြုစုထားတဲ့ သင်ခန်းစာတွေ၊ လက်တွေ့ DIY ပရောဂျက်တွေအပြင် ပတ်လမ်း (Circuits) တွေကိုပါ ဝဘ်ဆိုဒ်ထဲမှာတင် တိုက်ရိုက် Run ပြီး စမ်းသပ်လေ့လာလိုက်ပါ။",
    btnPrimary: "စတင်လေ့လာရန်",
    btnSecondary: "ပရောဂျက်များကြည့်ရန်"
  }
};

    return (
        <section className="w-full relative z-2 transform transition duration-300">
            <HeroCircle />
             {/* Hero div */}
            <div className="w-full flex flex-col items-center justify-center py-20 md:py-28 z-2 relative">
                    <LanguageToggle />

                    <div className="floating-shape absolute top-32 left-10 w-4 h-4 border border-cyan-500/50 rotate-45"></div>
                    <div className="floating-shape absolute top-3/4 right-20 w-3 h-3 bg-purple-500/50 rounded-full"></div>
                    <div className="floating-shape absolute bottom-22 left-1/4 w-5 h-1 bg-cyan-400/50 -rotate-12"></div>
                    <wokwi-led className="floating-shape absolute bottom-26 right-[12%] -rotate-12" color='red' value={true}></wokwi-led>
                    <wokwi-resistor className="floating-shape absolute top-18 left-[20%] -rotate-12"></wokwi-resistor>
                    <wokwi-led className="floating-shape absolute top-10 left-[42%] -rotate-12" color='yellow' value={true}></wokwi-led>
                
                {language === 'EN' ? 
                <div className="flex max-w-220 justify-between items-end px-3 md:px-0">
                    <div className="w-full h-auto flex flex-col items-center text-center font-serif py-5 px-3 rounded-lg gap-1">
                        <h6 className="w-fit text-main text-xs md:text-sm rounded-lg border-primary border-3 py-px px-2 mb-0.5 md:mb-1">{content.EN.badge}</h6>
                        <h2 className="text-3xl md:text-5xl text-shadow-lg/25 font-bold bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent mb-px md:mb-0.5">{content.EN.title}</h2>
                        <p className="text-sm md:text-base text-text-muted mb-2 md:mb-4">{content.EN.sub}</p>
                        <div className="flex gap-6 p-3">
                            <button onClick={() => navigate("/docs/doc/components")}
                                     className="px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-(--primary) to-(--secondary)
                                             text-bg text-base rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">{content.EN.btnPrimary}</button>
                            <button onClick={() => navigate("/project")}
                                     className="px-3 py-1.5 text-base md:px-4 md:py-2 border border-(--secondary) text-(--secondary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">{content.EN.btnSecondary}</button>
                        </div>
                    </div>
                </div> 
                :
                <div className="flex max-w-220 justify-between items-end px-3 md:px-0">
                    <div className="w-full h-auto flex flex-col items-center text-center font-serif py-5 px-3 rounded-lg gap-1">
                        <h6 className="w-fit text-main text-xs md:text-sm rounded-lg border-primary border-3 py-px px-2 mb-0.5 md:mb-1">{content.MM.badge}</h6>
                        <h2 className="text-2xl md:text-4xl text-shadow-lg/25 font-bold bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent leading-mm-relaxed mb-px md:mb-0.5">{content.MM.title}</h2>
                        <p className="text-sm md:text-base text-text-muted mb-2 md:mb-4 leading-mm-relaxed">{content.MM.sub}</p>
                        <div className="flex gap-6 p-3">
                            <button onClick={() => navigate("/doc/components")}
                                     className="px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-(--primary) to-(--secondary)
                                             text-bg text-base rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">{content.MM.btnPrimary}</button>
                            <button onClick={() => navigate("/project")}
                                     className="px-3 text-base py-1.5 md:px-4 md:py-2 border border-(--secondary) text-(--secondary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">{content.MM.btnSecondary}</button>
                        </div>
                    </div>
                </div>}
            </div>

            {/* Image */}
            <div ref={imageRef} className="w-full h-auto relative mt-12 z-10" >
                <img src={Legent} className="w-full min-w-100 relative left-[50%] translate-x-[-50%] h-auto" />
                {language === 'EN' ? 
                            <p className="font-extrabold w-full text-md md:text-2xl font-serif text-white/90 text-center absolute top-[5%] text-shadow-amber-200">The Legends of Electricity</p>
                            : 
                            <p className="font-extrabold w-full text-md md:text-2xl font-serif text-white/90 text-center absolute top-[5%] text-shadow-amber-200">လျှပ်စစ်လောကမှ ဂန္တဝင်ပုဂ္ဂိုလ်များ</p>
                            }
                <span className="font-bold text-base md:text-lg font-serif text-secondary absolute top-[26%] left-[41.5%]">AC</span>
                <span className="font-bold text-base md:text-lg font-serif text-(--warning) absolute top-[31%] right-[43.5%]">DC</span>
                <div className="w-full flex justify-center absolute bottom-[10%] md:bottom-[20%] gap-14 md:gap-20 lg:gap-38 transition-all ease-linear duration-150">
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-xs md:text-base lg:text-md font-serif text-white/90">NIKOLA TESLA</p>
                        <p className="font-serif text-[10px] md:text-base text-white/60 text-center">The Father of Alternating Current (AC)</p>
                    </div>                
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-xs md:text-base lg:text-md font-serif text-white/90">THOMAS EDISON</p>
                        <p className="font-serif text-[10px] md:text-base text-white/60 text-center">The Wizard of Menlo Park, DC Power (DC)</p>
                    </div> 
                </div>                               
            </div>
            {/* Information div */}
            <div ref={containerRef} className="w-full mx-auto px-4 h-auto -mt-4 md:-mt-8 lg:-mt-20 flex justify-center flex-wrap gap-8 font-serif z-12">
                
                <ReadCard ref={(el) => {cardRef.current[0] = el}} icon={faAddressCard} title="About Us"
                             description="ဒီ website ရဲ့ ရည်ရွယ်ချက်မှာ အီလက်ထရွန်းနစ်နည်းပညာကို မြန်မာစာဖြင့် လွယ်ကူစွာ လေ့လာနိုင်စေရန်ဖြစ်သည်။ website အကြောင်းပိုမိုလေ့လာရန်--"
                              buttonText="About Us"
                               buttonColor="primary"
                               color="primary"
                               onButtonClick={() => navigate("/about")} 
                                />
                <ReadCard ref={(el) => {cardRef.current[1] = el}} icon={faBookmark} title="Documentation"
                             description="လျှပ်စစ်ပစ္စည်းတစ်ခုစီ၏ အကြောင်းအရာများ၊ အသုံးပြုနည်းများကို မြန်မာစာဖြင့် ဖော်ပြထားသည်။"
                              buttonText="To Read"
                               buttonColor="secondary"
                               color="secondary"
                               onButtonClick={() => navigate("/docs/doc/components")}
                             />
                <ReadCard ref={(el) => {cardRef.current[2] = el}} icon={faLightbulb} title="Creative Projects"
                             description="ရိုးရှင်းပြီး အခြေခံကျသော Project များနှင့် အသုံးပြုမှုများစွာ ပါဝင်သော Project များ"
                              buttonText="View Projects"
                               buttonColor="accent"
                               color="accent"
                               onButtonClick={() => navigate("/project")} 
                             />
            </div>
            {/* SVG Animation div */}
            {/* <div className="home-svg w-screen h-auto z-3 flex items-center py-16 md:py-4"> 
                <svg viewBox="0 0 900 300" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="rdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: "var(--primary)"}} />
                            <stop offset="100%" style={{stopColor: "var(--secondary)"}} />
                        </linearGradient>

                        <radialGradient id="raGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#000" />
                            <stop offset="100%" stopColor="#33d3ee" />
                        </radialGradient>
                        <symbol id="resistor-model" viewBox="0 0 60 20">
                            <rect x="5" y="0" width="50" height="20" rx="4" className="resistor-body" />
                            <rect x="15" y="0" width="5" height="20" className="band-green" />
                            <rect x="25" y="0" width="5" height="20" className="band-black" />
                            <rect x="35" y="0" width="5" height="20" className="band-orange" />
                            <rect x="45" y="0" width="3" height="20" className="band-gold" />
                        </symbol>
                    </defs>

                    <path id="path1" className="wire" d="M 0 100 H 155 M 205 100 H 340 Q 340 100, 340 120 V 130 H 450" />
                    <path id="path2" className="wire" d="M 0 155 H 155 M 205 155 H 450" />
                    <path id="path3" className="wire" d="M 0 210 H 155 M 205 210 H 340 Q 340 210, 340 190 V 180 H 450" />
                    <line className="wire" x1="620" y1="155" x2="755" y2="155" />
                    <line className="wire" x1="765" y1="155" x2="920" y2="155" />

                    <use href="#resistor-model" x="150" y="90" width="60" height="20" />
                    <use href="#resistor-model" x="150" y="145" width="60" height="20" />
                    <use href="#resistor-model" x="150" y="200" width="60" height="20" />

                    <circle className="particle" r="2.5"><animateMotion dur="7s" repeatCount="indefinite" path="M 0 100 H 155 M 200 100 H 340 Q 340 100,340 120 V 130 H 450 Q 450 100, 450 80 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="7s" repeatCount="indefinite" path="M 0 210 H 155 M 200 210 H 340 Q 340 210, 340 187 V 180 H 450 Q 450 230, 450 230 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="7s" begin="1s" repeatCount="indefinite" path="M 0 100 H 155 M 200 100 H 340 Q 340 100,340 120 V 130 H 450 Q 450 100, 450 80 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="7s" begin="1s" repeatCount="indefinite" path="M 0 210 H 155 M 200 210 H 340 Q 340 210, 340 187 V 180 H 450 Q 450 230, 450 230 H 620 V 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="5s" begin="0.2s" repeatCount="indefinite" path="M 0 155 H 950" /></circle>
                    <circle className="particle" r="2.5"><animateMotion dur="5s" begin="1.2s" repeatCount="indefinite" path="M 0 155 H 550" /></circle>

                    <rect x="450" y="80" width="170" height="150" fill="none" stroke="var(--line)" strokeDasharray="4,4" opacity="0.7" />
                    <text x="480" y="185" className="rd-text">RD</text>

                    <g transform="translate(760, 134)">
                        
                        <path className="led-main" d="M -10 10 V -5 A 10 10 0 1 1 10 -5 V 10 Z" />
                        <rect x="-6" y="10" width="1.5" height="12" fill="#334155" />
                        <rect x="5" y="10" width="1.5" height="12" fill="#334155" />
                    </g>
                    
                    <circle transform="translate(154, 100)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(154, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(154, 210)" fill="url(#raGradient)" className="circle-join" r="2.5" />

                    <circle transform="translate(207, 100)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(207, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(207, 210)" fill="url(#raGradient)" className="circle-join" r="2.5" />

                    <circle transform="translate(450, 130)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(450, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(450, 180)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(620, 155)" fill="url(#raGradient)" className="circle-join" r="2.5" />
                    <circle transform="translate(755, 155)" fill="url(#raGradient)" className="circle-join" r="2" />
                    <circle transform="translate(766, 155)" fill="url(#raGradient)" className="circle-join" r="2" />
                </svg>
            </div> */}
            {/* TrendComponents div */}
            <TrendComponents />
            <FeatureShowcase />
            <ElectronicsInfoSection />
            <ElectronicHistory />
            {/* Timeline design */}
            <Timeline />
        </section>
    )   
});
export default Home;