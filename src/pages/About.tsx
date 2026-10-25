import AboutInformation from "../abouts/AboutInformation";
import profile from "../../public/assets/profile.webp";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../homes/LanguageToogle";

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

export default function About() {
      const {language}= useAppContext();
      const navigate= useNavigate();
  
       const content: Content = {
  EN: {
    badge: "Red Dragon Electronic ⚡",
    title: "Empowering Myanmar’s Makers, One Circuit at a Time!",
    sub: "Master electronics with high-quality Burmese documentation, hands-on DIY projects, and interactive circuit simulations you can run right in your browser.",
    btnPrimary: "Start Learning",
    btnSecondary: "Browse Projects"
  },
  MM: {
    badge: "Red Dragon အီလက်ထရောနစ် ⚡",
    title: "မြန်မာ့နည်းပညာရှင်သစ်များအတွက် အီလက်ထရောနစ် သင်ယူမှု ပလက်ဖောင်း!",
    sub: "စနစ်တကျ ပြုစုထားတဲ့ သင်ခန်းစာတွေ၊ လက်တွေ့ DIY ပရောဂျက်တွေအပြင် ပတ်လမ်း (Circuits) တွေကိုပါ ဝဘ်ဆိုဒ်ထဲမှာတင် တိုက်ရိုက် Run ပြီး စမ်းသပ်လေ့လာလိုက်ပါ။",
    btnPrimary: "စတင်လေ့လာရန်",
    btnSecondary: "ပရောဂျက်များကြည့်ရန်"
  }
};

  return (
    <div className="min-h-screen w-full bg-bg text-text-main">

         {/* Hero div */}
            <div className="w-full flex flex-col items-center justify-center py-18 md:py-28 z-2 relative">
                    <LanguageToggle />

                    <div className="floating-shape absolute top-32 left-10 w-4 h-4 border border-cyan-500/50 rotate-45"></div>
                    <div className="floating-shape absolute top-3/4 right-20 w-3 h-3 bg-purple-500/50 rounded-full"></div>
                    <div className="floating-shape absolute bottom-22 left-1/4 w-5 h-1 bg-cyan-400/50 -rotate-12"></div>
                    <wokwi-led className="floating-shape absolute bottom-26 right-[12%] -rotate-12" color='red' value={true}></wokwi-led>
                    <wokwi-resistor className="floating-shape absolute top-18 left-[20%] -rotate-12"></wokwi-resistor>

                {language === 'EN' ? 
                <div className="flex max-w-220 justify-between items-end px-3 md:px-0">
                    <div className="w-full h-auto flex flex-col items-center text-center font-serif py-5 px-3 rounded-lg gap-1">
                        <h6 className="w-fit text-main text-xs md:text-sm rounded-lg border-primary border-3 py-px px-2 mb-0.5 md:mb-1">{content.EN.badge}</h6>
                        <h2 className="text-3xl md:text-5xl text-shadow-lg/25 font-bold bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent mb-px md:mb-0.5 line-height-1.5">{content.EN.title}</h2>
                        <p className="text-sm md:text-base text-text-muted mb-2 md:mb-4">{content.EN.sub}</p>
                        <div className="flex gap-6 p-3">
                            <button onClick={() => navigate("/docs/learning")}
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
                            <button onClick={() => navigate("/docs/learning")}
                                     className="px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-(--primary) to-(--secondary)
                                             text-bg text-base rounded-lg shadow transition duration-300 hover:shadow-[0_0_10px_var(--primary)] select-none cursor-pointer">{content.MM.btnPrimary}</button>
                            <button onClick={() => navigate("/project")}
                                     className="px-3 text-base py-1.5 md:px-4 md:py-2 border border-(--secondary) text-(--secondary) rounded-lg select-none cursor-pointer shadow transition duration-300 hover:border-(--secondary) hover:shadow-[0_0_8px_var(--secondary)]">{content.MM.btnSecondary}</button>
                        </div>
                    </div>
                </div>}
            </div>

        <div className="max-w-5xl mx-auto space-y-12 py-12">
        <div className="px-6 space-y-30">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Red Dragon Electronic
            </h1>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              အီလက်ထရောနစ် လောကထဲကို ခြေလှမ်းသစ် စတင်နေသူတွေအတွက် 
              စနစ်ကျပြီး လွယ်ကူတဲ့ လမ်းညွှန်ချက်တွေကို တစ်နေရာတည်းမှာ စုစည်းပေးထားပါတယ်။
            </p>
          </section>

          {/* Vision Section with Stats */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:bg-card/30 hover:border-primary hover:-translate-y-1.25 transition-all">
              <h3 className="text-3xl font-bold text-primary">2026</h3>
              <p className="text-text-secondary text-sm mt-2">Founded Year</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:bg-card/30 hover:border-secondary hover:-translate-y-1.25 transition-all">
              <h3 className="text-3xl font-bold text-secondary">100+</h3>
              <p className="text-text-secondary text-sm mt-2">Components Documented</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border-2 border-border hover:bg-card/30 hover:border-accent hover:-translate-y-1.25 transition-all">
              <h3 className="text-3xl font-bold text-accent">100%</h3>
              <p className="text-text-secondary text-sm mt-2">Free & Open Source</p>
            </div>
          </div>

        </div>
        
        {/* About Information Section */}
        <AboutInformation />

        {/* Developer Section */}
        <section className="bg-linear-to-br from-soft to-card p-8 mx-6 rounded-3xl border-3 border-border flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary transition-all">
          <div className="w-40 h-40 md:h-48 md:w-80 rounded-full md:rounded-2xl overflow-hidden hover:border-3 flex items-start justify-center text-4xl font-bold shadow-2xl hover:shadow-secondary/40 hover:-translate-y-0.5 hover:border-secondary transition-all">
            <img src={profile} alt="Kyaw Zin Win" className="w-full bg-transparent object-cover rounded-full bg-top" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Meet the Maker</h2>
            <p className="text-text-secondary italic">"Technology is best when it brings people together and helps them create."</p>
            <p className="text-text-muted">
              ကျွန်တော် ကျော်ဇင်ဝင်း ပါ။ Junior Web Developer တစ်ယောက်ဖြစ်သလို Electronics ဝါသနာအိုး တစ်ယောက်လည်း ဖြစ်ပါတယ်။ 
              ရှုပ်ထွေးတဲ့ နည်းပညာတွေကို ရိုးရှင်းတဲ့ documentation တွေအဖြစ် ပြောင်းလဲပေးရတာကို နှစ်သက်ပါတယ်။
            </p>
          </div>
        </section>


       <div className="w-full flex justify-end">
           <div className={`flex gap-px items-end`}>
            <h2 className="text-3xl md:text-4xl border-2 border-dotted border-border text-shadow-lg/25 font-bold bg-linear-to-r from-(--primary) to-(--secondary) bg-clip-text text-transparent">RD</h2>
            <p className="text-text-main font-serif text-base">electronic!</p>
          </div>
       </div>

      </div>
      
    </div>
  );
}