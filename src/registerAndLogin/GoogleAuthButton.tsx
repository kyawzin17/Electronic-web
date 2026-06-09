import type { CredentialResponse } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

const GoogleAuthButton= () => {
    const { setUser, setLogin } = useAppContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<Error | null>(null);

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setIsLoading(true);
        setErrorMsg(null);

        // Google ကပြန်ပေးတဲ့ Token
        const googleToken = credentialResponse.credential;
        
        try {
            // Backend ကို Token လှမ်းပို့မယ် (.env က VITE_API_URL ကို သုံးပါတယ်)

            const apiUrl = import.meta.env.VITE_API_URL + "http://localhost:3335";
            const response = await fetch(`${apiUrl}/api/google_login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: googleToken,
                }),
            });
            const data = await response.json();

            if (data.ok && data.success) {
                // 💡 Login အောင်မြင်သွားပြီ (Token နဲ့ User Info ကို သိမ်းပါမယ်)
                // မူလ OTP စနစ်မှာ သိမ်းတဲ့ Key နာမည်အတိုင်း (ဥပမာ "token") အစားထိုး သိမ်းလိုက်ရုံပါပဲ
                localStorage.setItem("token", data.token);
                    setUser(data.user);
                    setLogin(true);
                    navigate("/auth");
                } else {
                    // Backend က လက်မခံရင် Error ပြမယ်
                    setErrorMsg(data.message || "Google Authentication Failed.");
                }
        } catch (error) {
            setErrorMsg(error as Error);
        } finally {
            setIsLoading(false);
        }
    }

const handleGoogleFailure= () => {
    setIsLoading(false);
    setErrorMsg(new Error("Google Login Failed"));
}

return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      
      {/* လှပတဲ့ Divider လေး (Or login with) */}
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
          theme="outline" // "filled_blue" | "outline" | "filled_black" စိတ်ကြိုက်ပြောင်းနိုင်တယ်
          size="large" // Button အကျယ်
          shape="rectangular"
        />
      )}

      {/* Error ရှိရင် အနီရောင်စာသားနဲ့ ပြမယ် */}
      {errorMsg && (
        <p className="mt-2 text-sm text-red-500">{errorMsg.message}</p>
      )}

    </div>
)
}

export default GoogleAuthButton;
