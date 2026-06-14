import { useAppContext } from "../hooks/useAppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ShieldCheck, Check } from 'lucide-react';

export default function PasswordFill() {
     const api=import.meta.env.VITE_API_URL_PRODUCTION;
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Password Validation Criteria တွက်ချက်ခြင်း
  const validations = {
    minLength: password.length >= 6,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_]/.test(password),
    isMatched: password === confirmPassword && confirmPassword.length > 0,
  };

  // Criteria အကုန်ကိုက်ညီမှ Form Submit လုပ်ခွင့်ပေးမယ်
  const isFormValid = validations.minLength && validations.hasNumber && validations.hasSpecialChar && validations.isMatched;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('ကျေးဇူးပြု၍ သတ်မှတ်ထားသော လုံခြုံရေးစည်းကမ်းချက်များကို ပြည့်စုံအောင် ဖြည့်ပေးပါ။');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Mock API Call (ဒီနေရာမှာ မင်းရဲ့ Backend Prisma API ဆီ ပို့ရပါမယ်)
    const response = await fetch(`${api}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({ password: password }),
            });
            const data = await response.json();
            if (data.success) {
                // Handle success
                 toast.success(data.message || 'Registration successful!', {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
                setUser(data.user);
                window.location.href = "/";
            } else {
                // Handle error
                setIsSuccess(false);
                console.error(data.message || "Registration failed!");
                setIsLoading(false);
                 toast.error(data.message || "Registration failed!", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
                
            }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center p-4 font-sans antialiased text-[#2c3e50]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="w-full h-auto flex justify-start items-center px-4 absolute left-0 top-6">
            <button 
            type="button"
            className="p-2 hover:bg-text-muted/40 rounded-full transition-colors duration-200"
            onClick={() => navigate("/auth/register")}
          >
            <ArrowLeft className="w-6 h-6 text-text-secondary" />
          </button>
        </div>
        
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Password သတ်မှတ်ခြင်း အောင်မြင်ပါသည်။</h2>
              <p className="text-sm text-gray-500 mb-6">အကောင့်ဆောက်ခြင်း လုပ်ငန်းစဉ် အားလုံး ပြီးမြောက်သွားပါပြီဗျာ။</p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="w-full py-3 rounded-xl bg-[#8e44ad] text-white font-semibold shadow-md hover:bg-[#7d3c98] transition-all"
              >
                Go to Login Page
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Header Icon & Title */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto text-[#8e44ad]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Set New Password</h2>
          <p className="text-sm text-gray-500 px-4">
            သင်၏ အကောင့်လုံခြုံရေးအတွက် စိတ်ချရမည့် <span className="font-semibold text-gray-700">စကားဝှက်အသစ်</span> တစ်ခုကို သတ်မှတ်ပေးပါ။
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* New Password Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-600">New Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#8e44ad] focus:ring-4 focus:ring-purple-100 transition-all outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-600">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-[#8e44ad] focus:ring-4 focus:ring-purple-100 transition-all outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password Strength Checklist Indicator */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-150 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password Requirements:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-medium">
              <div className={`flex items-center gap-2 ${validations.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${validations.minLength ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                  {validations.minLength && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>အနည်းဆုံး ဂဏန်း ၆ လုံး</span>
              </div>

              <div className={`flex items-center gap-2 ${validations.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${validations.hasNumber ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                  {validations.hasNumber && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>ကိန်းဂဏန်း (0-9) ပါရမည်</span>
              </div>

              <div className={`flex items-center gap-2 ${validations.hasSpecialChar ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${validations.hasSpecialChar ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                  {validations.hasSpecialChar && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>အထူးသင်္ကေတ (@,#,$) ပါရမည်</span>
              </div>

              <div className={`flex items-center gap-2 ${validations.isMatched ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${validations.isMatched ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                  {validations.isMatched && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>Password ချင်း တူရမည်</span>
              </div>
            </div>
          </div>

          {/* Form Handling Error Alert */}
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

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full py-3.5 rounded-xl bg-[#8e44ad] text-white font-semibold shadow-md hover:bg-[#7d3c98] active:scale-[0.98] transition-all disabled:bg-purple-200 disabled:text-purple-400 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>သိမ်းဆည်းနေပါသည်...</span>
              </>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>

        </form>
      </motion.div>
    </div>
  );
}

