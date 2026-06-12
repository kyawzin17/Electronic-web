import { useAppContext } from "../hooks/useAppContext";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, KeyRound, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';


export default function OtpFill() {
     const { setUser }= useAppContext();
  // 6-digit OTP အတွက် Array State (['', '', '', '', '', ''])
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState<number>(60); // 60 Seconds Countdown
  const [canResend, setCanResend] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location= useLocation()
  const { email, name } = location.state as { email: string, name: string };

  // Input တစ်ခုစီကို လှမ်းထိန်းဖို့ Ref Array
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Countdown Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle Typing Logic
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return; // ဂဏန်းသက်သက်ပဲ လက်ခံမယ်

    const newOtp = [...otp];
    // နောက်ဆုံးရိုက်လိုက်တဲ့ ဂဏန်းတစ်လုံးပဲ ယူမယ်
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError(null);

    // စာရိုက်ပြီးရင် နောက် Input Box ဆီ Auto Target ရွှေ့မယ်
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace Key (ဖျက်လိုက်ရင် ရှေ့အကွက်ကို ပြန်သွားဖို့)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        // အကွက်က အလွတ်ဖြစ်နေရင် ရှေ့အကွက်ကို သွားပြီး ဖျက်မယ်
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle Paste Logic (ဥပမာ SMS ကနေ 123456 ကို copy ကူးပြီး တန်း paste ချတာမျိုး)
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // ဂဏန်း ၆ လုံး ကွက်တိ ဟုတ်မဟုတ် စစ်မယ်
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      setError(null);
      // နောက်ဆုံးကွက်ဆီ focus ပေးလိုက်မယ်
      inputRefs.current[5]?.focus();
    }
  };

  // Resend OTP Button Handler
  const handleResend = async () => {

    if (!canResend) return;
    try {
            const response = await fetch("http://localhost:3335/api/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email
                }),
            });

            if (!response.ok) {
                return false;
            }

            setOtp(new Array(6).fill('')); // Clear old OTP
            setTimer(60); // Reset 1 minute
            setCanResend(false);
            setError(null);
            inputRefs.current[0]?.focus();

            alert("OTP အသစ်ကို ပို့ပေးလိုက်ပါပြီဗျာ။");
        } catch (error) {
            console.error("Register error:", error);
            // Handle register errors
        }

    setOtp(new Array(6).fill('')); // Clear old OTP
    setTimer(60); // Reset 1 minute
    setCanResend(false);
    setError(null);
    inputRefs.current[0]?.focus();

    alert("OTP အသစ်ကို ပို့ပေးလိုက်ပါပြီဗျာ။");
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.toString().replaceAll(',', '');
    console.log(otpCode);

    if (otpCode.length < 6) {
      setError('ကျေးဇူးပြု၍ OTP ကုဒ် ၆ လုံး ပြည့်အောင် ရိုက်ထည့်ပေးပါ။');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Mock API Call (ဒီနေရာမှာ ကိုယ့် Backend API ကို လှမ်းခေါ်ရပါမယ်)
        // Handle OTP submission logic here
        const loginEmail = localStorage.getItem("otpEmail");
        if (!loginEmail) {
            // Handle error
            return;
        }

        // OTP submission logic
        const response = await fetch(`http://localhost:3335/api/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ otp: otpCode, email: loginEmail }),
        });
        const data = await response.json();
        if (data.success) {
            // Handle success
            alert("OTP verification successful!");
            setUser(data.user || []);
            window.location.href = "/auth/password-fill";
            localStorage.removeItem("otpEmail");
            localStorage.setItem("token", data.signupToken);
        } else {
            // Handle error
            alert(data.message || "OTP verification failed");
            setIsLoading(false);
        }
    };

  // စက္ကန့်ကို mm:ss ပုံစံ ပြောင်းပေးတဲ့ function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 font-sans antialiased text-[#2c3e50]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 relative overflow-hidden"
      >
        
        {/* Success Screen Wrapper */}
        <AnimatePresence>
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center z-10"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။</h2>
              <p className="text-sm text-gray-500 mb-6">Electronic Documentation Website မှ ကြိုဆိုပါတယ်ဗျာ။</p>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="w-full py-3 rounded-xl bg-[#8e44ad] text-white font-semibold shadow-md hover:bg-[#7d3c98] transition-all"
              >
                Go to Dashboard
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 mb-4 inline-flex items-center gap-2 text-sm text-gray-500 font-medium"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
          <span>Back</span>
        </button>

        {/* Header Icon & Title */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto text-[#8e44ad]">
            <KeyRound className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">OTP Verification</h2>
          <p className="text-sm text-gray-500 px-4">
            သင်၏ အကောင့်ကို အတည်ပြုရန်အတွက် ပေးပို့ထားသော <span className="font-semibold text-gray-700">ဂဏန်း ၆ လုံးပါသော ကုဒ်</span> ကို ရိုက်ထည့်ပေးပါ။
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 6 Digit Inputs Wrapper */}
          <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => { if (el) inputRefs.current[index] = el; }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#8e44ad] focus:ring-4 focus:ring-purple-100 transition-all outline-none"
              />
            ))}
          </div>

          {/* Error Message Section */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-xs sm:text-sm font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer & Resend Section */}
          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-gray-500 flex items-center justify-center gap-1.5 font-medium">
                ကုဒ်ပြန်လည်တောင်းဆိုရန်ကျန်ချိန်: 
                <span className="text-[#8e44ad] font-bold tracking-wider">{formatTime(timer)}</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 text-[#8e44ad] hover:text-[#7d3c98] font-bold transition-colors focus:outline-none"
              >
                <RefreshCw className="w-4 h-4" />
                OTP ကုဒ်ပြန်လည်တောင်းဆိုမည်
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#8e44ad] text-white font-semibold shadow-md hover:bg-[#7d3c98] active:scale-[0.98] transition-all disabled:bg-purple-300 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>စစ်ဆေးနေပါသည်...</span>
              </>
            ) : (
              <span>Verify Code</span>
            )}
          </button>

          {/* Footer Info */}
          <p className="text-center text-xs text-gray-400 font-medium">
            ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ် မှားယွင်းနေပါက အစမှ ပြန်လည်လုပ်ဆောင်ပါ။
          </p>

        </form>
      </motion.div>
    </div>
  );
}