import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
    
  return (
    <div className="max-w-3xl mx-auto py-16 px-6 bg-bg">

        <button onClick={() => navigate("/")} className="absolute top-4 left-4 md:top-6 md:left-6">
            <FontAwesomeIcon icon={faCircleArrowLeft} className='font-bold text-2xl md:text-3xl text-text-muted hover:-translate-y-1 hover:text-text-main cursor-pointer duration-75' />
        </button>

      <h1 className="text-3xl font-bold text-text-main mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-text-secondary leading-relaxed prose prose-invert">
        <section>
          <h2 className="text-xl font-semibold text-text-main mb-3">၁။ အချက်အလက် စုဆောင်းခြင်း (Data Collection)</h2>
          <p>
            Red Dragon Electronic (RDE) သည် အခမဲ့ ပညာဒါန (Free & Open Source) မှတ်တမ်းဝဘ်ဆိုက်ဖြစ်ပါသည်။ ကျွန်ုပ်တို့သည် အသုံးပြုသူများထံမှ မလိုအပ်သော ကိုယ်ရေးကိုယ်တာ အချက်အလက်များကို ကောက်ယူခြင်း၊ သိမ်းဆည်းခြင်း မပြုလုပ်ပါ။
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-main mb-3">၂။ Cookie နှင့် Local Storage အသုံးပြုမှု</h2>
          <p>
            Website ၏ အသွင်အပြင် (Dark/Light Theme) နှင့် အသုံးပြုသူ၏ Preferences များကို မှတ်သားထားရန်သာ Local Storage ကို အသုံးပြုပါသည်။ ကြော်ငြာများ သို့မဟုတ် နောက်ယောင်ခံခြေရာခံသော (Tracking) Cookies များကို အသုံးပြုထားခြင်း မရှိပါ။
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-main mb-3">၃။ ပြင်ပလင့်ခ်များ (External Links)</h2>
          <p>
            ကျွန်ုပ်တို့၏ Docs များတွင် ပိုမိုလေ့လာနိုင်ရန် ပြင်ပ Website များသို့ ညွှန်းဆိုထားသော Link များ ပါဝင်နိုင်ပါသည်။ ထို ပြင်ပ Website များ၏ ကိုယ်ရေးကိုယ်တာ မူဝါဒများမှာ ကျွန်ုပ်တို့နှင့် သက်ဆိုင်ခြင်းမရှိပါ။
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-main mb-3">၄။ ပြင်ဆင်ပြောင်းလဲမှုများ (Changes to Policy)</h2>
          <p>
            ဤကိုယ်ရေးကိုယ်တာ မူဝါဒကို လိုအပ်ပါက အချိန်နှင့်အမျှ ပြင်ဆင်ပြောင်းလဲမှုများ ပြုလုပ်နိုင်ပါသည်။ အပြောင်းအလဲများရှိပါက ဤစာမျက်နှာတွင် အသစ်ပြန်လည် လွှင့်တင်ပေးသွားမည် ဖြစ်ပါသည်။
          </p>
        </section>
        
        <div className="pt-8 border-t border-border text-sm">
          <p>နောက်ဆုံး ပြင်ဆင်ခဲ့သောရက်စွဲ - မေလ၊ ၂၀၂၆</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;