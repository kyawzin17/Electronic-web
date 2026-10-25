import { useRef, forwardRef } from "react";
import "../App.css";
import "./page.css";
import { useNavigate } from "react-router-dom";
import "@wokwi/elements";
import CircuitIllustration from "../homes/TestHome.tsx";


import { faAddressCard, faBookmark, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import ReadCard from "../homes/ReadCard.tsx";
import HeroCircle from "../homes/HeroCircle.tsx";
import Timeline from "../homes/Timeline.tsx";
import FeatureShowcase from "../homes/FeatureShowcase.tsx";
// import WhatEle from "../docs/WhatEle.tsx";


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TrendComponents from "../homes/TrendComponents.tsx";
import ElectronicsInfoSection from "../homes/ElectronicsInfoSection.tsx";
import ElectronicHistory from "../homes/ElectronicHistory.tsx";
import { useAppContext } from "../hooks/useAppContext.tsx";
import { useEffect } from "react";
import { autoLoginService } from "../registerAndLogin/services/auth.ts";


gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home= forwardRef<HTMLElement>(() => {
    const navigate= useNavigate();
    const containerRef= useRef<HTMLDivElement | null>(null);
    const cardRef= useRef<{ [key: string]: HTMLElement | null }>({}); 
    const imageRef= useRef<HTMLDivElement>(null);
    const { setUser, setLogin }= useAppContext();

    useEffect(() => {
        const checkUserAuth = async () => {
          const authData = await autoLoginService();
          
          if (authData) {
            // Backend က User ရှိတယ်လို့ ပြောရင် State ထဲ ထည့်မယ်
            console.log("This user:", authData.noPassword);
            setUser(authData.noPassword as any);
            setLogin(true);
          } else {
            // Token မရှိရင် သို့မဟုတ် သက်တမ်းကုန်ရင် Login Page သို့ လွှတ်နိုင်သည်
            // ဥပမာ - window.location.href = "/login";
            setLogin(false);
          }
        };
    
        checkUserAuth();
      }, []);

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

    return (
        <section className="w-full relative z-2 transform transition duration-300">
            <HeroCircle />
            <CircuitIllustration />

            {/* What is Electronics? */}
            {/* <WhatEle /> */}

            {/* Information div */}
            <div ref={containerRef} className="w-full mx-auto px-4 h-auto flex justify-center flex-wrap gap-8 font-serif z-12">
                
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