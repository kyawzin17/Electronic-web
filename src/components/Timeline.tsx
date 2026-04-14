
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import "../App.css";

// GSAP Plugin ကို register လုပ်ပါ
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Timeline ဒေတာနမူနာ
const timelineData = [
  { id: 1, desc: '🤖 တီထွင်ဖန်တီးနိုင်စွမ်း တိုးတက်စေခြင်း' },
  { id: 2, desc: '⚙️ ပြဿနာ ဖြေရှင်းခြင်းစွမ်းရည်' },
  { id: 3, desc: '🛠️ Electronic ပစ္စည်းများကို ကိုယ်တိုင်ပြုပြင်နိုင်ခြင်း' },
  { id: 4, desc: '🪛 စိတ်ဝင်စားဖွယ်ရာ လက်တွေ့စမ်းသပ်ချက်များ' },
  { id: 5, desc: '👨‍🔧 အလုပ်အကိုင် အခွင့်အလမ်းများ' },
];

function Timeline() {
  const mainRef = useRef<HTMLDivElement | null>(null); // အဓိက container ref
  const lineRef = useRef<SVGPathElement | null>(null); // SVG line ref
  const textRef= useRef<HTMLDivElement | null>(null); //Text animation
  const headerRef = useRef<HTMLDivElement | null>(null); // Header ref

  // `@gsap/react` ရဲ့ useGSAP hook ကို သုံးပါ
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement | null>('.timeline-item');

    // ၁။ Vertical Line Animation (Scroll ဆွဲသလောက် မျဉ်းရှည်လာရန်)
    gsap.fromTo(
      lineRef.current,
      { strokeDasharray: "0 10000", strokeDashoffset: 0 },
      {
        strokeDasharray: "10000 10000",
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top 90%', // Timeline အပေါ်ရောက်ရင် စမယ်
          end: 'bottom center', // Timeline အောက်ရောက်ရင် ပြီးမယ်
          scrub: true, // scroll နဲ့အညီ animation ဖြစ်စေရန်
        },
      }
    );

    gsap.from(
      headerRef.current, 
      {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "linear",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: 'play none none reverse',
        }
      }
    )

   gsap.to(
    textRef.current,
    {
        duration: 5,
        text: "💫ယနေ့ခောတ်တွင် Electronic ပညာသည် လူတိုင်းအတွက် လိုအပ်သော အခြေခံကျွမ်းကျင်မှု ဖြစ်ရန်လို အပ်သည်။",
        ease: "none",
        scrollTrigger: {
            trigger: mainRef.current,
            start: "top 20%",
            end: "bottom bottom",
            toggleActions: 'play none none reverse',
        }
    }
   )
    // ၂။ Timeline Item (Circle + Content) Animation
    items.forEach((item) => {
      if (!item) return;
      const circle = item.querySelector('.timeline-circle');
      const content = item.querySelector('.timeline-content');
      const isLeft = item.classList.contains('left');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%', // item ရဲ့ ၈၀% အမြင့်မှာ ပေါ်လာမယ်
          end: 'top 30%',
          toggleActions: 'play none none reverse', // scroll အတက်အဆင်းမှာ play/reverse လုပ်ရန်
          // markers: true, // debug လုပ်ချင်ရင် ဖွင့်ပါ
        },
      });


      tl.to(circle, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }) // Circle ပေါ်လာရန်
        .to(content, { 
          opacity: 1, 
          x: isLeft ? 0 : 0, // ဘယ်/ညာမှ ဝင်လာတဲ့ animation ထည့်ချင်ရင် ပြင်နိုင်
          duration: 0.6, 
          ease: 'power2.out' 
        }, "-=0.2") // Circle ပြီးပြီးချင်း (0.2s စောပြီး) Content ပေါ်လာရန်
        .to(item, {opacity: 1, duration: 0.1}, 0); // main container ပေါ်ရန်
    });

  }, { scope: mainRef }); // animationScope ကို container ထဲ ကန့်သတ်ရန်

  return (
    <div className="mt-4 md:mt-10 font-padauk">
         <div ref={headerRef} className='max-w-240 mx-auto gap-2 py-2 mb-18'>
                <h2 className='text-xl md:text-3xl text-center font-bold text-text-main mb-4 md:mb-8 font-padauk'>⚡Electronic ပညာ လေ့လာခြင်း၏ အကျိုးကျေးဇူးများ</h2>
        </div>
      
      <div className="timeline-container" ref={mainRef}>
        {/* SVG Vertical Line */}
        <div className="timeline-svg-container">
          <svg width="2" height="100%" viewBox="0 0 2 100" preserveAspectRatio="none">
            <path
              ref={lineRef}
              className="timeline-line-path"
              d="M1,0 V10000" // M1,0 (start) ကနေ V10000 (vertical) ထိ မျဉ်းဆွဲ
            />
          </svg>
        </div>

        {/* Timeline Items */}
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            // ဘယ်၊ ညာ တစ်လှည့်စီ ခွဲရန် (index က စုံကိန်းဆို left, မကိန်းဆို right)
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-circle"></div>
            <div className="timeline-content hover:translate-y-5">
                <h3 className='text-md md:text-xl font-medium font-padauk text-text-main'>{item.desc}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className='w-full flex justify-center items-center gap-2 py-2 mb-18'>
            <h3 ref={textRef} className='text-md md:text-lg font-medium font-padauk text-secondary'></h3>
        </div>
        
    </div>
  );
}

export default Timeline;