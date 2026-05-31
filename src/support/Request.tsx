import React , { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const RequestTutorial: React.FC = () => {
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<string>("");
      const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
        const [hasSubmittedToday, setHasSubmittedToday] = useState<boolean>(false);
  
    // ဒီနေ့ရက်စွဲကို '2026-05-31' ပုံစံမျိုး String အဖြစ် ယူခြင်း
    const getTodayDateString = (): string => {
      return new Date().toISOString().split("T")[0];
    };
  
    // Component စတက်တက်ချင်းမှာ User က ဒီနေ့ ပို့ထားပြီးပြီလား စစ်ရန်
    useEffect(() => {
      const lastSubmittedDate = localStorage.getItem("last_submitted_date");
      const today = getTodayDateString();
  
      if (lastSubmittedDate === today) {
        setHasSubmittedToday(true);
        setStatus("သင် ဒီနေ့အတွက် Message ပို့ပြီးပါပြီ။ မနက်ဖြန်မှ ပြန်ပို့ပေးပါ။");
      }
    }, []);
  
  const onSubmit = async (
                      event: React.FormEvent<HTMLFormElement>
                      ) => {
                      event.preventDefault()
  
                      // တကယ်လို့ ပို့ပြီးသား ဖြစ်နေရင် ဘာမှ ဆက်မလုပ်ရန် ထပ်စစ်ခြင်း
                      if (hasSubmittedToday)  {
                          setStatus("သင် ဒီနေ့အတွက် Message ပို့ပြီးပါပြီ။ မနက်ဖြန်မှ ပြန်ပို့ပေးပါ။");
                          return;
                      };
  
                      setIsSubmitting(true);
  
                      const form = event.currentTarget
  
                      const formData = new FormData(form)
  
                      setStatus("Sending....")
  
  
                      formData.append(
                          "access_key",
                          import.meta.env.VITE_WEB3FORM_KEY
                      )
  
                      try {
                           const response = await fetch(
                          "https://api.web3forms.com/submit",
                          {
                          method: "POST",
                          body: formData,
                          }
                      )
  
                      const data = await response.json()
  
                      if (data.success) {
                          alert("Message Sent Successfully")
                          setStatus("ကျေးဇူးတင်ပါတယ်! ဆက်သွယ်ခြင်း အောင်မြင်ပါသည်။")
                          // 🎯 အောင်မြင်သွားရင် LocalStorage ထဲမှာ ဒီနေ့ရက်စွဲကို မှတ်လိုက်ပြီ
                          const today = getTodayDateString();
                          localStorage.setItem("last_submitted_date", today);
                          setHasSubmittedToday(true); // Button ကို ပိတ်ပစ်ရန်
                          form.reset()
                      } else {
                          console.log(data)
                          setStatus("တစ်ခုခု မှားယွင်းနေပါသည်။ ပြန်လည် ကြိုးစားကြည့်ပါ။")
                          alert("Something went wrong")
                      }
                      } catch (error) {
                          console.error(error);
                          setStatus("Server နဲ့ ချိတ်ဆက်မှု မအောင်မြင်ပါ။");
                          } finally {
                          setIsSubmitting(false);
                      }
                  }
  return (
    <div className="max-w-2xl mx-auto py-16 px-6 bg-bg">

        <button onClick={() => navigate("/")} className="absolute top-4 left-4 md:top-6 md:left-6">
            <FontAwesomeIcon icon={faCircleArrowLeft} className='font-bold text-2xl md:text-3xl text-text-muted hover:-translate-y-1 hover:text-text-main cursor-pointer duration-75' />
        </button>

      <h1 className="text-3xl font-bold text-text-main mb-4">Request a Tutorial</h1>
      <p className="text-text-secondary mb-8 leading-relaxed">
        Website တွင် မပါဝင်သေးသော အီလက်ထရောနစ် ပစ္စည်း (Components) များ၊ ဆားကစ် (Circuits) များ သို့မဟုတ် ပရောဂျက်များကို လေ့လာလိုပါက ဤနေရာမှ တောင်းဆိုနိုင်ပါသည်။
      </p>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-main/70 mb-2">တောင်းဆိုလိုသော အမျိုးအစား</label>
          <select
                name="request_type"
                className="w-full bg-soft border border-slate-70 rounded-lg px-4 py-3 text-text-main/90 focus:outline-none focus:border-primary transition-colors">
            <option value="component">Component အသစ်</option>
            <option value="project">Project / Circuit လမ်းညွှန်</option>
            <option value="theory">သီအိုရီ ရှင်းလင်းချက် (Theory)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-main/70 mb-2">အသေးစိတ် ရှင်းလင်းချက် (Details)</label>
          <textarea
                name="description"
                rows={5} className="w-full bg-soft border border-slate-700 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors"
                 placeholder="ဥပမာ - ESP32 နှင့် အသုံးပြုပုံကို သိချင်ပါတယ်..." 
                 required></textarea>
        </div>
        <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                />
         {status && (
          <p className={`text-base mt-2 ${status.includes("အောင်မြင်") ? "text-success" : "text-error"}`}>
            {status}
          </p>
        )}
        <button disabled={isSubmitting || hasSubmittedToday} type="submit" className="bg-purple-600 hover:bg-purple-700 text-text-main font-medium py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
          တောင်းဆိုမည်
        </button>
      </form>
    </div>
  );
};

export default RequestTutorial;