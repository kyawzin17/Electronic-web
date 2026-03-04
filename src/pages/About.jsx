import React from 'react';
import profile from "../image/profile.png";

export default function About() {
  return (
    <div className="min-h-screen bg-bg text-text-main py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-30">
        
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Red Dragon Electronic
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            အီလက်ထရောနစ် လောကထဲကို ခြေလှမ်းသစ် စတင်နေသူတွေအတွက် 
            စနစ်ကျပြီး လွယ်ကူတဲ့ လမ်းညွှန်ချက်တွေကို တစ်နေရာတည်းမှာ စုစည်းပေးထားပါတယ်။
          </p>
        </section>

        {/* Vision Section with Stats */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-card rounded-2xl border-2 border-border hover:bg-card/30 hover:border-primary hover:translate-y-[-5px] transition-all">
            <h3 className="text-3xl font-bold text-primary">2026</h3>
            <p className="text-text-secondary text-sm mt-2">Founded Year</p>
          </div>
          <div className="p-6 bg-card rounded-2xl border-2 border-border hover:bg-card/30 hover:border-secondary hover:translate-y-[-5px] transition-all">
            <h3 className="text-3xl font-bold text-secondary">10+</h3>
            <p className="text-text-secondary text-sm mt-2">Components Documented</p>
          </div>
          <div className="p-6 bg-card rounded-2xl border-2 border-border hover:bg-card/30 hover:border-accent hover:translate-y-[-5px] transition-all">
            <h3 className="text-3xl font-bold text-accent">100%</h3>
            <p className="text-text-secondary text-sm mt-2">Free & Open Source</p>
          </div>
        </div>

        {/* Developer Section */}
        <section className="bg-gradient-to-br from-soft to-card p-8 rounded-3xl border-3 border-border flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary transition-all">
          <div className="w-40 h-40 md:h-48 md:w-80 rounded-full md:rounded-2xl overflow-hidden hover:border-3 flex items-start justify-center text-4xl font-bold shadow-2xl hover:shadow-secondary/40 hover:translate-y-[-2px] hover:border-secondary transition-all">
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

      </div>
    </div>
  );
}