import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ElectronicHistory() {
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
          className="text-3xl md:text-4xl font-bold mb-12 border-l-4 border-secondary ps-4"
        >
          History of Electronics Matters
        </h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Myanmar */}
          <div
            ref={mmRef}
            className="bg-card backdrop-blur p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              ⚡ အီလက်ထရွန်းနစ်ပညာ၏ စတင်ပေါ်ပေါက်လာမှု
            </h3>
            <p className="text-text-main tracking-wide text-base font-light md:text-lg leading-[1.8] font-padauk">
              
                အီလက်ထရွန်းနစ်ပညာ၏ အစောဆုံးအခြေခံသဘောတရားများသည် လျှပ်စစ်ဓာတ်နှင့် မက်ဂနက်နစ်သဘောတရားများကို လေ့လာသည့်
                ၁၉ ရာစုအတွင်း သိပ္ပံပညာရှင်များ၏ သုတေသနများမှ စတင်ပေါ်ပေါက်လာခဲ့သည်။

                နောက်ပိုင်းတွင် လျှပ်စစ်စီးကြောင်း၊ လျှပ်စစ်လှိုင်းနှင့် အီလက်ထရွန်း၏ အပြုအမူများကို နက်နက်ရှိုင်းရှိုင်း လေ့လာသိရှိလာခြင်းကြောင့်
                ဆက်သွယ်ရေးနည်းပညာများ၊ ရေဒီယိုစနစ်များ၊ လျှပ်စစ်စက်ကိရိယာများ ဖွံ့ဖြိုးတိုးတက်လာခဲ့သည်။
                    <br /><br />
                ထို့နောက် ဆီမီကွန်ဒတ်တာနည်းပညာ၊ တရန်းစစ်တာနှင့် အင်တီဂရေးတက် စက်လုံးများ ပေါ်ပေါက်လာခြင်းကြောင့်
                ခေတ်သစ် ကွန်ပျူတာနည်းပညာနှင့် ဒစ်ဂျစ်တယ်ခေတ်၏ အခြေခံအုတ်မြစ်ကို တည်ဆောက်နိုင်ခဲ့သည်။

                ယနေ့ခေတ်တွင် အီလက်ထရွန်းနစ်ပညာသည်
                ဆက်သွယ်ရေး၊ ဆေးပညာ၊ အာကာသနည်းပညာနှင့် အလိုအလျောက်စက်မှုလုပ်ငန်းများအထိ
                လူသားဘဝတိုးတက်မှုကို ဦးဆောင်နေသည့် အဓိကနည်းပညာကဏ္ဍတစ်ခုဖြစ်လာခဲ့သည်။
            </p>
          </div>

          {/* English */}
          <div
            ref={enRef}
            className="bg-card backdrop-blur p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-secondary">
              ⚡ The Origin and Evolution of Electronics
            </h3>
            <p className="text-text-main leading-relaxed text-md md:text-lg space-y-4">

                The foundations of electronics emerged from nineteenth-century scientific research
                into electricity and magnetism conducted by pioneering physicists.

                As deeper understanding of electric currents, electromagnetic waves,
                and electron behavior advanced, technologies such as radio communication
                and electrical machinery began to flourish.
                <br /> <br />
                The invention of semiconductor devices, transistors, and integrated circuits
                later revolutionized computing and laid the groundwork for the digital age.

                Today, electronics stands as a cornerstone of innovation,
                driving progress across telecommunications, medicine, aerospace,
                and modern automated industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}