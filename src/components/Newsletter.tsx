import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // Success သို့မဟုတ် Error ပြရန်
  const serviceId= import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId= import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey= import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // EmailJS သို့ ပို့မည့် အချက်အလက်များ
    const templateParams = {
      email: email, // Template ထဲက {{email}} နဲ့ ကိုက်ညီရမည်
    };

    emailjs.send(
      serviceId,   // အဆင့် ၁ မှာရခဲ့တဲ့ Service ID
      templateId,  // အဆင့် ၁ မှာရခဲ့တဲ့ Template ID
      templateParams,
      publicKey    // အဆင့် ၁ မှာရခဲ့တဲ့ Public Key
    )
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       setStatus("ကျေးဇူးတင်ပါတယ်! Subscribe လုပ်ခြင်း အောင်မြင်ပါသည်။");
       setEmail(""); // Input ကို ပြန်ရှင်းထုတ်ခြင်း
    })
    .catch((err) => {
       console.log('FAILED...', err);
       setStatus("တစ်ခုခု မှားယွင်းနေပါသည်။ ပြန်လည် ကြိုးစားကြည့်ပါ။");
    });
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-text-main mb-3 font-bold uppercase tracking-widest text-sm">Stay Updated</h3>
      
      <form onSubmit={handleSubscribe} className="space-y-3 w-full max-w-sm">
        <input 
          type="email" 
          required
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-soft border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
        >
          Subscribe
        </button>

        {status && (
          <p className={`text-xs mt-2 ${status.includes("အောင်မြင်") ? "text-green-400" : "text-red-400"}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default Newsletter;