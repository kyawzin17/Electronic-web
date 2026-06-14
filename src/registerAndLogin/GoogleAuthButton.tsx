import type { CredentialResponse } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { toast } from "react-hot-toast";


const GoogleAuthButton = () => {
    const api=import.meta.env.VITE_API_URL_PRODUCTION;
    const { setUser, setLogin } = useAppContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // 💡 Error object အစား string အနေနဲ့ ပြောင်းသိမ်းပါမယ် (UI မှာ ပြရတာ ပိုလွယ်လို့ပါ)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setIsLoading(true);
        setErrorMsg(null);

        // Google ကပြန်ပေးတဲ့ Token (JWT ID Token)
        const googleToken = credentialResponse.credential;
        
        try {
            // Backend ကို Token လှမ်းပို့မယ်
            const response = await fetch(`${api}/google_login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: googleToken,
                }),
            });
            const data = await response.json();

            // 💡 data.ok အစား response.ok ကို သုံးတာ ပိုမှန်ပါတယ်
            if (response.ok && data.success) {
                // Login အောင်မြင်သွားပြီ (Token နဲ့ User Info ကို သိမ်းပါမယ်)
                toast.success("Login successful", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
                localStorage.setItem("token", data.token);
                setUser(data.user as any);
                setLogin(true);
                navigate("/");
            } else {
                toast.error("Login failed", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
                // Backend က လက်မခံရင် Error ပြမယ်
                setErrorMsg(data.message || "Google Authentication Failed.");
            }
        } catch (error: any) {
            toast.error(error.message || "Server connection error.", {
                    duration: 4000, 
                    style: {
                      fontFamily: 'sans-serif',
                      borderRadius: '12px',
                      background: '#333',
                      color: '#fff',
                    },
                  });
            // Network error သို့မဟုတ် အခြား error များ
            setErrorMsg(error.message || "Server connection error.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleFailure = () => {
        setIsLoading(false);
        setErrorMsg("Google Login Failed or Cancelled.");
    }

    return (
        <div className="flex flex-col items-center justify-center w-full my-4">
          
          {/* လှပတဲ့ Divider လေး (Or continue with) */}
          <div className="flex items-center w-full mb-4">
            <div className="grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Or continue with</span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Loading ဖြစ်နေချိန်မှာ Text လေးပြမယ် */}
          {isLoading ? (
            <p className="text-sm text-gray-500 my-2">Authenticating securely...</p>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              theme="outline" 
              size="large" 
              shape="rectangular"
            />
          )}

          {/* Error ရှိရင် အနီရောင်စာသားနဲ့ ပြမယ် (errorMsg ကို တိုက်ရိုက်ပြပါမယ်) */}
          {errorMsg && (
            <p className="mt-2 text-sm text-red-500">{errorMsg}</p>
          )}

        </div>
    );
}

export default GoogleAuthButton;